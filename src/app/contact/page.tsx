import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ContactHeader } from "@/components/Header";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "contact",
  description:
    "What are you building? Fill this in for a reply within two business days: what to do first, and an honest view on whether it's the right team for the job.",
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
            <div className="pb-kicker ct-intro-kicker">$ cat ./contact</div>
            <h1 className="ct-h1">What are you building?</h1>
            <p className="ct-lead">
              Fill this in for a reply within two business days: what to do
              first, and an honest view on whether it&apos;s the right team for
              the job. Every field is optional except your name, email and a
              short brief.
            </p>
          </section>

          <section className="ct-shell">
            <ContactForm />

            <aside className="ct-in ct-aside">
              <div className="ct-aside-card">
                <div className="ct-aside-label">RESPONSE TIME</div>
                <div className="ct-aside-big">&lt; 2 days</div>
              </div>

              <div className="ct-aside-card">
                <div className="ct-aside-label" style={{ marginBottom: 16 }}>
                  WHAT HAPPENS NEXT
                </div>
                <div className="ct-steps">
                  <div className="ct-step">
                    <span className="ct-step-n">01</span>
                    <div>
                      <div className="ct-step-t">A reply with a first read</div>
                      <p className="ct-step-p">
                        What to do first, and what to question.
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
                        Priced work only after the problem is understood.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ct-proof">
                <span className="ct-proof-blob" aria-hidden="true" />
                <div className="ct-proof-label">SHIPPED FOR</div>
                <div className="ct-proof-fig">$100B+</div>
                <p className="ct-proof-sub">
                  combined value of previous clients.
                </p>
                <div className="ct-proof-chips">
                  <span className="ct-pchip">Coinbase</span>
                  <span className="ct-pchip">Decagon AI</span>
                  <span className="ct-pchip">ClassDojo</span>
                  <span className="ct-pchip">Scotts Miracle-Gro</span>
                  <span className="ct-pchip">Dapper Labs</span>
                  {/* hidden for now: <span className="ct-pchip nda">Frontier AI lab · NDA</span> */}
                </div>
              </div>

              <div className="ct-aside-card">
                <div className="ct-aside-label" style={{ marginBottom: 12 }}>
                  HOW TO GET IN TOUCH
                </div>
                <p className="ct-form-only">this form only</p>
                <p className="ct-reach-p">
                  Share what you&apos;re building, where it stands and what you
                  need help with.
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
