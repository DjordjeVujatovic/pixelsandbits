/* Approved copy, verbatim from the design handoff and the conversion
   review's rewritten-copy appendix. Do not reword. OFFERS re-approved by
   the owner 2026-10-11: no durations or timelines anywhere in the panes. */

/* The spine — the one enumeration of the offering, verbatim wherever
   the phases appear (hero, services, process, FAQ, engagement chips).
   "AI deployment" is not a phase; AI is carried by the headline. */
export const PIPELINE_STEPS = ["Scoping", "Design", "Build", "Handover"];

/* Every conversion CTA on both pages reads the same. */
export const CTA_LABEL = "get in touch";

export interface Offer {
  tab: string;
  kicker: string;
  title: string;
  body: string;
  points: [string, string, string][];
}

/* Tab order and labels follow the spine; each pane keeps its own
   descriptive copy. The handover pane covers deployment to production
   and the handover itself: leaving the team able to run it is the
   finish line. */
export const OFFERS: Offer[] = [
  {
    tab: "scoping",
    kicker: "SCOPING",
    title: "Know what you are building before you build it.",
    body: "Working with your team to understand the problem, the workflow it lives in and the people it affects, then defining the smallest version worth building and how you will know it worked. You get a clear scope, a plan to deliver it and a candid view of the risks.",
    points: [
      [
        "01",
        "Understand the problem first",
        "The workflow and the people in it come first, so the solution fits how the work is done.",
      ],
      [
        "02",
        "A written scope you can act on",
        "The problem, the proposed solution, what it will take to deliver and how success will be measured, in a document your team owns.",
      ],
      [
        "03",
        "Measurable from the start",
        "Success is defined in numbers before anything is built, so the result is judged on evidence and agents have a measurable target.",
      ],
      [
        "04",
        "Honest about what not to build",
        "If a smaller change, or no software at all, solves the problem, that is the recommendation.",
      ],
    ],
  },
  {
    tab: "design",
    kicker: "PRODUCT DESIGN",
    title: "Design that is ready to be built.",
    body: "Products go from first flows to finished interfaces: research, wireframes, high-fidelity screens and prototypes you can click through. Design and build sit on one team, so every decision is made against real constraints and engineering starts from designs that already work.",
    points: [
      [
        "01",
        "Flows before visuals",
        "What happens, in what order and for whom is settled before any visual design.",
      ],
      [
        "02",
        "Prototypes you can click",
        "Working prototypes, so your team and your users give feedback on how the product behaves.",
      ],
      [
        "03",
        "Design systems",
        "Tokens and components that keep new screens consistent whether an engineer or an agent builds them, as built for Dapper Labs across their sports products.",
      ],
      [
        "04",
        "Agent-first by default",
        "Design systems are structured for agents from day one: named tokens, components with documented props and states, and written rules for layout and behaviour. Approved designs turn into working code quickly.",
      ],
    ],
  },
  {
    tab: "build",
    kicker: "PRODUCT ENGINEERING",
    title: "Production-grade software that agents can ship in safely.",
    body: "Complete products, from data model and services to APIs and interface, with no handoffs in between. Every codebase is built agent-first from the first commit: rules files that spell out its conventions, skills and commands for the jobs that repeat, and hooks that run tests and checks on every change an agent makes. Your coding agents get the context to move fast and the guardrails to keep from breaking what works. Engineered for the load you will see.",
    points: [
      [
        "01",
        "Owned end to end",
        "React and Next.js on the front, real services and data behind it, all built by the same engineers.",
      ],
      [
        "02",
        "Always deployable",
        "A live environment from the first commit, so every change, from an engineer or an agent, lands somewhere real.",
      ],
      [
        "03",
        "Performance built in",
        "Performance is measured against a budget throughout.",
      ],
      [
        "04",
        "Agent-first codebases",
        "Every repo ships with rules files, skills, commands and hooks, so coding agents know the conventions, run the right checks on every change and work against tests and CI rather than guesswork. The same discipline cut ClassDojo's flaky tests by 70%.",
      ],
    ],
  },
  {
    tab: "handover",
    kicker: "DEPLOYMENT AND HANDOVER",
    title: "Your team and your agents keep shipping.",
    body: "The product goes to production with the guardrails to keep shipping in it: tests, CI and written decisions your team and its agents can work within. Handover also leaves a documented codebase and working patterns your team can carry forward.",
    points: [
      [
        "01",
        "Live in your stack",
        "Auth, data access, legacy systems and rollout are part of the build, so the product goes live inside the systems you already run.",
      ],
      [
        "02",
        "Quality you can measure",
        "Quality is evaluated against real data, with tests and evals that engineers and agents can keep running after handover.",
      ],
      [
        "03",
        "Documented for the next engineer or agent",
        "Documentation, written decisions and knowledge transfer, so the engineers and agents that inherit the codebase can pick it up.",
      ],
      [
        "04",
        "A pattern your team can extend",
        "A working pattern your in-house engineers can extend.",
      ],
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
    q: "What do you do?",
    a: "Product engineering with a specialization in shipping AI products end to end.",
    aPre: "Product engineering with a specialization in shipping AI products end to end.",
    flag: "--scope",
    ms: "18ms",
    src: { label: "./services", href: "#services" },
  },
  {
    q: "How do you approach an AI project?",
    a: "Start with the people who will use it, not the model. Map the workflow they actually run, build evals from real transcripts so quality is a score instead of a hunch, then do the unglamorous part: auth, data access, legacy systems.",
    aPre: "Start with the people who will use it, not the model. Map the workflow they actually run, build evals from real transcripts so quality is a score instead of a hunch, then do the unglamorous part: auth, data access, legacy systems.",
    flag: "--approach",
    ms: "24ms",
    src: { label: "./process", href: "#process" },
  },
  {
    q: "What does an engagement cost?",
    a: "Fixed-price sprints or a monthly retainer. The number comes after a scoping week, once the work is defined. Any quote before that is a guess.",
    aPre: "Fixed-price sprints or a monthly retainer. The number comes after a scoping week, once the work is defined. Any quote before that is a guess.",
    flag: "--cost",
    ms: "21ms",
    src: { label: "./process", href: "#process" },
  },
  {
    q: "How fast can you start?",
    a: "Usually within two weeks, depending on capacity. Every engagement starts with a scoping week.",
    aPre: "Usually within two weeks, depending on capacity. Every engagement starts with a scoping week.",
    flag: "--start",
    ms: "17ms",
    src: { label: "./contact", href: "/contact" },
  },
];

/* Clients 06–10 (PORTFOLIO_one_at_a_time.md — copy from the client).
   These replaced the ALSO_SHIPPED list; there is no tiering between
   featured and "also shipped" clients any more. Quotes are split into
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
  /* rendered as the chip band along the card's foot */
  stack?: string[];
  quote?: CaseQuote;
}[] = [
  {
    num: "CLIENT_11",
    title: "Ditto — social list app",
    path: { co: "ditto", role: "social-list-app" },
    tag: "CONSUMER SOCIAL",
    link: { label: "onditto.com/list →", href: "https://onditto.com/list" },
    blurb:
      "Ditto's React Native social app: lists, comments and the social graph.",
    stats: [
      { figure: "70%", caption: "increase in comment engagement", lime: true },
      {
        figure: "50%",
        caption: "higher conversion from the new onboarding flow",
      },
    ],
    bullets: [
      "Threaded comments: replies nested two levels deep, optimistic updates, soft deletion that keeps a placeholder when replies remain, and a read-only list preview that opens into a full reply drawer",
      "Recent mentions: up to ten recently tagged people appear the moment a user types @, cached per user in AsyncStorage and handed off to search on the next keystroke",
      "Contact sync and friend discovery: a consent-led flow, a full-list sync with contact names removed from the schema, five suggestion states and batched notifications when a contact joins",
      "Notification navigation: the current stack is saved before a notification opens, so Back returns to where the user was, including deep settings screens and in-progress creation flows",
    ],
    stack: ["React Native", "GraphQL", "Node.js", "MongoDB"],
  },
  {
    num: "CLIENT_07",
    title: "ZeroDown — internal tools",
    path: { co: "zerodown", role: "internal-tools" },
    tag: "ACQUIRED BY FLYHOMES",
    link: { label: "zerodown.com →", href: "https://zerodown.com" },
    blurb:
      "Four internal tools shipped for ZeroDown: investment memos, offer tracking, lead search and property management.",
    stack: ["React", "GraphQL", "Apollo", "Ant Design"],
    bullets: [
      "IC memo tool: turns the data already in the Flask backend into an Investment Committee memo for each offer, an order of magnitude productivity gain for the PM",
      "Offer process tool: moved status updates from phone calls into a web app, with every state of an offer managed in one place",
      "Lead search dashboard: 10 to 15 filters and search for sales and marketing, backed by Python, GraphQL and SQLAlchemy filters, so lead metrics can be quantified",
      "Property management dashboard: 50+ company-owned properties, with property stats, monthly payments and repair setup",
    ],
    stats: [
      {
        figure: "10×",
        caption: "productivity gains on memos and lead search",
        lime: true,
      },
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
    num: "CLIENT_08",
    title: "Apparel Impact Institute — climate data platform",
    path: { co: "apparel-impact-institute", role: "climate-data" },
    tag: "NONPROFIT",
    link: { label: "apparelimpact.org →", href: "https://apparelimpact.org" },
    blurb:
      "The Climate Solutions Portfolio: a platform where apparel brands find climate solutions for their factories and track the cost, savings and carbon impact of each one, taken from discovery through design to build.",
    stats: [
      {
        figure: "Nike, Lululemon, New Balance",
        caption: "brands using the platform",
      },
      {
        figure: "exact CO₂e",
        caption: "totals reconcile to the decimal against Excel",
        lime: true,
      },
    ],
    bullets: [
      "Discovery to build: research and design ran as a double diamond across three user groups: brands, solution providers and the Aii team",
      "Solutions search: a searchable repository of climate solutions brands can fund in their factories",
      "Brand analytics: spreadsheet calculations replaced by a dashboard of cost per tCO₂e, annual savings, payback period and a breakdown of brand and facility investment",
      "Ingestion engine: a deterministic Node.js/GraphQL engine transposes multi-tab Excel workbooks into a relational schema with no loss of numeric precision, even as workbooks drifted from the template",
      "Hardening: every failure became a failing unit test until a 50-file corpus ingested cleanly",
    ],
    stack: [
      "Nx",
      "TypeScript",
      "MobX",
      "Mantine",
      "Netlify",
      "Fastify",
      "Pothos",
      "Google Cloud Run",
      "PostgreSQL",
      "Sequelize",
      "Cloud SQL",
      "CircleCI",
      "Cypress",
      "Stytch",
      "Sentry",
      "SendGrid",
    ],
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
    num: "CLIENT_09",
    title: "Spindl — web3 attribution dashboard",
    path: { co: "spindl", role: "web3-attribution" },
    tag: "ACQUIRED BY COINBASE",
    link: { label: "spindl.xyz →", href: "https://spindl.xyz" },
    blurb:
      "The frontend codebase and customer-facing analytics dashboard for Spindl's web3 attribution platform, built greenfield from an empty repo.",
    bullets: [
      "Customer dashboard: key business metrics and user behavior, tracked and visualized in real time",
      "Forms and CRUD: pages across the app, built on React Hook Form and React Select",
      "Auth: credentials-based sign-in through NextAuth on JWT",
    ],
    stack: ["TypeScript", "Next.js", "Turborepo", "NextAuth", "Recharts"],
  },
  {
    num: "CLIENT_10",
    title: "Certn — background check tools",
    path: { co: "certn", role: "background-checks" },
    tag: "IDENTITY VERIFICATION",
    link: { label: "certn.co →", href: "https://certn.co" },
    blurb:
      "The frontend for Certn's internal tools and dashboards and for its customer-facing background check products. Certn is an identity verification and background checks company out of Victoria BC.",
    bullets: [
      "Customer Success dashboards: the internal tools Certn's Customer Success team runs day to day to track and manage US criminal background checks for its clients",
      "Customer-facing products: the frontend for the background check products Certn's customers use to order checks and review the results",
    ],
    stack: ["JavaScript", "React", "Redux", "Ant Design", "styled-components"],
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
    deliverable: {
      tag: "scoping",
      text: "A written scope document with a quote and timeline",
    },
  },
  {
    num: "02",
    name: "Design",
    steps: ["wireframe", "hi-fi", "prototype"],
    span: 2,
    col: [3, 5],
    segs: [2, 3],
    pre: true,
    body: "Something clickable in front of real users before a line of production code.",
    deliverable: {
      tag: "prototype",
      text: "A high-fidelity prototype you can test",
    },
  },
  {
    num: "03",
    name: "Build",
    steps: ["build", "integrate", "eval", "deploy"],
    span: 4,
    col: [4, 8],
    segs: [3, 4, 5, 6],
    pre: false,
    body: "Full-stack delivery with a working deploy from the first commit.",
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
    body: "Docs, patterns and a team that can extend the work on its own.",
    deliverable: {
      tag: "handover",
      text: "Handover documents and code your team can extend",
    },
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
export const CONTACT_TIMELINES = [
  "ASAP",
  "1–3 months",
  "This quarter",
  "Just exploring",
];
export const CONTACT_LOG: [string, string][] = [
  ["→", "validating fields"],
  ["→", "routing to the team"],
  ["→", "no auto-responder, a human takes it from here"],
  ["✓", "sent · reply within 2 business days"],
];
