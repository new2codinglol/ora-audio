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
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- */
/* Fixed nav. Four items, transparent, and the active one takes brass —     */
/* the accent is a state here rather than an editorial flourish.            */

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
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="wrap flex items-center gap-6 py-6">
        <a href="#top" className="h3">
          Ora
        </a>
        {/* Four items do not fit beside the wordmark on a phone; below sm the
            nav is the wordmark and one action. */}
        <ul className="ml-auto hidden gap-7 sm:flex">
          {items.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className={`text-[14px] transition-colors duration-200 ${
                  active === href ? "text-brass" : "text-dim"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#order" className="btn btn-ghost ml-auto px-5 py-2 text-[13px] sm:ml-0">
          Order
        </a>
      </div>
    </nav>
  );
}

/* --------------------------------------------------------------------- */
/* The detail viewer. Sentence case, because this is somebody describing    */
/* the thing they made rather than a label beside it in a vitrine.          */

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
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px]">
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
                className={`btn px-4 py-2 text-[13px] ${
                  on ? "btn-solid" : "btn-ghost"
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
          <h3 className="h2 mt-8">{active.title}</h3>
          <p className="lead mt-5 max-w-[46ch] text-cream/80">{active.body}</p>
          <p className="hair mt-7 max-w-[52ch] pt-4 text-[13.5px] leading-relaxed text-dim">
            {active.spec}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
