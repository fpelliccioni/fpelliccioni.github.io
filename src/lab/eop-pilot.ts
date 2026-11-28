export const officialPdf = 'https://elementsofprogramming.com/eop.pdf';
export const firstPage = 15;
export const lastPage = 28;
export const firstExamplePage = 21;

export interface BookExample {
  label: string;
  example?: string;
  marker?: string;
}

const examples = (...names: string[]): BookExample[] =>
  names.map(name => ({ label: name, example: name }));

export const chapterPages: Partial<Record<number, BookExample[]>> = {
  17: [{ label: '2.1 · 32-bit addition', marker: 'Exercise 2.1' }],
  18: examples('power_unary'),
  19: [{ label: 'distance (transformation)', marker: 'DistanceType(F) distance(' }],
  21: examples('collision_point'),
  22: examples('collision_point', 'terminating'),
  23: examples('collision_point_nonterminating_orbit'),
  24: examples('circular_nonterminating_orbit', 'circular'),
  25: examples('convergent_point', 'connection_point_nonterminating_orbit'),
  26: [
    ...examples('connection_point'),
    { label: '2.2 · orbits_intersect', example: 'orbits_intersect', marker: 'Exercise 2.2' },
    { label: '2.3 · convergent_point_guarded', example: 'convergent_point_guarded', marker: 'Exercise 2.3' },
  ],
  27: examples('orbit_structure_nonterminating_orbit', 'orbit_structure'),
  28: [{ label: '2.6 · Actions', marker: 'Exercise 2.6' }],
};

// In the authors' edition, the PDF's page 15 is printed page 1.
export const pdfPage = (page: number) => page + 14;
