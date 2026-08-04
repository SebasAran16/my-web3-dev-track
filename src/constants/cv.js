const sharedName = {
  first: "SEBASTIAN",
  second: "ZAMBRANO",
  third: "ARANGO",
};

const sharedPhoto = "/my-pic.png";

const sharedContact = {
  email: "sebastianarango201316@hotmail.com",
  location: "Barcelona",
  webpage: "https://sebastianarango.com",
  github: "https://github.com/SebasAran16",
};

const sharedLanguages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Advanced" },
  { name: "German", level: "Advanced" },
  { name: "Catalan", level: "Basic" },
];

const sharedSoftSkills = [
  "Proactivity",
  "Empathy",
  "Leadership",
  "Creativity",
  "TeamWork",
  "Tenacity",
  "Optimism",
  "Curiosity",
  "Great learning skills",
  "Client focused",
  "Adaptability",
];

const sharedAdditionalInformation = [
  { label: "Availability", value: "Complete" },
  { label: "Driver License", value: "Yes (Type B)" },
  { label: "Mobility Disposition", value: null },
];

const englishCourse = {
  title: "English Course",
  provider: "English My Way Bogotá, Colombia",
};

const sqlFoundationsCourse = {
  title: "Databases for Developers: Foundations — Certificate of Excellence (95%)",
  provider: "Oracle Dev Gym — Chris Saxon",
};

export const cvWeb3Data = {
  name: sharedName,
  title: "SENIOR WEB3 FULLSTACK DEVELOPER",
  photo: sharedPhoto,
  contact: sharedContact,
  profile:
    "I a mainly a very curious person, that has lead me to develop several skills on my own, and also to improve the treats required to master those skills. I am a very patient person, someone that try to push to be my best every day but that know that the long run is what matters.\n\nMy curiosity lead me to learn all about Blockchain since 2020, and that lead me to in 2022 study Solidity, JavaScript and all what is required for develop, maintain and improve a production application",
  languages: sharedLanguages,
  softSkills: sharedSoftSkills,
  technologicalSkills:
    "Solidity, TypeScript, NextJs, NestJs, Vue, Nuxt, AWS, Docker, MongoDB, MySQL, Redis, BullMQ, LLMs, OpenClaw, Claude.",
  additionalInformation: sharedAdditionalInformation,
  experience: [
    {
      period: "03/08/26 - Current Position",
      role: "Software Engineer",
      location: "Barcelona, España",
      company: "HTEC",
      accomplishments: [],
    },
    {
      period: "06/09/25 - 31/05/26",
      role: "Senior Web3 Fullstack Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Marketing Hub",
          url: "https://ethermail.io/marketing-hub",
          description:
            "Created, maintained and continuously extended a CRM-like marketing tool end-to-end — a Web3-native dashboard for audience management, segmentation and email campaign orchestration. Vue, Nuxt and Nest across the stack.",
        },
        {
          name: "OpenClaw AI Skill",
          url: "https://clawhub.ai/ethersuite/moltmail-ethermail",
          description:
            "Built an OpenClaw skill that gives AI agents full visibility into how EtherMail's services run locally and on remote servers via Docker — used for automated debugging and operational insight.",
        },
        {
          name: "Lean Wallet",
          url: null,
          description:
            "Built end-to-end a standalone Web3 wallet dApp with MetaMask-style UX, chain switching, transaction-rejection flows and EtherMail wallet-provider integration — used as the embeddable wallet across partner products.",
        },
        {
          name: "Email Infrastructure Security",
          url: null,
          description:
            "Hardened the inbound and outbound MTA layer with JWT spoofing prevention, SPF revert logic and multi-domain (moltmail) support — locking down mail at the protocol level for the platform's users.",
        },
      ],
    },
    {
      period: "06/03/24 - 06/09/25",
      role: "Mid Web3 Fullstack Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Tx-Ray",
          url: "https://ethermail.io/eaaw",
          description:
            "Scalable backend service that decodes EVM transactions on the fly and presents them in a user-friendly way through email — built end-to-end across BE and FE.",
        },
        {
          name: "EMT Strategy",
          url: "https://ethermail.io/emt/pools/",
          description:
            "Development of the EMT Token together with two strategy contracts: a recurring user pool and an investor cliff vesting contract.",
        },
        {
          name: "Email-Airdrops",
          url: "https://ethermail.io/reward-emails",
          description:
            "Development of FE, BE & EVM Smart Contracts to send ERC20 and ERC721 tokens via email — full integration into the platform's product surface.",
        },
        {
          name: "Token Staking Contract",
          url: null,
          description:
            "Strategized and owned a multi-tenant staking system from scratch — Solidity contracts built on top of OpenZeppelin with deposit/withdrawal flows, min/max constraints, multi-tenant isolation and Foundry invariant tests for formal verification.",
        },
        {
          name: "EtherMail Wallet Provider",
          url: null,
          description:
            "Built and maintained a published Wagmi + viem connector library with EIP-1559 support, MetaMask-style UX, chain switching and provider error recovery — used by every partner integrating EtherMail wallets.",
        },
        {
          name: "Login & Subscribe Widgets",
          url: null,
          description:
            "Built iframe-embeddable login (mobile autologin, visibility controls) and subscribe widgets (Web3 ID conditional logic) — drop-in components partners install in minutes.",
        },
      ],
    },
    {
      period: "06/03/23 - 06/03/24",
      role: "Web3 Fullstack Intern Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Smart Contract Monitoring",
          url: "https://ethermail.io/engagement-booster",
          description:
            "Designed and implemented from scratch a backend system to ingest and monitor on-chain Smart Contract events in real time, with DB schema design and sustainable-code focus.",
        },
      ],
    },
    {
      period: "2023",
      role: "Web3 Developer / Teacher",
      location: "Barcelona, España",
      company: "Fiverr",
      accomplishments: [
        {
          name: "Client Work & Teaching",
          url: null,
          description:
            "Built smart contracts and dApp frontends end-to-end for diverse clients, and taught Solidity foundations and Web3 development workflows to early developers.",
        },
      ],
    },
  ],
  education: [],
  additionalCourses: [
    {
      title:
        "Blockchain, Solidity, and Full Stack Web3 Development with JavaScript (32 hours raw video course) - 100 hours",
      provider: "FreeCodeCamp, Chainlink - Patrick Collins",
    },
    {
      title: "Solidity Vulnerabilities Avoidance",
      provider: "Ethernaut, OpenZeppelin/DamnVulnerableDefi",
    },
    {
      title: "Ethereum DevBootcamp - 7 Weeks",
      provider: "Alchemy University",
    },
    {
      title: "JavaScript Fundamentals - 3 Weeks",
      provider: "Alchemy University",
    },
    {
      title: "TypeScript - TypeScript full tutorials / documentation",
      provider: "FreeCodeCamp / Documentation",
    },
    sqlFoundationsCourse,
    {
      title: "Fundamentals on Digital Marketing (40 hours) Ended 2020",
      provider: "Barcelona, Spain Google Activate",
    },
    englishCourse,
  ],
};

