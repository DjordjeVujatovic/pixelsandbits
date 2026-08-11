import Footer from "@/components/Footer";
import { HomeHeader } from "@/components/Header";
import Reveal from "@/components/Reveal";
import AskPanel from "@/components/home/AskPanel";
import Backdrop from "@/components/home/Backdrop";
import ClientStrip from "@/components/home/ClientStrip";
import ClosingCta from "@/components/home/ClosingCta";
import Hero from "@/components/home/Hero";
import OfferingsTabs from "@/components/home/OfferingsTabs";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import SelectedWork from "@/components/home/SelectedWork";
import Testimonial from "@/components/home/Testimonial";

export default function HomePage(): JSX.Element {
  return (
    <div className="pb-page">
      <HomeHeader />
      {/* Everything that recedes behind the mobile drawer lives in this
          wrapper — the fixed drawer must not have a transformed ancestor. */}
      <div className="pb-recede">
        <Backdrop />
        <main id="top" className="pb-main">
        <Hero />
        <ClientStrip />

        <Reveal as="section" variant="s" id="services" className="pb-services">
          <OfferingsTabs />
        </Reveal>

        <SelectedWork />
        <ProcessTimeline />

        {/* FAQ by function — sits near the end; the testimonial carousel
            and the closing proof band are adjacent below it. */}
        <Reveal as="section" variant="rev" id="ask" className="pb-ask">
          <div className="pb-ask-head">
            <div className="pb-kicker">$ ./ask --anything</div>
            <div className="pb-ask-note">
              Four questions we get asked most, answered.
            </div>
          </div>
          <AskPanel />
        </Reveal>

        <Testimonial />
        <ClosingCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
