"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Reveal from "@/components/Reveal";
import { EXTRA_CASES } from "@/lib/content";
import type { CaseQuote } from "@/lib/content";
// import CaseRedacted from "./CaseRedacted"; // CLIENT_01 (frontier lab) hidden for now — see CARDS

/* PORTFOLIO_one_at_a_time.md — eleven clients (ten while the frontier-lab
   card is hidden), one visible at a time,
   advanced by scroll while the stage is pinned. The section's own
   height IS the pin's scroll distance. One scroll listener writes one
   state value (the index) behind a single in-flight rAF guard;
   everything else is CSS transitions keyed off classes. */
/* The frontier-lab card (CLIENT_01, <CaseRedacted />) is hidden for now,
   not deleted: its import, RAIL entry and deck slot are commented out
   below and the deck indices shifted up by one. To bring it back,
   restore those three, set CARDS = 11, and shift the indices down. */
const CARDS = 10;
/* design_handoff_client_portfolio: 30px is the design default peek gap
   (24–46 all read well). */
const PEEK_GAP = 30;

/* Rail labels; chips shorten two names for width on mobile. */
/* Display numbers follow deck position, so hiding a card renumbers the
   rest; the CASES `num` fields stay as stable React keys. */
const clientNum = (k: number): string => `CLIENT_${`0${k + 1}`.slice(-2)}`;

