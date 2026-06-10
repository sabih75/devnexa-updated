'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SplitText, FadeUp } from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    id: 1,
    quote: 'DevNexa cut our deploy pipeline from 40 minutes to under 90 seconds. The rollback feature alone saved us during a production incident last month.',
    name: 'Sarah Chen',
    role: 'VP Engineering · Stripe',
    avatar: 'SC',
    rating: 5,
  },
  {
    id: 2,
    quote: 'We evaluated five platforms. DevNexa won on every dimension: DX, reliability, observability. Our team adopted it in a day.',
    name: 'Marcus Alvarez',
    role: 'CTO · Linear',
    avatar: 'MA',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The AI code-review caught a race condition our whole team missed. It pays for itself on a single incident prevented.',
    name: 'Priya Nair',
    role: 'Lead Engineer · Vercel',
    avatar: 'PN',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Preview environments per PR fundamentally changed how we do QA. Product teams actually use them now. No more staging chaos.',
    name: 'Tom Whitfield',
    role: 'Engineering Manager · Shopify',
    avatar: 'TW',
    rating: 5,
  },
  {
    id: 5,
    quote: 'The observability stack is incredible — distributed traces, log correlation, and anomaly detection all in one pane of glass.',
    name: 'Aiko Tanaka',
    role: 'SRE Lead · Cloudflare',
    avatar: 'AT',
    rating: 5,
  },
  {
    id: 6,
    quote: 'Best developer experience I\'ve shipped with in 10 years. The secret management and env promotion workflow is flawless.',
    name: 'Dmitri Volkov',
    role: 'Platform Engineer · Figma',
    avatar: 'DV',
    rating: 5,
  },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

export default function Security() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{
        background: '#faf9f6',
        borderTop: '1px solid rgba(9,9,11,0.06)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient background grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(9,9,11,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />

      {/* Header */}
      <div className="dn-container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1rem' }}
          >
            Testimonials
          </motion.p>

          <h2
            id="testimonials-heading"
            className="type-display"
            style={{ color: '#09090b', marginBottom: '1.25rem' }}
          >
            <SplitText
              text="Trusted by engineers who ship."
              delay={0.1}
              stagger={0.04}
              margin="-80px"
            />
          </h2>

          <FadeUp delay={0.4} margin="-80px">
            <p style={{
              fontSize: '1.0625rem',
              color: 'rgba(9,9,11,0.6)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Over 50,000 engineers at world-class companies choose DevNexa for their most critical infrastructure.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <MarqueeRow cards={[...row1, ...row1]} direction="left" speed={40} />

      <div style={{ height: '1.25rem' }} />

      {/* Marquee Row 2 — scrolls right */}
      <MarqueeRow cards={[...row2, ...row2]} direction="right" speed={50} />
    </section>
  );
}

function MarqueeRow({
  cards,
  direction,
  speed,
}: {
  cards: typeof testimonials;
  direction: 'left' | 'right';
  speed: number;
}) {
  return (
    <div
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
      role="list"
      aria-label="Testimonials"
    >
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          display: 'flex',
          gap: '1.25rem',
          width: 'max-content',
        }}
      >
        {cards.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  return (
    <motion.article
      role="listitem"
      style={{
        width: '360px',
        flexShrink: 0,
        padding: '1.75rem',
        borderRadius: '20px',
        background: '#ffffff',
        border: '1px solid rgba(9,9,11,0.07)',
        boxShadow: '0 2px 20px rgba(9,9,11,0.04)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 40px rgba(9,9,11,0.10)',
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle top gradient stripe on hover */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(9,9,11,0.15), transparent)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
      />

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }} aria-label="5 out of 5 stars">
        {[...Array(t.rating)].map((_, i) => (
          <motion.svg
            key={i}
            width="13" height="13" viewBox="0 0 24 24" fill="#09090b" aria-hidden
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </motion.svg>
        ))}
      </div>

      <blockquote style={{
        fontSize: '0.9rem',
        color: 'rgba(9,9,11,0.72)',
        lineHeight: 1.72,
        marginBottom: '1.5rem',
        fontStyle: 'normal',
      }}>
        "{t.quote}"
      </blockquote>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        {/* Avatar */}
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: '#09090b',
          border: '1px solid rgba(9,9,11,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontWeight: 700,
          fontSize: '0.65rem', color: '#ffffff',
          letterSpacing: '0.05em', flexShrink: 0,
        }} aria-hidden>
          {t.avatar}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600, fontSize: '0.875rem', color: '#09090b',
          }}>
            {t.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem', color: 'rgba(9,9,11,0.4)', letterSpacing: '0.04em',
          }}>
            {t.role}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
