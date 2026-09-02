import React, { useState } from 'react';
import type { Slide, ThemeConfig, AspectRatio } from '../types/cardnews';
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
  Layers
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
  aspectRatio?: AspectRatio;
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
  aspectRatio = '4:5',
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
      particleCount: 35,
      spread: 50,
      origin: { y: 0.85 },
    });
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Dynamic Phone Viewport (390px width)
  const phoneWidth = 390;
  const baseHeight = aspectRatio === '3:4' ? 1440 : aspectRatio === '1:1' ? 1080 : 1350;
  const canvasScale = phoneWidth / 1080;
  const canvasHeight = baseHeight * canvasScale;

  const ratioLabel = aspectRatio === '3:4' 
    ? '3:4 NEW GRID (1080×1440)' 
    : aspectRatio === '1:1' 
    ? '1:1 SQUARE (1080×1080)' 
    : '4:5 PORTRAIT (1080×1350)';

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto space-y-4">
      {/* ── TOP CONTROL BAR: RATIO BADGE & SAFE ZONE TOGGLE ── */}
      <div className="w-full flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-white/80 text-xs font-mono font-medium flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>{ratioLabel}</span>
          </span>
        </div>

        {/* 1:1 Safe Zone Guide Toggle Button */}
        <button
          type="button"
          onClick={onToggleSafeZoneGuide}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            showSafeZoneGuide
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-sm'
              : 'bg-[#14151B] border-white/[0.08] text-white/60 hover:text-white hover:border-white/20'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>{showSafeZoneGuide ? '안전 가이드 ON' : '1:1 안전 가이드'}</span>
        </button>
      </div>

      {/* ── PHONE SHELL CONTAINER ── */}
      <div className="w-full rounded-[44px] p-3 bg-[#181A20] border-2 border-white/[0.12] shadow-2xl shadow-black/90">
        <div className="w-full bg-[#000000] rounded-[36px] overflow-hidden border border-white/[0.06] flex flex-col">
          
          {/* Dynamic Island / Status Bar */}
          <div className="h-7 w-full flex items-center justify-between px-6 pt-2 bg-black text-[11px] font-medium text-white select-none">
            <span className="font-semibold">09:41</span>
            <div className="w-20 h-4 bg-[#121316] rounded-full border border-white/10" />
            <div className="flex items-center space-x-1.5 text-[10px] text-white/80">
              <span>5G</span>
              <div className="w-5 h-2.5 rounded-xs border border-white/60 p-0.5 flex items-center">
                <div className="w-full h-full bg-white rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Instagram Post Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06] bg-black text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-xs font-bold text-white">
                  {brandHandle.replace('@', '').slice(0, 2).toUpperCase() || 'ST'}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-white/95">{brandHandle || '@kimppungsamssi'}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-[8px] flex items-center justify-center font-bold text-white">✓</span>
                </div>
                <span className="text-[10px] text-white/40">Sponsored • 추천 게시물</span>
              </div>
            </div>
            <button className="text-white/40 hover:text-white cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Viewport Area */}
          <div
            style={{ width: `${phoneWidth}px`, height: `${canvasHeight}px` }}
            className="relative mx-auto bg-[#0C0D10] overflow-hidden flex items-center justify-center group select-none transition-all duration-300"
          >
            {currentSlide && (
              <SlideCard
                slide={currentSlide}
                theme={theme}
                brandHandle={brandHandle}
                totalSlides={totalSlides}
                scale={canvasScale}
                showSafeZoneGuide={showSafeZoneGuide}
                aspectRatio={aspectRatio}
              />
            )}

            {/* Float Page Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-white/90 z-30 pointer-events-none">
              {activeSlideIndex + 1}/{totalSlides}
            </div>
          </div>

          {/* Instagram Post Action Buttons & Slide Controls */}
          <div className="p-3.5 bg-black text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:scale-105 transition-transform cursor-pointer ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>
                <button className="text-white hover:scale-105 transition-transform cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="text-white hover:scale-105 transition-transform cursor-pointer">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Minimal Slide Indicator & Chevrons */}
              <div className="flex items-center space-x-2 bg-white/[0.08] px-2 py-0.5 rounded-full border border-white/[0.06]">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeSlideIndex === 0}
                  className="p-1 rounded-full text-white/60 hover:text-white disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1 px-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlideIndex === idx
                          ? 'w-3.5 bg-white'
                          : 'w-1.5 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeSlideIndex === totalSlides - 1}
                  className="p-1 rounded-full text-white/60 hover:text-white disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`hover:scale-105 transition-transform cursor-pointer ${isSaved ? 'text-amber-400 fill-amber-400' : 'text-white'}`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Likes count */}
            <div className="text-xs font-semibold text-white/90">
              좋아요 {isLiked ? '1,842' : '1,841'}개
            </div>

            {/* Instagram Feed Caption Preview */}
            <div className="text-xs text-white/70 space-y-1">
              <p className={`leading-relaxed ${showFullCaption ? '' : 'line-clamp-2'}`}>
                <span className="font-bold text-white mr-1.5">{brandHandle.replace('@', '')}</span>
                {instagramCaption}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="text-white/40 hover:text-white/80 font-medium cursor-pointer"
                >
                  {showFullCaption ? '접기' : '더 보기'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="text-white/80 hover:text-white font-medium flex items-center space-x-1.5 bg-white/[0.08] hover:bg-white/[0.12] px-2.5 py-1 rounded-md border border-white/[0.08] cursor-pointer transition-colors"
                >
                  {copiedCaption ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCaption ? '복사 완료' : '캡션 복사'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── EDITORIAL SLIDE FILMSTRIP & SINGLE SLIDE DOWNLOAD ── */}
      <div className="w-full p-3.5 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-white/80">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>슬라이드 필름스트립 ({activeSlideIndex + 1}/{totalSlides})</span>
          </div>

          <button
            onClick={() => onDownloadSingleSlide(currentSlide.id, activeSlideIndex + 1)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold border border-white/[0.1] transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>현재 슬라이드 PNG</span>
          </button>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 pt-0.5 custom-scrollbar">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`flex-shrink-0 w-16 h-20 rounded-xl border overflow-hidden relative transition-all flex flex-col items-center justify-between p-2 cursor-pointer ${
                activeSlideIndex === idx
                  ? 'border-orange-400 ring-2 ring-orange-400/30 bg-[#1A1B22] shadow-md scale-102'
                  : 'border-white/[0.08] bg-[#14151B] opacity-60 hover:opacity-100 hover:border-white/20'
              }`}
            >
              <div className="w-full flex items-center justify-between text-[10px] font-mono">
                <span className={`font-bold ${activeSlideIndex === idx ? 'text-orange-400' : 'text-white/60'}`}>
                  0{idx + 1}
                </span>
                <span className="text-[9px] px-1 rounded bg-white/[0.08] text-white/50">
                  {slide.type === 'cover' ? '표지' : slide.type === 'cta' ? 'CTA' : '본문'}
                </span>
              </div>
              <div className="w-full text-center">
                <p className="text-[10px] font-bold text-white/90 truncate">
                  {slide.title || slide.main_title || `Slide ${idx + 1}`}
                </p>
              </div>
              <div className={`w-full h-1 rounded-full ${activeSlideIndex === idx ? 'bg-orange-400' : 'bg-transparent'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
