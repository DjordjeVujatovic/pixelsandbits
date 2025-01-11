"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DotBackground } from "@repo/ui/dot-background";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@repo/ui/background-beams-with-collision";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@repo/ui/nav/navbar-menu";
import { cn } from "@repo/ui/utils";
import { MobileMenu } from "@repo/ui/nav/mobile-nav";
import { LogoWithText } from "@repo/ui/logo/logo-with-text";
import { LogoIcon } from "@repo/ui/logo/logo-icon";
import { PinContainer } from "@repo/ui/3d-pin";
import { InfiniteMovingCards } from "@repo/ui/infinite-moving-cards";
import { TextSegmentHighlighter } from "@repo/ui/text-segment-highlighter";
import { AnimatedTestimonials } from "@repo/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Djordje was an absolute pleasure to work with. His work ethic was top-tier, consistently going above and beyond to ensure that every assignment was completed to the highest standard. Djordje is a sharp critical thinker who approaches problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work.",
      name: "Dan Xavier",
      designation: "Head of Software, Aii",
      src: "https://media.licdn.com/dms/image/v2/D5603AQHSSfzYx7m5og/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681566410237?e=1741824000&v=beta&t=vqaXKgfwYZCkC_YoQGWPRhd5ks-WjjEJOk_AqFtudwM",
    },
    {
      quote:
        "Djordje stepped in as a full-stack software engineer for our internal tools team and quickly took a product ownership role of the project and made an immediate impact. His end-to-end ownership of our internal app was exactly what we needed. From developing a sophisticated offer management system to building custom property management tools, he consistently delivered solutions that improved our team's efficiency. What impressed me most was his ability to understand complex business requirements and translate them into intuitive user experiences.",
      name: "Laks Srini",
      designation: "CTO, ZeroDown (Acquired by Flyhomes)",
      src: "https://media.licdn.com/dms/image/v2/D5603AQGrknAcOfFewQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728346713809?e=1741824000&v=beta&t=HmpznviPcn_xjZN-pDvdqmX8ZTf6-Wg-rGI-7ZIx7_M",
    },
    {
      quote:
        "Djordje was an absolute pleasure to work with. His work ethic was top-tier, consistently going above and beyond to ensure that every assignment was completed to the highest standard. Djordje is a sharp critical thinker who approaches problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work.",
      name: "Rose Kuan",
      designation: "Senior Product Designer, Coinbase",
      src: "https://media.licdn.com/dms/image/v2/D4E03AQHZCxkLSRRk9A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696544456905?e=1741824000&v=beta&t=Jog917Zkbyp9OFdu_hBTAyHfZRqU4scIy8qKm_QCjjE",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export function InfiniteMovingCardsComponent(): JSX.Element {
  return (
    <div className="max-h-[850px] lg:max-h-[750px] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        direction="right"
        items={testimonials.map((item) => ({
          ...item,
          image: { src: item.image, height: 800, width: 800 },
        }))}
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Djordje was an absolute pleasure to work with. His work ethic was top-tier, consistently going above and beyond to ensure that every assignment was completed to the highest standard. Djordje is a sharp critical thinker who approaches problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work.",
    name: "Dan Xavier",
    title: "Head of Software, Aii",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQHSSfzYx7m5og/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681566410237?e=1741824000&v=beta&t=vqaXKgfwYZCkC_YoQGWPRhd5ks-WjjEJOk_AqFtudwM",
  },
  {
    quote:
      "Djordje stepped in as a full-stack software engineer for our internal tools team and quickly took a product ownership role of the project and made an immediate impact. His end-to-end ownership of our internal app was exactly what we needed. From developing a sophisticated offer management system to building custom property management tools, he consistently delivered solutions that improved our team's efficiency. What impressed me most was his ability to understand complex business requirements and translate them into intuitive user experiences.",
    name: "Laks Srini",
    title: "CTO, ZeroDown (Acquired by Flyhomes)",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQGrknAcOfFewQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728346713809?e=1741824000&v=beta&t=HmpznviPcn_xjZN-pDvdqmX8ZTf6-Wg-rGI-7ZIx7_M",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Rose Kuan",
    title: "Senior Product Designer, Coinbase",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQHZCxkLSRRk9A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696544456905?e=1741824000&v=beta&t=Jog917Zkbyp9OFdu_hBTAyHfZRqU4scIy8qKm_QCjjE",
  },
];

export function HeroHighlightComponent(): JSX.Element {
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

export function HeroHighlightPortfolio(): JSX.Element {
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

export function HeroHighlightTestimonials(): JSX.Element {
  return (
    <TextSegmentHighlighter
      className="text-3xl my-8 text-left md:relative md:bottom-20 max-w-2xl"
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

export function HeroHighlightServices(): JSX.Element {
  return (
    <TextSegmentHighlighter
      className="text-3xl my-8"
      segments={[
        { text: "We use" },
        { text: "the latest and greatest", highlight: true },
        { text: "modern tools and technologies in our tech stack" },
        { text: "for all of the services we offer" },
        { text: "to build out" },
        { text: "beautiful products", highlight: true },
      ]}
    />
  );
}

export function NavbarComponent(): JSX.Element {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-8" />
    </div>
  );
}

export function AnimatedPin(data: {
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
            <span className="text-slate-500 ">{data.description}</span>
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

function Navbar({ className }: { className?: string }): JSX.Element {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed flex row justify-between items-center inset-x-0 mx-auto z-50 px-14",
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
          <MenuItem active={active} item="Portfolio" setActive={setActive}>
            <div className="text-sm grid grid-cols-2 gap-6 lg:gap-10 p-4">
              <ProductItem
                description="Platform for buying, selling, and storing crypto."
                href="https://www.coinbase.com/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%209.50.20%20PM.png"
                title="Coinbase"
              />
              <ProductItem
                description="Platform for blockchain-based games and digital collectibles."
                href="https://www.dapperlabs.com/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.00.39%20PM.png"
                title="Dapper Labs"
              />
              <ProductItem
                description="Funds and scales industry proven solutions to reduce carbon emissions."
                href="https://apparelimpact.org/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.07.45%20PM.png"
                title="Aii"
              />
              <ProductItem
                description="User attribution and growth platform for Web3"
                href="https://www.spindl.xyz/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.15.48%20PM.png"
                title="Spindl"
              />
              <ProductItem
                description="Background screening and verification platform"
                href="https://certn.co/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.11.12%20PM.png"
                title="Certn"
              />
              <ProductItem
                description="Virtual assistants for founders, investors, and leaders"
                href="https://www.athena.com/"
                src="https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.14.10%20PM.png"
                title="Athena"
              />
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

const portfolio = [
  {
    title: "Coinbase",
    description:
      "Developed the frontend for Onchain Summer's (OCS) NFT marketplace; OCS drove nearly 500,000 transactions across 400,000 unique wallets, generating over 200 ETH in volume",
    href: "https://www.coinbase.com/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%209.50.20%20PM.png",
  },
  {
    title: "Dapper Labs",
    description:
      "Helped develop a design system for Dapper Labs that would be used accross their sportds product line (NBA Top Shot, NFL All Day, etc)",
    href: "https://www.dapperlabs.com/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.00.39%20PM.png",
  },
  {
    title: "Apparel Impact Institute",
    description:
      "Developed a custom customer facing dashboard for Aii to track and help reduce the environmental impact of apparel production in additon to a data ingestion pipeline",
    href: "https://apparelimpact.org/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.07.45%20PM.png",
  },
  {
    title: "Certn",
    description:
      "Developed custom  frontend for Certn's internal tools and dashboards, as well as the customer-facing background check products",
    href: "https://certn.co/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.11.12%20PM.png",
  },
  {
    title: "Athena",
    description:
      "Developed Athena’s initial custom playbook system and collaborated with the team to build out their marketing website rebrand",
    href: "https://www.athena.com/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.14.10%20PM.png",
  },
  {
    title: "Spindl",
    description:
      "Developed and implemented a custom dashboard and user attribution platform for Spindl, enabling real-time tracking and visualization of key business metrics and user behavior.",
    href: "https://www.spindl.xyz/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.15.48%20PM.png",
  },
  {
    title: "Delphia",
    description:
      "Collaborated with Delphia's CEO to design and develop the company's homepage, ensuring effective communication of the brand's core message and value proposition.",
    href: "https://delphia.com/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.19.08%20PM.png",
  },
  {
    title: "ZeroDown (Acquired by Flyhomes)",
    description:
      "Helped build out ZeroDown's internal tools including their offer tracking system, property management tools, lead search and filter dashboard, and more",
    href: "https://zerodown.com/",
    image:
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-08%20at%2010.20.38%20PM.png",
  },
];

export default function Page(): JSX.Element {
  return (
    <main className="px-8">
      <div className="hidden md:block">
        <NavbarComponent />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
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
      <DotBackground>
        <div className="flex flex-col gap-4 items-center justify-start">
          <HeroHighlightPortfolio />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 z-10">
            {portfolio.map((item) => (
              <div className="w-full" key={item.title}>
                <AnimatedPin {...item} />
              </div>
            ))}
          </div>
        </div>
      </DotBackground>
      <DotBackground>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-start pt-24">
          <HeroHighlightTestimonials />
          <AnimatedTestimonialsDemo />
        </div>
      </DotBackground>
    </main>
  );
}
