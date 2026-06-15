// ─────────────────────────────────────────────────────────
// PROJECT DATA — edit this file to update your portfolio
// ─────────────────────────────────────────────────────────
//
// HOW TO ADD A NEW PROJECT:
//   1. Copy any project object below
//   2. Give it a unique `id`
//   3. Set `category` to one of: "AI Tools" | "SaaS" | "XR" | "Web Apps"
//   4. Fill in the text fields
//   5. Add it to the correct category section
//
// HOW TO ADD REAL IMAGES:
//   1. Put images in /public/projects/<category>/<project-id>/
//      e.g. /public/projects/ai/autotakeoff/hero.png + 01.png, 02.png, ...
//   2. Set `thumbnail` to "/projects/<category>/<project-id>/hero.png"
//   3. Set `gallery` to product-state screens (shown in the case study modal)
//   4. The mockup generator is used only when thumbnail or gallery are empty
//
// ORDER: Projects appear on the site in the order listed below.

export type ProjectCategory = "AI" | "XR" | "Web & Cloud";

export type VisualKind =
  | "forecast"
  | "legal"
  | "vision"
  | "market"
  | "graph"
  | "spatial"
  | "operations"
  | "immersive"
  | "construction"
  | "health"
  | "finance"
  | "compliance"
  | "commerce"
  | "assistant"
  | "manufacturing"
  | "packaging"
  | "configurator"
  | "apparel"
  | "analytics";

export interface Project {
  // ── Identity ──
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;

  // ── Context ──
  industry: string;
  clientType: string;
  techStack: string[];
  tags: string[];

  // ── Copy ──
  description: string;
  outcome: string;
  challenge: string;
  solution: string;
  results: string[];

  // ── Images ──
  // When null, the auto-generated mockup is shown.
  // Set to a path like "/projects/lexisai/hero.jpg" to use a real image.
  thumbnail: string | null;
  gallery: string[];

  // ── Visual theme (drives the auto-mockup — ignore once you have real images) ──
  visualTheme: {
    kind: VisualKind;
    surface: string;
    ink: string;
    muted: string;
  };

  // ── Relations ──
  relatedIds: string[];

  // ── External link ──
  liveUrl: string | null;

  // ── Legacy (auto-derived, do not set manually) ──
  imageColor: string;

  // ── Case study (auto-generated from fields above) ──
  caseStudy: CaseStudyData;
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  features: { icon: string; title: string; description: string }[];
  techStack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  images: { bg: string; label?: string; span?: "normal" | "tall" | "wide" }[];
}

// Kept for backward compat — components that reference it
export type { Project as ProjectType };

// ─────────────────────────────────────────────────────────
// Internal: builds case study from project fields
// ─────────────────────────────────────────────────────────
type RawProject = Omit<Project, "caseStudy" | "imageColor">;

const buildCaseStudy = (p: RawProject): CaseStudyData => ({
  title: p.title,
  subtitle: `${p.category} for ${p.industry}`,
  description: p.description,
  overview: p.description,
  challenge: p.challenge,
  solution: p.solution,
  results: p.results,
  features: [
    {
      icon: "01",
      title: "Product Architecture",
      description:
        "A modular product foundation designed for scale, maintainability, and fast iteration after launch.",
    },
    {
      icon: "02",
      title: "Operational Interface",
      description:
        "Focused workflows, clear data hierarchy, and responsive screens for repeated daily use.",
    },
    {
      icon: "03",
      title: "Release System",
      description:
        "Production-ready delivery across core flows, analytics, QA, and stakeholder review.",
    },
  ],
  techStack: p.techStack,
  testimonial: {
    quote: p.outcome,
    author: "Client stakeholder",
    role: p.clientType,
  },
  images: [
    { bg: p.visualTheme.surface, label: "Primary product view", span: "wide" },
    { bg: p.visualTheme.ink, label: "Workflow detail", span: "normal" },
    { bg: p.visualTheme.muted, label: "System state", span: "tall" },
    { bg: p.visualTheme.surface, label: "Analytics surface", span: "normal" },
  ],
});

