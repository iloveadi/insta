import { GoogleGenAI } from '@google/genai';
import type { CardNewsProject, GenerationRequest, Slide, SlideType, CardNewsCategory, ThemePresetId, AspectRatio } from '../types/cardnews';
import type { ViralQuickCategory } from '../constants/themes';

const SYSTEM_PROMPT = `당신은 100만 팔로워를 보유한 최상위 인스타그램 카드뉴스 전문 크리에이터이자 카피라이터입니다.
사용자가 제공하는 [주제], [타깃 독자], [카드뉴스 유형], [슬라이드 수]에 맞춰 인스타그램 피드에서 스와이프를 유발하고 저장/공유율을 극대화하는 카드뉴스를 기획하세요.

[핵심 작성 원칙 - 절대 준수]
1. 모호하거나 뻔한 일반론(예: '첫 번째 포인트', '노력을 해야 한다')은 절대 금지합니다.
2. 반드시 표지 제목과 100% 일치하는 구체적인 실명/도구명(예: ChatGPT, Claude, Notion, Perplexity 등), 실제 수치, 정확한 노하우, 행동 지침을 슬라이드마다 명확히 작성하세요.
3. 슬라이드 구성:
   - 표지 (Cover): 3초 만에 스크롤을 멈추게 하는 강력한 후킹 헤드라인과 타깃 태그.
   - 본문 (${3}~5장): 각 슬라이드마다 
     * 소제목(title): 명확하고 매력적인 핵심 소제목 (예: '01. Claude 3.7 - 코딩 & 긴 글 분석 1위')
     * 본문(body): 모바일 가독성에 맞춘 2~3줄의 알찬 실전 요약 설명
     * PRO TIP(tip): 바로 써먹을 수 있는 단 1줄의 실천 팁/단축키/활용법
   - CTA (마지막): '저장해두고 필요할 때 꺼내보기' 등 저장/공유 유도.
4. 인스타그램 캡션 (instagram_caption): 본문 핵심 요약 + 저장 유도 + 추천 해시태그 10~15개를 포함하여 이모지와 함께 작성.

반드시 정해진 JSON 스키마 형식만을 반환하세요.`;

export interface DedicatedTopicPreset {
  topic: string;
  format: CardNewsCategory;
  sub: string;
  theme: ThemePresetId;
  slides: Array<{
    step_or_num: string;
    title: string;
    body: string;
    tip: string;
  }>;
}

