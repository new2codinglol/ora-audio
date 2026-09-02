"use client";

import { useReducedMotion } from "motion/react";
import LightRays from "./reactbits/LightRays";

/* React Bits' LightRays behind the workshop section. This is the flattest
   part of the page — dark, text only, three columns — and the one place the
   chiaroscuro claim was being made in words rather than in light. Brass,
   slow, and low: a shaft falling across a workshop, not a stage effect.

   It runs a WebGL loop while mounted, so it is removed entirely under
   reduced motion rather than merely slowed. */
export function RaysBackdrop() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <LightRays
        raysOrigin="top-center"
        raysColor="#c2a35c"
        raysSpeed={0.5}
        lightSpread={1.5}
        rayLength={1.9}
        fadeDistance={1.1}
        saturation={0.75}
        followMouse
        mouseInfluence={0.06}
        noiseAmount={0.04}
        distortion={0.03}
      />
    </div>
  );
}
