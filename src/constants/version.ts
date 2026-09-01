export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.2.1',
  codename: 'Dynamic-Shuffle & API-Tester',
  releaseDate: '2026-09-02',
  highlights: [
    'API 설정 모달 내 원클릭 Gemini API 키 유효성 테스트 버튼 추가',
    'API 키 미등록 상태에서도 클릭마다 매번 새로운 내용이 생성되는 다이내믹 셔플 엔진 탑재',
    'Gemini 2.5 Flash / 2.0 / 1.5 모델 자동 폴백 시스템 구축',
    '화이트/라이트 테마 (클린 미니멀, 파스텔) 텍스트 시인성 100% 개선',
    '인스타 시선강탈 보색 대비 테마 4종 신규 추가 (총 10종 테마 지원)',
    '상단 로고 클릭 시 즉시 새로고침(Reset/Reload) 기능'
  ]
};
