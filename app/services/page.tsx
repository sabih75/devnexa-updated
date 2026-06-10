'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { useState } from 'react';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const SERVICES_LIST = [
  { tag: '01', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>), accent: '#3b82f6', title: 'Web Development', short: 'React, Next.js, Laravel, WordPress', desc: 'Blazing-fast websites and web apps — from landing pages to complex portals. We build to convert and scale. Every project ships with performance-first architecture, semantic markup, and cross-browser polish.', deliverables: ['Landing pages & marketing sites', 'Web apps & portals', 'E-commerce storefronts', 'CMS integrations'] },
  { tag: '02', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>), accent: '#8b5cf6', title: 'Mobile Apps', short: 'React Native, Flutter, Expo', desc: 'Cross-platform iOS & Android apps that feel native, perform flawlessly, and scale effortlessly. From MVP to App Store — we handle every layer.', deliverables: ['iOS & Android apps', 'Cross-platform (RN/Flutter)', 'App Store submission', 'Push notifications & auth'] },
  { tag: '03', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>), accent: '#10b981', title: 'SaaS Development', short: 'Multi-tenant, Stripe, Supabase', desc: 'End-to-end SaaS platforms: multi-tenancy, auth, billing, dashboards, and full API layers — scoped, designed, and shipped by one team.', deliverables: ['Multi-tenant architecture', 'Stripe billing & subscriptions', 'Admin & user dashboards', 'REST & GraphQL APIs'] },
  { tag: '04', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>), accent: '#f59e0b', title: 'AI & Automation', short: 'LLM, n8n, Python, Make', desc: 'Custom AI agents, chatbots, document processing, workflow automation, and scraping pipelines. We integrate intelligence into your product.', deliverables: ['LLM-powered chatbots', 'n8n / Make automations', 'Document AI pipelines', 'Web scraping & enrichment'] },
  { tag: '05', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>), accent: '#ec4899', title: 'Branding & UI/UX', short: 'Figma, Design Systems, Identity', desc: 'Logos, design systems, and interfaces that make people feel something. We obsess over typography, motion, and micro-interactions.', deliverables: ['Logo & brand identity', 'Figma design systems', 'UI component libraries', 'Motion & interaction design'] },
  { tag: '06', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>), accent: '#f97316', title: 'Digital Marketing', short: 'SEO, Google Ads, Meta Ads', desc: 'Organic growth, paid ads, content strategy, and social media management that drives real traffic and measurable revenue.', deliverables: ['SEO & content strategy', 'Google & Meta paid ads', 'Social media management', 'Analytics & reporting'] },
  { tag: '07', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>), accent: '#06b6d4', title: 'Outsourcing & Teams', short: 'Dedicated Teams, Staff Aug', desc: 'Dedicated developers, designers, or marketers — vetted talent that integrates with your workflow on a long-term retainer.', deliverables: ['Dedicated developer pods', 'Staff augmentation', 'White-label delivery', 'Long-term retainers'] },
  { tag: '08', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>), accent: '#6366f1', title: 'Cloud, CRM & ERP', short: 'AWS, HubSpot, Odoo, Firebase', desc: 'Cloud migrations, CRM customisation, and ERP integrations that eliminate operational chaos and unlock scalable infrastructure.', deliverables: ['AWS / GCP cloud setup', 'HubSpot CRM customisation', 'Odoo ERP implementation', 'Firebase & Supabase backends'] },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

function ServiceCard({ s }: { s: typeof SERVICES_LIST[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen(o => !o)}
      whileHover={{ backgroundColor: `rgba(${hexToRgb(s.accent)}, 0.025)` }}
      transition={{ duration: 0.3 }}
      style={{ border: B, borderRadius: '16px', padding: '2rem', background: '#fff', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
    >
      <motion.div aria-hidden animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${s.accent}cc, transparent)`, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: open ? '1.5rem' : 0 }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '13px', border: `1px solid rgba(${hexToRgb(s.accent)}, 0.25)`, background: `rgba(${hexToRgb(s.accent)}, 0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, flexShrink: 0 }}>{s.icon}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.35)', marginBottom: '4px' }}>{s.tag}</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em', color: D }}>{s.title}</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(9,9,11,0.4)', marginTop: '2px' }}>{s.short}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0, color: 'rgba(9,9,11,0.35)', marginTop: '4px' }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </motion.div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{s.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {s.deliverables.map(d => (
              <span key={d} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', border: `1px solid rgba(${hexToRgb(s.accent)}, 0.35)`, color: s.accent, padding: '4px 10px', borderRadius: '9999px', background: `rgba(${hexToRgb(s.accent)}, 0.06)` }}>{d}</span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <PageLayout
      eyebrow="What we do"
      title="Every digital service."
      titleMuted="Under one roof."
      subtitle="From a simple website to a full AI-powered SaaS product — strategy, design, code, and growth handled end-to-end by one embedded team."
    >
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <StaggerList stagger={0.05} margin="-80px" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="services-page-grid">
            {SERVICES_LIST.map(s => (
              <StaggerItem key={s.tag}><ServiceCard s={s} /></StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#fff', borderTop: B }}>
        <div className="dn-container" style={{ textAlign: 'center' }}>
          <FadeUp margin="-80px">
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Ready to start?</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1.25rem' }}>
              Not sure which service?<br /><span style={{ color: 'rgba(9,9,11,0.28)' }}>We'll figure it out together.</span>
            </h2>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', marginTop: '1rem' }}>
              Book a free discovery call
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .services-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
