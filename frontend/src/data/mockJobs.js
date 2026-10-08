export const INITIAL_PROFILES = [
  {
    id: 'aridon',
    name: 'Aridon',
    avatar: '💻',
    title: 'Full-Stack Software Engineer',
    email: 'aridon.dev@gmail.com',
    targetQuery: 'Full Stack Engineer Remote',
    targetLocation: 'Remote / Hybrid',
    experienceLevel: 'Mid to Senior',
    coreSkills: [
      'TypeScript',
      'React',
      'Node.js',
      'Next.js',
      'PostgreSQL',
      'AWS',
      'Docker',
      'GraphQL',
      'TailwindCSS',
      'CI/CD',
      'REST APIs'
    ],
    preferredRoles: [
      'Full-Stack Developer',
      'Frontend Engineer',
      'Software Engineer',
      'Backend Developer'
    ],
    summary: 'Focuses on modern web architectures, performant React/TypeScript user interfaces, scalable Node.js APIs, cloud deployments, and resilient database systems.'
  },
  {
    id: 'stephen',
    name: 'Stephen',
    avatar: '⚡',
    title: 'Full-Stack Automation & AI Developer',
    email: 'unimawho.leadgen@gmail.com',
    targetQuery: 'AI Automation Engineer',
    targetLocation: 'Remote',
    experienceLevel: 'Mid to Senior',
    coreSkills: [
      'n8n',
      'Make.com',
      'Python',
      'FastAPI',
      'Node.js',
      'Supabase',
      'Docker',
      'REST APIs',
      'Webhooks',
      'OpenAI API',
      'Claude',
      'Gemini',
      'RAG Pipelines',
      'Botpress'
    ],
    preferredRoles: [
      'Automation Engineer',
      'AI Developer',
      'Workflow Engineer',
      'RevOps Engineer',
      'Low-Code/No-Code Engineer'
    ],
    summary: 'Specialized in building end-to-end autonomous agentic workflows, LLM pipelines, and resilient backend integrations connecting SaaS platforms with custom APIs.'
  }
];

