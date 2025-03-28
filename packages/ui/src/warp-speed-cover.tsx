"use client";
import React, { useEffect, useId, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { SparklesCore } from "./sparkles";

export function WarpSpeedCover({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.clientWidth);

      const height = ref.current.clientHeight;
      const numberOfBeams = Math.floor(height / 10); // Adjust the divisor to control the spacing
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, [ref.current]);

  return (
    <div
      className="relative hover:bg-neutral-900 cursor-pointer group/cover inline-block bg-neutral-900 px-2 py-2 transition duration-200 rounded-sm"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      ref={ref}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="h-full w-full overflow-hidden absolute inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
            }}
          >
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              className="w-[200%] h-full flex"
              transition={{
                translateX: {
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
            >
              <SparklesCore
                background="transparent"
                className="w-full h-full"
                maxSize={1}
                minSize={0.4}
                particleColor="rgba(20, 184, 166, 1)"
                particleDensity={500}
              />
              <SparklesCore
                background="transparent"
                className="w-full h-full"
                maxSize={1}
                minSize={0.4}
                particleColor="rgba(20, 184, 166, 1)"
                particleDensity={500}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          delay={Math.random() * 2 + 1}
          duration={Math.random() * 2 + 1}
          hovered={hovered}
          key={index}
          style={{
            top: `${position}px`,
          }}
          width={containerWidth}
        />
      ))}
      <motion.span
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        className={cn(
          "text-white inline-block relative z-20 group-hover/cover:text-white transition duration-200",
          className
        )}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        key={String(hovered)}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          y: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: {
            duration: 0.2,
          },
          filter: {
            duration: 0.2,
          },
        }}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px]" delay={0.4} />
      <CircleIcon className="absolute -left-[2px] -top-[2px]" delay={0.8} />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" delay={1.6} />
    </div>
  );
}

export function Beam({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) {
  const id = useId();

  return (
    <motion.svg
      className={cn("absolute inset-x-0 w-full", className)}
      fill="none"
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      width={width ?? "600"}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          gradientUnits="userSpaceOnUse"
          id={`svgGradient-${id}`}
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          key={String(hovered)}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1,
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
}

export function CircleIcon({
  className,
  delay,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        `pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-white opacity-20 group-hover/cover:bg-white`,
        className
      )}
    />
  );
}