// ── EXACT TOPIC & SLIDE MAPPING REGISTRY (100% RELEVANCE GUARANTEED) ──
export const TOPIC_REGISTRY: Record<string, DedicatedTopicPreset> = {
  // 1. 자소서 챗GPT 프롬프트
  '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지': {
    topic: '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
    format: 'curation',
    sub: '경험 정리부터 기업 인재상 매칭까지 10분 만에 끝내는 프롬프트 모음',
    theme: 'modern_dark',
    slides: [
      {
        step_or_num: 'PROMPT 01',
        title: 'STAR 기법 경험 구조화 프롬프트',
        body: '"내가 겪은 일화(상황 2줄)를 바탕으로 상황(S)-과제(T)-행동(A)-결과(R) 프레임워크에 맞춰 500자로 구조화해줘."',
        tip: '결과 부분에는 반드시 "전년 대비 25% 성장"처럼 구체적 숫자를 넣으세요.'
      },
      {
        step_or_num: 'PROMPT 02',
        title: '기업 인재상 & 직무 키워드 자동 매칭',
        body: '"00기업의 핵심 가치(도전, 소통)와 나의 프로젝트 경험을 연결하여 면접관이 공감할 만한 설득력 있는 문장 3개 추천해줘."',
        tip: '채용공고의 직무기술서(JD) 텍스트를 함께 복사해서 프롬프트에 넣으세요.'
      },
      {
        step_or_num: 'PROMPT 03',
        title: '두괄식 소제목 & 매력적인 첫 문장 도출',
        body: '"이 자기소개서 문단을 읽고 면접관의 시선을 단번에 사로잡을 20자 이내의 두괄식 소제목 5개 뽑아줘."',
        tip: '소제목에 나의 핵심 역량 키워드를 대괄호 [ ] 안에 넣어 강조하세요.'
      },
      {
        step_or_num: 'PROMPT 04',
        title: '어색한 번역투 및 군더더기 문장 다듬기',
        body: '"이 글에서 피동 표현, 중복 단어, 추상적인 형용사를 제거하고 직관적이고 자신감 있는 어조로 다듬어줘."',
        tip: '"~인 것 같습니다" 대신 "~를 달성했습니다"로 명확히 끝맺으세요.'
      }
    ]
  },

  // 2. 면접 1분 자기소개
  '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식': {
    topic: '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식',
    format: 'howto',
    sub: '뻔한 자기소개 버리고 강렬하게 첫인상 각인시키는 3단계',
    theme: 'clean_minimal',
    slides: [
      {
        step_or_num: 'STEP 01',
        title: '후킹 도입부 - 한 문장 직무 키워드 정의',
        body: '"안녕하십니까, 데이터로 고객의 문제를 해결하는 마케터 000입니다."처럼 뻔한 성장과정 대신 내 핵심 직무 정체성을 3초 안에 던지세요.',
        tip: '도입부에서 면접관이 서류에서 고개를 들게 만들어야 합니다.'
      },
      {
        step_or_num: 'STEP 02',
        title: '핵심 성공 경험 - 수치 기반 액션 1가지 압축',
        body: '여러 경험을 나열하지 말고, 직무와 가장 직결된 단 1가지 성공 프로젝트와 그 결과를 명확한 숫자로 증명하세요.',
        tip: '"팀원들과 협력해 문제를 해결하고 매출을 140% 개선한 경험이 있습니다."'
      },
      {
        step_or_num: 'STEP 03',
        title: '입사 후 기여점 - 회사의 미래와 나를 연결',
        body: '내가 가진 역량이 이 회사에 입사했을 때 어떤 구체적인 이익이나 성과로 전환될 수 있는지 포부를 밝히며 마무리하세요.',
        tip: '"이 경험을 바탕으로 00 신사업에서 즉시 실전 성과를 내겠습니다."'
      }
    ]
  },

  // 3. 서류 합격 체크리스트
  '합격률 3배 올리는 서류 지원 전 최종 점검 체크리스트': {
    topic: '합격률 3배 올리는 서류 지원 전 최종 점검 체크리스트',
    format: 'checklist',
    sub: '오탈자 확인부터 직무 키워드 매칭까지 필수 점검',
    theme: 'bold_accent',
    slides: [
      {
        step_or_num: 'CHECK 01',
        title: '회사명 및 지원 직무 오탈자 전수 검사',
        body: '다른 회사에 썼던 자소서를 복사해 붙여넣다 발생하는 회사명 실수는 무조건 서류 탈락 1순위입니다.',
        tip: 'Ctrl+F를 눌러 지원하는 회사명이 정확한지 반드시 3번 확인하세요.'
      },
      {
        step_or_num: 'CHECK 02',
        title: '모든 문단에 두괄식 핵심 메시지 배치',
        body: '면접관은 긴 글을 끝까지 읽지 않습니다. 각 항목의 첫 문장만 읽어도 나의 역량을 알 수 있게 두괄식으로 쓰세요.',
        tip: '결론 -> 근거 -> 구체적 액션 순서로 문단을 배치하세요.'
      },
      {
        step_or_num: 'CHECK 03',
        title: '형용사 대신 100% 정량적 수치 표기',
        body: '"열심히 노력하여 좋은 성과를 냈다"는 버리고 "3주간 50명을 인터뷰하여 이탈률 18% 감소"로 바꾸세요.',
        tip: '숫자가 들어간 문장은 신뢰도가 3배 이상 상승합니다.'
      }
    ]
  },

  // 4. 취업 오해와 진실
  '스펙이 많아야 서류를 통과한다? 취업 시장의 오해와 진실': {
    topic: '스펙이 많아야 서류를 통과한다? 취업 시장의 오해와 진실',
    format: 'myth_fact',
    sub: '나열식 자격증보다 단 1개의 직무 프로젝트가 강력한 이유',
    theme: 'neon_cyber',
    slides: [
      {
        step_or_num: 'POINT 01',
        title: '무의미한 다다익선 자격증 vs 직무 실전 프로젝트',
        body: '직무와 무관한 자격증 5개보다, 실제 고객 데이터를 다뤄보거나 서비스를 기획해 본 1개의 포트폴리오가 100배 강력합니다.',
        tip: '채용담당자는 "자격증이 많은 사람"이 아니라 "내일 당장 일할 사람"을 뽑습니다.'
      },
      {
        step_or_num: 'POINT 02',
        title: '학점 0.1점 올리기 vs 실무 툴(Figma, SQL, Notion) 활용력',
        body: '일정 기준 이상의 학점이라면 더 올리려 애쓰지 말고, 현업에서 쓰는 실무 툴과 협업 경험을 증명하는 데 시간을 쓰세요.',
        tip: '신입이라도 실무 툴을 능숙하게 다루면 사수들의 교육 부담이 줄어듭니다.'
      },
      {
        step_or_num: 'POINT 03',
        title: '성공 경험만 나열 vs 실패에서 배운 구체적인 레슨',
        body: '모든 프로젝트가 성공할 수는 없습니다. 실패 원인을 객관적으로 분석하고 어떻게 극복했는지 보여줄 때 진짜 문제 해결력이 드러납니다.',
        tip: '"실패를 통해 00 프로세스의 중요성을 깨닫고 개선했습니다."'
      }
    ]
  },

  // 5. 대학생 과탑 생산성 툴
  '학점 4.5 과탑 선배가 매일 쓰는 무료 대학생 생산성 툴 5선': {
    topic: '학점 4.5 과탑 선배가 매일 쓰는 무료 대학생 생산성 툴 5선',
    format: 'curation',
    sub: '논문 리서치부터 팀플 PPT까지 10분 컷 끝내는 비법',
    theme: 'neon_cyber',
    slides: [
      {
        step_or_num: 'TOOL 01',
        title: 'Notion - 과목별 강의 노트 & 시험 D-Day 통합 관리',
        body: '흩어진 PDF 강의자료와 과제 일정을 한 화면의 대시보드에 정리하여 시험 기간 벼락치기 효율을 3배로 끌어올립니다.',
        tip: '토글 목록 기능을 사용해 예상 시험 문제를 셀프 퀴즈 형태로 공부하세요.'
      },
      {
        step_or_num: 'TOOL 02',
        title: 'Zotero & Scite - 레포트 논문 레퍼런스 자동 수집 및 인용',
        body: '클릭 한 번으로 논문 출처와 APA/MLA 각주 형식을 자동 생성해주어 레포트 참고문헌 작성 시간을 90% 줄여줍니다.',
        tip: '크롬 확장 프로그램을 설치하면 구글 스칼라 논문을 즉시 저장할 수 있습니다.'
      },
      {
        step_or_num: 'TOOL 03',
        title: 'Gamma App - 팀플 발표 10분 컷 슬라이드 덱 제작',
        body: '과제 텍스트 개요만 넣으면 디자인 레이아웃과 폰트가 완벽한 발표용 PPT를 AI가 1분 만에 완성해 줍니다.',
        tip: '팀플에서 발표자료 제작 시간만 줄여도 과제 퀄리티가 달라집니다.'
      }
    ]
  },

  // 6. 자영업 네이버 플레이스 & 인스타 지역 마케팅
  '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법': {
    topic: '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
    format: 'howto',
    sub: '상위 노출 알고리즘과 고객 리뷰 유도 치트키 3가지',
    theme: 'bold_accent',
    slides: [
      {
        step_or_num: 'STRATEGY 01',
        title: '네이버 스마트플레이스 대표 키워드 5개 세팅',
        body: '"강남역 맛집" 같은 대형 키워드 대신 "강남역 모임하기 좋은 파스타"처럼 구매 의도가 뚜렷한 세부 롱테일 키워드를 등록하세요.',
        tip: '업체 소개글 첫 2줄 안에 핵심 타깃 키워드를 자연스럽게 포함하세요.'
      },
      {
        step_or_num: 'STRATEGY 02',
        title: '영수증 리뷰 유도 트리거 시스템',
        body: '"리뷰 써주세요"라고 부탁만 하지 말고, 테이블마다 QR 코드를 두고 "포토리뷰 시 시그니처 음료 무료"처럼 즉각적인 보상을 설계하세요.',
        tip: '키워드가 포함된 정성스러운 포토리뷰가 쌓일수록 알고리즘 점수가 급등합니다.'
      },
      {
        step_or_num: 'STRATEGY 03',
        title: '인스타그램 지역 태그 릴스로 반경 3km 타깃 노출',
        body: '가게의 시그니처 메뉴 조리 과정이나 비하인드 스토리를 숏폼으로 올리고 위치 태그를 정확히 등록하여 주변 고객에게 도달시키세요.',
        tip: '릴스 3초 안에 시각적 침샘을 자극하는 클로즈업 장면을 넣으세요.'
      }
    ]
  },

  // 7. 자영업 정부지원금 & 절세 비법
  '소상공인·1인 기업이 꼭 챙겨야 할 숨은 정부지원금 & 절세 비법': {
    topic: '소상공인·1인 기업이 꼭 챙겨야 할 숨은 정부지원금 & 절세 비법',
    format: 'curation',
    sub: '몰라서 못 받는 연간 최대 2,000만원 지원 혜택 총정리',
    theme: 'modern_dark',
    slides: [
      {
        step_or_num: 'BENEFIT 01',
        title: '청년창업 중소기업 세액감면 (최대 100% 감면)',
        body: '만 34세 이하 청년이 수도권 과밀억제권역 외에서 창업 시 5년간 종합소득세 및 법인세를 50%~100% 감면해 줍니다.',
        tip: '사업자등록 전 사업장 소재지 주소를 꼼꼼히 확인하고 신청하세요.'
      },
      {
        step_or_num: 'BENEFIT 02',
        title: '두루누리 사회보험료 지원 (최대 80% 지원)',
        body: '10인 미만 소규모 사업장의 근로자 및 사업주가 부담하는 국민연금과 고용보험료의 80%를 국가에서 지원합니다.',
        tip: '직원을 처음 채용할 때 인건비 부담을 획기적으로 낮출 수 있습니다.'
      },
      {
        step_or_num: 'BENEFIT 03',
        title: '노란우산공제 연 최대 500만원 소득공제',
        body: '소상공인의 퇴직금 마련을 위한 공제 제도로, 연간 최대 500만원 소득공제 혜택과 복리 이자를 동시에 챙길 수 있습니다.',
        tip: '종합소득세 신고 시 과세표준을 낮추는 가장 확실한 절세 치트키입니다.'
      }
    ]
  },

  // 8. 카카오톡 채널 단골 구축
  '고객 재구매율을 300% 폭발시키는 카카오톡 채널 세팅 체크리스트': {
    topic: '고객 재구매율을 300% 폭발시키는 카카오톡 채널 세팅 체크리스트',
    format: 'checklist',
    sub: '한 번 온 손님을 평생 단골로 만드는 자동 메시지 시스템',
    theme: 'soft_gradient',
    slides: [
      {
        step_or_num: 'CHECK 01',
        title: '첫 친구 추가 시 즉시 사용 가능한 10% 웰컴 쿠폰',
        body: '결제 시 "카카오 채널 추가하시면 오늘 바로 2,000원 할인됩니다"라는 멘트로 고객 연락처를 자연스럽게 확보하세요.',
        tip: '포스기 옆에 큼직한 QR코드 안내판을 필수 배치하세요.'
      },
      {
        step_or_num: 'CHECK 02',
        title: '방문 후 3일 차 만족도 조사 및 재방문 트리거',
        body: '"지난번 이용에 만족하셨나요?" 안부 메시지와 함께 다음 방문 시 사용 가능한 재방문 쿠폰을 자동 발송하세요.',
        tip: '3일 이내에 재접촉할 때 고객의 기억과 브랜드 호감도가 가장 높습니다.'
      },
      {
        step_or_num: 'CHECK 03',
        title: '이탈 고객 대상 30일 주기 리타깃팅 프로모션',
        body: '한 달 이상 방문이 없는 고객군을 분류하여 "00님, 보고 싶었어요!" 특별 혜택 메시지를 발송해 고객을 되살리세요.',
        tip: '신규 고객 유치 비용보다 기존 고객 재방문 유도 비용이 5배 저렴합니다.'
      }
    ]
  },

  // 9. 일잘러 AI 생산성 도구 5선
  '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선': {
    topic: '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
    format: 'curation',
    sub: '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음',
    theme: 'modern_dark',
    slides: [
      {
        step_or_num: 'AI TOOL 01',
        title: 'Claude 3.7 Sonnet - 복잡한 보고서 분석 & 코딩 종결자',
        body: '기존 AI보다 한국어 문맥 이해력과 논리적 추론 능력이 압도적입니다. 긴 PDF 보고서 요약 및 기획서 초안 작성에 가장 뛰어납니다.',
        tip: '프롬프트에 "핵심 결론부터 3줄 요약해줘"라고 입력하면 10배 깔끔해집니다.'
      },
      {
        step_or_num: 'AI TOOL 02',
        title: 'Perplexity AI - 실시간 출처 기반 검색 리서치',
        body: '구글 검색 10번 돌릴 시간에 질문 하나로 최신 논문, 뉴스, 블로그 출처를 실시간 링크와 함께 일목요연하게 브리핑해 줍니다.',
        tip: 'Focus 옵션에서 "Academic"이나 "Writing"을 선택하면 신뢰도가 대폭 상승합니다.'
      },
      {
        step_or_num: 'AI TOOL 03',
        title: 'Gamma App - 1분 만에 PPT 발표자료 & 웹페이지 완성',
        body: '텍스트 주제만 한 줄 넣으면 디자인 레이아웃, 이미지, 텍스트 배치가 완벽한 고퀄리티 슬라이드 덱을 자동으로 찍어냅니다.',
        tip: '완성 후 파워포인트(.pptx)나 PDF로 원클릭 내보내기가 가능합니다.'
      }
    ]
  },

  // 10. 첫 1억 모으기 소비 습관
  '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지': {
    topic: '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
    format: 'curation',
    sub: '통장 쪼개기와 자동 저축으로 1년 만에 종잣돈 완성',
    theme: 'bold_accent',
    slides: [
      {
        step_or_num: 'HABIT 01',
        title: '신용카드 무이자 할부와 후불 결제 끊기',
        body: '신용카드의 할부 결제는 내 미래 소득을 미리 저당잡히는 행위입니다. 한 달 예산이 정해진 체크카드만 사용하는 습관이 1년 500만원을 아낍니다.',
        tip: '월급날 생활비를 제외한 전액을 저축 통장으로 즉시 자동이체하세요.'
      },
      {
        step_or_num: 'HABIT 02',
        title: '안 쓰는 구독 서비스와 헬스장 장기 회원권 정리',
        body: '매달 자동 결제되는 OTT, 음악 스트리밍, 배달 멤버십 중 최근 2주간 쓰지 않은 서비스는 지금 당장 해지하세요.',
        tip: '월 3만원의 고정 지출을 줄이면 연간 36만원의 순저축이 늘어납니다.'
      },
      {
        step_or_num: 'HABIT 03',
        title: '목적 없는 홧김 비용(시발비용)과 택시비 통제',
        body: '스트레스를 쇼핑과 야식으로 푸는 습관을 운동이나 독서 등 무지출 해소법으로 전환하세요.',
        tip: '사고 싶은 물건이 생기면 장바구니에 넣고 72시간 뒤에 결제하세요.'
      }
    ]
  },

  // 11. 릴스 조회수 100만 후킹 카피
  '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지': {
    topic: '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
    format: 'curation',
    sub: '스크롤을 즉시 멈추게 만드는 결핍과 호기심 자극 템플릿',
    theme: 'soft_gradient',
    slides: [
      {
        step_or_num: 'HOOK 01',
        title: '부정문 후킹 - "아직도 00하고 계신가요?"',
        body: '사람들은 이익을 얻는 것보다 손해를 피하는 데 2배 더 민감합니다. "직장인 90%가 실수하는 00"처럼 결핍을 먼저 자극하세요.',
        tip: '첫 화면에 텍스트를 크게 띄우고 음성으로 강조하세요.'
      },
      {
        step_or_num: 'HOOK 02',
        title: '숫자 대비 후킹 - "월 50만원 벌던 사람이 500만원 된 비결"',
        body: 'Before & After의 극명한 대비를 구체적인 수치로 보여주면 시청자는 궁금증을 참지 못하고 끝까지 시청합니다.',
        tip: '결과물 사진이나 인증 캡처를 첫 1초에 빠르게 보여주세요.'
      },
      {
        step_or_num: 'HOOK 03',
        title: '비밀 폭로 후킹 - "선배들이 절대 안 알려주는 00 치트키"',
        body: '나만 모르고 있던 꿀팁이라는 느낌을 주어 스크롤을 멈추게 하고 저장 버튼을 누르게 만드세요.',
        tip: '영상 마지막에 "더 많은 정보는 [저장]하고 캡션에서 확인하세요" CTA를 넣으세요.'
      }
    ]
  }
};

