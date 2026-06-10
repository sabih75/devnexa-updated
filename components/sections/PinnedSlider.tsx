'use client';
import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

/* ── Slide data ─────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 'web',
    label: 'Web Development',
    tag: '01',
    headline: 'Blazing-fast websites\nthat convert and scale.',
    body: 'From pixel-perfect landing pages to complex enterprise portals — we build React and Next.js experiences that are fast by default and beautiful by design.',
    stats: [
      { value: '< 1s',  label: 'Load time target' },
      { value: '98+',   label: 'Lighthouse score'  },
      { value: '50+',   label: 'Projects shipped'  },
    ],
    accent: '#3b82f6',
    shape: (
      <svg viewBox="0 0 400 400" fill="none" aria-hidden style={{ width: '100%', height: '100%' }}>
        <circle cx="200" cy="200" r="160" stroke="rgba(59,130,246,0.18)" strokeWidth="1" />
        <circle cx="200" cy="200" r="110" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
        <circle cx="200" cy="200" r="60"  fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        <line x1="200" y1="40"  x2="200" y2="360" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
        <line x1="40"  y1="200" x2="360" y2="200" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'saas',
    label: 'SaaS Platforms',
    tag: '02',
    headline: 'End-to-end SaaS.\nMulti-tenant. Revenue-ready.',
    body: 'Auth, billing, dashboards, API — we scope and ship full SaaS platforms so your team focuses on product, not plumbing. Stripe, Supabase, AWS — all wired.',
    stats: [
      { value: '8+',    label: 'SaaS platforms live'    },
      { value: '100%',  label: 'End-to-end ownership'   },
      { value: '$2M+',  label: 'Client ARR generated'   },
    ],
    accent: '#10b981',
    shape: (
      <svg viewBox="0 0 400 400" fill="none" aria-hidden style={{ width: '100%', height: '100%' }}>
        <rect x="80"  y="80"  width="240" height="240" rx="48" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
        <rect x="120" y="120" width="160" height="160" rx="32" stroke="rgba(16,185,129,0.12)" strokeWidth="1" />
        <rect x="160" y="160" width="80"  height="80"  rx="16" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.22)" strokeWidth="1" />
        <circle cx="200" cy="200" r="8" fill="rgba(16,185,129,0.4)" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    tag: '03',
    headline: 'Custom AI agents\nthat work while you sleep.',
    body: 'LLM-powered chatbots, document AI, n8n workflow automation, and scraping pipelines. We integrate intelligence into your product — not just bolt it on.',
    stats: [
      { value: '15+',  label: 'AI integrations built'  },
      { value: '70%',  label: 'Avg. manual work cut'   },
      { value: '24/7', label: 'Automated operations'   },
    ],
    accent: '#f59e0b',
    shape: (
      <svg viewBox="0 0 400 400" fill="none" aria-hidden style={{ width: '100%', height: '100%' }}>
        <polygon points="200,60 340,280 60,280"   stroke="rgba(245,158,11,0.18)" strokeWidth="1" />
        <polygon points="200,110 300,260 100,260" stroke="rgba(245,158,11,0.12)" strokeWidth="1" />
        <polygon points="200,160 260,240 140,240" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.22)" strokeWidth="1" />
        <circle cx="200" cy="200" r="6" fill="rgba(245,158,11,0.5)" />
      </svg>
    ),
  },
  {
    id: 'brand',
    label: 'Branding & UI/UX',
    tag: '04',
    headline: 'Design systems that\nfeel, not just look.',
    body: 'Logos, Figma design systems, and interfaces that earn trust at first glance. We obsess over every detail — typography, motion, micro-interactions.',
    stats: [
      { value: '30+',   label: 'Brands designed'         },
      { value: '4.9★',  label: 'Client satisfaction'     },
      { value: '100%',  label: 'Figma-to-code fidelity'  },
    ],
    accent: '#ec4899',
    shape: (
      <svg viewBox="0 0 400 400" fill="none" aria-hidden style={{ width: '100%', height: '100%' }}>
        <ellipse cx="200" cy="200" rx="160" ry="100" stroke="rgba(236,72,153,0.18)" strokeWidth="1" />
        <ellipse cx="200" cy="200" rx="100" ry="160" stroke="rgba(236,72,153,0.12)" strokeWidth="1" />
        <ellipse cx="200" cy="200" rx="60"  ry="60"  fill="rgba(236,72,153,0.06)" stroke="rgba(236,72,153,0.22)" strokeWidth="1" />
        <circle  cx="200" cy="200" r="6" fill="rgba(236,72,153,0.5)" />
      </svg>
    ),
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

/* ── Content pane ── */
function SlideContent({ slide }: { slide: typeof SLIDES[0] }) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: EASE as any }}
      style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '3rem 3.5rem 3rem 3rem',
      }}
    >
      {/* Tag line */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: slide.accent, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '24px', height: '1px', background: slide.accent, display: 'inline-block', opacity: 0.6 }} />
        {slide.tag} / {slide.label}
      </div>

      {/* Headline */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', lineHeight: 1.07, color: '#09090b', marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
        {slide.headline}
      </h2>

      {/* Body */}
      <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.78, maxWidth: '420px', marginBottom: '2.5rem' }}>
        {slide.body}
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
        {slide.stats.map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em', color: slide.accent, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginTop: '4px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PINNED SLIDER
   Uses CSS position:sticky + framer-motion useScroll.
   No GSAP — avoids the Lenis / ScrollTrigger proxy conflict.
══════════════════════════════════════════════════════════════ */
export default function PinnedSlider() {
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  /* Track scroll progress through the outer container */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  /* Map progress → slide index without re-rendering every frame */
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(SLIDES.length - 1, Math.floor(v * SLIDES.length));
    setActive(idx);
  });

  const slide = SLIDES[active];

  return (
    /*
      Outer div provides the scroll travel distance.
      height = N slides × 100vh → each slide gets 1 full viewport height of scroll.
      position:relative is required so the sticky child is contained.
    */
    <div
      ref={outerRef}
      id="solutions"
      style={{ position: 'relative', height: `${SLIDES.length * 100}vh` }}
    >
      {/*
        Sticky viewport — stays in view while the outer div scrolls past.
        Pure CSS sticky; no GSAP pin needed.
      */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        background: '#faf9f6',
        borderTop: '1px solid rgba(9,9,11,0.08)',
      }}>

        {/* ── Left sidebar ── */}
        <div
          className="pinned-sidebar"
          style={{ width: '280px', flexShrink: 0, borderRight: '1px solid rgba(9,9,11,0.08)', display: 'flex', flexDirection: 'column', padding: '3rem 2rem', gap: '0.25rem' }}
        >
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>Our solutions</p>

          {SLIDES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                style={{
                  background: isActive ? 'rgba(9,9,11,0.04)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '1rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  transition: 'background 200ms ease',
                  width: '100%',
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                <motion.span
                  animate={{ backgroundColor: isActive ? s.accent : 'rgba(9,9,11,0.15)', scale: isActive ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, display: 'inline-block' }}
                />
                <motion.span
                  animate={{ color: isActive ? '#09090b' : 'rgba(9,9,11,0.45)', fontWeight: isActive ? 600 : 400 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
                >
                  {s.label}
                </motion.span>
              </button>
            );
          })}

          {/* Progress bar */}
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <div style={{ height: '2px', background: 'rgba(9,9,11,0.07)', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${((active + 1) / SLIDES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: EASE as any }}
                style={{ height: '100%', background: slide.accent, borderRadius: '9999px' }}
              />
            </div>
            <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.35)' }}>
              {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* ── Main content pane ── */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}
          className="pinned-main-grid">
          {/* Text side */}
          <div style={{ borderRight: '1px solid rgba(9,9,11,0.06)', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <SlideContent key={slide.id} slide={slide} />
            </AnimatePresence>
          </div>

          {/* Visual side */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'rgba(9,9,11,0.012)' }}>
            {/* Accent radial tint */}
            <AnimatePresence>
              <motion.div
                key={slide.id + '-bg'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(${hexToRgb(slide.accent)}, 0.08) 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
            </AnimatePresence>

            {/* Geometric shape */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + '-shape'}
                initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.65, ease: EASE as any }}
                style={{ width: '320px', height: '320px', maxWidth: '75%', maxHeight: '75%' }}
              >
                {slide.shape}
              </motion.div>
            </AnimatePresence>

            {/* Floating pill label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + '-label'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.12, ease: EASE as any }}
                style={{
                  position: 'absolute', bottom: '2.5rem', right: '2.5rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: slide.accent,
                  border: `1px solid rgba(${hexToRgb(slide.accent)}, 0.28)`,
                  padding: '5px 12px', borderRadius: '9999px',
                  background: `rgba(${hexToRgb(slide.accent)}, 0.06)`,
                }}
              >
                {slide.label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
