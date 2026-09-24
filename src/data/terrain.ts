// Terrain-Höhendaten (Stufe 2) — gebacken von scripts/fetch_terrain.py aus freien
// AWS-Terrain-Tiles. Laufzeit lädt nur das committete JSON, kein Netzwerk-/Key-Bedarf.

export interface TerrainData {
  name: string
  slug: string
  center: [number, number] // [lon, lat]
  zoom: number
  bbox: { west: number; east: number; north: number; south: number }
  gridW: number
  gridH: number
  meters: { w: number; h: number }
  elevMin: number
  elevMax: number
  sea: boolean // berührt die Fläche das Meer? (elevMin == 0 → Wasser-Tönung)
  elev: number[] // row-major, Nord (Zeile 0) → Süd, Höhe in Metern
}

// Welche Spots einen Terrain-Anflug haben. Pro Ort additiv erweiterbar:
// weiteres JSON backen (scripts/fetch_terrain.py) und hier eintragen.
export const TERRAIN_BY_SPOT: Record<string, string> = {
  koeterberg: '/terrain/koeterberg.json',
  falkenburg: '/terrain/falkenburg.json',
  reschensee: '/terrain/reschensee.json',
  acherkogel: '/terrain/acherkogel.json',
  symi: '/terrain/symi.json',
  rhodos: '/terrain/rhodos.json',
  prag: '/terrain/prag.json',
  korfu: '/terrain/korfu.json',
}

export function hasTerrain(spotId: string): boolean {
  return spotId in TERRAIN_BY_SPOT
}

const cache: Record<string, TerrainData> = {}

export async function loadTerrain(url: string): Promise<TerrainData> {
  if (cache[url]) return cache[url]
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Terrain ${url}: HTTP ${res.status}`)
  const data = (await res.json()) as TerrainData
  cache[url] = data
  return data
}
