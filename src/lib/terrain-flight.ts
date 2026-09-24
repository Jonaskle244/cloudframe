import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadTerrain, TERRAIN_BY_SPOT } from '../data/terrain';

/** Existing terrain grids and camera path, adapted to Cloudframe's light palette. */
export async function createTerrainFlight(host: HTMLElement, id: string, onArrive: () => void) {
  const data = await loadTerrain(TERRAIN_BY_SPOT[id]);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Drehbares Geländerelief');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
  const span = Math.max(1, data.elevMax - data.elevMin);
  const height = span * 8 / data.meters.w * 1.6;
  const geometry = new THREE.PlaneGeometry(8, 8 * data.meters.h / data.meters.w, data.gridW - 1, data.gridH - 1);
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const low = new THREE.Color(data.sea ? '#bad2df' : '#829c8e');
  const high = new THREE.Color('#e4e5df');
  for (let i = 0; i < pos.count; i++) {
    // Light smoothing of the sampled grid avoids needle-like tile artifacts.
    const x = i % data.gridW, y = Math.floor(i / data.gridW);
    let total = 0, count = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && xx < data.gridW && yy >= 0 && yy < data.gridH) {
        total += data.elev[yy * data.gridW + xx]; count++;
      }
    }
    const h = (total / count - data.elevMin) / span;
    pos.setZ(i, h * height);
    const color = low.clone().lerp(high, h);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: false });
  scene.add(new THREE.Mesh(geometry, material));
  const wireMaterial = new THREE.MeshBasicMaterial({ color: '#637b82', wireframe: true, transparent: true, opacity: 0.085 });
  scene.add(new THREE.Mesh(geometry, wireMaterial));
  scene.add(new THREE.HemisphereLight('#ffffff', '#b2bdca', 1.6));
  const sun = new THREE.DirectionalLight('#fff8ed', 1.8);
  sun.position.set(-5, 10, 3);
  scene.add(sun);
  const markerGeometry = new THREE.ConeGeometry(0.065, 0.25, 4);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  const mid = Math.floor(data.gridH / 2) * data.gridW + Math.floor(data.gridW / 2);
  marker.position.set(pos.getX(mid), pos.getY(mid) + 0.23, pos.getZ(mid));
  scene.add(marker);
  const target = new THREE.Vector3(0, height * 0.4, 0);
  const start = new THREE.Vector3(0.96, 10.8, 9.6);
  const end = new THREE.Vector3(0.4, height * 0.85 + 1.4, 7.2);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enablePan = false;
  controls.minDistance = 4;
  controls.maxDistance = 18;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.enabled = false;
  let progress = 0;
  let disposed = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function render() { if (!disposed) renderer.render(scene, camera); }
  controls.addEventListener('change', render);
  const resize = new ResizeObserver(() => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  });
  resize.observe(host);
  let last = performance.now();
  let frame = 0;
  function tick(now: number) {
    if (disposed) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!document.hidden) progress = reduced.matches ? 1 : Math.min(1, progress + dt / 2.6);
    camera.position.lerpVectors(start, end, 1 - Math.pow(1 - progress, 3));
    camera.lookAt(target);
    render();
    if (progress < 1) frame = requestAnimationFrame(tick);
    else { controls.enabled = true; controls.update(); onArrive(); }
  }
  camera.position.copy(start);
  frame = requestAnimationFrame(tick);
  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      controls.dispose();
      geometry.dispose(); material.dispose(); wireMaterial.dispose();
      markerGeometry.dispose(); markerMaterial.dispose(); renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
