import { GoogleGenAI } from '@google/genai';
import type { CardNewsProject, GenerationRequest, Slide, SlideType, CardNewsCategory, ThemePresetId, AspectRatio } from '../types/cardnews';
import type { ViralQuickCategory } from '../constants/themes';

const SYSTEM_PROMPT = `당신은 100만 팔로워를 보유한 최상위 인스타그램 카드뉴스 전문 크리에이터이자 카피라이터입니다.
사용자가 제공하는 [주제], [타깃 독자], [카드뉴스 유형], [슬라이드 수]에 맞춰 인스타그램 피드에서 스와이프를 유발하고 저장/공유율을 극대화하는 카드뉴스를 기획하세요.

[핵심 작성 원칙 - 절대 준수]
1. 모호하거나 뻔한 일반론(예: '첫 번째 포인트', '노력을 해야 한다')은 절대 금지합니다.
2. 반드시 주제와 100% 일치하는 구체적인 실명/도구명(예: ChatGPT, Claude, Notion, Perplexity 등), 실제 수치, 정확한 노하우, 행동 지침을 슬라이드마다 명확히 작성하세요.
3. 매번 요청할 때마다 새로운 앵글과 참신하고 독창적인 세부 내용으로 다양하게 구성하세요.
4. 슬라이드 구성:
   - 표지 (Cover): 3초 만에 스크롤을 멈추게 하는 강력한 후킹 헤드라인과 타깃 태그.
   - 본문 (${3}~5장): 각 슬라이드마다 
     * 소제목(title): 명확하고 매력적인 핵심 소제목 (예: '01. Claude 3.7 - 코딩 & 긴 글 분석 1위')
     * 본문(body): 모바일 가독성에 맞춘 2~3줄의 알찬 실전 요약 설명
     * PRO TIP(tip): 바로 써먹을 수 있는 단 1줄의 실천 팁/단축키/활용법
   - CTA (마지막): '저장해두고 필요할 때 꺼내보기' 등 저장/공유 유도.
5. 인스타그램 캡션 (instagram_caption): 본문 핵심 요약 + 저장 유도 + 추천 해시태그 10~15개를 포함하여 이모지와 함께 작성.

반드시 정해진 JSON 스키마 형식만을 반환하세요.`;

// Curated high-res aesthetic Unsplash CDN images mapped by topic domain
const CURATED_IMAGE_POOLS: Record<string, string[]> = {
  ai: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80',
  ],
  finance: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1080&q=80',
  ],
  routine: [
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1080&q=80',
  ],
  marketing: [
    'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1080&q=80',
  ],
  health: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80',
  ],
  general: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1080&q=80',
  ],
};

function getTopicPool(topic: string): string[] {
  const lower = topic.toLowerCase();
  if (lower.includes('ai') || lower.includes('인공지능') || lower.includes('도구') || lower.includes('툴') || lower.includes('생산성') || lower.includes('개발') || lower.includes('코딩')) {
    return CURATED_IMAGE_POOLS.ai;
  }
  if (lower.includes('재테크') || lower.includes('돈') || lower.includes('부업') || lower.includes('1억') || lower.includes('소비') || lower.includes('통장') || lower.includes('투자')) {
    return CURATED_IMAGE_POOLS.finance;
  }
  if (lower.includes('루틴') || lower.includes('자기계발') || lower.includes('동기부여') || lower.includes('습관') || lower.includes('멘탈') || lower.includes('취업') || lower.includes('대학')) {
    return CURATED_IMAGE_POOLS.routine;
  }
  if (lower.includes('마케팅') || lower.includes('릴스') || lower.includes('인스타') || lower.includes('브랜딩') || lower.includes('창업') || lower.includes('자영업')) {
    return CURATED_IMAGE_POOLS.marketing;
  }
  if (lower.includes('수면') || lower.includes('건강') || lower.includes('다이어트') || lower.includes('운동') || lower.includes('식단') || lower.includes('스트레칭')) {
    return CURATED_IMAGE_POOLS.health;
  }
  return CURATED_IMAGE_POOLS.general;
}

