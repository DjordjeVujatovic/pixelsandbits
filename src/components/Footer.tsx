import Link from "next/link";

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
        <span>product engineering &amp; ai deployment</span>
        <span className="pb-spacer" />
        <Link href="/contact">get in touch →</Link>
      </div>
    </footer>
  );
}
