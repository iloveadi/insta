export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.2.3',
  codename: 'Gemini-2.5-Flash-Standard',
  releaseDate: '2026-09-02',
  highlights: [
    '최신 Google Gemini 2.5 Flash (gemini-2.5-flash) 표준 엔드포인트 전면 교체',
    'gemini-2.0-flash 자동 폴백 안전망 구축',
    'API 키 복사 시 모든 공백 및 개행 정규식(/\\s+/g) 자동 제거',
    'Ping 테스트 함수 최신 표준 규격으로 전면 재작성'
  ]
};