// ── AUDIENCE-SPECIFIC VIRAL TOPIC & FORMAT KNOWLEDGE BASE ──
export const AUDIENCE_PRESETS: Record<string, {
  topics: { topic: string; format: CardNewsCategory; sub: string; theme: ThemePresetId }[];
}> = {
  '2030 직장인': {
    topics: [
      {
        topic: '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
        format: 'curation',
        sub: '야근 3시간 줄이고 정시 칼퇴하는 업무 치트키',
        theme: 'modern_dark'
      },
      {
        topic: '직장인 90%가 놓치고 있는 연말정산 & 통장 쪼개기 환급 비법',
        format: 'howto',
        sub: '13월의 월급 150만원 더 챙기는 실전 금융 가이드',
        theme: 'bold_accent'
      },
      {
        topic: '퇴근 후 번아웃 오기 직전 내 멘탈 상태 점검 체크리스트',
        format: 'checklist',
        sub: '3개 이상 해당되면 오늘 밤은 무조건 푹 쉬어야 합니다',
        theme: 'soft_gradient'
      },
      {
        topic: '열심히 야근할수록 승진이 늦어진다? 직장 생활의 결정적 진실',
        format: 'myth_fact',
        sub: '단순 노동 시간보다 10배 더 중요한 핵심 성과 어필법',
        theme: 'modern_dark'
      }
    ]
  },
  '취업준비생': {
    topics: [
      {
        topic: '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식',
        format: 'howto',
        sub: '뻔한 도입부 버리고 강렬하게 첫인상 각인시키는 3단계',
        theme: 'clean_minimal'
      },
      {
        topic: '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
        format: 'curation',
        sub: '경험 정리부터 기업 인재상 맞춤 문장 수정까지 원클릭 완성',
        theme: 'modern_dark'
      },
      {
        topic: '합격률 3배 올리는 서류 지원 전 최종 점검 체크리스트',
        format: 'checklist',
        sub: '오탈자 확인부터 직무 키워드 매칭까지 필수 5단계',
        theme: 'bold_accent'
      },
      {
        topic: '스펙이 많아야 서류를 통과한다? 취업 시장의 오해와 진실',
        format: 'myth_fact',
        sub: '나열식 자격증보다 단 1개의 직무 프로젝트가 강력한 이유',
        theme: 'neon_cyber'
      }
    ]
  },
  '1인 창업가 / 자영업자': {
    topics: [
      {
        topic: '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
        format: 'howto',
        sub: '상위 노출 알고리즘과 고객 리뷰 유도 치트키 4가지',
        theme: 'bold_accent'
      },
      {
        topic: '소상공인·1인 기업이 꼭 챙겨야 할 숨은 정부지원금 & 절세 비법',
        format: 'curation',
        sub: '몰라서 못 받는 연간 최대 2,000만원 지원 혜택 총정리',
        theme: 'modern_dark'
      },
      {
        topic: '고객 재구매율을 300% 폭발시키는 카카오톡 채널 세팅 체크리스트',
        format: 'checklist',
        sub: '한 번 온 손님을 평생 단골로 만드는 자동 메시지 시스템',
        theme: 'soft_gradient'
      }
    ]
  },
  '대학생': {
    topics: [
      {
        topic: '학점 4.5 과탑 선배가 매일 쓰는 무료 대학생 생산성 툴 5선',
        format: 'curation',
        sub: '논문 리서치부터 팀플 PPT까지 10분 컷 끝내는 비법',
        theme: 'neon_cyber'
      },
      {
        topic: '용돈 50만원으로 시작하는 첫 1,000만원 모으기 통장 관리 루틴',
        format: 'howto',
        sub: '알바비 들어오면 당일 실행해야 할 3통장 분리법',
        theme: 'pastel_editorial'
      },
      {
        topic: '시험 전날 벼락치기로 A+ 받는 뽀모도로 초집중 공부법',
        format: 'checklist',
        sub: '단기 기억을 장기 기억으로 바꾸는 뇌 과학 암기 루틴',
        theme: 'clean_minimal'
      }
    ]
  },
  '디자이너 / 개발자': {
    topics: [
      {
        topic: '2026년 시니어 개발자 & 디자이너가 매일 쓰는 필수 AI 도구 모음',
        format: 'curation',
        sub: 'Cursor AI, v0, Midjourney로 작업 속도 5배 끌어올리기',
        theme: 'neon_cyber'
      },
      {
        topic: '이직 제안 쏟아지는 노션 & 깃허브 포트폴리오 3단계 구조',
        format: 'howto',
        sub: '문제 해결 과정과 수치 기반 성과를 극대화하는 템플릿',
        theme: 'modern_dark'
      },
      {
        topic: '개발 실력보다 소통 능력이 연봉을 결정한다? 테크 업계의 진실',
        format: 'myth_fact',
        sub: '코드만 잘 짜는 사람 vs 비즈니스 문제를 해결하는 엔지니어',
        theme: 'bold_accent'
      }
    ]
  },
  '마케터 / 크리에이터': {
    topics: [
      {
        topic: '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
        format: 'curation',
        sub: '스크롤을 즉시 멈추게 만드는 결핍과 호기심 자극 템플릿',
        theme: 'soft_gradient'
      },
      {
        topic: '팔로워 1,000명으로 월 200만원 수익화하는 인스타 브랜딩 로드맵',
        format: 'howto',
        sub: '전자책, 공동구매, 1:1 컨설팅 파이프라인 자동화',
        theme: 'bold_accent'
      },
      {
        topic: '매일 피드 1개씩 안 올리면 계정이 죽는다? 인스타 알고리즘 팩트',
        format: 'myth_fact',
        sub: '게시물 양보다 저장/공유율이 도달수를 지배하는 원리',
        theme: 'modern_dark'
      }
    ]
  },
  '초보 투자자': {
    topics: [
      {
        topic: '사회초년생이 월 30만원으로 시작하는 미국 배당 ETF 적립식 투자',
        format: 'howto',
        sub: '복리 효과로 10년 뒤 월세 받는 시스템 만들기',
        theme: 'bold_accent'
      },
      {
        topic: '주식 시작 전 무조건 개설해야 하는 비과세 절세 계좌 3총사',
        format: 'curation',
        sub: 'ISA 계좌, 연금저축펀드, IRP 완벽 비교 정리',
        theme: 'modern_dark'
      },
      {
        topic: '차트 분석을 잘해야 주식으로 돈을 번다? 초보 투자자의 치명적 오해',
        format: 'myth_fact',
        sub: '단타 매매보다 장기 우상향 지수 투자가 10배 안전한 이유',
        theme: 'clean_minimal'
      }
    ]
  },
  '다이어터 / 헬스러': {
    topics: [
      {
        topic: '굶지 않고 체지방만 3kg 쏙 빼는 직장인 외식 식단 가이드',
        format: 'curation',
        sub: '편의점, 서브웨이, 구내식당에서 살 안 찌는 조합 4가지',
        theme: 'pastel_editorial'
      },
      {
        topic: '하루 종일 앉아있는 사람을 위한 거북목 & 라운드숄더 5분 탈출 루틴',
        format: 'howto',
        sub: '의자에 앉은 채로 따라만 하면 바로 등이 펴지는 스트레칭',
        theme: 'clean_minimal'
      },
      {
        topic: '유산소 운동만 1시간 해야 살이 빠진다? 다이어트 상식의 진실',
        format: 'myth_fact',
        sub: '근력 운동과 기초대사량이 요요를 막는 유일한 열쇠인 이유',
        theme: 'neon_cyber'
      }
    ]
  }
};

