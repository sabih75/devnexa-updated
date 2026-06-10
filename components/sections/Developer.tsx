'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const devCards = [
  {
    title: 'DevNexa CLI',
    desc: 'Deploy, promote, and debug your entire infrastructure directly from your local terminal.',
    badge: 'CLI',
  },
  {
    title: 'Edge Functions',
    desc: 'Run serverless logic globally with 0ms cold starts. Fully integrated with auto-scaling.',
    badge: 'Compute',
  },
  {
    title: 'Webhooks & Events',
    desc: 'Build event-driven microservices. Trigger actions on successful build, deploy, or rollbacks.',
    badge: 'API',
  },
  {
    title: 'Secret Management',
    desc: 'Inject end-to-end encrypted variables dynamically across dev, preview, and production environments.',
    badge: 'Security',
  },
];

const codeLines = [
  { text: "import { defineConfig } from '@devnexa/config';", type: 'keyword' },
  { text: '', type: 'blank' },
  { text: 'export default defineConfig({', type: 'keyword' },
  { text: '  framework: "nextjs",', type: 'string' },
  { text: '  build: {', type: 'default' },
  { text: '    command: "npm run build",', type: 'string' },
  { text: '    output: ".next",', type: 'string' },
  { text: '  },', type: 'default' },
  { text: '  routing: {', type: 'default' },
  { text: '    edge: ["/api/**/*"], // Run routes at edge', type: 'comment' },
  { text: '  },', type: 'default' },
  { text: '  canary: {', type: 'default' },
  { text: '    autoRollback: true,', type: 'keyword' },
  { text: '    maxErrorRate: "1%", // Trigger rollback if exceeded', type: 'comment' },
  { text: '  }', type: 'default' },
  { text: '});', type: 'default' },
];

const lineColor = (type: string) => {
  if (type === 'keyword') return '#ffffff';
  if (type === 'string')  return '#aaaaaa';
  if (type === 'comment') return 'rgba(255,255,255,0.35)';
  if (type === 'blank')   return 'transparent';
  return 'rgba(255,255,255,0.7)';
};

export default function Developer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="developers" className="section" style={{ background: '#faf9f6', borderTop: '1px solid rgba(9,9,11,0.06)' }}>
      <div className="dn-container">
        {/* Section header */}
        <div ref={ref} style={{ marginBottom: '4.5rem', maxWidth: '560px', margin: '0 auto 4.5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Developer Tools</p>
            <h2 className="type-display" style={{ color: '#09090b', marginBottom: '1.25rem' }}>
              Built for developers,<br />configured in code.
            </h2>
            <p style={{ color: 'rgba(9,9,11,0.6)', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Configuring your pipeline shouldn&apos;t require a degree in cloud operations. Express your stack rules in simple TypeScript.
            </p>
          </motion.div>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* ── Code block ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(9,9,11,0.08)', background: '#09090b' }}
          >
            {/* Titlebar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: 'rgba(12,12,12,0.98)',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#333', '#666', '#999'].map((c) => (
                  <div
                    key={c}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }}
                  />
                ))}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>
                devnexa.config.ts
              </span>
            </div>

            {/* Code body */}
            <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <pre style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  {codeLines.map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.25rem', minHeight: '1.75em' }}>
                      <span
                        style={{
                          userSelect: 'none',
                          textAlign: 'right',
                          width: '1.25rem',
                          color: 'rgba(255,255,255,0.18)',
                        }}
                      >
                        {line.type !== 'blank' ? i + 1 : ''}
                      </span>
                      <span
                        style={{
                          color: lineColor(line.type),
                          fontStyle: line.type === 'comment' ? 'italic' : 'normal',
                        }}
                      >
                        {line.text}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>

          {/* ── Dev feature cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {devCards.map((card, i) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] as any }}
                className="card-glass"
                style={{
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                }}
              >
                {/* Badge */}
                <div style={{ marginBottom: '1rem', alignSelf: 'start' }}>
                  <span className="badge badge-outline" style={{ fontSize: '0.6rem' }}>
                    {card.badge}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: '#09090b',
                  marginBottom: '0.5rem',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(9,9,11,0.55)',
                  lineHeight: 1.6,
                  flex: 1,
                }}>
                  {card.desc}
                </p>

                <div style={{
                  marginTop: '1.25rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#09090b',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  opacity: 0.7,
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                >
                  View documentation →
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
