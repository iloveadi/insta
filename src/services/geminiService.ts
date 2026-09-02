import type { CardNewsProject, GenerationRequest, Slide, SlideType, CardNewsCategory, ThemePresetId, AspectRatio } from '../types/cardnews';
import type { ViralQuickCategory } from '../constants/themes';

const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.6-flash',
  'gemini-1.5-flash'
];

const SYSTEM_PROMPT = `당신은 인스타그램에서 수백만 조회수와 폭발적인 댓글/공유를 이끌어내는 최고의 바이럴 카드뉴스 전문 작가이자 카피라이터입니다.
딱딱하고 지루한 백과사전식 말투는 절대 사절합니다! 사용자가 제공하는 [주제], [타깃 독자], [카드뉴스 유형]에 맞춰 독자가 "와 미쳤다 ㅋㅋㅋ", "완전 내 얘기잖아?!", "이거 우리 얘기 아님?"이라며 친구를 태그하고 바로 저장(Save)할 수밖에 없는 센스 넘치고 위트 있는 카드뉴스를 기획하세요.

[핵심 작성 원칙 - 절대 준수]
1. 톤앤매너 (Tone & Voice):
   - 딱딱하고 교과서적인 설명('~해야 합니다', '~의 중요성') 절대 금지!
   - 찰진 한국어 구어체, 뼈 때리는 극현실주의 공감, 유쾌한 풍자와 위트, 도파민 넘치는 찰떡 비유를 사용하세요.
2. 표지 (Cover):
   - 1초 만에 엄지손가락을 멈추게 하는 강력한 후킹 카피 (예: '직장인 영혼 탈곡되는 순간 TOP 5 💀', '극T와 극F가 카톡하면 벌어지는 대참사', '자취 5년차가 뼈저리게 깨달은 배달앱 삭제각 꿀팁')
3. 본문 (Content):
   - 소제목(title): 호기심을 극대화하는 명확하고 찰진 제목
   - 본문(body): 생생한 현실 디테일과 공감 200% 에피소드/상황 묘사 (2~3줄)
   - 꿀팁/인사이트(tip): 
     * 유머/공감 주제일 때: 빵 터지는 현실 대처법이나 뼈 때리는 한 줄 팩트폭격
     * 정보/가이드 주제일 때: 당장 써먹을 수 있는 구체적인 치트키
4. CTA (마지막 슬라이드):
   - 친구 태그 유도, 공감 투표, 저장 유도 (예: '나만 이런 거 아니지? 😭 같이 고통받을 동료 소환!')
5. 인스타그램 캡션:
   - 독자의 댓글 참여를 유발하는 질문 + 친구 태그 유도 + 꿀잼 해시태그 10개 이상.

반드시 정해진 JSON 스키마 형식만을 반환하세요.`;

// ── 1. API KEY VALIDITY TEST (Multi-Model Resilient Ping) ──
export async function testGeminiApiKey(rawKey: string): Promise<{ success: boolean; modelName?: string; error?: string }> {
  const apiKey = (rawKey || '').replace(/\s+/g, '');
  if (!apiKey) {
    return { success: false, error: 'API 키가 입력되지 않았습니다.' };
  }

  let lastError = '';

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: 'Ping' }],
            },
          ],
        }),
      });

      if (response.ok) {
        console.log(`[Gemini Test Success] Verified via model: ${model}`);
        return { success: true, modelName: model };
      }

      const errorData = await response.json().catch(() => ({}));
      const message = errorData.error?.message || `HTTP ${response.status} 오류`;
      lastError = `[Status ${response.status}] ${message}`;
      console.warn(`[Gemini Test ${model}]:`, lastError);

      // If the key itself is invalid (400 / 403), stop immediately
      if (response.status === 400 || response.status === 403) {
        return { success: false, error: lastError };
      }
      // If 503 (high demand) or 404, loop continues to next candidate model!
    } catch (err: any) {
      lastError = `네트워크 오류: ${err?.message || '통신 실패'}`;
    }
  }

  return {
    success: false,
    error: lastError || '모든 구글 모델 엔드포인트에 일시적인 지연이 발생했습니다. 잠시 후 다시 시도해 주세요.',
  };
}

