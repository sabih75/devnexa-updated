'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ServiceDetail } from '@/lib/servicesData';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const ICON_MAP: Record<string, React.ReactNode> = {
  'web-development': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'mobile-development': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  'branding': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  'digital-marketing': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  'seo': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  'end-to-end-development': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 17 22 12"/>
    </svg>
  ),
  'content-writing': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'ai-solutions': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

export default function ServiceDetailClient({ s }: { s: ServiceDetail }) {
  return (
    <PageLayout
      eyebrow={`Service Detail — ${s.tag}`}
      title={s.title}
      titleMuted=""
      subtitle={s.short}
    >
      {/* Back button */}
      <section style={{ borderBottom: B, background: '#fff', padding: '1rem 0' }}>
        <div className="dn-container">
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'rgba(9,9,11,0.5)', textDecoration: 'none', letterSpacing: '0.04em' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to services
          </Link>
        </div>
      </section>

      {/* Main Details */}
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }} className="service-deep-grid">
            <FadeUp>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  border: `1px solid rgba(${hexToRgb(s.accent)}, 0.25)`,
                  background: `rgba(${hexToRgb(s.accent)}, 0.06)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s.accent,
                  boxShadow: `0 4px 16px rgba(${hexToRgb(s.accent)}, 0.1)`,
                }}>
                  {ICON_MAP[s.slug] || ICON_MAP['web-development']}
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em', color: D }}>{s.title}</h2>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em', color: 'rgba(9,9,11,0.4)', marginTop: '2px' }}>{s.short}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: D, marginBottom: '0.75rem' }}>Service Overview</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.8 }}>{s.desc}</p>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.7, marginTop: '1rem' }}>{s.deepDive.overview}</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: D, marginBottom: '1.25rem' }}>Our Step-by-Step Process</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {s.deepDive.process.map(p => (
                      <div key={p.step} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: s.accent, background: `rgba(${hexToRgb(s.accent)}, 0.08)`, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.step}</span>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: D, marginBottom: '2px' }}>{p.title}</h4>
                          <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.6 }}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Deliverables Panel */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '1.25rem' }}>What You Get</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {s.deliverables.map(d => (
                      <div key={d} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: s.accent, flexShrink: 0 }} aria-hidden>
                          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/><path d="m5.5 8 1.5 1.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(9,9,11,0.6)' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Study Widget */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.accent }} />
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: s.accent, marginBottom: '6px' }}>Featured Impact</h4>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: D, marginBottom: '1rem' }}>{s.deepDive.caseStudy.client}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(9,9,11,0.4)', textTransform: 'uppercase', display: 'block' }}>Challenge</span>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.6 }}>{s.deepDive.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(9,9,11,0.4)', textTransform: 'uppercase', display: 'block' }}>Solution</span>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.6 }}>{s.deepDive.caseStudy.solution}</p>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(9,9,11,0.1)', paddingTop: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(9,9,11,0.4)', textTransform: 'uppercase', display: 'block' }}>Results Achieved</span>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: s.accent, marginTop: '2px' }}>{s.deepDive.caseStudy.result}</p>
                  </div>
                </div>

                {/* Tech Stack Panel */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '1rem' }}>Technology Stack</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {s.deepDive.techStack.map(t => (
                      <span key={t} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'rgba(9,9,11,0.6)', background: 'rgba(9,9,11,0.03)', border: B, padding: '3px 10px', borderRadius: '6px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: '#fff', borderTop: B }}>
        <div className="dn-container" style={{ textAlign: 'center' }}>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Let's work together</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1.25rem' }}>
              Ready to launch your<br /><span style={{ color: s.accent }}>{s.title}</span> project?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.5)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Let's build something exceptional together. Schedule a discovery call or send a message to discuss your objectives, timeline, and custom requirements.
            </p>
            <Link href={`/contact?service=${s.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Get started now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .service-deep-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </PageLayout>
  );
}
