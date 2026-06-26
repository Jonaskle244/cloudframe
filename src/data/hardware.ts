/**
 * hardware.ts
 * -----------
 * Technisches Datenblatt für die Hardware-View. Bewusst auf das beschränkt,
 * was die Aufnahmen tatsächlich belegen (4K-Material, Hyperlapse, X-Quad) —
 * keine erfundenen Reichweite-/Gewicht-/Flugzeit-Zahlen. Sobald das genaue
 * Drohnen-Modell feststeht, hier die echten Werte ergänzen.
 */
export interface Spec {
  label: string; // HUD-Kürzel (mono)
  value: string;
}

export const droneName = 'Cloudframe · Fluggerät';
export const droneTagline =
  'Das Werkzeug hinter den Aufnahmen — ein kompakter Quadcopter mit stabilisierter 4K-Kamera.';

export const specs: Spec[] = [
  { label: 'TYP', value: 'Quadcopter' },
  { label: 'FRAME', value: 'X-Konfiguration' },
  { label: 'KAMERA', value: '4K · 30 FPS' },
  { label: 'GIMBAL', value: '3-Achsen stabilisiert' },
  { label: 'MODI', value: 'Foto · Video · Hyperlapse' },
  { label: 'ANTRIEB', value: '4 × bürstenlos' },
];
