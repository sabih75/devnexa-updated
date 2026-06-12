export interface ServiceDetail {
  slug: string;
  tag: string;
  accent: string;
  title: string;
  short: string;
  desc: string;
  deliverables: string[];
  deepDive: {
    overview: string;
    techStack: string[];
    process: { step: string; title: string; desc: string }[];
    caseStudy: {
      client: string;
      challenge: string;
      solution: string;
      result: string;
    };
  };
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    slug: 'web-development',
    tag: '01',
    accent: '#3b82f6',
    title: 'Web Development',
    short: 'Next.js, React, WordPress, Clinic Portals',
    desc: 'High-performance, modern websites designed to convert visitors and serve as the digital foundation for your veterinary clinic or business.',
    deliverables: ['Landing pages & marketing sites', 'Web apps & portals', 'E-commerce storefronts', 'CMS integrations'],
    deepDive: {
      overview: 'We build fast, secure, and SEO-optimized web platforms that represent your brand and convert users. For veterinary practices, we build patient intake systems, online booking integrations, and educational resource portals that streamline operations.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WordPress', 'GraphQL'],
      process: [
        { step: '1', title: 'UX Wireframing', desc: 'Mapping user journeys to ensure frictionless navigation and clear paths to conversion.' },
        { step: '2', title: 'UI Design', desc: 'Crafting responsive, beautiful layouts tailored to your brand.' },
        { step: '3', title: 'Clean Coding', desc: 'Developing with search-engine-friendly, semantic code.' },
        { step: '4', title: 'QA & Launch', desc: 'Testing speed, responsiveness, and third-party integrations before going live.' }
      ],
      caseStudy: {
        client: 'Paws & Claws Veterinary Care',
        challenge: 'A cluttered website resulting in high bounce rates and low online appointment bookings.',
        solution: 'Re-engineered the site using Next.js with a clean, high-speed interface and integrated booking widgets.',
        result: '140% increase in online appointment bookings and a 45% reduction in phone intake workload.'
      }
    }
  },
  {
    slug: 'mobile-development',
    tag: '02',
    accent: '#8b5cf6',
    title: 'Mobile Development',
    short: 'React Native, Flutter, Mobile UX',
    desc: 'Feature-rich, native-feeling iOS and Android applications engineered for seamless performance and maximum engagement.',
    deliverables: ['iOS & Android apps', 'Cross-platform development', 'App Store deployment', 'Push notification systems'],
    deepDive: {
      overview: 'Our mobile team builds high-performance apps utilizing cross-platform frameworks. We design intuitive workflows that keep users engaged, with full offline support and real-time backend synchronization.',
      techStack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'Firebase', 'App Store Connect'],
      process: [
        { step: '1', title: 'Prototyping', desc: 'Creating interactive wireframes to validate touch layouts.' },
        { step: '2', title: 'Architecture', desc: 'Setting up state management and API clients.' },
        { step: '3', title: 'Native Bridges', desc: 'Integrating hardware access such as camera, GPS, and biometric authentication.' },
        { step: '4', title: 'Store Delivery', desc: 'Navigating Apple App Store and Google Play Store certification pipelines.' }
      ],
      caseStudy: {
        client: 'VetTrack App',
        challenge: 'Pet owners needed a fast way to track medications, vet appointments, and vaccination reminders.',
        solution: 'Developed a cross-platform React Native app with automated local notifications and secure records storage.',
        result: 'Grew to 15,000 active monthly users within three months of launching on iOS and Android.'
      }
    }
  },
  {
    slug: 'branding',
    tag: '03',
    accent: '#ec4899',
    title: 'Branding',
    short: 'Figma, Logo Design, Visual Identity',
    desc: 'Memorable brand identities, logos, guidelines, and visual assets built to communicate trust and authority in your industry.',
    deliverables: ['Logo & brand identity packages', 'Figma design systems', 'Corporate brand guidelines', 'Social media kit designs'],
    deepDive: {
      overview: 'We establish visual systems that build trust. For professional practices like vet clinics, trust is the primary converter. Our designs reflect authority, warmth, and modern technical capability.',
      techStack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects'],
      process: [
        { step: '1', title: 'Brand Discovery', desc: 'Uncovering the values, target demographic, and emotional connection of your brand.' },
        { step: '2', title: 'Moodboarding', desc: 'Defining the color palettes, typography rules, and photographic styling.' },
        { step: '3', title: 'Logo Conception', desc: 'Iterating on logo marks that are scalable, legible, and timeless.' },
        { step: '4', title: 'Asset Handoff', desc: 'Delivering design system components and comprehensive guidelines.' }
      ],
      caseStudy: {
        client: 'Apex Business Consulting',
        challenge: 'Outdated brand identity that failed to represent their sophisticated, data-driven approach to strategy.',
        solution: 'Designed a premium, minimalist brand system featuring a geometric logo, deep slate/emerald palette, and clean editorial type.',
        result: 'Helped close three major enterprise clients within the first month of deploying the rebranded assets.'
      }
    }
  },
  {
    slug: 'digital-marketing',
    tag: '04',
    accent: '#f97316',
    title: 'Digital Marketing',
    short: 'Google Ads, Meta Ads, Analytics',
    desc: 'Data-driven paid ads, social campaigns, and strategic funnels built to connect veterinary practices and businesses with their target audience.',
    deliverables: ['Google Search & Display Ads', 'Meta lead generation ads', 'Strategic conversion funnels', 'Interactive analytics dashboards'],
    deepDive: {
      overview: 'We engineer campaigns that convert attention into revenue. By targeting local intent (e.g. "emergency vet near me" or "business consultant in Lahore"), we direct high-intent traffic directly to optimized landing pages.',
      techStack: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'GTM', 'HubSpot'],
      process: [
        { step: '1', title: 'Audience Research', desc: 'Identifying consumer personas, local demand maps, and search queries.' },
        { step: '2', title: 'Funnel Construction', desc: 'Creating high-converting landing pages specifically designed for ad traffic.' },
        { step: '3', title: 'Campaign Setup', desc: 'Writing copy, designing visual creatives, and targeting demographic segments.' },
        { step: '4', title: 'A/B Optimization', desc: 'Iterating on headlines, budgets, and bid strategies to lower cost-per-acquisition.' }
      ],
      caseStudy: {
        client: 'Companion Animal Hospital',
        challenge: 'Inconsistent patient onboarding rates during off-peak seasons.',
        solution: 'Deployed geotargeted Google Search campaigns with customized emergency service landers.',
        result: '2.5× increase in emergency admissions and a stable, predictable stream of new clients monthly.'
      }
    }
  },
  {
    slug: 'seo',
    tag: '05',
    accent: '#10b981',
    title: 'SEO',
    short: 'Local SEO, Technical SEO, Keywords',
    desc: 'Strategic local and global search engine optimization designed to rank your services at the top of Google and attract high-intent clients.',
    deliverables: ['Local Google Maps optimization', 'In-depth keyword auditing', 'On-page SEO optimization', 'Backlink building strategies'],
    deepDive: {
      overview: 'Search engines are the primary way local services are found. We audit your codebase for Core Web Vitals, restructure content to address high-volume queries, and build authority signals that Google rewards with top rankings.',
      techStack: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console', 'Schema Markup'],
      process: [
        { step: '1', title: 'Technical Audit', desc: 'Resolving crawl errors, site indexation blocks, and core web vitals bottlenecks.' },
        { step: '2', title: 'Keyword Mapping', desc: 'Finding high-intent terms used by prospective clients.' },
        { step: '3', title: 'Content Restructuring', desc: 'Adding semantic headings, structured FAQ schema, and localized text.' },
        { step: '4', title: 'Authority Building', desc: 'Securing quality mentions and listings to drive local map pack rankings.' }
      ],
      caseStudy: {
        client: 'Metro Vet Clinic',
        challenge: 'Unranked in their metropolitan area for core veterinary search queries, trailing behind competitors.',
        solution: 'Implemented structured clinic schema, optimized the Google Business Profile, and built local landing hubs.',
        result: 'Ranked #1 in Google Maps Local Pack for 12 core keywords; traffic increased by 185% year-over-year.'
      }
    }
  },
  {
    slug: 'end-to-end-development',
    tag: '06',
    accent: '#6366f1',
    title: 'End-to-End Development',
    short: 'Full Stack, APIs, Cloud Deploy',
    desc: 'Complete software development ownership—from initial wireframing and database architecture to final testing and cloud deployment.',
    deliverables: ['Database design & optimization', 'Backend API engineering', 'Frontend application design', 'AWS/GCP cloud hosting setup'],
    deepDive: {
      overview: 'We take projects from zero to production. We write clean, modular APIs, structure relational and document-based databases, build highly interactive frontends, and implement CI/CD deployment pipelines on AWS or GCP.',
      techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GitHub Actions'],
      process: [
        { step: '1', title: 'System Architecture', desc: 'Mapping database schemas and service communications.' },
        { step: '2', title: 'Database & API Dev', desc: 'Engineering robust backend endpoints with validation.' },
        { step: '3', title: 'Frontend Integration', desc: 'Connecting user interfaces to database events.' },
        { step: '4', title: 'DevOps & CI/CD', desc: 'Automating testing pipelines and autoscaling rules on cloud nodes.' }
      ],
      caseStudy: {
        client: 'Devnexa Onboard',
        challenge: 'A logistics business struggling with manual partner onboarding and paper workflows.',
        solution: 'Built a customized secure portal with e-signatures, document uploads, and automated CRM webhooks.',
        result: 'Onboarding time fell from 5 days to 20 minutes, reducing administrative overhead by 60%.'
      }
    }
  },
  {
    slug: 'content-writing',
    tag: '07',
    accent: '#06b6d4',
    title: 'Content Writing',
    short: 'Copywriting, SEO Blog, Technical Copy',
    desc: 'Expert copywriting and informative content tailored to educate pet owners and clients, building trust and driving website conversions.',
    deliverables: ['Educational blog writing', 'Website landing page copywriting', 'Email marketing copy', 'Social media content plans'],
    deepDive: {
      overview: 'Content bridges the gap between expertise and client trust. Our writing is clear, scientifically accurate for veterinary clinics, yet accessible and highly persuasive for prospective business clients.',
      techStack: ['Surfer SEO', 'Grammarly', 'Google Docs', 'Hemingway Editor'],
      process: [
        { step: '1', title: 'Content Strategy', desc: 'Developing a roadmap of topics that prospective clients search for.' },
        { step: '2', title: 'Researching', desc: 'Cross-referencing scientific, business, or veterinary data for precision.' },
        { step: '3', title: 'Drafting & Copywriting', desc: 'Writing with voice and tone guidelines, optimizing for SEO readability.' },
        { step: '4', title: 'Editing & Publishing', desc: 'Polishing layout, styling, and adding internal linkages.' }
      ],
      caseStudy: {
        client: 'Healthy Paws blog network',
        challenge: 'Low organic traffic and lack of authority signals on vet health topics.',
        solution: 'Developed a calendar of 24 expert-reviewed articles covering preventive pet health care.',
        result: '50,000+ organic views, resulting in an additional 400 clinic sign-ups via blog CTAs.'
      }
    }
  },
  {
    slug: 'ai-solutions',
    tag: '08',
    accent: '#f59e0b',
    title: 'AI Solutions',
    short: 'AI Agents, n8n Workflows, LLMs',
    desc: 'Intelligent automation, custom AI agents, and workflow integrations built to optimize operations and reduce repetitive overhead.',
    deliverables: ['Custom LLM integrations', 'n8n & Make automated workflows', 'Customer support AI agents', 'Data enrichment workflows'],
    deepDive: {
      overview: 'AI is changing operations. We map manual bottlenecks, design automated agent pipelines that connect to your business databases, and deploy custom tools that handle scheduling, lead classification, and automatic response generation.',
      techStack: ['n8n', 'Make.com', 'LangChain', 'OpenAI API', 'Vector Databases', 'Python'],
      process: [
        { step: '1', title: 'Process Auditing', desc: 'Identifying repetitive, high-frequency human tasks suitable for automation.' },
        { step: '2', title: 'Agent Prototyping', desc: 'Setting up LLM prompts, context injection, and system APIs.' },
        { step: '3', title: 'Workflow Integration', desc: 'Connecting agent scripts to n8n, databases, and messaging tools.' },
        { step: '4', title: 'Testing & Guardrails', desc: 'Ensuring outputs are accurate, secure, and operate within preset constraints.' }
      ],
      caseStudy: {
        client: 'Global Leads Corp',
        challenge: 'Sales staff spent hours classifying incoming leads and manually typing follow-up emails.',
        solution: 'Implemented an automated n8n pipeline that processes lead records with GPT-4 and prepares drafts in Gmail.',
        result: 'Saved 3.5 hours per salesperson daily and boosted lead response rates by 70%.'
      }
    }
  }
];
