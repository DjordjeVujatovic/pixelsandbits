"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/* Hero client strip: a terminal-log showcase under the hero grid. The
   reader line types `reading {path}... {metric}` one client at a time
   (55ms/char, ~2.4s hold — pacing is deliberate, do not speed it up).
   Writes through the DOM, gated on an IntersectionObserver with
   threshold: 0. Part of the hero block — no reveal-on-scroll class. */
export default function ClientStrip(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".pb-citem"));
    const out = root.querySelector<HTMLElement>(".pb-ctxt");
    if (!items.length || !out) return;

    const line = (k: number) =>
      `reading ${items[k].dataset.path}... ${items[k].dataset.metric}`;
    const setActive = (k: number) =>
      items.forEach((el, j) => el.classList.toggle("pb-con2", j === k));

    if (prefersReducedMotion()) {
      out.textContent = line(0);
      setActive(0);
      return;
    }

    let i = 0;
    let n = 0;
    let hold = 0;
    let timer: number | null = null;

    const step = () => {
      const text = line(i);
      if (n < text.length) n += 1;
      else if (hold < 44) hold += 1;
      else {
        i = (i + 1) % items.length;
        n = 0;
        hold = 0;
      }
      out.textContent = line(i).slice(0, n);
      setActive(i);
    };

    const start = () => {
      if (timer === null) timer = window.setInterval(step, 55);
    };
    const stop = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
    };

    step();
    start();

    const io = new IntersectionObserver(
      (es) => (es[0].isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(root);

    return () => {
      stop();
      io.disconnect();
      setActive(-1);
      out.textContent = "";
    };
  }, []);

  return (
    <div className="pb-cstrip" ref={rootRef}>
      {/* Names only — the scale figures live in the hero facts grid
          right above (owner request). */}
      <div className="pb-cbar2">
        <span className="pb-clabel">PAST CLIENTS</span>
        <span className="pb-cline2" aria-hidden="true" />
      </div>
      <ul className="pb-clist">
        <li className="pb-citem" data-path="coinbase/onchain-summer" data-metric="700k+ mints">
          <span className="pb-cdot" aria-hidden="true" />
          Coinbase
        </li>
        <li className="pb-citem" data-path="decagon/agent-evals" data-metric="2 yrs embedded">
          <span className="pb-cdot" aria-hidden="true" />
          Decagon AI
        </li>
        <li className="pb-citem" data-path="scotts/lawn-agent" data-metric="built on Sierra">
          <span className="pb-cdot" aria-hidden="true" />
          Scotts Miracle-Gro
        </li>
        <li className="pb-citem" data-path="[redacted]/rl-envs" data-metric="under NDA">
          <span className="pb-cdot" aria-hidden="true" />
          Frontier AI lab
        </li>
        <li className="pb-citem" data-path="dapper/design-system" data-metric="multi-brand system">
          <span className="pb-cdot" aria-hidden="true" />
          Dapper Labs
        </li>
      </ul>
      <div className="pb-cread" aria-hidden="true">
        <span className="pb-cprompt">$</span>
        <span className="pb-ctxt" />
        <span className="pb-cblk" />
      </div>
    </div>
  );
}
