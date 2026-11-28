import { firstExamplePage, firstPage, lastPage, officialPdf, pageExamples, pageLabel, pdfPage, sections, type BookExample } from './eop-book';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const reader = byId<HTMLElement>('eop-reader');
const layout = reader.querySelector<HTMLElement>('.reader-layout')!;
const viewButtons = reader.querySelectorAll<HTMLButtonElement>('[data-reader-view]');
const bookPanel = layout.querySelector<HTMLElement>('.book')!;
const labPanel = layout.querySelector<HTMLElement>('.analyzer')!;
const es = document.documentElement.lang === 'es';
const pagePicker = byId<HTMLSelectElement>('book-page');
const sectionPicker = byId<HTMLSelectElement>('book-section');
const pageStatus = byId<HTMLSpanElement>('book-page-status');
const navigatorDialog = byId<HTMLDialogElement>('book-navigator');
const algorithmSearch = byId<HTMLInputElement>('book-algorithm');
const results = byId<HTMLUListElement>('book-nav-results');
const noResults = byId<HTMLParagraphElement>('book-nav-empty');
const previous = byId<HTMLButtonElement>('book-previous');
const next = byId<HTMLButtonElement>('book-next');
const pdfStage = byId<HTMLDivElement>('book-pdf-stage');
const pdfPages = Array.from(pdfStage.querySelectorAll<HTMLDivElement>('.book-pdf-page'));
const pdfLink = byId<HTMLAnchorElement>('book-official');
const exampleList = byId<HTMLDivElement>('book-examples');
const lab = byId<HTMLIFrameElement>('book-lab');
const notice = byId<HTMLParagraphElement>('book-notice');

const rawPage = Number(new URL(location.href).searchParams.get('page') ?? firstExamplePage);
let page = Number.isInteger(rawPage) && rawPage >= firstPage && rawPage <= lastPage ? rawPage : firstExamplePage;
let activeExample = '';
let visiblePage = firstPage - 1;
const pdfFrames = new Map<number, HTMLIFrameElement>();

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
  } else if (!entry?.example && !keepCurrent && activeExample) {
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

function isDebugging() {
  const labState = lab.contentDocument?.body?.dataset;
  return labState?.mode === 'executing' || labState?.startingSession === 'true';
}

const labModeObserver = new MutationObserver(() => {
  if (activeExample && !pageExamples(page).length && !isDebugging()) setSelection();
});
lab.addEventListener('load', () => {
  labModeObserver.disconnect();
  const body = lab.contentDocument?.body;
  if (activeExample && body) {
    labModeObserver.observe(body, { attributeFilter: ['data-mode', 'data-starting-session'] });
    body.addEventListener('click', () => setView('lab'));
  }
});

function renderExamples(selection?: BookExample) {
  const entries = pageExamples(page);
  exampleList.replaceChildren();
  for (const entry of entries) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.label = entry.label;
    button.append(es ? entry.es ?? entry.label : entry.label);
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

  if (selection) {
    setSelection(selection);
  } else if (isDebugging()) {
    setSelection(entries.find(entry => entry.example === activeExample), true);
  } else {
    setSelection(entries.find(entry => entry.example) ?? entries[0]);
  }
}

function showPdf() {
  pdfLink.href = `${officialPdf}#page=${pdfPage(page)}`;
  pdfPages[visiblePage - firstPage]?.removeAttribute('aria-current');
  pdfPages[page - firstPage].setAttribute('aria-current', 'page');
  visiblePage = page;

  for (const [number, frame] of pdfFrames) {
    if (Math.abs(number - page) <= 1) continue;
    frame.remove();
    pdfFrames.delete(number);
  }

  // Mount just the current and adjacent native PDF frames. The outer panel scrolls.
  for (let number = Math.max(firstPage, page - 1); number <= Math.min(lastPage, page + 1); ++number) {
    if (pdfFrames.has(number)) continue;
    const frame = document.createElement('iframe');
    frame.title = `${es ? 'Página' : 'Page'} ${pageLabel(number)}`;
    frame.tabIndex = -1;
    frame.src = `${officialPdf}#page=${pdfPage(number)}&toolbar=0&navpanes=0&view=Fit`;
    pdfPages[number - firstPage].append(frame);
    pdfFrames.set(number, frame);
  }
}

function setPage(value: number, selection?: BookExample) {
  page = value;
  pagePicker.value = String(page);
  pageStatus.textContent = `${es ? 'Página' : 'Page'} ${pageLabel(page)}`;
  sectionPicker.value = String(sections.findLast(([start]) => start <= page)![0]);
  previous.disabled = page === firstPage;
  next.disabled = page === lastPage;
  const url = new URL(location.href);
  url.searchParams.set('page', String(page));
  history.replaceState(null, '', url);
  renderExamples(selection);
  showPdf();
}

function jumpToPage(value: number, selection?: BookExample) {
  const sheet = pdfPages[value - firstPage];
  if (!sheet) return;
  setPage(value, selection);
  pdfStage.scrollTop += sheet.getBoundingClientRect().top - pdfStage.getBoundingClientRect().top;
}

let scrollFrame = 0;
pdfStage.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const focus = pdfStage.getBoundingClientRect().top + pdfStage.clientHeight * 0.3;
    let low = 0;
    let high = pdfPages.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (pdfPages[middle].getBoundingClientRect().bottom < focus) low = middle + 1;
      else high = middle;
    }
    const value = firstPage + low;
    if (value !== page) setPage(value);
  });
}, { passive: true });

