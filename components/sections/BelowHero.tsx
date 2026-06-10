'use client';
import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';

/* ── Design tokens ─────────────────────────────── */
const D = '#09090b';          // charcoal
const L = '#faf9f6';          // bone white
const B = '1px solid rgba(9,9,11,0.08)';  // standard border

/* ── Lucide-style SVG icons ─────────────────────── */
const icons = {
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  smartphone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  pen: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  trending: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  cloud: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  'Web Development','Mobile Apps','SaaS Platforms','AI Automation',
  'Brand Identity','UI / UX Design','SEO & Content','Digital Marketing',
  'Outsourcing','Cloud Solutions','E-Commerce','CRM & ERP',
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderTop: B, borderBottom: B, padding: '14px 0', background: 'rgba(9,9,11,0.012)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {doubled.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '3rem', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.38)', fontFamily: 'var(--font-mono)' }}>
            {t}
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(9,9,11,0.2)', flexShrink: 0, display: 'inline-block' }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════ */
const SERVICES = [
  { icon: icons.globe,     accent: '#3b82f6', title: 'Web Development',      desc: 'Blazing-fast websites and web apps—from landing pages to complex portals—built to convert and scale.', tags: ['React', 'Next.js', 'Laravel', 'WordPress'] },
  { icon: icons.smartphone,accent: '#8b5cf6', title: 'Mobile Apps',           desc: 'Cross-platform iOS & Android apps that feel native, perform flawlessly, and scale effortlessly.',       tags: ['React Native', 'Flutter', 'Expo'] },
  { icon: icons.layers,    accent: '#10b981', title: 'SaaS Development',      desc: 'End-to-end SaaS platforms: multi-tenancy, auth, billing, dashboards, and full API layers.',             tags: ['Multi-tenant', 'Stripe', 'Subscriptions'], highlight: true },
  { icon: icons.zap,       accent: '#f59e0b', title: 'AI & Automation',       desc: 'Custom AI agents, chatbots, workflow automation, scraping pipelines, and LLM integrations.',            tags: ['LLM', 'n8n', 'Make', 'Python'] },
  { icon: icons.pen,       accent: '#ec4899', title: 'Branding & UI/UX',      desc: 'Logos, design systems, and interfaces that make people feel something—and trust you enough to act.',     tags: ['Figma', 'Brand Identity', 'Design Systems'] },
  { icon: icons.trending,  accent: '#f97316', title: 'Digital Marketing',     desc: 'Organic growth, paid ads, content strategy, and social media management that drives real traffic.',      tags: ['SEO', 'Google Ads', 'Meta Ads', 'Content'] },
  { icon: icons.users,     accent: '#06b6d4', title: 'Outsourcing & Teams',   desc: 'Dedicated developers, designers, or marketers long-term—vetted talent that integrates with your workflow.', tags: ['Dedicated Teams', 'Staff Aug', 'White Label'] },
  { icon: icons.cloud,     accent: '#6366f1', title: 'Cloud, CRM & ERP',      desc: 'Cloud migrations, CRM customisation, and ERP integrations that eliminate operational chaos entirely.',    tags: ['AWS', 'HubSpot', 'Odoo', 'Firebase'] },
];

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 30, y: 30 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setCoords({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <FadeUp delay={i * 0.04} margin="-80px" style={{ height: '100%' }}>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMove}
        animate={{
          backgroundColor: hovered ? `rgba(${hexToRgb(s.accent)}, 0.035)` : '#ffffff',
        }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'relative', height: '100%', padding: '1.875rem',
          display: 'flex', flexDirection: 'column', gap: '1.125rem',
          cursor: 'default', overflow: 'hidden',
        }}
      >
        {/* ── cursor-tracking neon spotlight ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 400ms ease',
            background: `radial-gradient(320px circle at ${coords.x}% ${coords.y}%, rgba(${hexToRgb(s.accent)}, 0.13) 0%, transparent 65%)`,
          }}
        />

        {/* ── corner neon bloom ── */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: '-40px', left: '-40px',
            width: '220px', height: '220px', borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${hexToRgb(s.accent)}, 0.18) 0%, transparent 70%)`,
            filter: 'blur(28px)', pointerEvents: 'none',
          }}
        />

        {/* ── top accent border glow ── */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: '8%', right: '8%', height: '1.5px',
            background: `linear-gradient(90deg, transparent, ${s.accent}cc, transparent)`,
            pointerEvents: 'none',
          }}
        />

        {/* ── shimmer sweep ── */}
        <motion.div
          aria-hidden
          initial={{ x: '-120%', opacity: 0 }}
          animate={hovered ? { x: '260%', opacity: 0.08 } : { x: '-120%', opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '50%', height: '100%', pointerEvents: 'none',
            background: `linear-gradient(105deg, transparent 15%, rgba(${hexToRgb(s.accent)}, 0.55) 50%, transparent 85%)`,
            transform: 'skewX(-14deg)',
          }}
        />

        {/* ── Popular badge ── */}
        {s.highlight && (
          <motion.span
            animate={{ background: hovered ? s.accent : D }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.58rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', padding: '3px 10px', borderRadius: '9999px' }}
          >
            Popular
          </motion.span>
        )}

        {/* ── Coloured icon box ── */}
        <motion.div
          animate={{
            backgroundColor: hovered ? `rgba(${hexToRgb(s.accent)}, 0.14)` : 'rgba(9,9,11,0.04)',
            borderColor:     hovered ? `rgba(${hexToRgb(s.accent)}, 0.45)` : 'rgba(9,9,11,0.08)',
            boxShadow:       hovered ? `0 0 20px rgba(${hexToRgb(s.accent)}, 0.35), 0 0 6px rgba(${hexToRgb(s.accent)}, 0.2)` : '0 0 0 transparent',
          }}
          transition={{ duration: 0.35 }}
          style={{
            width: '46px', height: '46px', borderRadius: '13px',
            border: '1px solid rgba(9,9,11,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: s.accent, flexShrink: 0,
          }}
        >
          {s.icon}
        </motion.div>

        <div style={{ flex: 1 }}>
          <motion.h3
            animate={{ color: hovered ? s.accent : D }}
            transition={{ duration: 0.25 }}
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '-0.02em', marginBottom: '0.5rem', lineHeight: 1.25 }}
          >
            {s.title}
          </motion.h3>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.7 }}>{s.desc}</p>
        </div>

        {/* ── Coloured tags on hover ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingTop: '0.25rem' }}>
          {s.tags.map(t => (
            <motion.span
              key={t}
              animate={{
                borderColor: hovered ? `rgba(${hexToRgb(s.accent)}, 0.4)` : 'rgba(9,9,11,0.08)',
                color:       hovered ? s.accent : 'rgba(9,9,11,0.5)',
              }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', border: '1px solid rgba(9,9,11,0.08)', padding: '3px 9px', borderRadius: '9999px' }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* hex → 'r, g, b' for use inside rgba() */
function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function Services() {
  return (
    <section id="services" className="section" style={{ background: L }}>
      <div className="dn-container">
        <FadeUp margin="-80px" style={{ marginBottom: '4rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>What we do</p>
          <h2 className="type-display" style={{ color: D, marginBottom: '1.125rem' }}>
            Every digital service.<br />
            <span style={{ color: 'rgba(9,9,11,0.3)' }}>Under one roof.</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(9,9,11,0.6)', maxWidth: '540px', lineHeight: 1.72 }}>
            From a simple website to a full AI-powered SaaS product — strategy, design, code, and growth, handled end-to-end by one team.
          </p>
        </FadeUp>

        <StaggerList stagger={0.05} delayChildren={0.05} margin="-80px" className="dn-services-grid" style={{ gap: '1px', background: 'rgba(9,9,11,0.08)', borderRadius: '20px', overflow: 'hidden', border: B }}>
          {SERVICES.map((s, i) => (
            <StaggerItem key={s.title}><ServiceCard s={s} i={i} /></StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   COMPLETE SOLUTION
══════════════════════════════════════════════════ */
const PILLARS = [
  { num: '01', title: 'One team, full ownership',     body: 'No handoffs, no finger-pointing. Strategy, design, development, and growth live in the same room.' },
  { num: '02', title: 'From idea to revenue',         body: "We don't just build and disappear. We scope, design, ship, and iterate until your product generates results." },
  { num: '03', title: 'Human-first thinking',         body: 'Tech should feel invisible. We obsess over the experience your users actually have, not just the code behind it.' },
  { num: '04', title: 'Outsource everything digital', body: 'Treat us as your embedded digital department. Dev, design, marketing, AI, cloud—dial up or down as you grow.' },
];

function CompleteSolution() {
  return (
    <section id="about-us" className="section" style={{ background: L, borderTop: B }}>
      <div className="dn-container">
        <div className="dn-solution-grid">
          {/* Left — sticky on desktop */}
          <div className="dn-solution-sticky">
            <FadeUp margin="-80px">
              <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>Why DevNexa</p>
              <h2 className="type-display" style={{ color: D, marginBottom: '1.25rem' }}>
                The complete<br />
                <span style={{ color: 'rgba(9,9,11,0.3)' }}>digital partner.</span>
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.72, maxWidth: '380px' }}>
                Most agencies do one thing. We cover the entire digital lifecycle—so you never stitch five vendors together to launch one product.
              </p>

              {/* Stats */}
              <div className="dn-stats-grid">
                {[{ n: '50+', l: 'Projects live' }, { n: '8+', l: 'Service lines' }, { n: '100%', l: 'End-to-end' }].map(s => (
                  <div key={s.l} style={{ border: B, borderRadius: '14px', padding: '1.25rem 1rem', background: 'rgba(9,9,11,0.018)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em', color: D, lineHeight: 1, marginBottom: '4px' }}>{s.n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — pillars */}
          <div style={{ borderTop: B }}>
            {PILLARS.map((p, i) => (
              <FadeUp key={p.num} delay={i * 0.06} margin="-80px">
                <div style={{ padding: '2rem 0', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderBottom: B }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(9,9,11,0.3)', paddingTop: '5px', flexShrink: 0 }}>{p.num}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.5rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72 }}>{p.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PROCESS
══════════════════════════════════════════════════ */
const STEPS = [
  { n: '01', title: 'Discovery call',   body: 'We learn your business, users, and goals before opening any tool. No cookie-cutter proposals.' },
  { n: '02', title: 'Scope & strategy', body: 'Clear deliverables, timeline, and cost estimate. You approve before anything starts.' },
  { n: '03', title: 'Design & build',   body: 'Design, development, and content move together in one sprint—no handoff delays.' },
  { n: '04', title: 'Launch & grow',    body: 'We ship with you, then stay on to optimise, market, and scale as your business evolves.' },
];

function Process() {
  return (
    <section className="section" style={{ background: L, borderTop: B }}>
      <div className="dn-container">
        <FadeUp margin="-80px" style={{ marginBottom: '4rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>How we work</p>
          <h2 className="type-display" style={{ color: D }}>
            Idea to live product.<br />
            <span style={{ color: 'rgba(9,9,11,0.3)' }}>No drama.</span>
          </h2>
        </FadeUp>

        <StaggerList stagger={0.07} margin="-80px" className="dn-process-grid" style={{ border: B, borderRadius: '20px', overflow: 'hidden' }}>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.n}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(9,9,11,0.018)' }}
                transition={{ duration: 0.22 }}
                style={{ position: 'relative', height: '100%', minHeight: '220px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#ffffff', cursor: 'default', overflow: 'hidden', borderRight: i < 3 ? B : 'none' }}
                className="dn-process-card"
              >
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '4.5rem', lineHeight: 1, letterSpacing: '-0.05em', color: 'rgba(9,9,11,0.048)', userSelect: 'none', pointerEvents: 'none' }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72 }}>{s.body}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="section" style={{ background: L, borderTop: B }}>
      <div className="dn-container" style={{ textAlign: 'center' }}>
        <FadeUp margin="-80px">
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Let's talk</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: D, marginBottom: '1.5rem' }}>
            Ready to humanize<br />
            <span style={{ color: 'rgba(9,9,11,0.28)' }}>your digital presence?</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72, maxWidth: '460px', margin: '0 auto 2.5rem' }}>
            Tell us what you're building — or what's broken. We'll scope it, price it fairly, and get to work fast.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <a
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: D, color: '#ffffff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', transition: 'transform 150ms ease, box-shadow 250ms ease', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(9,9,11,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''; }}
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#our-work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', border: '1px solid rgba(9,9,11,0.15)', color: 'rgba(9,9,11,0.7)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', transition: 'transform 150ms ease, background 200ms ease', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(9,9,11,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
            >
              See our work
            </a>
          </div>

          <p style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(9,9,11,0.36)', letterSpacing: '0.06em' }}>
            Or email us at{' '}
            <a href="mailto:contact@devnexa.dev" style={{ color: 'rgba(9,9,11,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>contact@devnexa.dev</a>
            {' '}· WhatsApp{' '}
            <a href="https://wa.me/923003386392" style={{ color: 'rgba(9,9,11,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>+92 300 338 6392</a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   RESPONSIVE STYLES (embedded — avoids Tailwind v4
   @layer specificity issues with custom CSS vars)
══════════════════════════════════════════════════ */
const RESPONSIVE_CSS = `
  /* Services 4-col bento grid */
  .dn-services-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
  }

  /* Process 4-col strip */
  .dn-process-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
  }

  /* Complete Solution 2-col */
  .dn-solution-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }
  .dn-solution-sticky {
    position: sticky;
    top: 7rem;
  }

  /* Stats 3-col */
  .dn-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2.5rem;
  }

  /* ── Tablet (≤1024px) ── */
  @media (max-width: 1024px) {
    .dn-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .dn-process-grid  { grid-template-columns: repeat(2, 1fr) !important; }
    .dn-solution-grid { grid-template-columns: 1fr; gap: 3rem; }
    .dn-solution-sticky { position: static; top: auto; }
    .dn-process-card { border-right: none !important; border-bottom: 1px solid rgba(9,9,11,0.08); }
  }

  /* ── Mobile (≤640px) ── */
  @media (max-width: 640px) {
    .dn-services-grid { grid-template-columns: 1fr !important; }
    .dn-process-grid  { grid-template-columns: 1fr !important; }
  }
`;

/* ══════════════════════════════════════════════════
   DEFAULT EXPORT
══════════════════════════════════════════════════ */
export default function BelowHero() {
  return (
    <>
      <style>{RESPONSIVE_CSS}</style>
      <Ticker />
      <Services />
      <CompleteSolution />
      <Process />
      <CTA />
    </>
  );
}
