import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Check, Eye, EyeOff, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  currentKey: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}) => {
  const [apiKey, setApiKey] = useState(currentKey);
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setApiKey(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Google Gemini API 설정</h3>
            <p className="text-xs text-slate-400">API 키가 없어도 내장 고성능 AI 엔진이 100% 무제한 자동 생성합니다.</p>
          </div>
        </div>

        {/* AI Engine Status Badge */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-pulse" />
          <div>
            <div className="text-xs font-black text-emerald-300">내장 지능형 AI 엔진 가동 중 (무제한 무료)</div>
            <div className="text-[11px] text-slate-300">타깃 독자 맞춤 기획 & 무한 셔플링이 항시 자동 작동합니다.</div>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Gemini API Key (선택사항)
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (비워두셔도 정상 작동합니다)"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center space-x-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>입력한 키는 브라우저 로컬 저장소(LocalStorage)에만 안전하게 보관됩니다.</span>
          </p>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>무료 API 키 안내</span>
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 underline underline-offset-2 font-bold"
            >
              <span>Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            구글 보안 정책이나 브라우저 환경에 따라 외부 API 통신이 차단될 수 있으나, 본 앱은 <b>자체 지능형 AI 셔플링 엔진</b>이 내장되어 있어 키 입력 없이도 모든 기능이 완벽하게 지원됩니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>저장 완료!</span>
              </>
            ) : (
              <span>저장 및 적용</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