previous.addEventListener('click', () => jumpToPage(page - 1));
next.addEventListener('click', () => jumpToPage(page + 1));
function navigateTo(value: number, selection?: BookExample) {
  navigatorDialog.close();
  if ((!selection && layout.dataset.view === 'lab') || (selection && layout.dataset.view === 'pdf')) {
    setView('split');
  }
  jumpToPage(value, selection);
}

for (const picker of [pagePicker, sectionPicker]) {
  picker.form?.addEventListener('submit', event => {
    event.preventDefault();
    navigateTo(Number(picker.value));
  });
}

const normalizeName = (name: string) => name.normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[\s_-]+/g, ' ')
  .trim();

const algorithmIndex = new Map<string, { page: number; entry: BookExample; name: string }>();
for (let number = 1; number <= lastPage; ++number) {
  for (const entry of pageExamples(number)) {
    const key = entry.example ?? entry.label;
    if (!algorithmIndex.has(key)) {
      algorithmIndex.set(key, { page: number, entry, name: normalizeName(entry.example ?? entry.label) });
    }
  }
}

function searchAlgorithms() {
  results.replaceChildren();
  const query = normalizeName(algorithmSearch.value);
  noResults.hidden = true;
  if (!query) return;
  const rank = (name: string) => name === query ? 0 : name.startsWith(query) ? 1 : 2;
  const matches = [...algorithmIndex.values()].filter(({ entry, name }) =>
    name.includes(query) || normalizeName(es ? entry.es ?? entry.label : entry.label).includes(query),
  ).sort((left, right) => rank(left.name) - rank(right.name) || left.name.localeCompare(right.name));
  noResults.hidden = matches.length > 0;
  for (const match of matches) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.append(es ? match.entry.es ?? match.entry.label : match.entry.label);
    const detail = document.createElement('small');
    const pending = match.entry.example ? '' : (es ? ' · Pendiente' : ' · Pending');
    detail.textContent = `${es ? 'pág.' : 'p.'} ${pageLabel(match.page)}${pending}`;
    button.append(detail);
    button.addEventListener('click', () => navigateTo(match.page, match.entry));
    item.append(button);
    results.append(item);
  }
  results.scrollTop = 0;
}

byId('book-navigate').addEventListener('click', () => {
  pagePicker.value = String(page);
  sectionPicker.value = String(sections.findLast(([start]) => start <= page)![0]);
  navigatorDialog.showModal();
});
navigatorDialog.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.isComposing) return;
  event.preventDefault();
  navigatorDialog.close();
});
algorithmSearch.addEventListener('input', searchAlgorithms);
algorithmSearch.addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.isComposing) return;
  event.preventDefault();
  results.querySelector('button')?.click();
});
jumpToPage(page);
