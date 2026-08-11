/* Approved copy, verbatim from the design handoff and the conversion
   review's rewritten-copy appendix. Do not reword. */

export const PIPELINE_STEPS = ["ideation", "design", "engineering", "deployment"];

/* One rolling availability string, shared by the hero ribbon, the nav
   drawer, the contact page and the form confirmation — so the four can
   never contradict each other and nothing says "q3" in November. */
export const AVAILABILITY = "next engagement starts in ~3 weeks";

/* Every conversion CTA on both pages reads the same. */
export const CTA_LABEL = "send us the problem";

/* The four service outcomes, readable without touching the tabs. */
export const SERVICE_OUTCOMES: { label: string; line: string }[] = [
  {
    label: "Forward deployed",
    line: "We sit with your team until the thing is live in their hands.",
  },
  {
    label: "Zero to scoped",
    line: 'A week on site turns "we should use AI here" into a measurable brief.',
  },
  {
    label: "Product design",
    line: "Interfaces for agent products, tested on operators before code.",
  },
  {
    label: "Full-stack build",
    line: "React/Next, services, CI and evals, deployed from week one.",
  },
];

export interface Offer {
  tab: string;
  kicker: string;
  title: string;
  body: string;
  points: [string, string, string][];
}

/* Tab order matches the handoff tab bar; pane content keyed per tab. */
export const OFFERS: Offer[] = [
  {
    tab: "forward deployed",
    kicker: "FORWARD DEPLOYED ENGINEERING",
    title: "Most teams can build with an LLM. Few can land one inside a real business.",
    body: "Two years as forward deployed engineers — at Decagon AI and Scotts Miracle-Gro — sitting with the customer, learning the workflow, and turning a demo into something their staff actually uses.",
    points: [
      ["01", "On site, not over email", "We watch the work happen and design against what people really do, not the process on the slide."],
      ["02", "Evals before opinions", "Prompts, retrieval and agent flows measured against real transcripts, so quality is a number the team can argue with."],
      ["03", "Integration is the hard part", "Auth, data access, legacy systems, rollout. We ship through the plumbing rather than around it."],
      ["04", "We leave the team faster", "Documentation, handover, and a working pattern in-house engineers can extend without us."],
    ],
  },
  {
    tab: "product ideation",
    kicker: "PRODUCT IDEATION",
    title: "The cheapest decision is what not to build.",
    body: "Most engagements start with a scoping week. We map the workflow, talk to the people inside it, and come back with the smallest thing worth building — plus an honest read on what to cut.",
    points: [
      ["01", "A scoping week, not a discovery phase", "Five days on site, ending in a written scope and a number. Not a two-month audit."],
      ["02", "Talk to the people doing the work", "The workflow on the slide and the workflow in the building are different documents. We design against the second."],
      ["03", "Success defined in numbers", "Before anything gets built we agree what would make this worth having, in terms you can measure later."],
      ["04", "We will tell you not to build it", "If the problem is process rather than software, that is the finding — and it is cheaper than a prototype."],
    ],
  },
  {
    tab: "product design",
    kicker: "PRODUCT DESIGN",
    title: "Design that survives contact with the engineering team.",
    body: "We design as the people who will build it. Flows, interfaces and systems drawn against real constraints — data you actually have, latency you actually pay, deadlines you actually hold.",
    points: [
      ["01", "Flows before pixels", "The argument is about what happens, in what order, for whom. Visual design comes after that is settled."],
      ["02", "Prototypes people can click", "Working prototypes rather than static screens, so feedback is about the product and not the picture."],
      ["03", "Systems, not screens", "Tokens and components a team can extend — the same work that shipped across the Dapper Labs sports line."],
      ["04", "Drawn in the browser", "Design decisions get checked in real type, real data and real widths, not a 1440 artboard."],
    ],
  },
  {
    tab: "product engineering",
    kicker: "PRODUCT ENGINEERING",
    title: "Ship the whole thing, then keep it shippable.",
    body: "Full-stack delivery from data model to interface. Nine years of it, on products that took real traffic — 500k transactions across a single Coinbase campaign — and on internal tools nobody outside the company ever sees.",
    points: [
      ["01", "One team, front to back", "React and Next.js on the front, real services and data behind it. No handoff seam to lose things in."],
      ["02", "Deploy from week one", "A working environment before there is a product, so progress is visible and integration risk lands early."],
      ["03", "Performance is a feature", "Measured, budgeted and defended — the reason the campaign work held up at peak."],
      ["04", "Documented as we go", "Tests, CI and written decisions, so the codebase outlives the engagement."],
    ],
  },
];

