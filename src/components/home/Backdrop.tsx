"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/* Scanline field + lime glow behind the hero. The glow drifts with scroll
   (y × 0.32), written through the DOM inside an rAF guard. */
export default function Backdrop(): JSX.Element {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        if (glowRef.current) {
          glowRef.current.style.transform = `translateX(-50%) translateY(${y * 0.32}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="pb-scanlines" aria-hidden="true" />
      <div className="pb-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
