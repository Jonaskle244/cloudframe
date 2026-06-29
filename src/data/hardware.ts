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
}

export const droneName = 'DJI Mini 4 Pro';
export const droneTagline =
  'Das Werkzeug hinter den Aufnahmen — ein sub-249-g-Quadcopter mit 1/1,3"-Sensor und 3-Achsen-stabilisierter 4K-Kamera.';

export const specs: Spec[] = [
  { label: 'MODELL', value: 'DJI Mini 4 Pro' },
  { label: 'GEWICHT', value: '< 249 g' },
  { label: 'KAMERA', value: '1/1,3" · 48 MP' },
  { label: 'VIDEO', value: '4K · 100 FPS' },
  { label: 'GIMBAL', value: '3-Achsen mechanisch' },
  { label: 'FLUGZEIT', value: 'bis 34 min' },
  { label: 'TEMPO', value: '16 m/s' },
  { label: 'HINDERNIS', value: 'omnidirektional' },
  { label: 'FUNK', value: 'DJI O4 · 10 km' },
];
