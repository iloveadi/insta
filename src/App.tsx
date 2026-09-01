import { useState } from 'react';
import type { 
  GenerationRequest, 
  CardNewsProject 
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

  // Form input state (Fixed to 4:5 ratio)
  const [formData, setFormData] = useState<GenerationRequest>({
    topic: '2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선',
    targetAudience: '2030 직장인',
    category: 'curation',
    slideCount: 5,
    theme: 'modern_dark',
    aspectRatio: '4:5',
    brandHandle: '@kimppungsamssi',
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

  // Download Single Slide PNG (4:5 1080x1350)
  const handleDownloadSingleSlide = async (slideId: string, pageNum: number) => {
    try {
      const elementId = `export-slide-${slideId}`;
      const filename = `${String(pageNum).padStart(2, '0')}_${project.topic.slice(0, 10).trim()}_4x5.png`;
      await exportSlideToPng(elementId, filename);
    } catch (err) {
      console.error('Download error:', err);
      alert('이미지 다운로드 중 오류가 발생했습니다.');
    }
  };

  // Download All Slides ZIP (4:5 1080x1350)
  const handleExportAllZip = async () => {
    setExportProgress({
      isOpen: true,
      current: 0,
      total: project.slides.length,
      message: '4:5 고화질 렌더링 준비 중...',
      isComplete: false,
    });

    try {
      await exportAllSlidesToZip(
        project.slides,
        project.topic || 'instagram_cardnews',
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

  const activeTheme = THEME_PRESETS[formData.theme] || THEME_PRESETS.modern_dark;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
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
        {/* Sleek Top Bar with View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>인스타그램 4:5 고화질 카드뉴스 스튜디오</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                1080×1350
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              타깃 독자나 카테고리를 클릭하면 AI가 3초 만에 새로운 주제와 고화질 슬라이드를 완성합니다.
            </p>
          </div>

          {/* View Mode Toggle Switch */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>피드 미리보기</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>전체 갤러리</span>
            </button>
          </div>
        </div>

        {/* Studio Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Clean Unified Studio Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/90 p-6 shadow-2xl">
              <InputPanel
                formData={formData}
                setFormData={setFormData}
                onGenerate={handleGenerate}
                onSelectQuickCategory={handleQuickCategorySelect}
                onSelectRandomCategory={handleRandomCategorySelect}
                onSelectAudience={handleSelectAudience}
                isGenerating={isGenerating}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Showcase Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {viewMode === 'carousel' ? (
              <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-center">
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
                />
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
                <GridView
                  slides={project.slides}
                  theme={activeTheme}
                  brandHandle={formData.brandHandle || '@kimppungsamssi'}
                  showSafeZoneGuide={showSafeZoneGuide}
                  onToggleSafeZoneGuide={() => setShowSafeZoneGuide(prev => !prev)}
                  onDownloadSingleSlide={handleDownloadSingleSlide}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── HIDDEN 1080×1350 4:5 FULL-SCALE RENDERING CONTAINER (FOR PNG/ZIP EXPORT) ── */}
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
      <footer className="w-full border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="font-bold text-slate-300">InstaCard AI v1.2.3</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <p className="flex items-center space-x-1.5">
            <span>Crafted with</span>
            <span className="text-rose-500">❤️</span>
            <span>for @kimppungsamssi • 100% Automated by Google Gemini AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
