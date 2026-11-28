import { chapterPages, firstExamplePage, firstPage, lastPage, officialPdf, pdfPage, type BookExample } from './eop-pilot';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const reader = byId<HTMLElement>('eop-reader');
const layout = reader.querySelector<HTMLElement>('.reader-layout')!;
const viewButtons = reader.querySelectorAll<HTMLButtonElement>('[data-reader-view]');
const bookPanel = layout.querySelector<HTMLElement>('.book')!;
const labPanel = layout.querySelector<HTMLElement>('.analyzer')!;
const es = document.documentElement.lang === 'es';
const pagePicker = byId<HTMLSelectElement>('book-page');
const previous = byId<HTMLButtonElement>('book-previous');
const next = byId<HTMLButtonElement>('book-next');
const pdfStage = byId<HTMLDivElement>('book-pdf-stage');
const pdfPages = Array.from(pdfStage.querySelectorAll<HTMLDivElement>('.book-pdf-page'));
const pdfLink = byId<HTMLAnchorElement>('book-official');
const exampleList = byId<HTMLDivElement>('book-examples');
const lab = byId<HTMLIFrameElement>('book-lab');
const notice = byId<HTMLParagraphElement>('book-notice');

const rawPage = Number(new URL(location.href).searchParams.get('page'));
let page = Number.isInteger(rawPage) && rawPage >= firstPage && rawPage <= lastPage ? rawPage : firstExamplePage;
let activeExample = '';

type ReaderView = 'split' | 'pdf' | 'lab';

function setView(view: ReaderView) {
  if (layout.dataset.view === view) return;
  const sheet = pdfPages[page - firstPage];
  const before = sheet.getBoundingClientRect();
  const offset = (pdfStage.getBoundingClientRect().top - before.top) / before.height;
  layout.dataset.view = view;
  bookPanel.inert = view === 'lab';
  labPanel.inert = view === 'pdf';
  const after = sheet.getBoundingClientRect();
  pdfStage.scrollTop += after.top - pdfStage.getBoundingClientRect().top + after.height * offset;
  for (const button of viewButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.readerView === view));
  }
}

for (const button of viewButtons) {
  button.addEventListener('click', () => setView(button.dataset.readerView as ReaderView));
}
layout.querySelector('[data-focus-panel="pdf"]')?.addEventListener('click', () => setView('pdf'));
layout.querySelector('[data-focus-panel="lab"]')?.addEventListener('click', () => setView('lab'));
pdfStage.addEventListener('click', () => setView('pdf'));
labPanel.addEventListener('click', () => setView('lab'));

function setSelection(entry?: BookExample, keepCurrent = false) {
  if (entry?.example && activeExample !== entry.example) {
    activeExample = entry.example;
    const url = new URL(reader.dataset.labPath!, location.origin);
    url.searchParams.set('snippet', entry.example);
    url.searchParams.set('embed', 'book');
    lab.src = url.href;
  } else if (!entry && !keepCurrent && activeExample) {
    activeExample = '';
    lab.removeAttribute('src');
  }

  const showLab = Boolean(entry?.example || (keepCurrent && activeExample));
  lab.hidden = !showLab;
  notice.hidden = showLab || !entry;
  notice.textContent = notice.hidden
    ? ''
    : (es ? 'Este algoritmo todavía no está disponible en el lab.' : 'This algorithm is not available in the lab yet.');
  for (const button of exampleList.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.label === entry?.label));
  }
}

function localizeLabel(label: string) {
  if (!es) return label;
  return ({ '2.1 · 32-bit addition': '2.1 · Suma de 32 bits', 'distance (transformation)': 'distance (transformación)', '2.6 · Actions': '2.6 · Acciones' } as Record<string, string>)[label] ?? label;
}

function isDebugging() {
  const labState = lab.contentDocument?.body?.dataset;
  return labState?.mode === 'executing' || labState?.startingSession === 'true';
}

const labModeObserver = new MutationObserver(() => {
  if (activeExample && !chapterPages[page]?.length && !isDebugging()) setSelection();
});
lab.addEventListener('load', () => {
  labModeObserver.disconnect();
  const body = lab.contentDocument?.body;
  if (activeExample && body) {
    labModeObserver.observe(body, { attributeFilter: ['data-mode', 'data-starting-session'] });
    body.addEventListener('click', () => setView('lab'));
  }
});

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

  if (isDebugging()) {
    setSelection(entries.find(entry => entry.example === activeExample), true);
  } else {
    setSelection(entries.find(entry => entry.example) ?? entries[0]);
  }
}

function showPdf() {
  pdfLink.href = `${officialPdf}#page=${pdfPage(page)}`;
  for (const sheet of pdfPages) {
    const number = Number(sheet.dataset.page);
    if (number === page) sheet.setAttribute('aria-current', 'page');
    else sheet.removeAttribute('aria-current');

    // Give each page its own native frame. The outer panel owns scrolling.
    const frame = sheet.querySelector('iframe')!;
    if (Math.abs(number - page) <= 1) {
      if (!frame.hasAttribute('src')) frame.src = frame.dataset.src!;
    } else if (frame.hasAttribute('src')) {
      frame.removeAttribute('src');
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
  showPdf();
}

function jumpToPage(value: number) {
  const sheet = pdfPages[value - firstPage];
  if (!sheet) return;
  setPage(value);
  pdfStage.scrollTop += sheet.getBoundingClientRect().top - pdfStage.getBoundingClientRect().top;
}

let scrollFrame = 0;
pdfStage.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const focus = pdfStage.getBoundingClientRect().top + pdfStage.clientHeight * 0.3;
    const visible = pdfPages.find(sheet => sheet.getBoundingClientRect().bottom >= focus);
    const value = visible ? Number(visible.dataset.page) : lastPage;
    if (value !== page) setPage(value);
  });
}, { passive: true });

previous.addEventListener('click', () => jumpToPage(page - 1));
next.addEventListener('click', () => jumpToPage(page + 1));
pagePicker.addEventListener('change', () => jumpToPage(Number(pagePicker.value)));
jumpToPage(page);
