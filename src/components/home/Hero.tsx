import Link from "next/link";
import { CTA_LABEL } from "@/lib/content";
import Engagement from "./Engagement";

/* HERO_left_column.md — the disciplines run, one line of argument and a
   four-fact grid replace the old lead paragraph. Copy verbatim; facts
   1/3 lime, 2/4 cyan (a second data voice, not decoration); no
   animation. The arrows live INSIDE each list item so they wrap
   attached to their word and stay out of the accessible name. */
const RUN = ["scoping", "design", "engineering", "AI deployment"];
const FACTS: { v: string; k: string; cyan?: boolean }[] = [
  { v: "$100B+", k: "combined valuation of the companies we have shipped inside" },
  { v: "2", k: "Major AI labs — one named, one under NDA", cyan: true },
  { v: "5", k: "multi-billion dollar companies" },
  { v: "Fortune 500", k: "enterprise stacks and legacy systems", cyan: true },
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
          <span className="pb-hero-l1">From design to deployment,</span>
          <span className="pb-hero-h-accent">we do it all.</span>
        </h1>
        <ul className="pb-run">
          {RUN.map((w, i) => (
            <li className="pb-rw" key={w}>
              {w}
              {i < RUN.length - 1 ? (
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
