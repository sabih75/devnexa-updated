'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ScrollProgressLine from '@/components/ui/ScrollProgressLine';

interface PageLayoutProps {
  children: React.ReactNode;
  /** Eyebrow above the headline */
  eyebrow?: string;
  /** Large page title */
  title: string;
  /** Highlighted / faded part of title on second line */
  titleMuted?: string;
  /** Short subtitle below the title */
  subtitle?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageLayout({ children, eyebrow, title, titleMuted, subtitle }: PageLayoutProps) {
  /* Lenis smooth scroll */
  useEffect(() => {
    let lenis: any;
    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    };
    init();
    return () => lenis?.destroy();
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'clip', position: 'relative', background: '#faf9f6' }}>
      <ScrollProgressLine />
      <Navbar />

      {/* ── Page hero banner ── */}
      <section style={{ position: 'relative', paddingTop: '10rem', paddingBottom: '6rem', borderBottom: '1px solid rgba(9,9,11,0.07)', background: '#faf9f6', overflow: 'hidden' }}>
        {/* Subtle grid */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(9,9,11,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,11,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div className="dn-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE as any }}
          >
            {eyebrow && (
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>{eyebrow}</p>
            )}
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.96, color: '#09090b', marginBottom: titleMuted ? '0' : '1.25rem' }}>
              {title}
            </h1>
            {titleMuted && (
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.96, color: 'rgba(9,9,11,0.22)', marginBottom: '1.5rem' }}>
                {titleMuted}
              </h1>
            )}
            {subtitle && (
              <p style={{ fontSize: '1.125rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72, maxWidth: '540px', marginTop: '1.5rem' }}>
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Page content ── */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}
