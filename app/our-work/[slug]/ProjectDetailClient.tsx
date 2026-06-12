'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { ProjectDetail } from '@/lib/projectsData';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
}

export default function ProjectDetailClient({ p }: { p: ProjectDetail }) {
  return (
    <PageLayout
      eyebrow={`Case Study — ${p.tag}`}
      title={p.title}
      titleMuted=""
      subtitle={p.desc}
    >
      {/* Back button */}
      <section style={{ borderBottom: B, background: '#fff', padding: '1rem 0' }}>
        <div className="dn-container">
          <Link href="/our-work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'rgba(9,9,11,0.5)', textDecoration: 'none', letterSpacing: '0.04em' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to portfolio
          </Link>
        </div>
      </section>

      {/* Main Details */}
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }} className="project-deep-grid">
            <FadeUp>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: D, marginBottom: '0.75rem' }}>The Challenge</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.8 }}>{p.deepDive.challenge}</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: D, marginBottom: '0.75rem' }}>The Solution</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.8 }}>{p.deepDive.solution}</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: D, marginBottom: '0.75rem' }}>The Results</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.8 }}>{p.deepDive.result}</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Stats / Metrics Panel */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '1.25rem' }}>Key Metrics</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {p.deepDive.metrics.map(m => (
                      <div key={m} style={{ background: '#faf9f6', border: B, borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: p.accent }}>{m.split(' ')[0]}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(9,9,11,0.5)', marginTop: '4px' }}>{m.split(' ').slice(1).join(' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Panel */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '0.75rem' }}>Architecture & Infrastructure</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{p.deepDive.architecture}</p>
                  
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '8px' }}>Technologies</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'rgba(9,9,11,0.6)', background: 'rgba(9,9,11,0.03)', border: B, padding: '3px 10px', borderRadius: '6px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Project Metadata */}
                <div style={{ border: B, borderRadius: '20px', padding: '2rem', background: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '1rem' }}>Project Details</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'rgba(9,9,11,0.4)' }}>Category</span>
                      <span style={{ fontWeight: 600, color: D }}>{p.tag}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderTop: B, paddingTop: '0.75rem' }}>
                      <span style={{ color: 'rgba(9,9,11,0.4)' }}>Year Shipped</span>
                      <span style={{ fontWeight: 600, color: D }}>{p.year}</span>
                    </div>
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
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Build something similar</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1.25rem' }}>
              Have a project in mind<br />like <span style={{ color: p.accent }}>{p.title}</span>?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.5)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Let's talk. We can replicate this architecture and framework to deliver high-performance results tailored precisely to your company's specifications.
            </p>
            <Link href={`/contact?project=${p.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '9999px', background: D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Start your project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .project-deep-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </PageLayout>
  );
}
