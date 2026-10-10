import type {
  Blog,
  DashboardMetric,
  ExperienceGlance,
  JourneyStop,
  NavItem,
  Part,
  Project,
  SkillGroup,
  Telemetry,
  VisitorMode,
} from "../types/portfolio";

export const navItems: Record<VisitorMode, NavItem[]> = {
  explorer: [
    { label: "Garage", href: "#garage" },
    { label: "Rider", href: "#rider" },
    { label: "Journey", href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Engine Room", href: "#engine" },
    { label: "Ride Logs", href: "#blogs" },
    { label: "Pit Stop", href: "#contact" },
  ],
  recruiter: [
    { label: "Brief", href: "#brief" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#journey" },
    { label: "Tech Stack", href: "#skills" },
    { label: "Blogs", href: "#blogs" },
    { label: "Contact", href: "#contact" },
  ],
};

export const rideModes: { id: VisitorMode; label: string; audience: string; perk: string }[] = [
  {
    id: "explorer",
    label: "Road Trip",
    audience: "Fellow dev, colleague, or curious rider",
    perk: "Scenic route · full portfolio",
  },
  {
    id: "recruiter",
    label: "Fast Lane",
    audience: "Recruiter, HR, or hiring manager",
    perk: "Express · resume and skills first",
  },
];

export const links = {
  email: "mailto:hbhardwaj9528@gmail.com",
  phone: "tel:+919528851014",
  linkedin: "https://www.linkedin.com/in/harshit-bhardwaj-720218210/",
  github: "https://github.com/HB-programmer",
  medium: "https://medium.com/@hbhardwaj9528",
  resume: `${import.meta.env.BASE_URL}Harshit-Bhardwaj-Resume.pdf`,
};

export const riderSpecs: Part[] = [
  { label: "Machine", value: "Yezdi Roadster" },
  { label: "Terrain", value: "Mountain roads and distributed systems" },
  { label: "Day Job", value: "Software Engineer (AI) at Altre Digital" },
  { label: "Base Camp", value: "Gurugram, India" },
];

export const metrics: DashboardMetric[] = [
  { label: "Fuel", value: "4+ Years", fill: 92 },
  { label: "Engine", value: "Python + FastAPI + Node.js", fill: 90 },
  { label: "Turbo", value: "Multi-Agent GenAI + RAG", fill: 94 },
  { label: "Transmission", value: "AWS + Kafka + Celery", fill: 86 },
];

export const journey: JourneyStop[] = [
  {
    year: "2022",
    title: "Mediology Software",
    period: "Software Engineer · Jul 2022 to Aug 2024",
    description: "Built and tuned scalable MERN and TypeScript backends on AWS for enterprise applications.",
    bullets: [
      "Cut API latency from about 2 seconds to 100-300 ms through query, indexing, and logic tuning.",
      "Improved application performance by about 30% with Redis caching and Elasticsearch search.",
      "Built event-driven workflows with Kafka and cloud-native services on EC2, Lambda, and DynamoDB.",
    ],
  },
  {
    year: "2024",
    title: "Altre Digital Pvt. Ltd.",
    period: "Software Engineer (AI) · Aug 2024 to Present",
    description: "Architecting production GenAI systems that automate enterprise real estate and workplace workflows.",
    bullets: [
      "Designed a multi-agent system: a Supervisor Agent, 8 specialized sub-agents, and a Humanized Answer Agent.",
      "Built intelligent model routing across GPT-4o, GPT-4.1, Claude Sonnet, and Claude Opus.",
      "Automated CAD/DXF office layout planning from about one week to nearly five minutes.",
    ],
  },
  {
    year: "Now",
    title: "Agentic AI Systems",
    period: "Current Mission",
    description: "Designing systems where LLMs, tools, queues, memory, and APIs run as one reliable machine.",
    bullets: [
      "Tool calling, Pydantic structured outputs, validation, retries, and fallback strategies.",
      "Redis conversational memory with real-time WebSocket streaming.",
      "Async document pipelines with FastAPI, Celery, and S3 presigned uploads.",
    ],
  },
];

export const projects: Project[] = [
  {
    number: "Garage 01",
    title: "Enterprise Multi-Agent AI Platform",
    description:
      "Supervisor Agent orchestrating 8 specialized agents and a human review workflow, with tool calling, Redis memory, WebSocket streaming, and model routing across GPT-4o and Claude.",
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Claude"],
  },
  {
    number: "Garage 02",
    title: "AI Workspace Planning & CAD Automation",
    description:
      "Parses DXF/CAD floor plans to automate desk allocation, occupancy planning, and meeting-room placement. Cut layout design from about a week to nearly five minutes.",
    tech: ["React-Konva", "TypeScript", "FastAPI", "Celery"],
  },
  {
    number: "Garage 03",
    title: "Lease Document Intelligence (RAG)",
    description:
      "End-to-end RAG over hundreds of scanned lease documents: OCR, semantic chunking, embeddings, metadata-aware retrieval, and LLM question answering.",
    tech: ["OCRmyPDF", "Pinecone", "Embeddings", "S3"],
  },
  {
    number: "Garage 04",
    title: "TheGameium",
    description:
      "Production gaming tournament platform with secure REST APIs, authentication, role-based access, leaderboards, and AWS deployment.",
    tech: ["MongoDB", "Express", "React", "Node.js", "AWS"],
    link: "https://thegameium.com/?lang=en",
  },
];

export const parts: Part[] = [
  { label: "Helmet", value: "React, Next.js, TypeScript, Tailwind CSS, Material UI" },
  { label: "Engine", value: "Python, FastAPI, Node.js, Express.js, NestJS, Celery" },
  { label: "Fuel Tank", value: "PostgreSQL, MongoDB, Redis, MySQL, DynamoDB, Elasticsearch" },
  { label: "ECU", value: "LangChain, LangGraph, RAG, OpenAI, Claude, Pinecone, Embeddings" },
  { label: "Suspension", value: "AWS EC2, Lambda, S3, API Gateway, IAM, CloudWatch, GCP" },
  { label: "Tyres", value: "GitHub Actions, PM2, RabbitMQ, Kafka, WebSockets" },
];

export const telemetry: Telemetry[] = [
  { value: "~5 min", label: "Layout Planning", detail: "CAD/DXF office layout design automated down from about one week." },
  { value: "9", label: "Agents In Orchestra", detail: "Supervisor, 8 specialized sub-agents, and a Humanized Answer Agent." },
  { value: "100ms", label: "API Latency", detail: "Optimized APIs from about 2 seconds to the 100-300 ms range." },
  { value: "30%", label: "Performance Gain", detail: "Redis distributed caching and Elasticsearch full-text search." },
];

export const aiStack = [
  "LLMs",
  "Multi-Agent Systems",
  "RAG",
  "LangGraph",
  "LangChain",
  "OpenAI",
  "Claude",
  "Model Routing",
  "Tool Calling",
  "Structured Output",
  "Pinecone",
  "Embeddings",
  "Semantic Search",
  "OCR",
  "Redis Memory",
  "WebSockets",
];

export const blogs: Blog[] = [
  {
    title: "Getting Started with RabbitMQ in Node.js",
    summary: "A hands-on intro to message queues: producers, consumers, and wiring RabbitMQ into a Node.js and TypeScript service.",
    tags: ["RabbitMQ", "Node.js", "TypeScript"],
    url: "https://medium.com/@hbhardwaj9528/getting-started-with-rabbitmq-in-node-js-typescript-efa419f33a42",
  },
  {
    title: "Adding TypeScript to an Existing React.js Project",
    summary: "How to introduce TypeScript into a live React codebase gradually, without dropping JavaScript support.",
    tags: ["React", "TypeScript", "Migration"],
    url: "https://medium.com/@hbhardwaj9528/adding-typescript-support-to-an-existing-react-js-project-without-dropping-javascript-support-1f0b930c6c1b",
  },
  {
    title: "Adding TypeScript to an Existing Node.js Project",
    summary: "An incremental path to TypeScript on the backend while existing JavaScript modules keep running.",
    tags: ["Node.js", "TypeScript", "Migration"],
    url: "https://medium.com/@hbhardwaj9528/adding-typescript-support-to-an-existing-node-js-project-without-dropping-javascript-support-07bb9a938fca",
  },
];

export const backendFlow = ["Client", "API Gateway", "FastAPI", "Celery", "Redis", "Postgres", "Pinecone", "LLM Router"];

export const recruiterFacts: Part[] = [
  { label: "Current", value: "Software Engineer (AI) · Altre Digital" },
  { label: "Experience", value: "4+ years · since Jul 2022" },
  { label: "Focus", value: "GenAI, multi-agent systems, backend" },
  { label: "Education", value: "B.Tech · Kurukshetra University · CGPA 9.31" },
  { label: "Location", value: "Gurugram, India" },
];

export const skillGroups: SkillGroup[] = [
  { label: "AI / GenAI", skills: ["LLMs", "Multi-Agent Systems", "RAG", "LangChain", "LangGraph", "OpenAI", "Claude", "Pinecone"] },
  { label: "Backend", skills: ["Python", "FastAPI", "Node.js", "Express.js", "Celery", "WebSockets", "Microservices"] },
  { label: "Data", skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB", "Elasticsearch"] },
  { label: "Cloud & Infra", skills: ["AWS", "Kafka", "RabbitMQ", "GitHub Actions", "PM2"] },
  { label: "Frontend", skills: ["React", "TypeScript", "Next.js", "React-Konva", "Tailwind CSS"] },
];

export const experienceGlance: ExperienceGlance[] = [
  {
    role: "Software Engineer (AI)",
    company: "Altre Digital Pvt. Ltd.",
    period: "Aug 2024 – Present",
    highlights: [
      "Architected a multi-agent GenAI platform: Supervisor Agent + 8 specialized agents",
      "Built RAG over hundreds of scanned lease documents (OCR, Pinecone, embeddings)",
      "Automated CAD/DXF office layout planning from ~1 week to ~5 minutes",
    ],
  },
  {
    role: "Software Engineer",
    company: "Mediology Software",
    period: "Jul 2022 – Aug 2024",
    highlights: [
      "Cut API latency from ~2 s to 100–300 ms",
      "Improved performance ~30% with Redis caching and Elasticsearch",
      "Built event-driven services with Kafka on AWS",
    ],
  },
];
