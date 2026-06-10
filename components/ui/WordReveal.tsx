'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WordRevealProps {
  text: string;
  /** CSS font-size value, e.g. 'clamp(2rem, 4vw, 4rem)' */
  fontSize?: string;
  fontWeight?: number;
  className?: string;
  /** Wrapper section background */
  background?: string;
  /** Extra section padding */
  padding?: string;
}

/**
 * Scroll-driven word-by-word opacity reveal.
 * Words start dim (0.12 opacity) and brighten to full as they
 * enter the centre of the viewport — exactly like Tres Mares Capital
 * Section 5 "expansion" text.
 */
export default function WordReveal({
  text,
  fontSize = 'clamp(1.75rem, 3.5vw, 3.5rem)',
  fontWeight = 700,
  className,
  background = '#faf9f6',
  padding = '14vh 0 18vh',
}: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        background,
        borderTop: '1px solid rgba(9,9,11,0.07)',
        padding,
      }}
    >
      <div
        className="dn-container"
        style={{ maxWidth: '960px' }}
      >
        <p
          aria-label={text}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight,
            fontSize,
            letterSpacing: '-0.035em',
            lineHeight: 1.18,
            color: '#09090b',
            /* Wrap nicely */
          }}
        >
          {words.map((word, i) => (
            <WordSpan
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </div>
  );
}

/* ── Individual word span ── */
function WordSpan({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  // Each word lights up in sequence across the scroll range
  const start = index / total;
  const end = start + 1 / total + 0.02; // slight overlap for smoother feel

  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(9,9,11,0.14)', 'rgba(9,9,11,1)']
  );

  return (
    <motion.span
      style={{ opacity, color, display: 'inline-block', marginRight: '0.28em', lineHeight: 'inherit' }}
      aria-hidden
    >
      {word}
    </motion.span>
  );
}
