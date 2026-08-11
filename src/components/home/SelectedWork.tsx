import Reveal from "@/components/Reveal";
import { ALSO_SHIPPED } from "@/lib/content";
import CaseRedacted from "./CaseRedacted";

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

interface StandardCase {
  variant: "l" | "r";
  num: string;
  title: string;
  blurb: string;
  meta?: string;
  link?: { label: string; href: string };
  stats: CaseStat[];
  detail: string;
}

const CASES: StandardCase[] = [
  {
    variant: "l",
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
    variant: "r",
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
    variant: "l",
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

/* The merged client-portfolio section: the heading and paragraph open
   it, the five case cards and ALSO_SHIPPED rows are the evidence. The
   scale argument itself lives in the closing track-record band — this
   section deliberately doesn't repeat it. A span#trust anchors inbound
   links to the old section id. */
export default function SelectedWork(): JSX.Element {
  return (
    <section id="work" className="pb-work">
      <span id="trust" aria-hidden="true" />

      <Reveal variant="rev">
        <div className="pb-kicker" style={{ marginBottom: 18 }}>
          $ cat ./client-portfolio
        </div>
        <h2 className="pb-h-lg pb-trust-h">The companies we have built inside.</h2>
        <p className="pb-trust-p">
          Crypto exchanges, frontier AI labs, a Fortune 500 retailer, sports
          platforms with millions of collectors. The constraints at that size
          are not the ones a demo teaches you, and they are the ones we build
          for by default.
        </p>
      </Reveal>

      <div style={{ height: 40 }} />

      <div className="pb-stag pb-cases">
        <CaseRedacted />

        <Reveal as="article" variant="r" className="pb-feature">
          <div className="pb-feature-side">
            <span className="pb-case-num">CASE_02</span>
            <h3 className="pb-h-md pb-feature-h">Decagon AI — forward deployed</h3>
            <p className="pb-case-blurb" style={{ marginBottom: 14 }}>
              Embedded as forward deployed engineers, turning an agent platform
              into something a support org will trust.
            </p>
            <p className="pb-feature-body">
              The gap between a convincing demo and a system a support org will
              trust is measurement and integration. We built the eval loop,
              tuned the agent flows against it, and did the unglamorous work of
              wiring the model into the customer&apos;s existing stack.
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
        </Reveal>

        {CASES.map((c) => (
          <Reveal as="article" key={c.num} variant={c.variant} className="pb-card pb-case">
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
                  rel="noreferrer"
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
          </Reveal>
        ))}
      </div>

      <Reveal variant="rev" className="pb-also">
        <div className="pb-also-label">ALSO_SHIPPED</div>
        <div className="pb-stag pb-rows">
          {ALSO_SHIPPED.map((r) => (
            <a className="pb-row" key={r.name} href={r.href} target="_blank" rel="noreferrer">
              <span className="pb-row-name">{r.name}</span>
              <span className="pb-row-desc">{r.desc}</span>
              <span className="pb-arrow">→</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
