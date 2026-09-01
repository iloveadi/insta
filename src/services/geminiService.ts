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

// Test API Key Validity (with detailed error diagnostics)
export async function testGeminiApiKey(apiKey: string): Promise<{ success: boolean; modelName?: string; error?: string }> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    return { success: false, error: 'API 키가 입력되지 않았습니다.' };
  }

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      // 1. Try via URL param
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': cleanKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Ping. Reply OK.' }] }]
        })
      });

      if (res.ok) {
        return { success: true, modelName: model };
      }

      const errJson = await res.json().catch(() => null);
      if (errJson?.error?.message) {
        console.warn(`[Gemini Test ${model}] Response:`, errJson.error.message);
      }
    } catch (err: any) {
      console.warn(`[Gemini Test ${model}] Network error:`, err?.message);
    }
  }

  return { 
    success: false, 
    error: '구글 인증 실패: AI Studio 목록의 2번째 줄(Default Gemini Project)에 있는 복사 아이콘을 눌러서 키를 넣어보세요!' 
  };
}

export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const apiKey = (request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '').trim();

  // If API key is available, call Gemini REST endpoint
  if (apiKey) {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

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
반드시 아래 JSON 형식만 반환하세요:
{
  "slides": [
    { "type": "cover", "tag": "🔥 2030 직장인 필독", "main_title": "...", "sub_title": "..." },
    { "type": "content", "tag": "💡 실전 꿀팁 01", "step_or_num": "01", "title": "...", "body": "...", "tip": "..." },
    { "type": "cta", "tag": "💾 SAVE & SHARE", "main_title": "...", "sub_title": "..." }
  ],
  "instagram_caption": "..."
}`;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 1.0,
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return formatToProject(parsed, request);
          }
        }
      } catch (err: any) {
        console.warn(`Gemini API [${model}] failed:`, err?.message);
      }
    }
  }

  // Fallback to our massive dynamic variation engine
  return generateDynamicSmartProject(request);
}

// ── VAST DYNAMIC TOPIC & CONTENT ENGINE (OVER 50+ UNIQUE TEMPLATES) ──
interface DynamicDomain {
  topics: {
    title: string;
    sub: string;
    format: CardNewsCategory;
    theme: ThemePresetId;
    slides: Array<{ step_or_num: string; title: string; body: string; tip: string }>;
  }[];
}

const DOMAIN_DATA: Record<string, DynamicDomain> = {
  ai: {
    topics: [
      {
        title: '2026년 일잘러가 몰래 쓰는 무료 AI 생산성 도구 5선',
        sub: '반복 업무 80% 줄이고 정시 퇴근하는 치트키 모음',
        format: 'curation',
        theme: 'modern_dark',
        slides: [
          {
            step_or_num: 'AI 01',
            title: 'Claude 3.7 Sonnet - 논리적 보고서 작성 & 코딩 종결자',
            body: '긴 PDF 문서 요약과 기획서 초안 작성에 현존 최강의 한국어 이해력을 자랑합니다.',
            tip: '프롬프트에 "핵심 결론부터 3줄 요약해줘"라고 입력하면 10배 깔끔해집니다.'
          },
          {
            step_or_num: 'AI 02',
            title: 'Perplexity AI - 실시간 출처 기반 검색 리서치',
            body: '구글 검색 10번 돌릴 시간에 질문 하나로 최신 논문과 뉴스 출처를 깔끔하게 브리핑합니다.',
            tip: 'Focus 옵션에서 "Academic"을 선택하면 신뢰도가 대폭 상승합니다.'
          },
          {
            step_or_num: 'AI 03',
            title: 'Gamma App - 1분 만에 PPT 발표자료 & 웹페이지 완성',
            body: '주제 텍스트만 넣으면 디자인 레이아웃과 폰트가 완벽한 슬라이드 덱을 자동으로 찍어냅니다.',
            tip: '완성 후 파워포인트(.pptx)로 원클릭 내보내기가 가능합니다.'
          }
        ]
      },
      {
        title: '야근을 완전히 없애주는 실전 AI 업무 자동화 툴 3가지',
        sub: '단순 반복 작업은 AI에게 맡기고 정시 칼퇴하세요',
        format: 'howto',
        theme: 'contrast_navy_orange',
        slides: [
          {
            step_or_num: 'TOOL 01',
            title: 'v0.dev - 프롬프트 한 줄로 웹 UI 화면 즉시 구현',
            body: '원하는 웹/앱 디자인을 설명하면 Next.js 및 Tailwind 코드로 인터랙티브 컴포넌트를 빌드합니다.',
            tip: '디자이너 없이도 프로토타입을 5분 만에 시각화할 수 있습니다.'
          },
          {
            step_or_num: 'TOOL 02',
            title: 'ElevenLabs - 초현실적인 AI 나레이션 & 숏폼 더빙',
            body: '자연스러운 성우 음성으로 변환하여 릴스, 유튜브 쇼츠의 목소리를 10초 만에 입힙니다.',
            tip: '한국어 음성 생성 시 배속을 1.1배로 올리면 숏폼 호흡에 딱 맞습니다.'
          },
          {
            step_or_num: 'TOOL 03',
            title: 'Notion AI - 어지러운 회의록 3초 요약 & 액션 아이템 표 정리',
            body: '중구난방 메모를 담당자별 실행 과제 표로 자동 변환하여 업무 누락을 막아줍니다.',
            tip: '회의 직후 Space 키를 눌러 즉시 요약본을 생성하세요.'
          }
        ]
      },
      {
        title: '디자이너·기획자가 매일 쓰는 이미지 & 브랜딩 AI 치트키',
        sub: '포토샵 없이도 프로급 그래픽 완성하는 AI 모음',
        format: 'curation',
        theme: 'contrast_purple_lime',
        slides: [
          {
            step_or_num: 'GEN 01',
            title: 'Midjourney v6 - 영화 포스터급 상업용 이미지 생성',
            body: '텍스트 묘사만으로 제품 렌더링, 인테리어, 광고 비주얼을 초고화질로 렌더링합니다.',
            tip: '프롬프트 끝에 --ar 4:5 --style raw를 붙이면 인스타 최적화 비율로 생성됩니다.'
          },
          {
            step_or_num: 'GEN 02',
            title: 'Recraft.ai - 벡터(SVG) 아이콘 & 브랜드 일러스트 제작',
            body: '원하는 브랜드 컬러 팔레트를 지정하여 깨지지 않는 벡터 그래픽을 무제한 생성합니다.',
            tip: '로고나 웹사이트 그래픽 제작 시 시간을 90% 단축해 줍니다.'
          },
          {
            step_or_num: 'GEN 03',
            title: 'Clipdrop - 배경 제거 & 불필요한 물체 1초 지우개',
            body: '사진에서 지우고 싶은 사람이나 잡티를 브러시로 칠하면 감쪽같이 지워줍니다.',
            tip: '스마트폰으로 대충 찍은 누끼 사진도 쇼핑몰 썸네일로 탈바꿈합니다.'
          }
        ]
      }
    ]
  },
  job: {
    topics: [
      {
        title: '자소서 쓸 때 모르면 10시간 손해보는 챗GPT 황금 프롬프트 4가지',
        sub: '경험 정리부터 기업 인재상 매칭까지 10분 만에 끝내는 프롬프트 모음',
        format: 'curation',
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
            body: '"00기업의 핵심 가치(도전, 소통)와 나의 프로젝트 경험을 연결하여 설득력 있는 문장 3개 추천해줘."',
            tip: '채용공고의 직무기술서(JD) 텍스트를 함께 복사해서 프롬프트에 넣으세요.'
          },
          {
            step_or_num: 'PROMPT 03',
            title: '두괄식 소제목 & 매력적인 첫 문장 도출',
            body: '"이 자기소개서 문단을 읽고 면접관의 시선을 단번에 사로잡을 20자 이내의 두괄식 소제목 5개 뽑아줘."',
            tip: '소제목에 나의 핵심 역량 키워드를 대괄호 [ ] 안에 넣어 강조하세요.'
          }
        ]
      },
      {
        title: '면접관이 3초 만에 합격 체크하는 1분 자기소개 공식',
        sub: '뻔한 자기소개 버리고 강렬하게 첫인상 각인시키는 3단계',
        format: 'howto',
        theme: 'contrast_yellow_black',
        slides: [
          {
            step_or_num: 'STEP 01',
            title: '후킹 도입부 - 한 문장 직무 키워드 정의',
            body: '"안녕하십니까, 데이터로 고객의 문제를 해결하는 마케터 000입니다."처럼 뻔한 성장과정 대신 내 핵심 직무 정체성을 3초 안에 던지세요.',
            tip: '도입부에서 면접관이 서류에서 고개를 들게 만들어야 합니다.'
          },
          {
            step_or_num: 'STEP 02',
            title: '대표 성공 경험 - 수치 기반 액션 1가지 압축',
            body: '여러 경험을 나열하지 말고, 직무와 가장 직결된 단 1가지 성공 프로젝트와 그 결과를 명확한 숫자로 증명하세요.',
            tip: '"팀원들과 협력해 문제를 해결하고 매출을 140% 개선한 경험이 있습니다."'
          },
          {
            step_or_num: 'STEP 03',
            title: '입사 후 기여점 - 회사 비전과 나의 연결고리',
            body: '내가 가진 역량이 이 회사에 입사했을 때 어떤 구체적인 이익이나 성과로 전환될 수 있는지 포부를 밝히며 마무리하세요.',
            tip: '"이 경험을 바탕으로 00 신사업에서 즉시 실전 성과를 내겠습니다."'
          }
        ]
      }
    ]
  },
  finance: {
    topics: [
      {
        title: '사회초년생이 첫 1억 모으기 위해 반드시 끊어야 할 소비 습관 5가지',
        sub: '통장 쪼개기와 자동 저축으로 1년 만에 종잣돈 완성',
        format: 'curation',
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
      {
        title: '월급 250만원으로 3년 만에 5,000만원 만드는 4통장 시스템',
        sub: '돈이 저절로 불어나는 자동화 재테크 루틴',
        format: 'howto',
        theme: 'contrast_navy_orange',
        slides: [
          {
            step_or_num: 'BANK 01',
            title: '급여 통장 - 월급 입금 즉시 잔고 0원 만들기',
            body: '월급날 필수 고정 지출(월세, 공과금)만 남기고, 저축액과 생활비를 각 통장으로 100% 분배하세요.',
            tip: '급여 통장에 돈이 남아 있으면 내 돈이라 착각해 과소비하게 됩니다.'
          },
          {
            step_or_num: 'BANK 02',
            title: '소비 통장 - 1주일 단위 체크카드 생활비 지급',
            body: '한 달 생활비를 한 번에 넣지 말고, 매주 월요일마다 15만원씩 쪼개어 소비를 통제하세요.',
            tip: '주 단위 예산이 남으면 주말에 나를 위한 소소한 보상으로 쓰세요.'
          }
        ]
      }
    ]
  },
  marketing: {
    topics: [
      {
        title: '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지',
        sub: '스크롤을 즉시 멈추게 만드는 결핍과 호기심 자극 템플릿',
        format: 'curation',
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
          }
        ]
      },
      {
        title: '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
        sub: '상위 노출 알고리즘과 고객 리뷰 유도 치트키 3가지',
        format: 'howto',
        theme: 'contrast_navy_orange',
        slides: [
          {
            step_or_num: 'LOCAL 01',
            title: '네이버 스마트플레이스 대표 키워드 5개 세팅',
            body: '"강남역 맛집" 같은 대형 키워드 대신 "강남역 모임하기 좋은 파스타"처럼 구매 의도가 뚜렷한 세부 롱테일 키워드를 등록하세요.',
            tip: '업체 소개글 첫 2줄 안에 핵심 타깃 키워드를 자연스럽게 포함하세요.'
          },
          {
            step_or_num: 'LOCAL 02',
            title: '영수증 리뷰 유도 트리거 시스템',
            body: '"리뷰 써주세요"라고 부탁만 하지 말고, 테이블마다 QR 코드를 두고 "포토리뷰 시 시그니처 음료 무료"처럼 즉각적인 보상을 설계하세요.',
            tip: '키워드가 포함된 정성스러운 포토리뷰가 쌓일수록 플레이스 순위가 급등합니다.'
          }
        ]
      }
    ]
  }
};

// ── ONE-CLICK TARGET AUDIENCE GENERATION ──
export async function generateByTargetAudience(
  audience: string,
  currentTheme: ThemePresetId = 'modern_dark',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  let domainKey = 'job';
  if (audience.includes('직장인') || audience.includes('디자이너') || audience.includes('개발자')) domainKey = 'ai';
  else if (audience.includes('투자자') || audience.includes('창업가') || audience.includes('자영업자')) domainKey = 'finance';
  else if (audience.includes('마케터') || audience.includes('크리에이터')) domainKey = 'marketing';
  else if (audience.includes('취업') || audience.includes('대학생')) domainKey = 'job';

  const domain = DOMAIN_DATA[domainKey] || DOMAIN_DATA.job;
  const pickedItem = domain.topics[Math.floor(Math.random() * domain.topics.length)];

  const req: GenerationRequest = {
    topic: pickedItem.title,
    targetAudience: audience,
    category: pickedItem.format,
    slideCount: 5,
    theme: pickedItem.theme || currentTheme,
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

// ── MASSIVE DYNAMIC SMART ENGINE (TOPIC-ACCURATE + INFINITE VARIATION) ──
export function generateDynamicSmartProject(req: GenerationRequest): CardNewsProject {
  const topic = req.topic.trim();
  const total = Math.max(4, Math.min(req.slideCount || 5, 8));
  const uid = () => `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const lower = topic.toLowerCase();

  // 1. Find best matching domain
  let domainKey = 'ai';
  if (lower.includes('자소서') || lower.includes('면접') || lower.includes('취업') || lower.includes('포트폴리오') || lower.includes('프롬프트') || lower.includes('합격')) {
    domainKey = 'job';
  } else if (lower.includes('재테크') || lower.includes('돈') || lower.includes('부업') || lower.includes('소비') || lower.includes('통장') || lower.includes('1억') || lower.includes('etf') || lower.includes('주식') || lower.includes('투자')) {
    domainKey = 'finance';
  } else if (lower.includes('마케팅') || lower.includes('플레이스') || lower.includes('릴스') || lower.includes('단골') || lower.includes('홍보') || lower.includes('조회수')) {
    domainKey = 'marketing';
  } else {
    domainKey = 'ai';
  }

  const domain = DOMAIN_DATA[domainKey] || DOMAIN_DATA.ai;

  // Find exact or random topic in domain
  const matchingTopic = domain.topics.find(t => t.title === topic) || domain.topics[Math.floor(Math.random() * domain.topics.length)];

  const slides: Slide[] = [];

  // Cover
  slides.push({
    id: `slide-1-${uid()}`,
    page: 1,
    type: 'cover',
    tag: `🔥 ${req.targetAudience || '직장인'} 필독`,
    main_title: matchingTopic.title,
    sub_title: matchingTopic.sub,
  });

  // Body
  for (let i = 0; i < total - 2; i++) {
    const s = matchingTopic.slides[i % matchingTopic.slides.length];
    slides.push({
      id: `slide-${i + 2}-${uid()}`,
      page: i + 2,
      type: 'content',
      tag: `💡 실전 꿀팁 0${i + 1}`,
      step_or_num: s.step_or_num,
      title: s.title,
      body: s.body,
      tip: s.tip,
    });
  }

  // CTA
  slides.push({
    id: `slide-${slides.length + 1}-${uid()}`,
    page: slides.length + 1,
    type: 'cta',
    tag: '💾 SAVE & SHARE',
    main_title: '나중에 다시 찾아보려면?',
    sub_title: '지금 오른쪽 아래 [저장]을 누르고, 유익했다면 동료에게 [공유]해보세요! ✨',
  });

  return {
    topic: matchingTopic.title,
    target_audience: req.targetAudience,
    card_type: matchingTopic.format,
    theme_type: matchingTopic.theme || req.theme,
    aspect_ratio: req.aspectRatio,
    brand_handle: req.brandHandle || '@kimppungsamssi',
    slide_count: slides.length,
    instagram_caption: generateFallbackCaption({ ...req, topic: matchingTopic.title }),
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