export interface AskItem {
  q: string;
  trace: [string, string, string][];
  a: string;
  cites: [string, string][];
}

export const ASK_QA: AskItem[] = [
  {
    q: "What do you actually do?",
    trace: [
      ["→", "reading ./services", "12ms"],
      ["→", "joining 9 years of engagements", "38ms"],
      ["✓", "answer grounded in 6 case studies", "91ms"],
    ],
    a: "We take a product from the first sketch to something running in production — ideation, design and full-stack engineering, done by the same team. Nine years of it, most recently embedded inside AI companies as forward deployed engineers.",
    cites: [
      ["./services", "#services"],
      ["./work", "#work"],
    ],
  },
  {
    q: "How do you get an LLM into production?",
    trace: [
      ["→", "retrieving fde_playbook.md", "9ms"],
      ["→", "scoring 2 years of deployments", "44ms"],
      ["✓", "evals + integration path resolved", "103ms"],
    ],
    a: "On site with the people who will use it. We map the real workflow, wire evals to production transcripts so quality is a number, then do the unglamorous integration work — auth, data access, legacy systems — until it ships and holds up.",
    cites: [
      ["./ai", "#services"],
      ["./process", "#process"],
    ],
  },
  {
    q: "What does an engagement cost?",
    trace: [
      ["→", "loading engagement models", "11ms"],
      ["✓", "no estimate without scope", "52ms"],
    ],
    a: "Fixed-price sprints or a monthly retainer, quoted after a scoping week once we know what we are actually building. No number before we understand the problem.",
    cites: [
      ["./faq", "#process"],
      ["./process", "#process"],
    ],
  },
  {
    q: "Why hire you over an agency?",
    trace: [
      ["→", "diffing agency vs embedded team", "15ms"],
      ["→", "checking handoff cost", "31ms"],
      ["✓", "one team, no handoff chain", "88ms"],
    ],
    a: "You get one team across the whole arc instead of a handoff chain, and an engineer who has sat inside customer orgs shipping AI, not a deck about it. When we leave, your team can extend the work without us.",
    cites: [
      ["./work", "#work"],
      ["./ai", "#services"],
    ],
  },
  {
    q: "How fast can you start?",
    trace: [
      ["→", "checking calendar", "8ms"],
      ["✓", "next slot resolved", "46ms"],
    ],
    a: "Usually within two weeks, and a scoping week is the first thing on the calendar. Send us what you are building and we will tell you honestly whether we are the right fit before anyone signs anything.",
    cites: [
      ["./contact", "/contact"],
      ["./process", "#process"],
    ],
  },
];

/* Plain text on purpose: six outbound links here leaked visitors
   mid-pitch. Where an outbound link IS the proof (cases 04/05), it stays
   on the case card instead. */
export const ALSO_SHIPPED: { name: string; desc: string }[] = [
  {
    name: "Athena",
    desc: "Their initial playbook system, plus the marketing site rebrand with the in-house team.",
  },
  {
    name: "Apparel Impact",
    desc: "Customer-facing impact dashboard and the ingestion pipeline feeding it.",
  },
  {
    name: "Certn",
    desc: "Internal tooling, dashboards and the customer-facing background check product.",
  },
  {
    name: "Spindl",
    desc: "Attribution dashboard with real-time tracking of key metrics. Acquired by Coinbase.",
  },
  {
    name: "Delphia",
    desc: "Homepage designed and built directly with the CEO, around the company's core message.",
  },
  {
    name: "ZeroDown",
    desc: "Offer tracking, property management and lead search tools. Acquired by Flyhomes.",
  },
];

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

