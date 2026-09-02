"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { Group } from "three";

/* The cabinet, in react-three-fiber. Japandi asks for natural materials and
   craft rather than photography, and the honest problem with the stock shots
   was always that they are somebody else's speaker. This one is Ora's: a
   mitred walnut box with two recessed drivers and the hand-cut rear port,
   turning slowly enough to read as an object on a table rather than a
   showreel.

   Geometry only — no model file, no texture maps, no drei. Lambert surfaces
   and three lights do the work, which keeps the whole scene inside the
   three + fiber install rather than adding a loader and an asset pipeline. */

const WALNUT = "#a67f56";
const WALNUT_DARK = "#8d6942";
const CONE = "#3a3531";
const DUST = "#d8cfc0";

function Speaker() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // a slow settle, not a spin: ±16° so both the baffle and the mitre read
    group.current.rotation.y = Math.sin(t * 0.18) * 0.28;
    group.current.rotation.x = -0.06 + Math.sin(t * 0.12) * 0.03;
  });

  return (
    <group ref={group}>
      {/* cabinet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.72, 2.95, 1.5]} />
        <meshLambertMaterial color={WALNUT} />
      </mesh>

      {/* baffle, very slightly proud so the mitre line catches light */}
      <mesh position={[0, 0, 0.81]}>
        <boxGeometry args={[1.68, 2.91, 0.03]} />
        <meshLambertMaterial color={WALNUT_DARK} />
      </mesh>

      {/* mid-bass */}
      <mesh position={[0, -0.52, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 48]} />
        <meshLambertMaterial color={CONE} />
      </mesh>
      <mesh position={[0, -0.52, 0.89]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
        <meshLambertMaterial color={DUST} />
      </mesh>

      {/* tweeter */}
      <mesh position={[0, 0.78, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 40]} />
        <meshLambertMaterial color={CONE} />
      </mesh>
      <mesh position={[0, 0.78, 0.9]}>
        <sphereGeometry args={[0.13, 32, 24]} />
        <meshLambertMaterial color={DUST} />
      </mesh>

      {/* the hand-cut rear port, on the back where it belongs */}
      <mesh position={[0, 0.2, -0.81]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.07, 16, 40]} />
        <meshLambertMaterial color={WALNUT_DARK} />
      </mesh>
    </group>
  );
}

export function Cabinet() {
  const reduced = useReducedMotion();

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [2.6, 1.1, 4.4], fov: 34 }}
        dpr={[1, 1.75]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        {/* one warm key from upper left, a cool fill, and a rim to separate
            the cabinet from a ground of nearly the same value */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[-4, 5, 4]} intensity={2.1} color="#fff3e2" />
        <directionalLight position={[5, 1, 2]} intensity={0.5} color="#cfd8e6" />
        <directionalLight position={[0, -2, -4]} intensity={0.8} color="#ffffff" />
        <Speaker />
        {/* a soft contact shadow so the cabinet sits on the linen rather
            than floating over it */}
        <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.3, 48]} />
          <meshBasicMaterial color="#c9c0b1" transparent opacity={0.55} />
        </mesh>
      </Canvas>
    </div>
  );
}
