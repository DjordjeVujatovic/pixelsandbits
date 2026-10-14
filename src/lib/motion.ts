"use client";

import { useEffect, useState } from "react";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Count-up: rAF-driven, writes through the DOM, fires once per element. */
export function runCountUp(el: HTMLElement): void {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const target = parseFloat(el.dataset.count ?? "0") || 0;
  const suffix = el.dataset.suffix ?? "";
  const prefix = el.dataset.prefix ?? "";
  const final = () => {
    el.textContent = prefix + (target < 10 ? target.toFixed(0) : Math.round(target)) + suffix;
  };
  if (prefersReducedMotion()) {
    final();
    return;
  }
  const dur = parseInt(el.dataset.dur ?? "", 10) || 1100;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = target < 10 ? (target * eased).toFixed(0) : Math.round(target * eased);
    el.textContent = prefix + v + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Shared reveal observer: adds .pb-on once, runs count-ups, unobserves. */
let revealObserver: IntersectionObserver | null = null;

function fire(el: Element): void {
  el.classList.add("pb-on");
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(runCountUp);
}

export function observeReveal(el: Element): () => void {
  if (prefersReducedMotion()) {
    fire(el);
    return () => undefined;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fire(e.target);
            revealObserver?.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
  }
  revealObserver.observe(el);
  return () => revealObserver?.unobserve(el);
}
