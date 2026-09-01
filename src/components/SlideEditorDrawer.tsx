import React from 'react';
import type { Slide, SlideType } from '../types/cardnews';
import { Type, Tag, Hash, FileText, Lightbulb, CheckSquare, Plus, Trash2 } from 'lucide-react';

interface SlideEditorDrawerProps {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  onUpdateSlide: (updated: Partial<Slide>) => void;
}

export const SlideEditorDrawer: React.FC<SlideEditorDrawerProps> = ({
  slide,
  slideIndex,
  totalSlides,
  onUpdateSlide,
}) => {
  const handleItemChange = (index: number, val: string) => {
    const items = [...(slide.items || [])];
    items[index] = val;
    onUpdateSlide({ items });
  };

  const handleAddItem = () => {
    const items = [...(slide.items || []), '새로운 체크리스트 항목'];
    onUpdateSlide({ items });
  };

  const handleRemoveItem = (index: number) => {
    const items = (slide.items || []).filter((_, i) => i !== index);
    onUpdateSlide({ items });
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
            {slideIndex + 1}
          </span>
          <span className="text-sm font-bold text-white">슬라이드 세부 텍스트 편집</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {slide.type === 'cover' ? '표지' : slide.type === 'cta' ? 'CTA' : '본문'} ({slideIndex + 1}/{totalSlides})
        </span>
      </div>

      {/* Slide Type Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-300">슬라이드 형태</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['cover', 'content', 'checklist', 'comparison', 'cta'] as SlideType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onUpdateSlide({ type: t })}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                slide.type === t
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === 'cover' ? '표지' : t === 'content' ? '본문 요약' : t === 'checklist' ? '체크리스트' : t === 'comparison' ? '오해/진실' : 'CTA 엔딩'}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Badge */}
      <div className="space-y-1.5">
        <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          <span>상단 타깃 태그</span>
        </label>
        <input
          type="text"
          value={slide.tag || ''}
          onChange={(e) => onUpdateSlide({ tag: e.target.value })}
          placeholder="예: 취준생 필독, 꿀팁 방출"
          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Step / Numbering */}
      {slide.type !== 'cover' && slide.type !== 'cta' && (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <Hash className="w-3.5 h-3.5 text-purple-400" />
            <span>스텝 / 넘버링 뱃지</span>
          </label>
          <input
            type="text"
            value={slide.step_or_num || ''}
            onChange={(e) => onUpdateSlide({ step_or_num: e.target.value })}
            placeholder="예: STEP 01, POINT 02, CHECK 03"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>
      )}

      {/* Main Title (Cover / CTA) or Title (Content) */}
      {(slide.type === 'cover' || slide.type === 'cta') ? (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>메인 후킹 타이틀</span>
          </label>
          <textarea
            rows={2}
            value={slide.main_title || ''}
            onChange={(e) => onUpdateSlide({ main_title: e.target.value })}
            placeholder="사람들의 시선을 사로잡는 강력한 헤드라인"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      ) : (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>슬라이드 핵심 소제목</span>
          </label>
          <input
            type="text"
            value={slide.title || ''}
            onChange={(e) => onUpdateSlide({ title: e.target.value })}
            placeholder="핵심 소제목을 입력하세요"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* Subtitle / Body text */}
      {(slide.type === 'cover' || slide.type === 'cta') ? (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>보조 서브 설명</span>
          </label>
          <textarea
            rows={2}
            value={slide.sub_title || ''}
            onChange={(e) => onUpdateSlide({ sub_title: e.target.value })}
            placeholder="보조 카피 문장"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      ) : slide.type === 'content' ? (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>본문 핵심 설명 문장 (2~3줄 요약)</span>
          </label>
          <textarea
            rows={3}
            value={slide.body || ''}
            onChange={(e) => onUpdateSlide({ body: e.target.value })}
            placeholder="본문 내용을 입력하세요"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      ) : null}

      {/* Checklist items */}
      {slide.type === 'checklist' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>체크 항목 리스트</span>
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>항목 추가</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {(slide.items || []).map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison inputs */}
      {slide.type === 'comparison' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-rose-400">❌ 오해 (Myth)</label>
            <input
              type="text"
              value={slide.left_label || ''}
              onChange={(e) => onUpdateSlide({ left_label: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs mb-1"
              placeholder="라벨 (예: ❌ 흔한 오해)"
            />
            <textarea
              rows={2}
              value={slide.left_content || ''}
              onChange={(e) => onUpdateSlide({ left_content: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              placeholder="오해 내용"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-400">⭕ 진실 (Fact)</label>
            <input
              type="text"
              value={slide.right_label || ''}
              onChange={(e) => onUpdateSlide({ right_label: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs mb-1"
              placeholder="라벨 (예: ⭕ 진짜 팩트)"
            />
            <textarea
              rows={2}
              value={slide.right_content || ''}
              onChange={(e) => onUpdateSlide({ right_content: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              placeholder="진실 내용"
            />
          </div>
        </div>
      )}

      {/* Pro Tip Box */}
      {slide.type !== 'cover' && (
        <div className="space-y-1.5">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>강조 꿀팁 (PRO TIP)</span>
          </label>
          <input
            type="text"
            value={slide.tip || ''}
            onChange={(e) => onUpdateSlide({ tip: e.target.value })}
            placeholder="실천 팁이나 기억할 핵심 포인트"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}
    </div>
  );
};
