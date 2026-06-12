'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LogoMark from '@/components/ui/Logo';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <>
      {/* CTA Section */}
      <section className="section" style={{ background: '#faf9f6', borderTop: '1px solid rgba(9,9,11,0.06)' }}>
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(9,9,11,0.02) 0%, transparent 75%)',
            pointerEvents: 'none',
          }}
        />

        <div ref={ref} className="dn-container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="badge badge-outline" style={{ marginBottom: '2.5rem' }}>
              Scale your engineering
            </div>

            <h2 className="type-display" style={{ color: '#09090b', marginBottom: '1.5rem' }}>
              Build the future of<br />
              software teams.
            </h2>

            <p style={{
              color: 'rgba(9,9,11,0.6)',
              fontSize: '1.0625rem',
              maxWidth: '480px',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
            }}>
              Join thousands of developer teams who use DevNexa to build, test, and ship high-quality software daily.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '4.5rem',
            }}>
              <button className="btn btn-primary" id="footer-cta-primary">
                Get started free
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn btn-ghost" id="footer-cta-sales">
                Contact sales
              </button>
            </div>

            {/* Platform compatibility badges */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['AWS', 'GCP', 'Vercel', 'Kubernetes', 'Serverless', 'GitHub Actions'].map((p) => (
                <div
                  key={p}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    color: 'rgba(9,9,11,0.5)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(9,9,11,0.03)',
                    border: '1px solid rgba(9,9,11,0.06)',
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid rgba(9,9,11,0.06)', padding: '5rem 0' }}>
        <div className="dn-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}>
            <div style={{ gridColumn: 'span 2' }} className="col-span-full md:col-span-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <LogoMark size={24} />
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#09090b',
                  letterSpacing: '-0.02em',
                }}>
                  DevNexa
                </span>
              </div>
              <p style={{
                color: 'rgba(9,9,11,0.55)',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                maxWidth: '240px',
              }}>
                The unified platform for teams who build, scale, and ship modern software fast.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Observability', 'Previews', 'Pricing', 'Security'] },
              { title: 'Developers', links: ['CLI Tools', 'SDKs', 'GitHub App', 'Integrations', 'Documentation'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Customers'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'SLA Agreement', 'Cookie Settings'] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(9,9,11,0.8)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}>
                  {col.title}
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: 'rgba(9,9,11,0.5)',
                          fontSize: '0.8125rem',
                          transition: 'color 150ms ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#000000'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(9,9,11,0.5)'}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(9,9,11,0.06)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <p style={{ color: 'rgba(9,9,11,0.4)', fontSize: '0.75rem' }}>
              © 2026 DevNexa Inc. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto' }}>
              {[
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/devnexa/' },
                { name: 'Instagram', href: 'https://www.instagram.com/devnexaofficial' },
                { name: 'Discord', href: '#' }
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href !== '#' ? '_blank' : undefined}
                  rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                  style={{
                    color: 'rgba(9,9,11,0.4)',
                    fontSize: '0.75rem',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#000000'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(9,9,11,0.4)'}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
