import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@repo/ui/nav/desktop-nav";
import { MobileMenu } from "@repo/ui/nav/mobile-nav";
import { cn } from "@repo/ui/utils";
import { LogoWithText } from "@repo/ui/logo/logo-with-text";
import { LogoIcon } from "@repo/ui/logo/logo-icon";

export function DesktopNavResponsive({
  className,
}: {
  className?: string;
}): JSX.Element {
  const [active, setActive] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuPortfolioItems = [
    {
      title: "Coinbase",
      description: "Platform for buying, selling, and storing crypto.",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%209.50.20%20PM.png",
    },
    {
      title: "Dapper Labs",
      description:
        "Platform for blockchain-based games and digital collectibles.",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.00.39%20PM.png",
    },
    {
      title: "Aii",
      description:
        "Funds and scales industry proven solutions to reduce carbon emissions.",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.07.45%20PM.png",
    },
    {
      title: "Spindl",
      description: "User attribution and growth platform for Web3",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.15.48%20PM.png",
    },
    {
      title: "Certn",
      description: "Background screening and verification platform",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.11.12%20PM.png",
    },
    {
      title: "Athena",
      description: "Virtual assistants for founders, investors, and leaders",
      href: "#portfolio",
      src: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.14.10%20PM.png",
    },
  ];

  const serviceItems = [
    {
      title: "Frontend Development",
      emoji: "🎨 ",
      href: "#services",
    },
    {
      title: "Full Stack Development",
      emoji: "⚡ ",
      href: "#services",
    },
    {
      title: "Startup MVP Development",
      emoji: "🚀 ",
      href: "#services",
    },
    {
      title: "Search Engine Optimization",
      emoji: "🔍 ",
      href: "#services",
    },
  ];

  return (
    <div
      className={cn(
        "fixed flex row justify-between items-center inset-x-0 mx-auto z-50 px-14 transition-all duration-200 py-2",
        hasScrolled
          ? "bg-black/80 backdrop-blur-sm border-b border-neutral-900"
          : "bg-transparent border-b border-transparent",
        className
      )}
    >
      <div className="hidden lg:block">
        <LogoWithText fill="#FFFFFF" />
      </div>
      <div className="block lg:hidden sm:w-1/4 lg:w-fit">
        <LogoIcon id="logo-icon-tablet" />
      </div>
      <div
        className={cn(
          "top-10 inset-x-0 lg:mx-auto z-50 sm:w-fit lg:w-96",
          className
        )}
      >
        <Menu setActive={setActive}>
          <MenuItem active={active} item="Services" setActive={setActive}>
            <div className="flex md:p-2 lg:p-0 flex-col space-y-4 text-sm">
              {serviceItems.map((item) => (
                <HoveredLink href={item.href} key={item.href}>
                  {item.emoji}
                  {"  "}
                  <span className="text-neutral-700 dark:text-neutral-200 hover:bg-gradient-to-r hover:from-[#14b8a6] hover:to-[#3b82f6] hover:bg-clip-text hover:text-transparent dark:hover:from-[#14b8a6] dark:hover:to-[#3b82f6]">
                    {item.title}
                  </span>
                </HoveredLink>
              ))}
            </div>
          </MenuItem>
          <MenuItem active={active} item="Portfolio" setActive={setActive}>
            <div className="text-sm grid grid-cols-2 gap-6 lg:gap-10 p-4">
              {menuPortfolioItems.map((item) => (
                <ProductItem
                  description={item.description}
                  href={item.href}
                  key={item.title}
                  src={item.src}
                  title={item.title}
                />
              ))}
            </div>
          </MenuItem>
          <Link href="/#testimonials">
            <MenuItem active={null} item="Testimonials" setActive={setActive} />
          </Link>
          <div className="block lg:hidden">
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-fit"
              type="button"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Lets Chat
              </span>
            </button>
          </div>
        </Menu>
      </div>
      <div className="hidden lg:block">
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-fit"
          type="button"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
            Lets Chat
          </span>
        </button>
      </div>
    </div>
  );
}

export function NavResponsive(): JSX.Element {
  return (
    <>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:block">
        <DesktopNavResponsive />
      </div>
    </>
  );
}
