import type { Slide, ThemeConfig } from '../types/cardnews';
import { Bookmark, Sparkles, Check, X, ArrowRight, Lightbulb, Grid } from 'lucide-react';

interface SlideCardProps {
  slide: Slide;
  theme: ThemeConfig;
  brandHandle: string;
  totalSlides: number;
  scale?: number;
  showSafeZoneGuide?: boolean;
  id?: string;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  theme,
  brandHandle,
  totalSlides,
  scale = 1,
  showSafeZoneGuide = false,
  id,
}) => {
  // 4:5 Standard Resolution: 1080px x 1350px
  const baseWidth = 1080;
  const baseHeight = 1350;

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
        className={`relative flex flex-col justify-between p-14 overflow-hidden ${theme.bgStyle} ${theme.textPrimary}`}
      >
        {/* Background Ambient Glows */}
        <div className="absolute -top-20 -right-20 w-[650px] h-[650px] bg-gradient-to-bl from-indigo-500/25 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ── 1. TOP HEADER SECTION ── */}
        <div className="relative z-10 flex items-center justify-between w-full pt-2 flex-shrink-0">
          <div>
            {slide.tag ? (
              <span className={`px-6 py-2.5 rounded-full text-xl font-black tracking-wide uppercase shadow-md ${theme.tagBg} ${theme.tagText}`}>
                {slide.tag}
              </span>
            ) : (
              <span className="px-5 py-2 rounded-full text-lg font-bold bg-white/10 text-slate-300">
                SPECIAL EDITION
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/15 text-xl font-bold tracking-tight shadow-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span>{brandHandle}</span>
          </div>
        </div>

        {/* ── 2. MAIN CENTER CONTENT (Balanced 4:5 Vertical Fill) ── */}
        <div className="relative z-10 my-auto py-6 flex flex-col justify-center w-full flex-1">
          
          {/* A. COVER SLIDE */}
          {slide.type === 'cover' && (
            <div className="space-y-12 text-center max-w-[980px] mx-auto flex flex-col items-center justify-center my-auto">
              <div className="inline-flex items-center space-x-3 px-7 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-2xl font-black tracking-wider text-amber-300 shadow-lg">
                <Sparkles className="w-7 h-7 text-amber-400 fill-amber-400" />
                <span>INSTAGRAM TREND REPORT</span>
              </div>

              <h1
                className={`text-6xl sm:text-7xl font-black leading-[1.3] tracking-tight drop-shadow-lg break-keep px-2 ${
                  theme.isDark
                    ? 'bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent'
                    : 'text-slate-900'
                }`}
              >
                {slide.main_title || '매력적인 메인 후킹 타이틀'}
              </h1>

              {slide.sub_title && (
                <p className={`text-3xl sm:text-4xl font-semibold leading-relaxed max-w-3xl mx-auto break-keep px-4 ${theme.textSecondary}`}>
                  {slide.sub_title}
                </p>
              )}

              {/* Cover Bottom Swipe CTA Badge */}
              <div className="pt-4 flex items-center justify-center">
                <div className="px-8 py-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-2xl font-black flex items-center space-x-3 shadow-2xl shadow-indigo-500/40 border border-white/20">
                  <span>옆으로 넘겨서 꿀팁 확인</span>
                  <ArrowRight className="w-8 h-8 animate-pulse text-white" />
                </div>
              </div>
            </div>
          )}

          {/* B. CONTENT SLIDE */}
          {slide.type === 'content' && (
            <div className="space-y-7 my-auto flex flex-col justify-center">
              {/* Step / Number Badge */}
              {slide.step_or_num && (
                <div>
                  <span className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-black text-2xl tracking-wider shadow-lg shadow-indigo-500/30 inline-block">
                    {slide.step_or_num}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-5xl sm:text-6xl font-black leading-[1.25] tracking-tight break-keep">
                {slide.title || '슬라이드 소제목'}
              </h2>

              {/* Large Body Content Card */}
              <div className={`p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme.cardBgStyle} ${theme.borderStyle}`}>
                <p className={`text-3xl sm:text-4xl leading-[1.7] font-medium break-keep ${theme.textSecondary}`}>
                  {slide.body || '본문 설명 문장이 들어갑니다.'}
                </p>
              </div>

              {/* Prominent PRO TIP Box */}
              {slide.tip && (
                <div className={`p-7 rounded-3xl border flex items-start space-x-5 shadow-xl ${theme.tipBg} ${theme.tipBorder}`}>
                  <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 flex-shrink-0 mt-0.5 shadow-lg">
                    <Lightbulb className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-2xl font-black text-amber-400 mb-1 tracking-wide">
                      💡 꿀팁 포인트 (PRO TIP)
                    </span>
                    <p className="text-2xl sm:text-3xl font-bold leading-relaxed break-keep text-slate-100">
                      {slide.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* C. CHECKLIST SLIDE */}
          {slide.type === 'checklist' && (
            <div className="space-y-7 my-auto flex flex-col justify-center">
              {slide.step_or_num && (
                <div>
                  <span className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-2xl tracking-wider shadow-lg shadow-emerald-500/30 inline-block">
                    {slide.step_or_num}
                  </span>
                </div>
              )}

              <h2 className="text-5xl sm:text-6xl font-black leading-[1.25] tracking-tight break-keep">
                {slide.title || '체크리스트 자가진단'}
              </h2>

              <div className="space-y-4">
                {(slide.items || [
                  '매일 30분 집중 루틴 확보하기',
                  '핵심 업무 우선순위 3가지 정의',
                  '불필요한 알림 및 방해 요소 차단'
                ]).map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-6 p-6 rounded-3xl border backdrop-blur-xl shadow-lg ${theme.cardBgStyle} ${theme.borderStyle}`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-sm">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold leading-snug break-keep flex-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {slide.tip && (
                <div className={`p-6 rounded-3xl border flex items-center space-x-5 shadow-lg ${theme.tipBg} ${theme.tipBorder}`}>
                  <Lightbulb className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <p className="text-2xl font-bold break-keep flex-1">
                    {slide.tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* D. COMPARISON (MYTH VS FACT) SLIDE */}
          {slide.type === 'comparison' && (
            <div className="space-y-7 my-auto flex flex-col justify-center">
              {slide.step_or_num && (
                <div>
                  <span className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-2xl tracking-wider shadow-lg shadow-rose-500/30 inline-block">
                    {slide.step_or_num}
                  </span>
                </div>
              )}

              <h2 className="text-5xl sm:text-6xl font-black leading-[1.25] tracking-tight break-keep">
                {slide.title || '오해 vs 진실'}
              </h2>

              <div className="grid grid-cols-2 gap-7">
                {/* Left (Myth) */}
                <div className="p-8 rounded-3xl bg-rose-950/50 border-2 border-rose-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2.5 text-rose-400 font-black text-2xl">
                    <X className="w-8 h-8 stroke-[3]" />
                    <span>{slide.left_label || '❌ 흔한 오해'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold leading-relaxed opacity-90 break-keep">
                    {slide.left_content || '시간만 많이 들이면 성과가 난다.'}
                  </p>
                </div>

                {/* Right (Fact) */}
                <div className="p-8 rounded-3xl bg-emerald-950/50 border-2 border-emerald-500/60 space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2.5 text-emerald-400 font-black text-2xl">
                    <Check className="w-8 h-8 stroke-[3]" />
                    <span>{slide.right_label || '⭕ 진짜 팩트'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold leading-relaxed break-keep">
                    {slide.right_content || '집중도 높은 2시간이 8시간보다 훨씬 강력하다.'}
                  </p>
                </div>
              </div>

              {slide.tip && (
                <div className={`p-6 rounded-3xl border flex items-center space-x-5 shadow-lg ${theme.tipBg} ${theme.tipBorder}`}>
                  <Lightbulb className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <p className="text-2xl font-bold break-keep flex-1">
                    {slide.tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* E. CTA SLIDE */}
          {slide.type === 'cta' && (
            <div className="space-y-9 text-center max-w-[920px] mx-auto my-auto flex flex-col items-center justify-center">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                <Bookmark className="w-14 h-14 text-white fill-white" />
              </div>

              <h2 className="text-6xl sm:text-7xl font-black leading-tight tracking-tight break-keep">
                {slide.main_title || '나중에 다시 찾아보려면?'}
              </h2>

              <p className={`text-3xl sm:text-4xl font-medium leading-relaxed break-keep px-4 ${theme.textSecondary}`}>
                {slide.sub_title || '지금 바로 [저장]하고 유익했다면 동료에게 [공유]해보세요!'}
              </p>

              <div className="grid grid-cols-2 gap-6 w-full pt-4">
                <div className="p-7 rounded-3xl bg-indigo-600/30 border-2 border-indigo-400/50 flex items-center justify-center space-x-4 text-3xl font-black shadow-lg">
                  <Bookmark className="w-9 h-9 text-indigo-400 fill-indigo-400" />
                  <span>지금 저장하기</span>
                </div>
                <div className="p-7 rounded-3xl bg-pink-600/30 border-2 border-pink-400/50 flex items-center justify-center space-x-4 text-3xl font-black shadow-lg">
                  <Bookmark className="w-9 h-9 text-pink-400" />
                  <span>동료에게 공유</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-slate-400 tracking-wider pt-2">
                Follow <span className="text-indigo-400 font-black">{brandHandle}</span> for more daily tips
              </div>
            </div>
          )}
        </div>

        {/* ── 3. BOTTOM FOOTER SECTION ── */}
        <div className="relative z-10 flex items-center justify-between w-full pb-2 pt-4 border-t border-white/15 text-2xl font-bold opacity-85 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span>INSTAGRAM 4:5 CAROUSEL</span>
          </div>

          <div className="flex items-center space-x-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md">
            <span className="font-black text-white">{slide.page}</span>
            <span className="opacity-50">/</span>
            <span>{totalSlides}</span>
          </div>
        </div>

        {/* ── 4. SAFE ZONE GUIDE OVERLAY ── */}
        {showSafeZoneGuide && (
          <div className="absolute inset-0 pointer-events-none z-40 select-none">
            <div className="absolute top-0 left-0 right-0 h-[135px] bg-red-500/20 border-b-2 border-dashed border-red-400 flex items-center justify-center">
              <span className="px-4 py-1 rounded-full bg-red-950/90 text-red-200 text-sm font-bold border border-red-400 shadow">
                ⚠️ 상단 135px 잘림 영역 (프로필 1:1 격자 시 미노출)
              </span>
            </div>

            <div className="absolute top-[135px] left-0 right-0 h-[1080px] border-2 border-dashed border-emerald-400/70 flex items-start justify-end p-4">
              <span className="px-4 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 text-sm font-black border border-emerald-400 shadow-lg flex items-center space-x-1.5">
                <Grid className="w-4 h-4" />
                <span>1:1 프로필 안전 영역 (1080×1080px)</span>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[135px] bg-red-500/20 border-t-2 border-dashed border-red-400 flex items-center justify-center">
              <span className="px-4 py-1 rounded-full bg-red-950/90 text-red-200 text-sm font-bold border border-red-400 shadow">
                ⚠️ 하단 135px 잘림 영역 (프로필 1:1 격자 시 미노출)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CardNewsCanvas = SlideCard;
