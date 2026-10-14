import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CTA_LABEL } from "@/lib/content";

/* Closing section: claim → the full-lime close (the one light surface
   on the site — plain sans on purpose, not mono). The proof band that
   sat between them was removed at owner request (2026-09-29). */
export default function ClosingCta(): JSX.Element {
  return (
    <Reveal as="section" variant="rev" id="track-record" className="cl">
      <div className="k-lead">
        <span className="k-kick">Let&apos;s work together</span>
        <span className="k-rule" aria-hidden="true" />
      </div>

      {/* The last claim before the CTA: quality, backed by the studio's
          experience. Owner-written wording; use verbatim. */}
      <h2 className="k-h">
        <span style={{ display: "block" }}>
          <em className="pb-grad">Production grade</em> software.
        </span>
        <span style={{ display: "block" }}>Built for the modern world.</span>
        <span style={{ display: "block" }}>
          Backed by <em className="pb-grad">a decade</em> of experience.
        </span>
      </h2>

      <div className="close">
        <span className="close-blob" aria-hidden="true" />
        <div>
          <h2 className="close-h">What are you building?</h2>
          <p className="close-sub">
            Let us know what you are building or what problem you are solving
            for. We would love to learn as much as possible before we get in
            touch.
          </p>
        </div>
        <div className="close-act">
          <Link className="ibtn" href="/contact">
            {CTA_LABEL} →
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
