import type { CardNewsProject } from '../types/cardnews';

export const INITIAL_PROJECT: CardNewsProject = {
  topic: '2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선',
  target_audience: '2030 직장인',
  card_type: 'curation',
  theme_type: 'modern_dark',
  aspect_ratio: '4:5',
  brand_handle: '@kimppungsamssi',
  slide_count: 5,
  instagram_caption: '📌 "2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선"\n\n2030 직장인이라면 무조건 알아야 할 핵심 꿀팁!\n지금 바로 [저장 💾]해두고 꺼내보세요.\n\n#카드뉴스 #인스타카드뉴스 #직장인 #AI툴 #생산성',
  slides: [
    {
      id: 'slide-1-init',
      page: 1,
      type: 'cover',
      tag: '🔥 2030 직장인 필독',
      main_title: '2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선',
      sub_title: '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음'
    },
    {
      id: 'slide-2-init',
      page: 2,
      type: 'content',
      tag: '💡 실전 꿀팁 01',
      step_or_num: '01',
      title: 'Claude 3.7 Sonnet - 논리적 보고서 & 코딩 종결자',
      body: '긴 PDF 문서 요약과 기획서 초안 작성에 현존 최강의 한국어 이해력을 자랑합니다.',
      tip: '프롬프트에 "핵심 결론부터 3줄 요약해줘"라고 입력하면 10배 깔끔해집니다.'
    },
    {
      id: 'slide-3-init',
      page: 3,
      type: 'content',
      tag: '💡 실전 꿀팁 02',
      step_or_num: '02',
      title: 'Perplexity AI - 실시간 출처 기반 검색 리서치',
      body: '구글 검색 10번 돌릴 시간에 질문 하나로 최신 논문과 뉴스 출처를 깔끔하게 브리핑합니다.',
      tip: 'Focus 옵션에서 "Academic"을 선택하면 신뢰도가 대폭 상승합니다.'
    },
    {
      id: 'slide-4-init',
      page: 4,
      type: 'content',
      tag: '💡 실전 꿀팁 03',
      step_or_num: '03',
      title: 'Gamma App - 1분 만에 PPT 발표자료 & 웹페이지 완성',
      body: '주제 텍스트만 넣으면 디자인 레이아웃과 폰트가 완벽한 슬라이드 덱을 자동으로 찍어냅니다.',
      tip: '완성 후 파워포인트(.pptx)로 원클릭 내보내기가 가능합니다.'
    },
    {
      id: 'slide-5-init',
      page: 5,
      type: 'cta',
      tag: '💾 SAVE & SHARE',
      main_title: '나중에 다시 찾아보려면?',
      sub_title: '지금 오른쪽 아래 [저장]을 누르고, 유익했다면 동료에게 [공유]해보세요! ✨'
    }
  ]
};
