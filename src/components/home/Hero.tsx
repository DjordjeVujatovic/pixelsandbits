import { Fragment } from "react";
import Link from "next/link";
import { CTA_LABEL, PIPELINE_STEPS } from "@/lib/content";
import Engagement from "./Engagement";

/* Hero proof block (design_handoff_hero_proof, option 1a "Lead
   number"). One lime lead fact, then three cyan supporting facts in a
   ruled row. Copy verbatim from the handoff README. */
const LEAD = {
  v: "$100B+",
  k: "in combined valuation across the teams we've built for",
};
const SUPPORT: { v: string; k: string }[] = [
  { v: "5", k: "unicorns on the client list" },
  { v: "2", k: "major AI labs" },
  { v: "10 yrs", k: "shipping product" },
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
          <span className="pb-hero-l1">
            End to end
            <br />
            product engineering
          </span>
          <span className="pb-hero-h-accent">for teams shipping AI</span>
        </h1>
        <div className="pb-proof">
          <dl className="pb-lead">
            <dt className="pb-lead-v">{LEAD.v}</dt>
            <dd className="pb-lead-k">{LEAD.k}</dd>
          </dl>
          <dl className="pb-sup">
            {SUPPORT.map((f) => (
              <div className="pb-sup-i" key={f.v}>
                <dt className="pb-sup-v">{f.v}</dt>
                <dd className="pb-sup-k">{f.k}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* The spine, verbatim wherever the offering is enumerated;
            lowercased in CSS for this quiet supporting line. */}
        <p className="pb-run2">
          <span>one team, {PIPELINE_STEPS[0]}</span>
          {PIPELINE_STEPS.slice(1).map((w) => (
            <Fragment key={w}>
              <span className="pb-run2-sep" aria-hidden="true">
                →
              </span>
              <span>{w}</span>
            </Fragment>
          ))}
        </p>
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
