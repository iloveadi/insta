import React, { useState } from 'react';
import type { Slide, ThemeConfig } from '../types/cardnews';
import { SlideCard } from './SlideCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Download,
  Copy,
  Check,
  Grid,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhoneMockupProps {
  slides: Slide[];
  activeSlideIndex: number;
  setActiveSlideIndex: (idx: number) => void;
  theme: ThemeConfig;
  brandHandle: string;
  showSafeZoneGuide: boolean;
  onToggleSafeZoneGuide: () => void;
  onDownloadSingleSlide: (slideId: string, pageNum: number) => void;
  instagramCaption: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  slides,
  activeSlideIndex,
  setActiveSlideIndex,
  theme,
  brandHandle,
  showSafeZoneGuide,
  onToggleSafeZoneGuide,
  onDownloadSingleSlide,
  instagramCaption,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const currentSlide = slides[activeSlideIndex] || slides[0];
  const totalSlides = slides.length;

  const handlePrev = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeSlideIndex < totalSlides - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(instagramCaption);
    setCopiedCaption(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 },
    });
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Fixed 4:5 Phone Viewport (390px x 487.5px)
  const phoneWidth = 390;
  const canvasScale = phoneWidth / 1080;
  const canvasHeight = 1350 * canvasScale;

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto space-y-4">
      {/* ── TOP TOOLBAR: SAFE ZONE TOGGLE & DOWNLOAD ── */}
      <div className="w-full flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>4:5 세로형 (1080×1350)</span>
          </span>
        </div>

        {/* 1:1 Safe Zone Guide Toggle Button */}
        <button
          type="button"
          onClick={onToggleSafeZoneGuide}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
            showSafeZoneGuide
              ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>{showSafeZoneGuide ? '1:1 안전 가이드 ON' : '1:1 안전 가이드'}</span>
        </button>
      </div>

      {/* ── PHONE SHELL CONTAINER ── */}
      <div className="w-full rounded-[44px] p-3.5 bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-slate-700/80 shadow-2xl shadow-black/80">
        <div className="w-full bg-black rounded-[36px] overflow-hidden border border-slate-800 flex flex-col">
          
          {/* Dynamic Island / Notch */}
          <div className="h-7 w-full flex items-center justify-between px-6 pt-2 bg-black text-[11px] font-bold text-white select-none">
            <span>09:41</span>
            <div className="w-20 h-4 bg-slate-950 rounded-full border border-slate-800" />
            <div className="flex items-center space-x-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-5 h-2.5 rounded-sm border border-white/60 p-0.5 flex items-center">
                <div className="w-full h-full bg-white rounded-xs" />
              </div>
            </div>
          </div>

          {/* Instagram Post Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-black text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-black text-pink-400">
                  {brandHandle.replace('@', '').slice(0, 2).toUpperCase() || 'KP'}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold">{brandHandle || '@kimppungsamssi'}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-[9px] flex items-center justify-center font-bold">✓</span>
                </div>
                <span className="text-[10px] text-slate-400">Sponsored • 추천 게시물</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* 4:5 Slide Viewport Area */}
          <div
            style={{ width: `${phoneWidth}px`, height: `${canvasHeight}px` }}
            className="relative mx-auto bg-slate-950 overflow-hidden flex items-center justify-center group select-none"
          >
            {currentSlide && (
              <SlideCard
                slide={currentSlide}
                theme={theme}
                brandHandle={brandHandle}
                totalSlides={totalSlides}
                scale={canvasScale}
                showSafeZoneGuide={showSafeZoneGuide}
              />
            )}

            {/* Float Page Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white z-30 pointer-events-none">
              {activeSlideIndex + 1}/{totalSlides}
            </div>
          </div>

          {/* Instagram Post Action Buttons & Slide Controls */}
          <div className="p-3 bg-black text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:scale-110 transition-transform cursor-pointer ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>
                <button className="text-white hover:scale-110 transition-transform cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="text-white hover:scale-110 transition-transform cursor-pointer">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Clean Navigation & Slide Dots (No Text Overlap) */}
              <div className="flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeSlideIndex === 0}
                  className="p-1 rounded-full text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-1 px-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlideIndex === idx
                          ? 'w-4 bg-sky-400'
                          : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeSlideIndex === totalSlides - 1}
                  className="p-1 rounded-full text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`hover:scale-110 transition-transform cursor-pointer ${isSaved ? 'text-indigo-400 fill-indigo-400' : 'text-white'}`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-indigo-400' : ''}`} />
              </button>
            </div>

            {/* Likes count */}
            <div className="text-xs font-bold text-slate-200">
              좋아요 {isLiked ? '1,421' : '1,420'}개
            </div>

            {/* Instagram Feed Caption Preview */}
            <div className="text-xs text-slate-300 space-y-1">
              <p className={`leading-relaxed ${showFullCaption ? '' : 'line-clamp-2'}`}>
                <span className="font-bold text-white mr-1.5">{brandHandle.replace('@', '')}</span>
                {instagramCaption}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="text-slate-500 hover:text-slate-300 font-semibold cursor-pointer"
                >
                  {showFullCaption ? '접기' : '더 보기'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center space-x-1 bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-500/30 cursor-pointer"
                >
                  {copiedCaption ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCaption ? '복사됨!' : '캡션 복사'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Thumbnails & Single Download */}
      <div className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            슬라이드 선택 ({activeSlideIndex + 1}/{totalSlides})
          </span>

          <button
            onClick={() => onDownloadSingleSlide(currentSlide.id, activeSlideIndex + 1)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>이 슬라이드 PNG 저장</span>
          </button>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`flex-shrink-0 w-14 h-16 rounded-xl border-2 overflow-hidden relative transition-all flex flex-col items-center justify-center cursor-pointer ${
                activeSlideIndex === idx
                  ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-950/70 scale-105 shadow-md'
                  : 'border-slate-800 bg-slate-950/60 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-xs font-black text-white">{idx + 1}</span>
              <span className="text-[9px] text-slate-400 truncate px-1 font-semibold">
                {slide.type === 'cover' ? '표지' : slide.type === 'cta' ? 'CTA' : `본문 0${idx}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
