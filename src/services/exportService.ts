import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Slide, AspectRatio } from '../types/cardnews';

export const ASPECT_RATIO_CONFIG: Record<AspectRatio, { width: number; height: number; label: string; ratioText: string }> = {
  '4:5': { width: 1080, height: 1350, label: '4x5', ratioText: '4:5 세로형 (1080×1350)' },
  '3:4': { width: 1080, height: 1440, label: '3x4', ratioText: '3:4 신규 프로필 (1080×1440)' },
  '1:1': { width: 1080, height: 1080, label: '1x1', ratioText: '1:1 정방형 (1080×1080)' },
};

export async function exportSlideToPng(
  elementId: string, 
  filename: string,
  aspectRatio: AspectRatio = '4:5'
): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  const { width, height } = ASPECT_RATIO_CONFIG[aspectRatio] || ASPECT_RATIO_CONFIG['4:5'];

  // Generate crisp 2x image with exact resolution standard
  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    canvasWidth: width,
    canvasHeight: height,
    cacheBust: true,
    quality: 0.98,
  });

  saveAs(dataUrl, filename);
  return dataUrl;
}

export async function exportAllSlidesToZip(
  slides: Slide[],
  baseFilename: string,
  aspectRatio: AspectRatio = '4:5',
  onProgress?: (current: number, total: number, message: string) => void
): Promise<void> {
  const { width, height, label, ratioText } = ASPECT_RATIO_CONFIG[aspectRatio] || ASPECT_RATIO_CONFIG['4:5'];
  const zip = new JSZip();
  const folder = zip.folder(`cardnews_${label}`);
  const total = slides.length;

  for (let i = 0; i < total; i++) {
    const slide = slides[i];
    const elementId = `export-slide-${slide.id}`;
    const element = document.getElementById(elementId);

    if (onProgress) {
      onProgress(i + 1, total, `슬라이드 ${i + 1}/${total} [${ratioText}] 렌더링 중...`);
    }

    if (!element) {
      console.warn(`Export element for slide ${slide.id} not found (${elementId})`);
      continue;
    }

    try {
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        canvasWidth: width,
        canvasHeight: height,
        cacheBust: true,
        quality: 0.98,
      });

      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const slideTypeLabel = slide.type === 'cover' ? '01_cover' : slide.type === 'cta' ? `${String(i + 1).padStart(2, '0')}_cta` : `${String(i + 1).padStart(2, '0')}_slide`;
      folder?.file(`${slideTypeLabel}_${label}.png`, base64Data, { base64: true });
    } catch (err) {
      console.error(`Error rendering slide ${i + 1}:`, err);
    }
  }

  if (onProgress) {
    onProgress(total, total, 'ZIP 파일 압축 생성 중...');
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const sanitizedName = baseFilename.replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
  saveAs(content, `${sanitizedName || 'cardnews'}_${label}_slides.zip`);
}
