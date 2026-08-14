import Link from "next/link";
import { CTA_LABEL, PIPELINE_STEPS } from "@/lib/content";
import Engagement from "./Engagement";

/* The four hero facts — scale evidence without repeating one point
   three ways. Facts 1/3 lime, 2/4 cyan (a second data voice, not
   decoration). */
const FACTS: { v: string; k: string; cyan?: boolean }[] = [
  { v: "Fortune 500", k: "enterprise stacks and legacy systems" },
  { v: "1.4M", k: "transactions in a single day, peak, on a frontend we built", cyan: true },
  { v: "10×", k: "productivity gain on ZeroDown's investment memos" },
  { v: "1", k: "frontier AI lab, under NDA", cyan: true },
];

/* Split-ground hero: dark left cell carries the copy column, the right
   cell is a lime gradient flood, and the Engagement terminal straddles
   the seam. The seat/float split is deliberate — the outer div owns the
   centering translate, the inner div owns the float keyframes; putting
   both transforms on one element would overwrite the centering. */
export default function Hero(): JSX.Element {
  return (
    <section className="pb-hero">
      <div className="pb-in pb-hero-left">
        <h1 className="pb-hero-h">
          <span className="pb-hero-l1">End-to-end product engineering</span>
          <span className="pb-hero-h-accent">for teams shipping AI.</span>
        </h1>
        <p className="pb-hero-sub">
          Research, design, build and deployment by one team — the forward
          deployed engineers who take an LLM product from demo to production.
        </p>
        <p className="pb-hero-note">
          AI is the domain. End-to-end is how we work in it. AI products fail
          at the seams — between what research found, what design assumed, and
          what deployment actually hit — so one team across all of it is the
          thing that makes them ship.
        </p>
        {/* The spine, verbatim wherever the offering is enumerated. */}
        <div className="pb-run-cap">one engagement, four phases</div>
        <ul className="pb-run">
          {PIPELINE_STEPS.map((w, i) => (
            <li className="pb-rw" key={w}>
              {w}
              {i < PIPELINE_STEPS.length - 1 ? (
                <span className="pb-rsep" aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <dl className="pb-facts">
          {FACTS.map((f) => (
            <div className="pb-fact" key={f.v}>
              <dt className={`pb-fv${f.cyan ? " c" : ""}`}>{f.v}</dt>
              <dd className="pb-fk">{f.k}</dd>
            </div>
          ))}
        </dl>
        <div className="pb-hero-btns">
          <Link className="pb-btn pb-btn-primary" href="/contact">
            {CTA_LABEL} <span className="pb-arrow">→</span>
          </Link>
          <a className="pb-btn pb-btn-ghost" href="#work">
            see the work <span className="pb-arrow">→</span>
          </a>
        </div>
      </div>
      <div className="pb-hero-lime" aria-hidden="true">
        <span className="pb-hero-amp">&amp;</span>
      </div>
      <div className="pb-hero-seat">
        <div className="pb-hero-float">
          <span className="pb-hero-shadow" aria-hidden="true" />
          <div className="pb-in pb-hero-termin" style={{ animationDelay: ".15s" }}>
            <Engagement />
          </div>
        </div>
      </div>
    </section>
  );
}
