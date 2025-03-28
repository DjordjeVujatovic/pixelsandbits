"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../button";
import { LogoIcon } from "../logo/logo-icon";

interface HamburgerMenuProps {
  isOpen: boolean;
  className?: string;
}

export function HamburgerMenu({
  isOpen,
  className = "",
}: HamburgerMenuProps): JSX.Element {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      {/* Top bar */}
      <path
        className={`transition-transform duration-300 origin-[50%_50%] ${
          isOpen ? "rotate-45 translate-y-[3px]" : ""
        }`}
        d="M4 6h16"
        strokeLinecap="round"
      />

      {/* Middle bar */}
      <path
        className={`transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
        d="M4 12h16"
        strokeLinecap="round"
      />

      {/* Bottom bar */}
      <path
        className={`transition-transform duration-300 origin-[50%_50%] ${
          isOpen ? "-rotate-45 -translate-y-[6px]" : ""
        }`}
        d="M4 18h16"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MobileMenu({
  handleOpenChatwoot,
}: {
  handleOpenChatwoot: () => void;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.style.maxHeight = `${menuRef.current.scrollHeight}px`;
      } else {
        menuRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0  z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center bg-black">
        <LogoIcon />
        <Button
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          className="relative z-20"
          onClick={toggleMenu}
          size="icon"
          variant="ghost"
        >
          <HamburgerMenu className="h-24 w-24" isOpen={isOpen} />
        </Button>
      </div>
      <div
        className={`absolute top-full left-0 right-0 bg-background bg-black overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          hasScrolled
            ? "border-b border-white/[0.2]"
            : "border-b border-white/0"
        }`}
        id="mobile-menu"
        ref={menuRef}
        style={{ maxHeight: "0px" }}
      >
        <nav
          className={`animate-fade-in ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <ul className="container mx-auto px-4 pt-2 pb-4 space-y-1 flex flex-col items-center justify-center gap-2">
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="/">Home</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="#portfolio">Portfolio</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="#services">Services</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="#testimonials ">Testimonials</a>
              </Button>
            </li>
            <button
              className="relative inline-flex h-10 overflow-hidden rounded-[9999px] p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-fit transform-gpu"
              onClick={handleOpenChatwoot}
              type="button"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] rounded-[9999px] will-change-transform" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[9999px] bg-slate-950 px-4 py-1 text-body-md md:text-md-body-md lg:text-lg-body-md font-medium text-white backdrop-blur-3xl isolate">
                Lets Chat
              </span>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MobileMenu;