// ─────────────────────────────────────────────────────────
//  AI PROJECTS
// ─────────────────────────────────────────────────────────
const rawAiProjects: RawProject[] = [
  {
    id: "autotakeoff",
    title: "AutoTakeoff",
    category: "AI",
    year: "2025",
    industry: "Construction estimation",
    clientType: "Construction teams and estimators",
    techStack: [
      "React",
      "TypeScript",
      "Express",
      "FastAPI",
      "PostgreSQL",
      "Drizzle",
      "OpenAI",
      "Gemini",
      "Anthropic",
      "SerpAPI",
      "Stripe",
    ],
    tags: ["Construction AI", "Blueprint Takeoff", "LLM Copilot"],
    description:
      "An AI-powered blueprint takeoff platform where construction teams upload PDF plans, extract materials and quantities, refine measurements with vector drawings, and use an AI copilot to update takeoff data.",
    outcome:
      "Created a human-in-the-loop takeoff workflow that combines automated blueprint analysis with estimator corrections, calibrated measurements, pricing lookup, and structured material updates.",
    challenge:
      "Construction teams needed a way to convert blueprint PDFs into usable takeoff data while still allowing humans to correct AI output, calibrate measurements, and validate quantities before use.",
    solution:
      "Devfum built a PDF upload and analysis workflow with AI material extraction, polygon/polyline measurement tools, scale and DPI calibration, multi-provider LLM support, structured AI-to-action parsing, and price lookup through generated search terms.",
    results: [
      "Blueprint PDFs converted into structured materials and quantities",
      "Estimator correction workflow through vector drawing and calibrated measurements",
      "AI chat copilot capable of suggesting and applying add, update, and delete material changes",
    ],
    thumbnail: "/projects/ai/autotakeoff/hero.png",
    gallery: [
      "/projects/ai/autotakeoff/01.png",
      "/projects/ai/autotakeoff/02.png",
      "/projects/ai/autotakeoff/03.png",
    ],
    visualTheme: {
      kind: "construction",
      surface: "#252525",
      ink: "#111111",
      muted: "#D8D6CF",
    },
    relatedIds: ["phoenix", "swisper-ai", "strikeo-chatbot"],
    liveUrl: "https://autotakeoff.com",
  },
  {
    id: "besa-ai",
    title: "Besa AI",
    category: "AI",
    year: "2025",
    industry: "Healthcare / Telehealth",
    clientType: "Healthcare platform",
    techStack: [
      "AWS HealthScribe",
      "AWS Transcribe Streaming",
      "Socket.IO",
      "S3",
      "OpenAI GPT-4o",
      "OpenAI Vector Stores",
      "Python",
      "JSON Schema",
    ],
    tags: ["Medical Transcription", "Clinical Notes", "Healthcare AI"],
    description:
      "A healthcare AI platform that automates medical transcription and structured clinical note generation from doctor-patient audio recordings, including batch and real-time telehealth transcription flows.",
    outcome:
      "Delivered a clinical documentation pipeline that turns medical audio into structured, source-grounded notes with support for ICD-10 and CPT coding extraction.",
    challenge:
      "Telehealth encounters required reliable audio ingestion, real-time and batch transcription, healthcare-safe note generation, and strict anti-hallucination controls for clinical outputs.",
    solution:
      "Devfum implemented AWS HealthScribe orchestration, AWS medical streaming transcription, S3-based ingestion, OpenAI GPT-4o note generation with Vector Store RAG, strict JSON schema outputs, retry/backoff handling, and source-grounded prompting rules.",
    results: [
      "Batch and real-time medical transcription workflows",
      "Structured clinical note generation with strict schema constraints",
      "Healthcare-safe extraction rules for source-grounded fields and medical codes",
    ],
    thumbnail: "/projects/ai/besa-ai/hero.png",
    gallery: [
      "/projects/ai/besa-ai/01.png",
      "/projects/ai/besa-ai/02.png",
      "/projects/ai/besa-ai/03.png",
      "/projects/ai/besa-ai/04.png",
    ],
    visualTheme: {
      kind: "health",
      surface: "#202A27",
      ink: "#101816",
      muted: "#D7E0DA",
    },
    relatedIds: ["swisper-ai", "genie-ai", "gmalt"],
    liveUrl: "https://besahealth.org",
  },
  {
    id: "genie-ai",
    title: "Genie AI Agent",
    category: "AI",
    year: "2025",
    industry: "Finance / Investing",
    clientType: "Market data and investing platform",
    techStack: [
      "FastAPI",
      "OpenAI",
      "LangGraph",
      "LangChain",
      "Qdrant",
      "aiohttp",
      "DuckDuckGo Search",
      "BeautifulSoup",
      "Pydantic",
    ],
    tags: ["AI Agent", "Vector Memory", "Streaming Chat"],
    description:
      "An AI-powered stock and ETF assistant for Gencapita that classifies investing questions, retrieves structured market data, augments answers with web context, and maintains per-user conversational memory.",
    outcome:
      "Built an API-first investing assistant that combines structured financial data, web-derived context, streaming responses, and personalized vector memory.",
    challenge:
      "Users could ask ambiguous market questions requiring different paths: specific stock lookup, ETF lookup, general market overview, or web-augmented research.",
    solution:
      "Devfum built a FastAPI agent backend using LangGraph StateGraph, Qdrant-backed per-user memory, OpenAI-based query routing, async market data integrations, DuckDuckGo search, LLM URL selection, webpage scraping, summarization, and streaming responses.",
    results: [
      "LLM-routed stock, ETF, generic, and general market query flows",
      "Per-user conversational memory using Qdrant similarity search and metadata filters",
      "Streaming AI responses backed by structured data and optional web context",
    ],
    thumbnail: "/projects/ai/genie-ai/hero.png",
    gallery: [
      "/projects/ai/genie-ai/01.png",
      "/projects/ai/genie-ai/02.png",
      "/projects/ai/genie-ai/03.png",
      "/projects/ai/genie-ai/04.png",
      "/projects/ai/genie-ai/05.png",
      "/projects/ai/genie-ai/06.png",
      "/projects/ai/genie-ai/07.png",
    ],
    visualTheme: {
      kind: "finance",
      surface: "#1E2428",
      ink: "#0E1114",
      muted: "#D2D7D9",
    },
    relatedIds: ["swisper-ai", "besa-ai", "strikeo-chatbot"],
    liveUrl: "https://app.gencapita.com",
  },
  {
    id: "gmalt",
    title: "Gmalt",
    category: "AI",
    year: "2024",
    industry: "Compliance automation",
    clientType: "Compliance and operations team",
    techStack: [
      "FastAPI",
      "OpenAI GPT-4",
      "PostgreSQL",
      "SQLAlchemy",
      "Markdown Prompts",
      "Pydantic",
      "OpenAPI",
    ],
    tags: ["Document Generation", "Compliance AI", "Structured Outputs"],
    description:
      "An AI backend service that generates structured compliance and dispute rebuttal documents using GPT-4, governed by markdown prompts and grounded in normalized payment-network reference data.",
    outcome:
      "Delivered a backend-only compliance document generator with structured response schemas, reference-data lookups, and token usage visibility.",
    challenge:
      "Compliance teams needed consistent structured rebuttals across multiple payment-network reason code formats without hardcoding rules into application logic.",
    solution:
      "Devfum built a FastAPI service with markdown-based prompt governance, PostgreSQL reference tables, multi-code batch lookups, idempotent database bootstrap, validation layers, OpenAPI docs, health checks, and model/token metadata in responses.",
    results: [
      "Structured dispute rebuttal generation through a backend API",
      "Normalized violation explanation lookup across multiple payment networks",
      "Prompt governance separated from core code for easier rule updates",
    ],
    thumbnail: "/projects/ai/gmalt/hero.png",
    gallery: [
      "/projects/ai/gmalt/01.png",
      "/projects/ai/gmalt/02.png",
      "/projects/ai/gmalt/03.png",
      "/projects/ai/gmalt/04.png",
    ],
    visualTheme: {
      kind: "compliance",
      surface: "#242220",
      ink: "#10100F",
      muted: "#DDD8CF",
    },
    relatedIds: ["besa-ai", "swisper-ai", "phoenix"],
    liveUrl: "https://gmalt.de",
  },
  {
    id: "phoenix",
    title: "Project Phoenix",
    category: "AI",
    year: "2026",
    industry: "Home inspection / Construction documentation",
    clientType: "Inspection and construction documentation team",
    techStack: [
      "FastAPI",
      "PostgreSQL",
      "LLM APIs",
      "Speech-to-Text APIs",
      "FFmpeg",
      "Python",
      "CORS",
      "JSON Schema",
    ],
    tags: ["Transcription", "SOW Generation", "Construction Docs"],
    description:
      "A backend API that turns home inspection audio and video recordings into transcriptions, structured findings, Statements of Work, and CSI MasterFormat specification sections.",
    outcome:
      "Converted raw inspection recordings into structured construction documentation through an end-to-end media, transcription, extraction, and document-generation pipeline.",
    challenge:
      "Inspection narratives were captured in long audio/video recordings, making it difficult to extract consistent work items, generate SOWs, and format specification sections reliably.",
    solution:
      "Devfum built a production-grade REST backend with video-to-audio extraction, speech-to-text integration, long-form transcript chunking, overlap and deduplication, schema-validated JSON extraction, regex fallback parsing, PostgreSQL storage, search, pagination, and CSI MasterFormat generation.",
    results: [
      "Inspection media converted into structured transcriptions and findings",
      "Statement of Work generation from unstructured inspection narratives",
      "CSI MasterFormat-style specification output with enforced section structure",
    ],
    thumbnail: "/projects/ai/phoenix/hero.png",
    gallery: [
      "/projects/ai/phoenix/01.png",
      "/projects/ai/phoenix/02.png",
      "/projects/ai/phoenix/03.png",
    ],
    visualTheme: {
      kind: "construction",
      surface: "#282522",
      ink: "#11100F",
      muted: "#D9D3CA",
    },
    relatedIds: ["autotakeoff", "gmalt", "swisper-ai"],
    liveUrl: null,
  },
  {
    id: "strikeo-chatbot",
    title: "Strikeo Chatbot & Semantic Search",
    category: "AI",
    year: "2024",
    industry: "E-commerce / Retail",
    clientType: "Multi-vendor marketplace",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "FastAPI",
      "Flask",
      "Sentence Transformers",
      "FAISS",
      "Elasticsearch",
      "Flan-T5",
      "Docker",
      "Nginx",
    ],
    tags: ["Semantic Search", "E-commerce Chatbot", "AI Microservices"],
    description:
      "An AI-enhanced e-commerce system for Strikeo with semantic product search, LLM-based category inference, hybrid FAISS and Elasticsearch retrieval, and an embedded shopping chatbot.",
    outcome:
      "Added AI-assisted product discovery and shopping support through isolated Python search and chatbot microservices integrated with a Node/Express marketplace backend.",
    challenge:
      "Keyword search was not enough for shopper intent, and the marketplace needed AI discovery while still respecting filters like category, brand, price, pagination, and sorting.",
    solution:
      "Devfum implemented a FastAPI semantic search service using Sentence Transformers, FAISS, Elasticsearch filters, and Flan-T5 category extraction, plus a Flask chatbot microservice with MongoDB conversation history and Node-to-AI context bridging.",
    results: [
      "Semantic product search beyond exact keyword matching",
      "Hybrid retrieval using vector similarity plus marketplace filters",
      "Embedded chatbot with conversation persistence and service-level isolation",
    ],
    thumbnail: "/projects/ai/strikeo-chatbot/hero.png",
    gallery: [
      "/projects/ai/strikeo-chatbot/01.png",
      "/projects/ai/strikeo-chatbot/02.png",
      "/projects/ai/strikeo-chatbot/03.png",
    ],
    visualTheme: {
      kind: "commerce",
      surface: "#262626",
      ink: "#111111",
      muted: "#D5D5D0",
    },
    relatedIds: ["genie-ai", "swisper-ai", "autotakeoff"],
    liveUrl: null,
  },
  {
    id: "swisper-ai",
    title: "Swisper AI",
    category: "AI",
    year: "2025",
    industry: "AI assistant platform",
    clientType: "Enterprise software platform",
    techStack: [
      "LangGraph",
      "LangChain",
      "OpenAI",
      "Azure OpenAI",
      "Ollama",
      "pgvector",
      "Redis",
      "WebSockets",
      "SSE",
      "Datadog",
    ],
    tags: ["AI Assistant", "RAG", "Voice AI"],
    description:
      "A multi-step AI assistant platform with LangGraph orchestration, RAG over pgvector, voice-first STT-to-TTS flows, streaming chat, checkpointed state, and AI observability.",
    outcome:
      "Built a production-ready assistant architecture that supports domain routing, multi-provider LLM execution, real-time voice/chat UX, durable agent state, and monitored AI endpoints.",
    challenge:
      "The platform needed to support complex assistant workflows across chat, voice, RAG, background ingestion, classification, and long-running jobs without making the API process fragile.",
    solution:
      "Devfum built LangGraph-based supervisor and node orchestration, multi-provider LLM integrations, pgvector ingestion and similarity retrieval, real-time WebSocket voice flows, SSE chat streaming, Redis and database-backed checkpointing, token usage tracking, rate limiting, correlation IDs, and Datadog tracing.",
    results: [
      "Multi-step assistant workflows with supervisor, nodes, and domain routing",
      "RAG pipeline using ingestion, chunking, embeddings, and pgvector retrieval",
      "Voice-first and streaming chat experiences with persistent agent state",
    ],
    thumbnail: "/projects/ai/swisper-ai/hero.png",
    gallery: [
      "/projects/ai/swisper-ai/01.png",
      "/projects/ai/swisper-ai/02.png",
      "/projects/ai/swisper-ai/03.png",
      "/projects/ai/swisper-ai/04.png",
      "/projects/ai/swisper-ai/05.png",
    ],
    visualTheme: {
      kind: "assistant",
      surface: "#202326",
      ink: "#0E1012",
      muted: "#D6D8DA",
    },
    relatedIds: ["genie-ai", "besa-ai", "strikeo-chatbot"],
    liveUrl: "https://swisper.ai/en",
  },
];

