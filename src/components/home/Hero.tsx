import Link from "next/link";
import Terminal from "./Terminal";

export default function Hero(): JSX.Element {
  return (
    <section className="pb-hero">
      <div className="pb-in">
        <div className="pb-avail">
          <span className="pb-avail-dot" aria-hidden="true" />
          <span className="pb-avail-label">
            product engineering &amp; ai deployment · available q3
          </span>
        </div>
        <h1 className="pb-hero-h">
          <span className="pb-hero-l1">Whiteboard sketch to</span>
          <span className="pb-hero-h-accent">production system.</span>
        </h1>
        <p className="pb-hero-lead">
          Nine years across the full stack. The last two embedded inside AI
          companies as forward deployed engineers, turning LLM demos into
          things people use on Monday morning.
        </p>
        <div className="pb-hero-btns">
          <Link className="pb-btn pb-btn-primary" href="/contact">
            get in touch <span className="pb-arrow">→</span>
          </Link>
          <a className="pb-btn pb-btn-ghost" href="#work">
            see the work <span className="pb-arrow">→</span>
          </a>
        </div>
      </div>
      <div className="pb-in" style={{ animationDelay: ".15s" }}>
        <Terminal />
      </div>
    </section>
  );
}
