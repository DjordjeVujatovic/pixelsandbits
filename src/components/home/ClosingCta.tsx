import Link from "next/link";
import Reveal from "@/components/Reveal";

/* Closing section: claim → proof band → the full-lime close (the one
   light surface on the site — plain sans on purpose, not mono).
   ⚠ The `6` (YC companies) and `4` (unicorns) figures are placeholders
   pending confirmed counts — do not launch without verifying them. */
export default function ClosingCta(): JSX.Element {
  return (
    <Reveal as="section" variant="rev" className="cl">
      <div className="k-lead">
        <span className="k-kick">The track record</span>
        <span className="k-rule" aria-hidden="true" />
      </div>

      <h2 className="k-h">
        We have built inside <em className="pb-grad">frontier labs</em>, a Fortune 500, and
        companies now worth more than <em className="pb-grad">$100B</em> combined.
      </h2>
      <p className="k-sub">
        Nine years of it, mostly as the engineers embedded in someone
        else&apos;s team.
      </p>

      <div className="k-band">
        <div className="k-cell">
          <span className="k-spark" aria-hidden="true" />
          <div className="fig">
            <span className="pb-grad" data-count="100" data-prefix="$" data-suffix="B+" data-dur="1200">
              $100B+
            </span>
          </div>
          <div className="lab">
            combined valuation of the companies we have shipped inside
          </div>
        </div>
        <div className="k-cell">
          <span className="k-spark" aria-hidden="true" />
          <div className="fig">
            <span className="pb-grad" data-count="6" data-dur="1200">
              6
            </span>
          </div>
          <div className="lab">Y Combinator companies, seed stage through exit</div>
        </div>
        <div className="k-cell">
          <span className="k-spark" aria-hidden="true" />
          <div className="fig">
            <span className="pb-grad" data-count="4" data-dur="1200">
              4
            </span>
          </div>
          <div className="lab">unicorns, plus two acquisitions after we shipped</div>
        </div>
        <div className="k-cell">
          <span className="k-spark" aria-hidden="true" />
          <div className="fig">
            <span className="pb-grad" data-count="2" data-dur="1200">
              2
            </span>
          </div>
          <div className="lab">frontier AI labs</div>
          <div className="note">ONE NAMED · ONE UNDER NDA</div>
        </div>
      </div>

      <div className="close">
        <span className="close-blob" aria-hidden="true" />
        <div>
          <h2 className="close-h">Tell us what you&apos;re building.</h2>
          <p className="close-sub">
            A written first read within two business days, from the engineers
            who would do the work.
          </p>
        </div>
        <div className="close-act">
          <Link className="ibtn" href="/contact">
            Get in touch →
          </Link>
          <a className="ialt" href="#work">
            See the work
          </a>
        </div>
      </div>
    </Reveal>
  );
}
