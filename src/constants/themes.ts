import type { ThemeConfig, ThemePresetId, CardNewsCategory } from '../types/cardnews';

export const THEME_PRESETS: Record<ThemePresetId, ThemeConfig> = {
  modern_dark: {
    id: 'modern_dark',
    name: 'Modern Dark',
    badge: '인기 테마',
    bgStyle: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
    cardBgStyle: 'bg-slate-900/90 shadow-2xl',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    accentColor: '#6366f1',
    accentGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    accentBg: 'bg-indigo-600',
    borderStyle: 'border-slate-700/80',
    tagBg: 'bg-indigo-950/90',
    tagText: 'text-indigo-300 border border-indigo-500/50',
    tipBg: 'bg-indigo-950/90',
    tipBorder: 'border-indigo-500/50',
    tipTitle: 'text-amber-300 font-black',
    tipText: 'text-slate-100 font-bold',
    footerText: 'text-slate-400',
    footerBadge: 'bg-white/10 text-white',
    isDark: true,
  },
  clean_minimal: {
    id: 'clean_minimal',
    name: 'Clean Minimal',
    badge: '화이트 심플',
    bgStyle: 'bg-gradient-to-b from-slate-100 via-white to-slate-200',
    cardBgStyle: 'bg-white shadow-xl shadow-slate-300/60 border-slate-300',
    textPrimary: 'text-slate-950',
    textSecondary: 'text-slate-800',
    accentColor: '#2563eb',
    accentGradient: 'from-blue-600 to-indigo-600',
    accentBg: 'bg-blue-600 text-white',
    borderStyle: 'border-slate-300',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-900 border border-blue-300 font-black',
    tipBg: 'bg-amber-50/90',
    tipBorder: 'border-amber-400/80',
    tipTitle: 'text-amber-900 font-black',
    tipText: 'text-slate-900 font-black',
    footerText: 'text-slate-700 font-bold',
    footerBadge: 'bg-slate-200 text-slate-950 font-black',
    isDark: false,
  },
  soft_gradient: {
    id: 'soft_gradient',
    name: 'Soft Gradient',
    badge: '인스타 감성',
    bgStyle: 'bg-gradient-to-tr from-rose-950 via-purple-950 to-slate-950',
    cardBgStyle: 'bg-purple-950/80 shadow-2xl',
    textPrimary: 'text-white',
    textSecondary: 'text-rose-100',
    accentColor: '#f43f5e',
    accentGradient: 'from-rose-500 via-pink-500 to-amber-400',
    accentBg: 'bg-gradient-to-r from-rose-500 to-pink-500',
    borderStyle: 'border-rose-500/40',
    tagBg: 'bg-rose-950/90',
    tagText: 'text-rose-200 border border-rose-400/60',
    tipBg: 'bg-rose-950/90',
    tipBorder: 'border-rose-500/50',
    tipTitle: 'text-amber-300 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-rose-300/80',
    footerBadge: 'bg-white/10 text-white',
    isDark: true,
  },
  bold_accent: {
    id: 'bold_accent',
    name: 'Bold Accent',
    badge: '시선 집중',
    bgStyle: 'bg-gradient-to-br from-zinc-950 via-black to-zinc-900',
    cardBgStyle: 'bg-zinc-900/95 shadow-2xl',
    textPrimary: 'text-white',
    textSecondary: 'text-zinc-200',
    accentColor: '#facc15',
    accentGradient: 'from-yellow-400 to-amber-500',
    accentBg: 'bg-yellow-400 text-black font-black',
    borderStyle: 'border-yellow-400/40',
    tagBg: 'bg-yellow-950/90',
    tagText: 'text-yellow-300 border border-yellow-400/70 font-bold',
    tipBg: 'bg-yellow-950/90',
    tipBorder: 'border-yellow-500/60',
    tipTitle: 'text-yellow-300 font-black',
    tipText: 'text-zinc-100 font-bold',
    footerText: 'text-zinc-400',
    footerBadge: 'bg-white/10 text-white',
    isDark: true,
  },
  neon_cyber: {
    id: 'neon_cyber',
    name: 'Neon Cyber',
    badge: 'IT / 테크',
    bgStyle: 'bg-gradient-to-br from-slate-950 via-emerald-950/60 to-slate-950',
    cardBgStyle: 'bg-slate-900/95 shadow-2xl',
    textPrimary: 'text-white',
    textSecondary: 'text-emerald-100',
    accentColor: '#10b981',
    accentGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    accentBg: 'bg-emerald-500 text-slate-950 font-black',
    borderStyle: 'border-emerald-500/40',
    tagBg: 'bg-emerald-950/90',
    tagText: 'text-emerald-300 border border-emerald-400/60',
    tipBg: 'bg-emerald-950/90',
    tipBorder: 'border-emerald-500/50',
    tipTitle: 'text-amber-300 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-emerald-400/70',
    footerBadge: 'bg-white/10 text-white',
    isDark: true,
  },
  pastel_editorial: {
    id: 'pastel_editorial',
    name: 'Pastel Editorial',
    badge: '매거진 감성',
    bgStyle: 'bg-gradient-to-br from-amber-50 via-stone-100 to-orange-100',
    cardBgStyle: 'bg-white shadow-xl shadow-amber-900/10 border-stone-300',
    textPrimary: 'text-stone-950',
    textSecondary: 'text-stone-800',
    accentColor: '#d97706',
    accentGradient: 'from-amber-600 to-orange-600',
    accentBg: 'bg-amber-600 text-white',
    borderStyle: 'border-stone-300',
    tagBg: 'bg-amber-100',
    tagText: 'text-amber-950 border border-amber-300 font-black',
    tipBg: 'bg-orange-50/90',
    tipBorder: 'border-amber-400/80',
    tipTitle: 'text-amber-950 font-black',
    tipText: 'text-stone-950 font-black',
    footerText: 'text-stone-700 font-bold',
    footerBadge: 'bg-stone-200 text-stone-950 font-black',
    isDark: false,
  },
  // ── NEW COMPLEMENTARY CONTRAST THEMES (보색 대비 테마) ──
  contrast_navy_orange: {
    id: 'contrast_navy_orange',
    name: '네이비 & 오렌지 (보색)',
    badge: '보색 1위',
    bgStyle: 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900',
    cardBgStyle: 'bg-slate-900/95 shadow-2xl border-orange-500/40',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    accentColor: '#ff6b00',
    accentGradient: 'from-orange-500 via-amber-500 to-yellow-400',
    accentBg: 'bg-orange-500 text-white font-black',
    borderStyle: 'border-orange-500/50',
    tagBg: 'bg-orange-500',
    tagText: 'text-white font-black shadow-lg shadow-orange-500/40',
    tipBg: 'bg-orange-950/90',
    tipBorder: 'border-orange-400',
    tipTitle: 'text-orange-400 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-orange-300',
    footerBadge: 'bg-orange-500/20 text-orange-300 border border-orange-500/40',
    isDark: true,
  },
  contrast_purple_lime: {
    id: 'contrast_purple_lime',
    name: '퍼플 & 네온라임 (보색)',
    badge: '힙한 보색',
    bgStyle: 'bg-gradient-to-br from-purple-950 via-slate-950 to-violet-950',
    cardBgStyle: 'bg-purple-950/90 shadow-2xl border-lime-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-purple-100',
    accentColor: '#a3e635',
    accentGradient: 'from-lime-400 via-emerald-400 to-teal-400',
    accentBg: 'bg-lime-400 text-purple-950 font-black',
    borderStyle: 'border-lime-400/50',
    tagBg: 'bg-lime-400',
    tagText: 'text-purple-950 font-black shadow-lg shadow-lime-400/40',
    tipBg: 'bg-black/80',
    tipBorder: 'border-lime-400',
    tipTitle: 'text-lime-300 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-lime-400',
    footerBadge: 'bg-lime-400/20 text-lime-300 border border-lime-400/40',
    isDark: true,
  },
  contrast_teal_coral: {
    id: 'contrast_teal_coral',
    name: '딥틸 & 리빙코랄 (보색)',
    badge: '트렌디 보색',
    bgStyle: 'bg-gradient-to-br from-teal-950 via-slate-950 to-cyan-950',
    cardBgStyle: 'bg-teal-950/90 shadow-2xl border-rose-400/40',
    textPrimary: 'text-white',
    textSecondary: 'text-teal-100',
    accentColor: '#fb7185',
    accentGradient: 'from-rose-400 via-coral-400 to-pink-500',
    accentBg: 'bg-rose-500 text-white font-black',
    borderStyle: 'border-rose-400/50',
    tagBg: 'bg-rose-500',
    tagText: 'text-white font-black shadow-lg shadow-rose-500/40',
    tipBg: 'bg-slate-950/90',
    tipBorder: 'border-rose-400',
    tipTitle: 'text-rose-300 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-rose-300',
    footerBadge: 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
    isDark: true,
  },
  contrast_yellow_black: {
    id: 'contrast_yellow_black',
    name: '하이퍼 옐로우 (초고대비)',
    badge: '시인성 종결',
    bgStyle: 'bg-black',
    cardBgStyle: 'bg-zinc-950 shadow-2xl border-yellow-400',
    textPrimary: 'text-white',
    textSecondary: 'text-yellow-100',
    accentColor: '#facc15',
    accentGradient: 'from-yellow-300 to-amber-400',
    accentBg: 'bg-yellow-400 text-black font-black',
    borderStyle: 'border-yellow-400',
    tagBg: 'bg-yellow-400',
    tagText: 'text-black font-black shadow-lg shadow-yellow-400/40',
    tipBg: 'bg-zinc-900',
    tipBorder: 'border-yellow-400',
    tipTitle: 'text-yellow-300 font-black',
    tipText: 'text-white font-bold',
    footerText: 'text-yellow-400 font-bold',
    footerBadge: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/50',
    isDark: true,
  }
};

