export interface Film {
  id: string;
  title: string;
  region: string;
  /** Landscape-Clip (16:9), frame-genau re-encoded liegt nicht zwingend vor — hier reicht normale Wiedergabe. */
  src: string;
  altitude?: string;
  resolution?: string;
}

export const films: Film[] = [
  {
    id: 'vent',
    title: 'Vent',
    region: 'Tirol, Österreich',
    src: '/videos/oetz-talflug-1080p-crf26.mp4',
    altitude: '~2.700 m NN',
    resolution: '4K · 30 FPS',
  },
  {
    id: 'prag',
    title: 'Prag',
    region: 'Tschechien',
    src: '/videos/prag-tower-1080p-crf26.mp4',
    altitude: '~350 m NN',
    resolution: '4K · 30 FPS',
  },
  {
    id: 'desenberg',
    title: 'Desenberg',
    region: 'Warburg, Deutschland',
    src: '/videos/hero-desenberg-1080p-crf26.mp4',
    altitude: '~378 m NN',
    resolution: '4K · 30 FPS',
  },
];
