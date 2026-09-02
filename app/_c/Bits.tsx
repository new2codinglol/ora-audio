"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* --------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- */
/* Detail viewer. The crossfade carries a 3px blur on the way through:     */
/* without it you see two photographs overlapping rather than one view     */
/* becoming another.                                                       */

export type Detail = {
  id: string;
  tab: string;
  title: string;
  photo: string;
  alt: string;
  body: string;
  spec: string;
};

export function DetailViewer({ details }: { details: Detail[] }) {
  const [id, setId] = useState(details[0].id);
  const active = details.find((d) => d.id === id) ?? details[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div className="vignette relative aspect-[4/3] overflow-hidden">
        {details.map((d) => {
          const on = d.id === active.id;
          return (
            <Image
              key={d.id}
              src={d.photo}
              alt={on ? d.alt : ""}
              aria-hidden={!on}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-[opacity,filter,transform] duration-[320ms]"
              style={{
                opacity: on ? 1 : 0,
                filter: on ? "blur(0px)" : "blur(3px)",
                transform: on ? "scale(1)" : "scale(1.02)",
                transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          );
        })}
      </div>

      <div>
        <div role="tablist" aria-label="Details" className="flex flex-wrap gap-2">
          {details.map((d) => {
            const on = d.id === active.id;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={on}
                onClick={() => setId(d.id)}
                className="btn border px-4 py-2 text-xs uppercase tracking-[0.16em]"
                style={{
                  borderColor: on ? "var(--color-clay)" : "var(--color-edge)",
                  color: on ? "var(--color-clay)" : "var(--color-ash)",
                }}
              >
                {d.tab}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          <h3 className="mt-7 font-display text-3xl leading-tight sm:text-4xl">{active.title}</h3>
          <p className="mt-4 max-w-md leading-relaxed text-sumi/75">{active.body}</p>
          <p className="mt-4 border-l border-edge pl-4 text-sm leading-relaxed text-ash">
            {active.spec}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