const RAIL: { label: string; chip?: string }[] = [
  // { label: "Frontier AI lab" }, // hidden for now — see CARDS
  { label: "Scotts Miracle-Gro", chip: "Scotts" },
  { label: "Decagon AI" },
  { label: "Coinbase" },
  { label: "ClassDojo" },
  { label: "Dapper Labs" },
  { label: "Ditto" },
  { label: "ZeroDown" },
  { label: "Apparel Impact Institute" },
  { label: "Spindl" },
  { label: "Certn" },
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
        <div
          className={cls}
          data-count={stat.count.target}
          data-suffix={stat.count.suffix}
        >
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
  bullets?: string[];
  detail?: string;
  stack?: string[];
}[] = [
  {
    num: "CLIENT_04",
    title: "Scotts Miracle-Gro — MyLawn, an agentic lawn care app",
    path: { co: "scotts-miracle-gro", role: "mylawn" },
    tag: "FORTUNE 500",
    blurb:
      "MyLawn, Scotts Miracle-Gro's agentic lawn care app for iOS and Android: a chat assistant that turns an address into a care plan for each lawn, with the products to carry it out.",
    stats: [
      { figure: "Sierra", caption: "agent behind the chat" },
      { figure: "0–100", caption: "health score, per lawn", lime: true },
      { figure: "agentic UI", caption: "plans built in chat" },
    ],
    bullets: [
      "Chat-first onboarding: the Sierra agent runs the lawn assessment as a conversation, starting from verified parcel data for the address",
      "Health score: 0–100 per lawn, weighting nutrition, plan follow-through and hydration, minus logged issues",
      "Care plan engine: lawn profile, live weather and treatment history become tasks, product picks and safety blocks, re-planned nightly",
      "Commerce: a native Salesforce Commerce Cloud shop, Gemini-personalized product pages and optional AutoPilot shipping",
      "Built for agents: every backend operation runs from a CLI, and a Sim Lab tests the logic against 15 personas",
    ],
    stack: [
      "React Native",
      "Expo",
      "TanStack",
      "Stripe",
      "Hono",
      "Zod",
      "PostgreSQL",
      "Google Gemini",
      "Vercel AI SDK",
      "Sierra Agent SDK",
    ],
  },
  {
    num: "CLIENT_02",
    title: "Decagon AI — agent playbooks and evals",
    path: { co: "decagon-ai", role: "agent-evals" },
    tag: "AI AGENT PLATFORM",
    blurb:
      "Playbooks, evals and manipulation detection for Decagon's agent platform, used by multi-billion dollar enterprise clients.",
    meta: "agent playbooks · evals",
    stats: [
      {
        figure: "playbooks",
        caption: "tailored to each enterprise client",
        lime: true,
      },
      { figure: "evals", caption: "to test agent quality" },
      { figure: "manipulation", caption: "improved manipulation detection" },
    ],
    bullets: [
      "Playbooks: improved the agent playbooks Decagon runs for its enterprise clients, the instructions that shape how each AI agent handles a customer conversation",
      "Evals: added testing and evals for their chat systems, so changes to an agent can be measured before they reach customers",
      "Manipulation detection: helped improve and scale the systems that catch users trying to push an agent off-script",
    ],
  },
  {
    num: "CLIENT_05",
    title: "Coinbase — Onchain Summer frontend",
    path: { co: "coinbase", role: "onchain-summer" },
    tag: "CRYPTO EXCHANGE",
    blurb:
      "Frontend for the inaugural Onchain Summer in 2023, the multi-week festival that promoted Base, Coinbase's Ethereum L2, with daily NFT drops from Coca-Cola, Atari and OpenSea.",
    link: { label: "coinbase.com →", href: "https://www.coinbase.com/" },
    stats: [
      {
        figure: "500K",
        caption: "transactions",
        lime: true,
        count: { target: 500, suffix: "K" },
      },
      {
        figure: "400K",
        caption: "unique wallets",
        count: { target: 400, suffix: "K" },
      },
      {
        figure: "200+ ETH",
        caption: "in volume",
        count: { target: 200, suffix: "+ ETH" },
      },
    ],
    bullets: [
      "Daily minting dApp: a new creator featured each day of the festival, with their NFT collection opened for minting, so there was something new to mint every time people came back",
      "Wallet onboarding: wallet setup in under 60 seconds, so people new to crypto could join a drop without already owning a wallet",
      "Onchain: smart contracts behind each daily drop, plus a custom bridge built on the Optimism SDK to move ETH from Ethereum onto Base",
      "Peak day: 145K+ users and 1.4M transactions",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Thirdweb",
      "RainbowKit",
      "Crossmint",
      "Mint.fun",
      "Arweave",
      "Mirror",
      "Twitter/X API",
    ],
  },
  {
    num: "CLIENT_03",
    title: "ClassDojo — AI-assisted QA in the CI/CD pipeline",
    path: { co: "classdojo", role: "ai-qa-pipeline" },
    tag: "EDTECH UNICORN",
    blurb:
      "An AI layer in the CI/CD pipeline at ClassDojo, the $1B+ edtech platform, that turns failing builds into ready-to-work bug tickets, plus a Vitest migration that cut flaky tests by 70%.",
    meta: "AI in CI/CD · test infrastructure",
    link: { label: "classdojo.com →", href: "https://www.classdojo.com/" },
    stats: [
      {
        figure: "70%",
        caption: "fewer flaky tests",
        lime: true,
        count: { target: 70, suffix: "%" },
      },
      { figure: "CI → ticket", caption: "bug tickets written by AI" },
      {
        figure: "60%",
        caption: "faster tests, after the Vitest move",
        count: { target: 60, suffix: "%" },
      },
    ],
    bullets: [
      "CI to ticket: an LLM reads a failing build's output and the change that caused it, then files a structured ticket with a summary, repro steps and the relevant logs, work an engineer used to do by hand",
      "Vitest migration: moved the test suites to Vitest and made them 60% faster",
      "Flakiness: shared state, timing assumptions and order-dependent tests fixed until flaky failures dropped 70%, so a red build meant a real bug again",
    ],
  },
  {
    num: "CLIENT_06",
    title: "Dapper Labs — design system",
    path: { co: "dapper-labs", role: "design-system" },
    tag: "SPORTS NFT PLATFORMS",
    blurb:
      "A component system built on Chakra UI and shared across Dapper's sports products: NBA Top Shot, NFL All Day and their successors.",
    link: { label: "dapperlabs.com →", href: "https://www.dapperlabs.com/" },
    stats: [
      {
        figure: "Component system",
        caption: "built on Chakra UI, through its component APIs",
      },
      {
        figure: "NBA, NFL, UFC",
        caption: "one shared library between all sports products",
        lime: true,
      },
    ],
    bullets: [
      "Component system: built on Chakra UI, extending its component APIs to carry the design team's specs",
      "One library, many brands: products with different personalities share it without looking like the same app",
      "Growth: began on the NFL All Day frontend and grew to serve all of Dapper's sports IPs",
    ],
    stack: [
      "JavaScript",
      "Turborepo",
      "Next.js",
      "Storybook",
      "Chakra UI",
      "Styled Components",
    ],
  },
];

