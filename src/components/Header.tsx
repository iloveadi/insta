import React from 'react';
import { Key, Download, CheckCircle2, Camera } from 'lucide-react';
import { APP_VERSION } from '../constants/version';

interface HeaderProps {
  hasApiKey: boolean;
  onOpenSettings: () => void;
  onExportAll: () => void;
  isExporting: boolean;
  slideCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  hasApiKey,
  onOpenSettings,
  onExportAll,
  isExporting,
  slideCount,
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Clickable Brand Logo & Title (Refreshes Page) */}
        <button
          type="button"
          onClick={handleReload}
          title="클릭하여 처음 상태로 새로고침"
          className="flex items-center space-x-3 text-left hover:opacity-85 active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center group-hover:rotate-6 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Camera className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-pink-300 bg-clip-text text-transparent">
                InstaCard AI
              </span>
              {/* Semantic Version Badge */}
              <span className="px-2 py-0.5 text-xs font-black rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 border border-indigo-400/40 shadow-sm">
                v{APP_VERSION.version}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              인스타그램 카드뉴스 자동 기획 & 고화질 생성기
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* AI Status / Settings */}
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">AI 엔진 활성화됨</span>
            <span className="md:hidden">AI OK</span>
          </button>

          {/* Quick ZIP Export Button */}
          <button
            onClick={onExportAll}
            disabled={isExporting || slideCount === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? '압축 중...' : 'ZIP 일괄 다운로드'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
