"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/* Single source of truth for section nav: rendered links, burger menu,
   contact capsule, the scroll observer and the pill index all derive from
   this list, in document order. Three links since trust merged into the
   client-portfolio (#work) section; a span#trust inside it keeps old
   inbound anchors working. */
const NAV_ITEMS = [
  { id: "services", label: "services" },
  { id: "work", label: "work" },
  { id: "process", label: "process" },
];

function useCompact(): boolean {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setCompact((window.scrollY || 0) > 40);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return compact;
}

function Brand({ href }: { href: string }): JSX.Element {
  return (
    <Link href={href} className="pb-brand">
      <span className="pb-brand-dollar">$</span> pixels&bits
      <span className="pb-brand-caret" aria-hidden="true">
        ▍
      </span>
    </Link>
  );
}

interface Pill {
  left: number;
  width: number;
}

export function HomeHeader(): JSX.Element {
  const compact = useCompact();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [pill, setPill] = useState<Pill | null>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const measurePill = useCallback((id: string) => {
    const wrap = capsuleRef.current;
    // Skip entirely while the capsule is hidden (burger breakpoint).
    if (!wrap || wrap.offsetWidth === 0) {
      setPill(null);
      return;
    }
    const i = NAV_ITEMS.findIndex((n) => n.id === id);
    if (i < 0) {
      setPill(null);
      return;
    }
    const el = wrap.querySelectorAll<HTMLElement>(".pb-navlink")[i];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  useEffect(() => {
    measurePill(active);
  }, [active, measurePill]);

  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    const onResize = () => measurePill(activeRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measurePill]);

  return (
    <header className={`pb-header${compact ? " pb-compact" : ""}`}>
      <nav className="pb-nav">
        <Brand href="/" />
        <div className="pb-spacer" />
        <div
          className="pb-capsule"
          ref={capsuleRef}
          onMouseLeave={() => measurePill(active)}
        >
          <span
            className="pb-pill"
            style={{
              left: pill ? `${pill.left}px` : "0px",
              width: pill ? `${pill.width}px` : "0px",
              opacity: pill ? 1 : 0,
            }}
          />
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              className={`pb-navlink${active === n.id ? " pb-navon" : ""}`}
              href={`#${n.id}`}
              onMouseEnter={() => measurePill(n.id)}
            >
              <span className="pb-dash">--</span>
              {n.label}
            </a>
          ))}
        </div>
        <div className="pb-navlinks">
          <Link className="pb-cta" href="/contact">
            <span className="pb-brk">[</span>get in touch
            <span className="pb-brk">]</span>
            <span className="pb-arrow">→</span>
          </Link>
        </div>
        <button
          className="pb-burger"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`pb-menu${menuOpen ? " pb-menu-open" : ""}`}>
        {NAV_ITEMS.map((n) => (
          <a
            key={n.id}
            className="pb-menulink"
            href={`#${n.id}`}
            onClick={() => setMenuOpen(false)}
          >
            --{n.label}
          </a>
        ))}
        <Link
          className="pb-menulink pb-menulink-contact"
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          --contact
        </Link>
      </div>
    </header>
  );
}

export function ContactHeader(): JSX.Element {
  return (
    <header className="pb-header ct-header">
      <nav className="ct-nav">
        <Brand href="/" />
        <div className="pb-spacer" />
        <div className="ct-capsule">
          {NAV_ITEMS.map((n) => (
            <Link key={n.id} href={`/#${n.id}`}>
              <span className="ct-dash">--</span>
              {n.label}
            </Link>
          ))}
          <Link className="ct-navon" href="/contact" aria-current="page">
            <span className="ct-dash">--</span>contact
          </Link>
        </div>
        <div className="pb-spacer" />
      </nav>
    </header>
  );
}
