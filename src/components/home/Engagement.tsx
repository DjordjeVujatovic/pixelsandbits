"use client";

import { useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS } from "@/lib/content";
import { runCountUp, useReducedMotion } from "@/lib/motion";

/* Per-scene durations: each scene's animation end time plus a short
   beat to read, so the panel moves on shortly after a scene finishes
   instead of holding a flat interval.
   ideation ends ~3.9s · design ~1.9s · engineering ~2.5s · deploy ~1.8s */
const STAGE_MS = [5300, 3200, 3900, 3400];
const METER = [12, 42, 74, 100];

/* Design scene: one geometry set renders both SVGs, so the wireframe
   and the styled mock are identical by construction — the effect only
   reads if the shapes stay put and just the treatment changes.
   Layout (a dashboard, per the approved mock): a top bar with a lime
   CTA pill, a hero card with two side cards, and three stat cards. */
type MockTint = "plain" | "lime" | "cyan";
const MOCK_FRAMES: { x: number; y: number; w: number; h: number; tint: MockTint }[] = [
  { x: 8, y: 8, w: 324, h: 26, tint: "plain" }, // top bar
  { x: 8, y: 42, w: 182, h: 62, tint: "lime" }, // hero card
  { x: 198, y: 42, w: 134, h: 30, tint: "cyan" }, // side card (cyan)
  { x: 198, y: 80, w: 134, h: 24, tint: "plain" }, // side card
  { x: 8, y: 112, w: 103, h: 56, tint: "lime" }, // stat card 1
  { x: 119, y: 112, w: 103, h: 56, tint: "lime" }, // stat card 2
  { x: 230, y: 112, w: 102, h: 56, tint: "cyan" }, // stat card 3 (cyan)
];
const MOCK_BLOCKS: { x: number; y: number; w: number; h: number; c: MockTint }[] = [
  { x: 34, y: 16, w: 62, h: 10, c: "plain" }, // top-bar title
  { x: 262, y: 16, w: 52, h: 10, c: "lime" }, // top-bar CTA
  { x: 22, y: 54, w: 76, h: 11, c: "lime" }, // hero heading
  { x: 22, y: 73, w: 118, h: 7, c: "plain" },
  { x: 22, y: 86, w: 52, h: 7, c: "plain" },
  { x: 210, y: 51, w: 46, h: 11, c: "cyan" },
  { x: 210, y: 88, w: 88, h: 8, c: "plain" },
  { x: 22, y: 126, w: 42, h: 11, c: "lime" },
  { x: 133, y: 126, w: 42, h: 11, c: "lime" },
  { x: 244, y: 126, w: 42, h: 11, c: "cyan" },
  { x: 22, y: 146, w: 66, h: 7, c: "plain" },
  { x: 133, y: 146, w: 66, h: 7, c: "plain" },
  { x: 244, y: 146, w: 66, h: 7, c: "plain" },
];

/* The start state is a PURE wireframe: empty plain-grey dashed frames.
   The wipe fills in the tinted borders, the pills and the bars — but
   everything stays dashed: a design in progress, not a hi-fi handoff.
   Blocks render invisibly in the wireframe pass so both SVGs keep
   identical geometry. */
