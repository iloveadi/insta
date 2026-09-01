export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.2.4',
  codename: 'Gemini-3.6-Flash-Official',
  releaseDate: '2026-09-02',
  highlights: [
    '최신 공식 Google Gemini 3.6 Flash (gemini-3.6-flash) 엔드포인트 전면 적용',
    '구버전(1.5 / 2.0 / 2.5) 모델 참조 완전 제거',
    'API 키 복사 시 전체 공백/개행 정규식 자동 제거 및 경량 Ping 테스트'
  ]
};
