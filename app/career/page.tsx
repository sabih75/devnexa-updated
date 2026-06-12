'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const icons = {
  globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  trending: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  dollar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
};

const ROLES = [
  { dept: 'Engineering', accent: '#3b82f6', title: 'Senior Full-Stack Engineer', type: 'Full-time · Remote', desc: 'Build and scale web applications using React, Next.js, Node.js, and PostgreSQL. You\'ll own features end-to-end from design review to production deploy.', reqs: ['3+ years React/Next.js', 'REST & GraphQL APIs', 'PostgreSQL / Supabase', 'CI/CD experience'] },
  { dept: 'Design', accent: '#ec4899', title: 'UI/UX Designer', type: 'Full-time · Remote', desc: 'Create world-class interfaces in Figma — from wireframes to pixel-perfect design systems. You\'ll collaborate directly with engineering and product.', reqs: ['3+ years Figma', 'Design systems experience', 'Interaction design', 'Developer handoff skills'] },
  { dept: 'Marketing', accent: '#f59e0b', title: 'Performance Marketing Specialist', type: 'Full-time · Remote', desc: 'Run paid media campaigns across Google and Meta for our agency clients. Manage budgets from $5K to $100K/month. Own the numbers.', reqs: ['Google Ads certified', 'Meta Ads experience', 'Data-driven mindset', 'CRO knowledge'] },
  { dept: 'Engineering', accent: '#10b981', title: 'Mobile Engineer (React Native)', type: 'Contract · Remote', desc: 'Ship cross-platform iOS & Android apps for our client projects. Experience with Expo, deep linking, push notifications, and App Store releases required.', reqs: ['React Native + Expo', 'iOS & Android publish', 'Zustand / Redux', 'TypeScript'] },
];

const PERKS = [
  { icon: icons.globe,     accent: '#3b82f6', title: '100% Remote',           body: 'Work from anywhere. We\'re a fully distributed team across Pakistan, UAE, and the UK.' },
  { icon: icons.trending,  accent: '#f97316', title: 'Fast Growth',            body: 'Join early. Shape the culture, the processes, and the direction of a high-growth digital agency.' },
  { icon: icons.dollar,    accent: '#10b981', title: 'Competitive Pay',        body: 'Above-market salaries benchmarked against global tech rates — not local averages.' },
  { icon: icons.book,      accent: '#8b5cf6', title: 'Learning Budget',        body: '$500/year for courses, books, or conferences. We invest in your growth.' },
  { icon: icons.clock,     accent: '#06b6d4', title: 'Async-First Culture',   body: 'No pointless meetings. Documented decisions. Deep work is the default.' },
  { icon: icons.target,    accent: '#ec4899', title: 'Ownership & Autonomy',   body: 'You own your domain. No micromanagement — just outcomes.' },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

function RoleCard({ r }: { r: typeof ROLES[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}
      transition={{ duration: 0.25 }}
      style={{
        border: B,
        borderRadius: '20px',
        padding: '2.25rem',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${r.accent}, transparent)`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: r.accent,
              border: `1px solid rgba(${hexToRgb(r.accent)}, 0.25)`,
              padding: '4px 10px',
              borderRadius: '9999px',
              background: `rgba(${hexToRgb(r.accent)}, 0.05)`,
              fontWeight: 600,
            }}>
              {r.dept}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(9,9,11,0.38)' }}>{r.type}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.75rem' }}>{r.title}</h3>
          <p style={{ fontSize: '0.92rem', color: 'rgba(9,9,11,0.58)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{r.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {r.reqs.map(req => (
              <span key={req} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', border: B, color: 'rgba(9,9,11,0.45)', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(9,9,11,0.01)' }}>{req}</span>
            ))}
          </div>
        </div>

        <Link href={`/contact?role=${r.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8125rem', textDecoration: 'none', flexShrink: 0, alignSelf: 'flex-start', transition: 'transform 0.2s ease' }} className="apply-btn">
          Apply now
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
    </motion.div>
  );
}

function PerkCard({ p, i }: { p: typeof PERKS[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setCoords({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      whileHover={{ y: -4, boxShadow: '0 20px 45px rgba(0,0,0,0.04)' }}
      transition={{ duration: 0.3 }}
      style={{
        border: B,
        borderRadius: '20px',
        padding: '2.25rem',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 400ms ease',
          background: `radial-gradient(280px circle at ${coords.x}% ${coords.y}%, rgba(${hexToRgb(p.accent)}, 0.1) 0%, transparent 65%)`,
        }}
      />

      {/* Top line */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${p.accent}cc, transparent)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          border: `1px solid rgba(${hexToRgb(p.accent)}, 0.25)`,
          background: `rgba(${hexToRgb(p.accent)}, 0.05)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: p.accent,
          marginBottom: '1.5rem',
        }}>
          {p.icon}
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.625rem' }}>{p.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.7 }}>{p.body}</p>
      </div>
    </motion.div>
  );
}

export default function CareerPage() {
  return (
    <PageLayout
      eyebrow="Join the team"
      title="Build great things."
      titleMuted="With great people."
      subtitle="We are a small, high-performance collective shipping digital transformations and bespoke software. If you care deeply about your craft and desire meaningful ownership — let's build together."
    >
      {/* Open roles */}
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <FadeUp margin="-80px" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>Open positions</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D }}>
              Current openings
            </h2>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {ROLES.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.06} margin="-80px">
                <RoleCard r={r} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section" style={{ background: '#fff', borderTop: B }}>
        <div className="dn-container">
          <FadeUp margin="-80px" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>Why DevNexa</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D }}>Benefits & perks</h2>
          </FadeUp>
          <StaggerList stagger={0.06} margin="-80px" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="perks-grid">
            {PERKS.map((p, i) => (
              <StaggerItem key={p.title}>
                <PerkCard p={p} i={i} />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* No open role CTA */}
      <section className="section" style={{ background: '#faf9f6', borderTop: B }}>
        <div className="dn-container" style={{ textAlign: 'center' }}>
          <FadeUp margin="-80px">
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Don't see your role?</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.04em', color: D, marginBottom: '0.875rem' }}>
              Send a speculative application.
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72, maxWidth: '460px', margin: '0 auto 2rem' }}>
              If you're exceptional at what you do, we'll make room for you. Drop us a line with your portfolio or GitHub.
            </p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Get in touch
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .perks-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .perks-grid { grid-template-columns: 1fr !important; } }
        .apply-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </PageLayout>
  );
}
