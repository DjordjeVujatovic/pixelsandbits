"use client";

import React, { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { cn } from "../lib/utils";
import { BackgroundGradient } from "./background-gradient";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: StaticImageData;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      className={cn(
        "scroller relative z-20 h-[32rem] max-w-[96rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] w-screen",
        className
      )}
      ref={containerRef}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-4 md:gap-16 py-4 w-max flex-nowrap relative top-6",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        ref={scrollerRef}
      >
        {items.map((item) => (
          <BackgroundGradient className="h-full" key={item.name}>
            <li
              className="w-[280px] md:w-[450px] max-w-full h-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-4 md:px-8 py-6"
              key={item.name}
              style={{
                background:
                  "linear-gradient(180deg, var(--black), var(--neutral-900)",
              }}
            >
              <blockquote className="h-full flex flex-col">
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                />
                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal flex-grow">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-row gap-1">
                    <Image
                      alt="Image"
                      className="rounded-full"
                      height={100}
                      src={item.image}
                      width={100}
                    />
                    <div className="flex flex-col gap-1 justify-center mx-4">
                      <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                        {item.name}
                      </span>
                      <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                        {item.title}
                      </span>
                    </div>
                  </span>
                </div>
              </blockquote>
            </li>
          </BackgroundGradient>
        ))}
      </ul>
    </div>
  );
}
