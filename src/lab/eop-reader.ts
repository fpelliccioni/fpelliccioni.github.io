import { chapterPages, firstExamplePage, firstPage, lastPage, officialPdf, pdfPage, type BookExample } from './eop-pilot';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const reader = byId<HTMLElement>('eop-reader');
const es = document.documentElement.lang === 'es';
const pagePicker = byId<HTMLSelectElement>('book-page');
const previous = byId<HTMLButtonElement>('book-previous');
const next = byId<HTMLButtonElement>('book-next');
const officialFrame = byId<HTMLIFrameElement>('book-pdf');
const localPage = byId<HTMLDivElement>('book-local-page');
const pdfStage = byId<HTMLDivElement>('book-pdf-stage');
const pdfLink = byId<HTMLAnchorElement>('book-official');
const fileInput = byId<HTMLInputElement>('book-file');
const localStatus = byId<HTMLParagraphElement>('book-file-status');
const exampleList = byId<HTMLDivElement>('book-examples');
const lab = byId<HTMLIFrameElement>('book-lab');
const labLink = byId<HTMLAnchorElement>('book-open-lab');
const labTitle = byId<HTMLElement>('book-lab-title');
const notice = byId<HTMLParagraphElement>('book-notice');

const rawPage = Number(new URL(location.href).searchParams.get('page'));
let page = Number.isInteger(rawPage) && rawPage >= firstPage && rawPage <= lastPage ? rawPage : firstExamplePage;
let activeExample = '';
let selected: BookExample | undefined;
let documentVersion = 0;
let pageVersion = 0;
let localPdf: Awaited<ReturnType<typeof import('./eop-pdf').openLocalPdf>> | undefined;
let pdfModule: typeof import('./eop-pdf') | undefined;

function setSelection(entry?: BookExample) {
  selected = entry;
  if (entry?.example && activeExample !== entry.example) {
    activeExample = entry.example;
    const url = new URL(reader.dataset.labPath!, location.origin);
    url.searchParams.set('snippet', entry.example);
    labLink.href = url.href;
    url.searchParams.set('embed', 'book');
    lab.src = url.href;
  }

  const showLab = Boolean(activeExample && (!entry || entry.example));
  lab.hidden = !showLab;
  labLink.hidden = !showLab;
  labTitle.textContent = showLab ? activeExample : entry ? localizeLabel(entry.label) : (es ? 'Laboratorio' : 'Algorithm lab');
  notice.hidden = showLab;
  notice.textContent = entry
    ? (es ? 'Este algoritmo todavía no está disponible en el lab.' : 'This algorithm is not available in the lab yet.')
    : (es ? 'Esta página no tiene un ejemplo asociado.' : 'This page has no associated example.');
  for (const button of exampleList.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.label === entry?.label));
  }
}

function localizeLabel(label: string) {
  if (!es) return label;
  return ({ '2.1 · 32-bit addition': '2.1 · Suma de 32 bits', 'distance (transformation)': 'distance (transformación)', '2.6 · Actions': '2.6 · Acciones' } as Record<string, string>)[label] ?? label;
}

function renderExamples() {
  const entries = chapterPages[page] ?? [];
  exampleList.replaceChildren();
  for (const entry of entries) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.label = entry.label;
    button.append(localizeLabel(entry.label));
    if (!entry.example) {
      const badge = document.createElement('small');
      badge.textContent = es ? 'Pendiente' : 'Pending';
      button.append(badge);
    }
    button.addEventListener('click', () => setSelection(entry));
    exampleList.append(button);
  }
  if (!entries.length) {
    const text = document.createElement('p');
    text.textContent = es ? 'Sin algoritmos asociados a esta página.' : 'No algorithms are linked on this page.';
    exampleList.append(text);
  }

  const same = entries.find(entry => entry.label === selected?.label);
  if (same) setSelection(same);
  else if (!entries.length) setSelection();
  else if (!activeExample || entries.every(entry => !entry.example)) setSelection(entries.find(entry => entry.example) ?? entries[0]);
  else setSelection(entries.find(entry => entry.example === activeExample));
}

async function showPdf() {
  const version = ++pageVersion;
  const url = `${officialPdf}#page=${pdfPage(page)}`;
  pdfLink.href = url;
  if (!localPdf || !pdfModule) {
    localPage.hidden = true;
    localPage.inert = false;
    localPage.removeAttribute('aria-busy');
    officialFrame.hidden = false;
    officialFrame.src = `${url}&toolbar=0&navpanes=0&view=FitH`;
    return;
  }
  localPage.inert = true;
  localPage.setAttribute('aria-busy', 'true');
  try {
    const rendered = await pdfModule.renderBookPage(localPdf.pdf, page, chapterPages[page] ?? [], setSelection);
    if (pageVersion !== version) return;
    localPage.replaceChildren(rendered);
    localPage.hidden = false;
    officialFrame.hidden = true;
    officialFrame.removeAttribute('src');
    pdfStage.scrollTop = 0;
  } catch {
    if (version !== pageVersion) return;
    const failed = localPdf;
    localPdf = undefined;
    await failed?.close();
    localStatus.textContent = es ? 'La página local no se pudo abrir. Mostramos el PDF oficial.' : 'The local page could not be opened. Showing the official PDF.';
    await showPdf();
  } finally {
    if (version === pageVersion) {
      localPage.inert = false;
      localPage.removeAttribute('aria-busy');
    }
  }
}

function setPage(value: number) {
  page = value;
  pagePicker.value = String(page);
  previous.disabled = page === firstPage;
  next.disabled = page === lastPage;
  const url = new URL(location.href);
  url.searchParams.set('page', String(page));
  history.replaceState(null, '', url);
  renderExamples();
  void showPdf();
}

previous.addEventListener('click', () => setPage(page - 1));
next.addEventListener('click', () => setPage(page + 1));
pagePicker.addEventListener('change', () => setPage(Number(pagePicker.value)));
fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  const version = ++documentVersion;
  localStatus.textContent = es ? 'Abriendo el PDF…' : 'Opening the PDF…';
  try {
    pdfModule ??= await import('./eop-pdf');
    const opened = await pdfModule.openLocalPdf(file);
    if (version !== documentVersion) {
      await opened.close();
      return;
    }
    const old = localPdf;
    localPdf = opened;
    const rendering = showPdf();
    await old?.close();
    await rendering;
    if (version === documentVersion && localPdf === opened) {
      localStatus.textContent = es ? 'Modo interactivo activo. Los nombres resaltados se pueden pulsar.' : 'Interactive mode is on. Select a highlighted name.';
    }
  } catch {
    if (version === documentVersion) {
      localStatus.textContent = es ? 'Elegí el PDF de la edición oficial enlazado arriba.' : 'Choose the official edition PDF linked above.';
    }
  } finally {
    if (version === documentVersion) fileInput.value = '';
  }
});

setPage(page);
