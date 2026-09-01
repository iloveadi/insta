import { VIRAL_QUICK_CATEGORIES } from '../constants/themes';
import type { ViralQuickCategory } from '../constants/themes';
import { Dices, Loader2, Zap } from 'lucide-react';

interface QuickCategoryBarProps {
  onSelectQuickCategory: (cat: ViralQuickCategory) => void;
  onSelectRandomCategory: () => void;
  isGenerating: boolean;
  activeCategoryName?: string;
}

export const QuickCategoryBar: React.FC<QuickCategoryBarProps> = ({
  onSelectQuickCategory,
  onSelectRandomCategory,
  isGenerating,
  activeCategoryName,
}) => {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/80 border border-indigo-500/30 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3.5 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute -top-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Zap className="w-4 h-4 fill-amber-300" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
              <span>원클릭 카테고리 자동 생성</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                1-Click Viral AI
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              주제 고민 없이 클릭 한 번으로 인스타 알고리즘이 좋아하는 최신 바이럴 카드뉴스를 즉시 완성합니다.
            </p>
          </div>
        </div>

        {/* Random Topic Button */}
        <button
          type="button"
          disabled={isGenerating}
          onClick={onSelectRandomCategory}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none self-start sm:self-auto cursor-pointer"
        >
          <Dices className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>🎲 아무거나 랜덤 생성</span>
        </button>
      </div>

      {/* Category Chips Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-0.5">
        {VIRAL_QUICK_CATEGORIES.map((cat) => {
          const isCurrentActive = isGenerating && activeCategoryName === cat.name;

          return (
            <button
              key={cat.id}
              type="button"
              disabled={isGenerating}
              onClick={() => onSelectQuickCategory(cat)}
              className={`p-2.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500 shadow-lg'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-indigo-500/50 text-slate-200'
              } disabled:opacity-60 disabled:pointer-events-none`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="text-base group-hover:scale-125 transition-transform">{cat.emoji}</span>
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate">
                {cat.target}
              </div>

              {/* Shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* Generating Feedback Banner */}
      {isGenerating && (
        <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-xs font-semibold text-indigo-200 animate-pulse">
          <Loader2 className="w-4 h-4 text-indigo-400 animate-spin flex-shrink-0" />
          <span>⚡ AI가 요즘 반응 좋은 주제를 발굴해 카드뉴스를 제작 중입니다...</span>
        </div>
      )}
    </div>
  );
};
