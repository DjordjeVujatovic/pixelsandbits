/* Approved copy, verbatim from the design handoff and the conversion
   review's rewritten-copy appendix. Do not reword. */

/* The spine — the one enumeration of the offering, verbatim wherever
   the phases appear (hero, services, process, FAQ, engagement chips).
   "AI deployment" is not a phase; AI is carried by the headline. */
export const PIPELINE_STEPS = ["Scoping", "Design", "Build", "Handover"];

/* Every conversion CTA on both pages reads the same. */
export const CTA_LABEL = "send us the problem";

export interface Offer {
  tab: string;
  kicker: string;
  title: string;
  body: string;
  points: [string, string, string][];
}

/* Tab order and labels follow the spine; each pane keeps its own
   descriptive copy. The forward-deployed pane carries the Handover
   phase — leaving the team faster is the finish line of the work. */
export const OFFERS: Offer[] = [
  {
    tab: "scoping",
    kicker: "SCOPING",
    title: "The cheapest decision is what not to build.",
    body: "We turn your team's intuition of \"we should use AI here\" into a measurable, executable and well-defined project scope. Most engagements start with a scoping week — we map the workflow, talk to the people inside it, and come back with the smallest thing worth building, plus an honest read on what to cut.",
    points: [
      ["01", "A scoping week, not a discovery phase", "Five days on site, ending in a written scope and a number. Not a two-month audit."],
      ["02", "Talk to the people doing the work", "The workflow on the slide and the workflow in the building are different documents. We design against the second."],
      ["03", "Success defined in numbers", "Before anything gets built we agree what would make this worth having, in terms you can measure later."],
      ["04", "We'll tell you not to build it", "If the problem is process rather than software, that is the finding — and it is cheaper than a prototype."],
    ],
  },
  {
    tab: "design",
    kicker: "PRODUCT DESIGN",
    title: "Design that survives contact with the engineering team.",
    body: "We can take your ideas from wireframes to high-fidelity designs and working prototypes you can experience. We design as the people who will build it — against real constraints: data you actually have, latency you actually pay, deadlines you actually hold.",
    points: [
      ["01", "Flows before pixels", "The argument is about what happens, in what order, for whom. Visual design comes after that is settled."],
      ["02", "Prototypes people can click", "Working prototypes rather than static screens, so feedback is about the product and not the picture."],
      ["03", "Systems, not screens", "Tokens and components a team can extend — the same work that shipped across the Dapper Labs sports line."],
      ["04", "Drawn in the browser", "Design decisions get checked in real type, real data and real widths, not a 1440 artboard."],
    ],
  },
  {
    tab: "build",
    kicker: "PRODUCT ENGINEERING",
    title: "Ship the whole thing, then keep it shippable.",
    body: "We use the most modern tech stack and agentic engineering approaches to efficiently and effectively build and deliver your projects. Full-stack, from data model to interface, on products that took real traffic — 1.4M transactions in a single day at the peak of a Coinbase campaign.",
    points: [
      ["01", "One team, front to back", "React and Next.js on the front, real services and data behind it. No handoff seam to lose things in."],
      ["02", "Deploy from week one", "A working environment before there is a product, so progress is visible and integration risk lands early."],
      ["03", "Performance is a feature", "Measured, budgeted and defended — the reason the campaign work held up at peak."],
      ["04", "Documented as we go", "Tests, CI and written decisions, so the codebase outlives the engagement."],
    ],
  },
  {
    tab: "handover",
    kicker: "FORWARD DEPLOYED ENGINEERING",
    title: "Most teams can build with an LLM. Few can land one inside a real business.",
    body: "We always deliver the highest-quality product, well documented and easy for your team to continue to iterate on. Two years as forward deployed engineers — at Decagon AI and Scotts Miracle-Gro — sitting with the customer and turning a demo into something their staff actually uses.",
    points: [
      ["01", "On site, not over email", "We watch the work happen and design against what people really do, not the process on the slide."],
      ["02", "Evals before opinions", "Prompts, retrieval and agent flows measured against real transcripts, so quality is a number the team can argue with."],
      ["03", "Integration is the hard part", "Auth, data access, legacy systems, rollout. We ship through the plumbing rather than around it."],
      ["04", "The team is faster after we leave", "Documentation, handover, and a working pattern in-house engineers can extend without us."],
    ],
  },
];

