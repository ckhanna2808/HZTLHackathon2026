"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Animate only the first time it enters view */
  once?: boolean;
  /** IntersectionObserver rootMargin, e.g. "0px 0px -10% 0px" */
  margin?: string;
  /** Extra class names for the wrapper */
  className?: string;
  /** Optional delay in ms (for stagger) */
  delayMs?: number;
};

export function Reveal({
  children,
  once = true,
  // Trigger later so the user *sees* the animation while scrolling
  margin = "0px 0px -30% 0px",
  className,
  delayMs,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const style = useMemo<React.CSSProperties | undefined>(() => {
    if (delayMs == null) return undefined;
    return { transitionDelay: `${delayMs}ms` };
  }, [delayMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) {
      // Use a timeout to avoid sync setState-in-effect lint.
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { root: null, rootMargin: margin, threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [margin, once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