function MockSvg({ styled }: { styled: boolean }): JSX.Element {
  const frameStroke = (tint: MockTint) => {
    if (!styled) return "#3d4a5c";
    if (tint === "lime") return "color-mix(in srgb, var(--acc) 50%, transparent)";
    if (tint === "cyan") return "color-mix(in srgb, var(--acc2) 50%, transparent)";
    return "#3d4a5c";
  };
  const blockFill = (c: MockTint) => {
    if (!styled) return "none";
    if (c === "lime") return "var(--acc)";
    if (c === "cyan") return "var(--acc2)";
    return "#3d4a5c";
  };
  return (
    <svg className={styled ? undefined : "dz-wire"} viewBox="0 0 340 176" fill="none" aria-hidden="true">
      {MOCK_FRAMES.map((r, i) => (
        <rect
          key={`f${i}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          rx={8}
          stroke={frameStroke(r.tint)}
          strokeWidth={1.4}
          strokeDasharray="4 4"
          fill={styled ? "color-mix(in srgb, var(--fg) 2.5%, transparent)" : "color-mix(in srgb, var(--fg) 1.5%, transparent)"}
        />
      ))}
      <circle cx="20" cy="21" r="3.5" fill={styled ? "var(--acc)" : "none"} />
      {MOCK_BLOCKS.map((r, i) => (
        <rect key={`b${i}`} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.h / 2} fill={blockFill(r.c)} />
      ))}
    </svg>
  );
}

const DP_PATH = "M0 84 C 60 82, 100 74, 150 62 C 200 50, 250 44, 300 30 C 350 18, 400 12, 460 6";

/* The hero engagement panel: four scenes — ideation, design,
   engineering, deployment — driven by ONE stage index with per-scene
   durations (each scene advances shortly after its animation ends).
   The pipeline chips and meter read the same index; chips are buttons
   that jump stages. The clock is gated on an IntersectionObserver
   (threshold: 0). Scenes are CSS animations keyed off .stage.on; the
   only JS state is the index. */
export default function Engagement(): JSX.Element {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  // Gate on visibility (threshold: 0); the scheduling effect below
  // pauses while hidden and restarts the current scene's clock on
  // return.
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduced]);

  // One timeout per scene, sized to that scene's animation. A chip jump
  // re-runs this effect, giving the chosen scene its full duration.
  useEffect(() => {
    if (reduced || !visible) return;
    timer.current = window.setTimeout(() => {
      setStage((s) => (s + 1) % 4);
    }, STAGE_MS[stage]);
    return () => window.clearTimeout(timer.current);
  }, [stage, visible, reduced]);

  // Deployment figures count up each time the stage becomes active,
  // writing textContent directly.
  useEffect(() => {
    if (stage !== 3) return;
    rootRef.current?.querySelectorAll<HTMLElement>(".dp-v[data-count]").forEach((el) => {
      delete el.dataset.done;
      runCountUp(el);
    });
  }, [stage]);

  const jump = (i: number) => {
    setStage(i); // the scheduling effect restarts the clock for this scene
  };

  const stepClass = (i: number): string => {
    if (stage === i) return " pb-pnow";
    if (stage > i) return " pb-pon";
    return "";
  };

  return (
    <div className="pb-term" ref={rootRef}>
      <span className="pb-term-halo" />
      <div className="pb-term-shell">
        <div className="pb-term-bar">
          <span className="pb-dot" />
          <span className="pb-dot" />
          <span className="pb-dot" />
          <span className="pb-term-name">pixelsandbits — engagement</span>
          <span className="pb-spacer" />
          <span className="pb-live-dot" />
          <span className="pb-term-status">{stage === 3 ? "shipped" : "live"}</span>
        </div>

        <div className="stagewrap" aria-hidden="true">
          {/* Stage 01 — ideation: the interview on the support floor */}
          <div className={`stage${stage === 0 ? " on" : ""}`}>
            <div className="iv">
              <div className="iv-head">
                <span>ON SITE · SUPPORT FLOOR</span>
                <span className="iv-rule" />
                <span className="iv-rec">
                  <i />
                  listening
                </span>
              </div>

              <div className="iv-q">
                <i>?</i>
                <span className="iv-qwrap">
                  <span className="iv-qt">
                    what takes the longest, every day?
                    <span className="iv-caret" />
                  </span>
                </span>
              </div>

              <div className="iv-turn" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="iv-av">AK</span>
                <span className="iv-body">
                  <span className="iv-who">TIER 1 · 4 YRS</span>
                  <span className="iv-said">
                    &quot;refunds. i check{" "}
                    <span className="iv-key" style={{ "--i": 0 } as React.CSSProperties}>
                      three systems
                    </span>{" "}
                    before i can answer.&quot;
                  </span>
                </span>
              </div>

              <div className="iv-turn" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="iv-av">RM</span>
                <span className="iv-body">
                  <span className="iv-who">TIER 2 · TEAM LEAD</span>
                  <span className="iv-said">
                    &quot;the bot gets it wrong, so i redo it{" "}
                    <span className="iv-key" style={{ "--i": 1 } as React.CSSProperties}>
                      by hand
                    </span>
                    .&quot;
                  </span>
                </span>
              </div>

              <div className="iv-turn iv-turn-3" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="iv-av">JP</span>
                <span className="iv-body">
                  <span className="iv-who">SUPPORT OPS</span>
                  <span className="iv-said">
                    &quot;nobody knows if it&apos;s{" "}
                    <span className="iv-key" style={{ "--i": 2 } as React.CSSProperties}>
                      getting better
                    </span>
                    .&quot;
                  </span>
                </span>
              </div>

              <div className="iv-note">
                <span className="iv-tick">✓</span>
                <span>scope: refunds, measured</span>
                <span>4k transcripts</span>
              </div>
            </div>
            <div className="st-cap">
              <span>on site with the team · constraints in, scope out</span>
              <span>
                <b>week 01</b>
              </span>
            </div>
          </div>

          {/* Stage 02 — design: wireframe wipes into the styled surface */}
          <div className={`stage${stage === 1 ? " on" : ""}`}>
            <div className="dz">
              <MockSvg styled={false} />
              <div className="dz-real">
                <MockSvg styled />
              </div>
              <span className="dz-beam" />
            </div>
            <div className="st-cap">
              <span>the agent surface, in front of real operators</span>
              <span>
                <b>week 02</b>
              </span>
            </div>
          </div>

          {/* Stage 03 — engineering: code + CI run */}
          <div className={`stage${stage === 2 ? " on" : ""}`}>
            <div className="en">
              <div className="en-code">
                <div>
                  <span className="en-c">{"// eval harness"}</span>
                </div>
                <div>
                  <span className="en-k">export async function</span> <span className="en-f">runEvals</span>(set) {"{"}
                </div>
                <div>
                  &nbsp;&nbsp;<span className="en-k">const</span> t = <span className="en-k">await</span>{" "}
                  <span className="en-f">loadTranscripts</span>(set)
                </div>
                <div>
                  &nbsp;&nbsp;<span className="en-k">return</span> t.<span className="en-f">map</span>(score).
                  <span className="en-f">filter</span>(regress)
                </div>
                <div>{"}"}</div>
                <div>
                  <span className="en-c">{"// wired to production traffic"}</span>
                </div>
                <div>
                  <span className="en-f">deploy</span>(<span style={{ color: "var(--acc)" }}>&apos;agent-v4&apos;</span>){" "}
                  <span className="en-ok">→ ok</span>
                </div>
              </div>
              <div className="en-graph">
                <div className="en-ghead">
                  <span>CI · main</span>
                  <span className="en-gok">passing</span>
                </div>
                <div className="en-checks">
                  <span className="en-chk k1">
                    <span className="en-cm">✓</span>typecheck<span className="en-ct">2.1s</span>
                  </span>
                  <span className="en-chk k2">
                    <span className="en-cm">✓</span>unit · 214<span className="en-ct">6.4s</span>
                  </span>
                  <span className="en-chk k3">
                    <span className="en-cm">✓</span>evals · 4k<span className="en-ct">41s</span>
                  </span>
                  <span className="en-chk k4">
                    <span className="en-cm">✓</span>e2e<span className="en-ct">18s</span>
                  </span>
                </div>
                <div className="en-scorewrap">
                  <div className="en-scorehead">
                    <span>eval pass rate</span>
                    <span className="en-scoreval">94%</span>
                  </div>
                  <div className="en-bar">
                    <span />
                  </div>
                  <div className="en-delta">↑ 12 pts vs. baseline</div>
                </div>
                <div className="en-deploy">
                  <span className="en-dot" />
                  deploying agent-v4 → prod
                </div>
              </div>
            </div>
            <div className="st-cap">
              <span>evals, agent flows, and the integration nobody demos</span>
              <span>
                <b>week 03–06</b>
              </span>
            </div>
          </div>

          {/* Stage 04 — deployment: the release lands, traffic arrives */}
          <div className={`stage${stage === 3 ? " on" : ""}`}>
            <div className="dp">
              <div className="dp-top">
                <span className="dp-badge">✓ agent live in production</span>
                <span className="dp-rule" />
                <span className="dp-region">v4.0 · 3 regions · rollout 100%</span>
              </div>
              <div className="dp-chart">
                <svg viewBox="0 0 460 96" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dpg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c6f24e" stopOpacity=".3" />
                      <stop offset="100%" stopColor="#c6f24e" stopOpacity="0" />
                    </linearGradient>
                    <path id="dpp" d={DP_PATH} />
                  </defs>
                  <g className="dp-grid">
                    <line x1="0" y1="24" x2="460" y2="24" />
                    <line x1="0" y1="48" x2="460" y2="48" />
                    <line x1="0" y1="72" x2="460" y2="72" />
                  </g>
                  <g className="dp-clip">
                    <path className="dp-area" d={`M0 92 L0 84 ${DP_PATH.slice(5)} L460 96 L0 96 Z`} />
                  </g>
                  <use className="dp-line" href="#dpp" />
                  <circle className="dp-head" r="3.5" fill="#c6f24e" style={{ offsetPath: `path('${DP_PATH}')` }} />
                </svg>
                <span className="dp-live">
                  <i />
                  live traffic
                </span>
              </div>
              <div className="dp-stats">
                <div className="dp-stat">
                  <div className="dp-v" data-count="120" data-suffix="k" data-dur="1200">
                    120k
                  </div>
                  <div className="dp-k">conversations handled</div>
                </div>
                <div className="dp-stat">
                  <div className="dp-v" data-count="68" data-suffix="%" data-dur="1200">
                    68%
                  </div>
                  <div className="dp-k">resolved without a human</div>
                </div>
                <div className="dp-stat">
                  <div className="dp-v" data-count="94" data-suffix="%" data-dur="1200">
                    94%
                  </div>
                  <div className="dp-k">eval pass rate</div>
                </div>
              </div>
            </div>
            <div className="st-cap">
              <span>evals wired to live traffic · yours to run</span>
              <span>
                <b>live</b>
              </span>
            </div>
          </div>
        </div>

        <div className="pb-term-foot">
          <div className="pb-pipeline">
            {PIPELINE_STEPS.map((s, i) => (
              <span key={s} style={{ display: "contents" }}>
                {i > 0 ? <span className={`pb-pconn${stage >= i ? " pb-con" : ""}`} /> : null}
                <button
                  className={`pb-pstep${stepClass(i)}`}
                  type="button"
                  aria-current={stage === i ? "step" : undefined}
                  aria-label={`Show the ${s} stage`}
                  onClick={() => jump(i)}
                >
                  {s}
                </button>
              </span>
            ))}
          </div>
          <div className="pb-meter">
            <span className="pb-meter-fill" style={{ width: `${METER[stage]}%` }} />
          </div>
          <div className="pb-term-footrow">
            <span>{stage === 3 ? "shipped & handed over" : "engagement in progress"}</span>
            <span className="pb-pct">{METER[stage]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