export const cvFullstackData = {
  name: sharedName,
  title: "SENIOR FULLSTACK DEVELOPER",
  photo: sharedPhoto,
  contact: sharedContact,
  profile:
    "I am a curious, patient developer who pushes himself to improve every day, while knowing that the long run is what matters. That curiosity has led me to build production fullstack systems end-to-end across frontend, backend and infrastructure.\n\nI focus on shipping features that scale and stay maintainable — from product UIs with Vue, Nuxt and React, to scalable backends with Nest and Node, data layers across MySQL, MongoDB and Redis, and email and AI-agent infrastructure on AWS.",
  languages: sharedLanguages,
  softSkills: sharedSoftSkills,
  technologicalSkills:
    "TypeScript, JavaScript, Vue, Nuxt, NestJs, NextJs, Node, MongoDB, MySQL, Redis, Docker, AWS, BullMQ, IMAP, SMTP, Event Sourcing, LLMs, OpenClaw, Claude.",
  additionalInformation: sharedAdditionalInformation,
  experience: [
    {
      period: "03/08/26 - Current Position",
      role: "Software Engineer",
      location: "Barcelona, España",
      company: "HTEC",
      accomplishments: [],
    },
    {
      period: "06/09/25 - 31/05/26",
      role: "Senior Fullstack Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Data Pipelines at Scale",
          url: null,
          description:
            "Processed 100M+ rows leveraging Redis, MySQL, MongoDB and event-sourcing patterns to keep platform reads and writes fast and reliable.",
        },
        {
          name: "Async Workers & Queues",
          url: null,
          description:
            "Designed and built worker pipelines with BullMQ for high-throughput background jobs and asynchronous processing across the platform.",
        },
        {
          name: "OpenClaw AI Skill",
          url: "https://clawhub.ai/ethersuite/moltmail-ethermail",
          description:
            "Built an OpenClaw skill that gives AI agents full visibility into how the platform's services run locally and on remote servers via Docker — used for automated debugging and operational insight.",
        },
        {
          name: "Email Server Infrastructure",
          url: null,
          description:
            "Owned the inbound and outbound MTA pipeline at scale — multi-domain SMTP, quota plugins for per-user rate limiting, JWT/SPF spoofing prevention, Docker-orchestrated deployment on AWS.",
        },
        {
          name: "High-Throughput Email Blast Engine",
          url: null,
          description:
            "Refactored the email blast algorithm to batch-process recipients, parallelize the automation pipeline and surface progress feedback — serves millions of messages with versioned statistics and reliable recipient calculation.",
        },
        {
          name: "Dapplets Integration Framework",
          url: null,
          description:
            "Designed and shipped a dapplets (integrations) system in the EMS API with multi-filter queries, configurable applet limits and TypeScript migrations — enables third-party integrations into the product surface.",
        },
      ],
    },
    {
      period: "06/03/24 - 06/09/25",
      role: "Mid Fullstack Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Email Marketing Suite",
          url: "https://ethermail.io/marketing-hub",
          description:
            "Built an Email Marketing solution and continuously extended it with a full suite of features — audience segmenting, lists management and campaign orchestration. Vue, Nuxt and Nest across the stack.",
        },
        {
          name: "Email Infrastructure",
          url: null,
          description:
            "Managed email servers processing millions of messages with Docker, IMAP and SMTP on AWS — load balancing, monitoring and redundancy across the fleet.",
        },
        {
          name: "EtherMail Wallet Provider",
          url: null,
          description:
            "Built and maintained a published Wagmi + viem connector library with EIP-1559 support, MetaMask-style UX, chain switching and provider error recovery — used by every partner integrating EtherMail wallets.",
        },
        {
          name: "Login & Subscribe Widgets",
          url: null,
          description:
            "Built iframe-embeddable login (mobile autologin, visibility controls) and subscribe widgets (Web3 ID conditional logic) — drop-in components partners install in minutes.",
        },
        {
          name: "Multi-tenant Staking Platform",
          url: null,
          description:
            "Built end-to-end — Solidity contracts on top of OpenZeppelin with formal Foundry invariants, Nest backend with tenant isolation and Vue/Nuxt UX showing live balances.",
        },
      ],
    },
    {
      period: "06/03/23 - 06/03/24",
      role: "Fullstack Intern Developer",
      location: "Barcelona, España",
      company: "EtherMail",
      accomplishments: [
        {
          name: "Backend Monitoring System",
          url: "https://ethermail.io/engagement-booster",
          description:
            "Designed and implemented from scratch a backend service to ingest, process and monitor on-platform engagement data — DB schema design and sustainable-code focused.",
        },
      ],
    },
    {
      period: "2023",
      role: "Fullstack Developer / Teacher",
      location: "Barcelona, España",
      company: "Fiverr",
      accomplishments: [
        {
          name: "Client Work & Teaching",
          url: null,
          description:
            "Built fullstack apps and frontends end-to-end for diverse clients, and taught web fundamentals and JavaScript to early developers.",
        },
      ],
    },
  ],
  education: [],
  additionalCourses: [
    {
      title:
        "Full Stack Web Development with JavaScript (32 hours raw video course) - 100 hours",
      provider: "FreeCodeCamp",
    },
    {
      title: "JavaScript Fundamentals - 3 Weeks",
      provider: "Alchemy University",
    },
    {
      title: "TypeScript - TypeScript full tutorials / documentation",
      provider: "FreeCodeCamp / Documentation",
    },
    sqlFoundationsCourse,
    {
      title: "Fundamentals on Digital Marketing (40 hours) Ended 2020",
      provider: "Barcelona, Spain Google Activate",
    },
    englishCourse,
  ],
};

// Backwards-compatible export
export const cvData = cvWeb3Data;
