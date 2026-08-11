import Link from "next/link";
import Reveal from "@/components/Reveal";

/* Closing section: claim → proof band → the full-lime close (the one
   light surface on the site — plain sans on purpose, not mono). All
   four band facts are verified — this is the page's single scale
   argument, so nothing here may duplicate the portfolio section. */
export default function ClosingCta(): JSX.Element {
  return (
    <Reveal as="section" variant="rev" id="track-record" className="cl">
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
            <span className="pb-grad" data-count="2" data-dur="1200">
              2
            </span>
          </div>
          <div className="lab">exits · Spindl to Coinbase, ZeroDown to Flyhomes</div>
        </div>
        <div className="k-cell">
          <span className="k-spark" aria-hidden="true" />
          <div className="fig fig-txt">
            <span className="pb-grad">Fortune 500</span>
          </div>
          <div className="lab">Scotts Miracle-Gro — enterprise stacks and legacy systems</div>
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
