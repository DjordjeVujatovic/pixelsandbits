"use client";

import { useEffect, useRef, useState } from "react";
import { ASK_QA } from "@/lib/content";

/* FAQ_accordion.md — the five answers in a terminal accordion, one open
   at a time. Row 3 (--cost) opens on load: cost is the question a
   visitor is most likely scanning for, and an open row means the
   section is never an empty list of closed pills. State is a single
   open index; every animation is a CSS transition. */
const OPEN_DEFAULT = 2;

export default function AskPanel(): JSX.Element {
  const [open, setOpen] = useState<number | null>(OPEN_DEFAULT);
  const rootRef = useRef<HTMLDivElement>(null);

  // Collapsed answers are visually hidden by the 0fr row, but their
  // links would stay focusable — inert removes them from the tab order.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".fq-ans").forEach((el, i) => {
      (el as HTMLElement & { inert: boolean }).inert = i !== open;
    });
  }, [open]);

  return (
    <div className="fq-pnl" ref={rootRef}>
      <div className="fq-bar">
        <span className="fq-td" aria-hidden="true" />
        <span className="fq-td" aria-hidden="true" />
        <span className="fq-td" aria-hidden="true" />
        <span>pixels&bits · ask-us</span>
        {/* the right side echoes the open row's flag, -- stripped */}
        <span className="fq-meta">
          <span className="fq-dot" aria-hidden="true" />
          {open === null ? `${ASK_QA.length} answers` : ASK_QA[open].flag.slice(2)}
        </span>
      </div>

      <div className="fq-body">
        {ASK_QA.map((item, i) => (
          <div className={`fq-r${open === i ? " on" : ""}`} key={item.q}>
            <button
              className="fq-q"
              type="button"
              id={`fq-q${i}`}
              aria-expanded={open === i}
              aria-controls={`fq-a${i}`}
              onClick={() => setOpen((prev) => (prev === i ? null : i))}
            >
              <span className="fq-p" aria-hidden="true">
                $
              </span>
              <span className="fq-qt">{item.q}</span>
              <span className="fq-flag">{item.flag}</span>
              {/* the timing is decorative flavour — out of the name */}
              <span className="fq-ms" aria-hidden="true">
                {item.ms}
              </span>
              <span className="fq-car" aria-hidden="true">
                &gt;
              </span>
            </button>
            <div className="fq-ans" id={`fq-a${i}`} role="region" aria-labelledby={`fq-q${i}`}>
              <div className="fq-ans-in">
                <div className="fq-out">
                  <p className="fq-atx">
                    {item.aPre}
                    {item.aEm ? <b>{item.aEm}</b> : null}
                    {item.aPost ?? null}
                  </p>
                  <div className="fq-foot">
                    <span className="fq-ex">✓ exit 0</span>
                    <span className="fq-src">
                      more on this in <a href={item.src.href}>{item.src.label}</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="fq-prompt">
          <span className="fq-p" style={{ color: "var(--acc)" }} aria-hidden="true">
            $
          </span>
          <span>something else?</span>
          <span className="fq-blk" aria-hidden="true" />
          <a className="fq-cta" href="/contact">
            ask us directly →
          </a>
        </div>
      </div>
    </div>
  );
}