/* The tech stack, as a chip band along the foot of a case card. */
function StackBand({ items }: { items: string[] }): JSX.Element {
  return (
    <div className="pb-stack">
      <span className="pb-stack-k">stack</span>
      <ul aria-label="Tech stack">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

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
  /* The client index (ten entries while CLIENT_01 is hidden) renders ONCE — the desktop side list or the
     mobile chip rail, never both hidden-by-CSS (screen readers would
     announce the list twice). */
  const [mobileNav, setMobileNav] = useState(false);
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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const apply = () => setMobileNav(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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
    for (let i = a + 1; i < CARDS; i++)
      next[i] = next[i - 1] + hs[i - 1] + PEEK_GAP;
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
            (el as HTMLElement).style.transform =
              `translateY(${Math.round(base[k] + delta)}px)`;
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
  }, [index, mobileNav]);

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

  /* The first card in the deck always takes the feature layout (tinted
     card, figure strip along the bottom); every other case is a
     standard card. */
  const featureCard = (c: (typeof CASES)[number], k: number): JSX.Element => (
    <div className={dkClass(k)} style={dkStyle(k)} key={c.num}>
      <article className="pb-feature">
        <div className="pb-feature-side">
          <div className="std2-head">
            <span className="pb-case-num">{clientNum(k)}</span>
            <span className="std2-tag">{c.tag}</span>
          </div>
          <h3 className="pb-case-path pb-feature-h" aria-label={c.title}>
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
          {c.bullets ? (
            <ul className="std2-bullets">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {c.detail ? <p className="pb-case-detail">{c.detail}</p> : null}
        </div>
        <div className="pb-feature-stats">
          {c.stats.map((st) => (
            <div className="pb-fstat" key={st.caption}>
              <span className="pb-figure">{st.figure}</span>
              <span>{st.caption}</span>
            </div>
          ))}
        </div>
        {c.stack ? <StackBand items={c.stack} /> : null}
      </article>
    </div>
  );

  const caseCard = (c: (typeof CASES)[number], k: number): JSX.Element =>
    k === 0 ? (
      featureCard(c, k)
    ) : (
      <div className={dkClass(k)} style={dkStyle(k)} key={c.num}>
        <article className="pb-card pb-case">
          <div className="pb-case-left">
            <div className="std2-head">
              <span className="pb-case-num">{clientNum(k)}</span>
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
            {c.bullets ? (
              <ul className="std2-bullets">
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            {c.detail ? <p className="pb-case-detail">{c.detail}</p> : null}
          </div>
          {c.stack ? <StackBand items={c.stack} /> : null}
        </article>
      </div>
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
                <h2 className="sr-h">Previous Clients</h2>
                <p className="sr-lead">
                  Fortune 500 companies, unicorns, major AI labs, leading crypto
                  platforms and social media products.
                </p>
              </div>
              {!mobileNav ? (
                <nav className="stg-idx" aria-label="Previous clients">
                  {RAIL.map((_, k) => railButton(k, false))}
                </nav>
              ) : null}
              <div className="stg-prog">
                <span>{`${`0${index + 1}`.slice(-2)} / ${CARDS}`}</span>
                <span className="stg-bar" aria-hidden="true">
                  <i style={{ width: `${((index + 1) / CARDS) * 100}%` }} />
                </span>
              </div>
            </Reveal>
          </div>

          <div className="stg-stage">
            {mobileNav ? (
              <nav
                className="strip"
                aria-label="Previous clients"
                ref={stripRef}
              >
                {RAIL.map((_, k) => railButton(k, true))}
              </nav>
            ) : null}

            <div className="deck" ref={deckRef}>
              {/* Hidden for now — the frontier-lab card. See the CARDS note.
              <div className={dkClass(0)} style={dkStyle(0)}>
                <CaseRedacted />
              </div>
              */}

              {CASES.map((c, i) => caseCard(c, i))}

              {EXTRA_CASES.map((c, i) => (
                <div
                  className={dkClass(i + CASES.length)}
                  style={dkStyle(i + CASES.length)}
                  key={c.num}
                >
                  <article className="pb-card pb-case std2">
                    <div className="std2-head">
                      <span className="pb-case-num">
                        {clientNum(i + CASES.length)}
                      </span>
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
                    {c.detail ? (
                      <p className="pb-case-detail">{c.detail}</p>
                    ) : null}
                    {c.quote ? <QuoteBlock q={c.quote} /> : null}
                    {c.stack ? <StackBand items={c.stack} /> : null}
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
