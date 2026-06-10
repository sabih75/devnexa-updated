'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { StaggerList, StaggerItem, SplitText, FadeUp } from '@/components/ui/ScrollReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    id: 'instant-deploy',
    size: 'large',
    eyebrow: '01 — Deploy',
    title: 'Ship in seconds,\nnot hours.',
    body: 'One-command deploys to any cloud. Canary, blue-green, and rollback built in. No YAML ceremony.',
    icon: <RocketIcon />,
    accent: false,
    tag: 'Most popular',
  },
  {
    id: 'realtime-collab',
    size: 'small',
    eyebrow: '02 — Collaborate',
    title: 'Real-time pair coding',
    body: 'Live cursors, inline review, and shared terminals — as natural as being in the same room.',
    icon: <CollabIcon />,
    accent: false,
  },
  {
    id: 'observability',
    size: 'small',
    eyebrow: '03 — Observe',
    title: 'Full-stack observability',
    body: 'Traces, logs, and metrics unified. Spot regressions before your users do.',
    icon: <EyeIcon />,
    accent: false,
  },
  {
    id: 'security',
    size: 'tall',
    eyebrow: '04 — Security',
    title: 'Zero-trust\nby default.',
    body: 'Automatic secret scanning, SBOM generation, and policy-as-code enforcement on every merge.',
    icon: <ShieldIcon />,
    accent: false,
  },
  {
    id: 'ai-assist',
    size: 'wide',
    eyebrow: '05 — AI',
    title: 'AI co-pilot embedded in your workflow',
    body: 'Code review, test generation, incident RCA, and PR summaries — all context-aware.',
    icon: <AIIcon />,
    accent: true,
    tag: 'New',
  },
  {
    id: 'integrations',
    size: 'small',
    eyebrow: '06 — Integrations',
    title: '200+ native integrations',
    body: 'Connect Jira, Slack, Datadog, PagerDuty, and more — in one click.',
    icon: <PlugIcon />,
    accent: false,
  },
];

const sizeMap: Record<string, React.CSSProperties> = {
  large: { gridColumn: 'span 2', gridRow: 'span 2' },
  small: {},
  tall:  { gridRow: 'span 2' },
  wide:  { gridColumn: 'span 2' },
};

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  /* Subtle background parallax */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY  = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section"
      aria-labelledby="features-heading"
      style={{ background: '#faf9f6', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Subtle 3D ambient background orb ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Large radial orb top-right */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(9,9,11,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        {/* Bottom-left smaller orb */}
        <div style={{
          position: 'absolute', bottom: '0', left: '-5%',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(9,9,11,0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(9,9,11,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }} />
      </motion.div>

      <div className="dn-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header with SplitText ── */}
        <div ref={headRef} style={{ marginBottom: '4rem', maxWidth: '620px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE as any }}
            style={{ marginBottom: '1rem' }}
          >
            Everything you need
          </motion.p>

          <h2
            id="features-heading"
            className="type-display"
            style={{ color: '#09090b', marginBottom: '1.25rem', overflow: 'hidden' }}
          >
            <SplitText
              text="Built for teams who don't settle."
              delay={0.1}
              stagger={0.04}
              margin="-80px"
            />
          </h2>

          <FadeUp delay={0.4} margin="-80px">
            <p style={{ fontSize: '1.0625rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.7 }}>
              Every feature is designed to remove friction — so your team can focus on
              what actually matters: building great software.
            </p>
          </FadeUp>
        </div>

        {/* ── Bento Grid with staggered card reveals ── */}
        <StaggerList
          stagger={0.07}
          delayChildren={0.05}
          margin="-80px"
          className="dn-features-grid"
          style={{
            gap: '1px',
            background: 'rgba(9,9,11,0.08)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(9,9,11,0.08)',
          }}
          role="list"
          aria-label="Features"
        >
          {features.map((f, idx) => (
            <StaggerItem
              key={f.id}
              className={`dn-features-card-${f.size}`}
              style={{ display: 'flex' }}
            >
              <FeatureCard f={f} />
            </StaggerItem>
          ))}
        </StaggerList>
      </div>

      <style>{`
        .dn-features-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .dn-features-card-large { grid-column: span 2; grid-row: span 2; }
        .dn-features-card-small { }
        .dn-features-card-tall { grid-row: span 2; }
        .dn-features-card-wide { grid-column: span 2; }

        @media (max-width: 1024px) {
          .dn-features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dn-features-card-large { grid-column: span 2; grid-row: span 1; }
          .dn-features-card-wide { grid-column: span 2; }
          .dn-features-card-tall { grid-row: span 1; }
        }

        @media (max-width: 640px) {
          .dn-features-grid {
            grid-template-columns: 1fr !important;
          }
          .dn-features-card-large { grid-column: span 1 !important; grid-row: span 1 !important; }
          .dn-features-card-wide { grid-column: span 1 !important; grid-row: span 1 !important; }
          .dn-features-card-tall { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Individual card with hover 3D tilt ── */
function FeatureCard({ f }: { f: (typeof features)[0] }) {
  const isLarge = f.size === 'large' || f.size === 'tall';

  return (
    <motion.article
      role="listitem"
      style={{
        width: '100%',
        padding: isLarge ? '2.5rem' : '2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: f.size === 'small' ? '220px' : f.size === 'wide' ? '200px' : '280px',
        background: f.accent ? 'rgba(9,9,11,0.02)' : '#ffffff',
      }}
      whileHover={{
        backgroundColor: f.accent ? 'rgba(9,9,11,0.04)' : '#fafafa',
        transition: { duration: 0.25 },
      }}
    >
      {/* Shine sweep on hover */}
      <motion.div
        aria-hidden
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '200%', opacity: 0.06 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '60%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(9,9,11,1), transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Accent featured card glow */}
      {f.accent && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(9,9,11,0.02) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + optional tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <p className="eyebrow" style={{ margin: 0 }}>{f.eyebrow}</p>
          {f.tag && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: '9999px',
              background: '#09090b',
              color: '#fff',
            }}>
              {f.tag}
            </span>
          )}
        </div>

        {/* Icon */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: f.accent ? 'rgba(9,9,11,0.06)' : 'rgba(9,9,11,0.03)',
          border: '1px solid rgba(9,9,11,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.25rem', color: '#09090b',
        }}>
          {f.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: isLarge ? 'clamp(1.4rem, 2.5vw, 1.85rem)' : '1.125rem',
          letterSpacing: '-0.03em',
          color: '#09090b',
          lineHeight: 1.2,
          marginBottom: '0.875rem',
          whiteSpace: 'pre-line',
        }}>
          {f.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: '0.9rem', color: 'rgba(9,9,11,0.55)',
          lineHeight: 1.65,
          maxWidth: f.size === 'wide' ? '420px' : '100%',
        }}>
          {f.body}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: '7px 16px', fontSize: '0.75rem' }}
          aria-label={`Learn more about ${f.title.replace('\n', ' ')}`}
        >
          Learn more →
        </button>
      </div>
    </motion.article>
  );
}

/* ── Icons ── */
function RocketIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>; }
function CollabIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function EyeIcon()     { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function ShieldIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function AIIcon()      { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7.5 14a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm6 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/></svg>; }
function PlugIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 6l-6 6"/><path d="M13 11l-7 7a2 2 0 0 0 3 3l7-7"/><path d="M11 13l-7 7a2 2 0 0 0 3 3l7-7"/><path d="M22 7l-5-5"/><path d="M17 3l4 4"/></svg>; }