/* FAQ accordion rows (FAQ_accordion.md). `a` is the full answer for
   the FAQPage JSON-LD; aPre/aEm/aPost assemble the same string in the
   markup so the <b> emphasis never passes through an interpolation.
   The flag/ms are terminal metadata; the source line is a real link —
   the old `sources` chips implied a retrieval system that doesn't
   exist. Row 3 (--cost) opens on load. */
export interface AskItem {
  q: string;
  a: string;
  aPre: string;
  aEm?: string;
  aPost?: string;
  flag: string;
  ms: string;
  src: { label: string; href: string };
}

export const ASK_QA: AskItem[] = [
  {
    q: "What do you actually do?",
    a: "We take a product from the first sketch to something running in production — scoping, design, build and handover, done by the same team.",
    aPre: "We take a product from the first sketch to something running in production — scoping, design, build and handover, done by the same team.",
    flag: "--scope",
    ms: "18ms",
    src: { label: "./services", href: "#services" },
  },
  {
    q: "How do you get an LLM into production?",
    a: "On site with the people who will use it. We map the real workflow, wire evals to production transcripts so quality is a number, then do the unglamorous integration work — auth, data access, legacy systems — until it ships and holds up.",
    aPre: "On site with the people who will use it. We map the real workflow, wire evals to production transcripts so quality is a number, then do the unglamorous integration work — auth, data access, legacy systems — until it ships and holds up.",
    flag: "--llm",
    ms: "24ms",
    src: { label: "./process", href: "#process" },
  },
  {
    q: "What does an engagement cost?",
    a: "Fixed-price sprints or a monthly retainer, quoted after a scoping week once we know what we're actually building. No number before we understand the problem.",
    aPre: "Fixed-price sprints or a monthly retainer, quoted after a scoping week once we know what we're actually building. ",
    aEm: "No number before we understand the problem",
    aPost: ".",
    flag: "--cost",
    ms: "21ms",
    src: { label: "./process", href: "#process" },
  },
  {
    q: "Why hire you over an agency?",
    a: "You get one team across the whole arc instead of a handoff chain, and engineers who have sat inside customer orgs shipping AI, not a deck about it. When we leave, your team can extend the work without us.",
    aPre: "You get one team across the whole arc instead of a handoff chain, and engineers who have sat inside customer orgs shipping AI, not a deck about it. When we leave, your team can extend the work without us.",
    flag: "--vs-agency",
    ms: "19ms",
    src: { label: "./work", href: "#work" },
  },
  {
    q: "How fast can you start?",
    a: "Usually within two weeks, and a scoping week is the first thing on the calendar. Send us what you're building and we'll tell you honestly whether we're the right fit before anyone signs anything.",
    aPre: "Usually within two weeks, and a scoping week is the first thing on the calendar. Send us what you're building and we'll tell you honestly whether we're the right fit before anyone signs anything.",
    flag: "--start",
    ms: "17ms",
    src: { label: "./contact", href: "/contact" },
  },
];

/* Cases 06–10 (PORTFOLIO_one_at_a_time.md — copy from the client).
   These replaced the ALSO_SHIPPED list; there is no tiering between
   "case studies" and "also shipped" any more. Quotes are split into
   pre/em/mid/em2/post so the emphasis markup is assembled in the
   template — <em> inside an interpolation escapes and renders as
   literal tag text. Cyan is reserved for these quote blocks. */
export interface CaseQuote {
  pre: string;
  em: string;
  mid: string;
  em2: string;
  post: string;
  name: string;
  role: string;
}

