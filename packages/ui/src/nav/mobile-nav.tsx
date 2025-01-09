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

export function MobileMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center bg-white dark:bg-black">
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
        className="absolute top-full left-0 right-0 bg-background border-b border-black/[0.2] dark:border-white/[0.2] bg-black overflow-hidden transition-[max-height] duration-300 ease-in-out"
        id="mobile-menu"
        ref={menuRef}
        style={{ maxHeight: "0px" }}
      >
        <nav
          className={`animate-fade-in ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <ul className="container mx-auto px-4 py-2 space-y-1">
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="/">Home</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="/about">About</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="/services">Services</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full justify-center" variant="ghost">
                <a href="/contact">Contact</a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MobileMenu;
