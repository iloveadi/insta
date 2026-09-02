import React, { useState } from 'react';
import type { 
  CardNewsCategory, 
  ThemePresetId, 
  GenerationRequest,
  Slide
} from '../types/cardnews';
import { CATEGORY_INFO, THEME_PRESETS, DEFAULT_AUDIENCES, VIRAL_QUICK_CATEGORIES } from '../constants/themes';
import type { ViralQuickCategory } from '../constants/themes';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Users, 
  Compass, 
  CheckSquare, 
  Scale, 
  BookOpen, 
  AtSign,
  ShieldCheck,
  Dices,
  Zap,
  Loader2,
  Edit3,
  Tag
} from 'lucide-react';

interface InputPanelProps {
  formData: GenerationRequest;
  setFormData: React.Dispatch<React.SetStateAction<GenerationRequest>>;
  onGenerate: () => void;
  onSelectQuickCategory: (cat: ViralQuickCategory) => void;
  onSelectRandomCategory: () => void;
  onSelectAudience: (audience: string) => void;
  isGenerating: boolean;
  activeSlide?: Slide;
  activeSlideIndex?: number;
  totalSlides?: number;
  onUpdateSlide?: (updated: Partial<Slide>) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  formData,
  setFormData,
  onGenerate,
  onSelectQuickCategory,
  onSelectRandomCategory,
  onSelectAudience,
  isGenerating,
  activeSlide,
  activeSlideIndex = 0,
  totalSlides = 5,
  onUpdateSlide,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'theme' | 'edit'>('generate');

