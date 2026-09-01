import { GoogleGenAI } from '@google/genai';
import type { CardNewsProject, GenerationRequest, Slide, SlideType, CardNewsCategory, ThemePresetId, AspectRatio } from '../types/cardnews';
import type { ViralQuickCategory } from '../constants/themes';

const SYSTEM_PROMPT = `당신은 100만 팔로워를 보유한 최상위 인스타그램 카드뉴스 전문 크리에이터이자 카피라이터입니다.
사용자가 제공하는 [주제], [타깃 독자], [카드뉴스 유형], [슬라이드 수]에 맞춰 인스타그램 피드에서 스와이프를 유발하고 저장/공유율을 극대화하는 카드뉴스를 기획하세요.

[핵심 작성 원칙 - 절대 준수]
1. 모호하거나 뻔한 일반론(예: '첫 번째 포인트', '노력을 해야 한다')은 절대 금지합니다.
2. 반드시 표지 제목과 100% 일치하는 구체적인 실명/도구명(예: ChatGPT, Claude, Notion, Perplexity 등), 실제 수치, 정확한 노하우, 행동 지침을 슬라이드마다 명확히 작성하세요.
3. 매번 요청할 때마다 새로운 앵글과 참신하고 독창적인 세부 내용으로 다양하게 구성하세요.
4. 슬라이드 구성:
   - 표지 (Cover): 3초 만에 스크롤을 멈추게 하는 강력한 후킹 헤드라인과 타깃 태그.
   - 본문: 각 슬라이드마다 
     * 소제목(title): 명확하고 매력적인 핵심 소제목 (예: '01. Claude 3.7 - 코딩 & 긴 글 분석 1위')
     * 본문(body): 모바일 가독성에 맞춘 2~3줄의 알찬 실전 요약 설명
     * PRO TIP(tip): 바로 써먹을 수 있는 단 1줄의 실천 팁/단축키/활용법
   - CTA (마지막): '저장해두고 필요할 때 꺼내보기' 등 저장/공유 유도.
5. 인스타그램 캡션 (instagram_caption): 본문 핵심 요약 + 저장 유도 + 추천 해시태그 10~15개를 포함하여 이모지와 함께 작성.

반드시 정해진 JSON 스키마 형식만을 반환하세요.`;

// Test API Key Validity
export async function testGeminiApiKey(apiKey: string): Promise<{ success: boolean; modelName?: string; error?: string }> {
  if (!apiKey || apiKey.trim() === '') {
    return { success: false, error: 'API 키가 입력되지 않았습니다.' };
  }

  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: 'Ping test. Reply with "OK".',
      });
      if (response.text) {
        return { success: true, modelName: model };
      }
    } catch (err: any) {
      console.warn(`Model ${model} test failed:`, err?.message);
    }
  }

  return { success: false, error: '유효하지 않은 API 키이거나 할당량이 초과되었습니다.' };
}

export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const apiKey = request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || (import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

  // If API key is available, attempt real-time Gemini generation with model fallbacks
  if (apiKey && apiKey.trim() !== '') {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    const userPrompt = `
[카드뉴스 생성 요청]
- 주제: "${request.topic}"
- 타깃 독자: ${request.targetAudience}
- 카드뉴스 유형: ${request.category}
- 총 슬라이드 수: ${request.slideCount}장 (표지 1장 + 본문 ${request.slideCount - 2}장 + CTA 1장)
- 브랜드 핸들: ${request.brandHandle || '@kimppungsamssi'}
- 무작위 난수 시드: ${Date.now()}-${Math.random()}

매번 누를 때마다 이전과 다른 신선한 앵글과 참신한 꿀팁/도구로 본문을 채워주세요.
표지의 주제와 본문의 슬라이드 내용이 완벽하게 100% 일치해야 합니다.
반드시 유효한 JSON 형식으로 반환하세요.`;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            temperature: 1.0,
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return formatToProject(parsed, request);
        }
      } catch (err: any) {
        console.warn(`Gemini API [${model}] failed:`, err?.message);
      }
    }

    console.warn('모든 Gemini 모델 호출 실패, 다이내믹 내장 스마트 엔진으로 생성합니다.');
  }

  // Fallback to our dynamic variation engine
  return generateDynamicSmartProject(request);
}

