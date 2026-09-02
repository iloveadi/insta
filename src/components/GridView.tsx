import React from 'react';
import type { Slide, ThemeConfig, AspectRatio } from '../types/cardnews';
import { SlideCard } from './SlideCard';
import { Download, Grid, Layers } from 'lucide-react';

interface GridViewProps {
  slides: Slide[];
  theme: ThemeConfig;
  brandHandle: string;
  showSafeZoneGuide: boolean;
  onToggleSafeZoneGuide: () => void;
  onDownloadSingleSlide: (slideId: string, pageNum: number) => void;
  aspectRatio?: AspectRatio;
}

export const GridView: React.FC<GridViewProps> = ({
  slides,
  theme,
  brandHandle,
  showSafeZoneGuide,
  onToggleSafeZoneGuide,
  onDownloadSingleSlide,
  aspectRatio = '4:5',
}) => {
  // Card Dimensions according to Aspect Ratio
  const cardWidth = 320;
  const baseHeight = aspectRatio === '3:4' ? 1440 : aspectRatio === '1:1' ? 1080 : 1350;
  const canvasScale = cardWidth / 1080;
  const cardHeight = baseHeight * canvasScale;

  const ratioBadge = aspectRatio === '3:4' ? '3:4 (1080×1440)' : aspectRatio === '1:1' ? '1:1 (1080×1080)' : '4:5 (1080×1350)';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>전체 슬라이드 갤러리</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-orange-300 border border-orange-400/30">
              {ratioBadge}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-white/70 border border-white/[0.08]">
              {slides.length} SLIDES
            </span>
          </h3>
          <p className="text-xs text-white/50">
            생성된 전체 슬라이드를 한눈에 검토하고 개별 고화질 PNG로 저장할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Safe Zone Toggle in Grid View */}
          <button
            type="button"
            onClick={onToggleSafeZoneGuide}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              showSafeZoneGuide
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-sm'
                : 'bg-[#14151B] border-white/[0.08] text-white/60 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{showSafeZoneGuide ? '안전 가이드 ON' : '1:1 안전 가이드'}</span>
          </button>
        </div>
      </div>

      {/* Grid of slides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="flex flex-col rounded-2xl bg-[#14151B] border border-white/[0.08] overflow-hidden hover:border-white/20 transition-all shadow-xl p-4 space-y-3 group"
          >
            {/* Slide Header Toolbar */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-md bg-white/[0.1] text-white font-mono font-bold flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-white/80">
                  {slide.type === 'cover' ? '표지 (Cover)' : slide.type === 'cta' ? 'CTA 엔딩' : `본문 0${idx}`}
                </span>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onDownloadSingleSlide(slide.id, idx + 1)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-white/80 hover:text-white text-xs font-medium border border-white/[0.08] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG 저장</span>
              </button>
            </div>

            {/* Rendered 4:5 Slide Canvas Frame */}
            <div
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
              className="relative mx-auto rounded-xl overflow-hidden shadow-lg border border-white/[0.06] bg-[#0C0D10] flex-shrink-0"
            >
              <SlideCard
                slide={slide}
                theme={theme}
                brandHandle={brandHandle}
                totalSlides={slides.length}
                scale={canvasScale}
                showSafeZoneGuide={showSafeZoneGuide}
                aspectRatio={aspectRatio}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
