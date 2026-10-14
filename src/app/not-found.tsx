import Link from "next/link";
import Footer from "@/components/Footer";
import { ContactHeader } from "@/components/Header";
import { CTA_LABEL } from "@/lib/content";

/* 404 in the site's terminal voice, assembled entirely from existing
   contact-page and button classes — no new styles. */
export default function NotFound(): JSX.Element {
  return (
    <div className="pb-page">
      <ContactHeader />
      <div className="pb-recede">
        <div className="pb-scanlines ct-scanlines" aria-hidden="true" />
        <main className="ct-main">
          <section className="ct-in ct-intro">
            <div className="pb-kicker ct-intro-kicker">$ cat ./404</div>
            <h1 className="ct-h1">No such file or directory.</h1>
            <p className="ct-lead">
              This page doesn&apos;t exist — or it shipped under NDA. Either
              way, the work is one level up.
            </p>
            <div className="pb-hero-btns" style={{ marginTop: 28 }}>
              <Link className="pb-btn pb-btn-primary" href="/">
                cd ~/ <span className="pb-arrow">→</span>
              </Link>
              <Link className="pb-btn pb-btn-ghost" href="/contact">
                {CTA_LABEL} <span className="pb-arrow">→</span>
              </Link>
            </div>
          </section>
        </main>
        <Footer linkBrand />
      </div>
    </div>
  );
}
