// Portfolio data extracted from resume

export const personalInfo = {
  name: "Arnav Nidumolu",
  title: "Full Stack Developer",
  tagline: "Building innovative AI-powered solutions",
  location: "Cupertino, CA",
  email: "arnavnidumolu@gmail.com",
  phone: "+1 (408) 318-6135",
  linkedin: "linkedin.com/in/arnav-nidumolu",
  github: "github.com/arnavnidumolu",
  bio: "Passionate full-stack developer with expertise in AI/ML integration, scalable web applications, and creative technology. Founded Convo AI, interned at Meta's Llama team, and built innovative projects combining AR, computer vision, and web technologies."
};

export const experience = [
  {
    id: 1,
    company: "Meta",
    role: "Software Engineering Intern",
    period: "Jun 2024 - Aug 2024",
    location: "Menlo Park, CA",
    description: "Worked on the Llama Team to develop and optimize ML models for large-scale applications. Built components for AI-powered features and contributed to the core infrastructure.",
    achievements: [
      "Developed ML model optimization tools using PyTorch and CUDA",
      "Improved inference performance by 25% through kernel optimization",
      "Collaborated with research team on novel training techniques"
    ],
    tech: ["PyTorch", "CUDA", "Python", "C++", "TensorFlow"]
  },
  {
    id: 2,
    company: "Convo AI",
    role: "Founder & CEO",
    period: "Dec 2022 - Present",
    location: "Cupertino, CA",
    description: "Founded and built an AI-powered CRM platform that helps businesses automate customer interactions and manage relationships more effectively.",
    achievements: [
      "Designed and built full-stack application serving 1000+ users",
      "Integrated OpenAI GPT models for intelligent conversation analysis",
      "Implemented real-time collaboration features with Socket.io",
      "Achieved 95% customer satisfaction rating"
    ],
    tech: ["React", "Node.js", "MongoDB", "OpenAI API", "Socket.io", "AWS", "Redux"]
  },
  {
    id: 3,
    company: "Freelance",
    role: "Software Developer",
    period: "Jan 2021 - Present",
    location: "Remote",
    description: "Developed custom web applications, AR experiences, and automation tools for various clients across different industries.",
    achievements: [
      "Built 10+ production web applications",
      "Created AR filters with 100K+ impressions",
      "Automated WhatsApp messaging system handling 5000+ daily messages"
    ],
    tech: ["React", "Next.js", "Firebase", "Meta Spark AR", "Python", "FastAPI"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Convo AI Platform",
    category: "SaaS Product",
    description: "AI-powered CRM platform that revolutionizes customer relationship management through intelligent automation and analytics.",
    features: [
      "GPT-powered conversation analysis and insights",
      "Real-time collaboration and team management",
      "Automated follow-up and task generation",
      "Advanced analytics dashboard"
    ],
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Socket.io", "Redux", "Material-UI"],
    links: {
      demo: "https://convoai.app",
      github: null // Private repo
    },
    stats: {
      users: "1000+",
      uptime: "99.9%",
      rating: "4.8/5"
    }
  },
  {
    id: 2,
    title: "WhatsApp Bot Automation",
    category: "Automation",
    description: "Scalable WhatsApp messaging automation system for businesses to handle customer inquiries and notifications at scale.",
    features: [
      "Handles 5000+ messages daily",
      "Custom workflow automation",
      "Integration with CRM systems",
      "Analytics and reporting"
    ],
    tech: ["Python", "FastAPI", "Redis", "PostgreSQL", "Twilio API"],
    links: {
      demo: null,
      github: "github.com/arnavnidumolu/whatsapp-bot"
    },
    stats: {
      messages: "5000+/day",
      responseTime: "<2s",
      accuracy: "98%"
    }
  },
  {
    id: 3,
    title: "AR Filter Collection",
    category: "Augmented Reality",
    description: "Creative AR experiences and filters for social media platforms, combining computer vision with interactive design.",
    features: [
      "Face tracking and recognition",
      "Real-time 3D rendering",
      "Custom shader effects",
      "Multi-platform support"
    ],
    tech: ["Meta Spark AR", "JavaScript", "GLSL", "Blender", "After Effects"],
    links: {
      demo: "instagram.com/arfilters",
      github: null
    },
    stats: {
      impressions: "100K+",
      filters: "15",
      platforms: "3"
    }
  },
  {
    id: 4,
    title: "Portfolio 3D (This Site!)",
    category: "Web Development",
    description: "Interactive 3D portfolio with real-time face tracking that brings a unique, engaging experience to showcase my work.",
    features: [
      "Real-time face tracking with MediaPipe",
      "3D avatar animation with Three.js",
      "Smooth scroll animations",
      "Responsive design"
    ],
    tech: ["React", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MediaPipe"],
    links: {
      demo: null,
      github: "github.com/arnavnidumolu/3d-portfolio"
    },
    stats: {
      fps: "60",
      loadTime: "<3s",
      lighthouse: "95+"
    }
  }
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Python", level: 88 },
    { name: "Java", level: 75 },
    { name: "C++", level: 70 },
    { name: "SQL", level: 85 }
  ],
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "Three.js", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Framer Motion", level: 88 },
    { name: "Redux", level: 85 },
    { name: "Material-UI", level: 90 }
  ],
  backend: [
    { name: "Node.js", level: 92 },
    { name: "Express", level: 90 },
    { name: "FastAPI", level: 85 },
    { name: "MongoDB", level: 88 },
    { name: "PostgreSQL", level: 82 },
    { name: "Redis", level: 78 },
    { name: "GraphQL", level: 75 }
  ],
  tools: [
    { name: "Git", level: 95 },
    { name: "Docker", level: 80 },
    { name: "AWS", level: 82 },
    { name: "Firebase", level: 90 },
    { name: "Vercel", level: 88 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 85 }
  ],
  ai: [
    { name: "OpenAI API", level: 92 },
    { name: "PyTorch", level: 80 },
    { name: "TensorFlow", level: 75 },
    { name: "MediaPipe", level: 85 },
    { name: "LangChain", level: 78 }
  ]
};

export const education = {
  degree: "Computer Science",
  school: "High School Student",
  location: "Cupertino, CA",
  period: "Expected Graduation: 2026",
  achievements: [
    "Meta Software Engineering Intern (Llama Team)",
    "Founder of Convo AI",
    "100K+ AR filter impressions",
    "Multiple production applications deployed"
  ]
};

export const stats = {
  experience: "3+",
  projects: "15+",
  users: "1000+",
  code: "100K+"
};