// ─────────────────────────────────────────────────────────
//  XR PROJECTS
// ─────────────────────────────────────────────────────────
const rawXrProjects: RawProject[] = [
  {
    id: "swiss3d",
    title: "Swiss3D",
    category: "XR",
    year: "2026",
    industry: "3D printing / Manufacturing",
    clientType: "3D printing service provider",
    techStack: [
      "React",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "Supabase",
      "Web Workers",
      "Stripe",
      "Swiss Post API",
      "Bexio API",
    ],
    tags: ["3D Viewer", "Instant Quoting", "3D Printing"],
    description:
      "A 3D-print quoting and order platform where users upload CAD files, preview models in the browser, configure print requirements, and receive automated pricing support.",
    outcome:
      "Created a production-ready quoting workflow that connects 3D file visualization, material estimation, customer ordering, invoicing, logistics, and multilingual support.",
    challenge:
      "The client needed to move from manual 3D-print quoting toward a scalable digital workflow that could handle CAD uploads, pricing logic, customer management, and operational integrations.",
    solution:
      "Devfum built a web-based 3D upload and visualization flow with CAD file handling, slicing-based pricing support, material and support calculation, Supabase-backed project/order data, Stripe invoicing, Swiss Post package tracking, Bexio integration, and multilingual DE/EN/FR/IT support.",
    results: [
      "Browser-based 3D model upload and preview workflow",
      "Automated quoting foundation for 3D-print materials and support estimates",
      "Integrated customer, order, invoice, and logistics operations",
    ],
    thumbnail: "/projects/xr/swiss3d/hero.png",
    gallery: [
      "/projects/xr/swiss3d/01.png",
      "/projects/xr/swiss3d/02.png",
      "/projects/xr/swiss3d/03.png",
      "/projects/xr/swiss3d/04.png",
      "/projects/xr/swiss3d/05.png",
    ],
    visualTheme: {
      kind: "manufacturing",
      surface: "#202322",
      ink: "#101211",
      muted: "#D9DDD9",
    },
    relatedIds: ["duncan-print-group", "printgenie", "hemero"],
    liveUrl: "https://swiss3d.ch/en/",
  },
  {
    id: "duncan-print-group",
    title: "Duncan Print Group",
    category: "XR",
    year: "2024",
    industry: "Packaging / Print production",
    clientType: "Packaging and print service provider",
    techStack: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "WebGL",
      "KTX2",
      "PBR Materials",
      "N8AO",
      "GPU Instancing",
    ],
    tags: ["3D Packaging", "Configurator", "PBR Rendering"],
    description:
      "A high-fidelity 3D packaging visualization system for presenting configurable print and packaging products with realistic materials, finishes, and interactive product previews.",
    outcome:
      "Delivered a premium 3D packaging experience with realistic foil, gloss, material, lighting, and performance-optimized rendering for complex product scenes.",
    challenge:
      "Packaging products needed to look realistic in-browser, including special finishes like foil and gloss, without sacrificing performance or usability.",
    solution:
      "Devfum built a custom 3D rendering workflow using React Three Fiber, optimized packaging models, PBR material systems, KTX2 texture compression, GPU instancing, realistic lighting, shadows, and finish-specific visual treatment.",
    results: [
      "Realistic browser-based packaging visualization",
      "Interactive 3D product previews for configurable print products",
      "Optimized asset and rendering pipeline for high-quality WebGL scenes",
    ],
    thumbnail: "/projects/xr/duncan-print-group/hero.png",
    gallery: [
      "/projects/xr/duncan-print-group/01.jpg",
      "/projects/xr/duncan-print-group/02.jpg",
    ],
    visualTheme: {
      kind: "packaging",
      surface: "#24211E",
      ink: "#100F0E",
      muted: "#DDD6CC",
    },
    relatedIds: ["printgenie", "swiss3d", "hemero"],
    liveUrl: "https://duncan-demo.vercel.app",
  },
  {
    id: "printgenie",
    title: "PrintGenie",
    category: "XR",
    year: "2025",
    industry: "Packaging / E-commerce",
    clientType: "Print and packaging commerce platform",
    techStack: [
      "Next.js",
      "React",
      "React Three Fiber",
      "Three.js",
      "Drei",
      "Redux Toolkit",
      "MUI",
      "Express",
      "MongoDB",
      "Auth0",
      "WooCommerce",
    ],
    tags: ["3D Configurator", "Packaging", "WooCommerce"],
    description:
      "A 3D packaging configurator that lets customers customize packaging products, preview designs, adjust options, and connect configured products into an e-commerce ordering flow.",
    outcome:
      "Built an interactive packaging configuration experience that combines 3D visualization, design customization, manufacturing rules, and WooCommerce/cart integration.",
    challenge:
      "The client needed a guided product configurator that could show realistic packaging, support custom artwork and options, and bridge the configuration into an ordering workflow.",
    solution:
      "Devfum developed a Next.js and React Three Fiber configurator with dynamic packaging models, texture customization, color and finish options, 2D-to-3D design mapping, guided UI steps, Auth0-protected flows, backend project saving, and WooCommerce integration.",
    results: [
      "Interactive 3D packaging customization experience",
      "2D design inputs mapped onto 3D packaging surfaces",
      "Configuration-to-cart workflow connected with e-commerce ordering",
    ],
    thumbnail: "/projects/xr/printgenie/hero.png",
    gallery: [
      "/projects/xr/printgenie/01.png",
      "/projects/xr/printgenie/02.png",
    ],
    visualTheme: {
      kind: "configurator",
      surface: "#212121",
      ink: "#101010",
      muted: "#DCDAD4",
    },
    relatedIds: ["duncan-print-group", "swiss3d", "hemero"],
    liveUrl: "https://www.printgenie.com/home",
  },
  {
    id: "hemero",
    title: "Hemero",
    category: "XR",
    year: "2025",
    industry: "Sportswear / Custom apparel",
    clientType: "Teamwear and apparel commerce platform",
    techStack: [
      "Next.js",
      "React",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "PixiJS",
      "WebGL",
      "GSAP",
      "Fabric.js",
    ],
    tags: ["3D Apparel", "Product Customizer", "Teamwear"],
    description:
      "A 3D sportswear configurator for customizing team apparel with logos, colors, layouts, names, numbers, and production-ready design outputs.",
    outcome:
      "Created an apparel customization workflow that connects interactive 3D previews with the practical requirements of sublimation, stitched panels, safe zones, and manufacturing exports.",
    challenge:
      "Sportswear customization required more than visual color changes; artwork had to respect seams, panels, bleed areas, UV mapping, and production constraints.",
    solution:
      "Devfum built a 3D apparel customization system with panel-aware design areas, logo placement, name and number personalization, UV-mapped 3D previews, layered editing workflows, camera/material controls, and production-oriented export logic.",
    results: [
      "Interactive 3D teamwear customization experience",
      "Panel-aware logo and artwork placement across apparel surfaces",
      "Manufacturing-conscious design workflow for sublimation and cut-and-sew outputs",
    ],
    thumbnail: "/projects/xr/hemero/hero.png",
    gallery: [
      "/projects/xr/hemero/01.png",
      "/projects/xr/hemero/02.png",
      "/projects/xr/hemero/03.png",
    ],
    visualTheme: {
      kind: "apparel",
      surface: "#1F2022",
      ink: "#0F1011",
      muted: "#D7D8DA",
    },
    relatedIds: ["printgenie", "duncan-print-group", "strikeo"],
    liveUrl: "https://hemero.team",
  },
  {
    id: "strikeo",
    title: "Strikeo 3D Marketplace",
    category: "XR",
    year: "2025",
    industry: "E-commerce / Virtual retail",
    clientType: "Marketplace and retail platform",
    techStack: [
      "React",
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "Rapier",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Blender",
      "KTX2",
    ],
    tags: ["3D Commerce", "Virtual Plaza", "Interactive Marketplace"],
    description:
      "An immersive 3D commerce platform that evolved from a marketplace into a virtual plaza with explorable shops, clickable products, video ads, seasonal scenes, and purchase flows.",
    outcome:
      "Delivered a 3D shopping environment where users can navigate a virtual plaza, enter shops, interact with products, and connect immersive discovery with e-commerce actions.",
    challenge:
      "The marketplace needed to support many interactive products and rich 3D environments while preserving performance, clickability, and a usable shopping experience.",
    solution:
      "Devfum built a React Three Fiber virtual retail environment with first-person navigation, clickable product hotspots, optimized Blender assets, compressed textures, video textures, shop-specific scenes, physics/navigation handling, and backend commerce integration.",
    results: [
      "Explorable 3D virtual plaza with multiple shop environments",
      "Clickable product interactions connected to shopping flows",
      "Optimized 3D assets, textures, and scene structure for browser performance",
    ],
    thumbnail: "/projects/xr/strikeo/hero.png",
    gallery: [
      "/projects/xr/strikeo/01.jpg",
      "/projects/xr/strikeo/02.jpg",
      "/projects/xr/strikeo/03.jpg",
    ],
    visualTheme: {
      kind: "spatial",
      surface: "#232323",
      ink: "#101010",
      muted: "#D8D7D2",
    },
    relatedIds: ["hemero", "printgenie", "swiss3d"],
    liveUrl: "https://strikeo.com",
  },
];