export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const apiKey = request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || (import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

  // If no API key provided, use our exact topic registry or dynamic smart generator
  if (!apiKey || apiKey.trim() === '') {
    return generateDynamicSmartProject(request);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const userPrompt = `
[카드뉴스 생성 요청]
- 주제: "${request.topic}"
- 타깃 독자: ${request.targetAudience}
- 카드뉴스 유형: ${request.category}
- 총 슬라이드 수: ${request.slideCount}장 (표지 1장 + 본문 ${request.slideCount - 2}장 + CTA 1장)
- 브랜드/작성자 핸들: ${request.brandHandle || '@kimppungsamssi'}
- 무작위 시드: ${Date.now()}

주제 "${request.topic}"에 관해 누구나 당장 써먹을 수 있는 구체적이고 전문적인 실전 내용으로 본문 슬라이드를 채워주세요.
표지의 주제와 본문의 슬라이드 내용이 완벽하게 일치해야 합니다. (예: 주제가 자소서 프롬프트면 본문은 실제 프롬프트 문장이어야 함)
JSON 형식으로 반환하세요.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.9,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API로부터 응답을 받지 못했습니다.');
    }

    const parsedData = JSON.parse(text);
    return formatToProject(parsedData, request);
  } catch (error: any) {
    console.warn('Gemini API 호출 실패, 지능형 엔진으로 전환합니다:', error?.message || error);
    return generateDynamicSmartProject(request);
  }
}

// ── ONE-CLICK TARGET AUDIENCE GENERATION ──
export async function generateByTargetAudience(
  audience: string,
  currentTheme: ThemePresetId = 'modern_dark',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  const audienceTopicMap: Record<string, string[]> = {
    '2030 직장인': [
      '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
      '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
    ],
    '취업준비생': [
      '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
      '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식',
      '스펙이 많아야 서류를 통과한다? 취업 시장의 오해와 진실',
      '합격률 3배 올리는 서류 지원 전 최종 점검 체크리스트',
    ],
    '대학생': [
      '학점 4.5 과탑 선배가 매일 쓰는 무료 대학생 생산성 툴 5선',
    ],
    '1인 창업가 / 자영업자': [
      '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
      '소상공인·1인 기업이 꼭 챙겨야 할 숨은 정부지원금 & 절세 비법',
      '고객 재구매율을 300% 폭발시키는 카카오톡 채널 세팅 체크리스트',
    ],
    '마케터 / 크리에이터': [
      '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
    ],
    '초보 투자자': [
      '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
    ],
    '다이어터 / 헬스러': [
      '다이어트할 때 탄수화물 아예 끊으면 살 빠진다? 흔한 식단 오해 4선',
    ]
  };

  const pool = audienceTopicMap[audience] || audienceTopicMap['2030 직장인'];
  const pickedTopic = pool[Math.floor(Math.random() * pool.length)];

  const req: GenerationRequest = {
    topic: pickedTopic,
    targetAudience: audience,
    category: 'curation',
    slideCount: 5,
    theme: currentTheme,
    aspectRatio: '4:5',
    brandHandle,
    apiKey,
  };

  const project = await generateCardNews(req);
  return {
    project,
    resolvedTopic: project.topic,
    resolvedCategory: project.card_type,
    resolvedTheme: project.theme_type,
  };
}

// ── ONE-CLICK VIRAL CATEGORY GENERATION ──
export async function generateViralByQuickCategory(
  category: ViralQuickCategory,
  theme: ThemePresetId = 'modern_dark',
  aspectRatio: AspectRatio = '4:5',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory }> {
  const randomTopicItem = category.topics[Math.floor(Math.random() * category.topics.length)];
  const req: GenerationRequest = {
    topic: randomTopicItem.topic,
    targetAudience: category.target,
    category: randomTopicItem.format,
    slideCount: 5,
    theme: category.defaultTheme || theme,
    aspectRatio,
    brandHandle,
    apiKey,
  };

  const project = await generateCardNews(req);
  return {
    project,
    resolvedTopic: project.topic,
    resolvedCategory: project.card_type,
  };
}

function formatToProject(data: any, req: GenerationRequest): CardNewsProject {
  const slides: Slide[] = (data.slides || []).map((slide: any, idx: number) => ({
    id: `slide-${idx + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    page: slide.page || idx + 1,
    type: (slide.type as SlideType) || (idx === 0 ? 'cover' : idx === data.slides.length - 1 ? 'cta' : 'content'),
    tag: slide.tag || (idx === 0 ? `🔥 ${req.targetAudience} 필독` : undefined),
    main_title: slide.main_title || slide.title,
    sub_title: slide.sub_title,
    step_or_num: slide.step_or_num || (idx > 0 && idx < data.slides.length - 1 ? `0${idx}` : undefined),
    title: slide.title || slide.main_title,
    body: slide.body,
    tip: slide.tip,
    items: slide.items,
    left_label: slide.left_label,
    left_content: slide.left_content,
    right_label: slide.right_label,
    right_content: slide.right_content,
  }));

  return {
    topic: req.topic,
    target_audience: req.targetAudience,
    card_type: req.category,
    theme_type: req.theme,
    aspect_ratio: req.aspectRatio,
    brand_handle: req.brandHandle || '@kimppungsamssi',
    slide_count: slides.length,
    instagram_caption: data.instagram_caption || generateFallbackCaption(req),
    slides,
  };
}

