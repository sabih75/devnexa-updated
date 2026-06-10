'use client';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import BelowHero from '@/components/sections/BelowHero';
import Networks from '@/components/sections/Networks';
import Security from '@/components/sections/Security';
import Footer from '@/components/sections/Footer';
import PinnedSlider from '@/components/sections/PinnedSlider';
import WordReveal from '@/components/ui/WordReveal';
import ScrollProgressLine from '@/components/ui/ScrollProgressLine';

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