// ─────────────────────────────────────────────────────────
//  SAAS / WEB / CLOUD PROJECTS
// ─────────────────────────────────────────────────────────
const rawWebCloudProjects: RawProject[] = [
  {
    id: "cld-manager",
    title: "CLD Manager",
    category: "Web & Cloud",
    year: "2025",
    industry: "Lead delivery / Operations management",
    clientType: "Internal operations and client delivery team",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "CSV/XLSX Import",
      "Email Notifications",
      "Role-Based Access",
    ],
    tags: ["Operations Platform", "Dashboards", "Data Management"],
    description:
      "A cloud-based lead delivery management platform that replaced spreadsheet-heavy workflows with structured client, campaign, industry, and monthly delivery tracking.",
    outcome:
      "Centralized lead delivery operations into a controlled web app with role-based access, import/export workflows, dashboards, and monthly delivery visibility.",
    challenge:
      "The team was managing client lead delivery through disconnected spreadsheets, making monthly tracking, imports, reporting, and client visibility difficult to maintain reliably.",
    solution:
      "Devfum built a React and Node.js platform with admin/client roles, spreadsheet-style tables, campaign and industry views, CSV/XLSX import mapping, export flows, dashboards, email notifications, and monthly delivery status logic.",
    results: [
      "Replaced manual spreadsheet-based lead delivery tracking",
      "Client and admin views for campaign, industry, and monthly performance",
      "Import, export, dashboard, and notification workflows in one system",
    ],
    thumbnail: "/projects/web/cld-manager/hero.png",
    gallery: [
      "/projects/web/cld-manager/01.jpg",
      "/projects/web/cld-manager/02.jpg",
      "/projects/web/cld-manager/03.jpg",
    ],
    visualTheme: {
      kind: "operations",
      surface: "#1F1F1D",
      ink: "#101010",
      muted: "#DAD8D1",
    },
    relatedIds: ["chatgpt-rank-tracker", "clearskin"],
    liveUrl: "https://cdlchappiness.com",
  },
  {
    id: "chatgpt-rank-tracker",
    title: "ChatGPT Rank Tracker",
    category: "Web & Cloud",
    year: "2025",
    industry: "AI SEO / Brand visibility",
    clientType: "AI visibility and marketing analytics platform",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Supabase",
      "Google Cloud Pub/Sub",
      "BrightData",
      "DataForSEO",
      "OpenAI",
      "Mailgun",
      "PM2",
    ],
    tags: ["AI SEO", "Rank Tracking", "Analytics"],
    description:
      "An AI brand visibility tracking platform that monitors how brands, domains, and competitors appear across ChatGPT-style AI-generated answers.",
    outcome:
      "Built a cloud analytics platform for tracking AI answer visibility, competitive mentions, sentiment, salience, and prompt-response performance over time.",
    challenge:
      "Brands needed visibility into how AI assistants describe them, whether competitors were being recommended instead, and how prompts, topics, and domains performed across repeated tracking runs.",
    solution:
      "Devfum developed a tracking and analytics system with prompt monitoring, response collection, brand/domain detection, competitor comparison, sentiment and salience analysis, scheduled workers, retry-safe processing, email flows, and dashboards for longitudinal visibility.",
    results: [
      "Tracked brand and competitor visibility inside AI-generated answers",
      "Dashboards for mentions, sentiment, salience, and performance trends",
      "Cloud worker architecture for scheduled prompt runs, retries, and analytics processing",
    ],
    thumbnail: "/projects/web/chatgpt-rank-tracker/hero.png",
    gallery: [
      "/projects/web/chatgpt-rank-tracker/01.png",
      "/projects/web/chatgpt-rank-tracker/02.png",
      "/projects/web/chatgpt-rank-tracker/03.png",
    ],
    visualTheme: {
      kind: "analytics",
      surface: "#1C1D20",
      ink: "#0E0F11",
      muted: "#D8D9DD",
    },
    relatedIds: ["cld-manager", "clearskin"],
    liveUrl: "https://chattrak.io",
  },
  {
    id: "clearskin",
    title: "ClearSkin",
    category: "Web & Cloud",
    year: "2024",
    industry: "Healthcare / Skincare",
    clientType: "Healthcare marketing and content team",
    techStack: [
      "Next.js",
      "React",
      "Sanity.io",
      "TypeScript",
      "CMS",
      "Responsive UI",
      "SEO",
    ],
    tags: ["CMS Website", "Healthcare Website", "Next.js"],
    description:
      "A CMS-driven marketing website for ClearSkin that allows the team to manage page content, imagery, icons, slugs, and structured website sections through Sanity.",
    outcome:
      "Delivered a flexible healthcare content website where non-technical teams can update marketing pages without developer involvement.",
    challenge:
      "The client needed a clean, editable website experience where content, media, page structure, and URLs could be managed through a CMS instead of hardcoded frontend changes.",
    solution:
      "Devfum built a Next.js frontend integrated with Sanity.io CMS, including structured content models, editable page sections, responsive layouts, dynamic slugs, image/icon management, and SEO-ready page rendering.",
    results: [
      "CMS-managed website content, images, icons, and URLs",
      "Responsive Next.js frontend for healthcare marketing pages",
      "Structured Sanity content models for easier non-technical updates",
    ],
    thumbnail: "/projects/web/clearskin/hero.png",
    gallery: [
      "/projects/web/clearskin/01.jpg",
      "/projects/web/clearskin/02.jpg",
      "/projects/web/clearskin/03.jpg",
    ],
    visualTheme: {
      kind: "health",
      surface: "#202624",
      ink: "#101413",
      muted: "#D9E0DC",
    },
    relatedIds: ["cld-manager", "chatgpt-rank-tracker"],
    liveUrl: "https://clearskin.org",
  },
];

