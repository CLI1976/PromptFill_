// EditorToolbar 组件 - 编辑器工具栏
import React from 'react';
import { Plus, Undo, Redo } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export const EditorToolbar = ({ onInsertClick, canUndo, canRedo, onUndo, onRedo, t }) => {
  return (
    <div className="h-12 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20">
      {/* Left: Undo/Redo */}
      <div className="flex items-center gap-2">
        <PremiumButton 
          onClick={onUndo} 
          disabled={!canUndo} 
          title="Undo" 
          icon={Undo} 
          color="slate" 
          className="!px-2 !py-1.5" 
        />
        <PremiumButton 
          onClick={onRedo} 
          disabled={!canRedo} 
          title="Redo" 
          icon={Redo} 
          color="slate" 
          className="!px-2 !py-1.5" 
        />
      </div>

      {/* Right: Insert & Tools */}
      <div className="flex items-center gap-2">
        <PremiumButton onClick={onInsertClick} icon={Plus} color="orange">
          {t('insert')}
        </PremiumButton>
      </div>
    </div>
  );
};