export const CATEGORY_INFO: Record<CardNewsCategory, { label: string; icon: string; desc: string; sampleTopic: string }> = {
  curation: {
    label: '1. 큐레이션 / 추천형',
    icon: 'Sparkles',
    desc: '엄선된 리소스, 꿀템, 툴, 책, 사이트 등 유용한 정보 모음',
    sampleTopic: '2026년 업무 효율 3배 올려주는 필수 AI 생산성 툴 5선'
  },
  howto: {
    label: '2. 가이드 / How-To형',
    icon: 'Compass',
    desc: '단계별 튜토리얼, 실전 실행 방법, 따라만 하면 되는 프로세스',
    sampleTopic: '초보자도 10분 만에 끝내는 노션 포트폴리오 템플릿 제작법'
  },
  checklist: {
    label: '3. 체크리스트 / 자가진단형',
    icon: 'CheckSquare',
    desc: '자가진단 테스트, 준비물 체크리스트, 나는 과연 어디에 해당할까?',
    sampleTopic: '퇴사 전 반드시 확인해야 할 7가지 이직 체크리스트'
  },
  myth_fact: {
    label: '4. 오해 vs 진실형',
    icon: 'Scale',
    desc: '잘못 알려진 상식을 바로잡고 확실한 팩트를 알려주는 후킹 콘텐츠',
    sampleTopic: '다이어트 중 탄수화물 끊으면 살 빠진다? 흔한 다이어트 오해 4가지'
  },
  story_insight: {
    label: '5. 스토리 / 인사이트형',
    icon: 'BookOpen',
    desc: '경험담, 비즈니스 성공 사례, 깊은 영감과 생각을 남기는 인사이트',
    sampleTopic: '스타벅스가 전 세계 1위가 될 수 있었던 결정적인 공간 마케팅 비밀'
  }
};