// ─────────────────────────────────────────────────────────
//  COMBINED + EXPORTED
//  Order below = display order on the site
// ─────────────────────────────────────────────────────────
const allRaw: RawProject[] = [
  ...rawAiProjects,
  ...rawXrProjects,
  ...rawWebCloudProjects,
];

const finalizeProject = (p: RawProject): Project => ({
  ...p,
  imageColor: p.visualTheme.surface,
  caseStudy: buildCaseStudy(p),
});

export const projects: Project[] = allRaw.map(finalizeProject);
export const aiProjects: Project[] = rawAiProjects.map(finalizeProject);
export const xrProjects: Project[] = rawXrProjects.map(finalizeProject);
export const webCloudProjects: Project[] = rawWebCloudProjects.map(finalizeProject);

// ─────────────────────────────────────────────────────────
//  TEMPLATE — copy this to add a new project
// ─────────────────────────────────────────────────────────
//
// {
//   id: "my-project",
//   title: "My Project Name",
//   category: "AI",                  // "AI" | "XR" | "Web & Cloud"
//   year: "2025",
//   industry: "Healthcare",
//   clientType: "Startup",
//   techStack: ["React", "Python", "AWS"],
//   tags: ["AI", "Health"],
//   description: "One-liner about the product.",
//   outcome: "Key metric or result achieved.",
//   challenge: "What problem the client faced.",
//   solution: "How Devfum solved it.",
//   results: [
//     "First measurable result",
//     "Second measurable result",
//     "Third measurable result",
//   ],
//   thumbnail: "/projects/ai/my-project/hero.png",
//   gallery: [
//     "/projects/ai/my-project/01.png",
//     "/projects/ai/my-project/02.png",
//   ],
//   visualTheme: {
//     kind: "forecast",
//     surface: "#1a1a1a",
//     ink: "#2a2a2a",
//     muted: "#d8d8d2",
//   },
//   relatedIds: ["lexisai", "visionguard"],
// },
