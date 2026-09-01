import React from 'react';
import type { Slide, ThemeConfig } from '../types/cardnews';
import { SlideCard } from './SlideCard';
import { Download, Grid } from 'lucide-react';

interface GridViewProps {
  slides: Slide[];
  theme: ThemeConfig;
  brandHandle: string;
  showSafeZoneGuide: boolean;
  onToggleSafeZoneGuide: () => void;
  onDownloadSingleSlide: (slideId: string, pageNum: number) => void;
}

export const GridView: React.FC<GridViewProps> = ({
  slides,
  theme,
  brandHandle,
  showSafeZoneGuide,
  onToggleSafeZoneGuide,
  onDownloadSingleSlide,
}) => {
  // 4:5 Card Dimensions (1080 x 1350)
  const cardWidth = 320;
  const canvasScale = cardWidth / 1080;
  const cardHeight = 1350 * canvasScale; // 400px

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>4:5 슬라이드 갤러리</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              전체 {slides.length}장 (1080×1350)
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            생성된 전체 슬라이드를 한눈에 확인하고 개별 PNG로 저장할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Safe Zone Toggle in Grid View */}
          <button
            type="button"
            onClick={onToggleSafeZoneGuide}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              showSafeZoneGuide
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
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
            className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-xl p-4 space-y-3 group"
          >
            {/* Slide Header Toolbar */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-md">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {slide.type === 'cover' ? '표지 (Cover)' : slide.type === 'cta' ? 'CTA 엔딩' : `본문 슬라이드 ${idx}`}
                </span>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onDownloadSingleSlide(slide.id, idx + 1)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG 다운로드</span>
              </button>
            </div>

            {/* Rendered 4:5 Slide Canvas Frame */}
            <div
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
              className="relative mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-800/80 bg-slate-950 flex-shrink-0"
            >
              <SlideCard
                slide={slide}
                theme={theme}
                brandHandle={brandHandle}
                totalSlides={slides.length}
                scale={canvasScale}
                showSafeZoneGuide={showSafeZoneGuide}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
