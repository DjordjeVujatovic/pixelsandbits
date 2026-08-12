import Footer from "@/components/Footer";
import { HomeHeader } from "@/components/Header";
import Reveal from "@/components/Reveal";
import { ASK_QA } from "@/lib/content";
import AskPanel from "@/components/home/AskPanel";
import ClientStrip from "@/components/home/ClientStrip";
import ClosingCta from "@/components/home/ClosingCta";
import Hero from "@/components/home/Hero";
import OfferingsTabs from "@/components/home/OfferingsTabs";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import SelectedWork from "@/components/home/SelectedWork";

/* FAQPage schema over the same five pairs that render on the page. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ASK_QA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage(): JSX.Element {
  return (
    <div className="pb-page">
      <HomeHeader />
      {/* Everything that recedes behind the mobile drawer lives in this
          wrapper — the fixed drawer must not have a transformed ancestor. */}
      <div className="pb-recede">
        <main id="top" className="pb-main">
        {/* Aurora field over a masked grid, confined to the hero band and
            resolved by the fade. Full-bleed via the margin/padding trick;
            pulled up behind the translucent sticky header. */}
        <section className="pb-hero-wrap">
          <span className="bgL bg-aurora" aria-hidden="true" />
          <span className="bgL bg-grid" aria-hidden="true" />
          <span className="bgL bg-fade" aria-hidden="true" />
          <Hero />
          <ClientStrip />
        </section>

        <Reveal as="section" variant="s" id="services" className="pb-services">
          <OfferingsTabs />
        </Reveal>

        <SelectedWork />
        <ProcessTimeline />

        {/* FAQ by function — sits near the end; the testimonial carousel
            and the closing proof band are adjacent below it. */}
        <Reveal as="section" variant="rev" id="faq" className="pb-ask">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <div className="pb-ask-head">
            <div>
              <div className="pb-kicker">$ ./ask --faq</div>
              <h2 className="pb-h-md pb-ask-h">Questions we get asked most</h2>
            </div>
          </div>
          <AskPanel />
        </Reveal>

        <ClosingCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
