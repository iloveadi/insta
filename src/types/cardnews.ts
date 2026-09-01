export type CardNewsCategory = 
  | 'curation'      // 큐레이션/추천형
  | 'howto'         // 가이드/How-To형
  | 'checklist'     // 체크리스트/자가진단형
  | 'myth_fact'     // 오해 vs 진실형
  | 'story_insight'; // 스토리/인사이트형

export type ThemePresetId = 
  | 'modern_dark'
  | 'clean_minimal'
  | 'soft_gradient'
  | 'bold_accent'
  | 'neon_cyber'
  | 'pastel_editorial'
  | 'contrast_navy_orange'
  | 'contrast_purple_lime'
  | 'contrast_teal_coral'
  | 'contrast_yellow_black';

export type AspectRatio = '1:1' | '4:5';

export interface ThemeConfig {
  id: ThemePresetId;
  name: string;
  badge: string;
  bgStyle: string;
  cardBgStyle: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  accentGradient: string;
  accentBg: string;
  borderStyle: string;
  tagBg: string;
  tagText: string;
  tipBg: string;
  tipBorder: string;
  tipText: string;
  tipTitle: string;
  footerText: string;
  footerBadge: string;
  isDark: boolean;
}

export type SlideType = 'cover' | 'content' | 'checklist' | 'comparison' | 'quote' | 'cta';

export interface Slide {
  id: string;
  page: number;
  type: SlideType;
  tag?: string;
  main_title?: string;
  sub_title?: string;
  step_or_num?: string;
  title?: string;
  body?: string;
  tip?: string;
  image_url?: string;
  image_keyword?: string;
  // Extended types
  items?: string[];
  left_label?: string;
  left_content?: string;
  right_label?: string;
  right_content?: string;
}

export interface CardNewsProject {
  topic: string;
  target_audience: string;
  card_type: CardNewsCategory;
  theme_type: ThemePresetId;
  aspect_ratio: AspectRatio;
  brand_handle: string;
  slide_count: number;
  instagram_caption: string;
  slides: Slide[];
}

export interface GenerationRequest {
  topic: string;
  targetAudience: string;
  category: CardNewsCategory;
  slideCount: number;
  theme: ThemePresetId;
  aspectRatio: AspectRatio;
  brandHandle: string;
  includeImages?: boolean;
  apiKey?: string;
}
