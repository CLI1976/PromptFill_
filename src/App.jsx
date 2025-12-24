import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Copy, Plus, X, Settings, Check, Edit3, Eye, Trash2, FileText, Pencil, Copy as CopyIcon, Globe, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, GripVertical, Download, Upload, Image as ImageIcon, List, Undo, Redo, Maximize2, RotateCcw, LayoutGrid, Sidebar, Search, ArrowRight, User, ArrowUpRight, ArrowUpDown, RefreshCw, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';

// ====== 导入数据配置 ======
import { INITIAL_TEMPLATES_CONFIG, TEMPLATE_TAGS, SYSTEM_DATA_VERSION } from './data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS, INITIAL_CATEGORIES } from './data/banks';

// ====== 导入常量配置 ======
import { TRANSLATIONS } from './constants/translations';
import { PREMIUM_STYLES, CATEGORY_STYLES, TAG_STYLES, TAG_LABELS } from './constants/styles';
import { MASONRY_STYLES } from './constants/masonryStyles';

// ====== 导入工具函数 ======
import { deepClone, makeUniqueKey, waitForImageLoad, getLocalized } from './utils/helpers';
import { mergeTemplatesWithSystem, mergeBanksWithSystem } from './utils/merge';
import { SCENE_WORDS, STYLE_WORDS } from './constants/slogan';

// ====== 导入自定义 Hooks ======
import { useStickyState } from './hooks/useStickyState';

// ====== 导入 UI 组件 ======
import { Variable, VisualEditor, PremiumButton, EditorToolbar, Lightbox, TemplatePreview, TemplatesSidebar, BanksSidebar, CategoryManager, InsertVariableModal, AddBankModal, DiscoveryView, MobileSettingsView } from './components';
import MobileTabBar from './components/MobileTabBar';

// --- 组件：图片 3D 预览弹窗 (优化性能，状态局部化) ---
const ImagePreviewModal = React.memo(({ zoomedImage, template, language, t, TAG_STYLES, displayTag, setActiveTemplateId, setDiscoveryView, setZoomedImage, setMobileTab }) => {
  const [modalMousePos, setModalMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const touchStartY = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 陀螺仪支持
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e) => {
      // 当卡片展开时，暂停陀螺仪 3D 效果更新，优先保证文字滚动
      if (isTextExpanded) return;

      const { beta, gamma } = e;
      if (beta !== null && gamma !== null) {
        // 映射到类似鼠标坐标的值
        const x = (window.innerWidth / 2) + (gamma / 20) * (window.innerWidth / 2);
        const y = (window.innerHeight / 2) + (beta / 20) * (window.innerHeight / 2);
        setModalMousePos({ x, y });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isMobile, isTextExpanded]);

  // 获取所有图片列表
  const allImages = useMemo(() => {
    if (template?.imageUrls && Array.isArray(template.imageUrls) && template.imageUrls.length > 0) {
      return template.imageUrls;
    }
    return template?.imageUrl ? [template.imageUrl] : [zoomedImage];
  }, [template, zoomedImage]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = allImages.indexOf(zoomedImage);
    return idx >= 0 ? idx : 0;
  });

  const currentImageUrl = allImages[currentIndex];

  // 锁定/解锁背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 计算 3D 旋转角度
  const rotateY = (modalMousePos.x - window.innerWidth / 2) / (window.innerWidth / 2) * 15;
  const rotateX = (modalMousePos.y - window.innerHeight / 2) / (window.innerHeight / 2) * -15;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % allImages.length);
  };

  // 移动端手势处理
  const handleCardTouchStart = (e) => {
    // 如果触摸开始于内容区域，不记录起始位置
    if (e.target.closest('.content-scroll-area')) {
      return;
    }
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    // 当卡片展开时，内容区域的滑动完全用于文字滚动，不更新3D效果
    if (isTextExpanded && e.target.closest('.content-scroll-area')) {
      return;
    }
    
    // 实时更新 3D 效果
    const touch = e.touches[0];
    setModalMousePos({ x: touch.clientX, y: touch.clientY });
  };

  const handleCardTouchEnd = (e) => {
    // 如果触摸结束于内容区域，不处理展开/收起逻辑
    if (e.target.closest('.content-scroll-area') || touchStartY.current === 0) {
      touchStartY.current = 0;
      return;
    }
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    // 向上滑动超过 50px 则展开
    if (deltaY > 50 && !isTextExpanded) {
      setIsTextExpanded(true);
    }
    // 向下滑动超过 50px 则收起
    else if (deltaY < -50 && isTextExpanded) {
      setIsTextExpanded(false);
    }
    
    touchStartY.current = 0;
  };

  if (isMobile) {
    return (
      <div 
          className="fixed inset-0 z-[200] flex flex-col animate-in fade-in duration-500 overflow-hidden"
          onClick={() => setZoomedImage(null)}
      >
          {/* Background Layer - Light Version */}
          <div 
            className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/background1.png)' }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl"></div>
          </div>

          <button 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-black/5 z-[150]"
              onClick={() => setZoomedImage(null)}
          >
              <X size={24} />
          </button>

          <div 
            className="flex-1 flex flex-col relative overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
              {/* Image Section */}
              <div 
                className={`transition-all duration-500 ease-in-out flex flex-col justify-center items-center perspective-[1000px] relative px-6 flex-shrink-0 ${isTextExpanded ? 'h-[30vh] pt-10' : 'h-[60vh]'}`}
                style={{ perspective: '1200px' }}
                onTouchMove={handleTouchMove}
              >
                  <div 
                    className="relative transition-transform duration-200 ease-out flex items-center justify-center w-full h-full"
                    style={{ 
                      transform: isTextExpanded ? 'none' : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Image Shadow */}
                    <div 
                      className="absolute inset-6 bg-orange-500/10 blur-3xl rounded-3xl -z-10 transition-opacity duration-500"
                      style={{ transform: 'translateZ(-50px)' }}
                    />
                    <img 
                        key={currentImageUrl}
                        src={currentImageUrl} 
                        alt="Zoomed Preview" 
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 animate-in fade-in duration-300"
                        style={{ transform: isTextExpanded ? 'none' : 'translateZ(20px)' }}
                    />
                  </div>

                  {/* Mobile Navigation */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
                      <button onClick={handlePrev} className="p-1.5 rounded-full bg-white/50 text-gray-400 border border-white shadow-sm"><ChevronLeft size={14} /></button>
                      <div className="flex gap-1.5">
                        {allImages.map((_, idx) => (
                          <div key={idx} className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : 'bg-gray-300'}`} />
                        ))}
                      </div>
                      <button onClick={handleNext} className="p-1.5 rounded-full bg-white/50 text-gray-400 border border-white shadow-sm"><ChevronRight size={14} /></button>
                    </div>
                  )}
              </div>

              {/* Bottom Card Section - Light Glassmorphism */}
              <div 
                className={`
                  flex-1 bg-white/70 backdrop-blur-2xl border-t border-white/60 
                  transition-all duration-500 ease-in-out flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]
                  ${isTextExpanded ? 'rounded-t-[2.5rem] mt-0' : 'rounded-t-[2rem] mt-4'}
                `}
                onTouchStart={handleCardTouchStart}
                onTouchEnd={handleCardTouchEnd}
                onClick={(e) => {
                  if (e.target.closest('.header-trigger') || e.target.closest('.handle-trigger')) {
                    setIsTextExpanded(!isTextExpanded);
                  }
                }}
              >
                  {/* Pull Handle */}
                  <div className="w-full flex justify-center py-3 handle-trigger flex-shrink-0">
                    <div className="w-10 h-1 rounded-full bg-gray-200"></div>
                  </div>

                  {/* Header Row */}
                  <div className="px-6 flex items-center justify-between gap-4 mb-2 header-trigger flex-shrink-0">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 truncate mb-1">
                          {getLocalized(template?.name, language)}
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                          {(template?.tags || []).slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[9px] font-bold text-gray-500 uppercase">
                              {displayTag(tag)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (template) {
                            setActiveTemplateId(template.id);
                            setDiscoveryView(false);
                            if (setMobileTab) setMobileTab('editor'); 
                            setZoomedImage(null);
                          }
                        }}
                        className="px-5 py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(249,115,22,0.3)] active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 border border-orange-400/20"
                      >
                        <Sparkles size={16} />
                        {t('use_template')}
                      </button>
                  </div>

                  {/* Content Area */}
                  <div 
                    className={`px-6 flex-1 overflow-hidden flex flex-col transition-all duration-500 content-scroll-area ${isTextExpanded ? 'opacity-100 mt-4' : 'opacity-0 h-0 pointer-events-none'}`}
                  >
                      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Prompt Content</h3>
                        <div className="h-px flex-1 bg-gray-100"></div>
                      </div>
                      <div 
                        className="flex-1 overflow-y-auto custom-scrollbar text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pb-32 overscroll-contain touch-pan-y"
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                      >
                        {getLocalized(template?.content, language)}
                      </div>
                  </div>
                  
                  {/* Hint for non-expanded state */}
                  {!isTextExpanded && (
                    <div className="px-6 pb-24 text-[10px] font-medium text-gray-400 animate-pulse text-center flex-shrink-0">
                      点击卡片或向上滑动查看详细内容
                    </div>
                  )}
              </div>
          </div>
      </div>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-hidden"
        onMouseMove={(e) => !isMobile && setModalMousePos({ x: e.clientX, y: e.clientY })}
        onClick={() => setZoomedImage(null)}
    >
        {/* Background Layer - Static image + deep mask to prevent flickering from discovery view */}
        <div 
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/background1.png)',
          }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl"></div>
        </div>

        <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[120]"
            onClick={() => setZoomedImage(null)}
        >
            <X size={isMobile ? 24 : 32} />
        </button>
        
        <div 
            className="max-w-7xl w-full h-full md:h-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 z-[110]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left: Image Section with 3D Effect */}
            <div 
              className={`flex-shrink-0 flex justify-center items-center perspective-[1000px] relative group/modal-img flex-1`}
              style={{ perspective: '1200px' }}
            >
                <div 
                  className="relative transition-transform duration-200 ease-out h-full flex items-center justify-center"
                  style={{ 
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="absolute inset-4 bg-black/40 blur-3xl rounded-3xl -z-10 transition-opacity duration-500"
                    style={{ transform: 'translateZ(-50px)' }}
                  />
                  
                  <img 
                      key={currentImageUrl}
                      src={currentImageUrl} 
                      alt="Zoomed Preview" 
                      className={`max-w-full rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-in fade-in duration-300 max-h-[75vh] object-contain`}
                      style={{ transform: 'translateZ(20px)' }}
                  />
                </div>

                {/* Navigation & Indicator */}
                {allImages.length > 1 && (
                  <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-6 z-30 -bottom-12`}>
                    <button 
                      onClick={handlePrev}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                      {allImages.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={handleNext}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
            </div>
            
            {/* Right: Info & Prompt Section */}
            <div className={`flex flex-col items-start animate-in slide-in-from-right-10 duration-700 delay-150 overflow-hidden w-full md:w-[450px] mt-auto`}>
                {template ? (
                    <>
                        <div className={`mb-4 md:mb-8`}>
                            <h2 className={`font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight text-4xl md:text-5xl`}>
                                {getLocalized(template.name, language)}
                            </h2>
                            <div className="flex flex-wrap gap-2 opacity-80">
                                {(template.tags || []).map(tag => (
                                    <span key={tag} className={`px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[10px] md:text-[11px] font-bold tracking-wider uppercase border border-white/20 bg-white/5 text-white`}>
                                        {displayTag(tag)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={`w-full mb-6 md:mb-10 flex-1 overflow-hidden flex flex-col`}>
                            <div className="flex items-center gap-4 mb-3">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Content</h3>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <div className={`text-white/80 leading-relaxed whitespace-pre-wrap font-medium overflow-y-auto custom-scrollbar-white pr-4 text-base md:text-lg max-h-[40vh]`}>
                                {getLocalized(template.content, language)}
                            </div>
                        </div>

                        <div className={`w-full flex flex-col gap-4 mt-auto`}>
                            <PremiumButton
                                onClick={() => {
                                    setActiveTemplateId(template.id);
                                    setDiscoveryView(false);
                                    setZoomedImage(null);
                                }}
                                icon={Sparkles}
                                color="slate"
                                hoverColor="orange"
                                active={true}
                                className={`w-full font-black shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 !py-5 !rounded-2xl !text-lg hover:-translate-y-1`}
                            >
                                {t('use_template') || '使用此模板'}
                            </PremiumButton>
                            
                            <div className="flex items-center justify-between px-2">
                              <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">
                                  Prompt Fill Original
                              </p>
                              <div className="flex gap-4">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                              </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20 gap-4 w-full">
                        <ImageIcon size={64} strokeWidth={1} />
                        <p className="text-lg font-bold tracking-widest uppercase">No Data Found</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
});

// --- 组件：动态 Slogan (PC端) ---
const AnimatedSlogan = React.memo(({ isActive, language }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  const currentScenes = SCENE_WORDS[language] || SCENE_WORDS.cn;
  const currentStyles = STYLE_WORDS[language] || STYLE_WORDS.cn;

  useEffect(() => {
    if (!isActive) return;
    
    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % currentScenes.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % currentStyles.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive, currentScenes.length, currentStyles.length]);

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-3 text-base md:text-lg lg:text-xl text-gray-700 font-medium font-['MiSans',system-ui,sans-serif] px-2 leading-relaxed min-h-[60px]">
      <span className="whitespace-nowrap">"{language === 'en' ? 'Show a detailed, miniature' : '展示一个精致的、微缩'}</span>
      <div className="inline-flex items-center justify-center min-w-[120px]">
        <span 
          key={`style-${styleIndex}-${language}`}
          className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(96, 165, 250, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {currentStyles[styleIndex]}
                </span>
        </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'of' : '的'}</span>
      <div className="inline-flex items-center justify-center min-w-[120px]">
        <span 
          key={`scene-${sceneIndex}-${language}`}
          className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(251, 146, 60, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {currentScenes[sceneIndex]}
        </span>
            </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'scene"' : '场景"'}</span>
    </div>
  );
});

// --- 组件：动态 Slogan (移动端) ---
const MobileAnimatedSlogan = React.memo(({ isActive, language }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  const currentScenes = SCENE_WORDS[language] || SCENE_WORDS.cn;
  const currentStyles = STYLE_WORDS[language] || STYLE_WORDS.cn;

  useEffect(() => {
    if (!isActive) return;

    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % currentScenes.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % currentStyles.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive, currentScenes.length, currentStyles.length]);

    return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-gray-700 font-medium mb-3 min-h-[32px]">
      <span className="whitespace-nowrap">"{language === 'en' ? 'Show' : '展示'}</span>
      <div className="inline-flex items-center justify-center min-w-[80px]">
        <span 
          key={`style-m-${styleIndex}-${language}`}
          className="inline-block px-2.5 py-0.5 rounded-full font-bold text-white text-xs whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)'
          }}
        >
          {currentStyles[styleIndex]}
        </span>
                    </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'of' : '的'}</span>
      <div className="inline-flex items-center justify-center min-w-[80px]">
        <span 
          key={`scene-m-${sceneIndex}-${language}`}
          className="inline-block px-2.5 py-0.5 rounded-full font-bold text-white text-xs whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: '0 2px 8px rgba(251, 146, 60, 0.3)'
          }}
        >
          {currentScenes[sceneIndex]}
        </span>
                            </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'scene"' : '场景"'}</span>
        </div>
    );
});

