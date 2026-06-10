'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SplitText, FadeUp, SlideIn } from '@/components/ui/ScrollReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: '01',
    title: 'Connect your repo',
    body: 'Link GitHub, GitLab, or Bitbucket in seconds. DevNexa instantly maps your codebase and detects your stack.',
    code: '$ devnexa connect github.com/myorg/api\n✓ Detected: Next.js 16 + PostgreSQL\n✓ Pipeline ready in 3s',
    stat: '3s',
    statLabel: 'avg. connect time',
  },
  {
    num: '02',
    title: 'Push to preview',
    body: 'Every pull request gets an isolated preview environment with a unique URL — automatically, on every push.',
    code: '$ git push origin feature/payments\n→ Preview: https://feature-payments.devnexa.app\n→ Tests: 247 passed in 18s',
    stat: '18s',
    statLabel: 'test suite runtime',
  },
  {
    num: '03',
    title: 'Merge and ship',
    body: 'One approval, one merge. Automatic canary rollout with instant rollback if error rates spike.',
    code: '$ devnexa deploy --canary 10%\n✓ Canary healthy (0 errors)\n✓ Full rollout complete → 42ms',
    stat: '42ms',
    statLabel: 'p99 deploy latency',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section"
      aria-labelledby="hiw-heading"
      style={{ background: '#0f0f11', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Dark 3D ambient background ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Deep orbs */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="dn-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.5)' }}
          >
            How it works
          </motion.p>

          <h2
            id="hiw-heading"
            className="type-display"
            style={{ color: '#ffffff', marginBottom: '1.25rem' }}
          >
            <SplitText
              text="From commit to production in three steps."
              delay={0.1}
              stagger={0.035}
              margin="-80px"
            />
          </h2>

          <FadeUp delay={0.5} margin="-80px">
            <p style={{
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              No ops babysitting. No deployment runbooks. Just write code and let DevNexa handle the rest.
            </p>
          </FadeUp>
        </div>

        {/* ── Steps with animated vertical progress line ── */}
        <div style={{ position: 'relative' }}>

          {/* Animated vertical line */}
          <div
            className="dn-hiw-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0, bottom: 0,
              width: '1px',
              background: 'rgba(255,255,255,0.06)',
              transform: 'translateX(-50%)',
            }}
          />
          <motion.div
            className="dn-hiw-line-active"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '1px',
              height: lineH,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.05))',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {steps.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
      className="dn-hiw-row"
      style={{
        gap: '2px',
        borderRadius:
          index === 0 ? '20px 20px 0 0'
          : index === steps.length - 1 ? '0 0 20px 20px'
          : '0',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        borderBottom: index < steps.length - 1 ? 'none' : undefined,
      }}
    >
      {/* Text panel */}
      <SlideIn from={isEven ? 'left' : 'right'} delay={index * 0.1 + 0.1} margin="-60px" style={{ display: 'contents' }}>
        <div
          className="dn-hiw-text-panel"
          style={{
            padding: '3rem',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '1.25rem',
            display: 'block',
          }}>
            {step.num}
          </span>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.35rem, 2vw, 1.8rem)',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: '360px',
            marginBottom: '1.5rem',
          }}>
            {step.body}
          </p>
          {/* Mini stat */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            width: 'fit-content',
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#ffffff',
              letterSpacing: '-0.03em',
            }}>{step.stat}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}>{step.statLabel}</span>
          </div>
        </div>
      </SlideIn>

      {/* Code panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.25, ease: [0.16, 1, 0.3, 1] as any }}
        style={{
          background: '#09090b',
          padding: '2.5rem',
          display: 'flex', alignItems: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Step number watermark */}
        <span style={{
          position: 'absolute', right: '-0.5rem', bottom: '-1.5rem',
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: '8rem', lineHeight: 1,
          color: 'rgba(255,255,255,0.025)',
          userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }} aria-hidden>
          {step.num}
        </span>

        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          lineHeight: 1.9,
          color: 'rgba(255,255,255,0.6)',
          background: 'transparent',
          border: 'none',
          padding: 0,
          whiteSpace: 'pre-wrap',
          position: 'relative', zIndex: 1,
        }}>
          {step.code.split('\n').map((line, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4 + j * 0.1, duration: 0.5 }}
              style={{ display: 'block' }}
            >
              {line.startsWith('$') ? (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>$ </span>
                  <span style={{ color: '#fff' }}>{line.slice(2)}</span>
                </>
              ) : line.startsWith('✓') ? (
                <span style={{ color: 'rgba(255,255,255,0.45)' }}>{line}</span>
              ) : line.startsWith('→') ? (
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </motion.span>
          ))}
        </pre>
      </motion.div>

      <style>{`
        .dn-hiw-row {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
        }
        .dn-hiw-text-panel {
          border-right: 1px solid rgba(255,255,255,0.04) !important;
        }

        @media (max-width: 1024px) {
          .dn-hiw-row {
            grid-template-columns: 1fr !important;
          }
          .dn-hiw-text-panel {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.04) !important;
            padding: 2rem !important;
          }
          .dn-hiw-line, .dn-hiw-line-active {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