export const MOCK_JOBS = [
  {
    hash_id: '4c1ba7843d1a890e872c5ef1',
    company: 'Vanguard Cloud Solutions',
    title: 'Full-Stack React & Node Engineer',
    location: 'Remote (Global)',
    source: 'Indeed',
    job_url: 'https://vanguardcloud.com/jobs/fullstack-react-node',
    match_score: 93,
    profile_id: 'aridon',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    summary: 'Outstanding match for Aridon! Strong alignment with modern React, TypeScript, Node.js APIs, and PostgreSQL database management.',
    pros: [
      'Direct match with React 19, TypeScript, and modern component systems',
      'Backend services built in Node.js and PostgreSQL',
      'Healthy remote-first work culture with flexible hours',
      'High ownership over full-stack feature architecture'
    ],
    cons: [
      'Requires baseline knowledge of AWS ECS and infrastructure-as-code'
    ],
    missing_keywords: ['Terraform', 'Jest'],
    description: `Join Vanguard Cloud as a Full-Stack Engineer crafting client portals and data visualization suites.

Responsibilities:
- Build accessible, lightning-fast UI components in React and TypeScript.
- Design RESTful and GraphQL APIs backed by Node.js and PostgreSQL.
- Implement automated testing suites and CI/CD pipelines via GitHub Actions.
- Optimize database queries and client-side rendering bottlenecks.`
  },
  {
    hash_id: '1e5cc89123fe45b89a312456',
    company: 'DataFlow Technologies',
    title: 'Senior Full-Stack Web Application Engineer',
    location: 'Remote',
    source: 'Google Jobs',
    job_url: 'https://dataflow.tech/careers/fullstack-app-engineer',
    match_score: 87,
    profile_id: 'aridon',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    summary: 'Excellent alignment on TypeScript, Next.js, REST APIs, and database architecture with room to grow in distributed queue systems.',
    pros: [
      'Extensive React/Next.js and TypeScript frontend stack',
      'Modern microservices architecture with Docker & PostgreSQL',
      'Collaborative engineering team with strong mentoring'
    ],
    cons: [
      'Position leans slightly more backend-heavy than frontend'
    ],
    missing_keywords: ['RabbitMQ', 'Redis'],
    description: `We are hiring a Full-Stack Engineer to power real-time data sync across enterprise SaaS products. You will build resilient HTTP microservices, design performant dashboard interfaces, and maintain cloud database schemas.`
  },
  {
    hash_id: '8a3df542c8e1a90c102a4bf7',
    company: 'Nexus Automation Labs',
    title: 'Senior AI & Workflow Automation Engineer',
    location: 'Remote (US/EU)',
    source: 'Google Jobs',
    job_url: 'https://careers.nexuslabs.ai/jobs/ai-workflow-engineer',
    match_score: 95,
    profile_id: 'stephen',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    summary: 'Exceptional match for Stephen! Direct requirement for n8n orchestrations, Python FastAPI services, and LLM tool calling in a fast-paced environment.',
    pros: [
      'Explicit need for n8n enterprise workflows and custom node development',
      'Uses Supabase and PostgreSQL for persistent session state',
      'Hands-on building of OpenAI & Claude agentic pipelines',
      '100% remote with asynchronous collaboration'
    ],
    cons: [
      'Requires occasional participation in European timezone on-call rotation'
    ],
    missing_keywords: ['Kafka', 'Temporal.io'],
    description: `We are seeking an experienced Workflow & AI Automation Developer to lead the automation initiatives across our product suite. 
    
Key Responsibilities:
- Design, deploy, and maintain robust n8n and Make.com multi-step workflows.
- Build custom API integrations connecting Supabase, CRMs, and internal vector databases.
- Develop LLM RAG pipelines with Claude and OpenAI APIs to extract, classify, and summarize data streams.
- Collaborate with frontend engineers to expose Webhooks and REST endpoints.

Qualifications:
- 3+ years experience in automation engineering or backend engineering.
- Deep expertise in n8n, Python (FastAPI/Flask), and Node.js.
- Strong familiarity with Supabase/PostgreSQL and containerized deployments via Docker.`
  },
  {
    hash_id: '7d2ee448ab9311e9f1a098bc',
    company: 'HyperScale AI Systems',
    title: 'AI Solutions & Integration Developer',
    location: 'Remote',
    source: 'LinkedIn via SerpAPI',
    job_url: 'https://hyperscale.io/careers/ai-solutions-developer',
    match_score: 89,
    profile_id: 'stephen',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    summary: 'High match for Stephen on generative AI and webhook integrations. Focus is on customer-facing automation pipelines and autonomous agents.',
    pros: [
      'Core focus on LLM APIs (OpenAI, Gemini, Anthropic) and structured parsing',
      'Extensive use of webhooks, microservices, and Docker',
      'Competitive salary band and equity package'
    ],
    cons: [
      'Prefers prior client-facing consulting or solutions engineering experience'
    ],
    missing_keywords: ['LangChain Python', 'Kubernetes'],
    description: `HyperScale AI builds enterprise-grade automation solutions for Fortune 500 clients. We need an AI Solutions Developer to architect complex agentic workflows.

What You'll Do:
- Build low-code and code-native automations bridging client ERP systems with cutting-edge AI models.
- Implement structured output validation and fallback mechanisms for LLM agents.
- Monitor execution reliability, retry logic, and webhook listeners in production.
- Work with Python, Node.js, and modern headless databases.`
  },
  {
    hash_id: '99af3b18d4512e098cb91244',
    company: 'Apex Media Corp',
    title: 'Automation & RevOps Specialist',
    location: 'Remote / London',
    source: 'Glassdoor',
    job_url: 'https://apexmedia.co/jobs/revops-automation',
    match_score: 81,
    profile_id: 'stephen',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    summary: 'Good match for Stephen on RevOps and business process automation workflows using Make and n8n.',
    pros: [
      'Directly involves n8n and Make.com for business process automation',
      'Integrates CRM data (HubSpot, Salesforce) with internal backends'
    ],
    cons: [
      'More focused on operations/CRM than deep AI model development'
    ],
    missing_keywords: ['Salesforce Apex', 'HubSpot Operations Hub'],
    description: `Apex Media is looking for a RevOps Automation Specialist to streamline our internal data pipelines, sync lead generation webhooks, and orchestrate reporting across our SaaS toolstack.`
  },
  {
    hash_id: '32bba81923e110c498ae2377',
    company: 'Legacy Enterprise Software Inc',
    title: 'Enterprise Java Systems Maintainer',
    location: 'On-site (Chicago, IL)',
    source: 'Google Jobs',
    job_url: 'https://legacyenterprisesoftware.com/careers/java-dev',
    match_score: 36,
    profile_id: 'aridon',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    summary: 'Poor fit. Heavy requirement for on-site legacy Java 8/Spring monolith and enterprise Oracle databases with no modern TypeScript/React focus.',
    pros: [
      'Stable corporate environment'
    ],
    cons: [
      'Strict on-site attendance required',
      'Core stack is Java/Spring/Oracle, which does not align with modern TypeScript/React profile',
      'No cloud modern frontend tooling'
    ],
    missing_keywords: ['Java 8', 'Spring Boot', 'Oracle SQL', 'On-site'],
    description: `Maintain legacy on-premise Java banking applications. Required: 5+ years Java 8, Spring framework, on-site presence Monday-Friday.`
  }
];
