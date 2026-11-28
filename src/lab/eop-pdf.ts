import { getDocument, GlobalWorkerOptions, Util } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { pdfPage, type BookExample } from './eop-pilot';

GlobalWorkerOptions.workerSrc = workerUrl;

const supportedFiles = new Set([
  '3393c7b5c90ad86ee16b5c827282d7f78ae7c4250840842c13e52e51483aa33f',
  '9732e1033f7ed9f10601cedc62ced45c1a28cf6a3794f3e7a8c2e79864be56ef',
]);

export async function openLocalPdf(file: File) {
  const bytes = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  if (!supportedFiles.has(hash)) throw new Error('Unsupported edition');
  const task = getDocument({ data: new Uint8Array(bytes) });
  try {
    return { pdf: await task.promise, close: () => task.destroy() };
  } catch (error) {
    await task.destroy();
    throw error;
  }
}

export async function renderBookPage(
  documentPdf: Awaited<ReturnType<typeof openLocalPdf>>['pdf'],
  pageNumber: number,
  entries: BookExample[],
  activate: (entry: BookExample) => void,
) {
  const page = await documentPdf.getPage(pdfPage(pageNumber));
  const viewport = page.getViewport({ scale: 1.6 });
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-label', (document.documentElement.lang === 'es' ? 'Página ' : 'Page ') + pageNumber);
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.ceil(viewport.width * density);
  canvas.height = Math.ceil(viewport.height * density);
  const wrapper = document.createElement('div');
  wrapper.className = 'book-rendered-page';
  wrapper.style.aspectRatio = String(viewport.width / viewport.height);
  wrapper.append(canvas);

  const [, text] = await Promise.all([
    page.render({ canvas, viewport, transform: [density, 0, 0, density, 0, 0] }).promise,
    page.getTextContent(),
  ]);

  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) return wrapper;
  for (const item of text.items) {
    if (!('str' in item) || !item.width) continue;
    const matrix = Util.transform(viewport.transform, item.transform);
    const height = Math.hypot(matrix[2], matrix[3]);
    const style = text.styles[item.fontName];
    measure.font = `${height}px ${style.fontFamily}`;
    const totalWidth = measure.measureText(item.str).width;
    if (!totalWidth) continue;

    for (const entry of entries) {
      const marker = entry.marker ?? entry.example;
      if (!marker) continue;
      const start = item.str.indexOf(marker);
      if (start < 0) continue;
      const end = start + marker.length;
      if (!entry.marker && (/[\w$]/.test(item.str[start - 1] ?? '') || !/^\s*\(/.test(item.str.slice(end)))) continue;
      const left = measure.measureText(item.str.slice(0, start)).width / totalWidth;
      const width = measure.measureText(marker).width / totalWidth;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'book-hotspot';
      button.title = entry.label;
      button.setAttribute('aria-label', entry.label);
      button.style.left = `${(matrix[4] + item.width * viewport.scale * left) / viewport.width * 100}%`;
      button.style.top = `${(matrix[5] - height * (style.ascent ?? 0.85)) / viewport.height * 100}%`;
      button.style.width = `${item.width * viewport.scale * width / viewport.width * 100}%`;
      button.style.height = `${height * 1.15 / viewport.height * 100}%`;
      button.addEventListener('click', () => activate(entry));
      wrapper.append(button);
    }
  }
  return wrapper;
}
