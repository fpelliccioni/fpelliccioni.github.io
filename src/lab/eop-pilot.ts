export const officialPdf = 'https://elementsofprogramming.com/eop.pdf';
export const firstPage = 15;
export const lastPage = 28;
export const firstExamplePage = 21;

export interface BookExample {
  label: string;
  example?: string;
}

const examples = (...names: string[]): BookExample[] =>
  names.map(name => ({ label: name, example: name }));

export const chapterPages: Partial<Record<number, BookExample[]>> = {
  16: [
    { label: 'abs(x)', example: 'abs' },
    { label: 'euclidean_norm(x, y)', example: 'euclidean_norm' },
    { label: 'euclidean_norm(x, y, z)', example: 'euclidean_norm_3' },
  ],
  17: [{ label: '2.1 · 32-bit addition', example: 'addition_defined_int32' }],
  18: examples('power_unary'),
  19: [{ label: 'distance (transformation)' }],
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
  28: [{ label: '2.6 · Actions' }],
};

// In the authors' edition, the PDF's page 15 is printed page 1.
export const pdfPage = (page: number) => page + 14;
