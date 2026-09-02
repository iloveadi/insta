import { useState } from 'react';
import type { 
  GenerationRequest, 
  CardNewsProject,
  Slide
} from './types/cardnews';
import { THEME_PRESETS, VIRAL_QUICK_CATEGORIES } from './constants/themes';
import type { ViralQuickCategory } from './constants/themes';
import { INITIAL_PROJECT } from './constants/initialProject';
import { 
  generateCardNews, 
  generateViralByQuickCategory,
  generateByTargetAudience
} from './services/geminiService';
import { exportSlideToPng, exportAllSlidesToZip } from './services/exportService';

import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { PhoneMockup } from './components/PhoneMockup';
import { GridView } from './components/GridView';
import { SettingsModal } from './components/SettingsModal';
import { ExportProgressModal } from './components/ExportProgressModal';
import { SlideCard } from './components/SlideCard';

import { Smartphone, LayoutGrid } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // LocalStorage API key
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('instacard_gemini_key') || '';
  });

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Safe Zone Guide Toggle
  const [showSafeZoneGuide, setShowSafeZoneGuide] = useState(false);

  // Form input state
  const [formData, setFormData] = useState<GenerationRequest>({
    topic: '직장인 영혼 탈곡되는 순간 TOP 5 💀',
    targetAudience: 'K-직장인 (퇴사희망러)',
    category: 'curation',
    slideCount: 5,
    theme: 'studio_editorial',
    aspectRatio: '4:5',
    brandHandle: '@kimppungsamssi',
    tone: 'fun_humor',
  });

  // Active generated project
  const [project, setProject] = useState<CardNewsProject>(INITIAL_PROJECT);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isGenerating, setIsGenerating] = useState(false);

  // Export progress
  const [exportProgress, setExportProgress] = useState({
    isOpen: false,
    current: 0,
    total: 0,
    message: '',
    isComplete: false,
  });

  // Save API Key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('instacard_gemini_key', key);
  };

  // Standard Dynamic Generate Button (Strict Real-Time Gemini AI)
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setIsSettingsOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      const generated = await generateCardNews({
        ...formData,
        aspectRatio: '4:5',
        apiKey: apiKey.trim(),
      });
      setProject(generated);
      setFormData(prev => ({
        ...prev,
        topic: generated.topic,
        category: generated.card_type,
        theme: generated.theme_type,
      }));
      setActiveSlideIndex(0);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('Generation error:', err);
      alert(`AI 생성 실패: ${err.message || 'API 키를 확인해주세요.'}`);
      setIsSettingsOpen(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── ONE-CLICK TARGET AUDIENCE GENERATION ──
  const handleSelectAudience = async (audience: string) => {
    if (!apiKey.trim()) {
      setIsSettingsOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateByTargetAudience(
        audience,
        formData.theme,
        formData.brandHandle,
        apiKey.trim()
      );
      setProject(result.project);
      setFormData(prev => ({
        ...prev,
        targetAudience: audience,
        topic: result.resolvedTopic,
        category: result.resolvedCategory,
        theme: result.resolvedTheme,
      }));
      setActiveSlideIndex(0);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err: any) {
      console.error('Audience generation error:', err);
      alert(`AI 생성 실패: ${err.message || 'API 키를 확인해주세요.'}`);
      setIsSettingsOpen(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── ONE-CLICK VIRAL CATEGORY GENERATION ──
  const handleQuickCategorySelect = async (cat: ViralQuickCategory) => {
    setIsGenerating(true);
    try {
      const result = await generateViralByQuickCategory(
        cat,
        cat.defaultTheme || formData.theme,
        '4:5',
        formData.brandHandle || '@kimppungsamssi',
        apiKey.trim()
      );

      // Synchronize form and project
      setFormData(prev => ({
        ...prev,
        topic: result.resolvedTopic,
        targetAudience: cat.target,
        category: result.resolvedCategory,
        theme: cat.defaultTheme || prev.theme,
        aspectRatio: '4:5',
      }));

      setProject(result.project);
      setActiveSlideIndex(0);

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.55 },
      });
    } catch (err) {
      console.error('Quick generation error:', err);
      alert('자동 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Random Category Select
  const handleRandomCategorySelect = () => {
    const randomCat = VIRAL_QUICK_CATEGORIES[Math.floor(Math.random() * VIRAL_QUICK_CATEGORIES.length)];
    handleQuickCategorySelect(randomCat);
  };

  // Download Single Slide PNG with Dynamic Ratio
  const handleDownloadSingleSlide = async (slideId: string, pageNum: number) => {
    try {
      const elementId = `export-slide-${slideId}`;
      const ratioSuffix = formData.aspectRatio.replace(':', 'x');
      const filename = `${String(pageNum).padStart(2, '0')}_${project.topic.slice(0, 10).trim()}_${ratioSuffix}.png`;
      await exportSlideToPng(elementId, filename, formData.aspectRatio);
    } catch (err) {
      console.error('Download error:', err);
      alert('이미지 다운로드 중 오류가 발생했습니다.');
    }
  };

  // Download All Slides ZIP with Dynamic Ratio
  const handleExportAllZip = async () => {
    setExportProgress({
      isOpen: true,
      current: 0,
      total: project.slides.length,
      message: `${formData.aspectRatio} 고화질 렌더링 준비 중...`,
      isComplete: false,
    });

    try {
      await exportAllSlidesToZip(
        project.slides,
        project.topic || 'instagram_cardnews',
        formData.aspectRatio,
        (current, total, msg) => {
          setExportProgress({
            isOpen: true,
            current,
            total,
            message: msg,
            isComplete: current === total,
          });
        }
      );

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err) {
      console.error('ZIP Export error:', err);
      alert('ZIP 파일 압축 생성 중 오류가 발생했습니다.');
      setExportProgress(prev => ({ ...prev, isOpen: false }));
    }
  };

  // Update Active Slide Text
  const handleUpdateSlide = (updated: Partial<Slide>) => {
    setProject(prev => {
      const newSlides = [...prev.slides];
      if (newSlides[activeSlideIndex]) {
        newSlides[activeSlideIndex] = {
          ...newSlides[activeSlideIndex],
          ...updated,
        };
      }
      return { ...prev, slides: newSlides };
    });
  };

  const activeTheme = THEME_PRESETS[formData.theme] || THEME_PRESETS.studio_editorial;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#F0F1F3] selection:bg-orange-500/30 selection:text-white">
      {/* ── HEADER ── */}
      <Header
        hasApiKey={Boolean(apiKey.trim())}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onExportAll={handleExportAllZip}
        isExporting={exportProgress.isOpen && !exportProgress.isComplete}
        slideCount={project.slides.length}
      />

      {/* ── MAIN STUDIO CONTAINER ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Studio Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center space-x-2.5">
              <span>인스타그램 에디토리얼 스튜디오</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/[0.08] text-orange-300 border border-orange-400/30">
                {formData.aspectRatio === '3:4' ? '1080×1440 · 3:4 신규 격자' : formData.aspectRatio === '1:1' ? '1080×1080 · 1:1 클래식' : '1080×1350 · 4:5 피드 표준'}
              </span>
            </h2>
            <p className="text-xs text-white/50 pt-0.5">
              독자의 시선을 사로잡는 고감도 매거진 조판과 스마트 원클릭 기획을 경험하세요.
            </p>
          </div>

          {/* View Mode Toggle Switch */}
          <div className="flex items-center space-x-1 bg-[#14151B] p-1 rounded-xl border border-white/[0.08] self-start sm:self-auto">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>피드 뷰</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>전체 갤러리</span>
            </button>
          </div>
        </div>

        {/* Studio Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Clean Studio Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#111216] border border-white/[0.08] p-5 shadow-2xl">
              <InputPanel
                formData={formData}
                setFormData={setFormData}
                onGenerate={handleGenerate}
                onSelectQuickCategory={handleQuickCategorySelect}
                onSelectRandomCategory={handleRandomCategorySelect}
                onSelectAudience={handleSelectAudience}
                isGenerating={isGenerating}
                activeSlide={project.slides[activeSlideIndex]}
                activeSlideIndex={activeSlideIndex}
                totalSlides={project.slides.length}
                onUpdateSlide={handleUpdateSlide}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Showcase Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {viewMode === 'carousel' ? (
              <div className="rounded-3xl studio-canvas-stage border border-white/[0.08] p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-center">
                <PhoneMockup
                  slides={project.slides}
                  activeSlideIndex={activeSlideIndex}
                  setActiveSlideIndex={setActiveSlideIndex}
                  theme={activeTheme}
                  brandHandle={formData.brandHandle || '@kimppungsamssi'}
                  showSafeZoneGuide={showSafeZoneGuide}
                  onToggleSafeZoneGuide={() => setShowSafeZoneGuide(prev => !prev)}
                  onDownloadSingleSlide={handleDownloadSingleSlide}
                  instagramCaption={project.instagram_caption}
                  aspectRatio={formData.aspectRatio}
                />
              </div>
            ) : (
              <div className="rounded-3xl studio-canvas-stage border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
                <GridView
                  slides={project.slides}
                  theme={activeTheme}
                  brandHandle={formData.brandHandle || '@kimppungsamssi'}
                  showSafeZoneGuide={showSafeZoneGuide}
                  onToggleSafeZoneGuide={() => setShowSafeZoneGuide(prev => !prev)}
                  onDownloadSingleSlide={handleDownloadSingleSlide}
                  aspectRatio={formData.aspectRatio}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── HIDDEN FULL-SCALE RENDERING CONTAINER (FOR PNG/ZIP EXPORT) ── */}
      <div className="fixed top-0 left-[-9999px] pointer-events-none opacity-0 select-none z-[-100]">
        {project.slides.map((slide) => (
          <div key={`export-wrapper-${slide.id}`}>
            <SlideCard
              id={`export-slide-${slide.id}`}
              slide={slide}
              theme={activeTheme}
              brandHandle={formData.brandHandle || '@kimppungsamssi'}
              totalSlides={project.slides.length}
              scale={1}
              showSafeZoneGuide={false}
              aspectRatio={formData.aspectRatio}
            />
          </div>
        ))}
      </div>

      {/* ── MODALS ── */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />

      <ExportProgressModal
        isOpen={exportProgress.isOpen}
        current={exportProgress.current}
        total={exportProgress.total}
        message={exportProgress.message}
        isComplete={exportProgress.isComplete}
        onClose={() => setExportProgress(prev => ({ ...prev, isOpen: false }))}
      />

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-white/[0.06] bg-[#0B0C0E] py-6 text-center text-xs text-white/40">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="font-bold text-white/70">InstaCard Studio</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <p className="flex items-center space-x-1.5">
            <span>High-End Editorial Publishing System for Instagram</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
