import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Slide } from '../types/cardnews';

export async function exportSlideToPng(elementId: string, filename: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Generate crisp 2x image with exact 1080x1350 standard
  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    canvasWidth: 1080,
    canvasHeight: 1350,
    cacheBust: true,
    quality: 0.98,
  });

  saveAs(dataUrl, filename);
  return dataUrl;
}

export async function exportAllSlidesToZip(
  slides: Slide[],
  baseFilename: string,
  onProgress?: (current: number, total: number, message: string) => void
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('cardnews_slides_4x5');
  const total = slides.length;

  for (let i = 0; i < total; i++) {
    const slide = slides[i];
    const elementId = `export-slide-${slide.id}`;
    const element = document.getElementById(elementId);

    if (onProgress) {
      onProgress(i + 1, total, `슬라이드 ${i + 1}/${total} 4:5 고화질 (1080×1350) 렌더링 중...`);
    }

    if (!element) {
      console.warn(`Export element for slide ${slide.id} not found (${elementId})`);
      continue;
    }

    try {
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        canvasWidth: 1080,
        canvasHeight: 1350,
        cacheBust: true,
        quality: 0.98,
      });

      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const slideTypeLabel = slide.type === 'cover' ? '01_cover' : slide.type === 'cta' ? `${String(i + 1).padStart(2, '0')}_cta` : `${String(i + 1).padStart(2, '0')}_slide`;
      folder?.file(`${slideTypeLabel}_4x5.png`, base64Data, { base64: true });
    } catch (err) {
      console.error(`Error rendering slide ${i + 1}:`, err);
    }
  }

  if (onProgress) {
    onProgress(total, total, 'ZIP 파일 압축 생성 중...');
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const sanitizedName = baseFilename.replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
  saveAs(content, `${sanitizedName || 'cardnews'}_4x5_slides.zip`);
}
