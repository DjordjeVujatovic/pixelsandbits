"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export function AnimatedTooltip({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    icon: React.ElementType;
  }[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  // Calculate the middle index
  const middleIndex = Math.floor(items.length / 2);

  return (
    <>
      {items.map((item, idx) => {
        // Calculate scale factor based on distance from center
        const distanceFromCenter = Math.abs(idx - middleIndex);
        const scale = 1.2 - distanceFromCenter * 0.15;

        // Calculate margin based on position - more margin for center items
        const margin = (() => {
          if (distanceFromCenter === 0) {
            return "mx-2"; // Reduced from mx-3 to mx-2 for center
          }
          if (distanceFromCenter === 1) {
            return "mx-1"; // Reduced from mx-2 to mx-1 for adjacent
          }
          return "mx-0"; // Reduced from mx-0.5 to mx-0 for outer items
        })();

        return (
          <div
            className={`relative group ${margin}`}
            key={item.name}
            onMouseEnter={() => {
              setHoveredIndex(item.id);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  className="max-md:hidden flex absolute -top-14 -left-1/2 translate-x-1/2 text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-3 py-1.5"
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX,
                    rotate,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-sm">
                    {item.name}
                  </div>
                  <div className="text-white text-xs">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative z-30">
              <svg height="0" width="0">
                <defs>
                  <linearGradient
                    id={`gradient-${item.id}`}
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                animate={{
                  fill:
                    hoveredIndex === item.id
                      ? `url(#gradient-${item.id})`
                      : "white",
                }}
                initial={{ fill: "white" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    transform: `scale(${scale})`,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: hoveredIndex === item.id ? 1.1 : 1,
                      rotate: hoveredIndex === item.id ? [0, -10, 10, 0] : 0,
                    }}
                    onHoverEnd={() => {
                      setHoveredIndex(null);
                    }}
                    onHoverStart={() => {
                      setHoveredIndex(item.id);
                    }}
                    transition={{
                      rotate: {
                        duration: 0.4,
                        ease: "easeInOut",
                        repeat: 0,
                        restDelta: 0.001,
                        forceAnimations: true,
                      },
                      scale: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                        restDelta: 0.001,
                      },
                    }}
                  >
                    <item.icon
                      className="object-cover cursor-pointer !m-0 !p-0 object-top h-[30px] w-[25px] lg:h-[55px] lg:w-[55px] border-neutral-700 relative transition duration-500"
                      style={{
                        fill:
                          hoveredIndex === item.id
                            ? `url(#gradient-${item.id})`
                            : "#e5e5e5",
                        transition: "fill 0.3s ease",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </>
  );
}
