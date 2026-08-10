"use client";

import { useEffect, useRef, useState } from "react";
import { observeReveal, prefersReducedMotion } from "@/lib/motion";

interface Quote {
  text: string;
  name: string;
  role: string;
  initials: string;
}

/* Approved copy, verbatim — de-personalised deliberately: the site
   speaks as a team. */
const QUOTES: Quote[] = [
  {
    text: '"The team stepped in as full-stack engineers for our internal tools team, quickly took a product ownership role and made an immediate impact. Their end-to-end ownership of our internal app was exactly what we needed. What impressed me most was their ability to understand complex business requirements and translate them into intuitive user experiences."',
    name: "Laks Srini",
    role: "CTO, ZeroDown · acquired by Flyhomes",
    initials: "LS",
  },
  {
    text: '"They were an absolute pleasure to work with. Their work ethic was top-tier, consistently going above and beyond to ensure that every assignment was completed to the highest standard. They are sharp critical thinkers who approach problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work."',
    name: "Dan Xavier",
    role: "Head of Software · Apparel Impact Institute",
    initials: "DX",
  },
];

/* Auto-advancing testimonial carousel. The active segment sweeps over
   the same 6s as the advance — advancing on the sweep's animationend
   keeps them in perfect sync, and pausing (hover, focus, off-screen)
   pauses both. The sweep and the slide restart via React key remounts.
   Reduced motion: quote 1 static, working arrows, no autoplay. */
export default function Testimonial(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [seq, setSeq] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const el = rootRef.current;
    if (!el) return;
    const unreveal = observeReveal(el);
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0].isIntersecting;
        setPaused(hoverRef.current || focusRef.current || !visibleRef.current);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => {
      unreveal();
      io.disconnect();
    };
  }, []);

  const syncPaused = () => {
    setPaused(hoverRef.current || focusRef.current || !visibleRef.current);
  };

  const go = (i: number) => {
    setIndex(((i % QUOTES.length) + QUOTES.length) % QUOTES.length);
    setSeq((s) => s + 1);
  };

  const quote = QUOTES[index];

  return (
    <section
      id="testimonials"
      className="pb-rev pb-carsec"
      ref={rootRef}
      onMouseEnter={() => {
        hoverRef.current = true;
        syncPaused();
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        syncPaused();
      }}
      onFocus={() => {
        focusRef.current = true;
        syncPaused();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          focusRef.current = false;
          syncPaused();
        }
      }}
    >
      <div className="pb-kicker pb-quote-kicker">$ cat ./testimonials</div>

      <div className={`car${paused ? " car-paused" : ""}`}>
        <span className="car-mark" aria-hidden="true">
          &rdquo;
        </span>

        <div aria-live="polite">
          <div className="car-slide" key={`${index}-${seq}`}>
            <blockquote className="car-q">{quote.text}</blockquote>
            <div className="car-cap">
              <span className="car-av" aria-hidden="true">
                {quote.initials}
              </span>
              <span>
                <span className="car-name">{quote.name}</span>
                <span className="car-role">{quote.role}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="car-bar">
          <span className="car-bars">
            {QUOTES.map((q, i) => (
              <button
                className={`car-seg${i < index ? " done" : ""}${reduced && i === index ? " done" : ""}`}
                type="button"
                key={q.initials}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => go(i)}
              >
                {!reduced && i === index ? (
                  <span
                    className="sweep"
                    key={`s-${index}-${seq}`}
                    onAnimationEnd={() => {
                      if (visibleRef.current && !hoverRef.current && !focusRef.current) {
                        go(index + 1);
                      }
                    }}
                  />
                ) : (
                  <span />
                )}
              </button>
            ))}
          </span>
          <span className="car-count">
            0{index + 1} / 0{QUOTES.length}
          </span>
          <span className="car-nav">
            <button
              className="car-btn"
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
            >
              ←
            </button>
            <button
              className="car-btn"
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
            >
              →
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
