'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WordRevealProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
  className?: string;
  background?: string;
}

/*
 * Scroll-pinned word-by-word reveal.
 *
 * HOW IT WORKS:
 * ─────────────
 * • Outer div  height = scrollTravel + 100vh
 *   scrollTravel = words.length × PX_PER_WORD  (controls reveal speed)
 * • Inner div  position:sticky, top:0, height:100vh  — stays pinned
 * • A window 'scroll' listener reads -outerRef.getBoundingClientRect().top
 *   (pixels scrolled into the section) and maps it to a 0→1 progress value.
 * • Each word's opacity is driven by that progress value — words light up
 *   left-to-right as the user scrolls.
 * • Once the user has scrolled through all scroll travel the outer div
 *   bottom passes the viewport bottom and the section naturally unpins.
 */

// px of scroll travel per word — higher = slower reveal
const PX_PER_WORD = 38;

export default function WordReveal({
  text,
  fontSize = 'clamp(1.75rem, 3vw, 3.2rem)',
  fontWeight = 700,
  className,
  background = '#faf9f6',
}: WordRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);  // 0 → 1
  const [revealed, setRevealed] = useState(false);

  const words = text.split(' ');
  // Total scroll distance to reveal all words
  const scrollTravel = words.length * PX_PER_WORD;

  /* Reveal animation — fires once when section enters viewport */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (outerRef.current) obs.observe(outerRef.current);
    return () => obs.disconnect();
  }, []);

  /* Scroll → progress (0→1) */
  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const scrolledIn = -el.getBoundingClientRect().top;
      if (scrolledIn <= 0) { setProgress(0); return; }
      const p = Math.min(1, scrolledIn / scrollTravel);
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTravel]);

  return (
    /* Outer div provides scroll travel. height = travel + 100vh so the
       sticky element stays pinned for exactly `scrollTravel` px of scroll */
    <div
      ref={outerRef}
      className={className}
      style={{
        position: 'relative',
        height: `calc(${scrollTravel}px + 100vh)`,
        background,
        borderTop: '1px solid rgba(9,9,11,0.07)',
      }}
    >
      {/* Sticky viewport */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot grid bg */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(9,9,11,0.045) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div className="dn-container" style={{ maxWidth: '960px', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <motion.p
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="eyebrow"
            style={{ marginBottom: '2rem' }}
          >
            Our philosophy
          </motion.p>

          <p
            aria-label={text}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight,
              fontSize,
              letterSpacing: '-0.035em',
              lineHeight: 1.22,
              color: '#09090b',
            }}
          >
            {words.map((word, i) => {
              // Each word lights up across its own slice of 0→1 progress
              const wordStart = i / words.length;
              const wordEnd = (i + 1.5) / words.length; // +1.5 gives smooth overlap
              const clamped = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));
              const opacity = 0.1 + clamped * 0.9;
              const color = `rgba(9,9,11,${0.12 + clamped * 0.88})`;

              return (
                <motion.span
                  key={i}
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    lineHeight: 'inherit',
                    opacity,
                    color,
                    transition: 'opacity 80ms linear, color 80ms linear',
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>

          {/* Scroll cue — fades out once user starts scrolling through */}
          <motion.div
            animate={{ opacity: progress > 0.05 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '-40vh',
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(9,9,11,0.35)',
            }}
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            Scroll to reveal
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
