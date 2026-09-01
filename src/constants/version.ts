export interface VersionInfo {
  version: string;
  codename: string;
  releaseDate: string;
  highlights: string[];
}

export const APP_VERSION: VersionInfo = {
  version: '1.2.2',
  codename: 'Gemini-1.5-Flash-Standard',
  releaseDate: '2026-09-02',
  highlights: [
    'Google Gemini 공식 gemini-1.5-flash 표준 엔드포인트 단일화',
    'API 키 복사 시 앞뒤 공백 자동 trim 처리 필수 적용',
    '키 유효성 테스트 시 초경량 ping 페이로드 호출 및 상세 콘솔 에러 로깅 보강',
    '100% 실시간 Google Gemini API 생성 파이프라인 정립'
  ]
};
