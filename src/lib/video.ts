/**
 * Video-Base-URL – lokal vs. Prod umschaltbar.
 *
 * Ohne Konfiguration werden Videos aus `/public/videos` ausgeliefert (lokal).
 * In Prod liegen die Clips im externen Objektspeicher (Cloudflare R2 unter
 * `media.codemantix.com`); dafür `PUBLIC_VIDEO_BASE_URL` setzen, z. B.
 * `PUBLIC_VIDEO_BASE_URL=https://media.codemantix.com`.
 */
const RAW_BASE = import.meta.env.PUBLIC_VIDEO_BASE_URL ?? '';
const BASE = RAW_BASE.replace(/\/+$/, '') || '/videos';

/** Baut die vollständige URL für eine Video-Datei (nur Dateiname übergeben). */
export function videoUrl(file: string): string {
  return `${BASE}/${file.replace(/^\/+/, '')}`;
}
