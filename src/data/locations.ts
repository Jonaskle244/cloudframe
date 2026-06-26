export interface Location {
  id: string;
  index: number;
  name: string;
  region: string;
  coords: [number, number]; // [longitude, latitude]
  altitude: string;
  resolution?: string;
  portraitVideo?: string;
  portraitImage?: string;
}

export const locations: Location[] = [
  {
    id: 'koeterberg',
    index: 1,
    name: 'Köterberg',
    region: 'NRW, Deutschland',
    coords: [9.2394, 51.9467],
    altitude: '~496 m NN',
    portraitImage: '/images/koeterberg-luegde.jpg',
  },
  {
    id: 'falkenburg',
    index: 2,
    name: 'Falkenburg',
    region: 'NRW, Deutschland',
    coords: [8.8802, 51.8757],
    altitude: '~368 m NN',
    portraitImage: '/images/falkenburg-detmold.jpg',
  },
  {
    id: 'reschensee',
    index: 3,
    name: 'Reschensee',
    region: 'Südtirol, Italien',
    coords: [10.5364, 46.8110],
    altitude: '~1.491 m NN',
    portraitImage: '/images/kirchturm-reschensee.jpg',
  },
  {
    id: 'acherkogel',
    index: 4,
    name: 'Acherkogel',
    region: 'Tirol, Österreich',
    coords: [10.9500, 47.1833],
    altitude: '~3.007 m NN',
    resolution: '4K · Hyperlapse',
    portraitVideo: '/videos/acherkogel-oetz-hyperlapse.mp4',
  },
  {
    id: 'symi',
    index: 5,
    name: 'Symi',
    region: 'Ägäis, Griechenland',
    coords: [27.8333, 36.5833],
    altitude: '~15 m NN',
    resolution: '4K · 30 FPS',
    portraitVideo: '/videos/insel-symi-rhodos.mp4',
  },
  {
    id: 'rhodos',
    index: 6,
    name: 'Rhodos',
    region: 'Ägäis, Griechenland',
    coords: [28.2102, 36.3224],
    altitude: '~10 m NN',
    portraitImage: '/images/rhodos-bucht.jpg',
  },
];
