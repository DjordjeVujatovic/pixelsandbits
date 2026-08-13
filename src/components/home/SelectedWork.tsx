"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { EXTRA_CASES } from "@/lib/content";
import type { CaseQuote } from "@/lib/content";
import CaseRedacted from "./CaseRedacted";

/* PORTFOLIO_one_at_a_time.md — ten cases, one visible at a time,
   advanced by scroll while the stage is pinned. The section's own
   height IS the pin's scroll distance. One scroll listener writes one
   state value (the index) behind a single in-flight rAF guard;
   everything else is CSS transitions keyed off classes. */
const CARDS = 10;
/* design_handoff_client_portfolio: 30px is the design default peek gap
   (24–46 all read well). */
const PEEK_GAP = 30;

/* Rail labels; chips shorten two names for width on mobile. */
const RAIL: { label: string; chip?: string }[] = [
  { label: "Leading Frontier Lab", chip: "Frontier Lab" },
  { label: "Decagon AI" },
  { label: "Scotts Miracle-Gro", chip: "Scotts" },
  { label: "Coinbase" },
  { label: "Dapper Labs" },
  { label: "ZeroDown" },
  { label: "Apparel Impact Institute" },
  { label: "Spindl" },
  { label: "Certn" },
  { label: "Ditto" },
];

interface CaseStat {
  figure: string;
  caption: string;
  lime?: boolean;
  count?: { target: number; suffix: string };
}

function StatFigure({ stat }: { stat: CaseStat }): JSX.Element {
  const cls = `pb-case-figure${stat.lime ? " pb-figure" : ""}`;
  return (
    <div>
      {stat.count ? (
        <div className={cls} data-count={stat.count.target} data-suffix={stat.count.suffix}>
          {stat.figure}
        </div>
      ) : (
        <div className={cls}>{stat.figure}</div>
      )}
      <div className="pb-case-figcap">{stat.caption}</div>
    </div>
  );
}

const CASES: {
  num: string;
  /* Plain phrasing — the heading's aria-label; the visual heading is
     the mono path below. */
  title: string;
  path: { co: string; role: string };
  tag: string;
  blurb: string;
  meta?: string;
  link?: { label: string; href: string };
  stats: CaseStat[];
  detail: string;
}[] = [
  {
    num: "CASE_03",
    title: "Scotts Miracle-Gro — agentic lawn care app",
    path: { co: "scotts-miracle-gro", role: "agentic-shopping" },
    tag: "FORTUNE 500",
    blurb:
      "An agentic-first consumer app, built on Sierra, that helps Scotts Miracle-Gro customers take care of their lawns.",
    meta: "agentic app · iOS + Android",
    stats: [
      { figure: "Sierra", caption: "agent platform" },
      { figure: "lawn score", caption: "health, per yard", lime: true },
      { figure: "React Native", caption: "iOS and Android" },
    ],
    detail:
      "Onboarding is a lawn assessment quiz. The app turns that data into a care plan and a lawn health score, then recommends habit changes and the right products to raise it. A Salesforce-powered store recommends products against the same lawn data.",
  },
  {
    num: "CASE_04",
    title: "Coinbase — Onchain Summer frontend",
    path: { co: "coinbase", role: "onchain-summer" },
    tag: "CRYPTO EXCHANGE",
    blurb:
      "Frontend for Onchain Summer 2023, the multi-week festival that launched Base, Coinbase's Ethereum L2, with daily NFT drops from Coca-Cola, Atari and OpenSea.",
    link: { label: "coinbase.com →", href: "https://www.coinbase.com/" },
    stats: [
      { figure: "700K+", caption: "NFTs minted", count: { target: 700, suffix: "K+" } },
      { figure: "268K+", caption: "unique wallets", count: { target: 268, suffix: "K+" } },
      { figure: "$242M", caption: "bridged to Base in two weeks", lime: true },
    ],
    detail:
      "Delivered as part of the Lazer Technologies team. We built wallet onboarding that took under 60 seconds for non-crypto users, and a custom ETH to Base bridge on the Optimism SDK. At peak: 145K+ users and 1.4M transactions in a single day. React, Next.js, TypeScript, Thirdweb.",
  },
  {
    num: "CASE_05",
    title: "Dapper Labs — design system",
    path: { co: "dapper-labs", role: "design-system" },
    tag: "SPORTS NFT PLATFORMS",
    blurb:
      "One design system across Dapper's sports products: NBA Top Shot, NFL All Day and their successors.",
    link: { label: "dapperlabs.com →", href: "https://www.dapperlabs.com/" },
    stats: [
      { figure: "Shared Design System", caption: "Chakra UI, rethemed through component APIs" },
      { figure: "NBA, NFL, UFC", caption: "one shared library between all sports products", lime: true },
    ],
    detail:
      "We joined as consultants on the NFL All Day frontend, then moved to the studio team that owned the shared design system. The work: applying the design team's specs to existing Chakra UI components, so brands with different personalities share one library without looking like the same app.",
  },
];

