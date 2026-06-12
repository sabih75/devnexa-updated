'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import BelowHero from '@/components/sections/BelowHero';
import Networks from '@/components/sections/Networks';
import Security from '@/components/sections/Security';
import Footer from '@/components/sections/Footer';
import PinnedSlider from '@/components/sections/PinnedSlider';
import WordReveal from '@/components/ui/WordReveal';
import ScrollProgressLine from '@/components/ui/ScrollProgressLine';

function SuccessNotificationInner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('contact-success') === 'true') {
      setShow(true);
      
      // Clean up the URL parameters so it doesn't trigger again on reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -80, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -80, x: '-50%', scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '9999px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
              color: '#09090b',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Success icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                background: '#10b981',
                borderRadius: '50%',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Message sent successfully!
            </span>

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(9, 9, 11, 0.3)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '4px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#09090b'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(9, 9, 11, 0.3)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuccessNotification() {
  return (
    <Suspense fallback={null}>
      <SuccessNotificationInner />
    </Suspense>
  );
}

export default function Home() {
  useEffect(() => {
    let lenis: any;
    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    init();
    return () => lenis?.destroy();
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'clip', position: 'relative', background: '#faf9f6' }}>
      {/* Toast success notification */}
      <SuccessNotification />

      {/* Scroll progress line — editorial touch from Tres Mares */}
      <ScrollProgressLine />

      <Navbar />

      <main style={{ width: '100%' }}>
        {/* 1. Full-viewport parallax hero */}
        <Hero />

        {/* 2. Ticker + Services bento + Complete Solution + Process + CTA */}
        <BelowHero />

        {/* 3. Pinned scroll slider — sidepanel + animated content (Tres Mares Section 4) */}
        <PinnedSlider />

        {/* 4. Word-by-word scroll reveal paragraph (Tres Mares Section 5) */}
        <WordReveal
          className="word-reveal-section"
          text="We don't just build software. We engineer growth. Every line of code, every pixel, every campaign is designed with one goal — to help your business move faster, reach further, and stand out permanently."
          fontSize="clamp(1.6rem, 3vw, 3.2rem)"
        />

        {/* 5. Networks / ecosystem */}
        <Networks />

        {/* 6. Security */}
        <Security />

        {/* 7. Footer (includes its own CTA section) */}
        <Footer />
      </main>
    </div>
  );
}
