import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";
import {
  HeroHighlight as HeroHighlightText,
  Highlight,
} from "./hero-highlight-text";

interface TextSegmentHighlighterProps {
  segments: {
    text: string;
    highlight?: boolean;
    break?: boolean;
    className?: string;
  }[];
  className?: string;
}

export function TextSegmentHighlighter({
  segments,
  className,
}: TextSegmentHighlighterProps): JSX.Element {
  return (
    <HeroHighlightText className="bg-transparent relative z-10">
      <motion.h1
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        className={cn(
          "px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto relative whitespace-pre-wrap",
          className ?? "lg:text-5xl md:text-4xl text-[2rem]"
        )}
        initial={{
          opacity: 100,
          y: 20,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {segment.highlight ? (
              <Highlight
                className={cn(
                  "text-black dark:text-white inline-block",
                  segment.className
                )}
              >
                {segment.text}
              </Highlight>
            ) : (
              <span className={cn("inline-block", segment.className)}>
                {segment.text}
              </span>
            )}
            {segment.break ? <br /> : null}
            {!segment.break && " "}
          </React.Fragment>
        ))}
      </motion.h1>
    </HeroHighlightText>
  );
}
