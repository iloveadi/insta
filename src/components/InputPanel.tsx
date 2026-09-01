import React from 'react';
import type { 
  CardNewsCategory, 
  ThemePresetId, 
  GenerationRequest 
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
  Loader2
} from 'lucide-react';

interface InputPanelProps {
  formData: GenerationRequest;
  setFormData: React.Dispatch<React.SetStateAction<GenerationRequest>>;
  onGenerate: () => void;
  onSelectQuickCategory: (cat: ViralQuickCategory) => void;
  onSelectRandomCategory: () => void;
  onSelectAudience: (audience: string) => void;
  isGenerating: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  formData,
  setFormData,
  onGenerate,
  onSelectQuickCategory,
  onSelectRandomCategory,
  onSelectAudience,
  isGenerating,
}) => {
  const getCategoryIcon = (cat: CardNewsCategory) => {
    switch (cat) {
      case 'curation': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'howto': return <Compass className="w-4 h-4 text-blue-400" />;
      case 'checklist': return <CheckSquare className="w-4 h-4 text-emerald-400" />;
      case 'myth_fact': return <Scale className="w-4 h-4 text-rose-400" />;
      case 'story_insight': return <BookOpen className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* ── 1. TOP PROMINENT AI GENERATE BUTTON ── */}
      <div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !formData.topic.trim()}
          className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-lg shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10 flex items-center justify-center space-x-2.5">
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>AI가 새로운 내용으로 생성 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 animate-bounce text-amber-300 fill-amber-300" />
                <span>AI 카드뉴스 새로 생성하기 ⚡</span>
              </>
            )}
          </div>

          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000" />
        </button>
      </div>

      {/* ── 2. TARGET AUDIENCE (ONE-CLICK AUTO-GENERATE) ── */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-pink-950/20 border border-pink-500/20 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-1.5 text-xs font-black text-pink-300">
            <Users className="w-3.5 h-3.5" />
            <span>타깃 독자별 원클릭 맞춤 자동 생성</span>
          </label>
          <span className="text-[10px] text-pink-400 font-semibold">클릭 즉시 맞춤 기획</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DEFAULT_AUDIENCES.map((audience) => (
            <button
              key={audience}
              type="button"
              disabled={isGenerating}
              onClick={() => onSelectAudience(audience)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-50 ${
                formData.targetAudience === audience
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent shadow-md shadow-pink-500/30 scale-105 ring-2 ring-pink-400/40'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-pink-500/50 hover:bg-slate-800'
              }`}
            >
              {audience}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. QUICK VIRAL ONE-CLICK CATEGORY SELECTOR ── */}
      <div className="space-y-2.5 pb-3 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-1.5 text-xs font-black text-amber-300">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>분야별 원클릭 주제 발굴</span>
          </label>
          <button
            type="button"
            disabled={isGenerating}
            onClick={onSelectRandomCategory}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>🎲 아무거나 랜덤</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {VIRAL_QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              disabled={isGenerating}
              onClick={() => onSelectQuickCategory(cat)}
              className="px-2.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-left transition-all text-xs font-bold text-slate-200 hover:text-white truncate flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{cat.emoji}</span>
              <span className="truncate text-[11px]">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. TOPIC & KEYWORDS ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>카드뉴스 주제 / 키워드</span>
          </label>
          <span className="text-[11px] text-slate-400">직접 입력 가능</span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="예: 2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선"
            className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 transition-all shadow-inner font-medium"
          />
        </div>
      </div>

      {/* ── 5. CARD NEWS TYPE (5 KINDS) ── */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-200">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>기획 포맷 (5종)</span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CATEGORY_INFO) as CardNewsCategory[]).map((catKey) => {
            const cat = CATEGORY_INFO[catKey];
            const isSelected = formData.category === catKey;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: catKey }))}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-0.5">
                  {getCategoryIcon(catKey)}
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 6. DESIGN THEME PRESET ── */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-200">
          <Palette className="w-4 h-4 text-emerald-400" />
          <span>디자인 테마</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(THEME_PRESETS) as ThemePresetId[]).map((themeKey) => {
            const theme = THEME_PRESETS[themeKey];
            const isSelected = formData.theme === themeKey;

            return (
              <button
                key={themeKey}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, theme: themeKey }))}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-slate-800 shadow-md'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="h-5 rounded-md mb-1.5 overflow-hidden border border-white/10 flex">
                  <div className={`w-2/3 h-full ${theme.bgStyle}`} />
                  <div className={`w-1/3 h-full ${theme.accentBg}`} />
                </div>
                <div className="text-[11px] font-bold text-white truncate">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 7. BRAND HANDLE & 4:5 BADGE ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <AtSign className="w-3.5 h-3.5 text-slate-400" />
            <span>워터마크 핸들</span>
          </label>
          <input
            type="text"
            value={formData.brandHandle}
            onChange={(e) => setFormData(prev => ({ ...prev, brandHandle: e.target.value }))}
            placeholder="@kimppungsamssi"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono font-bold text-indigo-300"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300">
            규격
          </label>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5 text-[11px] font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>4:5 (1080×1350)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
