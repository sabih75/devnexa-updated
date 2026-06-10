'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import Link from 'next/link';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const ROLES = [
  { dept: 'Engineering', accent: '#3b82f6', title: 'Senior Full-Stack Engineer', type: 'Full-time · Remote', desc: 'Build and scale web applications using React, Next.js, Node.js, and PostgreSQL. You\'ll own features end-to-end from design review to production deploy.', reqs: ['3+ years React/Next.js', 'REST & GraphQL APIs', 'PostgreSQL / Supabase', 'CI/CD experience'] },
  { dept: 'Design', accent: '#ec4899', title: 'UI/UX Designer', type: 'Full-time · Remote', desc: 'Create world-class interfaces in Figma — from wireframes to pixel-perfect design systems. You\'ll collaborate directly with engineering and product.', reqs: ['3+ years Figma', 'Design systems experience', 'Interaction design', 'Developer handoff skills'] },
  { dept: 'Marketing', accent: '#f59e0b', title: 'Performance Marketing Specialist', type: 'Full-time · Remote', desc: 'Run paid media campaigns across Google and Meta for our agency clients. Manage budgets from $5K to $100K/month. Own the numbers.', reqs: ['Google Ads certified', 'Meta Ads experience', 'Data-driven mindset', 'CRO knowledge'] },
  { dept: 'Engineering', accent: '#10b981', title: 'Mobile Engineer (React Native)', type: 'Contract · Remote', desc: 'Ship cross-platform iOS & Android apps for our client projects. Experience with Expo, deep linking, push notifications, and App Store releases required.', reqs: ['React Native + Expo', 'iOS & Android publish', 'Zustand / Redux', 'TypeScript'] },
];

const PERKS = [
  { icon: '🌍', title: '100% remote',           body: 'Work from anywhere. We\'re a fully distributed team across Pakistan, UAE, and the UK.' },
  { icon: '🚀', title: 'Fast growth',            body: 'Join early. Shape the culture, the processes, and the direction of a high-growth digital agency.' },
  { icon: '💸', title: 'Competitive pay',        body: 'Above-market salaries benchmarked against global tech rates — not local averages.' },
  { icon: '📚', title: 'Learning budget',        body: '$500/year for courses, books, or conferences. We invest in your growth.' },
  { icon: '🧘 ', title: 'Async-first culture',   body: 'No pointless meetings. Documented decisions. Deep work is the default.' },
  { icon: '🎯', title: 'Ownership & autonomy', body: 'You own your domain. No micromanagement — just outcomes.' },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

export default function CareerPage() {
  return (
    <PageLayout
      eyebrow="Join the team"
      title="Build great things."
      titleMuted="With great people."
      subtitle="We're a small, high-output team that ships real products for real businesses. If you care about craft and want meaningful ownership — let's talk."
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
                <motion.div
                  whileHover={{ backgroundColor: `rgba(${hexToRgb(r.accent)}, 0.02)`, borderColor: `rgba(${hexToRgb(r.accent)}, 0.25)` }}
                  transition={{ duration: 0.25 }}
                  style={{ border: B, borderRadius: '16px', padding: '2rem', background: '#fff', position: 'relative', overflow: 'hidden' }}
                >
                  <div aria-hidden style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${r.accent}aa, transparent)`, opacity: 0.6 }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: r.accent, border: `1px solid rgba(${hexToRgb(r.accent)}, 0.3)`, padding: '3px 9px', borderRadius: '9999px', background: `rgba(${hexToRgb(r.accent)}, 0.06)` }}>{r.dept}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(9,9,11,0.4)' }}>{r.type}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.75rem' }}>{r.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.72, marginBottom: '1rem' }}>{r.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {r.reqs.map(req => (
                          <span key={req} style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', border: B, color: 'rgba(9,9,11,0.45)', padding: '3px 9px', borderRadius: '9999px' }}>{req}</span>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 22px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'none', flexShrink: 0, alignSelf: 'flex-start' }}>
                      Apply now
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>
                </motion.div>
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
            {PERKS.map(p => (
              <StaggerItem key={p.title}>
                <div style={{ border: B, borderRadius: '16px', padding: '1.75rem', background: '#faf9f6', height: '100%' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{p.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72 }}>{p.body}</p>
                </div>
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
      `}</style>
    </PageLayout>
  );
}
