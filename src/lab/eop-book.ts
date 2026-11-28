import references from './eop-examples.json';

export const officialPdf = 'https://elementsofprogramming.com/eop.pdf';
export const firstPage = -13;
export const lastPage = 265;
export const firstExamplePage = 21;

export const sections = [
  [-13, "Front matter", "Preliminares"],
  [1, "1 · Foundations", "1 · Fundamentos"],
  [15, "2 · Transformations and Their Orbits", "2 · Transformaciones y sus órbitas"],
  [29, "3 · Associative Operations", "3 · Operaciones asociativas"],
  [47, "4 · Linear Orderings", "4 · Ordenamientos lineales"],
  [63, "5 · Ordered Algebraic Structures", "5 · Estructuras algebraicas ordenadas"],
  [87, "6 · Iterators", "6 · Iteradores"],
  [113, "7 · Coordinate Structures", "7 · Estructuras de coordenadas"],
  [131, "8 · Coordinates with Mutable Successors", "8 · Coordenadas con sucesores mutables"],
  [147, "9 · Copying", "9 · Copia"],
  [167, "10 · Rearrangements", "10 · Reordenamientos"],
  [189, "11 · Partition and Merging", "11 · Partición y fusión"],
  [207, "12 · Composite Objects", "12 · Objetos compuestos"],
  [225, "Afterword", "Epílogo"],
  [229, "A · Mathematical Notation", "A · Notación matemática"],
  [231, "B · Programming Language", "B · Lenguaje de programación"],
  [241, "Bibliography", "Bibliografía"],
  [247, "Index", "Índice"],
] as const;

export const pageLabel = (page: number) => page > 0
  ? String(page)
  : ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv"][page - firstPage];

export interface BookExample {
  label: string;
  example?: string;
  es?: string;
}

const examples = (...names: string[]): BookExample[] =>
  names.map(name => ({ label: name, example: name }));

const pilotPages: Partial<Record<number, BookExample[]>> = {
  16: [
    { label: 'abs(x)', example: 'abs' },
    { label: 'euclidean_norm(x, y)', example: 'euclidean_norm' },
    { label: 'euclidean_norm(x, y, z)', example: 'euclidean_norm_3' },
  ],
  17: [{ label: '2.1 · 32-bit addition', es: '2.1 · Suma de 32 bits', example: 'addition_defined_int32' }],
  18: examples('power_unary'),
  19: [{ label: 'distance (transformation)', es: 'distance (transformación)' }],
  21: examples('collision_point'),
  22: examples('collision_point', 'terminating'),
  23: examples('collision_point_nonterminating_orbit'),
  24: examples('circular_nonterminating_orbit', 'circular'),
  25: examples('convergent_point', 'connection_point_nonterminating_orbit'),
  26: [
    ...examples('connection_point'),
    { label: '2.2 · orbits_intersect', example: 'orbits_intersect' },
    { label: '2.3 · convergent_point_guarded', example: 'convergent_point_guarded' },
  ],
  27: examples('orbit_structure_nonterminating_orbit', 'orbit_structure'),
  28: [{ label: '2.6 · Actions', es: '2.6 · Acciones' }],
};

// In the authors' edition, the PDF's page 15 is printed page 1.
export const pdfPage = (page: number) => page + 14;

const pending = (...names: string[]): BookExample[] => names.map(label => ({ label }));

// Listings and programming exercises without a matching example in the lab.
const pendingPages: Partial<Record<number, BookExample[]>> = {
  31: pending('power_left_associated', 'power_right_associated'),
  32: pending('power_0'),
  33: pending('power_1', 'power_accumulate_0'),
  34: pending('power_accumulate_1', 'power_accumulate_2'),
  35: pending('power_accumulate_3', 'power_accumulate_4'),
  36: pending('power_accumulate_positive_0', 'power_accumulate_5', 'power_2'),
  37: pending('power_3'),
  38: [{ label: '3.2 · Integral specializations', es: '3.2 · Especializaciones para enteros' }],
  39: pending('power_accumulate', 'power (positive exponent)'),
  40: pending('power (with identity)'),
  43: pending('fibonacci_matrix_multiply'),
  44: [...pending('fibonacci'), { label: '3.3 · Accumulate-based rewrites', es: '3.3 · Variantes con acumulación' }],
  61: [{ label: '4.8 · Three-way comparison', es: '4.8 · Comparación de tres vías' }],
  115: pending('weight_recursive', 'height_recursive'),
  116: pending('traverse_nonempty'),
  117: pending('is_left_successor'),
  118: pending('is_right_successor', 'traverse_step'),
  119: pending('reachable', 'weight'),
  120: [...pending('height'), { label: '7.2 · Weight by visit kind', es: '7.2 · Peso por tipo de visita' }],
  121: [{ label: '7.3 · Acyclic graph check', es: '7.3 · Comprobación de grafo acíclico' }],
  123: pending('bifurcate_isomorphic_nonempty', 'bifurcate_isomorphic'),
  125: pending('bifurcate_equivalent_nonempty'),
  126: pending('bifurcate_equivalent'),
  128: pending('bifurcate_compare', '7.6 · bifurcate_compare_nonempty'),
  133: pending('advance_tail'),
  134: pending('find_last'),
  135: pending('split_linked'),
  136: pending('combine_linked_nonempty'),
  137: [{ label: '8.2 · combine_linked' }],
  138: pending('reverse_append', 'partition_linked'),
  139: pending('merge_linked_nonempty'),
  140: pending('sort_linked_nonempty_n'),
  141: [{ label: '8.4 · Linked unique', es: '8.4 · unique sobre rangos enlazados' }],
  143: pending('tree_rotate', 'traverse_rotating'),
  144: pending('weight_rotating'),
  145: pending('traverse_phased_rotating'),
  171: [
    { label: '10.4 · Rearrangement with marking', es: '10.4 · Reordenamiento con marcas' },
    { label: '10.5 · Rearrangement with constant storage', es: '10.5 · Reordenamiento con espacio constante' },
  ],
  208: [{ label: '12.1 · pair ordering', es: '12.1 · Orden de pair' }, { label: '12.2 · triple' }],
  210: [{ label: '12.3 · Array comparisons', es: '12.3 · Comparaciones de arrays' }, { label: '12.4 · Array ordering', es: '12.4 · Orden de arrays' }],
  211: [{ label: '12.5 · Empty array', es: '12.5 · Array vacío' }],
  214: [{ label: '12.6 · Property projection', es: '12.6 · Proyección de una propiedad' }],
  219: [{ label: '12.8 · Capacity and reserve', es: '12.8 · Capacidad y reserva' }],
  223: [{ label: '12.9 · Iterator adapter', es: '12.9 · Adaptador de iteradores' }],
};

const referencedPages: Partial<Record<number, string[]>> = references;

export function pageExamples(page: number): BookExample[] {
  const curated = pilotPages[page] ?? [];
  const cited = (referencedPages[page] ?? []).filter(
    name => !curated.some(entry => entry.example === name),
  );
  return [...curated, ...examples(...cited), ...(pendingPages[page] ?? [])];
}
