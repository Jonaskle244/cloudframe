import { videoUrl } from '../lib/video';

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
  gallery?: string[]; // mehrere Hochkant-Bilder → moderne Slideshow in der Card
}

export const locations: Location[] = [
  {
    id: 'koeterberg',
    index: 1,
    name: 'Köterberg',
    region: 'NRW, Deutschland',
    coords: [9.2394, 51.9467],
    altitude: '~496 m NN',
    resolution: '48 MP · Foto',
    gallery: [
      '/images/koeterberg-luegde.jpg',
      '/images/koeterberg-winter.jpg',
    ],
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
    portraitVideo: videoUrl('acherkogel-oetz-hyperlapse-web.mp4'),
  },
  {
    id: 'symi',
    index: 5,
    name: 'Symi',
    region: 'Ägäis, Griechenland',
    coords: [27.8333, 36.5833],
    altitude: '~15 m NN',
    resolution: '4K · 30 FPS',
    portraitVideo: videoUrl('insel-symi-rhodos-web.mp4'),
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
  {
    id: 'prag',
    index: 7,
    name: 'Prag',
    region: 'Böhmen, Tschechien',
    coords: [14.4114, 50.0865],
    altitude: '~200 m NN',
    resolution: '4K · 30 FPS',
    portraitVideo: videoUrl('prag-cityflug.mp4'),
  },
  {
    id: 'korfu',
    index: 8,
    name: 'Korfu',
    region: 'Ionische Inseln, Griechenland',
    coords: [19.6736, 39.6869],
    altitude: '~60 m NN',
    resolution: '48 MP · Foto',
    gallery: [
      '/images/korfu-porto-timoni.jpg',
      '/images/korfu-cape-drastis.jpg',
      '/images/korfu-paleokastritsa.jpg',
    ],
  },
];