// ── INTELLIGENT SMART ENGINE (TOPIC-ACCURATE MATCHING) ──
export function generateDynamicSmartProject(req: GenerationRequest): CardNewsProject {
  const topic = req.topic.trim();
  const total = Math.max(4, Math.min(req.slideCount || 5, 8));
  const uid = () => `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 1. Check exact topic match from registry
  const exactMatch = TOPIC_REGISTRY[topic];
  if (exactMatch) {
    const slides: Slide[] = [];
    // Cover
    slides.push({
      id: `slide-1-${uid()}`,
      page: 1,
      type: 'cover',
      tag: `🔥 ${req.targetAudience || '취업준비생'} 필독`,
      main_title: exactMatch.topic,
      sub_title: exactMatch.sub || '지금 바로 적용 가능한 실전 핵심 꿀팁 총정리',
    });

    // Body slides
    for (let i = 0; i < Math.min(total - 2, exactMatch.slides.length); i++) {
      const item = exactMatch.slides[i];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: exactMatch.format === 'checklist' ? 'checklist' : exactMatch.format === 'myth_fact' ? 'comparison' : 'content',
        step_or_num: item.step_or_num,
        title: item.title,
        body: item.body,
        tip: item.tip,
      });
    }

    // Last CTA
    slides.push({
      id: `slide-${slides.length + 1}-${uid()}`,
      page: slides.length + 1,
      type: 'cta',
      tag: 'SAVE & SHARE',
      main_title: '나중에 다시 찾아보려면?',
      sub_title: '지금 오른쪽 아래 [저장]을 누르고, 유익했다면 동료에게 [공유]해보세요! ✨',
    });

    return {
      topic: exactMatch.topic,
      target_audience: req.targetAudience,
      card_type: exactMatch.format,
      theme_type: exactMatch.theme || req.theme,
      aspect_ratio: req.aspectRatio,
      brand_handle: req.brandHandle || '@kimppungsamssi',
      slide_count: slides.length,
      instagram_caption: generateFallbackCaption({ ...req, topic: exactMatch.topic }),
      slides,
    };
  }

  // 2. Semantic matching for custom keywords
  const lower = topic.toLowerCase();
  const slides: Slide[] = [];

  slides.push({
    id: `slide-1-${uid()}`,
    page: 1,
    type: 'cover',
    tag: `🔥 ${req.targetAudience || '직장인'} 필독`,
    main_title: topic,
    sub_title: '지금 바로 적용 가능한 실전 핵심 꿀팁 총정리',
  });

  // A. 자소서 & 프롬프트 키워드
  if (lower.includes('자소서') || lower.includes('프롬프트') || lower.includes('자기소개서')) {
    const p1 = TOPIC_REGISTRY['자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지'].slides;
    for (let i = 0; i < total - 2; i++) {
      const s = p1[i % p1.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: s.step_or_num,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }
  // B. 면접 키워드
  else if (lower.includes('면접') || lower.includes('자기소개')) {
    const p2 = TOPIC_REGISTRY['면접관이 3초 만에 합격 체크하는 1분 자기소개 공식'].slides;
    for (let i = 0; i < total - 2; i++) {
      const s = p2[i % p2.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: s.step_or_num,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }
  // C. 플레이스 & 창업 마케팅
  else if (lower.includes('플레이스') || lower.includes('자영업') || lower.includes('지역')) {
    const p3 = TOPIC_REGISTRY['광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법'].slides;
    for (let i = 0; i < total - 2; i++) {
      const s = p3[i % p3.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: s.step_or_num,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }
  // D. AI & 생산성 툴
  else if (lower.includes('ai') || lower.includes('도구') || lower.includes('툴') || lower.includes('생산성')) {
    const p4 = TOPIC_REGISTRY['2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선'].slides;
    for (let i = 0; i < total - 2; i++) {
      const s = p4[i % p4.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: s.step_or_num,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }
  // E. 재테크 & 통장
  else if (lower.includes('재테크') || lower.includes('돈') || lower.includes('부업') || lower.includes('소비') || lower.includes('통장') || lower.includes('1억')) {
    const p5 = TOPIC_REGISTRY['사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지'].slides;
    for (let i = 0; i < total - 2; i++) {
      const s = p5[i % p5.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: s.step_or_num,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }
  // Fallback
  else {
    const generalSteps = [
      {
        num: '01',
        title: `1단계: ${topic.slice(0, 14)} 핵심 방향성 정의`,
        body: '가장 먼저 나에게 맞는 방향성과 실천 목표를 명확한 숫자로 정의하여 실행력을 높입니다.',
        tip: '완벽함을 추구하기보다 오늘 당장 가능한 작은 것부터 시작하세요.'
      },
      {
        num: '02',
        title: '2단계: 시간 낭비 80% 줄이는 스마트 자동화 툴 적용',
        body: '반복적인 비효율 작업을 검증된 디지털 도구와 템플릿으로 대체하여 생산성을 극대화합니다.',
        tip: '남들이 이미 검증해둔 무료 리소스와 단축키를 적극 활용하세요.'
      },
      {
        num: '03',
        title: '3단계: 일관성 있게 지속되는 루틴화 시스템 구축',
        body: '의지력에 의존하지 않고 매일 같은 시간에 자동으로 행동이 유도되는 환경과 트리거를 설계합니다.',
        tip: '매일 기록하고 점검하는 3분 회고 습관을 들이세요.'
      }
    ];

    for (let i = 0; i < total - 2; i++) {
      const s = generalSteps[i % generalSteps.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `POINT 0${i + 1}`,
        title: s.title,
        body: s.body,
        tip: s.tip,
      });
    }
  }

  // CTA
  slides.push({
    id: `slide-${slides.length + 1}-${uid()}`,
    page: slides.length + 1,
    type: 'cta',
    tag: 'SAVE & SHARE',
    main_title: '나중에 다시 찾아보려면?',
    sub_title: '지금 오른쪽 아래 [저장]을 누르고, 유익했다면 동료에게 [공유]해보세요! ✨',
  });

  return {
    topic,
    target_audience: req.targetAudience,
    card_type: req.category,
    theme_type: req.theme,
    aspect_ratio: req.aspectRatio,
    brand_handle: req.brandHandle || '@kimppungsamssi',
    slide_count: slides.length,
    instagram_caption: generateFallbackCaption(req),
    slides,
  };
}

function generateFallbackCaption(req: GenerationRequest): string {
  return `📌 "${req.topic}"

${req.targetAudience}라면 무조건 알아야 할 핵심 꿀팁을 한 장으로 정리했습니다! ⚡

바쁜 일상 속에서 매번 잊어버리기 쉽다면,
지금 바로 [저장 💾]해두고 필요할 때마다 꺼내보세요.

도움이 될 만한 친구나 동료에게 [공유 ✈️]해주시면 더욱 큰 힘이 됩니다!

──────────────────
👉 더 유익한 정보는 @${(req.brandHandle || 'kimppungsamssi').replace('@', '')} 팔로우!

#카드뉴스 #인스타카드뉴스 #${(req.targetAudience || '직장인').replace(/\s+/g, '')} #자기계발 #생산성 #노하우 #팁 #인사이트 #성장 #정보공유`;
}
