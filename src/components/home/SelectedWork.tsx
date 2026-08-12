"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { EXTRA_CASES } from "@/lib/content";
import type { CaseQuote } from "@/lib/content";
import CaseRedacted from "./CaseRedacted";

/* PORTFOLIO_one_at_a_time.md — eleven cases, one visible at a time,
   advanced by scroll while the stage is pinned. The section's own
   height IS the pin's scroll distance. One scroll listener writes one
   state value (the index) behind a single in-flight rAF guard;
   everything else is CSS transitions keyed off classes. */
const CARDS = 11;
export const PER_CARD_DESKTOP = 340;
export const PER_CARD_MOBILE = 200;

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
  { label: "Athena" },
  { label: "Certn" },
  { label: "Delphia" },
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
  title: string;
  blurb: string;
  meta?: string;
  link?: { label: string; href: string };
  stats: CaseStat[];
  detail: string;
}[] = [
  {
    num: "CASE_03",
    title: "Scotts Miracle-Gro — agentic shopping",
    blurb:
      "A fully agentic mobile app, built on Sierra, that helps homeowners take better care of their lawn.",
    meta: "agentic commerce · mobile",
    stats: [
      { figure: "Sierra", caption: "agent platform" },
      { figure: "lawn score", caption: "health, per yard", lime: true },
      { figure: "chat → cart", caption: "one surface" },
    ],
    detail:
      "Shopping and chat are the same experience here: the agent reads a lawn's health score, makes personalized recommendations against it, and puts the right products in the cart without the customer ever browsing a catalogue.",
  },
  {
    num: "CASE_04",
    title: "Coinbase — Onchain Summer",
    blurb:
      "The NFT marketplace front end for Coinbase's Onchain Summer campaign, built to survive a traffic spike measured in hundreds of thousands of wallets.",
    link: { label: "coinbase.com →", href: "https://www.coinbase.com/" },
    stats: [
      { figure: "500k", caption: "transactions", count: { target: 500, suffix: "k" } },
      { figure: "400k", caption: "unique wallets", count: { target: 400, suffix: "k" } },
      { figure: "200 ETH", caption: "volume", lime: true, count: { target: 200, suffix: " ETH" } },
    ],
    detail:
      "We owned the marketplace surface end to end — mint and browse flows, wallet states, and the performance work that kept it responsive at peak — alongside Coinbase's own design and protocol teams.",
  },
  {
    num: "CASE_05",
    title: "Dapper Labs — design system",
    blurb:
      "One system spanning the sports product line — NBA Top Shot, NFL All Day and what followed.",
    link: { label: "dapperlabs.com →", href: "https://www.dapperlabs.com/" },
    stats: [
      { figure: "multi-brand", caption: "one system, several properties" },
      { figure: "tokens → components", caption: "design and code", lime: true },
    ],
    detail:
      "Two brands with different personalities had to share components without looking like the same app. We worked with their design team on the token layer and shipped the component library the product teams built on.",
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
  const [carousel, setCarousel] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ≤1100 the deck is a horizontal snap carousel (MOBILE_audit finding
  // 1) — which card is active becomes the browser's decision, read back
  // through an IntersectionObserver rather than any scroll maths.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1100px)");
    const onMq = () => setCarousel(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!carousel) return;
    const rail = deckRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const k = cards.indexOf(e.target);
          if (k >= 0) setIndex((prev) => (prev === k ? prev : k));
        });
      },
      { root: rail, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [carousel]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const sr = section.getBoundingClientRect();
        const travel = sr.height - window.innerHeight;
        if (travel <= 0) return;
        const p = Math.min(1, Math.max(0, -sr.top / travel));
        const i = Math.min(CARDS - 1, Math.floor(p * CARDS * 0.999));
        setIndex((prev) => (prev === i ? prev : i));
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

  // Desktop parked cards are decoration: hidden from AT and out of the
  // tab order. In the carousel every card is real, reachable content.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    Array.from(deck.children).forEach((el, k) => {
      const on = carousel || k === index;
      el.setAttribute("aria-hidden", on ? "false" : "true");
      (el as HTMLElement & { inert: boolean }).inert = !on;
    });
  }, [index, carousel]);

  // The active chip auto-centres in the strip as the deck advances.
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

  /* Desktop lands mid-slice (the 0.35) rather than on a boundary —
     never scrollIntoView vertically, the sticky stage would fight it.
     The carousel centres the card horizontally; block: "nearest" stops
     the page itself from jumping. */
  const goTo = useCallback((k: number) => {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      deckRef.current?.children[k]?.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reduced() ? "auto" : "smooth",
      });
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const sr = section.getBoundingClientRect();
    const travel = sr.height - window.innerHeight;
    const top = sr.top + window.scrollY + travel * ((k + 0.35) / CARDS);
    window.scrollTo({ top, behavior: reduced() ? "auto" : "smooth" });
  }, []);

  const dkClass = (k: number): string => {
    if (k === index) return "dk on";
    if (k === index - 1) return "dk prev";
    if (k === index + 1) return "dk next";
    return k < index ? "dk far-up" : "dk far-down";
  };

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
                <div className="pb-kicker" style={{ marginBottom: 18 }}>
                  $ cat ./client-portfolio
                </div>
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

            <div className="deck" role="group" aria-label="Case studies" ref={deckRef}>
              <div className={dkClass(0)}>
                <CaseRedacted />
              </div>

              <div className={dkClass(1)}>
                <article className="pb-feature">
                  <div className="pb-feature-side">
                    <span className="pb-case-num">CASE_02</span>
                    <h3 className="pb-h-md pb-feature-h">Decagon AI — forward deployed</h3>
                    <p className="pb-case-blurb" style={{ marginBottom: 14 }}>
                      Embedded as forward deployed engineers, turning an agent
                      platform into something a support org will trust.
                    </p>
                    <p className="pb-feature-body">
                      The gap between a convincing demo and a system a support
                      org will trust is measurement and integration. We built
                      the eval loop, tuned the agent flows against it, and did
                      the unglamorous work of wiring the model into the
                      customer&apos;s existing stack.
                    </p>
                    <span className="pb-case-meta" style={{ marginTop: 0 }}>
                      on-site engagement
                    </span>
                  </div>
                  <div className="pb-feature-stats">
                    <div className="pb-fstat">
                      <span className="pb-figure">embedded</span>
                      <span>on site, as an FDE</span>
                    </div>
                    <div className="pb-fstat">
                      <span className="pb-figure">evals</span>
                      <span>on real transcripts</span>
                    </div>
                    <div className="pb-fstat">
                      <span className="pb-figure">agents</span>
                      <span>in production traffic</span>
                    </div>
                  </div>
                </article>
              </div>

              {CASES.map((c, i) => (
                <div className={dkClass(i + 2)} key={c.num}>
                  <article className="pb-card pb-case">
                    <div className="pb-case-left">
                      <span className="pb-case-num">{c.num}</span>
                      <h3 className="pb-h-sm pb-case-h">{c.title}</h3>
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
                <div className={dkClass(i + 5)} key={c.num}>
                  <article className="pb-card pb-case std2">
                    <div className="std2-head">
                      <span className="pb-case-num">{c.num}</span>
                      {c.tag ? <span className="std2-tag">{c.tag}</span> : null}
                    </div>
                    <h3 className="pb-h-sm pb-case-h">{c.title}</h3>
                    <p className="pb-case-blurb">{c.blurb}</p>
                    {c.bullets ? (
                      <ul className="std2-bullets">
                        {c.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
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
                    {c.quote ? <QuoteBlock q={c.quote} /> : null}
                  </article>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
