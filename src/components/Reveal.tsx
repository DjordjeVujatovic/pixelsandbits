"use client";

import { createElement, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { observeReveal } from "@/lib/motion";

type Variant = "rev" | "l" | "r" | "s";

const VARIANT_CLASS: Record<Variant, string> = {
  rev: "pb-rev",
  l: "pb-rev-l",
  r: "pb-rev-r",
  s: "pb-rev-s",
};

interface RevealProps {
  as?: "div" | "section" | "article";
  variant?: Variant;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/* Wraps a block in the handoff's reveal-on-scroll system: hidden until it
   enters the viewport, then .pb-on once (never re-hides). Count-up figures
   inside ([data-count]) start when the block reveals. */
export default function Reveal({
  as = "div",
  variant = "rev",
  id,
  className,
  style,
  children,
}: RevealProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  return createElement(
    as,
    {
      ref,
      id,
      style,
      className: [VARIANT_CLASS[variant], className].filter(Boolean).join(" "),
    },
    children,
  );
}