/* Cyan is reserved for the client quotes — a reference is a different
   kind of evidence from the work itself. Emphasis is assembled here,
   never inside an interpolation. */
function QuoteBlock({ q }: { q: CaseQuote }): JSX.Element {
  return (
    <figure className="qb">
      <blockquote>
        {q.pre}
        <em>{q.em}</em>
        {q.mid}
        <em>{q.em2}</em>
        {q.post}
      </blockquote>
      <figcaption>
        <span className="qb-name">{q.name}</span>
        <span className="qb-role">{q.role}</span>
      </figcaption>
    </figure>
  );
}

export default function SelectedWork(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [ys, setYs] = useState<number[] | null>(null);
  const [stageH, setStageH] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const ysRef = useRef<number[] | null>(null);
  ysRef.current = ys;
  const hsRef = useRef<number[]>([]);
  const settleRef = useRef(0);
  const stageHRef = useRef(0);
  stageHRef.current = stageH;

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Measured vertical centering with peeking neighbors
     (design_handoff_client_portfolio/README.md). The active card
     centres on its real measured height (clamped to 12px from the top
     when taller than the stage); neighbours cascade above and below
     with a 30px gap and peek in through the stage's gradient fades, so
     the frame is full whatever the card lengths. Re-measures on active
     change, resize, stage resize and font load; a stage-height change
     alters the card cap, so it re-measures once more a frame later. */
  const measure = useCallback(() => {
    const stage = deckRef.current;
    if (!stage) return;
    const H = stage.clientHeight;
    if (!H) return;
    const cards = Array.from(stage.children) as HTMLElement[];
    const hs = cards.map((el) => el.offsetHeight);
    const a = indexRef.current;
    hsRef.current = hs;
    const next = new Array(CARDS).fill(0);
    next[a] = hs[a] >= H - 24 ? 16 : (H - hs[a]) / 2;
    /* mobile first card hugs the chip rail instead of floating mid-stage
       (nothing peeks above card 1 to fill that space) */
    if (a === 0 && window.matchMedia("(max-width: 899px)").matches) {
      next[0] = Math.min(next[0], 24);
    }
    for (let i = a - 1; i >= 0; i--) next[i] = next[i + 1] - PEEK_GAP - hs[i];
    for (let i = a + 1; i < CARDS; i++) next[i] = next[i - 1] + hs[i - 1] + PEEK_GAP;
    const prev = ysRef.current;
    const hChanged = stageHRef.current !== H;
    const changed = !prev || next.some((y, i) => Math.abs(y - prev[i]) > 1);
    if (changed || hChanged) {
      setYs(next);
      setStageH(H);
      if (hChanged) requestAnimationFrame(() => measure());
    }
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [index, measure]);

  useEffect(() => {
    const stage = deckRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => measure());
    const late = window.setTimeout(() => measure(), 500);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(late);
    };
  }, [measure]);

  // scroll → active index off progress through the section's runway
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const sr = section.getBoundingClientRect();
        const travel = section.offsetHeight - window.innerHeight;
        if (travel <= 0) return;
        const p = Math.min(1, Math.max(0, -sr.top / travel));
        const i = Math.min(CARDS - 1, Math.floor(p * CARDS));
        setIndex((prev) => (prev === i ? prev : i));

        /* Mobile last card: arrive centred like every card, then settle
           toward the bottom anchor through the final slice, landing at
           max(16, H - h - 16) exactly when the pin releases — a tight
           handoff without the card sitting awkwardly low while you
           read it. Written through the DOM, never per-frame state. */
        const deck = deckRef.current;
        const base = ysRef.current;
        const hs = hsRef.current;
        const H = stageHRef.current;
        if (!deck || !base || !hs.length || !H) return;
        const mobile = window.matchMedia("(max-width: 899px)").matches;
        let delta = 0;
        if (mobile && i === CARDS - 1) {
          const t = Math.min(1, Math.max(0, p * CARDS - (CARDS - 1)));
          const bottomY = Math.max(16, H - hs[CARDS - 1] - 16);
          delta = (bottomY - base[CARDS - 1]) * t;
        }
        if (Math.abs(delta - settleRef.current) > 0.5) {
          settleRef.current = delta;
          Array.from(deck.children).forEach((el, k) => {
            (el as HTMLElement).style.transform = `translateY(${Math.round(base[k] + delta)}px)`;
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        // Reset the in-flight guard — StrictMode remounts reuse this ref,
        // and a stale id here makes every future scroll bail out.
        raf.current = 0;
      }
    };
  }, []);

  // Non-active cards are pointer-events: none decoration — keep them
  // out of the accessibility tree and tab order too.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    Array.from(deck.children).forEach((el, k) => {
      const on = k === index;
      el.setAttribute("aria-hidden", on ? "false" : "true");
      (el as HTMLElement & { inert: boolean }).inert = !on;
    });
  }, [index]);

  // The active chip auto-centres in the rail (never scrollIntoView —
  // it can scroll the page vertically).
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || strip.offsetWidth === 0) return;
    const el = strip.querySelectorAll<HTMLElement>(".chip")[index];
    if (!el) return;
    strip.scrollTo({
      left: el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2,
      behavior: reduced() ? "auto" : "smooth",
    });
  }, [index]);

  // Index row / chip click → jump to the middle of that card's slice.
  const goTo = useCallback((k: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + ((k + 0.5) / CARDS) * travel,
      behavior: reduced() ? "auto" : "smooth",
    });
  }, []);

  // Skip pill: land just past the section's runway.
  const skip = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const bottom = section.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottom - window.innerHeight + 10,
      behavior: reduced() ? "auto" : "smooth",
    });
  }, []);

  const dkClass = (k: number): string => {
    if (k === index) return "dk on";
    return Math.abs(k - index) === 1 ? "dk near" : "dk far";
  };

  /* Pre-measure defaults from the prototype: first card near the top,
     the rest parked far below. */
  const dkStyle = (k: number): React.CSSProperties => ({
    transform: `translateY(${Math.round(ys?.[k] ?? (k === 0 ? 60 : 1600))}px)`,
    maxHeight: stageH ? stageH - 20 : undefined,
    overflowY: k === index ? "auto" : "hidden",
  });

  const railButton = (k: number, chip: boolean): JSX.Element => (
    <button
      key={RAIL[k].label}
      type="button"
      className={`${chip ? "chip" : "si"}${k === index ? " on" : k < index ? " past" : ""}`}
      aria-current={k === index ? "true" : undefined}
      onClick={() => goTo(k)}
    >
      <b>{`0${k + 1}`.slice(-2)}</b>
      {chip ? (RAIL[k].chip ?? RAIL[k].label) : RAIL[k].label}
    </button>
  );

  return (
    <section id="work" className="pf2" ref={sectionRef}>
      <span id="trust" aria-hidden="true" />
      <div className="stg-sticky">
        <div className="stg">
          <div className="stg-side">
            <Reveal variant="rev">
              <div className="intro">
                <div className="pb-kicker">$ cat ./client-portfolio</div>
                <h2 className="sr-h">The companies we have built inside.</h2>
                <p className="sr-lead">
                  Crypto exchanges, frontier AI labs, a Fortune 500 retailer,
                  sports platforms with millions of collectors.
                </p>
              </div>
              <nav className="stg-idx" aria-label="Case studies">
                {RAIL.map((_, k) => railButton(k, false))}
              </nav>
              <div className="stg-prog">
                <span>{`${`0${index + 1}`.slice(-2)} / ${CARDS}`}</span>
                <span className="stg-bar" aria-hidden="true">
                  <i style={{ width: `${((index + 1) / CARDS) * 100}%` }} />
                </span>
              </div>
            </Reveal>
          </div>

          <div className="stg-stage">
            <nav className="strip" aria-label="Case studies" ref={stripRef}>
              {RAIL.map((_, k) => railButton(k, true))}
            </nav>

            <div className="deck" ref={deckRef}>
              <div className={dkClass(0)} style={dkStyle(0)}>
                <CaseRedacted />
              </div>

              <div className={dkClass(1)} style={dkStyle(1)}>
                <article className="pb-feature">
                  <div className="pb-feature-side">
                    <div className="std2-head">
                      <span className="pb-case-num">CASE_02</span>
                      <span className="std2-tag">AI AGENT PLATFORM</span>
                    </div>
                    <h3
                      className="pb-case-path pb-feature-h"
                      aria-label="Decagon AI — forward deployed engineering"
                    >
                      <span className="pb-case-co" aria-hidden="true">
                        decagon-ai
                      </span>
                      <span className="pb-case-sep" aria-hidden="true">
                        /
                      </span>
                      <span className="pb-case-role" aria-hidden="true">
                        forward-deployed
                      </span>
                    </h3>
                    <p className="pb-case-blurb" style={{ marginBottom: 14 }}>
                      Forward deployed engineers at Decagon, embedded with
                      enterprise clients including Wealthsimple.
                    </p>
                    <p className="pb-feature-body">
                      We improved the playbooks Decagon runs for those clients,
                      added testing and evals for their chat systems, and
                      helped improve and scale their manipulation detection.
                      The work that turns an agent platform into something a
                      support org will trust.
                    </p>
                    <span className="pb-case-meta" style={{ marginTop: 0 }}>
                      on-site engagement
                    </span>
                  </div>
                  <div className="pb-feature-stats">
                    <div className="pb-fstat">
                      <span className="pb-figure">playbooks</span>
                      <span>improved for enterprise clients</span>
                    </div>
                    <div className="pb-fstat">
                      <span className="pb-figure">evals</span>
                      <span>added for their chat systems</span>
                    </div>
                    <div className="pb-fstat">
                      <span className="pb-figure">manipulation</span>
                      <span>detection, improved and scaled</span>
                    </div>
                  </div>
                </article>
              </div>

              {CASES.map((c, i) => (
                <div className={dkClass(i + 2)} style={dkStyle(i + 2)} key={c.num}>
                  <article className="pb-card pb-case">
                    <div className="pb-case-left">
                      <div className="std2-head">
                        <span className="pb-case-num">{c.num}</span>
                        <span className="std2-tag">{c.tag}</span>
                      </div>
                      <h3 className="pb-case-path" aria-label={c.title}>
                        <span className="pb-case-co" aria-hidden="true">
                          {c.path.co}
                        </span>
                        <span className="pb-case-sep" aria-hidden="true">
                          /
                        </span>
                        <span className="pb-case-role" aria-hidden="true">
                          {c.path.role}
                        </span>
                      </h3>
                      <p className="pb-case-blurb">{c.blurb}</p>
                      {c.meta ? <span className="pb-case-meta">{c.meta}</span> : null}
                      {c.link ? (
                        <a
                          className="pb-case-link"
                          href={c.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {c.link.label}
                        </a>
                      ) : null}
                    </div>
                    <div className="pb-case-right">
                      <div className="pb-case-stats">
                        {c.stats.map((s) => (
                          <StatFigure key={s.caption} stat={s} />
                        ))}
                      </div>
                      <p className="pb-case-detail">{c.detail}</p>
                    </div>
                  </article>
                </div>
              ))}

              {EXTRA_CASES.map((c, i) => (
                <div className={dkClass(i + 5)} style={dkStyle(i + 5)} key={c.num}>
                  <article className="pb-card pb-case std2">
                    <div className="std2-head">
                      <span className="pb-case-num">{c.num}</span>
                      {c.tag ? <span className="std2-tag">{c.tag}</span> : null}
                    </div>
                    <h3 className="pb-case-path" aria-label={c.title}>
                      <span className="pb-case-co" aria-hidden="true">
                        {c.path.co}
                      </span>
                      <span className="pb-case-sep" aria-hidden="true">
                        /
                      </span>
                      <span className="pb-case-role" aria-hidden="true">
                        {c.path.role}
                      </span>
                    </h3>
                    <p className="pb-case-blurb">{c.blurb}</p>
                    {c.link ? (
                      <a
                        className="pb-case-link"
                        href={c.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.link.label}
                      </a>
                    ) : null}
                    {c.stats ? (
                      <div className="pb-case-stats">
                        {c.stats.map((s) => (
                          <StatFigure key={s.caption} stat={s} />
                        ))}
                      </div>
                    ) : null}
                    {c.bullets ? (
                      <ul className="std2-bullets">
                        {c.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {c.detail ? <p className="pb-case-detail">{c.detail}</p> : null}
                    {c.quote ? <QuoteBlock q={c.quote} /> : null}
                  </article>
                </div>
              ))}
            </div>

            {/* Nothing left to skip on the last card — it fades out but
                keeps its space so the flex column doesn't jump. */}
            <button
              className={`skip${index === CARDS - 1 ? " skip-gone" : ""}`}
              type="button"
              tabIndex={index === CARDS - 1 ? -1 : undefined}
              onClick={skip}
            >
              skip to engagement process ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
