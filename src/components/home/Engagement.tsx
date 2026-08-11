"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS } from "@/lib/content";
import { runCountUp, useReducedMotion } from "@/lib/motion";

const STAGE_MS = 7200;
const METER = [12, 42, 74, 100];

/* Design scene: one geometry array renders both SVGs, so the wireframe
   and the styled mock are identical by construction — the effect only
   reads if the shapes stay put and just the treatment changes. */
type MockKind = "plain" | "lime" | "limeSolid" | "cyan" | "cyanSoft";
const MOCK: { x: number; y: number; w: number; h: number; kind: MockKind }[] = [
  { x: 10, y: 12, w: 70, h: 12, kind: "plain" }, // sidebar head
  { x: 10, y: 32, w: 54, h: 10, kind: "plain" },
  { x: 10, y: 48, w: 62, h: 10, kind: "cyanSoft" }, // active row (cyan accent 1)
  { x: 10, y: 64, w: 46, h: 10, kind: "plain" },
  { x: 10, y: 80, w: 58, h: 10, kind: "plain" },
  { x: 10, y: 96, w: 50, h: 10, kind: "plain" },
  { x: 92, y: 12, w: 238, h: 14, kind: "plain" }, // header bar
  { x: 92, y: 40, w: 148, h: 16, kind: "plain" }, // agent bubble
  { x: 178, y: 64, w: 152, h: 16, kind: "lime" }, // reply (lime)
  { x: 92, y: 88, w: 128, h: 16, kind: "plain" },
  { x: 92, y: 112, w: 64, h: 10, kind: "cyan" }, // status chip (cyan accent 2)
  { x: 196, y: 112, w: 134, h: 16, kind: "lime" },
  { x: 92, y: 142, w: 180, h: 20, kind: "plain" }, // input
  { x: 280, y: 142, w: 50, h: 20, kind: "limeSolid" }, // send (lime primary)
];

function MockSvg({ styled }: { styled: boolean }): JSX.Element {
  const style = (kind: MockKind) => {
    if (!styled) return { fill: "none" };
    switch (kind) {
      case "limeSolid":
        return { fill: "var(--acc)" };
      case "lime":
        return { fill: "color-mix(in srgb, var(--acc) 16%, transparent)", stroke: "color-mix(in srgb, var(--acc) 55%, transparent)", strokeWidth: 1 };
      case "cyan":
        return { fill: "color-mix(in srgb, var(--acc2) 35%, transparent)" };
      case "cyanSoft":
        return { fill: "color-mix(in srgb, var(--acc2) 16%, transparent)" };
      default:
        return { fill: "#0f1620", stroke: "color-mix(in srgb, var(--fg) 10%, transparent)", strokeWidth: 1 };
    }
  };
  return (
    <svg
      className={styled ? undefined : "dz-wire"}
      viewBox="0 0 340 176"
      fill="none"
      aria-hidden="true"
    >
      <rect x=".7" y=".7" width="338.6" height="174.6" rx={styled ? 10 : 4} {...(styled ? { stroke: "color-mix(in srgb, var(--fg) 14%, transparent)", strokeWidth: 1, fill: "#0b121b" } : {})} />
      {MOCK.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx={styled ? 9 : 3} {...style(r.kind)} />
      ))}
    </svg>
  );
}

const DP_PATH = "M0 84 C 60 82, 100 74, 150 62 C 200 50, 250 44, 300 30 C 350 18, 400 12, 460 6";

/* The hero engagement panel: four scenes — ideation, design,
   engineering, deployment — driven by ONE stage index on a 7.2s
   interval. The pipeline chips and meter read the same index; chips are
   buttons that jump stages. The interval is gated on an
   IntersectionObserver (threshold: 0). Scenes are CSS animations keyed
   off .stage.on; the only JS state is the index. */
export default function Engagement(): JSX.Element {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const st = useRef({ timer: 0, visible: true });

  const startInterval = useCallback(() => {
    window.clearInterval(st.current.timer);
    st.current.timer = window.setInterval(() => {
      setStage((s) => (s + 1) % 4);
    }, STAGE_MS);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const s = st.current;
    startInterval();
    let io: IntersectionObserver | null = null;
    const root = rootRef.current;
    if (root) {
      io = new IntersectionObserver(
        (entries) => {
          const vis = entries[0].isIntersecting;
          if (vis === s.visible) return;
          s.visible = vis;
          if (vis) startInterval();
          else window.clearInterval(s.timer);
        },
        { threshold: 0 },
      );
      io.observe(root);
    }
    return () => {
      window.clearInterval(s.timer);
      io?.disconnect();
    };
  }, [reduced, startInterval]);

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
    setStage(i);
    if (!reduced) startInterval();
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
          {/* Stage 01 — ideation: six heard, one worth building */}
          <div className={`stage${stage === 0 ? " on" : ""}`}>
            <div className="id-board">
              <div className="id-col">
                <div className="id-colhead">
                  <span>HEARD ON DAY ONE</span>
                  <span className="id-count">6</span>
                </div>
                <div className="id-stack">
                  <span className="idc c1">the demo works, prod doesn&apos;t</span>
                  <span className="idc c2">6 support workflows</span>
                  <span className="idc c3">no evals anywhere</span>
                  <span className="idc c4">legacy data access</span>
                  <span className="idc c5">agent has to escalate</span>
                  <span className="idc c6">rebuild the whole stack?</span>
                </div>
              </div>
              <div className="id-mid">
                <span className="id-sortline" />
                <span className="id-sortmark">sorting</span>
              </div>
              <div className="id-col">
                <div className="id-colhead">
                  <span style={{ color: "var(--acc)" }}>WORTH BUILDING</span>
                  <span className="id-count on">1</span>
                </div>
                <div className="id-out">
                  <span className="id-pick">
                    <span className="id-pickhead">
                      <span className="id-tick">✓</span>one workflow, measured
                    </span>
                    <span className="id-picksub">refunds · eval&apos;d on 4k real transcripts</span>
                  </span>
                  <span className="id-drop">5 deferred, written down, not built</span>
                </div>
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
