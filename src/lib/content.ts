/* Approved copy, verbatim from the design handoff. Do not reword. */

export const PIPELINE_STEPS = ["ideation", "design", "engineering", "deployment"];

export interface Offer {
  tab: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  points: [string, string, string][];
}

/* Tab order matches the handoff tab bar; pane content keyed per tab. */
export const OFFERS: Offer[] = [
  {
    tab: "forward deployed",
    kicker: "FORWARD DEPLOYED ENGINEERING",
    title: "Most teams can build with an LLM. Few can land one inside a real business.",
    body: "Two years as forward deployed engineers — at Decagon AI and Scotts Miracle-Gro — sitting with the customer, learning the workflow, and turning a demo into something their staff actually uses.",
    cta: "get in touch",
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
    cta: "get in touch",
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
    cta: "get in touch",
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
    cta: "get in touch",
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

export const ALSO_SHIPPED: { name: string; desc: string; href: string }[] = [
  {
    name: "Athena",
    desc: "Their initial playbook system, plus the marketing site rebrand with the in-house team.",
    href: "https://www.athena.com/",
  },
  {
    name: "Apparel Impact",
    desc: "Customer-facing impact dashboard and the ingestion pipeline feeding it.",
    href: "https://apparelimpact.org/",
  },
  {
    name: "Certn",
    desc: "Internal tooling, dashboards and the customer-facing background check product.",
    href: "https://certn.co/",
  },
  {
    name: "Spindl",
    desc: "Attribution dashboard with real-time tracking of key metrics. Acquired by Coinbase.",
    href: "https://www.spindl.xyz/",
  },
  {
    name: "Delphia",
    desc: "Homepage designed and built directly with the CEO, around the company's core message.",
    href: "https://delphia.com/",
  },
  {
    name: "ZeroDown",
    desc: "Offer tracking, property management and lead search tools. Acquired by Flyhomes.",
    href: "https://zerodown.com/",
  },
];

export const PHASES: {
  num: string;
  week: string;
  title: string;
  body: string;
  tags: string[];
}[] = [
  {
    num: "01",
    week: "week 01",
    title: "Scoping",
    body: "Workflows mapped on site with the people who do the work, and success defined in numbers.",
    tags: ["on-site", "interviews", "success metrics"],
  },
  {
    num: "02",
    week: "week 02",
    title: "Prototype",
    body: "Something clickable in front of real users, not stakeholders, before a line of production code.",
    tags: ["flows", "prototype", "user tests"],
  },
  {
    num: "03",
    week: "week 03–06",
    title: "Build",
    body: "Full-stack delivery with a working deploy from the first week, so nothing lands as a surprise.",
    tags: ["react/next", "services", "ci"],
  },
  {
    num: "04",
    week: "close",
    title: "Handover",
    body: "Docs, patterns and a team that can extend the work without us on the payroll.",
    tags: ["docs", "pairing", "handover"],
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
