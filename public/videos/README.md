# Videos

Hier liegen die webfertigen Clips, die von der Cloudframe-App direkt
referenziert werden.

Aktuell verwendet:

- `soelden-berg-1080p-crf26.mp4` — Start/Hero und Menü-Preview
- `oetz-talflug-1080p-crf26.mp4` — Filme-View und Menü-Preview
- `prag-tower-1080p-crf26.mp4` — Filme-View und Menü-Preview
- `hero-desenberg-1080p-crf26.mp4` — Filme-View
- `acherkogel-oetz-hyperlapse.mp4` — Karten-Location
- `insel-symi-rhodos.mp4` — Karten-Location

Rohdateien (`*.mov`) und Zwischenexports bleiben lokal und werden nicht
versioniert.

## Empfohlenes Encoding für sauberes Scroll-Scrubbing

Damit das Video beim Scrollen frame-genau seekt (sonst springt es), sollte
jedes Frame ein Keyframe sein. Mit ffmpeg:

```bash
ffmpeg -i original.mp4 \
  -movflags +faststart \
  -vcodec libx264 -crf 20 -preset slow \
  -x264opts "keyint=1:min-keyint=1:no-scenecut" \
  -an \
  output-1080p-crf26.mp4
```

- `keyint=1` → jeder Frame ist ein I-Frame
- `-an` → keine Audiospur (wird ohnehin gemutet)
- `+faststart` → Metadata an den Anfang, Browser kann sofort starten

**Trade-off:** Datei wird ca. 2–4× größer. Für ein 10–15 s Hero-Video
trotzdem meist nur 10–30 MB — vertretbar.

## Empfohlene Länge & Auflösung

- **Dauer:** 8–15 Sekunden (entspricht ca. 3× Viewport-Scrolllänge)
- **Auflösung:** 1920×1080 oder 2560×1440 (1080p reicht meist)
- **Framerate:** 30 fps (höher bringt für Scrubbing wenig)
