export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.1.2',
  codename: 'Coherent-Badging & Polish',
  releaseDate: '2026-09-02',
  highlights: [
    '슬라이드 상단 불필요한 SPECIAL REPORT 영문 태그 제거 및 일관된 국문 주제 태그 적용',
    '하단 4:5 CAROUSEL 라벨 제거 및 깔끔한 브랜드 워터마크 통일',
    '배경 원형 잔상 제거 및 초경량 클린 그라데이션 정돈',
    '상단 로고 클릭 시 즉시 새로고침(Reset/Reload) 기능 추가',
    '4:5 세로형 (1080×1350) 고정 및 1:1 안전영역 시스템 구축',
    '타깃 독자별 원클릭 맞춤 자동 생성 엔진 탑재',
    '표지-본문 100% 일치 실전 토픽 레지스트리 구축',
    'CSS 렌더링 블러 번짐 현상 전면 제거 & 클린 타이포그래피 복원'
  ]
};
