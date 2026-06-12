export interface ProjectDetail {
  slug: string;
  tag: string;
  accent: string;
  title: string;
  year: string;
  desc: string;
  stack: string[];
  deepDive: {
    challenge: string;
    solution: string;
    result: string;
    metrics: string[];
    architecture: string;
  };
}

export const PROJECTS_LIST: ProjectDetail[] = [
  {
    slug: 'talentflow',
    tag: 'SaaS',
    accent: '#3b82f6',
    title: 'TalentFlow',
    year: '2024',
    desc: 'End-to-end recruiting SaaS with applicant tracking, AI-powered resume parsing, and Stripe-billed subscriptions. 2,000+ active users at launch.',
    stack: ['Next.js', 'Supabase', 'Stripe', 'OpenAI'],
    deepDive: {
      challenge: 'HR departments were overwhelmed by manual screening of thousands of resume PDFs, leading to slow hiring times and lost top-tier talent.',
      solution: 'We built a high-speed recruiting dashboard. We integrated OpenAI embeddings to automatically score resumes against job descriptions, and set up multi-tenant organization boundaries and Stripe billing structures.',
      result: 'Average time-to-hire fell from 25 days to 6 days. The application gained over 2,000 active recruiters within the first 30 days of release.',
      metrics: ['2,000+ active users', '76% time-to-hire reduction', '$12k MRR within 60 days'],
      architecture: 'Tailored Next.js frontend deployed on Vercel, connected to a Supabase Postgres database with RLS policies, utilizing Stripe webhooks for instant subscription activation and OpenAI API for extraction models.'
    }
  },
  {
    slug: 'nouraboutique',
    tag: 'E-Commerce',
    accent: '#10b981',
    title: 'NouraBoutique',
    year: '2024',
    desc: 'Premium fashion e-commerce store with a bespoke Figma design system, real-time inventory, and Google Shopping integration. 3× revenue in 6 months.',
    stack: ['Shopify', 'React', 'Figma', 'Google Ads'],
    deepDive: {
      challenge: 'A growing fashion brand faced drop-offs due to a slow, generic store theme and manual inventory discrepancies between physical and online channels.',
      solution: 'Designed a premium, bespoke Figma visual system and implemented a Headless Shopify store with React. Built automated synchronizations between retail POS systems and the web storefront.',
      result: 'The storefront load speed dropped under 1.2s, resulting in a dramatic increase in conversion rate and a tripling of overall monthly revenue.',
      metrics: ['300% revenue growth', 'Sub-1.2s load speed', '4.2% purchase conversion rate'],
      architecture: 'Custom Headless React store communicating with Shopify Admin and Storefront APIs, integrated with Google Ads tags and Facebook CAPI to optimize marketing feedback loops.'
    }
  },
  {
    slug: 'documind-ai',
    tag: 'AI',
    accent: '#f59e0b',
    title: 'DocuMind AI',
    year: '2024',
    desc: 'Document intelligence platform that extracts, summarizes, and routes contracts using GPT-4 and n8n workflows. Cuts legal review time by 70%.',
    stack: ['Python', 'GPT-4', 'n8n', 'FastAPI'],
    deepDive: {
      challenge: 'Corporate legal departments wasted significant human hours sorting, indexing, and validating standard contract clauses against firm policies.',
      solution: 'Developed an automated AI contract auditor. Utilized Python for OCR extraction, n8n for workflow automation pipelines, and GPT-4 to highlight non-compliant clauses.',
      result: 'Attained a 70% reduction in contract review times, eliminating human oversight errors and enabling legal teams to focus on strategic negotiations.',
      metrics: ['70% review time saved', '98.5% extraction accuracy', 'Zero manual entry errors'],
      architecture: 'FastAPI backend processing PDF binaries, integrated with n8n workflow queues for routing alerts to Slack/Email, and utilising custom guardrail prompts over GPT-4.'
    }
  },
  {
    slug: 'novu-labs',
    tag: 'Brand',
    accent: '#ec4899',
    title: 'Novu Labs',
    year: '2023',
    desc: 'Full brand identity for a HealthTech startup — logo, design system, pitch deck, and Webflow site. Funded $1.2M seed round within 3 months.',
    stack: ['Figma', 'Webflow', 'Illustration', 'Motion'],
    deepDive: {
      challenge: 'A biotech startup needed to present complex diagnostic data clearly to non-technical seed investors and build an immediate sense of clinical authority.',
      solution: 'Created an editorial, premium visual identity featuring clean sans-serif typography, structured grid systems, and smooth Webflow landing pages built with interactive Lottie animations.',
      result: 'Armed with the brand kit, deck designs, and site launch, the founders successfully secured a $1.2M seed round within 3 months of launch.',
      metrics: ['$1.2M seed round secured', '100% investor deck rating', '140+ initial partner requests'],
      architecture: 'Bespoke design systems created in Figma, published onto a custom Webflow hosting setup with tailored GSAP and CSS animations for responsive micro-interactions.'
    }
  },
  {
    slug: 'ridesync',
    tag: 'Mobile',
    accent: '#8b5cf6',
    title: 'RideSync',
    year: '2023',
    desc: 'Real-time carpooling app for corporate campuses. React Native, WebSockets for live tracking, and push notifications. 5,000 DAUs after beta.',
    stack: ['React Native', 'WebSockets', 'Firebase', 'Expo'],
    deepDive: {
      challenge: 'A massive corporate campus wanted to reduce parking congestion and carbon footprints by promoting employee carpooling, but lacked a reliable tracking mechanism.',
      solution: 'Engineered a native iOS & Android application. Implemented coordinate WebSockets to coordinate live passenger-driver pickups on interactive campus maps, with automated routing.',
      result: 'Reached over 5,000 daily active users in the first month, dramatically reducing congestion and improving employee commute satisfaction.',
      metrics: ['5,000+ daily active users', '32% parking load reduction', '4.8 App Store rating'],
      architecture: 'React Native app built using Expo SDK, utilizing Firebase Auth and Firestore for fast matching queues, and a WebSocket server in Node.js for tracking coordinates.'
    }
  },
  {
    slug: 'growthpulse',
    tag: 'Marketing',
    accent: '#f97316',
    title: 'GrowthPulse',
    year: '2023',
    desc: 'Performance marketing retainer for a B2B SaaS — Google + Meta ads, SEO content, and CRO. Lowered CAC by 42% and grew MRR from $12K to $85K.',
    stack: ['Google Ads', 'Meta Ads', 'SEO', 'HubSpot'],
    deepDive: {
      challenge: 'A B2B software vendor was burning cash on broad advertising campaigns that yielded high-cost, low-quality leads, threatening their runway.',
      solution: 'Restructured their ad targeting around long-tail technical keywords, built custom conversion landing pages, and implemented automated lead scoring via HubSpot.',
      result: 'Cut CAC by 42% and accelerated MRR growth from $12K to $85K within a 9-month campaign period.',
      metrics: ['Grew MRR from $12k to $85k', '42% CAC reduction', '280% organic traffic increase'],
      architecture: 'Targeted Google & Meta Paid campaigns connected to Webflow conversion funnels, fully instrumented with Google Tag Manager, GA4, and HubSpot marketing automation.'
    }
  }
];
