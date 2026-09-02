"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Group } from "three";

/* The cabinet, in react-three-fiber. ORYZO's void-mode sections put a single
   3D render in the middle of a full viewport with text flanking it, lit from
   the upper right with a warm rim light — so this is the object that section
   is built around, and the brief's own note that it "rotates from top-down to
   3/4 angle between sections" is why the rotation is driven by scroll rather
   than by a clock.

   Geometry only — no model file, no texture maps, no drei. Lambert surfaces
   and three lights do the work, which keeps the whole scene inside the
   three + fiber install rather than adding a loader and an asset pipeline. */

const WALNUT = "#6b4c30";
const WALNUT_DARK = "#4a341f";
const CONE = "#241c16";
const DUST = "#c9b79c";

function Speaker({ reduced }: { reduced: boolean | null }) {
  const group = useRef<Group>(null);
  const target = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // 0 at the top of the page, 1 by the time the object has passed
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    // top-down to three-quarter, mapped to scroll rather than to time, and
    // eased toward the target so a flicked scroll does not snap the object
    const t = target.current;
    const yTo = -0.5 + t * 1.25;
    const xTo = -0.62 + t * 0.62;
    if (reduced) {
      group.current.rotation.y = yTo;
      group.current.rotation.x = xTo;
      return;
    }
    group.current.rotation.y += (yTo - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (xTo - group.current.rotation.x) * 0.08;
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
        gl={{ antialias: true, alpha: true }}
      >
        {/* Chiaroscuro, not product-shot lighting: one warm key from the
            upper right and almost nothing else, so the far faces fall to the
            walnut canvas rather than staying lit. A high ambient was making
            solid timber read as orange plastic. */}
        <ambientLight intensity={0.16} />
        <directionalLight position={[5, 4.5, 3]} intensity={1.7} color="#ffcf9a" />
        <directionalLight position={[-5, 0.5, 1.5]} intensity={0.16} color="#6d5f4f" />
        <directionalLight position={[1, -1.5, -4]} intensity={0.28} color="#ffedd7" />
        <Speaker reduced={reduced} />
      </Canvas>
    </div>
  );
}
