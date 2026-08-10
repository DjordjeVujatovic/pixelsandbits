"use client";

import { useEffect, useRef, useState } from "react";
import { PHASES } from "@/lib/content";
import { observeReveal, prefersReducedMotion } from "@/lib/motion";

/* Sequence math derives from the phase count (four since the Measure
   phase was removed): the counter runs 1..N+1, where N+1 is the finale. */
const N = PHASES.length;
const FINALE = N + 1;

function TickSvg(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        className="pb-tick"
        d="M5 12.5 L10 17.5 L19 7"
        stroke="var(--bg)"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RocketSvg(): JSX.Element {
  return (
    <svg className="pb-rocket" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c3.2 2.1 5 5.6 5 9.4l-2.2 2.6h-5.6L7 11.9c0-3.8 1.8-7.3 5-9.4Z"
        fill="var(--bg)"
      />
      <path
        d="M9.2 15.6 8 19l2.4-1.2M14.8 15.6 16 19l-2.4-1.2"
        stroke="var(--bg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Phases complete left→right, one every 780ms, once the section scrolls
   into view. One phase counter drives all three layouts: the card
   timeline (≥1101px), the tablet stepper (721–1100px) and the mobile
   spine (≤720px). The Handover finale replays on hover/tap of that card
   only, guarded while the main sequence runs. */
/* Mobile rail fill: tuned to land just past each node. */
const RAIL_FILL = [12, 38, 64, 92];

export default function ProcessTimeline(): JSX.Element {
  const [phase, setPhase] = useState(0);
  const [tapped, setTapped] = useState<number | null>(null);
  const [panelSeq, setPanelSeq] = useState(0);
  const [railUnlit, setRailUnlit] = useState(false);
  const [stepLit, setStepLit] = useState(false);
  const litTimer = useRef(0);
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timers = useRef<{ seq: number; final: number }>({ seq: 0, final: 0 });
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const unreveal = observeReveal(el);

    if (prefersReducedMotion()) {
      setPhase(FINALE);
      return unreveal;
    }
    const t = timers.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || t.seq || phaseRef.current > 0) return;
          io.disconnect();
          setPhase(1);
          t.seq = window.setInterval(() => {
            setPhase((p) => {
              if (p + 1 > FINALE) {
                window.clearInterval(t.seq);
                t.seq = 0;
                return p;
              }
              return p + 1;
            });
          }, 780);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      unreveal();
      io.disconnect();
      window.clearInterval(t.seq);
      window.clearTimeout(t.final);
    };
  }, []);

  const replayFinal = () => {
    const t = timers.current;
    if (t.seq || t.final || phaseRef.current < FINALE || prefersReducedMotion()) return;
    setPhase(N);
    t.final = window.setTimeout(() => {
      setPhase(FINALE);
      t.final = 0;
    }, 90);
  };

  const phaseClass = (i: number): string => {
    if (i === N - 1 && phase > N) return " pb-phase-done pb-phase-final";
    if (phase > i + 1) return " pb-phase-done";
    if (phase === i + 1) return " pb-phase-active";
    return "";
  };

  // Stepper: manual selection wins; otherwise follow the sequence.
  const activeStep = tapped ?? Math.min(Math.max(phase - 1, 0), N - 1);
  const panelPhase = PHASES[activeStep];

  // Stepper launch: fire whenever the active step BECOMES Handover —
  // from the sequence or a tap. The class is dropped and re-added a beat
  // later so the CSS animations replay; the cleared timeout stops repeat
  // taps from stacking.
  useEffect(() => {
    window.clearTimeout(litTimer.current);
    if (activeStep === N - 1) {
      if (prefersReducedMotion()) {
        setStepLit(true);
        return;
      }
      setStepLit(false);
      litTimer.current = window.setTimeout(() => setStepLit(true), 50);
    } else {
      setStepLit(false);
    }
    return () => window.clearTimeout(litTimer.current);
  }, [activeStep]);

  // Mobile rail: -1 before the sequence starts so nodes begin hollow.
  const railIndex = phase === 0 ? -1 : Math.min(phase - 1, N - 1);
  const railLit = railIndex === N - 1 && !railUnlit;

  // CSS animations only restart if the class is removed and re-added a
  // frame later. Guarded so it cannot fire while the sequence runs.
  const replayRail = () => {
    const t = timers.current;
    if (t.seq || t.final || phaseRef.current < N || prefersReducedMotion()) return;
    setRailUnlit(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setRailUnlit(false));
    });
  };

  return (
    <section id="process" className="pb-rev-r pb-process" ref={rootRef}>
      <div className="pb-shead pb-process-head">
        <div>
          <div className="pb-kicker" style={{ marginBottom: 14 }}>
            $ cat ./process
          </div>
          <h2 className="pb-h-md" style={{ margin: 0 }}>
            How an engagement runs
          </h2>
        </div>
        <div className="pb-process-stats">
          <div>
            <div className="pb-process-stat-v pb-acc">6–8 wks</div>
            <div className="pb-process-stat-c">to first production release</div>
          </div>
          <div>
            <div className="pb-process-stat-v">day 9</div>
            <div className="pb-process-stat-c">in front of real users</div>
          </div>
        </div>
      </div>

      <div className="pb-timeline" ref={timelineRef}>
        {PHASES.map((p, i) => {
          const isLast = i === N - 1;
          const checked = isLast ? phase > N : phase > i + 1;
          return (
            <div
              className={`pb-phase${phaseClass(i)}`}
              key={p.num}
              onMouseEnter={isLast ? replayFinal : undefined}
              onClick={isLast ? replayFinal : undefined}
            >
              <div className="pb-phase-top">
                <span
                  className={`pb-node${isLast ? " pb-node-launch" : ""}${checked ? " pb-check-on" : ""}`}
                >
                  {isLast ? (
                    <>
                      <span className="pb-shock" />
                      <span className="pb-shock pb-shock-b" />
                      <span className="pb-shock pb-shock-c" />
                      <span className="pb-flare" />
                      <span className="pb-core" />
                      <RocketSvg />
                    </>
                  ) : (
                    <TickSvg />
                  )}
                </span>
                {!isLast ? (
                  <span className="pb-line">
                    <span className={`pb-flow${phase > i + 1 ? " pb-flow-on" : ""}`} />
                  </span>
                ) : (
                  <span className="pb-spacer" />
                )}
              </div>
              <div className="pb-phase-card">
                <div className="pb-phase-cardhead">
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="pb-phase-num">{p.num}</span>
                  </span>
                  <span className="pb-phase-week">{p.week}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
                <div className="pb-tags">
                  {p.tags.map((tag) => (
                    <span className="pb-ptag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {isLast ? (
                  <div className={`pb-ship${phase > N ? " pb-ship-on" : ""}`}>
                    <span className="pb-ship-badge">shipped ✓</span>
                    <span className="pb-ship-note">yours to run</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet stepper (721–1100px): the diagram separated from the
          content — rings on one line, one full-size panel below. Driven
          by the same phase counter; no second timer. */}
      <div className="pb-steps">
        <div className="pb-sline">
          {PHASES.map((p, i) => {
            const isLastStep = i === N - 1;
            return (
              <span key={p.num} style={{ display: "contents" }}>
                {i > 0 ? (
                  <span className={`pb-sseg${activeStep >= i ? " pb-son" : ""}`}>
                    <span />
                  </span>
                ) : null}
                <button
                  className={`pb-stop${isLastStep ? " pb-stop-final" : ""}${
                    i < activeStep ? " pb-sdone" : i === activeStep ? " pb-snow" : ""
                  }`}
                  type="button"
                  aria-current={i === activeStep ? "step" : undefined}
                  onClick={() => {
                    setTapped(i);
                    setPanelSeq((s) => s + 1);
                  }}
                >
                  {isLastStep ? (
                    <span
                      className={`pb-sring pb-sring-launch${stepLit ? " pb-slit" : ""}`}
                      aria-hidden="true"
                    >
                      <span className="pb-sshk" />
                      <span className="pb-sshk pb-sshk-b" />
                      <span className="pb-sshk pb-sshk-c" />
                      <span className="pb-sflare" />
                      <span className="pb-score" />
                      <span className="pb-snum">{p.num}</span>
                      <svg className="pb-srk" width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.5c3.2 2.1 5 5.6 5 9.4l-2.2 2.6h-5.6L7 11.9c0-3.8 1.8-7.3 5-9.4Z"
                          fill="var(--bg)"
                        />
                        <path d="M9.2 14.5h5.6l-.6 2.2h-4.4l-.6-2.2Z" fill="var(--bg)" />
                      </svg>
                    </span>
                  ) : (
                    <span className="pb-sring" aria-hidden="true">
                      <span className="pb-snum">{p.num}</span>
                      <svg className="pb-stk" width="11" height="11" viewBox="0 0 12 12">
                        <path
                          d="M2.5 6.2l2.3 2.3 4.7-5"
                          fill="none"
                          stroke="var(--bg)"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <span className="pb-slab">{p.title}</span>
                </button>
              </span>
            );
          })}
        </div>
        <div
          className={`pb-spanel pb-sfade-a${stepLit ? " pb-slit" : ""}`}
          key={`${activeStep}-${panelSeq}`}
        >
          <div>
            <span className="pb-spk">{panelPhase.week.toUpperCase()}</span>
            <h4 className="pb-sph">{panelPhase.title}</h4>
            <p className="pb-spb">{panelPhase.body}</p>
          </div>
          <div className="pb-smeta">
            <div className="pb-sdtags">
              {panelPhase.tags.map((tag) => (
                <span className="pb-sdtag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {/* Always in the DOM so the panel height never jumps; only
                lights up on Handover. */}
            <span className={`pb-sship${stepLit ? " pb-slit" : ""}`}>
              ✓ shipped · yours to run
            </span>
          </div>
        </div>
      </div>

      {/* Mobile rail (≤720px): every step fully readable from first
          paint; only the rail fill, node checks and launch animate.
          Tag chips are intentionally dropped at this size. */}
      <div className="pb-mrail">
        <span className="pb-mtrack" aria-hidden="true" />
        <span
          className="pb-mfill"
          aria-hidden="true"
          style={{ height: railIndex < 0 ? 0 : `${RAIL_FILL[railIndex]}%` }}
        />
        {PHASES.map((p, i) => {
          const isLast = i === N - 1;
          const done = railIndex >= i;
          return (
            <div
              className="pb-mstep"
              key={p.num}
              onClick={isLast ? replayRail : undefined}
            >
              {isLast ? (
                <span className={`pb-mrkn${railLit ? " pb-mlit" : ""}`} aria-hidden="true">
                  <span className="pb-mshk" />
                  <span className="pb-mshk pb-mshk-b" />
                  <span className="pb-mshk pb-mshk-c" />
                  <span className="pb-mflare" />
                  <span className="pb-mcore" />
                  <svg className="pb-mrk" width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2.5c3.2 2.1 5 5.6 5 9.4l-2.2 2.6h-5.6L7 11.9c0-3.8 1.8-7.3 5-9.4Z"
                      fill="var(--bg)"
                    />
                    <path d="M9.2 14.5h5.6l-.6 2.2h-4.4l-.6-2.2Z" fill="var(--bg)" />
                  </svg>
                </span>
              ) : (
                <span
                  className={`pb-mnd${done ? "" : " pb-mhollow"}`}
                  aria-hidden="true"
                >
                  <svg className="pb-mtk" width="8" height="8" viewBox="0 0 12 12">
                    <path
                      d="M2.5 6.2l2.3 2.3 4.7-5"
                      fill="none"
                      stroke="var(--bg)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <div className="pb-mtop">
                <span className="pb-mn">{p.num}</span>
                <h4 className="pb-mt">{p.title}</h4>
                <span className="pb-mw">{p.week}</span>
              </div>
              <p className="pb-mb">{p.body}</p>
              {isLast ? (
                <span className={`pb-mship${railLit ? " pb-mlit" : ""}`}>
                  ✓ shipped · yours to run
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
