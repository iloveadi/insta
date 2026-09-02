import React from 'react';
import { Download, Sliders, Layers } from 'lucide-react';
import { APP_VERSION } from '../constants/version';

interface HeaderProps {
  hasApiKey?: boolean;
  onOpenSettings: () => void;
  onExportAll: () => void;
  isExporting: boolean;
  slideCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  hasApiKey = false,
  onOpenSettings,
  onExportAll,
  isExporting,
  slideCount,
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0C0E]/90 backdrop-blur-xl select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Studio Name */}
        <button
          type="button"
          onClick={handleReload}
          title="클릭하여 새로고침"
          className="flex items-center space-x-3 text-left hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1A1B22] border border-white/[0.12] flex items-center justify-center text-white shadow-sm group-hover:border-white/30 transition-colors">
            <Layers className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                InstaCard <span className="text-orange-400 font-normal text-sm">Studio</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-white/[0.08] text-white/70 border border-white/[0.08]">
                v{APP_VERSION.version}
              </span>
            </div>
            <p className="text-[11px] text-white/40 font-normal hidden sm:block">
              고감도 에디토리얼 카드뉴스 스튜디오
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Settings / API Key Button */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              hasApiKey
                ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/50'
                : 'bg-amber-950/30 text-amber-300 border-amber-500/30 hover:bg-amber-950/50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="hidden md:inline">{hasApiKey ? 'AI 엔진 준비됨' : 'API 키 설정 필요'}</span>
            <Sliders className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* High-End Export All ZIP Button */}
          <button
            onClick={onExportAll}
            disabled={isExporting || slideCount === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-[#0B0C0E] hover:bg-stone-100 active:scale-[0.98] font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? '압축 중...' : 'ZIP 전체 다운로드'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
