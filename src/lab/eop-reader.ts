import { chapterPages, firstExamplePage, firstPage, lastPage, officialPdf, pdfPage, type BookExample } from './eop-pilot';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const reader = byId<HTMLElement>('eop-reader');
const es = document.documentElement.lang === 'es';
const pagePicker = byId<HTMLSelectElement>('book-page');
const previous = byId<HTMLButtonElement>('book-previous');
const next = byId<HTMLButtonElement>('book-next');
let officialFrame = byId<HTMLIFrameElement>('book-pdf');
const pdfStage = byId<HTMLDivElement>('book-pdf-stage');
const pdfLink = byId<HTMLAnchorElement>('book-official');
const exampleList = byId<HTMLDivElement>('book-examples');
const lab = byId<HTMLIFrameElement>('book-lab');
const labLink = byId<HTMLAnchorElement>('book-open-lab');
const labTitle = byId<HTMLElement>('book-lab-title');
const notice = byId<HTMLParagraphElement>('book-notice');

const rawPage = Number(new URL(location.href).searchParams.get('page'));
let page = Number.isInteger(rawPage) && rawPage >= firstPage && rawPage <= lastPage ? rawPage : firstExamplePage;
let activeExample = '';
let selected: BookExample | undefined;

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

function showPdf() {
  const url = `${officialPdf}#page=${pdfPage(page)}`;
  pdfLink.href = url;
  // Native PDF viewers may ignore fragment changes within an existing frame.
  const nextFrame = officialFrame.cloneNode(false) as HTMLIFrameElement;
  nextFrame.src = `${url}&toolbar=0&navpanes=0&view=FitH`;
  officialFrame.replaceWith(nextFrame);
  officialFrame = nextFrame;
  pdfStage.scrollTop = 0;
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

previous.addEventListener('click', () => setPage(page - 1));
next.addEventListener('click', () => setPage(page + 1));
pagePicker.addEventListener('change', () => setPage(Number(pagePicker.value)));

setPage(page);
