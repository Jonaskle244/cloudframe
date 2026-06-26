/**
 * drone.ts
 * --------
 * Prozedurale Drohnen-Geometrie als geteiltes Modul. Wird sowohl vom
 * interaktiven `DroneViewer` als auch vom `DroneFlyby`-Gimmick genutzt,
 * damit beide exakt dasselbe Modell rendern. Kein externes GLB —
 * alles aus Three.js-Primitives, parametrisch über CONFIG.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/* ── Parametrisch: zentrale Stellschrauben ────────────────────── */
export const CONFIG = {
  bodyColor: 0x17171b,
  armColor: 0x121216,
  motorColor: 0x2c2c33,
  propColor: 0x52525b,
  accent: 0x2563eb,
  ledFront: 0xffffff,
  ledRear: 0xff3b30,
  armRadius: 1.18, // Abstand Motor → Zentrum
  propSpin: 26, // rad/s bei Auto-Spin
};

export interface DroneBuild {
  drone: THREE.Group;
  propGroups: THREE.Group[];
}

export function buildDrone(): DroneBuild {
  const drone = new THREE.Group();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: CONFIG.bodyColor, metalness: 0.55, roughness: 0.38,
    clearcoat: 0.6, clearcoatRoughness: 0.3,
  });
  const armMat = new THREE.MeshStandardMaterial({ color: CONFIG.armColor, metalness: 0.5, roughness: 0.5 });
  const motorMat = new THREE.MeshStandardMaterial({ color: CONFIG.motorColor, metalness: 0.9, roughness: 0.28 });
  const propMat = new THREE.MeshStandardMaterial({
    color: CONFIG.propColor, metalness: 0.3, roughness: 0.55,
    transparent: true, opacity: 0.9, side: THREE.DoubleSide,
  });
  const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050507, metalness: 0.1, roughness: 0.04, clearcoat: 1 });

  // ── Zentralkörper (zwei gestapelte gerundete Boxen) ──
  const lower = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.28, 0.95, 4, 0.1), bodyMat);
  const upper = new THREE.Mesh(new RoundedBoxGeometry(1.12, 0.2, 0.68, 4, 0.08), bodyMat);
  upper.position.y = 0.2;
  drone.add(lower, upper);

  // Accent-Statuslicht oben
  const accentLed = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20),
    new THREE.MeshStandardMaterial({ color: CONFIG.accent, emissive: CONFIG.accent, emissiveIntensity: 2.2 }),
  );
  accentLed.position.set(0, 0.31, -0.12);
  drone.add(accentLed);

  // ── Gimbal-Kamera vorne unten (Front = +z) ──
  const gimbal = new THREE.Group();
  const gMount = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), motorMat);
  const gLens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 24), lensMat);
  gLens.rotation.x = Math.PI / 2;
  gLens.position.z = 0.12;
  gimbal.add(gMount, gLens);
  gimbal.position.set(0, -0.16, 0.55);
  drone.add(gimbal);

  // ── Arme + Motoren + Props (X-Konfiguration) ──
  const R = CONFIG.armRadius;
  const propGroups: THREE.Group[] = [];

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * (Math.PI / 2);
    const dx = Math.cos(angle);
    const dz = Math.sin(angle);
    const mx = dx * R;
    const mz = dz * R;

    // Arm (gerundete Box, lokale x-Achse zeigt nach außen)
    const arm = new THREE.Mesh(new RoundedBoxGeometry(R + 0.15, 0.1, 0.17, 3, 0.04), armMat);
    arm.position.set(mx / 2, 0, mz / 2);
    arm.rotation.y = -angle;
    drone.add(arm);

    // Motor
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.18, 28), motorMat);
    motor.position.set(mx, 0.09, mz);
    drone.add(motor);

    // Prop (2 Blätter mit leichter Steigung)
    const prop = new THREE.Group();
    const pitch = 0.16;
    const bladeA = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, 0.12), propMat);
    bladeA.position.x = 0.31; bladeA.rotation.z = pitch;
    const bladeB = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, 0.12), propMat);
    bladeB.position.x = -0.31; bladeB.rotation.z = -pitch;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 16), motorMat);
    prop.add(bladeA, bladeB, hub);
    prop.position.set(mx, 0.21, mz);
    prop.userData.dir = i % 2 === 0 ? 1 : -1; // CW / CCW
    drone.add(prop);
    propGroups.push(prop);

    // Positions-LED (vorne weiß, hinten rot)
    const isFront = dz > 0;
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 12),
      new THREE.MeshStandardMaterial({
        color: isFront ? CONFIG.ledFront : CONFIG.ledRear,
        emissive: isFront ? CONFIG.ledFront : CONFIG.ledRear,
        emissiveIntensity: 3,
      }),
    );
    led.position.set(mx, -0.04, mz);
    drone.add(led);
  }

  // ── Landegestell: 2 Kufen + 4 Beine ──
  for (const sx of [-0.5, 0.5]) {
    const skid = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 1.0), armMat);
    skid.position.set(sx, -0.5, 0);
    drone.add(skid);
    for (const sz of [-0.32, 0.32]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), armMat);
      leg.position.set(sx, -0.3, sz);
      drone.add(leg);
    }
  }

  drone.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  return { drone, propGroups };
}
