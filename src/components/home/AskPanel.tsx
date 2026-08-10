"use client";

import { useEffect, useRef, useState } from "react";
import { ASK_QA } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

/* The "ask us" panel. A canned answer streams in like a model response:
   question types out, a short trace appears, then the answer streams
   word by word. All streaming writes go through the DOM; React state
   holds only the selected question and the running/done flags. The
   interval pauses while the panel is off screen. */
export default function AskPanel(): JSX.Element {
  const [qi, setQi] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [showCites, setShowCites] = useState(false);

  const qTextRef = useRef<HTMLSpanElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tokensRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const sim = useRef({
    timer: 0,
    tick: 0,
    shown: 0,
    traceN: 0,
    typed: 0,
    visible: true,
    started: false,
    item: ASK_QA[0],
  });
  const runRef = useRef<(i: number) => void>(() => undefined);

  useEffect(() => {
    const st = sim.current;
    const root = rootRef.current;
    let io: IntersectionObserver | null = null;
    if (root) {
      io = new IntersectionObserver(
        (entries) => {
          st.visible = entries[0].isIntersecting;
          // Autoplay the first question the first time the panel scrolls
          // into view; a user selection is never overridden.
          if (st.visible && !st.started) {
            st.started = true;
            runRef.current(0);
          }
        },
        { threshold: 0 },
      );
      io.observe(root);
    }
    return () => {
      window.clearInterval(st.timer);
      io?.disconnect();
    };
  }, []);

  const appendTrace = (mark: string, text: string, ms: string) => {
    const el = traceRef.current;
    if (!el) return;
    const row = document.createElement("div");
    row.className = "pb-trace-line";
    const m = document.createElement("span");
    m.className = "pb-trace-mark";
    m.textContent = mark;
    const t = document.createElement("span");
    t.textContent = text;
    const s = document.createElement("span");
    s.className = "pb-trace-ms";
    s.textContent = ms;
    row.append(m, t, s);
    el.appendChild(row);
  };

  const appendWord = (w: string) => {
    const el = wordsRef.current;
    if (!el) return;
    const sp = document.createElement("span");
    sp.className = "pb-ask-w";
    sp.textContent = w;
    el.appendChild(sp);
  };

  const setMeta = (typed: number, total: number, isRunning: boolean) => {
    if (fillRef.current) {
      fillRef.current.style.width = `${Math.round((typed / total) * 100)}%`;
    }
    if (tokensRef.current) {
      tokensRef.current.textContent = `${typed} tokens · ${isRunning ? "streaming" : "idle"}`;
    }
    if (statusRef.current) {
      statusRef.current.textContent = isRunning
        ? "generating…"
        : typed
          ? "done · 0 hallucinations, we checked"
          : "idle";
    }
  };

  const run = (i: number) => {
    const st = sim.current;
    st.started = true;
    window.clearInterval(st.timer);
    st.item = ASK_QA[i];
    st.tick = 0;
    st.shown = 0;
    st.traceN = 0;
    st.typed = 0;
    if (qTextRef.current) qTextRef.current.textContent = "";
    if (traceRef.current) traceRef.current.textContent = "";
    if (wordsRef.current) wordsRef.current.textContent = "";
    setQi(i);
    setShowCites(false);

    const words = st.item.a.split(" ");

    if (prefersReducedMotion()) {
      if (qTextRef.current) qTextRef.current.textContent = st.item.q;
      st.item.trace.forEach(([mark, text, ms]) => appendTrace(mark, text, ms));
      words.forEach(appendWord);
      st.typed = words.length;
      setMeta(words.length, words.length, false);
      setRunning(false);
      setShowCites(true);
      return;
    }

    setRunning(true);
    setMeta(0, words.length, true);

    st.timer = window.setInterval(() => {
      if (!st.visible) return;
      st.tick += 1;
      if (st.shown < st.item.q.length) {
        st.shown = Math.min(st.item.q.length, st.shown + 2);
        if (qTextRef.current) qTextRef.current.textContent = st.item.q.slice(0, st.shown);
      } else if (st.traceN < st.item.trace.length) {
        if (st.tick % 7 === 0) {
          const [mark, text, ms] = st.item.trace[st.traceN];
          appendTrace(mark, text, ms);
          st.traceN += 1;
        }
      } else if (st.typed < words.length) {
        appendWord(words[st.typed]);
        st.typed += 1;
        setMeta(st.typed, words.length, true);
      } else {
        window.clearInterval(st.timer);
        st.timer = 0;
        setMeta(st.typed, words.length, false);
        setRunning(false);
        setShowCites(true);
      }
    }, 34);
  };
  runRef.current = run;

  const item = qi === null ? null : ASK_QA[qi];

  return (
    <div className={`pb-ask-shell${running ? " pb-live" : ""}`} ref={rootRef}>
      <div className="pb-ask-bar">
        <span className="pb-ask-name">pixels&bits · ask-us</span>
        <span className="pb-spacer" />
        <span className="pb-ask-tokens" ref={tokensRef}>
          0 tokens · idle
        </span>
      </div>

      <div className="pb-ask-body">
        <div className="pb-ask-chips">
          {ASK_QA.map((q, i) => (
            <button
              className="pb-chip"
              type="button"
              key={q.q}
              aria-pressed={qi === i}
              onClick={() => run(i)}
            >
              {q.q}
            </button>
          ))}
        </div>

        <div className="pb-ask-prompt">
          <span className="pb-ask-gt" aria-hidden="true">
            &gt;
          </span>
          <span className="pb-ask-q">
            <span ref={qTextRef} />
            <span className="pb-ask-qcaret" aria-hidden="true">
              ▍
            </span>
          </span>
          <span className="pb-ask-pick">pick a prompt →</span>
        </div>

        <div className="pb-ask-trace" ref={traceRef} aria-hidden="true" />

        <div className="pb-ask-answer">
          <span className="pb-ask-diamond" aria-hidden="true">
            ◆
          </span>
          <p className="pb-ask-words">
            <span ref={wordsRef} style={{ display: "contents" }} />
            <span className="pb-ask-acaret" aria-hidden="true" />
          </p>
        </div>

        {showCites && item ? (
          <div className="pb-ask-cites">
            <span className="pb-ask-srcs">sources</span>
            {item.cites.map(([label, href]) => (
              <a className="pb-ask-cite" href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="pb-ask-foot">
          <span className="pb-wave" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} />
            ))}
          </span>
          <span className="pb-ask-track">
            <span className="pb-ask-fill" ref={fillRef} />
          </span>
          <span className="pb-ask-status" ref={statusRef}>
            idle
          </span>
        </div>
      </div>
    </div>
  );
}
