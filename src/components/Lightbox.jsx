// Lightbox 组件 - 图片预览灯箱
import React from 'react';
import { X } from 'lucide-react';

export const Lightbox = ({ isOpen, onClose, src }) => {
  if (!isOpen || !src) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div 
        className="relative max-w-7xl w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt="Preview" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none" 
        />
      </div>
    </div>
  );
};
