"use client";

import { useEffect, useRef } from "react";
import { observeReveal, prefersReducedMotion } from "@/lib/motion";

const CH = "01<>/#$%&*!?[]{}=+~";
const rnd = (): string => CH[(Math.random() * CH.length) | 0];
/* The scan band is the ONLY sanctioned responsive difference in this
   card (PORTFOLIO_one_at_a_time.md): 140px on desktop, 100px where the
   card is narrower. Everything else — 4200ms, once-only, per-line
   resolution, glyph set, DOM writes — must not change. */
const band = (): number =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 1100px)").matches ? 100 : 140;
const TRAVEL = 4200;

interface DecItem {
  sp: HTMLSpanElement;
  real: string;
  cipher: string;
  at: number;
}
interface DecLine {
  items: DecItem[];
  len: number;
  h: number;
  state?: "done" | "enc" | "mid";
}

/* Decode blocks: real copy in a visually-hidden layer for screen readers
   and SEO; the animating cipher layer is aria-hidden. */
function Decipher({ text, className }: { text: string; className?: string }): JSX.Element {
  return (
    <>
      <span className={`pb-decipher${className ? ` ${className}` : ""}`} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

const HEADLINE = "rl-environments";
const PARA =
  "Currently embedded with a leading AI frontier model lab, building reinforcement learning environments. That is genuinely as much as we can say until the project ships. The client is named in the contract, the case study and, eventually, this card.";
const STATS: [string, string][] = [
  ["RL envs", "training environments, not demos"],
  ["frontier", "one of a handful of labs at this level"],
  ["in flight", "name unlocks when it ships"],
];

/* CASE_01 — the declassification scan. Each character gets ONE static
   cipher glyph at setup; lines decode left-to-right as the scan bar's
   bright edge crosses them, with only the three frontier characters
   flickering. Runs once, then the observer disconnects. All text writes
   go through the DOM — never component state. */
export default function CaseRedacted(): JSX.Element {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const unreveal = observeReveal(card);
    if (prefersReducedMotion()) return unreveal;

    const els = Array.from(card.querySelectorAll<HTMLElement>(".pb-decipher"));
    if (!els.length) return unreveal;

    let lines: DecLine[] = [];
    let done = false;
    let visible = false;
    let raf = 0;
    let t0: number | null = null;

    const build = () => {
      lines = [];
      els.forEach((el) => {
        if (!el.dataset.real) el.dataset.real = el.textContent ?? "";
        const words = el.dataset.real.split(" ");
        el.textContent = "";
        const items = words.map((w, i) => {
          const sp = document.createElement("span");
          sp.textContent = w;
          el.appendChild(sp);
          if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
          return { sp, real: w, cipher: w.split("").map(rnd).join(""), at: 0 };
        });
        const byTop = new Map<number, DecItem[]>();
        items.forEach((it) => {
          const t = it.sp.offsetTop;
          const group = byTop.get(t);
          if (group) group.push(it);
          else byTop.set(t, [it]);
        });
        Array.from(byTop.keys())
          .sort((a, b) => a - b)
          .forEach((t) => {
            const group = byTop.get(t);
            if (!group) return;
            let n = 0;
            group.forEach((it) => {
              it.at = n;
              n += it.real.length + 1;
            });
            const r0 = group[0].sp.getBoundingClientRect();
            lines.push({ items: group, len: n, h: r0.height });
          });
      });
    };

    const paintLine = (ln: DecLine, prog: number) => {
      if (ln.state === "done" && prog >= 1) return;
      if (ln.state === "enc" && prog <= 0) return;
      ln.state = prog >= 1 ? "done" : prog <= 0 ? "enc" : "mid";
      const cut = Math.floor(ln.len * Math.min(1, Math.max(0, prog)));
      ln.items.forEach((it) => {
        let out = "";
        for (let k = 0; k < it.real.length; k++) {
          const gi = it.at + k;
          out += gi < cut ? it.real[k] : gi < cut + 3 ? rnd() : it.cipher[k];
        }
        if (it.sp.textContent !== out) it.sp.textContent = out;
        it.sp.style.color = prog >= 1 ? "" : "color-mix(in srgb, var(--acc) 80%, transparent)";
      });
    };

    let io: IntersectionObserver | null = null;

    const frame = (now: number) => {
      if (!visible) return;
      if (t0 === null) t0 = now;
      const el = now - t0;
      if (el > TRAVEL) {
        lines.forEach((ln) => paintLine(ln, 1));
        card.style.setProperty("--pb-scan", `${card.offsetHeight + band()}px`);
        done = true;
        raf = 0;
        io?.disconnect();
        io = null;
        return;
      }
      const prog = Math.min(1, el / TRAVEL);
      const y = prog * (card.offsetHeight + band());
      card.style.setProperty("--pb-scan", `${y}px`);
      const cardTop = card.getBoundingClientRect().top;
      lines.forEach((ln) => {
        const top = ln.items[0].sp.getBoundingClientRect().top - cardTop;
        paintLine(ln, (y - top) / Math.max(12, ln.h * 1.4));
      });
      raf = requestAnimationFrame(frame);
    };

    build();
    lines.forEach((ln) => paintLine(ln, 0));

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        lines.forEach((ln) => paintLine(ln, done ? 1 : 0));
      }, 220);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => {
      if (done) return;
      build();
      lines.forEach((ln) => paintLine(ln, 0));
    });

    io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0].isIntersecting;
        if (vis === visible) return;
        visible = vis;
        if (done) {
          io?.disconnect();
          io = null;
          return;
        }
        if (vis) {
          t0 = null;
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
          lines.forEach((ln) => paintLine(ln, 0));
        }
      },
      { threshold: 0 },
    );
    io.observe(card);

    return () => {
      unreveal();
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, []);

  return (
    <article className="pb-rev-l pb-card pb-redcard" id="c1" ref={cardRef}>
      <div className="pb-redcard-left">
        <div className="pb-redcard-tags">
          <span className="pb-case-num">CASE_01</span>
          <span className="pb-nda">
            <span className="pb-nda-dot" aria-hidden="true" />
            UNDER NDA
          </span>
        </div>
        <h3
          className="pb-case-path"
          aria-label="client name withheld under NDA — reinforcement learning environments"
        >
          {/* The company segment IS the redaction bar; the literal
              [redacted] only shows if the bar treatment is removed. */}
          <span className="pb-case-co pb-redact" aria-hidden="true">
            [redacted]
          </span>
          <span className="pb-case-sep" aria-hidden="true">
            /
          </span>
          <span className="pb-case-role" aria-hidden="true">
            <Decipher text={HEADLINE} />
          </span>
        </h3>
        <p className="pb-case-blurb">
          <Decipher text={PARA} />
        </p>
        <div className="pb-whoami">
          $ whoami --client&nbsp;&nbsp;
          <span className="pb-redline" aria-hidden="true" />
          <span className="sr-only">client name withheld under NDA</span>
        </div>
      </div>
      <div className="pb-redcard-stats">
        {STATS.map(([figure, caption]) => (
          <div className="pb-redstat" key={figure}>
            <span className="pb-redstat-figure pb-figure">
              <Decipher text={figure} />
            </span>
            <span className="pb-redstat-cap">
              <Decipher text={caption} />
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