export const EXTRA_CASES: {
  num: string;
  /* Plain phrasing — the heading's aria-label; the visual heading is
     the mono path. */
  title: string;
  path: { co: string; role: string };
  tag?: string;
  link?: { label: string; href: string };
  blurb: string;
  bullets?: string[];
  stats?: { figure: string; caption: string; lime?: boolean }[];
  detail?: string;
  quote?: CaseQuote;
}[] = [
  {
    num: "CASE_06",
    title: "ZeroDown — internal tools",
    path: { co: "zerodown", role: "internal-tools" },
    tag: "ACQUIRED BY FLYHOMES",
    link: { label: "zerodown.com →", href: "https://zerodown.com" },
    blurb:
      "Product owner of internal tools: product management, UX/UI design and frontend engineering across four shipped tools.",
    detail: "React, GraphQL, Apollo and Ant Design across all four.",
    bullets: [
      "IC memo tool automating Investment Committee memos per offer, an order of magnitude productivity gain for the PM",
      "Offer process tool that moved status updates from phone calls into the web app, covering every state of an offer",
      "Lead search dashboard with 10 to 15 backend filters (Python, GraphQL, SQLAlchemy) for sales and marketing",
      "Property management dashboard for 50+ company-owned properties, monthly payments and repair scheduling",
    ],
    stats: [
      { figure: "4 tools", caption: "shipped, owned end to end" },
      { figure: "10×", caption: "productivity gains on memos and lead search", lime: true },
      { figure: "50+", caption: "properties managed in one dashboard" },
    ],
    quote: {
      pre: "“The team stepped in as full-stack engineers for our internal tools team, quickly took a ",
      em: "product ownership",
      mid: " role and made an immediate impact. What impressed me most was their ability to understand ",
      em2: "complex business requirements",
      post: " and translate them into intuitive user experiences.”",
      name: "Laks Srini",
      role: "CTO, ZeroDown",
    },
  },
  {
    num: "CASE_07",
    title: "Apparel Impact Institute — climate data platform",
    path: { co: "apparel-impact-institute", role: "climate-data" },
    tag: "NONPROFIT",
    link: { label: "apparelimpact.org →", href: "https://apparelimpact.org" },
    blurb:
      "A full-stack dashboard apparel brands use to gauge environmental impact by tracking carbon emissions from their factories.",
    stats: [
      { figure: "Nike, Lululemon, New Balance", caption: "brands using the platform" },
      { figure: "exact CO₂e", caption: "totals reconcile to the decimal against Excel", lime: true },
    ],
    detail:
      "The hard part was ingestion: workbooks drifted from the template, so we built a deterministic Node.js/GraphQL engine that transposes heterogeneous multi-tab Excel files into a relational schema with no loss of numeric precision. Every failure became a failing unit test until a 50-file corpus ingested cleanly.",
    quote: {
      pre: "“They were an absolute pleasure to work with. Their work ethic was ",
      em: "top-tier",
      mid: ", consistently going above and beyond. They are ",
      em2: "sharp critical thinkers",
      post: " who approach problems thoughtfully, finding creative and effective solutions, rather than just mindlessly completing assigned work.”",
      name: "Dan Xavier",
      role: "Head of Software, Apparel Impact Institute",
    },
  },
  {
    num: "CASE_08",
    title: "Spindl — web3 attribution dashboard",
    path: { co: "spindl", role: "web3-attribution" },
    tag: "ACQUIRED BY COINBASE",
    link: { label: "spindl.xyz →", href: "https://spindl.xyz" },
    blurb:
      "The frontend dashboard for Spindl's web3 attribution product, built greenfield from an empty repo.",
    stats: [
      { figure: "0 → 1", caption: "greenfield, from an empty repo" },
      { figure: "Turborepo", caption: "TypeScript and Next.js monorepo" },
      { figure: "CEO + CTO", caption: "worked with directly", lime: true },
    ],
    detail:
      "We owned the technical decisions: NextAuth credentials auth, Recharts for charting, React Hook Form. Designs were limited, so UX calls happened during the build.",
  },
  {
    num: "CASE_09",
    title: "Certn — background check tools",
    path: { co: "certn", role: "background-checks" },
    tag: "IDENTITY VERIFICATION",
    link: { label: "certn.co →", href: "https://certn.co" },
    blurb:
      "Internal tools and dashboards for Certn, an identity verification and background checks company out of Victoria BC.",
    stats: [
      { figure: "US checks", caption: "criminal background checks team" },
      { figure: "CS team", caption: "internal tools and dashboards" },
      { figure: "React", caption: "Redux, AntD, styled-components", lime: true },
    ],
    detail:
      "We were on the US criminal background checks team, building the dashboards their Customer Success team runs on day to day. JavaScript, React, Redux, Ant Design, styled-components.",
  },
  {
    num: "CASE_10",
    title: "Ditto — social list app",
    path: { co: "ditto", role: "social-list-app" },
    tag: "CONSUMER SOCIAL",
    link: { label: "onditto.com/list →", href: "https://onditto.com/list" },
    blurb:
      "Full-stack product engineering on Ditto's React Native social app: lists, comments and the social graph.",
    stats: [
      { figure: "70%", caption: "increase in comment engagement", lime: true },
      { figure: "50%", caption: "increased conversion through the new onboarding flow" },
    ],
    detail:
      "We built the threaded commenting system end to end with optimistic updates and soft deletion, a privacy-first contact sync where names never leave the device, and push notification navigation that restores your exact place instead of stranding you in the wrong tab. GraphQL, Node.js, MongoDB.",
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
    name: "Design",
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
