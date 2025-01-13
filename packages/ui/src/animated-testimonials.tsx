// "use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "./background-gradient";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}): JSX.Element {
  const [active, setActive] = useState(0);
  const controls = useAnimation();

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const handleDragEnd = (event: any, info: any) => {
    // Only handle swipes on mobile viewport
    if (window.innerWidth > 768) return;

    const swipeThreshold = 50;
    const { offset } = info;

    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div className="w-full px-4 2xl:pt-20 pb-10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row md:gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 10 : 1,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    className="absolute inset-0 origin-bottom"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    key={testimonial.src}
                    onDragEnd={handleDragEnd}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <BackgroundGradient>
                      <div className="h-[250px] w-full bg-gradient-to-r from-black to-neutral-900 flex flex-col md:flex-row items-center rounded-3xl object-cover object-center brightness-70 p-4 gap-6">
                        <Image
                          alt={testimonial.name}
                          className="rounded-full object-cover object-center brightness-75 border-2 border-gray-800 h-[125px] w-[125px] md:h-[140px] md:w-[140px] xl:h-[150px] xl:w-[150px]"
                          draggable={false}
                          height={150}
                          src={testimonial.src}
                          width={150}
                        />
                        <div className="flex flex-col text-center md:text-left">
                          <h3 className="text-2xl font-bold text-white">
                            {testimonials[active].name}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {testimonials[active].designation}
                          </p>
                        </div>
                      </div>
                    </BackgroundGradient>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              <button
                className="hidden md:flex h-7 w-7 rounded-full bg-neutral-800 items-center justify-center group/button"
                onClick={handlePrev}
              >
                <IconArrowLeft className="h-5 w-5 text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                className="hidden md:flex h-7 w-7 rounded-full bg-neutral-800 items-center justify-center group/button"
                onClick={handleNext}
              >
                <IconArrowRight className="h-5 w-5 text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between py-4">
            <motion.div
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="h-[300px] relative"
              exit={{
                y: -20,
                opacity: 0,
              }}
              initial={{
                y: 20,
                opacity: 0,
              }}
              key={active}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <motion.p className="text-sm text-center md:text-left text-neutral-300 mt-8 relative">
                <motion.span
                  animate={{
                    opacity: 1,
                    x: -20,
                    y: [-2, 2, -2],
                    rotate: [-3, 0, -3],
                  }}
                  className="text-4xl font-serif text-neutral-600 absolute -left-2 -top-2"
                  initial={{ opacity: 0, x: -20 }}
                  transition={{
                    opacity: {
                      duration: 0.3,
                      delay:
                        0.02 * testimonials[active].quote.split(" ").length,
                    },
                    x: {
                      duration: 0.3,
                      delay:
                        0.02 * testimonials[active].quote.split(" ").length,
                    },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  &ldquo;
                </motion.span>
                <span className="relative inline-block text-center text-slate-400">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      className="inline-block"
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      key={index}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [2, -2, 2],
                    rotate: [3, 0, 3],
                  }}
                  className="text-4xl font-serif text-neutral-600 absolute right-6 -bottom-8"
                  initial={{ opacity: 0, x: 20 }}
                  transition={{
                    opacity: {
                      duration: 0.3,
                      delay:
                        0.02 * testimonials[active].quote.split(" ").length,
                    },
                    x: {
                      duration: 0.3,
                      delay:
                        0.02 * testimonials[active].quote.split(" ").length,
                    },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  &rdquo;
                </motion.span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
