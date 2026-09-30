# Videos

Hier liegen die webfertigen Clips, die von der Cloudframe-App direkt
referenziert werden.

Aktuell verwendet (seit 30.09.2026, Performance-Umbau):

- `soelden-berg-scrub.mp4` — Start/Hero, Scroll-Scrubbing Desktop (1080p, 20 fps, Keyframe alle 6, 18 MB)
- `soelden-berg-loop.mp4` — Start/Hero Mobile, Auto-Loop (720p, 6 MB)
- `oetz-talflug-tile.mp4`, `prag-tower-tile.mp4` — Startseiten-Kacheln (720p, 8 s, < 2 MB)
- `oetz-talflug-web.mp4`, `prag-tower-web.mp4`, `hero-desenberg-web.mp4` — Filme-View (1080p, CRF 23, normaler GOP)
- `acherkogel-oetz-hyperlapse-web.mp4` (9:16-Ausschnitt), `insel-symi-rhodos-web.mp4`, `prag-cityflug.mp4` — Karten-Locations (1080×1920)

Die alten `*-1080p-crf26.mp4` (All-Intra, 40–53 MB) bleiben auf R2 liegen, damit ein Rollback nur ein Code-Revert ist.
Rohdateien (`*.mov`) und Zwischenexports bleiben lokal und werden nicht
versioniert.

## Encoding

Scroll-Scrubbing (nur das Hero-Video):

```bash
ffmpeg -i soelden-berg.mov -an -vf "fps=20,scale=1920:-2:flags=lanczos" \
  -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -crf 27 \
  -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -movflags +faststart soelden-berg-scrub.mp4
```

- Kurzer Keyframe-Abstand + keine B-Frames → Seek dekodiert höchstens 5 Bilder (~10 ms).
- **Nicht** mehr All-Intra (`keyint=1`): das seekt nur minimal schneller, macht die Datei aber 2–3× größer –
  und die Größe war der eigentliche Ruckel-Grund (bei 50 Mbit/s nur 8 Videobilder/s, bis 12 s Rückstand).
- `ScrollVideo.astro` lädt die Datei komplett per `fetch` als Blob (braucht CORS am R2-Bucket), seekt erst nach `seeked`.

Alles, was nur abgespielt wird (Filme, Kacheln, Karten, Mobile-Loop): normaler GOP (`-g 60`), CRF 23–27, passende Auflösung.

## Empfohlene Länge & Auflösung

- **Dauer:** 8–15 Sekunden (entspricht ca. 3× Viewport-Scrolllänge)
- **Auflösung:** 1920×1080 oder 2560×1440 (1080p reicht meist)
- **Framerate:** 30 fps (höher bringt für Scrubbing wenig)

**Cache-Hinweis:** Cloudflare cacht R2-Antworten ohne nach `Origin` zu unterscheiden. Wurde eine Datei einmal ohne `Origin` abgerufen (z. B. per `curl`), fehlt im Cache der CORS-Header → der Blob-`fetch` scheitert (Fallback greift, aber ohne Vorladen). Dann die `?v=`-Nummer in `index.astro` hochzählen.
