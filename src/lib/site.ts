import { getCollection, type CollectionEntry } from 'astro:content';
export type Entry = CollectionEntry<'blog'>;
export type Lang = 'en' | 'es';
export const SITE = 'https://componentsprogramming.com';
export const NAME = 'Components Programming';
export const author = 'Fernando Pelliccioni';
export const labels = {
  en: {
    home: '/',
    about: '/about-me/',
    contact: '/contact/',
    donate: '/donate/',
    navAbout: 'About',
    navContact: 'Contact',
    navDonate: 'Support',
    navArticles: 'Articles',
    navAlgorithms: 'Algorithm lab',
    description: 'Notes on programming, algorithms and the ideas behind better software.',
    eyebrow: 'A notebook by Fernando Pelliccioni',
    hero: ['Algorithms.', 'Abstractions.', 'Better software.'],
    intro:
      'Exploring the foundations of programming, one idea at a time. C++, generic programming, mathematics, and the craft of building efficient software.',
    latest: 'Latest writing',
    archive: 'The archive',
    search: 'Find an article',
    empty: 'No articles match your search.',
    all: 'All articles',
    read: 'Read article',
    published: 'Published',
    minutes: 'min read',
    back: 'Back to articles',
    contents: 'On this page',
    share: 'Share this article',
    comments: 'Load comments',
    commentsNote: 'Comments are hosted by Disqus. Load them to join the conversation.',
    rss: 'Subscribe via RSS',
    footer: 'Programming, from first principles.',
    aboutLine: 'Software engineer. C++ practitioner. Member of WG14 & WG21.',
    featured: 'Latest article',
    series: 'A starting point',
    seriesTitle: 'Writing min function',
    seriesDescription:
      'Five articles on concepts, ordering, const-correctness, and algorithm stability.',
    labTitle: 'See the algorithms at work.',
    labDescription:
      'Step through algorithms and explore how they behave in the interactive analyzer.',
    labLink: 'Open algorithm lab',
    source: 'Source on GitHub',
    menu: 'Menu',
    theme: 'Toggle color theme',
  },
  es: {
    home: '/inicio/',
    about: '/acerca-de/',
    contact: '/contacto/',
    donate: '/donaciones/',
    navAbout: 'Acerca de',
    navContact: 'Contacto',
    navDonate: 'Apoyar',
    navArticles: 'Artículos',
    navAlgorithms: 'Laboratorio',
    description: 'Notas sobre programación, algoritmos y las ideas detrás de un mejor software.',
    eyebrow: 'Un cuaderno de Fernando Pelliccioni',
    hero: ['Algoritmos.', 'Abstracciones.', 'Mejor software.'],
    intro:
      'Explorando los fundamentos de la programación, una idea a la vez. C++, programación genérica, matemáticas y el oficio de construir software eficiente.',
    latest: 'Últimos artículos',
    archive: 'El archivo',
    search: 'Buscar un artículo',
    empty: 'No hay artículos que coincidan con tu búsqueda.',
    all: 'Todos los artículos',
    read: 'Leer artículo',
    published: 'Publicado',
    minutes: 'min de lectura',
    back: 'Volver a los artículos',
    contents: 'En este artículo',
    share: 'Compartir artículo',
    comments: 'Cargar comentarios',
    commentsNote:
      'Los comentarios están alojados en Disqus. Cargalos para participar en la conversación.',
    rss: 'Suscribirse por RSS',
    footer: 'Programación, desde los fundamentos.',
    aboutLine: 'Ingeniero de software. Programador de C++. Miembro de WG14 y WG21.',
    featured: 'Artículo más reciente',
    series: 'Un punto de partida',
    seriesTitle: 'Writing min function',
    seriesDescription:
      'Cinco artículos sobre conceptos, orden, const-correctness y estabilidad de algoritmos (en inglés).',
    labTitle: 'Los algoritmos, en acción.',
    labDescription:
      'Recorré los algoritmos paso a paso y explorá su comportamiento con el analizador interactivo.',
    labLink: 'Abrir el laboratorio',
    source: 'Código en GitHub',
    menu: 'Menú',
    theme: 'Cambiar tema de color',
  },
};
export const absolute = (path: string) => new URL(path, SITE).href;
export const plain = (body: string) =>
  body
    .replace(/\\\r?\n/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
export const summary = (entry: Entry) => {
  const text =
    entry.data.description || plain(entry.body || '') || labels[entry.data.lang].description;
  return text.length > 220 ? text.slice(0, 220).replace(/\s+\S*$/, '') + '…' : text;
};
export const readingTime = (entry: Entry) =>
  Math.max(1, Math.ceil(plain(entry.body || '').split(/\s+/).length / 220));
export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(date);
export const publicEntries = async () =>
  (await getCollection('blog'))
    .filter((p) => p.data.published && p.data.date <= new Date())
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
export const translationsFor = (entry: Entry, entries: Entry[]) =>
  entry.data.translationKey
    ? entries.filter((p) => p.data.translationKey === entry.data.translationKey)
    : [];
