"use client";

import { useEffect, useState } from "react";

/* Index labels are final (PORTFOLIO_sticky_rail.md) and match card
   order. The frontier-lab client is never named — "Leading Frontier
   Lab" is the approved wording. */
const ENTRIES = [
  "Leading Frontier Lab",
  "Decagon AI",
  "Scotts Miracle-Gro",
  "Coinbase",
  "Dapper Labs",
];
const IDS = ENTRIES.map((_, k) => `c${k + 1}`);

/* A card goes active when it reaches comfortable reading position, not
   the instant it enters the viewport. Cards are different heights, so a
   fixed detection line beats any fractional-threshold observer. */
const LINE = 150;

function activeIndex(): number {
  let idx = 0;
  IDS.forEach((id, k) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= LINE) idx = k;
  });
  return idx;
}

/* The pinned rail's case index + position counter. Desktop-only: the
   scroll listener attaches at ≥1101px and detaches below, where the
   rail collapses and the index is display: none anyway. */
export default function CaseIndex(): JSX.Element {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const idx = activeIndex();
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };
    const attach = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };
    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const mq = window.matchMedia("(min-width: 1101px)");
    const onMq = () => (mq.matches ? attach() : detach());
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      mq.removeEventListener("change", onMq);
      detach();
    };
  }, []);

  return (
    <>
      <nav className="sr-idx" aria-label="Case studies">
        {ENTRIES.map((label, k) => (
          <a
            key={label}
            className={`sr-i${k === active ? " on" : k < active ? " past" : ""}`}
            href={`#${IDS[k]}`}
            aria-current={k === active ? "true" : undefined}
          >
            <b>{`0${k + 1}`}</b>
            {label}
          </a>
        ))}
      </nav>
      <div className="sr-prog">
        <span className="sr-pos">{`0${active + 1} / 05`}</span>
        <span className="sr-bar" aria-hidden="true">
          <i style={{ width: `${((active + 1) / IDS.length) * 100}%` }} />
        </span>
      </div>
    </>
  );
}