// ── 2. REAL-TIME CARD NEWS GENERATION (Official gemini-3.6-flash) ──
export async function generateCardNews(request: GenerationRequest): Promise<CardNewsProject> {
  const rawKey = (request.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '').replace(/\s+/g, '');

  if (!rawKey) {
    throw new Error('API_KEY_REQUIRED');
  }

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

  // Auto-retry helper for temporary Google server spikes (503 / 429)
  const fetchWithRetry = async (targetUrl: string, targetOptions: RequestInit, maxRetries = 3): Promise<Response> => {
    let attempt = 0;
    while (attempt < maxRetries) {
      attempt++;
      try {
        const res = await fetch(targetUrl, targetOptions);
        if ((res.status === 503 || res.status === 429) && attempt < maxRetries) {
          const delay = attempt * 1500;
          console.warn(`[Gemini API ${res.status}] 일시적 구글 서버 과부하 감지. ${delay}ms 후 자동 재시도 중 (${attempt}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        return res;
      } catch (networkErr) {
        if (attempt < maxRetries) {
          const delay = attempt * 1500;
          console.warn(`[Gemini 통신 지연] ${delay}ms 후 재시도 중 (${attempt}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw networkErr;
      }
    }
    return fetch(targetUrl, targetOptions);
  };

  let lastError = '';

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(rawKey)}`;

      const res = await fetchWithRetry(url, {
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

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          let parsed: any;
          try {
            parsed = JSON.parse(rawText);
          } catch {
            const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
          }
          console.log(`[Gemini Generation Success] Generated via model: ${model}`);
          return formatToProject(parsed, request);
        }
      }

      const errJson = await res.json().catch(() => null);
      const errorMsg = errJson?.error?.message || `HTTP ${res.status}`;
      lastError = `[Status ${res.status}] ${errorMsg}`;
      console.warn(`[Gemini Model ${model} Failed]:`, lastError);

      if (res.status === 400 || res.status === 403) {
        throw new Error(`Google API 호출 실패: ${lastError}`);
      }
    } catch (err: any) {
      if (err.message?.includes('400') || err.message?.includes('403')) {
        throw err;
      }
      lastError = err.message || '통신 실패';
    }
  }

  throw new Error(`Google API 호출 실패: ${lastError || '구글 AI 모델의 일시적 과부하가 발생했습니다. 잠시 후 다시 시도해 주세요.'}`);
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
  currentTheme: ThemePresetId = 'studio_editorial',
  brandHandle: string = '@kimppungsamssi',
  apiKey?: string
): Promise<{ project: CardNewsProject; resolvedTopic: string; resolvedCategory: CardNewsCategory; resolvedTheme: ThemePresetId }> {
  const defaultTopics: Record<string, string> = {
    'K-직장인 (퇴사희망러)': '직장인 영혼 탈곡되는 순간 TOP 5 (뼈 맞음 주의)',
    '극T vs 극F': '극T와 극F가 카톡으로 대화할 때 일어나는 대참사 4선',
    '프로자취러': '자취 5년차가 뼈저리게 깨달은 현실 자취 꿀팁 (배달앱 삭제각)',
    'MBTI 과몰입러': '은근 소름 돋는 MBTI별 숨겨진 흑막 모먼트 5가지',
    '썸/연애 중인 사람': '이 카톡 받으면 100% 그린라이트 vs 단순 친절 구별법',
    '대학생/취준생': '개강 첫 주에 무조건 후회하는 대학생 단골 착각 4선',
    '갓생 실패러': '1월 1일 계획 세우고 3일 만에 박살 나는 사람 특징 5선',
    '다이어트 작심삼일러': '세상에서 제일 맛있는 야식의 유혹에 매번 지는 현실 이유',
    '2030 직장인': '직장인 영혼 탈곡되는 순간 TOP 5 (뼈 맞음 주의)'
  };

  const topic = defaultTopics[audience] || `${audience}들이 200% 격공하는 현실 꿀잼 썰`;

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
  theme: ThemePresetId = 'studio_editorial',
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
