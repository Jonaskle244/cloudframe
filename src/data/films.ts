export interface Film {
  id: string;
  title: string;
  region: string;
  /** Landscape-Clip (16:9), frame-genau re-encoded liegt nicht zwingend vor — hier reicht normale Wiedergabe. */
  src: string;
  altitude?: string;
  resolution?: string;
  /** Kurze atmosphärische Zeile fürs Now-Playing-Panel. PLATZHALTER — von Jonas nachfeilen. */
  caption?: string;
}

export const films: Film[] = [
  {
    id: 'vent',
    title: 'Vent',
    region: 'Tirol, Österreich',
    src: '/videos/oetz-talflug-1080p-crf26.mp4',
    altitude: '~2.700 m NN',
    resolution: '4K · 30 FPS',
    caption: 'Hoch über dem Ötztal — stiller Gletscherwind, kein Mensch weit und breit.',
  },
  {
    id: 'prag',
    title: 'Prag',
    region: 'Tschechien',
    src: '/videos/prag-tower-1080p-crf26.mp4',
    altitude: '~350 m NN',
    resolution: '4K · 30 FPS',
    caption: 'Ein ruhiger Bogen über die Dächer — der Aussichtsturm zum Greifen nah.',
  },
  {
    id: 'desenberg',
    title: 'Desenberg',
    region: 'Warburg, Deutschland',
    src: '/videos/hero-desenberg-1080p-crf26.mp4',
    altitude: '~378 m NN',
    resolution: '4K · 30 FPS',
    caption: 'Der einzelne Basaltkegel in der Börde — ein langsam gezogener Kreis.',
  },
];
