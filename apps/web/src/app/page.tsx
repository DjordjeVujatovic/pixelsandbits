"use client";
import React from "react";
import Image from "next/image";
import { DotBackground } from "@repo/ui/dot-background";
import { BackgroundBeamsWithCollision } from "@repo/ui/background-beams-with-collision";
import { PinContainer } from "@repo/ui/3d-pin";
import { TextSegmentHighlighter } from "@repo/ui/text-segment-highlighter";
import { AnimatedTestimonials } from "@repo/ui/animated-testimonials";
import { Meteors } from "@repo/ui/meteor-card";
import { AnimatedTooltip } from "@repo/ui/animated-tooltip";
import { WarpSpeedCover } from "@repo/ui/warp-speed-cover";
import { NavResponsive } from "@repo/ui/nav/responsive-nav";
import { SparklesCore } from "@repo/ui/sparkles";
import {
  portfolio,
  services,
  techStack,
  testimonials,
} from "../../lib/datastructures";

function CallToActionFooter(): JSX.Element {
  return (
    <div className="h-[25rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <div className="relative w-full h-full">
          <SparklesCore
            background="transparent"
            className="w-full h-full [mask-image:linear-gradient(to_right,transparent,white_40%,white_60%,transparent)]"
            id="tsparticlesfullpage"
            maxSize={1.4}
            minSize={0.6}
            particleColor="rgba(20, 184, 166, 1)"
            particleDensity={20}
          />
        </div>
      </div>
      <WarpSpeedCoverComponent />
      <div className="flex flex-col gap-4 items-center justify-center pt-4">
        <button
          className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-fit"
          type="button"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#14B8A6_0%,#0F766E_50%,#14B8A6_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
            Book a call with us today
          </span>
        </button>
      </div>
    </div>
  );
}

function WarpSpeedCoverComponent(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-[8rem] font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Lets work together and well help you <br /> build your products at{" "}
        <WarpSpeedCover>warp speed</WarpSpeedCover>
      </h1>
    </div>
  );
}

interface MeteorsCardProps {
  title: string;
  description: string;
  emoji?: string;
}

function MeteorsCard({
  title,
  description,
  emoji,
}: MeteorsCardProps): JSX.Element {
  return (
    <div className="h-full">
      <div className="w-full relative max-w-xs h-full">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-black border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col">
          <div>{emoji ? <span className="text-4xl">{emoji}</span> : null}</div>
          <div className="flex items-center gap-2 my-4 relative">
            <h1 className="font-bold text-xl text-white">{title}</h1>
          </div>

          <p className="font-normal text-base text-slate-400 mb-4 relative">
            {description}
          </p>
          <Meteors number={50} />
        </div>
      </div>
    </div>
  );
}

function AnimatedTestimonialsComponent(): JSX.Element {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

function HeroHighlightComponent(): JSX.Element {
  return (
    <TextSegmentHighlighter
      segments={[
        {
          text: "Beautiful products delivered at warp speed with percision down to the",
        },
        { text: "Pixels & Bits", highlight: true },
      ]}
    />
  );
}

function HeroHighlightPortfolio(): JSX.Element {
  return (
    <TextSegmentHighlighter
      className="text-3xl my-8"
      segments={[
        {
          text: "We have worked with many",
        },
        {
          text: "world class clients",
          highlight: true,
        },
        {
          text: "and build their products out from",
        },
        { text: "Ideation to Launch", highlight: true },
      ]}
    />
  );
}

function HeroHighlightTestimonials(): JSX.Element {
  return (
    <TextSegmentHighlighter
      className="text-3xl my-8 text-center lg:text-left md:relative md:bottom-20 max-w-2xl"
      segments={[
        {
          text: "Our clients have",
        },
        {
          text: "loved working with us",
          highlight: true,
        },
        {
          text: "in the past and heres what they have to say",
        },
        {
          text: "about our work",
          highlight: true,
        },
      ]}
    />
  );
}

function HeroHighlightServices(): JSX.Element {
  return (
    <TextSegmentHighlighter
      className="text-3xl my-8"
      segments={[
        { text: "We use" },
        { text: "the latest and greatest", highlight: true },
        { text: "tools and technologies in our tech stack" },
        { text: "to build out" },
        { text: "beautiful products", highlight: true },
      ]}
    />
  );
}

function AnimatedPin(data: {
  title: string;
  description: string;
  href: string;
  image: string;
}): JSX.Element {
  return (
    <div className="h-[26rem] w-full flex items-center justify-center">
      <PinContainer href={data.href} title={data.title}>
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            {data.title}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-400 ">{data.description}</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden">
            <Image
              alt="Aceternity UI"
              className="rounded-lg object-cover w-full h-full object-center"
              height={400}
              src={data.image}
              style={{ objectPosition: "center" }}
              width={600}
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}

export default function Page(): JSX.Element {
  return (
    <main className="px-8">
      <div className="hiddenmd:block">
        <NavResponsive />
      </div>
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
      <DotBackground id="portfolio">
        <div className="flex flex-col gap-4 items-center justify-start">
          <HeroHighlightPortfolio />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 z-10">
            {portfolio.map((item) => (
              <div className="w-full" key={item.title}>
                <AnimatedPin {...item} />
              </div>
            ))}
          </div>
        </div>
      </DotBackground>
      <DotBackground id="testimonials">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 items-center justify-start pt-24">
          <HeroHighlightTestimonials />
          <AnimatedTestimonialsComponent />
        </div>
      </DotBackground>
      <DotBackground id="services">
        <div className="flex flex-col gap-4 items-center justify-start">
          <HeroHighlightServices />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-center justify-start pt-8">
            {services.map((service) => (
              <MeteorsCard
                description={service.description}
                emoji={service.emoji}
                key={service.title}
                title={service.title}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center my-12 w-full">
            <AnimatedTooltip items={techStack} />
          </div>
        </div>
      </DotBackground>
      <div className="relative h-[25rem] w-full mt-12">
        <CallToActionFooter />
      </div>
    </main>
  );
}
