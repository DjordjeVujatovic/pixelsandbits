"use client";

import { useEffect, useRef } from "react";
import { SCHEDULE } from "@/lib/content";
import { observeReveal, prefersReducedMotion } from "@/lib/motion";

/* Schedule animation constants (PROCESS_schedule.md): duration is a
   floor plus the phase's track span, so Build visibly takes longer to
   draw but short bars still read as drawing; each row starts at 66% of
   the previous one. Timeout chain, not rAF — every animated value is a
   CSS transition. */
const FLOOR = 420;
const PER_WEEK = 150;
const OVERLAP = 0.66;

const CYAN = "var(--acc2)";
const LIME = "var(--acc)";

function TickSvg(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.5 6.2l2.3 2.3 4.7-5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The Handover pad: rocket shudders, launches out of the bar, leaves a
   smoke puff, then a check strokes into the vacated pad. */
function LaunchPad(): JSX.Element {
  return (
    <span className="sc-rkn">
      <span className="sc-pad">
        <span className="sc-puff" aria-hidden="true" />
        <span className="sc-rk" aria-hidden="true">
          <span className="sc-flare" />
          <span className="sc-core" />
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 1.8c3.4 2.3 5.3 6 5.3 10l-2.3 2.8H9L6.7 11.8c0-4 1.9-7.7 5.3-10Z" fill="#c6f24e" />
            <path d="M9 14.6h6l-.7 2.4H9.7L9 14.6Z" fill="#c6f24e" />
            <path d="M6.7 10.4 4 13.4l1.1 1.9 1.9-1.4M17.3 10.4 20 13.4l-1.1 1.9-1.9-1.4" fill="#c6f24e" />
          </svg>
        </span>
        <svg className="sc-ck" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.4 10.6l3.1 3.1 6.3-6.9" />
        </svg>
      </span>
    </span>
  );
}

function Deliverables({ className }: { className?: string }): JSX.Element {
  return (
    <div className={`sc-mile${className ? ` ${className}` : ""}`}>
      <div className="sc-mhead">
        <span className="sc-mlbl">WHAT YOU RECEIVE</span>
        <span className="sc-mrule" aria-hidden="true" />
        <span className="sc-mnote">one deliverable per phase · yours to keep</span>
      </div>
      <ul className="sc-mgrid">
        {SCHEDULE.map((p, k) => (
          <li className={`sc-m${p.pre ? "" : " lime"}`} data-after={k} key={p.num}>
            <div className="sc-mtop">
              <span className="sc-mdi" aria-hidden="true" />
              <span className="sc-mv">{p.num}</span>
              <span className="sc-mph">{p.deliverable.tag}</span>
            </div>
            <span className="sc-mk">{p.deliverable.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProcessTimeline(): JSX.Element {
  const rootRef = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const unreveal = observeReveal(el);

    const later = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    /* Desktop chart: per lane — name in, fill draws, edge resolves into
       a tick, label settles; the next lane starts at 66%. Each
       deliverable card lands as ITS phase completes. */
    const runChart = () => {
      const lanes = Array.from(el.querySelectorAll<HTMLElement>(".sc-lane"));
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".sc-chart .sc-m"));
      const mile = el.querySelector(".sc-chart .sc-mile");
      let t = 60;
      lanes.forEach((lane, k) => {
        const span = Number(lane.dataset.span || 1);
        const dur = FLOOR + span * PER_WEEK;
        lane.querySelector<HTMLElement>(".sc-fill")?.style.setProperty("--dur", `${dur}ms`);
        later(() => lane.classList.add("on"), t);
        if (k === 0 && mile) later(() => mile.classList.add("on"), t + 120);
        later(() => {
          lane.classList.add("done");
          cards.forEach((c) => {
            if (Number(c.dataset.after) === k) c.classList.add("on");
          });
        }, t + 160 + dur);
        t += Math.round(dur * OVERLAP);
      });
    };

    /* Mobile: phases stagger in; each deliverable lands with its phase,
       not after all of them. */
    const runMobile = () => {
      const ps = Array.from(el.querySelectorAll<HTMLElement>(".mb-p"));
      const ms = Array.from(el.querySelectorAll<HTMLElement>(".sc-mobile .sc-m"));
      const mile = el.querySelector(".sc-mobile .sc-mile");
      later(() => mile?.classList.add("on"), 80);
      ps.forEach((p, k) => later(() => p.classList.add("on"), 80 + k * 380));
      ms.forEach((m) => {
        const k = Number(m.dataset.after || 0);
        later(() => m.classList.add("on"), 80 + k * 380 + 260);
      });
    };

    const finish = () => {
      el.querySelectorAll(".sc-lane").forEach((l) => l.classList.add("on", "done"));
      el.querySelectorAll(".sc-mile, .sc-m, .mb-p").forEach((n) => n.classList.add("on"));
    };

    if (prefersReducedMotion()) {
      finish();
      return unreveal;
    }

    let ran = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || ran) return;
        ran = true;
        io.disconnect();
        runChart();
        runMobile();
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    const t = timers.current;
    return () => {
      unreveal();
      io.disconnect();
      t.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section id="process" className="pb-rev-r pb-process" ref={rootRef}>
      <div className="sc-head">
        <div>
          <div className="pb-kicker" style={{ marginBottom: 14 }}>
            $ cat ./process
          </div>
          <h2 className="pb-h-md" style={{ margin: 0 }}>
            How an engagement runs
          </h2>
        </div>
      </div>

      {/* Desktop chart (>720px): 9 tracks — the phase column plus 8
          proportion tracks. They are proportion, not weeks; never
          labelled. The overlaps (01/02 share track 3, 02/03 share 4)
          are the point of the layout. */}
      <div className="sc-chart">
        <div className="sc-ruler">
          <span className="sc-lbl">PHASE</span>
          <span className="sc-axis" style={{ gridColumn: "2 / 10" }}>
            <span>START</span>
            <span className="sc-axline" aria-hidden="true" />
            <span>SHIPPED</span>
          </span>
        </div>

        <ol className="sc-lanes">
          {SCHEDULE.map((p) => {
            const voice = p.pre ? CYAN : LIME;
            const fillCls = p.fin ? "sc-bfin" : p.pre ? "sc-b2" : "sc-b1";
            const textCls = p.fin ? "sc-tfin" : p.pre ? "sc-t2" : "sc-t1";
            return (
              <li className={`sc-lane${p.pre ? " pre" : ""}`} data-span={p.span} key={p.num}>
                <span className="sc-cols" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} />
                  ))}
                </span>
                <span className="sc-name">
                  <b>{p.num}</b>
                  {p.name}
                </span>
                <span className="sc-slot" style={{ gridColumn: `${p.col[0]} / ${p.col[1]}` }}>
                  <span className={`sc-fill ${fillCls}`}>
                    <span
                      className="sc-edge"
                      style={{ "--eg": voice } as React.CSSProperties}
                      aria-hidden="true"
                    />
                  </span>
                  <span className={`sc-in ${textCls} hastick`}>{p.steps.join(" → ")}</span>
                  {p.fin ? (
                    <LaunchPad />
                  ) : (
                    <span
                      className="sc-tick"
                      style={{ "--tk": voice } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      <TickSvg />
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>

        <Deliverables />
      </div>

      {/* Mobile (≤720px): the 8-track grid cannot survive 390px, but the
          proportion does — each phase lights its own share of an
          8-segment track. Copy is identical to desktop. */}
      <div className="sc-mobile">
        {SCHEDULE.map((p) => (
          <div className={`mb-p${p.pre ? " pre" : ""}${p.fin ? " fin" : ""}`} key={p.num}>
            <div className="mb-top">
              <span className="mb-n">{p.num}</span>
              <span className="mb-t">{p.name}</span>
              {p.fin ? (
                <span className="mb-ship">
                  <span className="mb-pad" aria-hidden="true">
                    <span className="mb-rk">
                      <span className="mb-core" />
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1.8c3.4 2.3 5.3 6 5.3 10l-2.3 2.8H9L6.7 11.8c0-4 1.9-7.7 5.3-10Z" fill="var(--ink)" />
                        <path d="M9 14.6h6l-.7 2.4H9.7L9 14.6Z" fill="var(--ink)" />
                      </svg>
                    </span>
                    <svg className="mb-ck2" viewBox="0 0 20 20">
                      <path d="M5.4 10.6l3.1 3.1 6.3-6.9" />
                    </svg>
                  </span>
                  shipped · yours to run
                </span>
              ) : null}
            </div>
            <div className="mb-steps">
              {p.steps.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="mb-track" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span className={`mb-seg${p.segs.includes(i + 1) ? " f" : ""}`} key={i} />
              ))}
            </div>
            <p className="mb-b">{p.body}</p>
          </div>
        ))}
        <Deliverables className="sc-mile-m" />
      </div>
    </section>
  );
}
