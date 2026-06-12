'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { SERVICES_LIST, ServiceDetail } from '@/lib/servicesData';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const ICON_MAP: Record<string, React.ReactNode> = {
  'web-development': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'mobile-development': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  'branding': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  'digital-marketing': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  'seo': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  'end-to-end-development': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 17 22 12"/>
    </svg>
  ),
  'content-writing': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'ai-solutions': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

function ServiceCard({ s, i }: { s: ServiceDetail; i: number }) {
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
      <Link href={`/services/${s.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
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
            position: 'relative',
            height: '100%',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            cursor: 'pointer',
            overflow: 'hidden',
            border: B,
            borderRadius: '20px',
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
              background: `radial-gradient(320px circle at ${coords.x}% ${coords.y}%, rgba(${hexToRgb(s.accent)}, 0.12) 0%, transparent 65%)`,
            }}
          />

          {/* Corner bloom */}
          <motion.div
            aria-hidden
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-40px',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${hexToRgb(s.accent)}, 0.16) 0%, transparent 70%)`,
              filter: 'blur(28px)',
              pointerEvents: 'none',
            }}
          />

          {/* Top border glow */}
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
              background: `linear-gradient(90deg, transparent, ${s.accent}cc, transparent)`,
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '13px',
              border: `1px solid rgba(${hexToRgb(s.accent)}, 0.25)`,
              background: `rgba(${hexToRgb(s.accent)}, 0.06)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: s.accent,
              flexShrink: 0,
            }}>
              {ICON_MAP[s.slug] || ICON_MAP['web-development']}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.35)', marginBottom: '4px' }}>{s.tag}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: D }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(9,9,11,0.4)', marginTop: '2px' }}>{s.short}</p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.7 }}>{s.desc}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingTop: '0.25rem' }}>
            {s.deliverables.slice(0, 3).map(d => (
              <span key={d} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', border: B, color: 'rgba(9,9,11,0.5)', padding: '3px 8px', borderRadius: '9999px' }}>{d}</span>
            ))}
            {s.deliverables.length > 3 && (
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', color: s.accent, padding: '3px 8px', fontWeight: 600 }}>+{s.deliverables.length - 3} more</span>
            )}
          </div>
        </motion.div>
      </Link>
    </FadeUp>
  );
}

export default function ServicesPage() {
  return (
    <PageLayout
      eyebrow="What we do"
      title="Every digital service."
      titleMuted="Under one roof."
      subtitle="From a simple website to a full AI-powered SaaS product — strategy, design, code, and growth handled end-to-end by one embedded team. Click any service to view full deliverables, technology stacks, processes, and case studies."
    >
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <StaggerList stagger={0.05} margin="-80px" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="services-page-grid">
            {SERVICES_LIST.map((s, i) => (
              <StaggerItem key={s.slug}><ServiceCard s={s} i={i} /></StaggerItem>
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
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', marginTop: '1rem' }}>
              Book a free discovery call
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .services-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
