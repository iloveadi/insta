export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.3.0',
  codename: 'Editorial-Studio-Viral-3x4',
  releaseDate: '2026-09-03',
  highlights: [
    '고감도 에디토리얼 매거진 스타일 전면 리디자인 (탈 AI 템플릿)',
    '3:4 신규 프로필 격자(1080×1440) 및 4:5/1:1 적응형 해상도 지원',
    '도파민 & 현실 격공/유머 중심 바이럴 카드뉴스 시스템 및 무드 선택기 탑재'
  ]
};