export interface ViralQuickCategory {
  id: string;
  name: string;
  emoji: string;
  target: string;
  description: string;
  defaultFormat: CardNewsCategory;
  defaultTheme: ThemePresetId;
  topics: {
    topic: string;
    format: CardNewsCategory;
    sub: string;
  }[];
}

export const VIRAL_QUICK_CATEGORIES: ViralQuickCategory[] = [
  {
    id: 'productivity_ai',
    name: '생산성 & AI 툴',
    emoji: '🚀',
    target: '직장인 / 프리랜서',
    description: '칼퇴를 부르는 필수 AI와 업무 효율화 치트키',
    defaultFormat: 'curation',
    defaultTheme: 'modern_dark',
    topics: [
      {
        topic: '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
        format: 'curation',
        sub: '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음'
      }
    ]
  },
  {
    id: 'finance_wealth',
    name: '재테크 & 부업',
    emoji: '📈',
    target: '사회초년생 / N잡러',
    description: '월 100만원 패시브 인컴과 현명한 자산 불리기',
    defaultFormat: 'curation',
    defaultTheme: 'bold_accent',
    topics: [
      {
        topic: '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
        format: 'curation',
        sub: '통장 쪼개기와 자동 저축으로 1년 만에 종잣돈 완성'
      }
    ]
  },
  {
    id: 'self_growth',
    name: '자기계발 & 동기부여',
    emoji: '💡',
    target: '2030 청년 / 성장러',
    description: '멘탈 관리, 아침 루틴, 흔들리지 않는 습관 만들기',
    defaultFormat: 'curation',
    defaultTheme: 'contrast_navy_orange',
    topics: [
      {
        topic: '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
        format: 'curation',
        sub: '경험 정리부터 기업 인재상 매칭까지 10분 만에 끝내는 프롬프트 모음'
      }
    ]
  },
  {
    id: 'marketing_branding',
    name: '마케팅 & 브랜딩',
    emoji: '📣',
    target: '사업가 / 마케터',
    description: '조회수 100만 터지는 콘텐츠 알고리즘과 카피라이팅',
    defaultFormat: 'curation',
    defaultTheme: 'contrast_purple_lime',
    topics: [
      {
        topic: '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
        format: 'curation',
        sub: '스크롤을 즉시 멈추게 만드는 결핍과 호기심 자극 템플릿'
      }
    ]
  },
  {
    id: 'health_lifestyle',
    name: '건강 & 라이프스타일',
    emoji: '🩺',
    target: '일상 꿀팁 / 헬스러',
    description: '수면의 질, 피로 회복, 활력 넘치는 하루 만들기',
    defaultFormat: 'curation',
    defaultTheme: 'pastel_editorial',
    topics: [
      {
        topic: '학점 4.5 과탑 선배가 매일 쓰는 무료 대학생 생산성 툴 5선',
        format: 'curation',
        sub: '논문 리서치부터 팀플 PPT까지 10분 컷 끝내는 비법'
      }
    ]
  }
];

export const DEFAULT_AUDIENCES = [
  '2030 직장인',
  '취업준비생',
  '1인 창업가 / 자영업자',
  '대학생',
  '디자이너 / 개발자',
  '마케터 / 크리에이터',
  '초보 투자자',
  '다이어터 / 헬스러'
];

export const SAMPLE_TOPICS = [
  '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
  '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
  '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식',
  '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
  '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법'
];
