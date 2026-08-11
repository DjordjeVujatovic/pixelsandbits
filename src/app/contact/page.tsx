import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ContactHeader } from "@/components/Header";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "contact",
  description:
    "Tell us what you're building. Fill this in and we'll come back within two business days with what we'd do first, and an honest read on whether we're the right team for it.",
};

export default function ContactPage(): JSX.Element {
  return (
    <div className="pb-page">
      <ContactHeader />
      <div className="pb-recede">
        <div className="pb-scanlines ct-scanlines" aria-hidden="true" />
        <div className="pb-glow ct-glow" aria-hidden="true" />
        <main className="ct-main">
        <section className="ct-in ct-intro">
          <div className="pb-avail">
            <span className="pb-avail-dot" aria-hidden="true" />
            <span className="pb-avail-label">taking new projects — q3</span>
          </div>
          <div className="pb-kicker ct-intro-kicker">$ cat ./contact</div>
          <h1 className="ct-h1">Tell us what you&apos;re building.</h1>
          <p className="ct-lead">
            Fill this in and we&apos;ll come back within two business days with
            what we&apos;d do first, and an honest read on whether we&apos;re
            the right team for it. Every field is optional except your name,
            email and a short brief.
          </p>
        </section>

        <section className="ct-shell">
          <ContactForm />

          <aside className="ct-in ct-aside">
            <div className="ct-aside-card">
              <div className="ct-aside-label">RESPONSE TIME</div>
              <div className="ct-aside-big">&lt; 2 days</div>
              <p className="ct-aside-p">
                Every enquiry is read by the person who&apos;d do the work. No
                account manager in between.
              </p>
            </div>

            <div className="ct-aside-card">
              <div className="ct-aside-label" style={{ marginBottom: 16 }}>
                WHAT HAPPENS NEXT
              </div>
              <div className="ct-steps">
                <div className="ct-step">
                  <span className="ct-step-n">01</span>
                  <div>
                    <div className="ct-step-t">We reply with a first read</div>
                    <p className="ct-step-p">
                      What we&apos;d do first, and what we&apos;d question.
                    </p>
                  </div>
                </div>
                <div className="ct-step">
                  <span className="ct-step-n">02</span>
                  <div>
                    <div className="ct-step-t">A 30-minute call</div>
                    <p className="ct-step-p">
                      Enough to know if the shapes fit on both sides.
                    </p>
                  </div>
                </div>
                <div className="ct-step">
                  <span className="ct-step-n">03</span>
                  <div>
                    <div className="ct-step-t">A scoping week</div>
                    <p className="ct-step-p">
                      Priced work only after we understand the problem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ct-proof">
              <span className="ct-proof-blob" aria-hidden="true" />
              <div className="ct-proof-label">WHO WE HAVE SHIPPED FOR</div>
              <div className="ct-proof-fig">$100B+</div>
              <p className="ct-proof-sub">
                combined value of the companies we have worked with.
              </p>
              <div className="ct-proof-chips">
                <span className="ct-pchip">Coinbase</span>
                <span className="ct-pchip">Decagon AI</span>
                <span className="ct-pchip">Scotts Miracle-Gro</span>
                <span className="ct-pchip">Dapper Labs</span>
                <span className="ct-pchip nda">leading frontier lab · NDA</span>
              </div>
            </div>

            <div className="ct-aside-card">
              <div className="ct-aside-label" style={{ marginBottom: 12 }}>
                HOW TO REACH US
              </div>
              <p className="ct-form-only">this form only</p>
              <p className="ct-reach-p">
                It routes straight to the person who&apos;d do the work.
                Recruiters and agencies welcome — tell us the actual project.
              </p>
            </div>
          </aside>
        </section>
        </main>
        <Footer linkBrand />
      </div>
    </div>
  );
}
