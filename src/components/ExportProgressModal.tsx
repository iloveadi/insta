import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ExportProgressModalProps {
  isOpen: boolean;
  current: number;
  total: number;
  message: string;
  isComplete: boolean;
  onClose: () => void;
}

export const ExportProgressModal: React.FC<ExportProgressModalProps> = ({
  isOpen,
  current,
  total,
  message,
  isComplete,
  onClose,
}) => {
  if (!isOpen) return null;

  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
          {isComplete ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          ) : (
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">
            {isComplete ? '다운로드 준비 완료!' : '고화질 카드뉴스 렌더링 중'}
          </h3>
          <p className="text-xs text-slate-400">{message}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              style={{ width: `${percentage}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-300 shadow-sm"
            />
          </div>
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>{current} / {total} 슬라이드</span>
            <span>{percentage}%</span>
          </div>
        </div>

        {isComplete && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all cursor-pointer"
          >
            닫기
          </button>
        )}
      </div>
    </div>
  );
};