export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const apiKey = request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || (import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

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

주제 "${request.topic}"에 관해 누구나 당장 써먹을 수 있는 구체적이고 전문적인 실전 내용으로 본문 슬라이드를 채워주세요. (구체적 도구명, 실제 수치, 명확한 방법론 필수)
이전에 생성된 내용과 겹치지 않게 참신하고 흥미로운 새로운 앵글로 작성하세요.
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
    console.warn('Gemini API 호출 실패, 스마트 지능형 엔진으로 전환합니다:', error?.message || error);
    return generateDynamicSmartProject(request);
  }
}

// ── ONE-CLICK AUDIENCE TARGET GENERATION ──
export async function generateByTargetAudience(
  audience: string,
  currentTheme: ThemePresetId = 'modern_dark',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  const preset = AUDIENCE_PRESETS[audience];
  const topicPool = preset ? preset.topics : AUDIENCE_PRESETS['2030 직장인'].topics;
  const picked = topicPool[Math.floor(Math.random() * topicPool.length)];

  const req: GenerationRequest = {
    topic: picked.topic,
    targetAudience: audience,
    category: picked.format,
    slideCount: 5,
    theme: picked.theme || currentTheme,
    aspectRatio: '4:5',
    brandHandle,
    apiKey,
  };

  const project = await generateCardNews(req);
  return {
    project,
    resolvedTopic: picked.topic,
    resolvedCategory: picked.format,
    resolvedTheme: picked.theme || currentTheme,
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
  const key = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || (import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

  if (!key || key.trim() === '') {
    const randomTopicItem = category.topics[Math.floor(Math.random() * category.topics.length)];
    const req: GenerationRequest = {
      topic: randomTopicItem.topic,
      targetAudience: category.target,
      category: randomTopicItem.format,
      slideCount: 5,
      theme,
      aspectRatio,
      brandHandle,
    };
    const smartProject = generateDynamicSmartProject(req);
    return {
      project: smartProject,
      resolvedTopic: randomTopicItem.topic,
      resolvedCategory: randomTopicItem.format,
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const userPrompt = `
[역할]
너는 100만 팔로워를 보유한 인스타그램 지식/정보성 계정의 전문 에디터다.

[요청]
사용자가 선택한 카테고리는 "${category.name}" (${category.target})이다.
1. 이 카테고리에서 최근 가장 조회수/저장수가 높고 사람들이 흥미로워할 구체적인 주제 하나를 스스로 기획하라.
2. 가장 적합한 카드뉴스 포맷(curation, howto, checklist, myth_fact 중 1개)을 자동 선정하라.
3. 총 5장의 슬라이드(표지 1장 + 본문 3장 + CTA 1장)와 인스타그램 본문 캡션을 작성하라. (구체적 실명, 실제 수치, 꿀팁 필수)

반드시 JSON 포맷으로 "topic", "category", "instagram_caption", "slides" 를 포함하여 반환하라.`;

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
      throw new Error('Gemini 응답 텍스트 없음');
    }

    const parsed = JSON.parse(text);
    const resolvedTopic = parsed.topic || `${category.name} 핵심 꿀팁`;
    const resolvedCat = (parsed.category as CardNewsCategory) || category.defaultFormat;

    const req: GenerationRequest = {
      topic: resolvedTopic,
      targetAudience: category.target,
      category: resolvedCat,
      slideCount: 5,
      theme,
      aspectRatio,
      brandHandle,
      apiKey: key,
    };

    const project = formatToProject(parsed, req);
    return {
      project,
      resolvedTopic,
      resolvedCategory: resolvedCat,
    };
  } catch (error) {
    console.warn('Gemini Quick Auto Gen 실패, 스마트 지능형 엔진으로 전환합니다:', error);
    const randomTopicItem = category.topics[Math.floor(Math.random() * category.topics.length)];
    const req: GenerationRequest = {
      topic: randomTopicItem.topic,
      targetAudience: category.target,
      category: randomTopicItem.format,
      slideCount: 5,
      theme,
      aspectRatio,
      brandHandle,
    };
    const smartProject = generateDynamicSmartProject(req);
    return {
      project: smartProject,
      resolvedTopic: randomTopicItem.topic,
      resolvedCategory: randomTopicItem.format,
    };
  }
}

function formatToProject(data: any, req: GenerationRequest): CardNewsProject {
  const pool = getTopicPool(req.topic);
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
    image_url: pool[idx % pool.length],
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

// ── COMPREHENSIVE DYNAMIC SMART CONTENT ENGINE WITH EXTENSIVE PERMUTATIONS ──
export function generateDynamicSmartProject(req: GenerationRequest): CardNewsProject {
  const topic = req.topic.trim();
  const total = Math.max(4, Math.min(req.slideCount || 5, 8));
  const slides: Slide[] = [];
  const pool = getTopicPool(topic);
  const uid = () => `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 1. Cover Slide
  slides.push({
    id: `slide-1-${uid()}`,
    page: 1,
    type: 'cover',
    tag: `🔥 ${req.targetAudience || '직장인'} 필독`,
    main_title: topic || '2026년 일잘러가 몰래 쓰는 무료 AI 도구 5선',
    sub_title: `지금 바로 적용 가능한 실전 핵심 꿀팁 총정리`,
    image_url: pool[0],
  });

  const lower = topic.toLowerCase();

  // A. AI & Tech Tools (32 Curated Real Tools & Tips with Random Variation)
  if (lower.includes('ai') || lower.includes('인공지능') || lower.includes('도구') || lower.includes('툴') || lower.includes('생산성') || lower.includes('개발') || lower.includes('코딩')) {
    const aiPool = [
      {
        num: '01',
        title: 'Claude 3.7 Sonnet - 복잡한 보고서 분석 & 코딩 종결자',
        body: '기존 AI보다 한국어 문맥 이해력과 논리적 추론 능력이 압도적입니다. 긴 PDF 보고서 요약 및 기획서 초안 작성에 가장 뛰어납니다.',
        tip: '프롬프트에 "핵심 결론부터 3줄 요약해줘"라고 입력하면 10배 깔끔해집니다.'
      },
      {
        num: '02',
        title: 'Perplexity AI - 실시간 출처 기반 검색 리서치',
        body: '구글 검색 10번 돌릴 시간에 질문 하나로 최신 논문, 뉴스, 블로그 출처를 실시간 링크와 함께 일목요연하게 브리핑해 줍니다.',
        tip: 'Focus 옵션에서 "Academic"이나 "Writing"을 선택하면 신뢰도가 대폭 상승합니다.'
      },
      {
        num: '03',
        title: 'Gamma App - 1분 만에 PPT 발표자료 & 웹페이지 완성',
        body: '텍스트 주제만 한 줄 넣으면 디자인 레이아웃, 이미지, 텍스트 배치가 완벽한 고퀄리티 슬라이드 덱을 자동으로 찍어냅니다.',
        tip: '완성 후 파워포인트(.pptx)나 PDF로 원클릭 내보내기가 가능합니다.'
      },
      {
        num: '04',
        title: 'v0.dev / Bolt.new - 자연어로 웹앱 화면 즉시 빌드',
        body: '원하는 웹/앱 화면을 설명하면 실제 구동 가능한 프론트엔드 코드와 반응형 UI를 10초 만에 렌더링해 줍니다.',
        tip: '기획 초기 단계에서 프로토타입을 빠르게 검증할 때 치트키로 쓰세요.'
      },
      {
        num: '05',
        title: 'Notion AI & Q&A - 사내 문서 및 개인 지식베이스 자동 검색',
        body: '흩어져 있는 모든 회의록, 업무 매뉴얼, 프로젝트 문서를 자연어로 질문하면 1초 만에 찾아 요약해 줍니다.',
        tip: '회의록 템플릿에 AI 요약 블록을 추가해 두면 자동 회의록이 완성됩니다.'
      },
      {
        num: '06',
        title: 'ElevenLabs - 인간과 구분 불가능한 초고음질 AI 보이스 더빙',
        body: '릴스나 쇼츠, 팟캐스트 제작 시 텍스트만 넣으면 전문 성우 톤의 목소리를 1초 만에 생성해 줍니다.',
        tip: '음성 감정 톤 슬라이더를 65% 정도로 맞추면 가장 자연스럽습니다.'
      },
      {
        num: '07',
        title: 'DeepSeek-R1 - 오픈소스 최강의 수학·논리 추론 AI',
        body: '복잡한 비즈니스 계산, 알고리즘 분석, 논리적 반박 근거 작성을 놀라운 정확도로 무료로 수행합니다.',
        tip: '생각 과정(Thinking Process)을 함께 확인하며 결과의 타당성을 검증하세요.'
      }
    ];

    // Shuffle pool for fresh dynamic generation on every click
    const shuffled = [...aiPool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < total - 2; i++) {
      const tool = shuffled[i % shuffled.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `AI TOOL 0${i + 1}`,
        title: tool.title,
        body: tool.body,
        tip: tool.tip,
        image_url: pool[(i + 1) % pool.length],
      });
    }
  }
  // B. Money / Wealth / Finance
  else if (lower.includes('재테크') || lower.includes('돈') || lower.includes('부업') || lower.includes('1억') || lower.includes('소비') || lower.includes('절세') || lower.includes('통장') || lower.includes('투자')) {
    const financePool = [
      {
        title: '통장 4개 쪼개기 - 자동 저축 시스템 구축',
        body: '급여통장, 생활비통장, 비상금통장, 투자통장으로 분리하세요. 월급날 생활비를 제외한 전액을 즉시 강제 저축하는 구조가 기본입니다.',
        tip: '비상금 통장에는 최소 3개월 치 생활비를 파킹통장(연 3~4%)에 보관하세요.'
      },
      {
        title: '신용카드 없애고 체크카드 한도 설정하기',
        body: '신용카드의 후불 결제는 착시 효과를 주어 과소비를 유발합니다. 한 달 예산을 정해둔 체크카드만 사용하는 습관이 1년 500만원을 아낍니다.',
        tip: '할부 결제는 내 미래의 소득을 미리 저당잡히는 것과 같습니다.'
      },
      {
        title: 'ISA & 연말정산 IRP 세액공제 한도 채우기',
        body: '매년 최대 16.5% 세액공제를 받을 수 있는 연금저축/IRP와 비과세 혜택의 ISA 계좌를 우선 활용해 절세 수익률을 챙기세요.',
        tip: '사회초년생일수록 복리 효과와 절세 계좌의 혜택이 극대화됩니다.'
      },
      {
        title: '월 50만원 패시브 인컴 디지털 부업 파이프라인',
        body: '내 전문 지식을 전자책, 노션 템플릿, 뉴스레터 등으로 한 번 제작하여 자는 동안에도 팔리는 자동화 수익 구조를 만드세요.',
        tip: '완벽하게 만들려 하지 말고 최소 기능 상품(MVP)으로 먼저 수요를 검증하세요.'
      },
      {
        title: '미국 지수 ETF(S&P500, QQQ) 분할 매수 루틴',
        body: '개별 종목의 변동성에 흔들리지 않고 미국 대표 지수 ETF를 매월 정해진 날짜에 기계처럼 적립식 매수하는 것이 승률 1위입니다.',
        tip: '주가가 떨어지는 날을 세일 기간으로 생각하고 꾸준히 모아가세요.'
      }
    ];

    const shuffled = [...financePool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < total - 2; i++) {
      const p = shuffled[i % shuffled.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `MONEY 0${i + 1}`,
        title: p.title,
        body: p.body,
        tip: p.tip,
        image_url: pool[(i + 1) % pool.length],
      });
    }
  }
  // C. Self Growth & Morning Routine & Mindset & College
  else if (lower.includes('루틴') || lower.includes('자기계발') || lower.includes('동기부여') || lower.includes('성공') || lower.includes('습관') || lower.includes('멘탈') || lower.includes('취업') || lower.includes('자소서') || lower.includes('면접')) {
    const routinePool = [
      {
        title: '기상 직후 10분 - 스마트폰 보지 않고 미온수 한 잔',
        body: '일어나자마자 SNS와 뉴스를 보면 뇌가 도파민에 지배당해 하루 종일 산만해집니다. 물 한 잔과 가벼운 스트레칭으로 뇌를 깨우세요.',
        tip: '스마트폰 충전기를 침대에서 2미터 이상 떨어진 곳에 두세요.'
      },
      {
        title: '골든 아워 30분 - 하루 가장 중요한 1가지(One Thing) 몰입',
        body: '이메일 확인이나 잔업에 에너지를 쓰지 말고, 오늘 나의 성과를 좌우할 단 1가지 핵심 과제를 오전 집중 시간에 먼저 끝내세요.',
        tip: '이 1가지만 끝내도 오늘 하루는 이미 성공한 하루가 됩니다.'
      },
      {
        title: '뽀모도로 25분 집중 + 5분 휴식 리듬',
        body: '장시간 무리하게 일하면 피로가 누적되어 오후에 멍해집니다. 25분 완전 몰입 후 5분은 반드시 모니터를 끄고 쉬는 리듬을 지키세요.',
        tip: '집중 시간에는 모든 메신저 알림을 방해금지 모드로 전환하세요.'
      },
      {
        title: '취침 전 5분 회고 - 내일의 우선순위 3가지 적기',
        body: '내일 아침 일어났을 때 "무엇부터 해야 하지?" 고민하지 않도록 전날 밤 3가지 할 일을 메모해두면 아침 스타트가 빨라집니다.',
        tip: '잘한 점 1가지와 감사한 일 1가지를 함께 적으면 멘탈이 단단해집니다.'
      },
      {
        title: '감정 일기 쓰기 - 불안과 스트레스 객관화하기',
        body: '머릿속에 떠도는 모호한 걱정을 노트에 글로 적으면 뇌가 이를 문제로 인식하고 해결책을 찾기 시작합니다.',
        tip: '"내가 통제할 수 있는 것"과 "통제할 수 없는 것"을 분리해서 적으세요.'
      }
    ];

    const shuffled = [...routinePool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < total - 2; i++) {
      const p = shuffled[i % shuffled.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `ROUTINE 0${i + 1}`,
        title: p.title,
        body: p.body,
        tip: p.tip,
        image_url: pool[(i + 1) % pool.length],
      });
    }
  }
  // D. Marketing & Instagram Reels & Branding & Solo Business
  else if (lower.includes('마케팅') || lower.includes('릴스') || lower.includes('인스타') || lower.includes('브랜딩') || lower.includes('조회수') || lower.includes('창업') || lower.includes('자영업') || lower.includes('고객')) {
    const marketingPool = [
      {
        title: '3초 후킹 공식 - 첫 화면에 결핍과 호기심 자극',
        body: '사용자는 1초 만에 스크롤할지 결정합니다. "오늘 날씨 좋네요" 같은 도입부는 버리고 "직장인 90%가 실수하는 00"처럼 강렬하게 시작하세요.',
        tip: '질문형이나 반전형 문장이 스크롤을 멈추게 하는 가장 확실한 장치입니다.'
      },
      {
        title: '저장 유발형 콘텐츠 - "나중에 다시 보고 싶은 정보" 만들기',
        body: '단순 재미는 좋아요만 누르고 지나치지만, 체크리스트, 단축키 모음, 사이트 추천 등은 저장율이 폭발하여 인스타 알고리즘이 떡상시킵니다.',
        tip: '마지막 슬라이드에 반드시 "나중에 다시 보려면 [저장]" CTA를 넣으세요.'
      },
      {
        title: '텍스트 밀도 낮추기 - 한 화면에 핵심 1개만',
        body: '한 장에 너무 많은 글자가 들어가면 모바일에서 피로감을 줍니다. 여백을 충분히 주고 볼드체와 하이라이트로 시선을 유도하세요.',
        tip: '글자 크기는 최소 24px 이상 유지하여 가독성을 확보하세요.'
      },
      {
        title: '댓글 참여 유도 - 논쟁거리나 선택지 제시',
        body: '"여러분은 A와 B 중 어떤 걸 더 선호하시나요?"처럼 댓글을 쓰기 쉬운 닫힌 질문을 던지면 피드 체류 시간과 도달률이 급증합니다.',
        tip: '작성된 댓글에는 1시간 이내에 답글을 달아 인게이지먼트를 끌어올리세요.'
      }
    ];

    const shuffled = [...marketingPool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < total - 2; i++) {
      const p = shuffled[i % shuffled.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `SECRET 0${i + 1}`,
        title: p.title,
        body: p.body,
        tip: p.tip,
        image_url: pool[(i + 1) % pool.length],
      });
    }
  }
  // E. Health & Lifestyle
  else {
    const generalPool = [
      {
        title: `1단계: ${topic.slice(0, 14)} 핵심 원리 이해하기`,
        body: '대부분은 무작정 시작했다가 중간에 포기합니다. 가장 먼저 전체적인 구조와 나에게 맞는 방향성을 명확히 정의하세요.',
        tip: '복잡하게 생각하지 말고 오늘 당장 실행할 수 있는 작은 것부터 시작하세요.'
      },
      {
        title: '2단계: 시간 낭비 80% 줄여주는 실전 툴 도입',
        body: '수작업으로 하던 비효율적인 방식을 스마트 자동화 도구와 검증된 템플릿으로 대체하여 생산성을 극대화합니다.',
        tip: '남들이 이미 만들어둔 무료 리소스와 치트키를 적극 활용하세요.'
      },
      {
        title: '3단계: 일관성 있게 지속되는 루틴화 시스템',
        body: '의지력에 의존하지 않고 매일 같은 시간에 자연스럽게 몸이 반응하는 환경과 트리거 장치를 마련하세요.',
        tip: '습관이 자리잡을 때까지 21일 동안 매일 체크리스트를 기록하세요.'
      },
      {
        title: '4단계: 피드백 루프와 데이터 기반 최적화',
        body: '매주 한 번 실행 결과를 측정하고 불필요한 단계를 제거하여 나만의 최적화된 프로세스를 완성합니다.',
        tip: '작은 성공 경험을 기록해 두면 지속하는 동기부여가 됩니다.'
      }
    ];

    const shuffled = [...generalPool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < total - 2; i++) {
      const p = shuffled[i % shuffled.length];
      slides.push({
        id: `slide-${i + 2}-${uid()}`,
        page: i + 2,
        type: 'content',
        step_or_num: `POINT 0${i + 1}`,
        title: p.title,
        body: p.body,
        tip: p.tip,
        image_url: pool[(i + 1) % pool.length],
      });
    }
  }

  // Last CTA Slide
  slides.push({
    id: `slide-${total}-${uid()}`,
    page: total,
    type: 'cta',
    tag: 'SAVE & SHARE',
    main_title: '나중에 다시 찾아보려면?',
    sub_title: '지금 오른쪽 아래 [저장]을 누르고, 유익했다면 동료에게 [공유]해보세요! ✨',
    image_url: pool[pool.length - 1],
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
