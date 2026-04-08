// Portfolio data extracted from resume

export const personalInfo = {
  name: "Tharun SM",
  title: "AI Engineer / Full Stack Developer",
  tagline: "Specializing in production LLM systems and full-stack development",
  location: "Chennai, India",
  email: "tharun.v4ch@gmail.com",
  phone: "+91 8056069260",
  linkedin: "linkedin.com/in/tharun2896",
  github: "github.com/thrun-11",
  bio: "AI/ML Engineer specializing in production LLM systems, full-stack development and open-source contributions. Built conversational AI reducing operational costs by 60% and contributed enhancements to open-source GitHub projects. Proven track record deploying ML solutions from research to 100K+ user applications."
};

export const experience = [
  {
    id: 1,
    company: "Tclc.ai (The Code Language Company)",
    role: "Software Engineer",
    period: "Oct 2025 - Present",
    location: "Remote",
    description: "Led full-stack development of two production WhatsApp commerce solutions: multi-business SaaS platform (Convo AI) and enterprise customer service bot serving SMB and enterprise clients.",
    achievements: [
      "Architected Convo AI platform with RBAC, real-time order tracking via Socket.io, and analytics dashboard handling 1000+ daily interactions",
      "Developed automated customer service bot reducing manual support workload by 70%",
      "Engineered hybrid search combining Gemini vector embeddings with keyword fallback",
      "Implemented JWT authentication with Passport.js, Swagger API docs, and Docker/PM2 production deployment"
    ],
    tech: ["Node.js", "Express", "Socket.io", "React", "MongoDB", "PostgreSQL", "Docker", "Gemini LLM"]
  },
  {
    id: 2,
    company: "Tclc.ai (The Code Language Company)",
    role: "AI Research Intern",
    period: "Feb 2025 - Oct 2025",
    location: "Remote",
    description: "Conducted AI research and built proof-of-concept models for improving efficiency and query latency.",
    achievements: [
      "Built AI-driven evidence validation system reducing manual review time by 60%",
      "Implemented Groq API integration cutting query latency by 35% and improving model accuracy by 15%"
    ],
    tech: ["Python", "Groq API", "LLMs", "AI Research", "Prompt Engineering"]
  },
  {
    id: 3,
    company: "Nokia Networks and Solutions Pvt Ltd",
    role: "Machine Learning Intern",
    period: "Feb 2023 - Apr 2023",
    location: "Chennai",
    description: "Developed and optimized ML models for manufacturing operations and quality control.",
    achievements: [
      "Developed production line optimization reducing defect detection time by 40%",
      "Contributed to codebase optimization resulting in 20% performance improvement"
    ],
    tech: ["Machine Learning", "Python", "Computer Vision", "Model Optimization"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Convo AI Platform",
    category: "Full Stack SaaS",
    description: "Multi-tenant SaaS platform handling multi-business management, real-time orders, and WhatsApp automation.",
    features: [
      "AI agent using Gemini LLM with MCP tool-calling architecture",
      "Real-time order notifications via Socket.io",
      "WhatsApp Flows for address collection and webhooks",
      "Analytics dashboard with ApexCharts and dual databases"
    ],
    tech: ["React", "Node.js", "MongoDB", "PostgreSQL", "Socket.io", "Gemini LLM", "Material-UI"],
    links: {
      demo: null,
      github: null 
    },
    stats: {
      businesses: "10+",
      uptime: "99.9%"
    }
  },
  {
    id: 2,
    title: "WhatsApp AI Customer Service Bot",
    category: "AI Chatbot",
    description: "Production Node.js/Express bot with Gemini 2.5 Flash implementing stateful 6-stage guided shopping flow.",
    features: [
      "Wholesale/retail branching and MongoDB conversation persistence",
      "Hybrid search with vector embeddings",
      "Google Drive-to-S3 image sync with Sharp processing",
      "JWT + Passport.js auth with RBAC and security hardening"
    ],
    tech: ["Node.js", "Gemini Flash", "MongoDB", "JWT", "Docker", "S3"],
    links: {
      demo: null,
      github: null
    },
    stats: {
      reducedLoad: "70%",
      resolution: "95%"
    }
  },
  {
    id: 3,
    title: "Qwen & Copilot CLI Integration",
    category: "Open Source",
    description: "Contributed to @musistudio/claude-code-router with Qwen Code OAuth flow and GitHub Copilot integration.",
    features: [
      "Updated CCR transformer with DashScope headers and token refresh logic",
      "Integrated GitHub Copilot as native LLM provider with OAuth device flow",
      "Added CLI auth for all account types and real-time face detection"
    ],
    tech: ["TypeScript", "OAuth 2.0", "Fastify", "REST APIs", "GitHub API"],
    links: {
      demo: null,
      github: null
    },
    stats: {
      commits: "27+",
      integrated: "Yes"
    }
  },
  {
    id: 4,
    title: "AR Filter Development",
    category: "Augmented Reality",
    description: "Production AR filters for Snapchat with advanced prompt engineering and ONNX-optimized ML models.",
    features: [
      "Created 25+ production AR filters",
      "ONNX-optimized ML models achieving 30 FPS on mobile",
      "Advanced prompt engineering reducing time by 40%"
    ],
    tech: ["AR", "ONNX", "Machine Learning", "Prompt Engineering"],
    links: {
      demo: null,
      github: null
    },
    stats: {
      impressions: "100K+",
      filters: "25+",
      platforms: "Snapchat"
    }
  }
];

export const skills = {
  languages: [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 90 },
    { name: "SQL", level: 85 },
    { name: "C++", level: 75 }
  ],
  frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 }
  ],
  backend: [
    { name: "Node.js", level: 92 },
    { name: "Express", level: 90 },
    { name: "FastAPI", level: 85 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 88 },
    { name: "Flask", level: 80 }
  ],
  tools: [
    { name: "AWS", level: 85 },
    { name: "Docker", level: 88 },
    { name: "Git", level: 95 },
    { name: "LangChain", level: 85 },
    { name: "Claude/Cursor", level: 90 }
  ],
  ai: [
    { name: "OpenAI/Anthropic", level: 92 },
    { name: "Gemini / Vertex", level: 90 },
    { name: "PyTorch", level: 85 },
    { name: "TensorFlow", level: 80 },
    { name: "OpenCV / ONNX", level: 85 }
  ]
};

export const education = {
  degree: "Bachelor of Technology",
  school: "Sri Ramachandra Institute",
  location: "Chennai, India",
  period: "Graduated: 2025",
  achievements: [
    "Computer Science Engineering",
    "AI & Data Analytics Specialization",
    "GPA: 8.1 / 10.0",
    "Coursework: ML, Deep Learning, CV, NLP"
  ]
};

export const stats = {
  experience: "3+",
  projects: "25+",
  users: "100K+",
  code: "1M+"
};