/* Approved copy, verbatim — de-personalised deliberately: the site
   speaks as a team. Placed next to the proof they belong to: the
   ZeroDown quote sits under the ZeroDown row, the second quote sits
   immediately above the closing CTA. */
export const TESTIMONIALS: Testimonial[] = [
  {
    text: '"The team stepped in as full-stack engineers for our internal tools team, quickly took a product ownership role and made an immediate impact. Their end-to-end ownership of our internal app was exactly what we needed. What impressed me most was their ability to understand complex business requirements and translate them into intuitive user experiences."',
    name: "Laks Srini",
    role: "CTO, ZeroDown · acquired by Flyhomes",
  },
  {
    text: '"They were an absolute pleasure to work with. Their work ethic was top-tier, consistently going above and beyond to ensure that every assignment was completed to the highest standard. They are sharp critical thinkers who approach problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work."',
    name: "Dan Xavier",
    role: "Head of Software · Apparel Impact Institute",
  },
];

/* The process schedule (PROCESS_schedule.md). NO fixed durations
   anywhere — the 8 proportion tracks claim the shape, not the calendar.
   col is the desktop grid-column span (of tracks 2–10); segs are the
   1-based mobile segments lit (they mirror col); span drives animation
   duration only. pre = the cyan "before any code exists" voice. */
export const SCHEDULE: {
  num: string;
  name: string;
  steps: string[];
  span: number;
  col: [number, number];
  segs: number[];
  pre: boolean;
  fin?: boolean;
  body: string;
  deliverable: { tag: string; text: string };
}[] = [
  {
    num: "01",
    name: "Scoping",
    steps: ["research", "interview", "scope"],
    span: 2,
    col: [2, 4],
    segs: [1, 2],
    pre: true,
    body: "Workflows mapped on site with the people who do the work, and success defined in numbers.",
    deliverable: { tag: "scoping", text: "A written scope document with a quote and timeline" },
  },
  {
    num: "02",
    name: "Prototype / design",
    steps: ["wireframe", "hi-fi", "prototype"],
    span: 2,
    col: [3, 5],
    segs: [2, 3],
    pre: true,
    body: "Something clickable in front of real users, not stakeholders, before a line of production code.",
    deliverable: { tag: "prototype", text: "A high-fidelity design / prototype that can be tested by you" },
  },
  {
    num: "03",
    name: "Build",
    steps: ["build", "integrate", "eval", "deploy"],
    span: 4,
    col: [4, 8],
    segs: [3, 4, 5, 6],
    pre: false,
    body: "Full-stack delivery with a working deploy from the first week, so nothing lands as a surprise.",
    deliverable: { tag: "build", text: "A deployed production release" },
  },
  {
    num: "04",
    name: "Handover",
    steps: ["document", "pair", "hand over"],
    span: 2,
    col: [8, 10],
    segs: [7, 8],
    pre: false,
    fin: true,
    body: "Docs, patterns and a team that can extend the work without us on the payroll.",
    deliverable: { tag: "handover", text: "Handover documents and code that can be extended upon" },
  },
];

export const CONTACT_KINDS = [
  "New product, 0 → 1",
  "AI / LLM deployment",
  "Design system",
  "Scale an existing product",
  "Something else",
];
export const CONTACT_BUDGETS = ["< $25k", "$25–75k", "$75–150k", "$150k+"];
export const CONTACT_TIMELINES = ["ASAP", "1–3 months", "This quarter", "Just exploring"];
export const CONTACT_LOG: [string, string][] = [
  ["→", "validating fields"],
  ["→", "routing to the team"],
  ["→", "no auto-responder, a human takes it from here"],
  ["✓", "sent · reply within 2 business days"],
];
