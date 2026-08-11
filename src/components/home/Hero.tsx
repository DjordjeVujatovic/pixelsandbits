import Link from "next/link";
import { AVAILABILITY, CTA_LABEL } from "@/lib/content";
import Engagement from "./Engagement";

export default function Hero(): JSX.Element {
  return (
    <section className="pb-hero">
      <div className="pb-in">
        <div className="pb-avail">
          <span className="pb-avail-dot" aria-hidden="true" />
          <span className="pb-avail-label">{AVAILABILITY}</span>
        </div>
        <h1 className="pb-hero-h">
          <span className="pb-hero-l1">Your LLM demo,</span>
          <span className="pb-hero-h-accent">
            in production and in front of real operators.
          </span>
        </h1>
        <p className="pb-hero-lead">
          Nine years across the full stack. The last two embedded inside AI
          companies as forward deployed engineers, turning LLM demos into
          things people use on Monday morning.
        </p>
        <div className="pb-hero-btns">
          <Link className="pb-btn pb-btn-primary" href="/contact">
            {CTA_LABEL} <span className="pb-arrow">→</span>
          </Link>
          <a className="pb-btn pb-btn-ghost" href="#work">
            see the work <span className="pb-arrow">→</span>
          </a>
        </div>
        <p className="pb-hero-note">
          A written first read within two business days. No pitch deck, no
          discovery call to book a discovery call.
        </p>
      </div>
      <div className="pb-in" style={{ animationDelay: ".15s" }}>
        <Engagement />
      </div>
    </section>
  );
}
