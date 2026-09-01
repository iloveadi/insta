import type { CardNewsProject, GenerationRequest, Slide, SlideType, CardNewsCategory, ThemePresetId, AspectRatio } from '../types/cardnews';
import type { ViralQuickCategory } from '../constants/themes';

const OFFICIAL_MODEL = 'gemini-1.5-flash';

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

// ── 1. API KEY VALIDITY TEST (Official gemini-1.5-flash & Detailed Debug Logging) ──
export async function testGeminiApiKey(apiKey: string): Promise<{ success: boolean; modelName?: string; error?: string }> {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) {
    return { success: false, error: 'API 키가 입력되지 않았습니다.' };
  }

  const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${OFFICIAL_MODEL}:generateContent?key=${encodeURIComponent(cleanKey)}`;

  try {
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'ping' }],
          },
        ],
      }),
    });

    if (res.ok) {
      console.log(`[Gemini API Test Success] Model: ${OFFICIAL_MODEL}, Status: ${res.status}`);
      return { success: true, modelName: OFFICIAL_MODEL };
    }

    const errJson = await res.json().catch(() => null);
    const errorMsg = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
    console.error(`[Gemini API Test Error] Status ${res.status}:`, errJson || errorMsg);

    return {
      success: false,
      error: `[Status ${res.status}] ${errorMsg}`,
    };
  } catch (err: any) {
    console.error('[Gemini API Test Network Exception]:', err);
    return {
      success: false,
      error: `네트워크 오류: ${err?.message || '통신에 실패했습니다.'}`,
    };
  }
}

// ── 2. REAL-TIME CARD NEWS GENERATION VIA GEMINI-1.5-FLASH ──
export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const cleanKey = (request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '').trim();

  if (!cleanKey) {
    throw new Error('API_KEY_REQUIRED');
  }

  const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${OFFICIAL_MODEL}:generateContent?key=${encodeURIComponent(cleanKey)}`;

  const userPrompt = `
[카드뉴스 생성 요청]
- 주제: "${request.topic}"
- 타깃 독자: ${request.targetAudience}
- 카드뉴스 유형: ${request.category}
- 총 슬라이드 수: ${request.slideCount}장 (표지 1장 + 본문 ${request.slideCount - 2}장 + CTA 1장)
- 브랜드 핸들: ${request.brandHandle || '@kimppungsamssi'}
- 무작위 시드: ${Date.now()}-${Math.random()}

반드시 아래 형식의 JSON 데이터만 출력하세요 (마크다운 백틱 포함/미포함 무관):
{
  "slides": [
    { 
      "type": "cover", 
      "tag": "🔥 ${request.targetAudience} 필독", 
      "main_title": "...", 
      "sub_title": "..." 
    },
    { 
      "type": "content", 
      "tag": "💡 실전 꿀팁 01", 
      "step_or_num": "01", 
      "title": "...", 
      "body": "...", 
      "tip": "..." 
    },
    { 
      "type": "content", 
      "tag": "💡 실전 꿀팁 02", 
      "step_or_num": "02", 
      "title": "...", 
      "body": "...", 
      "tip": "..." 
    },
    { 
      "type": "content", 
      "tag": "💡 실전 꿀팁 03", 
      "step_or_num": "03", 
      "title": "...", 
      "body": "...", 
      "tip": "..." 
    },
    { 
      "type": "cta", 
      "tag": "💾 SAVE & SHARE", 
      "main_title": "...", 
      "sub_title": "..." 
    }
  ],
  "instagram_caption": "..."
}`;

  try {
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.95,
        },
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const errorMsg = errJson?.error?.message || `HTTP ${res.status}`;
      console.error(`[Gemini Generation Error] Status ${res.status}:`, errJson);
      throw new Error(`Google API 오류 (${res.status}): ${errorMsg}`);
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Google Gemini로부터 응답 텍스트를 받지 못했습니다.');
    }

    // Parse JSON
    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Fallback: extract json from codeblocks if any
      const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return formatToProject(parsed, request);
  } catch (err: any) {
    console.error('[Gemini Generate Exception]:', err);
    throw err;
  }
}

function formatToProject(data: any, req: GenerationRequest): CardNewsProject {
  const slides: Slide[] = (data.slides || []).map((slide: any, idx: number) => ({
    id: `slide-${idx + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    page: slide.page || idx + 1,
    type: (slide.type as SlideType) || (idx === 0 ? 'cover' : idx === data.slides.length - 1 ? 'cta' : 'content'),
    tag: slide.tag || (idx === 0 ? `🔥 ${req.targetAudience} 필독` : `💡 실전 꿀팁 0${idx}`),
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
    instagram_caption: data.instagram_caption || `📌 "${req.topic}"\n\n#카드뉴스 #${(req.targetAudience || '정보').replace(/\s+/g, '')}`,
    slides,
  };
}

export async function generateByTargetAudience(
  audience: string,
  currentTheme: ThemePresetId = 'modern_dark',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  const defaultTopics: Record<string, string> = {
    '취업준비생': '2026년 서류 합격률 300% 높이는 챗GPT 자소서 & 포트폴리오 프롬프트',
    '대학생': '학점 4.5 만점러들이 시험기간에 몰래 쓰는 AI 과제 요약 치트키',
    '1인 창업가 / 자영업자': '광고비 0원으로 네이버 플레이스 & 인스타 지역 1위 찍는 법',
    '2030 직장인': '2026년 일잘러가 몰래 쓰는 무료 AI 업무 자동화 도구 5선',
    '재테크 / 투자자': '사회초년생이 3년 만에 종잣돈 5,000만원 만드는 4통장 시스템',
    '마케터 / 크리에이터': '인스타 릴스 조회수 100만 터지는 3초 후킹 카피 공식 5가지'
  };

  const topic = defaultTopics[audience] || `${audience}를 위한 실전 핵심 꿀팁 3가지`;

  const req: GenerationRequest = {
    topic,
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
