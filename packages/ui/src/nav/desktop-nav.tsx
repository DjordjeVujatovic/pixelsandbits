"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setActive(item);
      }}
    >
      <motion.p
        className="cursor-pointer text-sm lg:text-base text-white hover:opacity-[0.9]"
        transition={{ duration: 0.3 }}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.25rem)] left-1/2 transform -translate-x-1/2 pt-3 lg:pt-4">
              <motion.div
                className="bg-black backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
                layoutId="active"
                transition={transition}
              >
                <motion.div className="w-max h-full lg:p-4" layout>
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export function Menu({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav
      className="relative lg:right-16 rounded-full border border-white/[0.2] bg-black flex justify-center items-center space-x-4 lg:space-x-6 px-6 py-4 lg:px-8 lg:py-6"
      onMouseLeave={() => {
        setActive(null);
      }}
    >
      {children}
    </nav>
  );
}

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}): JSX.Element {
  return (
    <Link className="flex space-x-2 h-full group" href={href}>
      <div className="w-[100px] lg:w-[140px] h-full relative flex-shrink-0">
        <Image
          alt={title}
          className="rounded-md shadow-2xl object-cover"
          fill
          src={src}
        />
      </div>
      <div>
        <h4 className="text-base lg:text-xl font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#14b8a6] group-hover:to-[#3b82f6]">
          {title}
        </h4>
        <p className="text-xs lg:text-sm text-neutral-300 max-w-[7rem] lg:max-w-[8rem]">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function HoveredLink({
  children,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}): JSX.Element {
  return (
    <Link {...rest} className="text-neutral-200">
      {children}
    </Link>
  );
}
