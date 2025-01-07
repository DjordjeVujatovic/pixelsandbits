"use client";
import React, { useState } from "react";
import { DotBackground } from "@repo/ui/dot-background";
import { BackgroundBeamsWithCollision } from "@repo/ui/background-beams-with-collision";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@repo/ui/hero-highlight-text";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@repo/ui/navbar-menu";
import { cn } from "@repo/ui/utils";
import { Logo } from "./logo";

export function HeroHighlightComponent(): JSX.Element {
  return (
    <HeroHighlight className="bg-transparent relative z-10">
      <motion.h1
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto relative"
        initial={{
          opacity: 100,
          y: 20,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        Beautiful products delivered at warp speed with percision down to the{" "}
        <Highlight className="text-black dark:text-white">
          Pixels & Bits
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}

export function NavbarComponent(): JSX.Element {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-8" />
    </div>
  );
}

function Navbar({ className }: { className?: string }): JSX.Element {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed flex row justify-between inset-x-0 mx-auto z-50 px-14",
        className
      )}
    >
      <div>
        <Logo fill="#FFFFFF" height={60.33} width={255.5} />
      </div>
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-xl mx-auto z-50",
          className
        )}
      >
        <Menu setActive={setActive}>
          <MenuItem active={active} item="Services" setActive={setActive}>
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/frontend-development">
                Frontend Development
              </HoveredLink>
              <HoveredLink href="/full-stack-development">
                Full Stack Development
              </HoveredLink>
              <HoveredLink href="/startup-mvp-development">
                Startup MVP Development
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem active={active} item="Testimonials" setActive={setActive}>
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                description="Prepare for tech interviews like never before."
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                title="Algochurn"
              />
              <ProductItem
                description="Production ready Tailwind css components for your next project"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                title="Tailwind Master Kit"
              />
              <ProductItem
                description="Never write from scratch again. Go from idea to blog in minutes."
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                title="Moonbeam"
              />
            </div>
          </MenuItem>
          <MenuItem active={active} item="Portfolio" setActive={setActive}>
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                description="Prepare for tech interviews like never before."
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                title="Algochurn"
              />
              <ProductItem
                description="Production ready Tailwind css components for your next project"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                title="Tailwind Master Kit"
              />
              <ProductItem
                description="Never write from scratch again. Go from idea to blog in minutes."
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                title="Moonbeam"
              />
              <ProductItem
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                title="Rogue"
              />
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div>
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

export default function Page(): JSX.Element {
  return (
    <main className="h-screen w-screen relative px-8">
      <NavbarComponent />
      <DotBackground>
        <BackgroundBeamsWithCollision>
          <div className="flex flex-col gap-4 items-center justify-center">
            <HeroHighlightComponent />
            <div className="flex flex-col gap-4 items-center justify-center pt-8">
              <button
                className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-fit"
                type="button"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
                  Book a call with us today
                </span>
              </button>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </DotBackground>
      <div className="flex h-screen flex-col gap-4 items-center justify-center">
        <div>
          <h1>We are a team of experienced developers</h1>
        </div>
      </div>
    </main>
  );
}
