import Link from "next/link";
import { CTA_LABEL } from "@/lib/content";

export default function Footer({ linkBrand = false }: { linkBrand?: boolean }): JSX.Element {
  return (
    <footer className="pb-footer">
      <div>
        {linkBrand ? (
          <Link href="/" className="pb-footer-brand">
            pixels&bits
          </Link>
        ) : (
          <span className="pb-footer-brand">pixels&bits</span>
        )}
        <span>end-to-end product engineering for teams shipping AI</span>
        <span className="pb-spacer" />
        <Link href="/contact">{CTA_LABEL} →</Link>
      </div>
    </footer>
  );
}
