import type { ThemeConfig, ThemePresetId, CardNewsCategory } from '../types/cardnews';

export const THEME_PRESETS: Record<ThemePresetId, ThemeConfig> = {
  modern_dark: {
    id: 'modern_dark',
    name: 'Modern Dark',
    badge: '인기 테마',
    bgStyle: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
    cardBgStyle: 'bg-slate-900/80 backdrop-blur-md',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    accentColor: '#6366f1',
    accentGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    accentBg: 'bg-indigo-600',
    borderStyle: 'border-slate-800/80',
    tagBg: 'bg-indigo-500/20',
    tagText: 'text-indigo-300 border border-indigo-500/40',
    tipBg: 'bg-indigo-950/50',
    tipBorder: 'border-indigo-500/30',
    isDark: true,
  },
  clean_minimal: {
    id: 'clean_minimal',
    name: 'Clean Minimal',
    badge: '가독성 최고',
    bgStyle: 'bg-gradient-to-b from-stone-50 via-white to-slate-100',
    cardBgStyle: 'bg-white shadow-xl shadow-slate-200/60',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentColor: '#2563eb',
    accentGradient: 'from-blue-600 to-indigo-600',
    accentBg: 'bg-blue-600',
    borderStyle: 'border-slate-200',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700 border border-blue-200 font-semibold',
    tipBg: 'bg-slate-50',
    tipBorder: 'border-slate-300',
    isDark: false,
  },
  soft_gradient: {
    id: 'soft_gradient',
    name: 'Soft Gradient',
    badge: '인스타 감성',
    bgStyle: 'bg-gradient-to-tr from-rose-950 via-purple-950 to-slate-950',
    cardBgStyle: 'bg-white/10 backdrop-blur-xl',
    textPrimary: 'text-white',
    textSecondary: 'text-rose-100/80',
    accentColor: '#f43f5e',
    accentGradient: 'from-rose-500 via-pink-500 to-amber-400',
    accentBg: 'bg-gradient-to-r from-rose-500 to-pink-500',
    borderStyle: 'border-rose-500/20',
    tagBg: 'bg-rose-500/20',
    tagText: 'text-rose-200 border border-rose-400/40',
    tipBg: 'bg-rose-950/40',
    tipBorder: 'border-rose-500/30',
    isDark: true,
  },
  bold_accent: {
    id: 'bold_accent',
    name: 'Bold Accent',
    badge: '시선 강탈',
    bgStyle: 'bg-gradient-to-br from-zinc-950 via-black to-zinc-900',
    cardBgStyle: 'bg-zinc-900/90',
    textPrimary: 'text-white',
    textSecondary: 'text-zinc-300',
    accentColor: '#facc15',
    accentGradient: 'from-yellow-400 to-amber-500',
    accentBg: 'bg-yellow-400 text-black',
    borderStyle: 'border-yellow-400/30',
    tagBg: 'bg-yellow-400/20',
    tagText: 'text-yellow-300 border border-yellow-400/50 font-bold',
    tipBg: 'bg-yellow-950/30',
    tipBorder: 'border-yellow-500/40',
    isDark: true,
  },
  neon_cyber: {
    id: 'neon_cyber',
    name: 'Neon Cyber',
    badge: 'IT / 트렌드',
    bgStyle: 'bg-gradient-to-br from-slate-950 via-emerald-950/50 to-slate-950',
    cardBgStyle: 'bg-slate-900/90 backdrop-blur-md',
    textPrimary: 'text-white',
    textSecondary: 'text-emerald-100/75',
    accentColor: '#10b981',
    accentGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    accentBg: 'bg-emerald-500',
    borderStyle: 'border-emerald-500/30',
    tagBg: 'bg-emerald-500/20',
    tagText: 'text-emerald-300 border border-emerald-400/40',
    tipBg: 'bg-emerald-950/40',
    tipBorder: 'border-emerald-500/30',
    isDark: true,
  },
  pastel_editorial: {
    id: 'pastel_editorial',
    name: 'Pastel Editorial',
    badge: '라이프 / 매거진',
    bgStyle: 'bg-gradient-to-br from-amber-50/70 via-stone-100 to-orange-50',
    cardBgStyle: 'bg-white/90 shadow-lg shadow-amber-900/5',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accentColor: '#d97706',
    accentGradient: 'from-amber-600 to-orange-600',
    accentBg: 'bg-amber-600 text-white',
    borderStyle: 'border-stone-300',
    tagBg: 'bg-amber-100',
    tagText: 'text-amber-800 border border-amber-300 font-semibold',
    tipBg: 'bg-amber-50/80',
    tipBorder: 'border-amber-200',
    isDark: false,
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
        topic: '2026년 일잘러들이 몰래 쓰는 무료 AI 생산성 도구 5선',
        format: 'curation',
        sub: '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음'
      },
      {
        topic: '직장인 90%가 모르는 엑셀 & 노션 자동화 실전 가이드',
        format: 'howto',
        sub: '마우스 없이 키보드 하나로 끝내는 스마트 업무 루틴'
      },
      {
        topic: 'AI 툴 많이 쓸수록 생산성이 떨어진다? 흔한 AI 활용 오해 4가지',
        format: 'myth_fact',
        sub: '진짜 일잘러가 AI를 다루는 결정적인 관점의 차이'
      }
    ]
  },
  {
    id: 'finance_wealth',
    name: '재테크 & 부업',
    emoji: '📈',
    target: '사회초년생 / N잡러',
    description: '월 100만원 패시브 인컴과 현명한 자산 불리기',
    defaultFormat: 'howto',
    defaultTheme: 'bold_accent',
    topics: [
      {
        topic: '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
        format: 'curation',
        sub: '통장 쪼개기와 자동 저축으로 1년 만에 종잣돈 완성'
      },
      {
        topic: '자고 있어도 월 50만원 들어오는 무자본 디지털 부업 3단계 로드맵',
        format: 'howto',
        sub: '초보자도 오늘 저녁부터 바로 시작할 수 있는 실전 프로세스'
      },
      {
        topic: '통장에 돈 모으려면 무조건 절약만 해야 한다? 재테크 상식의 진실',
        format: 'myth_fact',
        sub: '아끼는 것보다 10배 더 중요한 소득 파이프라인 확장법'
      }
    ]
  },
  {
    id: 'self_growth',
    name: '자기계발 & 동기부여',
    emoji: '💡',
    target: '2030 청년 / 성장러',
    description: '멘탈 관리, 아침 루틴, 흔들리지 않는 습관 만들기',
    defaultFormat: 'checklist',
    defaultTheme: 'clean_minimal',
    topics: [
      {
        topic: '상위 1% 성공한 사람들이 아침 기상 후 10분 동안 절대 안 하는 행동',
        format: 'curation',
        sub: '하루의 집중력과 성과를 3배로 올려주는 모닝 루틴의 비밀'
      },
      {
        topic: '번아웃 오기 전 지금 내 멘탈 상태 점검 자가진단 체크리스트',
        format: 'checklist',
        sub: '3개 이상 해당되면 지금 당장 휴식이 필요합니다'
      },
      {
        topic: '의지력이 약해서 실패하는 게 아니다? 습관 형성의 과학적 진실',
        format: 'myth_fact',
        sub: '의지력에 의존하지 않고 자동으로 움직이는 환경 설계법'
      }
    ]
  },
  {
    id: 'marketing_branding',
    name: '마케팅 & 브랜딩',
    emoji: '📣',
    target: '사업가 / 마케터',
    description: '조회수 100만 터지는 콘텐츠 알고리즘과 카피라이팅',
    defaultFormat: 'story_insight',
    defaultTheme: 'soft_gradient',
    topics: [
      {
        topic: '인스타그램 릴스 조회수 100만 터진 3초 후킹 공식 5가지',
        format: 'curation',
        sub: '스크롤을 멈추게 만드는 첫 문장 카피라이팅 템플릿'
      },
      {
        topic: '스타벅스가 커피 대신 공간을 팔아 세계 1위가 된 브랜딩 비밀',
        format: 'story_insight',
        sub: '경쟁하지 않고 나만의 독점 카테고리를 만드는 인사이트'
      },
      {
        topic: '팔로워 수만 많으면 돈이 저절로 벌린다? SNS 마케팅의 오해와 진실',
        format: 'myth_fact',
        sub: '진성 팬 1,000명이 허수 팔로워 10만 명보다 강력한 이유'
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
        topic: '자고 일어나도 개운하지 않은 사람을 위한 수면의 질 200% 높이는 팁',
        format: 'curation',
        sub: '수면 전 30분 스마트폰 대신 해야 할 4가지 회복 습관'
      },
      {
        topic: '다이어트할 때 탄수화물 아예 끊으면 살 빠진다? 흔한 식단 오해 4선',
        format: 'myth_fact',
        sub: '근손실 없이 체지방만 쏙 빼는 영양 섭취의 진실'
      },
      {
        topic: '하루 종일 앉아있는 직장인을 위한 거북목 & 허리 통증 탈출 5분 스트레칭',
        format: 'howto',
        sub: '의자에 앉은 채로 따라만 하면 바로 시원해지는 루틴'
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
  '2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선',
  '면접관이 1초 만에 합격시키는 1분 자기소개 공식',
  '자고 있어도 돈 들어오는 월 100만원 패시브 인컴 구조',
  '아침 10분이 하루 전체 생산성을 결정하는 루틴',
  '모르면 세금 폭탄 맞는 연말정산 절세 꿀팁 4가지'
];
