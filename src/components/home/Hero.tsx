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

export default function Hero(): JSX.Element {
  return (
    <section className="pb-hero">
      <div className="pb-in pb-hero-copy">
        <h1 className="pb-hero-h">
          <span className="pb-hero-l1">Your LLM demo,</span>
          <span className="pb-hero-h-accent">
            in production and in front of real operators.
          </span>
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
      </div>
      {/* The panel and the CTAs are separate grid children so the
          stacked (≤1199px) hero can order the terminal ABOVE the
          buttons while desktop keeps them in the left column. */}
      <div className="pb-in pb-hero-panel" style={{ animationDelay: ".15s" }}>
        <Engagement />
      </div>
      <div className="pb-in pb-hero-ctas" style={{ animationDelay: ".08s" }}>
        <div className="pb-hero-btns">
          <Link className="pb-btn pb-btn-primary" href="/contact">
            {CTA_LABEL} <span className="pb-arrow">→</span>
          </Link>
          <a className="pb-btn pb-btn-ghost" href="#work">
            see the work <span className="pb-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
