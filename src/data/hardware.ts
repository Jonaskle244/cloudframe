/**
 * hardware.ts
 * -----------
 * Technisches Datenblatt für die Hardware-View. Werte sind die offiziellen
 * Herstellerangaben der DJI Mini 4 Pro (Stand: DJI-Spezifikationsseite) —
 * keine geschätzten Zahlen. Reichweite/Sendeleistung sind regulierungs-
 * abhängig; hier ist der CE-Wert (EU) angegeben.
 * Quelle: https://www.dji.com/mini-4-pro/specs
 */
export interface Spec {
  label: string; // HUD-Kürzel (mono)
  value: string;
  count?: boolean; // erste Zahl im Wert beim Reinscrollen hochzählen
}

/**
 * Hotspots: Bauteil-Marker, die direkt auf dem Drohnen-Foto sitzen.
 * x/y = Position des Punkts in % der Bildfläche (922×590, freigestellt).
 * cx/cy = Anker der Spec-Karte (in eine dunkle Frame-Ecke gelegt).
 * place = aus welcher Ecke die Karte aufklappt (tl/tr/bl/br).
 */
export interface Hotspot {
  id: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  place: 'tl' | 'tr' | 'bl' | 'br';
  label: string;
  value: string;
  sub?: string;
}

export const hotspots: Hotspot[] = [
  {
    id: 'cam',
    x: 37,
    y: 64,
    cx: 4,
    cy: 96,
    place: 'bl',
    label: 'Kamera',
    value: '1/1,3" CMOS · 48 MP',
    sub: '4K Video bis 100 FPS',
  },
  {
    id: 'obs',
    x: 34,
    y: 52,
    cx: 4,
    cy: 6,
    place: 'tl',
    label: 'Hinderniserkennung',
    value: 'Omnidirektional',
    sub: 'Vordere Sichtsensoren',
  },
  {
    id: 'mot',
    x: 72,
    y: 70,
    cx: 96,
    cy: 96,
    place: 'br',
    label: 'Antrieb',
    value: '4 × bürstenlos',
    sub: 'bis 16 m/s im Sport-Modus',
  },
  {
    id: 'bat',
    x: 48,
    y: 42,
    cx: 96,
    cy: 6,
    place: 'tr',
    label: 'Gewicht & Flugzeit',
    value: '< 249 g',
    sub: 'bis 34 min in der Luft',
  },
];

export const droneName = 'DJI Mini 4 Pro';
export const droneTagline =
  'Das Werkzeug hinter den Aufnahmen — ein sub-249-g-Quadcopter mit 1/1,3"-Sensor und 3-Achsen-stabilisierter 4K-Kamera.';

export const specs: Spec[] = [
  { label: 'MODELL', value: 'DJI Mini 4 Pro' },
  { label: 'GEWICHT', value: '< 249 g', count: true },
  { label: 'KAMERA', value: '1/1,3" · 48 MP' },
  { label: 'VIDEO', value: '4K · 100 FPS' },
  { label: 'GIMBAL', value: '3-Achsen mechanisch' },
  { label: 'FLUGZEIT', value: 'bis 34 min', count: true },
  { label: 'TEMPO', value: '16 m/s', count: true },
  { label: 'HINDERNIS', value: 'omnidirektional' },
  { label: 'FUNK', value: 'DJI O4 · 10 km' },
];
