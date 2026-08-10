"use client";

import { useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS, TERMINAL_SCRIPT } from "@/lib/content";
import type { TermLine } from "@/lib/content";
import { useReducedMotion } from "@/lib/motion";

interface FlatLine {
  cls: string;
  mark: string;
  text: string;
  ms: string;
}

function flatten(item: TermLine): FlatLine {
  if ("cmd" in item) return { cls: "pb-fl-cmd", mark: "$", text: item.cmd, ms: "" };
  return { cls: item.cls, mark: item.mark, text: item.out, ms: item.ms ?? "" };
}

const FINAL_FEED = TERMINAL_SCRIPT.map(flatten).slice(-9);

/* The live terminal. All per-character work writes through the DOM — the
   only React state is the discrete pipeline phase (8 updates per loop).
   Timers pause when the terminal leaves the viewport (threshold: 0) and
   the feed resets before resuming so a mid-typing pause can't leave an
   empty caret. The loop also starts unconditionally on mount. */
export default function Terminal(): JSX.Element {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const state = useRef({ visible: true, running: false, timer: 0 });

  useEffect(() => {
    if (reduced) {
      setPhase(3);
      return;
    }
    const st = state.current;
    const feed = feedRef.current;
    if (!feed) return;

    // Committed-line cap sized to the fixed body height so the typing
    // row is never clipped. Rows are line-height + the feed's 3px gap:
    // desktop 268px content fits 9+1 rows at 13px; the 208px/178px
    // mobile bodies fit 7+1 and 6+1 at 12px.
    const cap = window.matchMedia("(max-width: 480px)").matches
      ? 6
      : window.matchMedia("(max-width: 720px)").matches
        ? 7
        : 9;

    const makeLine = (l: FlatLine): HTMLDivElement => {
      const row = document.createElement("div");
      row.className = `pb-fl${l.cls ? ` ${l.cls}` : ""}`;
      const gutter = document.createElement("span");
      gutter.className = "pb-fl-gutter";
      gutter.textContent = l.mark;
      const text = document.createElement("span");
      text.className = "pb-fl-text";
      text.textContent = l.text;
      const ms = document.createElement("span");
      ms.className = "pb-fl-ms";
      ms.textContent = l.ms;
      row.append(gutter, text, ms);
      return row;
    };

    let typingRow: HTMLDivElement | null = null;
    let typingText: HTMLSpanElement | null = null;

    const clearFeed = () => {
      feed.textContent = "";
      typingRow = null;
      typingText = null;
    };

    const pushLine = (l: FlatLine) => {
      feed.appendChild(makeLine(l));
      const committed = Array.from(feed.children).filter((c) => c !== typingRow);
      while (committed.length > cap) {
        const first = committed.shift();
        first?.remove();
      }
    };

    const openTyping = () => {
      typingRow = document.createElement("div");
      typingRow.className = "pb-fl pb-fl-cmd";
      const gutter = document.createElement("span");
      gutter.className = "pb-fl-gutter";
      gutter.textContent = "$";
      const text = document.createElement("span");
      text.className = "pb-fl-text";
      typingText = document.createElement("span");
      const caret = document.createElement("span");
      caret.className = "pb-caretblock";
      text.append(typingText, caret);
      const ms = document.createElement("span");
      ms.className = "pb-fl-ms";
      typingRow.append(gutter, text, ms);
      feed.appendChild(typingRow);
    };

    const closeTyping = () => {
      typingRow?.remove();
      typingRow = null;
      typingText = null;
    };

    const run = () => {
      if (!st.visible) {
        st.running = false;
        return;
      }
      let i = 0;
      const step = () => {
        if (!st.visible) {
          st.running = false;
          return;
        }
        if (i >= TERMINAL_SCRIPT.length) {
          st.timer = window.setTimeout(() => {
            clearFeed();
            setPhase(-1);
            i = 0;
            step();
          }, 6000);
          return;
        }
        const item = TERMINAL_SCRIPT[i];
        if ("cmd" in item) {
          if (item.phase !== undefined) setPhase(item.phase);
          let n = 0;
          openTyping();
          const type = () => {
            n += 1;
            if (typingText) typingText.textContent = item.cmd.slice(0, n);
            if (n < item.cmd.length) {
              st.timer = window.setTimeout(type, 26);
            } else {
              st.timer = window.setTimeout(() => {
                closeTyping();
                pushLine(flatten(item));
                i += 1;
                st.timer = window.setTimeout(step, 260);
              }, 320);
            }
          };
          st.timer = window.setTimeout(type, 240);
        } else {
          pushLine(flatten(item));
          i += 1;
          st.timer = window.setTimeout(step, 340);
        }
      };
      step();
    };

    // Start unconditionally on mount so a viewport the observer never
    // reports as intersecting still gets a typing terminal.
    st.visible = true;
    st.running = true;
    st.timer = window.setTimeout(run, 700);

    let io: IntersectionObserver | null = null;
    const root = rootRef.current;
    if (root) {
      io = new IntersectionObserver(
        (entries) => {
          const vis = entries[0].isIntersecting;
          if (vis === st.visible) return;
          st.visible = vis;
          if (vis) {
            if (st.running) return;
            st.running = true;
            clearFeed();
            setPhase(-1);
            st.timer = window.setTimeout(run, 300);
          } else {
            window.clearTimeout(st.timer);
            st.running = false;
          }
        },
        { threshold: 0 },
      );
      io.observe(root);
    }

    return () => {
      window.clearTimeout(st.timer);
      st.running = false;
      io?.disconnect();
      clearFeed();
      setPhase(-1);
    };
  }, [reduced]);

  const stepClass = (i: number): string => {
    if (phase === i) return " pb-pnow";
    if (phase > i && i < 3) return " pb-pon";
    return "";
  };
  const meter = `${Math.round(((phase + 1) / 4) * 100)}%`;
  const shippedState = phase >= 3;

  return (
    <div className="pb-term" ref={rootRef} aria-hidden="true">
      <span className="pb-term-halo" />
      <div className="pb-term-shell">
        <div className="pb-term-bar">
          <span className="pb-dot" />
          <span className="pb-dot" />
          <span className="pb-dot" />
          <span className="pb-term-name">pixelsandbits — engagement</span>
          <span className="pb-spacer" />
          <span className="pb-live-dot" />
          <span className="pb-term-status">{shippedState ? "shipped" : "live"}</span>
        </div>
        <div className="pb-term-body">
          <div className="pb-term-feed">
            {/* Rendered client-side only (reduced is false during SSR),
                so sizing the static feed to the mobile bodies is safe. */}
            {reduced
              ? FINAL_FEED.slice(
                  window.matchMedia("(max-width: 480px)").matches
                    ? -7
                    : window.matchMedia("(max-width: 720px)").matches
                      ? -8
                      : -9,
                ).map((l, k) => (
                  <div className={`pb-fl${l.cls ? ` ${l.cls}` : ""}`} key={k}>
                    <span className="pb-fl-gutter">{l.mark}</span>
                    <span className="pb-fl-text">{l.text}</span>
                    <span className="pb-fl-ms">{l.ms}</span>
                  </div>
                ))
              : null}
            {/* Live lines are appended here through refs, never state.
                Kept separate from the React-rendered static rows so the
                effect cleanup can't wipe them. */}
            <div ref={feedRef} style={{ display: "contents" }} />
          </div>
        </div>
        <div className="pb-term-foot">
          <div className="pb-pipeline">
            {PIPELINE_STEPS.map((s, i) => (
              <span key={s} style={{ display: "contents" }}>
                {i > 0 ? <span className={`pb-pconn${phase >= i ? " pb-con" : ""}`} /> : null}
                <span className={`pb-pstep${stepClass(i)}`}>{s}</span>
              </span>
            ))}
          </div>
          <div className="pb-meter">
            <span className="pb-meter-fill" style={{ width: meter }} />
          </div>
          <div className="pb-term-footrow">
            <span>{shippedState ? "shipped & handed over" : "engagement in progress"}</span>
            <span className="pb-pct">{meter}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