// ── EXPANDED KNOWLEDGE BASE WITH DYNAMIC VARIATION POOLS ──
const DYNAMIC_POOLS: Record<string, {
  titles: string[];
  subtitles: string[];
  pool: Array<{ step_or_num?: string; title: string; body: string; tip: string }>;
}> = {
  job: {
    titles: [
      '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
      '서류 광탈 막아주는 챗GPT 자기소개서 첨삭 치트키 모음',
      '합격률 3배 폭발시키는 챗GPT STAR 기법 자소서 프롬프트',
    ],
    subtitles: [
      '경험 정리부터 기업 인재상 매칭까지 10분 만에 끝내는 비법',
      '인사담당자가 무조건 서류 통과시키는 실전 문장 공식',
    ],
    pool: [
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
      },
      {
        step_or_num: 'PROMPT 05',
        title: '지원동기 & 직무 역량 차별화 프롬프트',
        body: '"수많은 지원자 중 왜 내가 이 직무에 적임자인지 증명하는 강렬한 3줄 어필 문장을 작성해줘."',
        tip: '회사의 최근 신제품/보도자료 키워드를 1개 이상 인용하세요.'
      },
      {
        step_or_num: 'PROMPT 06',
        title: '예상 면접 꼬리질문 5가지 시뮬레이션',
        body: '"내가 작성한 자소서 내용을 바탕으로 면접관이 날카롭게 파고들 만한 압박 꼬리질문 5개와 모범 답변을 뽑아줘."',
        tip: '면접 전 꼬리질문 답변을 1분 스피치로 녹음하며 연습하세요.'
      }
    ]
  },
  ai: {
    titles: [
      '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
      '야근 3시간 줄여주는 최신 AI 업무 자동화 툴 모음',
      '업무 효율을 10배 끌어올리는 필수 AI 꿀템 총정리',
    ],
    subtitles: [
      '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음',
      '기획서, 리서치, 코딩, 발표자료 1분 컷 끝내는 비법',
    ],
    pool: [
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
      },
      {
        step_or_num: 'AI TOOL 04',
        title: 'v0.dev - 프롬프트 한 줄로 프론트엔드 UI 화면 구현',
        body: '원하는 웹/앱 디자인을 설명하면 Next.js 및 Tailwind 코드로 인터랙티브한 UI 컴포넌트를 즉시 빌드해 줍니다.',
        tip: '디자이너와 협업할 때 프로토타입을 5분 만에 시각화할 수 있습니다.'
      },
      {
        step_or_num: 'AI TOOL 05',
        title: 'ElevenLabs - 초현실적인 AI 보이스 & 숏폼 더빙',
        body: '텍스트를 입력하면 감정이 담긴 자연스러운 아나운서/성우 음성으로 변환하여 릴스, 유튜브 쇼츠 나레이션을 완성합니다.',
        tip: '한국어 음성 생성 시 속도를 1.1배로 올리면 유튜브 쇼츠에 딱 맞습니다.'
      },
      {
        step_or_num: 'AI TOOL 06',
        title: 'Notion AI - 회의록 자동 요약 & 할 일(Action Item) 추출',
        body: '어지럽게 적어둔 회의 메모를 깔끔한 불릿 포인트와 담당자별 액션 아이템 표로 자동 변환해 줍니다.',
        tip: '회의 직후 단축키 Space를 눌러 즉시 요약본을 생성하세요.'
      }
    ]
  },
  finance: {
    titles: [
      '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
      '월급 250만원으로 1년 만에 3,000만원 모으는 통장 관리법',
      '돈이 줄줄 새는 사람들의 공통적인 5가지 무의식 소비',
    ],
    subtitles: [
      '통장 쪼개기와 자동 저축으로 종잣돈을 만드는 실전 재테크',
      '지출 50% 줄이고 자산을 불리는 머니 시스템 구축',
    ],
    pool: [
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
      },
      {
        step_or_num: 'HABIT 04',
        title: '급여 통장 / 생활비 통장 / 비상금 4통장 분리 시스템',
        body: '통장이 하나면 잔고가 여유롭다고 착각해 과소비하게 됩니다. 고정비, 변동비, 파킹통장을 명확히 분리하세요.',
        tip: '비상금 통장에는 최소 월급의 3배 금액을 파킹통장에 예치하세요.'
      },
      {
        step_or_num: 'HABIT 05',
        title: '미국 배당 ETF & S&P500 적립식 분할 매수',
        body: '주가 예측에 신경 쓰지 말고 매달 월급날 정해진 금액으로 우량 지수 ETF를 기계적으로 사 모으세요.',
        tip: '10년간 복리 효과가 누적되면 원금의 2~3배로 불어납니다.'
      }
    ]
  },
  marketing: {
    titles: [
      '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
      '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
      '고객 재구매율을 300% 폭발시키는 단골 마케팅 시스템',
    ],
    subtitles: [
      '스크롤을 즉시 멈추게 만드는 결핍과 호기심 자극 템플릿',
      '상위 노출 알고리즘과 고객 리뷰 유도 치트키 총정리',
    ],
    pool: [
      {
        step_or_num: 'STRATEGY 01',
        title: '부정문 후킹 - "아직도 00하고 계신가요?"',
        body: '사람들은 이익을 얻는 것보다 손해를 피하는 데 2배 더 민감합니다. "직장인 90%가 실수하는 00"처럼 결핍을 먼저 자극하세요.',
        tip: '첫 화면에 텍스트를 크게 띄우고 음성으로 강조하세요.'
      },
      {
        step_or_num: 'STRATEGY 02',
        title: '숫자 대비 후킹 - "월 50만원 벌던 사람이 500만원 된 비결"',
        body: 'Before & After의 극명한 대비를 구체적인 수치로 보여주면 시청자는 궁금증을 참지 못하고 끝까지 시청합니다.',
        tip: '결과물 사진이나 인증 캡처를 첫 1초에 빠르게 보여주세요.'
      },
      {
        step_or_num: 'STRATEGY 03',
        title: '영수증 리뷰 유도 트리거 시스템',
        body: '"리뷰 써주세요"라고 부탁만 하지 말고, 테이블마다 QR 코드를 두고 "포토리뷰 시 시그니처 음료 무료"처럼 즉각적인 보상을 설계하세요.',
        tip: '키워드가 포함된 정성스러운 포토리뷰가 쌓일수록 플레이스 순위가 급등합니다.'
      },
      {
        step_or_num: 'STRATEGY 04',
        title: '댓글 참여 유도 닫힌 질문 기법',
        body: '"여러분은 1번인가요 2번인가요? 댓글로 알려주세요"처럼 누구나 1초 만에 답할 수 있는 쉬운 질문으로 참여를 유도하세요.',
        tip: '댓글이 30개 이상 달리면 인스타 알고리즘이 추천 피드로 밀어줍니다.'
      }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── ONE-CLICK TARGET AUDIENCE GENERATION ──
export async function generateByTargetAudience(
  audience: string,
  currentTheme: ThemePresetId = 'modern_dark',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  let poolKey = 'job';
  if (audience.includes('직장인') || audience.includes('디자이너') || audience.includes('개발자')) poolKey = 'ai';
  else if (audience.includes('투자자') || audience.includes('창업가') || audience.includes('자영업자')) poolKey = 'finance';
  else if (audience.includes('마케터') || audience.includes('크리에이터')) poolKey = 'marketing';
  else if (audience.includes('취업') || audience.includes('대학생')) poolKey = 'job';

  const categoryData = DYNAMIC_POOLS[poolKey] || DYNAMIC_POOLS.job;
  const pickedTopic = categoryData.titles[Math.floor(Math.random() * categoryData.titles.length)];

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
    tag: slide.tag || (idx === 0 ? `🔥 ${req.targetAudience} 필독` : `💡 실전 꿀팁 0${idx}`),
    main_title: slide.main_title || slide.title,
    sub_title: slide.sub_title,
    step_or_num: slide.step_or_num || (idx > 0 && idx < data.slides.length - 1 ? `POINT 0${idx}` : undefined),
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

// ── INTELLIGENT SMART ENGINE (DYNAMIC RANDOM SHUFFLE ON EVERY CLICK) ──
export function generateDynamicSmartProject(req: GenerationRequest): CardNewsProject {
  const topic = req.topic.trim();
  const total = Math.max(4, Math.min(req.slideCount || 5, 8));
  const uid = () => `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const lower = topic.toLowerCase();

  let selectedPoolKey = 'ai';
  if (lower.includes('자소서') || lower.includes('면접') || lower.includes('취업') || lower.includes('프롬프트') || lower.includes('스펙') || lower.includes('대학')) {
    selectedPoolKey = 'job';
  } else if (lower.includes('재테크') || lower.includes('돈') || lower.includes('부업') || lower.includes('소비') || lower.includes('통장') || lower.includes('1억') || lower.includes('투자')) {
    selectedPoolKey = 'finance';
  } else if (lower.includes('마케팅') || lower.includes('플레이스') || lower.includes('릴스') || lower.includes('단골') || lower.includes('홍보')) {
    selectedPoolKey = 'marketing';
  } else {
    selectedPoolKey = 'ai';
  }

  const dataset = DYNAMIC_POOLS[selectedPoolKey] || DYNAMIC_POOLS.ai;
  const shuffledItems = shuffleArray(dataset.pool);

  const slides: Slide[] = [];

  // Slide 1: Cover
  slides.push({
    id: `slide-1-${uid()}`,
    page: 1,
    type: 'cover',
    tag: `🔥 ${req.targetAudience || '직장인'} 필독`,
    main_title: topic,
    sub_title: dataset.subtitles[Math.floor(Math.random() * dataset.subtitles.length)],
  });

  // Body slides: Pick freshly shuffled items every single click
  for (let i = 0; i < total - 2; i++) {
    const item = shuffledItems[i % shuffledItems.length];
    slides.push({
      id: `slide-${i + 2}-${uid()}`,
      page: i + 2,
      type: 'content',
      tag: `💡 실전 꿀팁 0${i + 1}`,
      step_or_num: item.step_or_num || `POINT 0${i + 1}`,
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
    tag: '💾 SAVE & SHARE',
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