  const getCategoryIcon = (cat: CardNewsCategory) => {
    switch (cat) {
      case 'curation': return <Sparkles className="w-3.5 h-3.5 text-orange-400" />;
      case 'howto': return <Compass className="w-3.5 h-3.5 text-blue-400" />;
      case 'checklist': return <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case 'myth_fact': return <Scale className="w-3.5 h-3.5 text-rose-400" />;
      case 'story_insight': return <BookOpen className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* ── STUDIO TABS NAVIGATOR ── */}
      <div className="flex items-center p-1 rounded-xl bg-[#14151B] border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'generate'
              ? 'bg-[#22242D] text-white shadow-sm border border-white/[0.08]'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-orange-400" />
          <span>기획 & AI 생성</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-[#22242D] text-white shadow-sm border border-white/[0.08]'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-blue-400" />
          <span>테마 & 스타일</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'edit'
              ? 'bg-[#22242D] text-white shadow-sm border border-white/[0.08]'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>슬라이드 편집</span>
        </button>
      </div>

      {/* ════ TAB 1: 기획 & AI 생성 ════ */}
      {activeTab === 'generate' && (
        <div className="space-y-5">
          {/* PRIMARY GENERATE BUTTON */}
          <div>
            <button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating || !formData.topic.trim()}
              className="relative w-full py-3.5 rounded-xl bg-white text-[#0B0C0E] hover:bg-stone-100 font-extrabold text-sm shadow-lg shadow-white/5 active:scale-[0.99] transition-all disabled:opacity-40 disabled:pointer-events-none overflow-hidden cursor-pointer flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0B0C0E]" />
                  <span>에디토리얼 콘텐츠 기획 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>AI 에디토리얼 카드뉴스 생성</span>
                </>
              )}
            </button>
          </div>

          {/* CONTENT MOOD / TONE SELECTOR */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/90">
                콘텐츠 스타일 / 분위기
              </label>
              <span className="text-[10px] font-mono text-orange-400">MOOD & TONE</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  tone: 'fun_humor',
                  topic: prev.tone !== 'fun_humor' ? '직장인 영혼 탈곡되는 순간 TOP 5 (뼈 맞음 주의)' : prev.topic 
                }))}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  (formData.tone || 'fun_humor') === 'fun_humor'
                    ? 'border-orange-400 bg-[#1C1E26] text-white shadow-sm ring-1 ring-orange-400/40 font-bold'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white'
                }`}
              >
                <span className="text-xs">🤣 도파민 & 유머</span>
                <span className="text-[10px] text-white/40">현실격공/밈/썰</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  tone: 'relatable_meme',
                  topic: prev.tone !== 'relatable_meme' ? '극T와 극F가 카톡으로 대화할 때 일어나는 대참사' : prev.topic 
                }))}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  formData.tone === 'relatable_meme'
                    ? 'border-orange-400 bg-[#1C1E26] text-white shadow-sm ring-1 ring-orange-400/40 font-bold'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white'
                }`}
              >
                <span className="text-xs">🧠 심리 & MBTI</span>
                <span className="text-[10px] text-white/40">성향/연애/공감</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  tone: 'balance_game',
                  topic: prev.tone !== 'balance_game' ? '친구들 모이면 밤새 피 터지는 황금 밸런스 게임 5선' : prev.topic,
                  category: 'myth_fact'
                }))}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  formData.tone === 'balance_game'
                    ? 'border-orange-400 bg-[#1C1E26] text-white shadow-sm ring-1 ring-orange-400/40 font-bold'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white'
                }`}
              >
                <span className="text-xs">⚖️ 밸런스 게임</span>
                <span className="text-[10px] text-white/40">댓글폭발/논쟁</span>
              </button>
            </div>
          </div>

          {/* TOPIC INPUT */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/90">
                주제 / 키워드
              </label>
              <span className="text-[11px] text-white/40">직접 수정 가능</span>
            </div>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="예: 직장인 영혼 탈곡되는 순간 TOP 5, 극T와 극F의 카톡 대참사"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0E12] border border-white/[0.09] text-white placeholder-white/30 text-xs font-medium focus:outline-none focus:border-white/30 transition-all shadow-inner"
            />
          </div>

          {/* TARGET AUDIENCE ONE-CLICK */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#14151B] border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-white/90">
                <Users className="w-3.5 h-3.5 text-orange-400" />
                <span>타깃 독자별 원클릭 생성</span>
              </label>
              <span className="text-[10px] text-white/40 font-mono">ONE-CLICK</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {DEFAULT_AUDIENCES.map((audience) => (
                <button
                  key={audience}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => onSelectAudience(audience)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer disabled:opacity-40 ${
                    formData.targetAudience === audience
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-[#181A20] border-white/[0.06] text-white/70 hover:text-white hover:border-white/20'
                  }`}
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK TOPIC CHIPS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-white/90">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>분야별 인기 주제 발굴</span>
              </label>
              <button
                type="button"
                disabled={isGenerating}
                onClick={onSelectRandomCategory}
                className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-white/70 border border-white/[0.08] text-[11px] font-medium transition-all cursor-pointer disabled:opacity-40"
              >
                <Dices className="w-3 h-3 text-orange-400" />
                <span>랜덤 추천</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {VIRAL_QUICK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => onSelectQuickCategory(cat)}
                  className="px-2.5 py-2 rounded-lg bg-[#14151B] hover:bg-[#1A1C24] border border-white/[0.06] hover:border-white/20 text-left transition-all text-xs font-medium text-white/80 hover:text-white truncate flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
                >
                  <span>{cat.emoji}</span>
                  <span className="truncate text-[11px]">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CARD TYPE (5 KINDS) */}
          <div className="space-y-2">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-white/90">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>콘텐츠 포맷 (5종)</span>
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(CATEGORY_INFO) as CardNewsCategory[]).map((catKey) => {
                const cat = CATEGORY_INFO[catKey];
                const isSelected = formData.category === catKey;

                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: catKey }))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-white/[0.12] border-white/40 text-white shadow-sm'
                        : 'bg-[#14151B] border-white/[0.06] text-white/60 hover:text-white hover:border-white/15'
                    }`}
                  >
                    {getCategoryIcon(catKey)}
                    <span className="text-xs font-bold truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════ TAB 2: 테마 & 스타일 ════ */}
      {activeTab === 'theme' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/90">
                에디토리얼 테마 프리셋
              </label>
              <span className="text-[10px] font-mono text-orange-400">EDITORIAL PALETTE</span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {(Object.keys(THEME_PRESETS) as ThemePresetId[]).map((themeKey) => {
                const theme = THEME_PRESETS[themeKey];
                const isSelected = formData.theme === themeKey;

                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, theme: themeKey }))}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-400 ring-2 ring-orange-400/30 bg-[#1C1E26] shadow-md'
                        : 'border-white/[0.06] bg-[#14151B] hover:border-white/20 hover:bg-[#181A20]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/70 font-semibold">
                        {theme.badge}
                      </span>
                      <div className="h-3 w-10 rounded overflow-hidden border border-white/20 flex">
                        <div className={`w-2/3 h-full ${theme.bgStyle}`} />
                        <div className={`w-1/3 h-full ${theme.accentBg}`} />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{theme.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BRAND HANDLE & RATIO */}
          <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-white/80">
              <AtSign className="w-3.5 h-3.5 text-white/40" />
              <span>브랜드 워터마크 핸들</span>
            </label>
            <input
              type="text"
              value={formData.brandHandle}
              onChange={(e) => setFormData(prev => ({ ...prev, brandHandle: e.target.value }))}
              placeholder="@kimppungsamssi"
              className="w-full px-3 py-2 rounded-xl bg-[#0D0E12] border border-white/[0.08] text-white text-xs font-mono font-semibold focus:outline-none focus:border-white/30"
            />
          </div>

          {/* ── ASPECT RATIO SELECTOR ── */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>화면 규격 / 비율 선택</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400">ASPECT RATIO</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* 4:5 Standard Feed */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, aspectRatio: '4:5' }))}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  formData.aspectRatio === '4:5'
                    ? 'border-orange-400 bg-[#1C1E26] text-white ring-2 ring-orange-400/30 shadow-md'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-xs font-bold">4:5 세로형</span>
                <span className="text-[10px] text-white/40 font-mono">1080×1350</span>
                <span className="text-[9px] text-orange-300 font-semibold px-1 rounded bg-orange-400/10">피드 표준</span>
              </button>

              {/* 3:4 New Instagram Grid */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, aspectRatio: '3:4' }))}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  formData.aspectRatio === '3:4'
                    ? 'border-orange-400 bg-[#1C1E26] text-white ring-2 ring-orange-400/30 shadow-md'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-xs font-bold">3:4 신규</span>
                <span className="text-[10px] text-white/40 font-mono">1080×1440</span>
                <span className="text-[9px] text-emerald-300 font-semibold px-1 rounded bg-emerald-400/10">프로필 격자</span>
              </button>

              {/* 1:1 Classic Square */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, aspectRatio: '1:1' }))}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  formData.aspectRatio === '1:1'
                    ? 'border-orange-400 bg-[#1C1E26] text-white ring-2 ring-orange-400/30 shadow-md'
                    : 'border-white/[0.06] bg-[#14151B] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-xs font-bold">1:1 정방형</span>
                <span className="text-[10px] text-white/40 font-mono">1080×1080</span>
                <span className="text-[9px] text-blue-300 font-semibold px-1 rounded bg-blue-400/10">클래식</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ TAB 3: 슬라이드 텍스트 편집 ════ */}
      {activeTab === 'edit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-md bg-white/[0.1] text-white font-mono font-bold flex items-center justify-center text-xs">
                {activeSlideIndex + 1}
              </span>
              <span className="text-xs font-bold text-white">
                슬라이드 0{activeSlideIndex + 1} 문구 수정
              </span>
            </div>
            <span className="text-[11px] font-mono text-white/40">
              {activeSlide?.type === 'cover' ? '표지' : activeSlide?.type === 'cta' ? '엔딩 CTA' : '본문'} ({activeSlideIndex + 1}/{totalSlides})
            </span>
          </div>

          {activeSlide && onUpdateSlide ? (
            <div className="space-y-3.5">
              {/* Tag / Eyebrow */}
              <div className="space-y-1">
                <label className="flex items-center space-x-1.5 text-[11px] font-bold text-white/70">
                  <Tag className="w-3 h-3 text-orange-400" />
                  <span>상단 태그 / 카테고리 킥커</span>
                </label>
                <input
                  type="text"
                  value={activeSlide.tag || ''}
                  onChange={(e) => onUpdateSlide({ tag: e.target.value })}
                  placeholder="예: ISSUE · TREND REPORT"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Cover Slide Title/Subtitle */}
              {activeSlide.type === 'cover' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">메인 타이틀</label>
                    <textarea
                      rows={2}
                      value={activeSlide.main_title || ''}
                      onChange={(e) => onUpdateSlide({ main_title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 resize-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">서브타이틀</label>
                    <textarea
                      rows={2}
                      value={activeSlide.sub_title || ''}
                      onChange={(e) => onUpdateSlide({ sub_title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                </>
              )}

              {/* Content Slide Fields */}
              {activeSlide.type === 'content' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">소제목</label>
                    <input
                      type="text"
                      value={activeSlide.title || ''}
                      onChange={(e) => onUpdateSlide({ title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">본문 내용</label>
                    <textarea
                      rows={3}
                      value={activeSlide.body || ''}
                      onChange={(e) => onUpdateSlide({ body: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">핵심 꿀팁 (Key Takeaway)</label>
                    <textarea
                      rows={2}
                      value={activeSlide.tip || ''}
                      onChange={(e) => onUpdateSlide({ tip: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                </>
              )}

              {/* CTA Slide Fields */}
              {activeSlide.type === 'cta' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">CTA 메인 카피</label>
                    <input
                      type="text"
                      value={activeSlide.main_title || ''}
                      onChange={(e) => onUpdateSlide({ main_title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70">행동 유도 서브카피</label>
                    <textarea
                      rows={2}
                      value={activeSlide.sub_title || ''}
                      onChange={(e) => onUpdateSlide({ sub_title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0D0E12] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-white/40">
              슬라이드를 선택하면 텍스트를 바로 편집할 수 있습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
