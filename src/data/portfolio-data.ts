// ═══════════════════════════════════════════
// PORTFOLIO DATA — Jayasimbu Jayamani
// Full Stack Developer | AI Application Developer
// ═══════════════════════════════════════════

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  contribution: string;
  isFeatured: boolean;
  githubUrl: string;
  liveUrl?: string;
  highlights?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category?: string;
  badge?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  icon: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  details?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  note?: string;
  type: string;
  responsibilities: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  type: 'Certification' | 'Workshop';
  description: string;
  badge: string;
  url?: string;
}

export const PROFILE = {
  name: 'JAYASIMBU JAYAMANI',
  shortName: 'Jayasimbu',
  role: 'Full Stack Developer | AI Application Developer',
  headline: 'Building Modern Web Applications & AI-Powered Solutions',
  heroStatement:
    'Computer Science and Engineering graduate specializing in React.js, Python, FastAPI, and intelligent AI-powered solutions. Passionate about transforming ideas into practical digital products.',
  bio:
    'I am a Computer Science and Engineering graduate with hands-on experience developing full-stack web applications and AI-powered solutions. I specialize in React.js, Python, FastAPI, and database integration. I enjoy transforming ideas into practical digital products, developing user-friendly interfaces, integrating AI capabilities, and solving real-world problems through technology.',
  about:
    "I'm Jayasimbu Jayamani, a Computer Science and Engineering graduate (2026) passionate about full-stack development, artificial intelligence, and modern web technologies. My development experience includes building applications such as AI-powered job portals, intelligent invoice processing systems, and personalized fitness platforms. I work across frontend and backend development, building responsive interfaces, REST APIs, database integrations, authentication systems, and AI-powered features. I believe in continuous learning, practical implementation, and creating technology that solves meaningful problems.",
  aboutTagline: 'Passionate About Technology. Focused on Building Solutions.',
  currentStatus:
    'Open to Entry-Level Software Developer Roles, Full Stack Developer Opportunities, Internships, and Freelance Projects.',
  location: 'Dharmapuri, Tamil Nadu, India',
  profileImage: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/simbu-profile.png`,
  availability: 'Open for Roles & Freelance',
  statusMessage: 'Ready to build high-impact web and AI applications.',
  contact: {
    name: 'Jayasimbu Jayamani',
    email: 'jayasimbu66@gmail.com',
    phone: '+91 96773 55463',
    whatsapp: '+919677355463',
    whatsappUrl: 'https://wa.me/919677355463?text=Hi%20Jayasimbu,%20I%20saw%20your%20portfolio!',
    location: 'Dharmapuri, Tamil Nadu, India',
    github: 'https://github.com/jayasimbu',
    linkedin: 'https://linkedin.com/in/jayasimbu-jayamani-51b1b42a1',
    hackerrank: 'https://hackerrank.com/profile/jayasimbu',
  },
};

export const HIGHLIGHTS = [
  {
    icon: 'GraduationCap',
    title: 'BE CSE Graduate – 2026',
    desc: 'Sri Shanmugha College of Engineering and Technology (CGPA: 7.3)',
  },
  {
    icon: 'Layers',
    title: 'Full-Stack Web Expertise',
    desc: 'Hands-on experience building modern, responsive, scalable applications with React & FastAPI',
  },
  {
    icon: 'Brain',
    title: '3 Major AI Projects',
    desc: 'Real-world implementations integrating Ollama, LLaVA Vision-Language Models, and Google Gemini',
  },
  {
    icon: 'Database',
    title: 'Full Pipeline Integration',
    desc: 'Frontend UI, RESTful APIs, relational/document databases (MongoDB, Supabase), and auth',
  },
  {
    icon: 'Rocket',
    title: 'Open for Opportunities',
    desc: 'Seeking Entry-Level Software Developer Roles, Full Stack Roles, Internships, & Freelance',
  },
];

export const STATS = [
  { value: '3+', label: 'AI Flagship Projects' },
  { value: '100%', label: 'Full-Stack Ready' },
  { value: '2026', label: 'BE CSE Graduate' },
  { value: '7.3', label: 'College CGPA' },
];

export const PROJECTS: Project[] = [
  {
    id: 'linkup',
    title: 'LINKUP',
    subtitle: 'AI-Powered Job Portal',
    tagline: 'Connecting Talent with Opportunities Through AI.',
    category: 'Full Stack Development | Artificial Intelligence | Career Technology',
    description:
      'LINKUP is an AI-powered job portal designed to simplify recruitment by connecting job seekers, employers, and administrators through an intelligent job-matching platform. The application combines resume analysis, ATS scoring, job-description matching, skill-gap identification, and AI-powered job recommendations.',
    techStack: ['React.js', 'FastAPI', 'Python', 'MongoDB', 'Ollama'],
    isFeatured: true,
    githubUrl: 'https://github.com/jayasimbu/LINKUP',
    liveUrl: 'https://github.com/jayasimbu/LINKUP',
    contribution:
      'Designed and developed the full-stack application, integrating frontend interfaces, backend APIs, database functionality, and locally hosted AI capabilities.',
    features: [
      'Multi-Role Authentication: Separate modules for Job Seekers, Employers, and Administrators with role-based access and dashboards.',
      'AI Resume Analysis: Resume parsing, information extraction, ATS-style resume scoring, and resume readiness evaluation.',
      'Intelligent Job Matching: Matches candidate resumes with job descriptions, identifies relevant skills, and provides skill-gap analysis.',
      'AI Job Recommendations: Uses locally hosted Ollama AI models to recommend opportunities and highlight skills to improve.',
      'Employer Dashboard: Comprehensive job management, candidate evaluation, and resume-based candidate shortlisting.',
    ],
    highlights: [
      'Locally hosted Ollama models for zero-cost, private AI inference',
      'ATS score generation based on keyword & semantic matching',
      'Complete end-to-end recruitment lifecycle management',
    ],
  },
  {
    id: 'vlm-llava',
    title: 'VLM LLaVA',
    subtitle: 'AI-Powered Invoice Intelligence System',
    tagline: 'Transforming Invoices into Intelligent, Searchable Data.',
    category: 'Artificial Intelligence | Document Processing | Computer Vision',
    description:
      'VLM LLaVA is an AI-powered document intelligence application designed to process invoices and receipts using OCR and Vision-Language Models. The system extracts important invoice information, organizes processed documents, and enables users to interact with invoice data through AI-powered question answering.',
    techStack: ['Python', 'React.js', 'FastAPI', 'LLaVA', 'EasyOCR', 'Supabase'],
    isFeatured: true,
    githubUrl: 'https://github.com/jayasimbu/vlm_llava_project',
    liveUrl: 'https://github.com/jayasimbu/vlm_llava_project',
    contribution:
      'Developed the full-stack document intelligence application, integrating OCR, vision-language model capabilities, API services, frontend interfaces, and invoice data management.',
    features: [
      'Intelligent Invoice Extraction: Vendor/supplier details, invoice numbers, dates, tax information, total amounts, and individual line items.',
      'Multilingual OCR: High-accuracy text extraction from receipts and invoices using EasyOCR with multilingual support.',
      'Vision-Language Model Integration: LLaVA integration for nuanced visual document layout comprehension.',
      'Invoice Management & Supabase: Cloud storage for processed invoices, history tracking, and structured relational queries.',
      'AI Invoice Question Answering: Interactive conversational Q&A to ask queries like "What was the total VAT for March?"',
      'Export Functionality: Direct export of structured invoice records into CSV and PDF formats.',
    ],
    highlights: [
      'Multimodal document understanding blending EasyOCR with LLaVA',
      'Natural-language queries directly over raw invoice imagery',
      'Instant CSV & PDF export for financial pipelines',
    ],
  },
  {
    id: 'myfitness-hub',
    title: 'MyFitness Hub',
    subtitle: 'AI-Powered Fitness Web Application',
    tagline: 'Your Personal Fitness Journey, Powered by AI.',
    category: 'Full Stack Development | Generative AI | Health & Fitness Technology',
    description:
      'MyFitness Hub is an AI-powered fitness web application designed to provide personalized fitness experiences through intelligent workout recommendations, user activity tracking, and fitness management tools. The platform combines AI-generated workout plans with personalized dashboards and workout management features.',
    techStack: ['React.js', 'TypeScript', 'Supabase', 'Google Gemini AI'],
    isFeatured: true,
    githubUrl: 'https://github.com/jayasimbu/MyFitnessHub',
    liveUrl: 'https://github.com/jayasimbu/MyFitnessHub',
    contribution:
      'Developed the fitness application using React.js and TypeScript, integrated Supabase backend services, and implemented AI-powered features using Google Gemini.',
    features: [
      'User Authentication & Profiles: Secure user registration and login with personalized fitness baseline profiles.',
      'AI Workout Plan Generation: Google Gemini AI integration to generate tailored workout routines based on user goals.',
      'Personalized Dashboard: Real-time progress metrics, workout history, and comprehensive fitness tracking.',
      'AI Fitness Chatbot: 24/7 conversational fitness coach for exercise advice, form tips, and nutrition ideas.',
      'Membership Checkout: Tiered membership subscription management and checkout functionality.',
      'Admin Dashboard: Centralized platform for user management, routine curation, and workout administration.',
      'Workout Calendar: Dynamic schedule planner to track completed and upcoming exercise sessions.',
    ],
    highlights: [
      'Google Gemini AI integration for custom workout & diet generation',
      'Type-safe architecture built with React & TypeScript',
      'Full Supabase Auth, PostgreSQL schema, and real-time state',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { name: 'Java', level: 85, badge: 'Core OOP' },
      { name: 'Python', level: 90, badge: 'FastAPI & AI' },
      { name: 'JavaScript', level: 88, badge: 'ES6+' },
      { name: 'TypeScript', level: 82, badge: 'Type Safe' },
    ],
  },
  {
    name: 'Frontend Development',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 92, badge: 'Hooks & State' },
      { name: 'HTML5', level: 95, badge: 'Semantic' },
      { name: 'CSS3', level: 90, badge: 'Flex & Grid' },
      { name: 'Responsive Web Design', level: 92, badge: 'Mobile-First' },
      { name: 'Tailwind CSS', level: 90, badge: 'Utility First' },
    ],
  },
  {
    name: 'Backend Development',
    icon: 'Server',
    skills: [
      { name: 'Python', level: 90, badge: 'Core' },
      { name: 'FastAPI', level: 88, badge: 'Async APIs' },
      { name: 'REST API Development', level: 90, badge: 'CRUD & Auth' },
      { name: 'Node.js', level: 80, badge: 'Runtime' },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 85, badge: 'NoSQL' },
      { name: 'Supabase', level: 88, badge: 'PostgreSQL & BaaS' },
    ],
  },
  {
    name: 'Artificial Intelligence',
    icon: 'Brain',
    skills: [
      { name: 'Ollama', level: 85, badge: 'Local LLMs' },
      { name: 'LLaVA Vision-Language Model', level: 82, badge: 'VLM' },
      { name: 'EasyOCR', level: 85, badge: 'Multilingual' },
      { name: 'Google Gemini API', level: 88, badge: 'GenAI' },
      { name: 'AI Integration', level: 86, badge: 'Workflows' },
      { name: 'Resume Parsing', level: 85, badge: 'NLP / Regex' },
      { name: 'Document Intelligence', level: 84, badge: 'Extraction' },
    ],
  },
  {
    name: 'UI/UX & Design',
    icon: 'Palette',
    skills: [
      { name: 'Figma', level: 84, badge: 'Design System' },
      { name: 'Canva', level: 88, badge: 'Visuals' },
      { name: 'Google Stitch AI', level: 80, badge: 'AI Prototyping' },
      { name: 'Visily AI', level: 82, badge: 'Wireframing' },
      { name: 'Wireframing', level: 85, badge: 'UX Flow' },
      { name: 'Prototyping', level: 85, badge: 'Interactive' },
    ],
  },
  {
    name: 'Development Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 88, badge: 'Version Control' },
      { name: 'GitHub', level: 90, badge: 'Collaboration' },
      { name: 'VS Code', level: 95, badge: 'Primary IDE' },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    shortDesc: 'Modern, responsive, end-to-end web applications.',
    description:
      'Development of modern, responsive web applications with frontend, backend, database, and authentication integration.',
    deliverables: [
      'Dynamic React.js / Next.js frontend interfaces',
      'FastAPI / Node.js backend services',
      'Database modeling (MongoDB & Supabase / PostgreSQL)',
      'Secure authentication & role-based access control',
      'Responsive design across mobile, tablet, and desktop',
    ],
    icon: 'Globe',
    tags: ['React.js', 'FastAPI', 'MongoDB', 'Supabase'],
  },
  {
    id: 'landing',
    title: 'Landing Page Development',
    shortDesc: 'High-converting, sleek digital presence.',
    description:
      'Professional landing pages for startups, businesses, personal brands, and products.',
    deliverables: [
      'High-conversion layouts with engaging hero sections',
      'Smooth animations and interactive micro-interactions',
      'Optimized loading speed and SEO meta structure',
      'Integrated contact forms and call-to-action triggers',
      'Custom branding, typography, and mobile responsiveness',
    ],
    icon: 'Sparkles',
    tags: ['Tailwind CSS', 'React.js', 'UI/UX', 'SEO'],
  },
  {
    id: 'restapi',
    title: 'REST API Development',
    shortDesc: 'Scalable, secure, and well-documented APIs.',
    description:
      'Backend API development, database connectivity, authentication, and third-party API integration.',
    deliverables: [
      'FastAPI / Express asynchronous REST endpoints',
      'JWT token authentication and route protection',
      'Database CRUD operations with indexing and validation',
      'Swagger / OpenAPI automated interactive docs',
      'Third-party webhooks and service integrations',
    ],
    icon: 'Server',
    tags: ['FastAPI', 'Python', 'JWT', 'REST'],
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance & Bug Fixing',
    shortDesc: 'Troubleshooting, UI polish, and performance speedups.',
    description:
      'Website troubleshooting, UI improvements, performance optimization, and bug resolution.',
    deliverables: [
      'Frontend debugging and layout alignment fixes',
      'API error resolution and database query optimization',
      'Performance audit and assets compression',
      'Cross-browser and mobile compatibility testing',
      'Code refactoring for better readability and maintainability',
    ],
    icon: 'Wrench',
    tags: ['Debugging', 'Performance', 'Refactoring', 'UI Fixes'],
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    shortDesc: 'Infuse intelligent AI features into modern applications.',
    description:
      'Integration of AI capabilities into web applications using supported AI models and APIs.',
    deliverables: [
      'Integration with Google Gemini API & Ollama local models',
      'Document intelligence, OCR & vision-language features',
      'Custom AI chatbots and automated workflow pipelines',
      'Resume parsing, text extraction, and categorization',
      'Prompt engineering and structured JSON AI responses',
    ],
    icon: 'Brain',
    tags: ['Google Gemini', 'Ollama', 'LLaVA', 'EasyOCR'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Mahindra Next Wealth IT India Pvt Ltd',
    position: 'Trainee Executive',
    period: '22 May 2026 – 08 October 2026',
    type: 'Non-IT Professional Experience',
    description: 'Professional experience in a trainee executive role.',
    note: 'Note: This is non-IT professional experience and is presented separately from software development projects.',
    responsibilities: [
      'Gained valuable corporate workplace experience and operational discipline.',
      'Developed team collaboration, executive communication, and problem-solving skills.',
      'Handled process execution, task documentation, and accountability in professional business environments.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering — Computer Science and Engineering',
    institution: 'Sri Shanmugha College of Engineering and Technology, Sankari, Salem',
    period: '2022 – 2026',
    score: 'CGPA: 7.3',
    details:
      'Hands-on computer science foundation covering Data Structures, Algorithms, Object-Oriented Programming, Database Systems, Web Development, and Artificial Intelligence.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Government Higher Secondary School, Errabaiyanahalli',
    period: '2020 – 2022',
    details: 'Completed higher secondary education with focus on science and mathematics.',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Government Higher Secondary School, Errabaiyanahalli',
    period: '2019 – 2020',
    details: 'Completed foundational secondary school education with academic distinction.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    type: 'Certification',
    description:
      'Certified proficiency in core Java programming, object-oriented concepts, loops, collections, and algorithmic problem-solving.',
    badge: 'HackerRank Verified',
    url: 'https://hackerrank.com/profile/jayasimbu',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    type: 'Certification',
    description:
      'Foundational certification covering key AI disciplines including Machine Learning, Deep Learning, Natural Language Processing, and ethics in AI.',
    badge: 'IBM Verified',
  },
  {
    title: 'Designing the Web: Front-End Development Immersion',
    issuer: 'Marcello Tech, Trichy District',
    type: 'Workshop',
    description:
      'Interactive hands-on immersion workshop focusing on modern frontend architecture, responsive layouts, web performance, and modern styling techniques.',
    badge: 'Workshop Certificate',
  },
];

export const PHILOSOPHY = {
  motto: 'Learn. Build. Innovate.',
  quote: 'I believe the best way to learn technology is by building practical applications.',
  principles: [
    {
      title: 'Clean & Maintainable Code',
      desc: 'Writing structured, self-documenting code with clear separation of concerns that scales gracefully.',
      icon: 'Code',
    },
    {
      title: 'User-Friendly Interfaces',
      desc: 'Crafting responsive, intuitive, and accessible user experiences that solve real user friction.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Scalable Backend Solutions',
      desc: 'Engineering robust REST APIs, clean database architectures, and secure auth layers.',
      icon: 'Cpu',
    },
    {
      title: 'Useful AI Integration',
      desc: 'Embedding AI pragmatically to automate workflows, extract intelligence, and deliver tangible value.',
      icon: 'Sparkles',
    },
    {
      title: 'Continuous Improvement',
      desc: 'Relentlessly updating technical skills, embracing new frameworks, and learning by hands-on shipping.',
      icon: 'TrendingUp',
    },
  ],
};

// ── Retro Desktop OS Module Compatibility ──
export const AI_CONCEPTS = [
  {
    title: 'Vision Language Models (LLaVA)',
    description: 'Multimodal AI systems that understand both images and text for invoice & document processing.',
    status: 'ACTIVE',
  },
  {
    title: 'Local LLMs (Ollama)',
    description: 'Running and fine-tuning language models locally for zero-cost private recruitment matching.',
    status: 'ACTIVE',
  },
  {
    title: 'Generative AI (Gemini)',
    description: 'Generating dynamic fitness plans, personalized workout routines, and interactive chat assistance.',
    status: 'ACTIVE',
  },
  {
    title: 'Intelligent Document Processing (EasyOCR)',
    description: 'Using OCR combined with VLM to extract, classify, and structure receipts and invoices.',
    status: 'DEPLOYED',
  },
  {
    title: 'ATS Resume Intelligence',
    description: 'Semantic parsing and scoring to match candidates with job postings and identify skill gaps.',
    status: 'DEPLOYED',
  },
];

export const AUTOMATION_NODES = [
  { id: 'trigger', label: 'Resume Upload', type: 'trigger', x: 50, y: 50 },
  { id: 'process', label: 'FastAPI Parser', type: 'process', x: 250, y: 50 },
  { id: 'ai', label: 'Ollama ATS Scoring', type: 'ai', x: 450, y: 30 },
  { id: 'transform', label: 'Skill Gap Analysis', type: 'process', x: 450, y: 100 },
  { id: 'api', label: 'MongoDB Storage', type: 'output', x: 650, y: 50 },
  { id: 'notify', label: 'Candidate Match UI', type: 'output', x: 650, y: 120 },
];

export const AUTOMATION_CONNECTIONS = [
  { from: 'trigger', to: 'process' },
  { from: 'process', to: 'ai' },
  { from: 'process', to: 'transform' },
  { from: 'ai', to: 'api' },
  { from: 'transform', to: 'notify' },
];

export const DESKTOP_MODULES = [
  { id: 'profile', title: 'PROFILE.sys', icon: '⊚', color: '#00F0FF' },
  { id: 'projects', title: 'PROJECTS.exe', icon: '◆', color: '#FF3366' },
  { id: 'stack', title: 'STACK.dll', icon: '◈', color: '#B980F0' },
  { id: 'ailab', title: 'AI.lab', icon: '◎', color: '#00FF88' },
  { id: 'automation', title: 'AUTOMATION.node', icon: '⟐', color: '#FFB800' },
  { id: 'contact', title: 'CONTACT.ping', icon: '◉', color: '#00F0FF' },
  { id: 'status', title: 'STATUS.monitor', icon: '⬡', color: '#FF3366' },
] as const;

export type ModuleId = typeof DESKTOP_MODULES[number]['id'];
