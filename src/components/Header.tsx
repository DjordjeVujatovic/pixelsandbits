"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* Single source of truth for section nav: rendered links, the drawer,
   the contact capsule, the scroll observer and the pill index all derive
   from this list, in document order. */
const NAV_ITEMS = [
  { id: "services", label: "services" },
  { id: "work", label: "work" },
  { id: "process", label: "process" },
  { id: "faq", label: "faq" },
  { id: "track-record", label: "track-record" },
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

/* Full-screen mobile drawer (<720px). One .pb-navopen class on <body>
   drives the drawer slide, the scrim, the page recede and the burger→X.
   Body scroll locks while open; focus is trapped inside and returned to
   the burger on close; the drawer is inert while closed. */
function useDrawer(): {
  open: boolean;
  toggle: () => void;
  close: () => void;
  burgerRef: React.RefObject<HTMLButtonElement>;
  drawerRef: React.RefObject<HTMLElement>;
} {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const drawer = drawerRef.current;
    const burgerEl = burgerRef.current;
    document.body.classList.toggle("pb-navopen", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (drawer) {
      // React 18 has no inert prop support — set the property directly.
      (drawer as HTMLElement & { inert: boolean }).inert = !open;
    }

    if (!open) return;

    const first = drawer?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      // Trap focus: fully control Tab so it cycles through the drawer
      // links plus the burger (the X). The burger precedes the drawer in
      // DOM order, so native tabbing would otherwise escape into the
      // receded page content behind the scrim.
      const items = [
        ...Array.from(drawer.querySelectorAll<HTMLElement>("a, button")),
        ...(burgerEl ? [burgerEl] : []),
      ];
      if (!items.length) return;
      e.preventDefault();
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? i <= 0
          ? items.length - 1
          : i - 1
        : i === items.length - 1 || i === -1
          ? 0
          : i + 1;
      items[next].focus();
    };

    // Crossing 720px while open must reset the state, or the desktop
    // layout inherits a receded, blurred page.
    const mq = window.matchMedia("(min-width: 721px)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      burgerEl?.focus();
    };
  }, [open]);

  // Never leave the body locked on unmount.
  useEffect(
    () => () => {
      document.body.classList.remove("pb-navopen");
      document.body.style.overflow = "";
    },
    [],
  );

  return { open, toggle, close, burgerRef, drawerRef };
}

function Burger({
  open,
  onClick,
  burgerRef,
}: {
  open: boolean;
  onClick: () => void;
  burgerRef: React.RefObject<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className="pb-burger"
      type="button"
      aria-label="Menu"
      aria-expanded={open}
      aria-controls="pb-drawer"
      onClick={onClick}
      ref={burgerRef}
    >
      <span className="pb-bar pb-bar1" />
      <span className="pb-bar pb-bar2" />
      <span className="pb-bar pb-bar3" />
    </button>
  );
}

function NavDrawer({
  onContact,
  close,
  drawerRef,
}: {
  onContact: boolean;
  close: () => void;
  drawerRef: React.RefObject<HTMLElement>;
}): JSX.Element {
  const prefix = onContact ? "/" : "";
  const links = [
    ...NAV_ITEMS.map((n, i) => ({
      href: `${prefix}#${n.id}`,
      label: n.label,
      num: `0${i + 1}`,
      current: false,
    })),
    {
      href: "/contact",
      label: "contact",
      num: `0${NAV_ITEMS.length + 1}`,
      current: onContact,
    },
  ];
  return (
    <>
      <span className="pb-scrim" aria-hidden="true" onClick={close} />
      <nav className="pb-drawer" id="pb-drawer" aria-label="Main" ref={drawerRef}>
        <div className="pb-drawer-top" />
        <div className="pb-drawer-body">
          {links.map((l) => (
            <a
              className="pb-dlink"
              href={l.href}
              key={l.label}
              aria-current={l.current ? "page" : undefined}
              onClick={close}
            >
              <span className="pb-dn">{l.num}</span>
              {/* Flag-style hyphens belong to the mono capsule; the
                  drawer's display type reads as words. */}
              <span className="pb-dt">{l.label.replace(/-/g, " ")}</span>
              <span className="pb-darr" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
        <div className="pb-drawer-foot pb-dft">
          <Link className="pb-dcta" href="/contact" onClick={close}>
            get in touch →
          </Link>
          <div className="pb-dmeta">
            <span className="pb-ddot" aria-hidden="true" />
            taking work this quarter
          </div>
        </div>
      </nav>
    </>
  );
}

interface Pill {
  left: number;
  width: number;
}

export function HomeHeader(): JSX.Element {
  const compact = useCompact();
  const drawer = useDrawer();
  const [active, setActive] = useState<string>("");
  const [pill, setPill] = useState<Pill | null>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const measurePill = useCallback((id: string) => {
    const wrap = capsuleRef.current;
    // Skip entirely while the capsule is hidden (drawer breakpoint).
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
    // Mono or not, label widths shift between platforms — re-measure
    // once the real font is in.
    document.fonts?.ready.then(() => measurePill(activeRef.current));
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measurePill]);

  return (
    <>
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
                aria-current={active === n.id ? "true" : undefined}
                onMouseEnter={() => measurePill(n.id)}
              >
                <span className="pb-dash">--</span>
                {n.label}
              </a>
            ))}
          </div>
          {/* Paired spacers keep the capsule centred regardless of how
              wide the wordmark and CTA are. */}
          <div className="pb-spacer" />
          <div className="pb-navlinks">
            <Link className="pb-cta" href="/contact">
              <span className="pb-brk">[</span>get in touch
              <span className="pb-brk">]</span>
              <span className="pb-arrow">→</span>
            </Link>
          </div>
          <Burger open={drawer.open} onClick={drawer.toggle} burgerRef={drawer.burgerRef} />
        </nav>
      </header>
      <NavDrawer onContact={false} close={drawer.close} drawerRef={drawer.drawerRef} />
    </>
  );
}

export function ContactHeader(): JSX.Element {
  const drawer = useDrawer();
  return (
    <>
      <header className="pb-header ct-header">
        <nav className="ct-nav">
          <Brand href="/" />
          <div className="pb-spacer" />
          {/* Three escapes back into the site; no --contact link to the
              page you are already on. */}
          <div className="ct-capsule">
            {NAV_ITEMS.map((n) => (
              <Link key={n.id} href={`/#${n.id}`}>
                <span className="ct-dash">--</span>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="pb-spacer" />
          <Burger open={drawer.open} onClick={drawer.toggle} burgerRef={drawer.burgerRef} />
        </nav>
      </header>
      <NavDrawer onContact close={drawer.close} drawerRef={drawer.drawerRef} />
    </>
  );
}
