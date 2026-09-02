import React from 'react';
import type { Slide, ThemeConfig, AspectRatio } from '../types/cardnews';
import { Bookmark, Sparkles, Check, X, ArrowRight, Share2, Compass, Grid } from 'lucide-react';

interface SlideCardProps {
  slide: Slide;
  theme: ThemeConfig;
  brandHandle: string;
  totalSlides: number;
  scale?: number;
  showSafeZoneGuide?: boolean;
  aspectRatio?: AspectRatio;
  id?: string;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  theme,
  brandHandle,
  totalSlides,
  scale = 1,
  showSafeZoneGuide = false,
  aspectRatio = '4:5',
  id,
}) => {
  // Dynamic Resolution according to Aspect Ratio
  const baseWidth = 1080;
  const baseHeight = aspectRatio === '3:4' ? 1440 : aspectRatio === '1:1' ? 1080 : 1350;

  // Editorial Tag Fallback
  const displayTag = slide.tag || (
    slide.type === 'cover'
      ? 'ISSUE · EDITORIAL'
      : slide.type === 'cta'
      ? 'OUTRO · ENGAGE'
      : `POINT 0${slide.page - 1}`
  );

  return (
    <div
      style={{
        width: `${baseWidth * scale}px`,
        height: `${baseHeight * scale}px`,
      }}
      className="relative flex-shrink-0 select-none transition-transform duration-200"
    >
      <div
        id={id}
        data-slide-id={slide.id}
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className={`relative flex flex-col justify-between p-16 overflow-hidden ${theme.bgStyle} ${theme.textPrimary}`}
      >
        {/* ── 1. TOP EDITORIAL HEADER ── */}
        <div className="relative z-10 flex items-center justify-between w-full pt-2 flex-shrink-0">
          {/* Tag Pill */}
          <div className="flex items-center space-x-3">
            <span
              className={`px-5 py-2.5 rounded-full text-lg font-black tracking-wider uppercase ${theme.tagBg} ${theme.tagText}`}
            >
              {displayTag}
            </span>
          </div>

          {/* Watermark / Brand Badge */}
          <div
            className={`flex items-center space-x-2.5 px-5 py-2 rounded-full border text-lg font-bold tracking-tight ${
              theme.isDark
                ? 'bg-black/40 border-white/10 text-white/90'
                : 'bg-white/80 border-stone-200 text-stone-900 shadow-sm'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-base">{brandHandle}</span>
          </div>
        </div>

        {/* ── 2. CENTER CONTENT SECTION ── */}
        <div className="relative z-10 my-auto py-6 flex flex-col justify-center w-full flex-1">
          
          {/* ════ A. COVER SLIDE ════ */}
          {slide.type === 'cover' && (
            <div className="space-y-12 text-center max-w-[960px] mx-auto flex flex-col items-center justify-center my-auto">
              
              {/* Editorial Vol / Sub-header */}
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-current opacity-30" />
                <span
                  className={`text-xl font-black uppercase tracking-[0.25em] ${
                    theme.eyebrowColor || 'text-current opacity-80'
                  }`}
                >
                  CURATED INSIGHTS · 2026 EDITION
                </span>
                <span className="h-[1px] w-12 bg-current opacity-30" />
              </div>

              {/* High-Impact Editorial Title */}
              <h1
                className={`text-6xl sm:text-7xl font-black leading-[1.28] tracking-tight break-keep px-2 ${
                  theme.isDark ? 'text-white' : 'text-[#181716]'
                }`}
              >
                {slide.main_title || '시선을 사로잡는 강력한 메인 헤드라인'}
              </h1>

              {/* Subtitle / Lead Paragraph */}
              {slide.sub_title && (
                <p
                  className={`text-3xl sm:text-4xl font-normal leading-[1.65] max-w-3xl mx-auto break-keep px-4 ${theme.textSecondary}`}
                >
                  {slide.sub_title}
                </p>
              )}

              {/* Magazine Swipe Indicator */}
              <div className="pt-6 flex items-center justify-center">
                <div
                  className={`px-8 py-4 rounded-full text-xl font-bold flex items-center space-x-3 transition-all ${
                    theme.accentBg
                  } shadow-lg`}
                >
                  <span>SLIDE TO READ</span>
                  <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
            </div>
          )}

          {/* ════ B. CONTENT SLIDE ════ */}
          {slide.type === 'content' && (
            <div className="space-y-8 my-auto flex flex-col justify-center max-w-[980px] mx-auto w-full">
              
              {/* Step / Point Eyebrow */}
              <div className="flex items-center space-x-3">
                <span
                  className={`text-2xl font-black tracking-widest uppercase ${
                    theme.eyebrowColor || 'text-current'
                  }`}
                >
                  {slide.step_or_num ? `${slide.step_or_num} / INSIGHT` : `POINT 0${slide.page - 1}`}
                </span>
                <span className="h-[1px] flex-1 bg-current opacity-20" />
              </div>

              {/* Title Headline */}
              <h2
                className={`text-5xl sm:text-6xl font-black leading-[1.26] tracking-tight break-keep ${
                  theme.isDark ? 'text-white' : 'text-[#181716]'
                }`}
              >
                {slide.title || '슬라이드 소제목이 들어갑니다'}
              </h2>

              {/* Editorial Lead Card */}
              <div className={`p-10 rounded-3xl ${theme.cardBgStyle}`}>
                <p className={`text-3xl sm:text-4xl leading-[1.75] font-normal break-keep ${theme.textSecondary}`}>
                  {slide.body || '본문 설명 문장이 들어갑니다.'}
                </p>
              </div>

              {/* Sleek Editorial Key Insight Box */}
              {slide.tip && (
                <div className={`p-7 rounded-2xl ${theme.tipBg} ${theme.tipBorder} flex items-start space-x-5`}>
                  <div className="p-2 rounded-xl bg-black/10 dark:bg-white/10 flex-shrink-0 mt-1">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <span className={`block text-xl font-black mb-1.5 tracking-wider uppercase ${theme.tipTitle}`}>
                      KEY TAKEAWAY
                    </span>
                    <p className={`text-2xl sm:text-3xl font-semibold leading-relaxed break-keep ${theme.tipText}`}>
                      {slide.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════ C. CHECKLIST SLIDE ════ */}
          {slide.type === 'checklist' && (
            <div className="space-y-8 my-auto flex flex-col justify-center max-w-[980px] mx-auto w-full">
              
              {/* Eyebrow */}
              <div className="flex items-center space-x-3">
                <span className={`text-2xl font-black tracking-widest uppercase ${theme.eyebrowColor || 'text-current'}`}>
                  CHECKLIST · ACTION ITEMS
                </span>
                <span className="h-[1px] flex-1 bg-current opacity-20" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-black leading-[1.26] tracking-tight break-keep">
                {slide.title || '실전 체크리스트 자가진단'}
              </h2>

              {/* Action List Items */}
              <div className="space-y-4">
                {(slide.items || [
                  '핵심 목표 및 우선순위 3가지 정의하기',
                  '집중을 방해하는 반복 알림 차단하기',
                  '하루 30분 나만의 딥워크 블록 확보하기'
                ]).map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-6 p-6 rounded-2xl ${theme.cardBgStyle}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center font-mono font-black text-xl flex-shrink-0">
                      0{idx + 1}
                    </div>
                    <span className={`text-2xl sm:text-3xl font-semibold leading-snug break-keep flex-1 ${theme.textSecondary}`}>
                      {item}
                    </span>
                    <Check className="w-7 h-7 opacity-70 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {slide.tip && (
                <div className={`p-6 rounded-2xl ${theme.tipBg} ${theme.tipBorder} flex items-center space-x-4`}>
                  <Compass className="w-7 h-7 flex-shrink-0" />
                  <p className={`text-2xl font-bold break-keep flex-1 ${theme.tipText}`}>
                    {slide.tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ════ D. COMPARISON SLIDE (MYTH VS FACT) ════ */}
          {slide.type === 'comparison' && (
            <div className="space-y-8 my-auto flex flex-col justify-center max-w-[980px] mx-auto w-full">
              
              {/* Eyebrow */}
              <div className="flex items-center space-x-3">
                <span className={`text-2xl font-black tracking-widest uppercase ${theme.eyebrowColor || 'text-current'}`}>
                  FACT CHECK · COMPARISON
                </span>
                <span className="h-[1px] flex-1 bg-current opacity-20" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-black leading-[1.26] tracking-tight break-keep">
                {slide.title || '흔한 오해 vs 진짜 팩트'}
              </h2>

              {/* Side by Side Contrast Grid */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left: Myth */}
                <div
                  className={`p-9 rounded-3xl border flex flex-col justify-between space-y-6 ${
                    theme.isDark
                      ? 'bg-rose-950/40 border-rose-500/30'
                      : 'bg-rose-50/70 border-rose-200 text-stone-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 text-rose-500 font-black text-2xl uppercase tracking-wider">
                    <X className="w-7 h-7 stroke-[3]" />
                    <span>{slide.left_label || 'MYTH · 오해'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-medium leading-relaxed break-keep">
                    {slide.left_content || '시간을 오래 쏟을수록 좋은 결과가 나온다.'}
                  </p>
                </div>

                {/* Right: Fact */}
                <div
                  className={`p-9 rounded-3xl border-2 flex flex-col justify-between space-y-6 ${
                    theme.isDark
                      ? 'bg-emerald-950/50 border-emerald-400/60 shadow-xl'
                      : 'bg-emerald-50 border-emerald-300 text-stone-900 shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 text-emerald-500 font-black text-2xl uppercase tracking-wider">
                    <Check className="w-7 h-7 stroke-[3]" />
                    <span>{slide.right_label || 'TRUTH · 진실'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black leading-relaxed break-keep">
                    {slide.right_content || '집중도 높은 2시간이 8시간보다 훨씬 파괴적이다.'}
                  </p>
                </div>
              </div>

              {slide.tip && (
                <div className={`p-6 rounded-2xl ${theme.tipBg} ${theme.tipBorder} flex items-center space-x-4`}>
                  <Sparkles className="w-7 h-7 flex-shrink-0" />
                  <p className={`text-2xl font-bold break-keep flex-1 ${theme.tipText}`}>
                    {slide.tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ════ E. CTA OUTRO SLIDE ════ */}
          {slide.type === 'cta' && (
            <div className="space-y-10 text-center max-w-[920px] mx-auto my-auto flex flex-col items-center justify-center">
              
              {/* Minimal Brand Stamp */}
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-2 ${
                  theme.accentBg
                }`}
              >
                <Bookmark className="w-12 h-12 fill-current" />
              </div>

              {/* Strong Hook Question */}
              <h2 className="text-6xl sm:text-7xl font-black leading-tight tracking-tight break-keep">
                {slide.main_title || '나중에 다시 찾아보려면?'}
              </h2>

              <p className={`text-3xl sm:text-4xl font-normal leading-relaxed break-keep px-6 ${theme.textSecondary}`}>
                {slide.sub_title || '지금 바로 [저장]하고 유익했다면 동료에게 [공유]해보세요!'}
              </p>

              {/* Action Buttons Container */}
              <div className="grid grid-cols-2 gap-6 w-full pt-4">
                <div
                  className={`p-7 rounded-2xl border-2 flex items-center justify-center space-x-4 text-2xl font-black ${
                    theme.isDark
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-stone-900 text-white border-stone-900'
                  }`}
                >
                  <Bookmark className="w-7 h-7 fill-current" />
                  <span>지금 저장하기</span>
                </div>
                <div
                  className={`p-7 rounded-2xl border-2 flex items-center justify-center space-x-4 text-2xl font-black ${
                    theme.isDark
                      ? 'bg-white/5 border-white/10 text-white/90'
                      : 'bg-white border-stone-300 text-stone-900'
                  }`}
                >
                  <Share2 className="w-7 h-7" />
                  <span>동료에게 공유</span>
                </div>
              </div>

              {/* Follower Value Prop */}
              <div className={`text-2xl font-medium tracking-wide pt-2 ${theme.textSecondary}`}>
                Follow <span className="font-black text-current underline underline-offset-4">{brandHandle}</span> for daily insights
              </div>
            </div>
          )}

        </div>

        {/* ── 3. BOTTOM FOOTER SECTION ── */}
        <div
          className={`relative z-10 flex items-center justify-between w-full pb-2 pt-6 border-t text-xl font-bold flex-shrink-0 ${
            theme.dividerColor || (theme.isDark ? 'border-white/10' : 'border-stone-200')
          }`}
        >
          <div className={`flex items-center space-x-2.5 ${theme.footerText}`}>
            <span className="font-mono text-lg">{brandHandle}</span>
            <span className="opacity-40">•</span>
            <span className="text-base uppercase tracking-wider font-normal">INSTAGRAM STUDIO</span>
          </div>

          <div className={`flex items-center space-x-2 px-5 py-2 rounded-full font-mono font-black text-lg ${theme.footerBadge}`}>
            <span>{String(slide.page).padStart(2, '0')}</span>
            <span className="opacity-40">/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>

        {/* ── 4. SAFE ZONE GUIDE OVERLAY ── */}
        {showSafeZoneGuide && (
          <div className="absolute inset-0 pointer-events-none z-40 select-none">
            {baseHeight > 1080 ? (
              <>
                {/* Top Crop Area */}
                <div 
                  style={{ height: `${(baseHeight - 1080) / 2}px` }}
                  className="absolute top-0 left-0 right-0 bg-rose-500/20 border-b-2 border-dashed border-rose-400 flex items-center justify-center"
                >
                  <span className="px-4 py-1.5 rounded-full bg-rose-950/90 text-rose-200 text-sm font-bold border border-rose-400 shadow">
                    ⚠️ 상단 {Math.round((baseHeight - 1080) / 2)}px 잘림 영역 (1:1 프로필 격자 시 미노출)
                  </span>
                </div>

                {/* 1:1 Center Safe Zone */}
                <div 
                  style={{ top: `${(baseHeight - 1080) / 2}px`, height: '1080px' }}
                  className="absolute left-0 right-0 border-2 border-dashed border-emerald-400/80 flex items-start justify-end p-5"
                >
                  <span className="px-4 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 text-sm font-black border border-emerald-400 shadow-lg flex items-center space-x-2">
                    <Grid className="w-4 h-4" />
                    <span>1:1 프로필 피드 안전 노출 영역 (1080×1080)</span>
                  </span>
                </div>

                {/* Bottom Crop Area */}
                <div 
                  style={{ height: `${(baseHeight - 1080) / 2}px` }}
                  className="absolute bottom-0 left-0 right-0 bg-rose-500/20 border-t-2 border-dashed border-rose-400 flex items-center justify-center"
                >
                  <span className="px-4 py-1.5 rounded-full bg-rose-950/90 text-rose-200 text-sm font-bold border border-rose-400 shadow">
                    ⚠️ 하단 {Math.round((baseHeight - 1080) / 2)}px 잘림 영역 (1:1 프로필 격자 시 미노출)
                  </span>
                </div>
              </>
            ) : (
              <div className="absolute inset-4 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-emerald-950/90 text-emerald-300 text-sm font-bold border border-emerald-400 shadow">
                  ✅ 1:1 정방형: 잘림 없이 100% 안전 노출됩니다.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CardNewsCanvas = SlideCard;
