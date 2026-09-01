export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.2.0',
  codename: 'Complementary-Color & High-Contrast',
  releaseDate: '2026-09-02',
  highlights: [
    '화이트/라이트 테마 (클린 미니멀, 파스텔) 텍스트 시인성 100% 개선',
    '인스타 시선강탈 보색 대비 테마 4종 신규 추가 (총 10종 테마 지원)',
    '네이비 & 오렌지, 퍼플 & 네온라임, 딥틸 & 리빙코랄, 하이퍼 옐로우 테마',
    '상단 로고 클릭 시 즉시 새로고침(Reset/Reload) 기능 추가',
    '4:5 세로형 (1080×1350) 고정 및 1:1 안전영역 시스템 구축',
    '타깃 독자별 원클릭 맞춤 자동 생성 엔진 탑재',
    '표지-본문 100% 일치 실전 토픽 레지스트리 구축',
    'CSS 렌더링 블러 번짐 현상 전면 제거 & 클린 타이포그래피 복원'
  ]
};
