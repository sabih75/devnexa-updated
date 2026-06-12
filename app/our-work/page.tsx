'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { PROJECTS_LIST, ProjectDetail } from '@/lib/projectsData';
import Link from 'next/link';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

export default function OurWorkPage() {
  return (
    <PageLayout
      eyebrow="Portfolio"
      title="Work we're proud of."
      titleMuted="Results that speak."
      subtitle="A curated selection of projects across web, mobile, SaaS, AI, branding, and growth — each one scoped, designed, and shipped in-house. Click any card to explore the full case study."
    >
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <StaggerList stagger={0.06} margin="-80px" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="work-grid">
            {PROJECTS_LIST.map((p) => (
              <StaggerItem key={p.title}>
                <Link href={`/our-work/${p.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    style={{ border: B, borderRadius: '20px', padding: '2.25rem', background: '#fff', position: 'relative', overflow: 'hidden', height: '100%', cursor: 'pointer' }}
                  >
                    {/* Accent glow top */}
                    <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`, opacity: 0.7 }} />
                    {/* Radial glow */}
                    <div aria-hidden style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${hexToRgb(p.accent)}, 0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: p.accent, border: `1px solid rgba(${hexToRgb(p.accent)}, 0.3)`, padding: '4px 10px', borderRadius: '9999px', background: `rgba(${hexToRgb(p.accent)}, 0.06)` }}>{p.tag}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(9,9,11,0.35)' }}>{p.year}</span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: D, marginBottom: '0.75rem' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(9,9,11,0.58)', lineHeight: 1.75, marginBottom: '1.75rem' }}>{p.desc}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {p.stack.slice(0, 3).map(t => (
                          <span key={t} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', border: B, color: 'rgba(9,9,11,0.45)', padding: '4px 10px', borderRadius: '9999px' }}>{t}</span>
                        ))}
                        {p.stack.length > 3 && (
                          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: p.accent, padding: '4px 10px', fontWeight: 600 }}>+{p.stack.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#fff', borderTop: B }}>
        <div className="dn-container" style={{ textAlign: 'center' }}>
          <FadeUp margin="-80px">
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Let's add yours</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1rem' }}>
              Your project could be<br /><span style={{ color: 'rgba(9,9,11,0.28)' }}>the next case study.</span>
            </h2>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', marginTop: '1rem' }}>
              Start your project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .work-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
