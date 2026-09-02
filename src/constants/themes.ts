import type { ThemeConfig, ThemePresetId, CardNewsCategory } from '../types/cardnews';

export const THEME_PRESETS: Record<ThemePresetId, ThemeConfig> = {
  studio_editorial: {
    id: 'studio_editorial',
    name: '스튜디오 에디토리얼',
    badge: '추천 No.1',
    bgStyle: 'bg-[#FAF8F5]',
    cardBgStyle: 'bg-white shadow-xl shadow-stone-300/40 border border-[#E8E4DC]',
    textPrimary: 'text-[#181716]',
    textSecondary: 'text-[#57534E]',
    accentColor: '#E64A19',
    accentBg: 'bg-[#E64A19] text-white',
    borderStyle: 'border-[#E8E4DC]',
    tagBg: 'bg-[#181716]',
    tagText: 'text-[#FAF8F5]',
    tipBg: 'bg-[#F5EFE9] border-l-4 border-l-[#E64A19]',
    tipBorder: 'border-[#E8DFD3]',
    tipTitle: 'text-[#E64A19] font-black',
    tipText: 'text-[#292524] font-semibold',
    footerText: 'text-[#78716C]',
    footerBadge: 'bg-[#EDE7DE] text-[#181716]',
    isDark: false,
    eyebrowColor: 'text-[#E64A19]',
    highlightBg: 'bg-[#E64A19]/10 text-[#E64A19]',
    dividerColor: 'border-[#E8E4DC]',
  },
  obsidian_acid: {
    id: 'obsidian_acid',
    name: '옵시디언 & 애시드',
    badge: '테크 매거진',
    bgStyle: 'bg-[#0B0C0E]',
    cardBgStyle: 'bg-[#13151A] border border-white/[0.09] shadow-2xl',
    textPrimary: 'text-[#F9FAFB]',
    textSecondary: 'text-[#9CA3AF]',
    accentColor: '#CCFF00',
    accentBg: 'bg-[#CCFF00] text-[#0B0C0E] font-black',
    borderStyle: 'border-white/[0.08]',
    tagBg: 'bg-[#CCFF00]',
    tagText: 'text-[#0B0C0E] font-black',
    tipBg: 'bg-[#151922] border-l-4 border-l-[#CCFF00]',
    tipBorder: 'border-white/[0.1]',
    tipTitle: 'text-[#CCFF00] font-black',
    tipText: 'text-[#E5E7EB] font-semibold',
    footerText: 'text-[#6B7280]',
    footerBadge: 'bg-white/[0.08] text-white',
    isDark: true,
    eyebrowColor: 'text-[#CCFF00]',
    highlightBg: 'bg-[#CCFF00]/15 text-[#CCFF00]',
    dividerColor: 'border-white/[0.08]',
  },
  seoul_monochrome: {
    id: 'seoul_monochrome',
    name: '성수 미니멀리스트',
    badge: '스위스 모던',
    bgStyle: 'bg-[#0E0F12]',
    cardBgStyle: 'bg-[#18191E] border border-white/[0.12] shadow-2xl',
    textPrimary: 'text-[#FFFFFF]',
    textSecondary: 'text-[#CBD5E1]',
    accentColor: '#2563EB',
    accentBg: 'bg-[#2563EB] text-white font-black',
    borderStyle: 'border-white/[0.12]',
    tagBg: 'bg-white',
    tagText: 'text-[#0E0F12] font-black',
    tipBg: 'bg-[#141B2D] border-l-4 border-l-[#3B82F6]',
    tipBorder: 'border-blue-500/30',
    tipTitle: 'text-[#60A5FA] font-black',
    tipText: 'text-white font-semibold',
    footerText: 'text-[#94A3B8]',
    footerBadge: 'bg-white/[0.1] text-white',
    isDark: true,
    eyebrowColor: 'text-[#3B82F6]',
    highlightBg: 'bg-blue-500/20 text-blue-300',
    dividerColor: 'border-white/[0.12]',
  },
  nordic_forest: {
    id: 'nordic_forest',
    name: '노르딕 모스 & 골드',
    badge: '프리미엄 웰니스',
    bgStyle: 'bg-[#0C1A14]',
    cardBgStyle: 'bg-[#14261F] border border-emerald-500/20 shadow-2xl',
    textPrimary: 'text-[#F4F7F5]',
    textSecondary: 'text-[#CAD8CF]',
    accentColor: '#E5C07B',
    accentBg: 'bg-[#E5C07B] text-[#0C1A14] font-black',
    borderStyle: 'border-emerald-500/20',
    tagBg: 'bg-[#E5C07B]',
    tagText: 'text-[#0C1A14] font-black',
    tipBg: 'bg-[#182F26] border-l-4 border-l-[#E5C07B]',
    tipBorder: 'border-emerald-400/20',
    tipTitle: 'text-[#E5C07B] font-black',
    tipText: 'text-[#EAF2EC] font-semibold',
    footerText: 'text-[#8FA899]',
    footerBadge: 'bg-emerald-500/20 text-[#E5C07B]',
    isDark: true,
    eyebrowColor: 'text-[#E5C07B]',
    highlightBg: 'bg-[#E5C07B]/15 text-[#E5C07B]',
    dividerColor: 'border-emerald-500/20',
  },
  sunset_terracotta: {
    id: 'sunset_terracotta',
    name: '선셋 에스프레소',
    badge: '라이프스타일',
    bgStyle: 'bg-[#171210]',
    cardBgStyle: 'bg-[#221B18] border border-orange-500/20 shadow-2xl',
    textPrimary: 'text-[#FFF7ED]',
    textSecondary: 'text-[#FED7AA]',
    accentColor: '#F97316',
    accentBg: 'bg-[#F97316] text-white font-black',
    borderStyle: 'border-orange-500/20',
    tagBg: 'bg-[#F97316]',
    tagText: 'text-white font-black',
    tipBg: 'bg-[#2A201C] border-l-4 border-l-[#F97316]',
    tipBorder: 'border-orange-500/30',
    tipTitle: 'text-[#FB923C] font-black',
    tipText: 'text-[#FFF7ED] font-semibold',
    footerText: 'text-[#A89284]',
    footerBadge: 'bg-orange-500/20 text-[#FDBA74]',
    isDark: true,
    eyebrowColor: 'text-[#FB923C]',
    highlightBg: 'bg-orange-500/15 text-[#FB923C]',
    dividerColor: 'border-orange-500/20',
  },
  clean_atelier: {
    id: 'clean_atelier',
    name: '클린 아틀리에',
    badge: '모던 화이트',
    bgStyle: 'bg-[#FFFFFF]',
    cardBgStyle: 'bg-[#F9FAFB] border border-[#E5E7EB] shadow-lg',
    textPrimary: 'text-[#111827]',
    textSecondary: 'text-[#4B5563]',
    accentColor: '#0F172A',
    accentBg: 'bg-[#0F172A] text-white font-black',
    borderStyle: 'border-[#E5E7EB]',
    tagBg: 'bg-[#0F172A]',
    tagText: 'text-white font-black',
    tipBg: 'bg-[#F3F4F6] border-l-4 border-l-[#0F172A]',
    tipBorder: 'border-[#E5E7EB]',
    tipTitle: 'text-[#111827] font-black',
    tipText: 'text-[#374151] font-semibold',
    footerText: 'text-[#9CA3AF]',
    footerBadge: 'bg-[#E5E7EB] text-[#111827]',
    isDark: false,
    eyebrowColor: 'text-[#0F172A]',
    highlightBg: 'bg-slate-100 text-slate-900',
    dividerColor: 'border-slate-200',
  },
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
    id: 'office_humor',
    name: '직장인 현실 격공',
    emoji: '💀',
    target: 'K-직장인 (퇴사희망러)',
    description: '뼈 맞아서 순살되는 월요병 & 칼퇴 & 월급 증발 썰',
    defaultFormat: 'curation',
    defaultTheme: 'studio_editorial',
    topics: [
      {
        topic: '직장인 영혼 탈곡되는 순간 TOP 5 (뼈 맞음 주의)',
        format: 'curation',
        sub: '월요일 출근길부터 퇴근 10분 전까지... 나만 이러는 거 아니지? 😭'
      },
      {
        topic: '월급날 통장 잔고가 3초 만에 로그아웃되는 과정',
        format: 'curation',
        sub: '하이패스 톨게이트마냥 스쳐 지나가는 내 소중한 월급의 최후'
      },
      {
        topic: '탕비실에서 마주치면 가장 어색한 사람 유형 4선',
        format: 'curation',
        sub: '눈 마주치는 순간 뚝딱거리는 내 몸뚱아리 탈출법'
      }
    ]
  },
  {
    id: 'mbti_psychology',
    name: '극T vs 극F & 심리',
    emoji: '🧠',
    target: 'MBTI 과몰입러',
    description: '카톡 티키타카 대참사와 공감 200% 성향 탐구',
    defaultFormat: 'myth_fact',
    defaultTheme: 'obsidian_acid',
    topics: [
      {
        topic: '극T와 극F가 카톡으로 대화할 때 일어나는 대참사 4선',
        format: 'myth_fact',
        sub: '위로해달라고 했더니 해결책 던져주는 T vs 혼자 감동받은 F'
      },
      {
        topic: '외향인 코스프레하는 사회적 내향인(E 탈을 쓴 I) 특징 5가지',
        format: 'checklist',
        sub: '집에 도착하자마자 스마트폰 비행기 모드 켜는 이유'
      },
      {
        topic: '은근 소름 돋는 MBTI별 숨겨진 흑막 모먼트',
        format: 'curation',
        sub: '평소엔 천사 같다가 스위치 눌리면 제일 무서운 유형'
      }
    ]
  },
  {
    id: 'balance_game',
    name: '댓글 폭발 밸런스 게임',
    emoji: '⚖️',
    target: '친구 태그 유발러',
    description: '피 터지는 논쟁과 도파민 폭발 선택 장애 유발',
    defaultFormat: 'myth_fact',
    defaultTheme: 'sunset_terracotta',
    topics: [
      {
        topic: '친구들 모이면 밤새 피 터지는 황금 밸런스 게임 5선',
        format: 'myth_fact',
        sub: '절대 양보 못 해! 댓글 창 난리 나는 극강의 선택지'
      },
      {
        topic: '평생 라면만 먹기 vs 평생 치킨만 먹기 (의외로 갈림)',
        format: 'myth_fact',
        sub: '당신의 혓바닥과 위장이 선택할 단 하나의 메뉴는?'
      },
      {
        topic: '카톡 1초 만에 읽씹 vs 일주일 뒤 안읽씹 답장',
        format: 'myth_fact',
        sub: '더 킹받는 건 누구? 인간관계 파탄 직전 밸런스'
      }
    ]
  },
  {
    id: 'alone_life',
    name: '자취생 눈물 썰',
    emoji: '🏠',
    target: '프로자취러',
    description: '배달앱의 배신과 자취방 인테리어 현실 직시',
    defaultFormat: 'curation',
    defaultTheme: 'nordic_forest',
    topics: [
      {
        topic: '자취 5년차가 뼈저리게 깨달은 현실 자취 꿀팁 (배달앱 삭제각)',
        format: 'curation',
        sub: '인스타 감성 인테리어 꿈꾸다 원룸 창고 된 썰'
      },
      {
        topic: '자취방에 절대 들이면 안 되는 예쁜 쓰레기 템 5선',
        format: 'curation',
        sub: '살 땐 설렜는데 지금은 옷걸이로 전락한 아이템들'
      }
    ]
  },
  {
    id: 'crazy_trivia',
    name: '소름 돋는 충격 잡학',
    emoji: '🍿',
    target: '호기심 천국',
    description: '외국인 문화충격과 당근마켓 레전드 실화 썰',
    defaultFormat: 'story_insight',
    defaultTheme: 'seoul_monochrome',
    topics: [
      {
        topic: '외국인이 한국 와서 기절초풍한 문화 충격 TOP 5',
        format: 'curation',
        sub: '카페에 노트북 두고 화장실 가도 안 털리는 기적의 나라'
      },
      {
        topic: '당근마켓 역대급 레전드 거래 썰 모음 (실화주의)',
        format: 'story_insight',
        sub: '네고 거부하다가 훈훈하게 결혼까지 골인한 레전드 사연'
      }
    ]
  },
  {
    id: 'love_dating',
    name: '연애 & 카톡 티키타카',
    emoji: '💘',
    target: '썸/연애 중인 사람',
    description: '그린라이트 판독법과 썸 탈 때 정 털리는 순간',
    defaultFormat: 'howto',
    defaultTheme: 'clean_atelier',
    topics: [
      {
        topic: '이 카톡 받으면 100% 그린라이트 vs 단순 친절 구별법',
        format: 'howto',
        sub: '혼자 김칫국 원샷하기 전에 꼭 확인해야 할 신호들'
      },
      {
        topic: '썸 탈 때 정 털리는 최악의 카톡 말투 유형 4가지',
        format: 'curation',
        sub: '말 한마디로 설렘 와장창 깨지는 카톡 금기어 모음'
      }
    ]
  }
];

export const DEFAULT_AUDIENCES = [
  'K-직장인 (퇴사희망러)',
  '극T vs 극F',
  '프로자취러',
  'MBTI 과몰입러',
  '썸/연애 중인 사람',
  '대학생/취준생',
  '갓생 실패러',
  '다이어트 작심삼일러'
];

export const SAMPLE_TOPICS = [
  '직장인 영혼 탈곡되는 순간 TOP 5 (뼈 맞음 주의)',
  '극T와 극F가 카톡으로 대화할 때 일어나는 대참사 4선',
  '자취 5년차가 뼈저리게 깨달은 현실 자취 꿀팁 (배달앱 삭제각)',
  '친구들 모이면 밤새 피 터지는 황금 밸런스 게임 5선',
  '외국인이 한국 와서 기절초풍한 문화 충격 TOP 5'
];
