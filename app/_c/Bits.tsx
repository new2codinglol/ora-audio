"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.62, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- */
/* Fixed nav, four items, transparent. The active item takes a dashed       */
/* underline rather than a colour, because the accent is editorial only.    */

export function Nav({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState(items[0][1]);

  useEffect(() => {
    const targets = items
      .map(([, href]) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-6 py-6">
      <a href="#top" className="lab capt">
        Ora
      </a>
      {/* Four items do not fit beside the wordmark at 390px — they wrapped
          onto a second line and collided with it. Below sm the nav is the
          wordmark and one action, which is the same restraint the brief asks
          for at full width. */}
      <ul className="hidden gap-6 sm:flex">
        {items.map(([label, href]) => (
          <li key={href}>
            <a href={href} className={`lab capt pb-1 ${active === href ? "nav-on" : ""}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#order" className="lab capt sm:hidden">
        Order
      </a>
    </nav>
  );
}

/* --------------------------------------------------------------------- */
/* The detail viewer — Ora's one working artefact. Kept, and moved into the */
/* ORYZO vocabulary: ghost buttons that invert when selected, full-bleed    */
/* sharp-edged photography, and the description in the 29px mixed-case      */
/* voice. The crossfade carries a 3px blur; without it you see two          */
/* photographs overlapping rather than one view becoming another.           */

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
    <div className="grid gap-[18px] lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {details.map((d) => {
          const on = d.id === active.id;
          return (
            <Image
              key={d.id}
              src={d.photo}
              alt={on ? d.alt : ""}
              aria-hidden={!on}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
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
        <div role="tablist" aria-label="Details" className="flex flex-wrap gap-[10px]">
          {details.map((d) => {
            const on = d.id === active.id;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={on}
                onClick={() => setId(d.id)}
                className={`btn-ghost r-ghost lab capt ${
                  on ? "bg-cream text-walnut" : ""
                }`}
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
          <h3 className="lab headline mt-[41px]">{active.title}</h3>
          <p className="body-voice mt-[24px] max-w-[24ch]">{active.body}</p>
          <p className="lab capt divider mt-[24px] max-w-[46ch] pt-[14px] text-driftwood">
            {active.spec}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