// ====== 以下组件保留在此文件中 ======
// CategorySection, BankGroup, CategoryManager, InsertVariableModal, App

// --- 组件：可折叠的分类区块 (New Component) ---
// ====== 核心组件区 (已提取至独立文件) ======

// Poster View Animated Slogan Constants - 已移至 constants/slogan.js

const App = () => {
  // 当前应用代码版本 (必须与 package.json 和 version.json 一致)
  const APP_VERSION = "0.5.1";

  // 临时功能：瀑布流样式管理
  const [masonryStyleKey, setMasonryStyleKey] = useState('poster');
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const currentMasonryStyle = MASONRY_STYLES[masonryStyleKey] || MASONRY_STYLES.default;

  // Global State with Persistence
  // bump version keys to强制刷新新增词库与默认值
  const [banks, setBanks] = useStickyState(INITIAL_BANKS, "app_banks_v9");
  const [defaults, setDefaults] = useStickyState(INITIAL_DEFAULTS, "app_defaults_v9");
  const [language, setLanguage] = useStickyState("cn", "app_language_v1"); // 全局UI语言
  const [templateLanguage, setTemplateLanguage] = useStickyState("cn", "app_template_language_v1"); // 模板内容语言
  const [categories, setCategories] = useStickyState(INITIAL_CATEGORIES, "app_categories_v1"); // New state
  
  const [templates, setTemplates] = useStickyState(INITIAL_TEMPLATES_CONFIG, "app_templates_v10");
  const [activeTemplateId, setActiveTemplateId] = useStickyState("tpl_default", "app_active_template_id_v4");
  
  const [lastAppliedDataVersion, setLastAppliedDataVersion] = useStickyState("", "app_data_version_v1");
  const [showDataUpdateNotice, setShowDataUpdateNotice] = useState(false);
  const [showAppUpdateNotice, setShowAppUpdateNotice] = useState(false);
  
  // UI State
  const [bankSidebarWidth, setBankSidebarWidth] = useStickyState(420, "app_bank_sidebar_width_v1"); // Default width increased to 420px for 2-column layout
  const [isResizing, setIsResizing] = useState(false);
  
  // 检测是否为移动设备
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const [mobileTab, setMobileTab] = useState(isMobileDevice ? "home" : "editor"); // 'home', 'editor', 'settings'
  const [isTemplatesDrawerOpen, setIsTemplatesDrawerOpen] = useState(false);
  const [isBanksDrawerOpen, setIsBanksDrawerOpen] = useState(false);
  const [touchDraggingVar, setTouchDraggingVar] = useState(null); // { key, x, y } 用于移动端模拟拖拽
  const touchDragRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false); // New UI state
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false); // New UI state for Insert Picker
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false); // New UI state for Lightbox

  // Add Bank State
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [newBankLabel, setNewBankLabel] = useState("");
  const [newBankKey, setNewBankKey] = useState("");
  const [newBankCategory, setNewBankCategory] = useState("other");

  // Template Management UI State
  const [editingTemplateNameId, setEditingTemplateNameId] = useState(null);
  const [tempTemplateName, setTempTemplateName] = useState("");
  const [tempTemplateAuthor, setTempTemplateAuthor] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  // 移除这一行，将状态移入独立的 Modal 组件
  // const [modalMousePos, setModalMousePos] = useState({ x: 0, y: 0 });
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUpdateMode, setImageUpdateMode] = useState('replace'); // 'replace' or 'add'
  const [currentImageEditIndex, setCurrentImageEditIndex] = useState(0);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [showImageActionMenu, setShowImageActionMenu] = useState(false);
  
  // File System Access API State
  const [storageMode, setStorageMode] = useState(() => {
    return localStorage.getItem('app_storage_mode') || 'browser';
  });
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [isFileSystemSupported, setIsFileSystemSupported] = useState(false);
  
  // Template Tag Management State
  const [selectedTags, setSelectedTags] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTemplateTags, setEditingTemplateTags] = useState(null); // {id, tags}
  const [isDiscoveryView, setDiscoveryView] = useState(true); // 首次加载默认显示发现（海报）视图
  
  // 统一的发现页切换处理器
  const handleSetDiscoveryView = React.useCallback((val) => {
    setDiscoveryView(val);
    // 移动端：侧边栏里的“回到发现页”按钮需要同步切回 mobileTab
    if (isMobileDevice && val) {
      setMobileTab('home');
    } else if (isMobileDevice && !val && mobileTab === 'home') {
      setMobileTab('editor');
    }
  }, [isMobileDevice, mobileTab]);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 移动端：首页是否展示完全由 mobileTab 控制，避免 isDiscoveryView 残留导致其它 Tab 白屏
  // 桌面端：保持现有 isDiscoveryView 行为（不影响已正常的桌面端）
  const showDiscoveryOverlay = isMobileDevice ? mobileTab === "home" : isDiscoveryView;
  
  // Template Sort State
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest, a-z, z-a, random
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Date.now()); // 用于随机排序的种子
  
  // 检查系统模版更新
  // 检测数据版本更新 (模板与词库)
  useEffect(() => {
    if (SYSTEM_DATA_VERSION && lastAppliedDataVersion !== SYSTEM_DATA_VERSION) {
      // 检查是否有存储的数据。如果是第一次使用（无数据），直接静默更新版本号
      const hasTemplates = localStorage.getItem("app_templates_v10");
      const hasBanks = localStorage.getItem("app_banks_v9");
      
      if (hasTemplates || hasBanks) {
        setShowDataUpdateNotice(true);
      } else {
        setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
      }
    }
  }, [lastAppliedDataVersion]);

  // 检查应用代码版本更新与数据版本更新
  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const response = await fetch('/version.json?t=' + Date.now());
        if (response.ok) {
          const data = await response.json();
          
          // 检查应用版本更新 - 使用代码内常量 APP_VERSION 进行比对
          if (data.appVersion && data.appVersion !== APP_VERSION) {
            setShowAppUpdateNotice(true);
          }
          
          // 检查数据版本更新（模板和词库）
          if (data.dataVersion && data.dataVersion !== lastAppliedDataVersion) {
            setShowDataUpdateNotice(true);
          }
        }
      } catch (e) {
        // 静默失败
      }
    };
    
    checkUpdates();
    const timer = setInterval(checkUpdates, 5 * 60 * 1000); // 5分钟检查一次
    
    return () => clearInterval(timer);
  }, [lastAppliedDataVersion]); // 移除 lastAppliedAppVersion 依赖

  // History State for Undo/Redo
  const [historyPast, setHistoryPast] = useState([]);
  const [historyFuture, setHistoryFuture] = useState([]);
  const historyLastSaveTime = useRef(0);

  const popoverRef = useRef(null);
  const textareaRef = useRef(null);
  const sidebarRef = useRef(null);
  const posterScrollRef = useRef(null);
  
  // Poster Mode Auto Scroll State
  const [isPosterAutoScrollPaused, setIsPosterAutoScrollPaused] = useState(false);

  // Helper: Translate
  const t = (key, params = {}) => {
    let str = TRANSLATIONS[language][key] || key;
    Object.keys(params).forEach(k => {
        str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

  const displayTag = React.useCallback((tag) => {
    return TAG_LABELS[language]?.[tag] || tag;
  }, [language]);

  // 确保有一个有效的 activeTemplateId - 自动选择第一个模板
  useEffect(() => {
      if (templates.length > 0) {
          // 检查当前 activeTemplateId 是否有效
          const currentTemplateExists = templates.some(t => t.id === activeTemplateId);
          if (!currentTemplateExists || !activeTemplateId) {
              // 如果当前选中的模板不存在或为空，选择第一个模板
              console.log('[自动选择] 选择第一个模板:', templates[0].id);
              setActiveTemplateId(templates[0].id);
          }
      }
  }, [templates, activeTemplateId]);  // 依赖 templates 和 activeTemplateId

  // 移动端：切换 Tab 时的状态保障
  useEffect(() => {
      // 模版 Tab：强制收起模式 + 列表视图
      if (mobileTab === 'templates') {
          setMasonryStyleKey('list');
      }

      // 编辑 / 词库 Tab：确保有选中的模板
      if ((mobileTab === 'editor' || mobileTab === 'banks') && templates.length > 0 && !activeTemplateId) {
          console.log('[tab切换] 自动选择第一个模板:', templates[0].id);
          setActiveTemplateId(templates[0].id);
      }
  }, [mobileTab, templates, activeTemplateId]);

  // Check File System Access API support and restore directory handle
  useEffect(() => {
      const checkSupport = async () => {
          const supported = 'showDirectoryPicker' in window;
          setIsFileSystemSupported(supported);
          
          // Try to restore directory handle from IndexedDB
          if (supported && storageMode === 'folder') {
              try {
                  const db = await openDB();
                  const handle = await getDirectoryHandle(db);
                  if (handle) {
                      // Verify permission
                      const permission = await handle.queryPermission({ mode: 'readwrite' });
                      if (permission === 'granted') {
                          setDirectoryHandle(handle);
                          // Load data from file system
                          await loadFromFileSystem(handle);
                      } else {
                          // Permission not granted, switch back to browser storage
                          setStorageMode('browser');
                          localStorage.setItem('app_storage_mode', 'browser');
                      }
                  }
              } catch (error) {
                  console.error('恢复文件夹句柄失败:', error);
              }
          }
      };
      
      checkSupport();
  }, []);

  // IndexedDB helper functions for storing directory handle
  const openDB = () => {
      return new Promise((resolve, reject) => {
          const request = indexedDB.open('PromptFillDB', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
          request.onupgradeneeded = (event) => {
              const db = event.target.result;
              if (!db.objectStoreNames.contains('handles')) {
                  db.createObjectStore('handles');
              }
          };
      });
  };

  const saveDirectoryHandle = async (handle) => {
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.put(handle, 'directory');
      } catch (error) {
          console.error('保存文件夹句柄失败:', error);
      }
  };

  const getDirectoryHandle = async (db) => {
      try {
          const transaction = db.transaction(['handles'], 'readonly');
          const store = transaction.objectStore('handles');
          return new Promise((resolve, reject) => {
              const request = store.get('directory');
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
          });
      } catch (error) {
          console.error('获取文件夹句柄失败:', error);
          return null;
      }
  };

  // Fix initial categories if empty (migration safety)
  useEffect(() => {
      if (!categories || Object.keys(categories).length === 0) {
          setCategories(INITIAL_CATEGORIES);
      }
  }, []);

  // Ensure all templates have tags field and sync default templates' tags (migration safety)
  useEffect(() => {
    let needsUpdate = false;
    const updatedTemplates = templates.map(t => {
      // Find if this is a default template
      const defaultTemplate = INITIAL_TEMPLATES_CONFIG.find(dt => dt.id === t.id);
      
      if (defaultTemplate) {
        // Sync tags from default template if it's a built-in one
        if (JSON.stringify(t.tags) !== JSON.stringify(defaultTemplate.tags)) {
          needsUpdate = true;
          return { ...t, tags: defaultTemplate.tags || [] };
        }
      } else if (!t.tags) {
        // User-created template without tags
        needsUpdate = true;
        return { ...t, tags: [] };
      }
      
      return t;
    });
    
    if (needsUpdate) {
      setTemplates(updatedTemplates);
    }
  }, []);

  // Derived State: Current Active Template
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // --- Effects ---
  // Reset history when template changes
  useEffect(() => {
      setHistoryPast([]);
      setHistoryFuture([]);
      historyLastSaveTime.current = 0;
  }, [activeTemplateId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Poster Mode Auto Scroll Animation with Ping-Pong Effect
  // Poster Mode Auto Scroll - Optimized with requestAnimationFrame
  useEffect(() => {
    if (masonryStyleKey !== 'poster' || !posterScrollRef.current || isPosterAutoScrollPaused || !isDiscoveryView) {
      return;
    }

    const scrollContainer = posterScrollRef.current;
    let scrollDirection = 1; // 1 = down, -1 = up
    const scrollSpeed = 0.5; // 每次滚动的像素数
    let animationFrameId;

    const performScroll = () => {
      if (!scrollContainer) return;

      const currentScroll = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      // 到达底部，改变方向向上
      if (scrollDirection === 1 && currentScroll >= maxScroll - 1) {
        scrollDirection = -1;
      }
      // 到达顶部，改变方向向下
      else if (scrollDirection === -1 && currentScroll <= 1) {
        scrollDirection = 1;
      }

      // 执行滚动
      scrollContainer.scrollTop += scrollSpeed * scrollDirection;
      animationFrameId = requestAnimationFrame(performScroll);
    };

    animationFrameId = requestAnimationFrame(performScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [masonryStyleKey, isPosterAutoScrollPaused, isDiscoveryView]);

  // Resizing Logic
  useEffect(() => {
      const handleMouseMove = (e) => {
          if (!isResizing) return;
          // New Layout: Bank Sidebar is on the Right.
          // Width = Window Width - Mouse X
          const newWidth = window.innerWidth - e.clientX;
          
          if (newWidth > 280 && newWidth < 800) { // Min/Max constraints
              setBankSidebarWidth(newWidth);
          }
      };

      const handleMouseUp = () => {
          setIsResizing(false);
          document.body.style.cursor = 'default';
          document.body.style.userSelect = 'auto';
      };

      if (isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none'; // Prevent text selection while resizing
      }

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isResizing, setBankSidebarWidth]);

  const startResizing = () => {
      setIsResizing(true);
  };

  // --- Template Actions ---

  const handleAddTemplate = () => {
    const newId = `tpl_${Date.now()}`;
    const newTemplate = {
      id: newId,
      name: t('new_template_name'),
      author: "",
      content: t('new_template_content'),
      selections: {},
      tags: []
    };
    setTemplates([...templates, newTemplate]);
    setActiveTemplateId(newId);
    setIsEditing(true);
    // 在移动端自动切换到编辑Tab
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  };

  const handleDuplicateTemplate = (t_item, e) => {
      e.stopPropagation();
      const newId = `tpl_${Date.now()}`;
      
      const duplicateName = (name) => {
        if (typeof name === 'string') return `${name}${t('copy_suffix')}`;
        const newName = { ...name };
        Object.keys(newName).forEach(lang => {
          const suffix = TRANSLATIONS[lang]?.copy_suffix || ' (Copy)';
          newName[lang] = `${newName[lang]}${suffix}`;
        });
        return newName;
      };

      const newTemplate = {
          ...t_item,
          id: newId,
          name: duplicateName(t_item.name),
          author: t_item.author || "",
          selections: { ...t_item.selections }
      };
      setTemplates([...templates, newTemplate]);
      setActiveTemplateId(newId);
      // 在移动端自动切换到编辑Tab
      if (isMobileDevice) {
        setMobileTab('editor');
      }
  };

  const handleDeleteTemplate = (id, e) => {
    e.stopPropagation();
    if (templates.length <= 1) {
      alert(t('alert_keep_one'));
      return;
    }
    if (window.confirm(t('confirm_delete_template'))) {
      const newTemplates = templates.filter(t => t.id !== id);
      setTemplates(newTemplates);
      if (activeTemplateId === id) {
        setActiveTemplateId(newTemplates[0].id);
      }
    }
  };

  const handleResetTemplate = (id, e) => {
    e.stopPropagation();
    if (!window.confirm(t('confirm_reset_template'))) return;

    const original = INITIAL_TEMPLATES_CONFIG.find(t => t.id === id);
    if (!original) return;

    setTemplates(prev => prev.map(t => 
      t.id === id ? JSON.parse(JSON.stringify(original)) : t
    ));
  };

  const startRenamingTemplate = (t_item, e) => {
    e.stopPropagation();
    setEditingTemplateNameId(t_item.id);
    setTempTemplateName(getLocalized(t_item.name, language));
    setTempTemplateAuthor(t_item.author || "");
  };

  const saveTemplateName = () => {
    if (tempTemplateName.trim()) {
      setTemplates(prev => prev.map(t_item => {
        if (t_item.id === editingTemplateNameId) {
          const newName = typeof t_item.name === 'object' 
            ? { ...t_item.name, [language]: tempTemplateName }
            : tempTemplateName;
          return { ...t_item, name: newName, author: tempTemplateAuthor };
        }
        return t_item;
      }));
    }
    setEditingTemplateNameId(null);
  };

  // 刷新系统模板与词库，保留用户数据
  const handleRefreshSystemData = React.useCallback(() => {
    const backupSuffix = t('refreshed_backup_suffix') || '';
    
    // 迁移旧格式的 selections：将字符串值转换为对象格式
    const migratedTemplates = templates.map(tpl => {
      const newSelections = {};
      Object.entries(tpl.selections || {}).forEach(([key, value]) => {
        if (typeof value === 'string' && banks[key.split('-')[0]]) {
          // 查找对应的词库选项
          const bankKey = key.split('-')[0];
          const bank = banks[bankKey];
          if (bank && bank.options) {
            const matchedOption = bank.options.find(opt => 
              (typeof opt === 'string' && opt === value) ||
              (typeof opt === 'object' && (opt.cn === value || opt.en === value))
            );
            newSelections[key] = matchedOption || value;
          } else {
            newSelections[key] = value;
          }
        } else {
          newSelections[key] = value;
        }
      });
      return { ...tpl, selections: newSelections };
    });
    
    const templateResult = mergeTemplatesWithSystem(migratedTemplates, { backupSuffix });
    const bankResult = mergeBanksWithSystem(banks, defaults, { backupSuffix });

    setTemplates(templateResult.templates);
    setBanks(bankResult.banks);
    setDefaults(bankResult.defaults);
    setActiveTemplateId(prev => templateResult.templates.some(t => t.id === prev) ? prev : "tpl_default");

    const notes = [...templateResult.notes, ...bankResult.notes];
    if (notes.length > 0) {
      alert(`${t('refresh_done_with_conflicts')}\n- ${notes.join('\n- ')}`);
    } else {
      alert(t('refresh_done_no_conflict'));
    }
  }, [banks, defaults, templates, t]);

  const handleAutoUpdate = () => {
    handleRefreshSystemData();
    setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
    setShowDataUpdateNotice(false);
  };

  // Template Tags Management
  const handleUpdateTemplateTags = (templateId, newTags) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, tags: newTags } : t
    ));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prevTag => prevTag === tag ? "" : tag);
  };

  // Filter templates based on search and tags
  const filteredTemplates = React.useMemo(() => {
    return templates.filter(t => {
    // Search filter
    const templateName = getLocalized(t.name, language);
    const matchesSearch = !searchQuery || 
      templateName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tag filter
    const matchesTags = selectedTags === "" || 
      (t.tags && t.tags.includes(selectedTags));

    // 语言过滤：如果模板指定了语言，且不包含当前语言，则隐藏
    // 如果没有指定语言属性，默认显示（向下兼容）
    const templateLangs = t.language ? (Array.isArray(t.language) ? t.language : [t.language]) : ['cn', 'en'];
    const matchesLanguage = templateLangs.includes(language);
    
    return matchesSearch && matchesTags && matchesLanguage;
  }).sort((a, b) => {
    // Sort templates based on sortOrder
    const nameA = getLocalized(a.name, language);
    const nameB = getLocalized(b.name, language);
    switch(sortOrder) {
      case 'newest':
        // Assuming templates array index as chronological order (newer = later in array)
        return templates.indexOf(b) - templates.indexOf(a);
      case 'oldest':
        return templates.indexOf(a) - templates.indexOf(b);
      case 'a-z':
        return nameA.localeCompare(nameB, language === 'cn' ? 'zh-CN' : 'en');
      case 'z-a':
        return nameB.localeCompare(nameA, language === 'cn' ? 'zh-CN' : 'en');
      case 'random':
        // 使用模板ID和随机种子生成伪随机数进行排序
        const hashA = (a.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = (b.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hashA - hashB;
      default:
        return 0;
    }
  });
  }, [templates, searchQuery, selectedTags, sortOrder, randomSeed, language]);

  const fileInputRef = useRef(null);
  
  const handleUploadImage = (e) => {
      try {
          const file = e.target.files?.[0];
          if (!file) return;
          
          // 验证文件类型
          if (!file.type.startsWith('image/')) {
              if (storageMode === 'browser') {
                  alert('请选择图片文件');
              }
              return;
          }
          
          // 移除文件大小限制，让用户自由上传
          // 如果超出localStorage限制，会在useStickyState中捕获并提示
          
          const reader = new FileReader();
          
          reader.onloadend = () => {
              try {
                  setTemplates(prev => prev.map(t => {
                      if (t.id !== activeTemplateId) return t;
                      
                      if (imageUpdateMode === 'add') {
                        const newUrls = [...(t.imageUrls || [t.imageUrl]), reader.result];
                        return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
                      } else {
                        // Replace current index
                        if (t.imageUrls && Array.isArray(t.imageUrls)) {
                          const newUrls = [...t.imageUrls];
                          newUrls[currentImageEditIndex] = reader.result;
                          return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
                        }
                        return { ...t, imageUrl: reader.result };
                      }
                  }));
              } catch (error) {
                  console.error('图片上传失败:', error);
                  if (storageMode === 'browser' && error.name === 'QuotaExceededError') {
                      alert('存储空间不足！图片过大。\n建议：\n1. 使用图片链接（URL）方式\n2. 压缩图片（tinypng.com）\n3. 导出备份后清空数据');
                  } else {
                      if (storageMode === 'browser') {
                          alert('图片上传失败，请重试');
                      }
                  }
              }
          };
          
          reader.onerror = () => {
              console.error('文件读取失败');
              if (storageMode === 'browser') {
                  alert('文件读取失败，请重试');
              }
          };
          
          reader.readAsDataURL(file);
      } catch (error) {
          console.error('上传图片出错:', error);
          if (storageMode === 'browser') {
              alert('上传图片出错，请重试');
          }
      } finally {
          // 重置input，允许重复选择同一文件
          if (e.target) {
              e.target.value = '';
          }
      }
  };

  const handleResetImage = () => {
      const defaultUrl = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId)?.imageUrl;
      const defaultUrls = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId)?.imageUrls;
      
      setTemplates(prev => prev.map(t => 
          t.id === activeTemplateId ? { ...t, imageUrl: defaultUrl, imageUrls: defaultUrls } : t
      ));
  };

  const handleSetImageUrl = () => {
      if (!imageUrlInput.trim()) return;
      
      setTemplates(prev => prev.map(t => {
          if (t.id !== activeTemplateId) return t;
          
          if (imageUpdateMode === 'add') {
            const newUrls = [...(t.imageUrls || [t.imageUrl]), imageUrlInput];
            return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
          } else {
            // Replace current index
            if (t.imageUrls && Array.isArray(t.imageUrls)) {
              const newUrls = [...t.imageUrls];
              newUrls[currentImageEditIndex] = imageUrlInput;
              return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
            }
            return { ...t, imageUrl: imageUrlInput };
          }
      }));
      setImageUrlInput("");
      setShowImageUrlInput(false);
  };

  // --- 导出/导入功能 ---
  const handleExportTemplate = async (template) => {
      try {
          const templateName = getLocalized(template.name, language);
          const dataStr = JSON.stringify(template, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const filename = `${templateName.replace(/\s+/g, '_')}_template.json`;
          
          // 检测是否为移动设备（尤其是iOS）
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          
          if (isMobileDevice && navigator.share) {
              // 移动端：使用 Web Share API
              try {
                  const file = new File([dataBlob], filename, { type: 'application/json' });
                  if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      await navigator.share({
                          files: [file],
                          title: templateName,
                          text: '导出的提示词模板'
                      });
                      showToastMessage('✅ 模板已分享/保存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失败，使用降级方案', shareError);
              }
          }
          
          // 桌面端或降级方案：使用传统下载方式
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // iOS Safari 特殊处理
          if (isIOS) {
              link.target = '_blank';
          }
          
          document.body.appendChild(link);
          link.click();
          
          // 延迟清理，确保iOS有足够时间处理
          setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
          }, 100);
          
          showToastMessage('✅ 模板已导出');
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleExportAllTemplates = async () => {
      try {
          const exportData = {
              templates,
              banks,
              categories,
              version: 'v9',
              exportDate: new Date().toISOString()
          };
          const dataStr = JSON.stringify(exportData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const filename = `prompt_fill_backup_${Date.now()}.json`;
          
          // 检测是否为移动设备（尤其是iOS）
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          
          if (isMobileDevice && navigator.share) {
              // 移动端：使用 Web Share API
              try {
                  const file = new File([dataBlob], filename, { type: 'application/json' });
                  if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      await navigator.share({
                          files: [file],
                          title: '提示词填空器备份',
                          text: '所有模板和词库的完整备份'
                      });
                      showToastMessage('✅ 备份已分享/保存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失败，使用降级方案', shareError);
              }
          }
          
          // 桌面端或降级方案：使用传统下载方式
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // iOS Safari 特殊处理
          if (isIOS) {
              link.target = '_blank';
          }
          
          document.body.appendChild(link);
          link.click();
          
          // 延迟清理，确保iOS有足够时间处理
          setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
          }, 100);
          
          showToastMessage('✅ 备份已导出');
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleImportTemplate = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const data = JSON.parse(e.target.result);
              
              // 检查是单个模板还是完整备份
              if (data.templates && Array.isArray(data.templates)) {
                  // 完整备份
                  if (window.confirm('检测到完整备份文件。是否要覆盖当前所有数据？')) {
                      setTemplates(data.templates);
                      if (data.banks) setBanks(data.banks);
                      if (data.categories) setCategories(data.categories);
                      alert('导入成功！');
                  }
              } else if (data.id && data.name) {
                  // 单个模板
                  const newId = `tpl_${Date.now()}`;
                  const newTemplate = { ...data, id: newId };
                  setTemplates(prev => [...prev, newTemplate]);
                  setActiveTemplateId(newId);
                  alert('模板导入成功！');
              } else {
                  alert('文件格式不正确');
              }
          } catch (error) {
              console.error('导入失败:', error);
              alert('导入失败，请检查文件格式');
          }
      };
      reader.readAsText(file);
      
      // 重置input
      event.target.value = '';
  };

  // --- File System Access API Functions ---
  const handleSelectDirectory = async () => {
      try {
          if (!isFileSystemSupported) {
              alert(t('browser_not_supported'));
              return;
          }

          const handle = await window.showDirectoryPicker({
              mode: 'readwrite',
              startIn: 'documents'
          });
          
          setDirectoryHandle(handle);
          setStorageMode('folder');
          localStorage.setItem('app_storage_mode', 'folder');
          
          // Save handle to IndexedDB for future use
          await saveDirectoryHandle(handle);
          
          // 尝试保存当前数据到文件夹
          await saveToFileSystem(handle);
          alert(t('auto_save_enabled'));
      } catch (error) {
          console.error('选择文件夹失败:', error);
          if (error.name !== 'AbortError') {
              alert(t('folder_access_denied'));
          }
      }
  };

  const saveToFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const data = {
              templates,
              banks,
              categories,
              defaults,
              version: 'v9',
              lastSaved: new Date().toISOString()
          };
          
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json', { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(JSON.stringify(data, null, 2));
          await writable.close();
          
          console.log('数据已保存到本地文件夹');
      } catch (error) {
          console.error('保存到文件系统失败:', error);
      }
  };

  const loadFromFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json');
          const file = await fileHandle.getFile();
          const text = await file.text();
          const data = JSON.parse(text);
          
          if (data.templates) setTemplates(data.templates);
          if (data.banks) setBanks(data.banks);
          if (data.categories) setCategories(data.categories);
          if (data.defaults) setDefaults(data.defaults);
          
          console.log('从本地文件夹加载数据成功');
      } catch (error) {
          console.error('从文件系统读取失败:', error);
      }
  };

  // Auto-save to file system when data changes
  useEffect(() => {
      if (storageMode === 'folder' && directoryHandle) {
          const timeoutId = setTimeout(() => {
              saveToFileSystem(directoryHandle);
          }, 1000); // Debounce 1 second
          
          return () => clearTimeout(timeoutId);
      }
  }, [templates, banks, categories, defaults, storageMode, directoryHandle]);

  // 存储空间管理
  const getStorageSize = () => {
      try {
          let total = 0;
          for (let key in localStorage) {
              if (localStorage.hasOwnProperty(key)) {
                  total += localStorage[key].length + key.length;
              }
          }
          return (total / 1024).toFixed(2); // KB
      } catch (error) {
          return '0';
      }
  };

  function handleClearAllData() {
      if (window.confirm(t('confirm_clear_all'))) {
          try {
              // 只清除应用相关的数据
              const keysToRemove = Object.keys(localStorage).filter(key => 
                  key.startsWith('app_')
              );
              keysToRemove.forEach(key => localStorage.removeItem(key));
              
              // 刷新页面
              window.location.reload();
          } catch (error) {
              console.error('清除数据失败:', error);
              alert('清除数据失败');
          }
      }
  }

  function handleCompleteBackup() {
    handleExportAllTemplates();
  }

  function handleImportAllData(event) {
    handleImportTemplate(event);
  }

  function handleResetSystemData() {
    if (window.confirm('确定要重置系统数据吗？这将清除所有本地修改并重新从系统加载初始模板。')) {
        localStorage.removeItem('app_templates');
        localStorage.removeItem('app_banks');
        localStorage.removeItem('app_categories');
        window.location.reload();
    }
  }
  
  const handleSwitchToLocalStorage = async () => {
      setStorageMode('browser');
      setDirectoryHandle(null);
      localStorage.setItem('app_storage_mode', 'browser');
      
      // Clear directory handle from IndexedDB
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.delete('directory');
      } catch (error) {
          console.error('清除文件夹句柄失败:', error);
      }
  };
  
  const handleManualLoadFromFolder = async () => {
      if (directoryHandle) {
          try {
              await loadFromFileSystem(directoryHandle);
              alert('从文件夹加载成功！');
          } catch (error) {
              alert('从文件夹加载失败，请检查文件是否存在');
          }
      }
  };

  const updateActiveTemplateContent = React.useCallback((newContent, forceSaveHistory = false) => {
    // History Management
    const now = Date.now();
    const shouldSave = forceSaveHistory || (now - historyLastSaveTime.current > 1000);

    if (shouldSave) {
        setHistoryPast(prev => [...prev, activeTemplate.content]);
        setHistoryFuture([]); // Clear redo stack on new change
        historyLastSaveTime.current = now;
    }

    setTemplates(prev => prev.map(t => 
      t.id === activeTemplateId ? { ...t, content: newContent } : t
    ));
  }, [activeTemplate.content, activeTemplateId, setTemplates]);

  const handleUndo = React.useCallback(() => {
      if (historyPast.length === 0) return;
      
      const previous = historyPast[historyPast.length - 1];
      const newPast = historyPast.slice(0, -1);
      
      setHistoryFuture(prev => [activeTemplate.content, ...prev]);
      setHistoryPast(newPast);
      
      // Direct update without saving history again
      setTemplates(prev => prev.map(t => 
        t.id === activeTemplateId ? { ...t, content: previous } : t
      ));
  }, [activeTemplate.content, activeTemplateId, historyPast, setTemplates]);

  const handleRedo = React.useCallback(() => {
      if (historyFuture.length === 0) return;

      const next = historyFuture[0];
      const newFuture = historyFuture.slice(1);

      setHistoryPast(prev => [...prev, activeTemplate.content]);
      setHistoryFuture(newFuture);

      // Direct update without saving history again
      setTemplates(prev => prev.map(t => 
        t.id === activeTemplateId ? { ...t, content: next } : t
      ));
  }, [activeTemplate.content, activeTemplateId, historyFuture, setTemplates]);

  const updateActiveTemplateSelection = React.useCallback((uniqueKey, value) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === activeTemplateId) {
        return {
          ...t,
          selections: { ...t.selections, [uniqueKey]: value }
        };
      }
      return t;
    }));
  }, [activeTemplateId, setTemplates]);

  // --- Bank Actions ---

  const handleSelect = React.useCallback((key, index, value) => {
    const uniqueKey = `${key}-${index}`;
    updateActiveTemplateSelection(uniqueKey, value);
    setActivePopover(null);
  }, [updateActiveTemplateSelection]);

  const handleAddCustomAndSelect = React.useCallback((key, index, newValue) => {
    if (!newValue || !newValue.trim()) return;
    
    // 1. Add to bank if not exists
    if (!banks[key].options.includes(newValue)) {
        handleAddOption(key, newValue);
    }
    
    // 2. Select it
    handleSelect(key, index, newValue);
  }, [banks, handleSelect]);

  const handleAddOption = React.useCallback((key, newOption) => {
    if (!newOption.trim()) return;
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: [...prev[key].options, newOption]
      }
    }));
  }, [setBanks]);

  const handleDeleteOption = React.useCallback((key, optionToDelete) => {
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options.filter(opt => opt !== optionToDelete)
      }
    }));
  }, [setBanks]);

  const handleStartAddBank = (catId) => {
    setNewBankCategory(catId);
    setIsAddingBank(true);
  };

  const handleAddBank = () => {
    if (!newBankLabel.trim() || !newBankKey.trim()) return;
    const safeKey = newBankKey.trim().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    
    if (banks[safeKey]) {
      alert(t('alert_id_exists'));
      return;
    }

    setBanks(prev => ({
      ...prev,
      [safeKey]: {
        label: newBankLabel,
        category: newBankCategory,
        options: []
      }
    }));
    setDefaults(prev => ({ ...prev, [safeKey]: "" }));
    setNewBankLabel("");
    setNewBankKey("");
    setNewBankCategory("other");
    setIsAddingBank(false);
  };

  const handleDeleteBank = (key) => {
    const bankLabel = getLocalized(banks[key].label, language);
    if (window.confirm(t('confirm_delete_bank', { name: bankLabel }))) {
      const newBanks = { ...banks };
      delete newBanks[key];
      setBanks(newBanks);
    }
  };

  const handleUpdateBankCategory = (key, newCategory) => {
      setBanks(prev => ({
          ...prev,
          [key]: {
              ...prev[key],
              category: newCategory
          }
      }));
  };

  // --- Editor Actions ---

  const insertVariableToTemplate = (key, dropPoint = null) => {
    const textToInsert = ` {{${key}}} `;
    const currentContent = activeTemplate.content || "";
    const isMultilingual = typeof currentContent === 'object';
    const text = isMultilingual ? (currentContent[templateLanguage] || "") : currentContent;

    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        const updatedText = text + textToInsert;
        if (isMultilingual) {
          updateActiveTemplateContent({ ...currentContent, [templateLanguage]: updatedText }, true);
        } else {
          updateActiveTemplateContent(updatedText, true);
        }
        if(textareaRef.current) textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }, 50);
      return;
    };

    const textarea = textareaRef.current;
    if (!textarea) return;

    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;

    // 移动端模拟拖拽的特殊处理：计算落点位置
    if (dropPoint) {
      const { x, y } = dropPoint;
      let range;
      if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(x, y);
      } else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (pos) {
          range = document.createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
        }
      }
      
      if (range && range.startContainer) {
        // 对于 textarea，我们需要手动计算偏移，这很困难
        // 简化方案：如果在 textarea 区域内释放，则插入到最后或保持当前光标
        // 但如果是在编辑器内，我们通常已经聚焦了
      }
    }

    const safeText = String(text);
    const before = safeText.substring(0, start);
    const after = safeText.substring(end, safeText.length);
    const updatedText = `${before}${textToInsert}${after}`;
    
    if (isMultilingual) {
      updateActiveTemplateContent({ ...currentContent, [templateLanguage]: updatedText }, true);
    } else {
      updateActiveTemplateContent(updatedText, true);
    }
    
    setTimeout(() => {
      textarea.focus();
      const newPos = start + textToInsert.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleCopy = () => {
    // 获取当前模板语言的内容
    let finalString = getLocalized(activeTemplate.content, templateLanguage);
    const counters = {};

    finalString = finalString.replace(/{{(.*?)}}/g, (match, key) => {
        const k = key.trim();
        const idx = counters[k] || 0;
        counters[k] = idx + 1;

        const uniqueKey = `${k}-${idx}`;
        // Prioritize selection, then default, and get localized value
        const value = activeTemplate.selections[uniqueKey] || defaults[k];
        return getLocalized(value, templateLanguage) || match;
    });

    const cleanText = finalString
        .replace(/###\s/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n\s*\n/g, '\n\n');

    navigator.clipboard.writeText(cleanText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleExportImage = async () => {
    const element = document.getElementById('preview-card');
    if (!element) return;

    setIsExporting(true);
    
    // --- 关键修复：预处理图片为 Base64 ---
    // 这能彻底解决 html2canvas 的跨域 (CORS) 和图片加载不全问题
    // 我们手动 fetch 图片 blob 并转为 base64，绕过 canvas 的跨域限制
    const templateDefault = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId);
    const originalImageSrc = activeTemplate.imageUrl || templateDefault?.imageUrl || "";
    let tempBase64Src = null;
    const imgElement = element.querySelector('img');

    if (imgElement && originalImageSrc) {
        // 如果当前 img 没有正确的 src，先补上默认 src
        if (!imgElement.src || imgElement.src.trim() === "" || imgElement.src.includes("data:image") === false) {
          imgElement.src = originalImageSrc;
        }
    }

    if (imgElement && originalImageSrc && originalImageSrc.startsWith('http')) {
        try {
            // 尝试通过 fetch 获取图片数据
            const response = await fetch(originalImageSrc);
            const blob = await response.blob();
            tempBase64Src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            
            // 临时替换为 Base64
            imgElement.src = tempBase64Src;
            await waitForImageLoad(imgElement);
        } catch (e) {
            console.warn("图片 Base64 转换失败，尝试直接导出", e);
            // 如果 fetch 失败（比如彻底的 CORS 封锁），我们只能尝试允许 canvas 污染
            // 但通常 fetch 失败意味着 canvas 也会失败
        }
    } else if (imgElement) {
        // 即便没转 base64，也要确保当前展示图已加载完成
        await waitForImageLoad(imgElement);
    }

    // 预加载二维码（使用本地文件并转换为 base64）
    const websiteUrl = 'https://promptfill.tanshilong.com/';
    const localQrCodePath = '/QRCode.png';
    let qrCodeBase64 = null;
    
    try {
        console.log('正在加载本地二维码...', localQrCodePath);
        const qrResponse = await fetch(localQrCodePath);
        if (!qrResponse.ok) throw new Error('本地二维码加载失败');
        const qrBlob = await qrResponse.blob();
        qrCodeBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('本地二维码加载成功');
                resolve(reader.result);
            };
            reader.readAsDataURL(qrBlob);
        });
    } catch (e) {
        console.error("本地二维码加载失败", e);
        // 即使失败也继续，会显示占位符
    }

    try {
        // 创建一个临时的导出容器
        const exportContainer = document.createElement('div');
        exportContainer.id = 'export-container-temp';
        exportContainer.style.position = 'fixed';
        exportContainer.style.left = '-99999px';
        exportContainer.style.top = '0';
        exportContainer.style.width = '900px'; // 修改宽度：860px卡片 + 20px*2边距
        exportContainer.style.minHeight = '800px';
        exportContainer.style.padding = '20px'; // 橙色背景距离卡片四周各20px
        exportContainer.style.background = '#fafafa';
        exportContainer.style.display = 'flex';
        exportContainer.style.alignItems = 'center';
        exportContainer.style.justifyContent = 'center';
        document.body.appendChild(exportContainer);
        
        // 创建橙色渐变背景层
        const bgLayer = document.createElement('div');
        bgLayer.style.position = 'absolute';
        bgLayer.style.inset = '0';
        bgLayer.style.background = 'linear-gradient(180deg, #F08F62 0%, #EB7A54 100%)';
        bgLayer.style.zIndex = '0';
        exportContainer.appendChild(bgLayer);
        
        // 克隆 preview-card
        const clonedCard = element.cloneNode(true);
        clonedCard.style.position = 'relative';
        clonedCard.style.zIndex = '10';
        clonedCard.style.background = 'rgba(255, 255, 255, 0.98)';
        clonedCard.style.borderRadius = '24px';
        clonedCard.style.boxShadow = '0 8px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 16px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)'; // 更细腻的多层阴影
        clonedCard.style.border = '1px solid rgba(255, 255, 255, 0.8)';
        clonedCard.style.padding = '40px 45px';
        clonedCard.style.margin = '0 auto';
        clonedCard.style.width = '860px'; // 修改宽度：固定卡片宽度为860px
        clonedCard.style.boxSizing = 'border-box';
        clonedCard.style.fontFamily = '"PingFang SC", "Microsoft YaHei", sans-serif';
        clonedCard.style.webkitFontSmoothing = 'antialiased';
        exportContainer.appendChild(clonedCard);
        
        const canvas = await html2canvas(exportContainer, {
            scale: 2.0, // 适中的分辨率，640px容器输出1280px宽度
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('export-container-temp');
                if (clonedElement) {
                   const card = clonedElement.querySelector('#preview-card');
                   if (!card) return;

                   // 获取原始数据
                   const originalImg = card.querySelector('img');
                   const imgSrc = tempBase64Src || (originalImg ? originalImg.src : '');
                   const titleElement = card.querySelector('h2');
                   const titleText = titleElement ? titleElement.textContent.trim() : getLocalized(activeTemplate.name, language);
                   const contentElement = card.querySelector('#final-prompt-content');
                   const contentHTML = contentElement ? contentElement.innerHTML : '';
                   
                   console.log('正文内容获取:', contentHTML ? '成功' : '失败', contentHTML.length);
                   
                   // 获取版本号（动态从原始DOM）
                   const metaContainer = card.querySelector('.flex.flex-wrap.gap-2');
                   const versionElement = metaContainer ? metaContainer.querySelector('.bg-orange-50') : null;
                   const versionText = versionElement ? versionElement.textContent.trim() : '';
                   
                   // 清空卡片内容
                   card.innerHTML = '';
                   
                   // --- 1. 图片区域（顶部，保持原始宽高比不裁切）---
                   if (imgSrc) {
                       const imgContainer = clonedDoc.createElement('div');
                       imgContainer.style.width = '100%';
                       imgContainer.style.marginBottom = '30px';
                       imgContainer.style.display = 'flex';
                       imgContainer.style.justifyContent = 'center';
                       imgContainer.style.alignItems = 'center';
                       
                       const img = clonedDoc.createElement('img');
                       img.src = imgSrc;
                       img.style.width = '100%'; // 充分利用卡片宽度
                       img.style.height = 'auto'; // 高度自动，保持原始宽高比
                       img.style.objectFit = 'contain'; // 包含模式，不裁切图片
                       img.style.borderRadius = '12px'; // 加入圆角
                       img.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                       img.style.boxSizing = 'border-box';
                       
                       imgContainer.appendChild(img);
                       card.appendChild(imgContainer);
                   }
                   
                   // --- 2. 标题区域（无版本号、无标签）---
                   const titleContainer = clonedDoc.createElement('div');
                   titleContainer.style.marginBottom = '25px';
                   
                   const title = clonedDoc.createElement('h2');
                   title.textContent = titleText;
                   title.style.fontSize = '32px'; // 恢复原状
                   title.style.fontWeight = '700';
                   title.style.color = '#1f2937';
                   title.style.margin = '0';
                   title.style.lineHeight = '1.2';
                   
                   titleContainer.appendChild(title);
                   card.appendChild(titleContainer);
                   
                   // --- 3. 正文区域（不重复标题）---
                   if (contentHTML) {
                       const contentContainer = clonedDoc.createElement('div');
                       contentContainer.innerHTML = contentHTML;
                       contentContainer.style.fontSize = '18px'; // 恢复原状
                       contentContainer.style.lineHeight = '1.8';
                       contentContainer.style.color = '#374151';
                       contentContainer.style.marginBottom = '40px';
                       
                       // 修复胶囊样式 - 使用更精确的属性选择器
                       const variables = contentContainer.querySelectorAll('[data-export-pill="true"]');
                       variables.forEach(v => {
                           // 优化父级容器（如果是 Variable 组件的 wrapper）
                           if (v.parentElement && v.parentElement.classList.contains('inline-block')) {
                               v.parentElement.style.display = 'inline';
                               v.parentElement.style.margin = '0';
                           }

                           // 保留原有的背景色和文字颜色，只优化布局
                           v.style.display = 'inline-flex';
                           v.style.alignItems = 'center';
                           v.style.justifyContent = 'center';
                           v.style.padding = '4px 12px'; // 恢复原状
                           v.style.margin = '2px 4px';
                           v.style.borderRadius = '6px'; // 恢复原状
                           v.style.fontSize = '17px'; // 恢复原状
                           v.style.fontWeight = '600';
                           v.style.lineHeight = '1.5';
                           v.style.verticalAlign = 'middle';
                           v.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                           v.style.color = '#ffffff'; // 确保文字是白色
                           v.style.border = 'none'; // 导出时去掉半透明边框，减少干扰
                       });
                       
                       card.appendChild(contentContainer);
                   }
                   
                   // --- 4. 底部水印区域（增加版本号）---
                   const footer = clonedDoc.createElement('div');
                   footer.style.marginTop = '40px';
                   footer.style.paddingTop = '25px';
                   footer.style.paddingBottom = '15px';
                   footer.style.borderTop = '2px solid #e2e8f0';
                   footer.style.display = 'flex';
                   footer.style.justifyContent = 'space-between';
                   footer.style.alignItems = 'center';
                   footer.style.fontFamily = 'sans-serif';
                   
                   const qrCodeHtml = qrCodeBase64 
                       ? `<img src="${qrCodeBase64}" 
                               style="width: 80px; height: 80px; border: 3px solid #e2e8f0; border-radius: 8px; display: block; background: white;" 
                               alt="QR Code" />`
                       : `<div style="width: 80px; height: 80px; border: 3px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-size: 10px; color: #94a3b8; font-weight: 500;">QR Code</div>`;
                   
                   footer.innerHTML = `
                       <div style="flex: 1; padding-right: 20px;">
                           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                               <div style="font-size: 15px; font-weight: 600; color: #1f2937;">
                                   Generated by <span style="color: #6366f1; font-weight: 700;">Prompt Fill</span>
                               </div>
                               ${versionText ? `<span style="font-size: 11px; padding: 3px 10px; background: #fff7ed; color: #f97316; border-radius: 5px; font-weight: 600; border: 1px solid #fed7aa;">${versionText}</span>` : ''}
                           </div>
                           <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; font-weight: 500;">提示词填空器</div>
                           <div style="font-size: 11px; color: #3b82f6; font-weight: 500; background: #eff6ff; padding: 4px 8px; border-radius: 4px; display: inline-block; letter-spacing: 0.3px;">
                               ${websiteUrl}
                           </div>
                       </div>
                       <div style="display: flex; align-items: center;">
                           <div style="text-align: center;">
                               ${qrCodeHtml}
                               <div style="font-size: 9px; color: #94a3b8; margin-top: 4px; font-weight: 500;">扫码访问</div>
                           </div>
                       </div>
                   `;
                   
                   card.appendChild(footer);
                   console.log('新布局已应用');
                }
            }
        });

        // 使用 JPG 格式，质量 0.92（高质量同时节省空间）
        const image = canvas.toDataURL('image/jpeg', 0.92);
        const activeTemplateName = getLocalized(activeTemplate.name, language);
        const filename = `${activeTemplateName.replace(/\s+/g, '_')}_prompt.jpg`;
        
        // 检测是否为移动设备和iOS
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobileDevice) {
            // 移动端：尝试使用 Web Share API 保存到相册
            try {
                // 将 base64 转换为 blob
                const base64Response = await fetch(image);
                const blob = await base64Response.blob();
                const file = new File([blob], filename, { type: 'image/jpeg' });
                
                // 检查是否支持 Web Share API（iOS 13+支持）
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: activeTemplateName,
                        text: '导出的提示词模板'
                    });
                    showToastMessage('✅ 图片已分享，请选择"存储图像"保存到相册');
                } else {
                    // 降级方案：对于iOS，打开新标签页显示图片
                    if (isIOS) {
                        // iOS特殊处理：在新窗口打开图片，用户可以长按保存
                        const newWindow = window.open();
                        if (newWindow) {
                            newWindow.document.write(`
                                <html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>${activeTemplateName}</title>
                                    <style>
                                        body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                                        img { max-width: 100%; height: auto; }
                                        .tip { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.95); padding: 12px 20px; border-radius: 8px; color: #333; font-size: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1000; }
                                    </style>
                                </head>
                                <body>
                                    <div class="tip">长按图片保存到相册 📱</div>
                                    <img src="${image}" alt="${activeTemplateName}" />
                                </body>
                                </html>
                            `);
                            showToastMessage('✅ 请在新页面长按图片保存');
                        } else {
                            // 如果无法打开新窗口，尝试下载
                            const link = document.createElement('a');
                            link.href = image;
                            link.download = filename;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            showToastMessage('✅ 图片已导出，请在新页面保存');
                        }
                    } else {
                        // 安卓等其他移动设备：触发下载
                        const link = document.createElement('a');
                        link.href = image;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showToastMessage('✅ 图片已保存到下载文件夹');
                    }
                }
            } catch (shareError) {
                console.log('Share failed:', shareError);
                // 最终降级方案
                if (isIOS) {
                    // iOS最终方案：打开新标签页
                    const newWindow = window.open();
                    if (newWindow) {
                        newWindow.document.write(`
                            <html>
                            <head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${activeTemplateName}</title></head>
                            <body style="margin:0;padding:20px;background:#000;text-align:center;">
                                <p style="color:#fff;margin-bottom:20px;">长按图片保存到相册 📱</p>
                                <img src="${image}" style="max-width:100%;height:auto;" />
                            </body>
                            </html>
                        `);
                    }
                    showToastMessage('⚠️ 请在新页面长按图片保存');
                } else {
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToastMessage('✅ 图片已保存');
                }
            }
        } else {
            // 桌面端：直接下载
            const link = document.createElement('a');
            link.href = image;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToastMessage('✅ 图片导出成功！');
        }
    } catch (err) {
        console.error("Export failed:", err);
        showToastMessage('❌ 导出失败，请重试');
    } finally {
        // 清理临时容器
        const tempContainer = document.getElementById('export-container-temp');
        if (tempContainer) {
            document.body.removeChild(tempContainer);
        }
        
        // 恢复原始图片 src
        if (imgElement && originalImageSrc) {
            imgElement.src = originalImageSrc;
        }
        setIsExporting(false);
    }
  };

  // 移动端模拟拖拽处理器
  const onTouchDragStart = (key, x, y) => {
    setTouchDraggingVar({ key, x, y });
    setIsBanksDrawerOpen(false); // 开始拖拽立刻收起抽屉
  };

  const onTouchDragMove = (x, y) => {
    if (touchDraggingVar) {
      setTouchDraggingVar(prev => ({ ...prev, x, y }));
    }
  };

  const onTouchDragEnd = (x, y) => {
    if (touchDraggingVar) {
      insertVariableToTemplate(touchDraggingVar.key, { x, y });
      setTouchDraggingVar(null);
    }
  };

  // --- Renderers ---

  return (
    <div 
      className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] font-sans text-slate-800 overflow-hidden md:p-4 md:gap-4 relative select-none"
      onTouchMove={(e) => touchDraggingVar && onTouchDragMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={(e) => touchDraggingVar && onTouchDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
    >
      {/* 移动端拖拽浮层 */}
      {touchDraggingVar && (
        <div 
          className="fixed z-[9999] pointer-events-none px-3 py-1.5 bg-orange-500 text-white rounded-lg shadow-2xl text-xs font-bold font-mono animate-in zoom-in-50 duration-200"
          style={{ 
            left: touchDraggingVar.x, 
            top: touchDraggingVar.y, 
            transform: 'translate(-50%, -150%)',
            boxShadow: '0 0 20px rgba(249,115,22,0.4)'
          }}
        >
          {` {{${touchDraggingVar.key}}} `}
        </div>
      )}
      
      {/* Discovery View (Full Screen Overlay) */}
      {showDiscoveryOverlay ? (
        <div style={{ display: zoomedImage ? 'none' : 'block' }}>
          <DiscoveryView 
          filteredTemplates={filteredTemplates}
          setActiveTemplateId={setActiveTemplateId}
          setDiscoveryView={handleSetDiscoveryView}
          setZoomedImage={setZoomedImage}
          posterScrollRef={posterScrollRef}
          setIsPosterAutoScrollPaused={setIsPosterAutoScrollPaused}
          currentMasonryStyle={MASONRY_STYLES[masonryStyleKey]}
          AnimatedSlogan={isMobileDevice ? MobileAnimatedSlogan : AnimatedSlogan}
          isSloganActive={!zoomedImage}
          t={t}
          TAG_STYLES={TAG_STYLES}
          displayTag={displayTag}
          handleRefreshSystemData={handleRefreshSystemData}
          language={language}
          setLanguage={setLanguage}
          setIsSettingsOpen={setIsSettingsOpen}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setRandomSeed={setRandomSeed}
        />
        </div>
      ) : (
        <>
          <TemplatesSidebar 
            mobileTab={mobileTab}
            isTemplatesDrawerOpen={isTemplatesDrawerOpen}
            setIsTemplatesDrawerOpen={setIsTemplatesDrawerOpen}
            setDiscoveryView={handleSetDiscoveryView}
            activeTemplateId={activeTemplateId}
            setActiveTemplateId={setActiveTemplateId} 
            filteredTemplates={filteredTemplates}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            TEMPLATE_TAGS={TEMPLATE_TAGS}
            displayTag={displayTag}
            handleRefreshSystemData={handleRefreshSystemData}
            language={language}
            setLanguage={setLanguage}
            setIsSettingsOpen={setIsSettingsOpen}
            t={t}
            isSortMenuOpen={isSortMenuOpen}
            setIsSortMenuOpen={setIsSortMenuOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setRandomSeed={setRandomSeed}
            handleResetTemplate={handleResetTemplate}
            startRenamingTemplate={startRenamingTemplate}
            handleDuplicateTemplate={handleDuplicateTemplate}
            handleExportTemplate={handleExportTemplate}
            handleDeleteTemplate={handleDeleteTemplate}
            handleAddTemplate={handleAddTemplate}
            INITIAL_TEMPLATES_CONFIG={INITIAL_TEMPLATES_CONFIG}
            editingTemplateNameId={editingTemplateNameId}
            tempTemplateName={tempTemplateName}
            setTempTemplateName={setTempTemplateName}
            tempTemplateAuthor={tempTemplateAuthor}
            setTempTemplateAuthor={setTempTemplateAuthor}
            saveTemplateName={saveTemplateName}
            setEditingTemplateNameId={setEditingTemplateNameId}
          />

      {/* --- 2. Main Editor (Middle) --- */}
      <div className={`
          ${(mobileTab === 'editor' || mobileTab === 'settings') ? 'flex fixed inset-0 z-50 bg-white md:static md:bg-white/80' : 'hidden'} 
          md:flex flex-1 flex-col h-full overflow-hidden relative
          md:rounded-3xl border border-white/40 shadow-xl
          origin-left
      `}>
          {/* Mobile Side Drawer Triggers */}
          {isMobileDevice && (
            <>
              <div className={`md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${mobileTab === 'editor' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button 
                  onClick={() => setIsTemplatesDrawerOpen(true)}
                  className="p-3 bg-white/60 backdrop-blur-md rounded-r-2xl shadow-lg border border-l-0 border-white/40 text-gray-400 active:scale-95 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${mobileTab === 'editor' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button 
                  onClick={() => setIsBanksDrawerOpen(true)}
                  className="p-3 bg-white/60 backdrop-blur-md rounded-l-2xl shadow-lg border border-r-0 border-white/40 text-gray-400 active:scale-95 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            </>
          )}
        
        {/* 顶部工具栏 */}
        {(!isMobileDevice || mobileTab !== 'settings') && (
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100/50 flex justify-between items-center z-20 h-auto min-h-[60px] md:min-h-[72px] bg-white/50 backdrop-blur-sm">
            <div className="min-w-0 flex-1 mr-2 flex flex-col justify-center">
              <h1 className="text-base md:text-lg font-bold text-gray-800 truncate">{getLocalized(activeTemplate.name, language)}</h1>
              
              {/* 标签和状态栏 */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                  {/* 状态指示器 */}
                  <div className="hidden md:flex items-center gap-1.5 border-r border-gray-200 pr-2 mr-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isEditing ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></span>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                          {isEditing ? t('editing_status') : t('preview_status')}
                      </p>
                  </div>

                  {/* Tags */}
                  {(activeTemplate.tags || []).map(tag => (
                      <span 
                          key={tag} 
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}
                      >
                          {displayTag(tag)}
                      </span>
                  ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 self-start md:self-center">
               
               <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-200 shadow-inner">
                  <button
                      onClick={() => setIsEditing(false)}
                      className={`
                          p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                          ${!isEditing 
                              ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                      `}
                      title={t('preview_mode')}
                  >
                      <Eye size={16} /> <span className="hidden md:inline">{t('preview_mode')}</span>
                  </button>
                  <button
                      onClick={() => setIsEditing(true)}
                      className={`
                          p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                          ${isEditing 
                              ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                      `}
                      title={t('edit_mode')}
                  >
                      <Edit3 size={16} /> <span className="hidden md:inline">{t('edit_mode')}</span>
                  </button>
               </div>

              <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

              <PremiumButton 
                  onClick={handleExportImage} 
                  disabled={isEditing || isExporting} 
                  title={isExporting ? t('exporting') : t('export_image')} 
                  icon={ImageIcon} 
                  color="orange"
              >
                  <span className="hidden sm:inline">{isExporting ? t('exporting') : t('export_image')}</span>
              </PremiumButton>
              <PremiumButton 
                  onClick={handleCopy} 
                  title={copied ? t('copied') : t('copy_result')} 
                  icon={copied ? Check : CopyIcon} 
                  color={copied ? "emerald" : "orange"}
                  active={true} // Always active look for CTA
                  className="transition-all duration-300 transform hover:-translate-y-0.5"
              >
                   <span className="hidden md:inline ml-1">{copied ? t('copied') : t('copy_result')}</span>
              </PremiumButton>
            </div>
          </div>
        )}

        {/* 核心内容区 */}
        <div className={`flex-1 overflow-hidden relative pb-24 md:pb-0 flex flex-col bg-gradient-to-br from-white/60 to-gray-50/60 ${mobileTab === 'settings' ? 'pt-0' : ''}`}>
            {mobileTab === 'settings' ? (
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                    <MobileSettingsView 
                        language={language}
                        setLanguage={setLanguage}
                        storageMode={storageMode}
                        setStorageMode={setStorageMode}
                        handleImportTemplate={handleImportTemplate}
                        handleExportAllTemplates={handleExportAllTemplates}
                        handleCompleteBackup={handleCompleteBackup}
                        handleImportAllData={handleImportAllData}
                        handleResetSystemData={handleRefreshSystemData}
                        handleClearAllData={handleClearAllData}
                        SYSTEM_DATA_VERSION={SYSTEM_DATA_VERSION}
                        t={t}
                    />
                </div>
            ) : (
              <>
                {isEditing && (
                    <EditorToolbar 
                        onInsertClick={() => setIsInsertModalOpen(true)}
                        canUndo={historyPast.length > 0}
                        canRedo={historyFuture.length > 0}
                        onUndo={handleUndo}
                        onRedo={handleRedo}
                        t={t}
                    />
                )}
                
                {isEditing ? (
                    <div className="flex-1 relative overflow-hidden">
                        <VisualEditor
                            ref={textareaRef}
                            value={getLocalized(activeTemplate.content, templateLanguage)}
                            onChange={(e) => {
                                const newText = e.target.value;
                                if (typeof activeTemplate.content === 'object') {
                                    updateActiveTemplateContent({
                                        ...activeTemplate.content,
                                        [templateLanguage]: newText
                                    });
                                } else {
                                    updateActiveTemplateContent(newText);
                                }
                            }}
                            banks={banks}
                            categories={categories}
                        />
                    </div>
                ) : (
                    <TemplatePreview 
                        activeTemplate={activeTemplate}
                        banks={banks}
                        defaults={defaults}
                        categories={categories}
                        activePopover={activePopover}
                        setActivePopover={setActivePopover}
                        handleSelect={handleSelect}
                        handleAddCustomAndSelect={handleAddCustomAndSelect}
                        popoverRef={popoverRef}
                        t={t}
                        displayTag={displayTag}
                        TAG_STYLES={TAG_STYLES}
                        setZoomedImage={setZoomedImage}
                        fileInputRef={fileInputRef}
                        setShowImageUrlInput={setShowImageUrlInput}
                        handleResetImage={handleResetImage}
                        language={templateLanguage}
                        setLanguage={setTemplateLanguage}
                        // 标签编辑相关
                        TEMPLATE_TAGS={TEMPLATE_TAGS}
                        handleUpdateTemplateTags={handleUpdateTemplateTags}
                        editingTemplateTags={editingTemplateTags}
                        setEditingTemplateTags={setEditingTemplateTags}
                        // 多图编辑相关
                        setImageUpdateMode={setImageUpdateMode}
                        setCurrentImageEditIndex={setCurrentImageEditIndex}
                        // 标题编辑相关
                        editingTemplateNameId={editingTemplateNameId}
                        tempTemplateName={tempTemplateName}
                        setTempTemplateName={setTempTemplateName}
                        saveTemplateName={saveTemplateName}
                        startRenamingTemplate={startRenamingTemplate}
                        setEditingTemplateNameId={setEditingTemplateNameId}
                    />
                )}
              </>
            )}
                     
                     {/* Image URL Input Modal */}
                     {showImageUrlInput && (
                         <div 
                             className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                             onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                         >
                             <div 
                                 className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                                 onClick={(e) => e.stopPropagation()}
                             >
                                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                     <Globe size={20} className="text-blue-500" />
                                     {t('image_url')}
                                 </h3>
                                 <input
                                     autoFocus
                                     type="text"
                                     value={imageUrlInput}
                                     onChange={(e) => setImageUrlInput(e.target.value)}
                                     placeholder={t('image_url_placeholder')}
                                     className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                     onKeyDown={(e) => e.key === 'Enter' && handleSetImageUrl()}
                                 />
                                 <div className="flex gap-3">
                                     <button
                                         onClick={handleSetImageUrl}
                                         disabled={!imageUrlInput.trim()}
                                         className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                     >
                                         {t('use_url')}
                                     </button>
                                     <button
                                         onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                                         className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all"
                                     >
                                         {t('cancel')}
                                     </button>
                                 </div>
                             </div>
                         </div>
                     )}
        </div>
      </div>

          <BanksSidebar 
            mobileTab={mobileTab}
            isBanksDrawerOpen={isBanksDrawerOpen}
            setIsBanksDrawerOpen={setIsBanksDrawerOpen}
            bankSidebarWidth={bankSidebarWidth}
            sidebarRef={sidebarRef}
            startResizing={startResizing}
            setIsCategoryManagerOpen={setIsCategoryManagerOpen}
            categories={categories}
            banks={banks}
            insertVariableToTemplate={insertVariableToTemplate}
            handleDeleteOption={handleDeleteOption}
            handleAddOption={handleAddOption}
            handleDeleteBank={handleDeleteBank}
            handleUpdateBankCategory={handleUpdateBankCategory}
            handleStartAddBank={handleStartAddBank}
            t={t}
            language={templateLanguage}
            onTouchDragStart={onTouchDragStart}
          />
        </>
      )}

      {/* --- Add Bank Modal --- */}
      <AddBankModal
        isOpen={isAddingBank}
        onClose={() => setIsAddingBank(false)}
        t={t}
        categories={categories}
        newBankLabel={newBankLabel}
        setNewBankLabel={setNewBankLabel}
        newBankKey={newBankKey}
        setNewBankKey={setNewBankKey}
        newBankCategory={newBankCategory}
        setNewBankCategory={setNewBankCategory}
        onConfirm={handleAddBank}
      />

      {/* 隐藏的图片选择器 */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUploadImage}
      />

      {/* --- Settings Modal - Enhanced UI --- */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-white via-white to-gray-50/30 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border-2 border-white/60 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-100/80 bg-gradient-to-r from-orange-50/50 via-white to-blue-50/30 backdrop-blur">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>
              
              <div className="relative flex items-center gap-3 text-gray-800">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30">
                  <Settings size={20} />
                </div>
                <div>
                  <p className="text-base font-bold tracking-tight">{t('settings')}</p>
                  <p className="text-xs text-gray-500 font-medium">{t('app_title')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="relative p-2.5 text-gray-400 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
              
              {/* Import / Export - Enhanced */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('import_template')} / {t('export_all_templates')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImportTemplate}
                      className="hidden" 
                      id="import-template-input-modal"
                    />
                    <div 
                      onClick={() => document.getElementById('import-template-input-modal').click()}
                      className="cursor-pointer w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    >
                      <Download size={18} />
                      <span>{t('import_template')}</span>
                    </div>
                  </label>
                  <button
                    onClick={handleExportAllTemplates}
                    className="w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl transition-all duration-300 border-2 border-orange-500 hover:border-orange-600 flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02]"
                  >
                    <Upload size={18} />
                    <span>{t('export_all_templates')}</span>
                  </button>
                </div>
              </div>

              {/* Data Refresh */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('refresh_system')}</p>
                </div>
                <button
                  onClick={handleRefreshSystemData}
                  className="w-full text-center px-5 py-4 text-sm font-semibold bg-white hover:bg-orange-50 text-orange-600 rounded-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-200 flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <RefreshCw size={18} />
                  <span>{t('refresh_system')}</span>
                </button>
              </div>

              {/* Storage - Enhanced */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('storage_mode')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleSwitchToLocalStorage}
                    className={`relative w-full px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 flex items-center justify-between overflow-hidden group ${
                      storageMode === 'browser' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30' 
                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Globe size={18} />
                      <span>{t('use_browser_storage')}</span>
                    </div>
                    {storageMode === 'browser' && (
                      <div className="relative z-10">
                        <Check size={18} className="animate-in zoom-in duration-300" />
                      </div>
                    )}
                    {storageMode === 'browser' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
                    )}
                  </button>
                  <button
                    onClick={handleSelectDirectory}
                    disabled={!isFileSystemSupported || isMobileDevice}
                    className={`relative w-full px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 flex items-center justify-between overflow-hidden group ${
                      storageMode === 'folder' 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/30' 
                        : `bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-200 ${(!isFileSystemSupported || isMobileDevice) ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-300 hover:shadow-md hover:scale-[1.02]'}`
                    }`}
                    title={isMobileDevice ? t('use_browser_storage') : (!isFileSystemSupported ? t('browser_not_supported') : '')}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Download size={18} />
                      <span>{t('use_local_folder')}</span>
                    </div>
                    {storageMode === 'folder' && (
                      <div className="relative z-10">
                        <Check size={18} className="animate-in zoom-in duration-300" />
                      </div>
                    )}
                    {storageMode === 'folder' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent"></div>
                    )}
                  </button>
                </div>

                {storageMode === 'folder' && directoryHandle && (
                  <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/60 rounded-xl text-sm text-green-700 flex items-center justify-between gap-3 shadow-sm animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-2.5 font-medium">
                      <div className="p-1 bg-green-500 rounded-lg text-white">
                        <Check size={14} />
                      </div>
                      <span>{t('auto_save_enabled')}</span>
                    </div>
                    <button
                      onClick={handleManualLoadFromFolder}
                      className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      {t('load_from_folder')}
                    </button>
                  </div>
                )}

                {storageMode === 'browser' && (
                  <div className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                    <p className="text-xs text-blue-700 font-medium">
                      {t('storage_used')}: <span className="font-bold">{getStorageSize()} KB</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Danger Zone - Enhanced */}
              <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-red-600">{t('clear_all_data')}</p>
                </div>
                <button
                  onClick={handleClearAllData}
                  className="w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 rounded-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.02] group"
                >
                  <Trash2 size={18} className="group-hover:animate-pulse" />
                  <span>{t('clear_all_data')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Image Action Menu (Portal) --- */}
      {showImageActionMenu && (() => {
        const buttonEl = window.__imageMenuButtonRef;
        if (!buttonEl) return null;
        const rect = buttonEl.getBoundingClientRect();
        return (
          <>
            {/* 背景遮罩层 - 点击关闭菜单 */}
            <div 
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowImageActionMenu(false)}
            />
            {/* 菜单内容 */}
            <div 
              style={{
                position: 'fixed',
                top: `${rect.bottom + 8}px`,
                left: `${rect.left}px`,
                zIndex: 9999,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowImageActionMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 transition-colors flex items-center gap-2 text-gray-700"
                >
                  <ImageIcon size={16} />
                  {t('upload_image')}
                </button>
                <div className="h-px bg-gray-100"></div>
                <button
                  onClick={() => {
                    setShowImageUrlInput(true);
                    setShowImageActionMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700"
                >
                  <Globe size={16} />
                  {t('image_url')}
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* --- Image Lightbox --- */}
      {/* --- Image View Modal --- */}
      {zoomedImage && (
        <ImagePreviewModal 
          zoomedImage={zoomedImage}
          template={INITIAL_TEMPLATES_CONFIG.find(t => t.imageUrl === zoomedImage || t.imageUrls?.includes(zoomedImage)) || 
                   templates.find(t => t.imageUrl === zoomedImage || t.imageUrls?.includes(zoomedImage)) ||
                   (activeTemplate.imageUrl === zoomedImage || activeTemplate.imageUrls?.includes(zoomedImage) ? activeTemplate : null)}
          language={language}
          t={t}
          TAG_STYLES={TAG_STYLES}
          displayTag={displayTag}
          setActiveTemplateId={setActiveTemplateId}
          setDiscoveryView={setDiscoveryView}
          setZoomedImage={setZoomedImage}
          setMobileTab={setMobileTab}
        />
      )}

      {/* --- Mobile Bottom Navigation - 3 Tabs --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/25 backdrop-blur-2xl border-t border-white/30 flex justify-around items-center z-[250] h-16 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
          {/* 主页 */}
          <button 
             onClick={() => {
               setMobileTab('home');
               setDiscoveryView(true);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
             }}
             className={`flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 ${mobileTab === 'home' ? 'text-orange-600' : 'text-gray-700'}`}
             style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))' }}
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'home' ? 'bg-orange-50/50' : ''}`}>
                <LayoutGrid size={22} />
             </div>
          </button>
          
          {/* 模版详情 (编辑器) */}
          <button 
             onClick={() => {
               setDiscoveryView(false);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
               // 强制确保有模板被选中
               if (templates.length > 0 && !activeTemplateId) {
                 const firstId = templates[0].id;
                 setActiveTemplateId(firstId);
               }
               setMobileTab('editor');
             }}
             className={`flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 ${mobileTab === 'editor' ? 'text-orange-600' : 'text-gray-700'}`}
             style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))' }}
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'editor' ? 'bg-orange-50/50' : ''}`}>
                <Edit3 size={22} />
             </div>
          </button>
          
          {/* 设置 */}
          <button 
             onClick={() => {
               setMobileTab('settings');
               setDiscoveryView(false);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
             }}
             className={`flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 ${mobileTab === 'settings' ? 'text-orange-600' : 'text-gray-700'}`}
             style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))' }}
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'settings' ? 'bg-orange-50/50' : ''}`}>
                <Settings size={22} />
             </div>
          </button>
      </div>

      {/* --- Category Manager Modal (Moved to bottom) --- */}
      <CategoryManager 
        isOpen={isCategoryManagerOpen} 
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        setCategories={setCategories}
        banks={banks}
        setBanks={setBanks}
        t={t}
      />

      {/* --- Insert Variable Modal (Moved to bottom) --- */}
      <InsertVariableModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        categories={categories}
        banks={banks}
        onSelect={(key) => {
            insertVariableToTemplate(key);
            setIsInsertModalOpen(false);
        }}
        t={t}
      />

      {/* --- 数据更新提示 (模板和词库) --- */}
      {showDataUpdateNotice && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transition-all">
            <div className="flex items-center gap-3 mb-4 text-orange-600">
              <div className="p-2 bg-orange-100 rounded-lg">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold">{t('update_available_title')}</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('update_available_msg')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
                  setShowDataUpdateNotice(false);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t('later')}
              </button>
              <button
                onClick={handleAutoUpdate}
                className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 font-bold"
              >
                {t('update_now')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 应用刷新提示 (应用版本更新) --- */}
      {showAppUpdateNotice && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[150]">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md ml-auto border border-blue-400">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-snug">
                {t('app_update_available_msg')}
              </p>
            </div>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 whitespace-nowrap"
            >
              {t('refresh_now')}
            </button>
            <button 
              onClick={() => setShowAppUpdateNotice(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;