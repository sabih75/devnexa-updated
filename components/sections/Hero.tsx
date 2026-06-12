'use client';
import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

/* ── Typing animation ── */
const phrases = [
  'Shape your brand.',
  'Build your software.',
  'Amplify your reach.',
  'Humanize your tech.',
];

function TypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [deleting, setDeleting]    = useState(false);

  useEffect(() => {
    const target = phrases[phraseIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 58);
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
    else { setDeleting(false); setPhraseIdx(i => (i + 1) % phrases.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span>
      {displayed}
      <span aria-hidden style={{
        display: 'inline-block', width: '2px', height: '0.9em',
        background: '#fff', verticalAlign: 'middle', marginLeft: '3px',
        animation: 'cursor-blink 1s step-end infinite',
      }} />
    </span>
  );
}

/* ── Stats ── */
const stats = [
  { value: 'Tailored',  label: 'SaaS Solutions'  },
  { value: 'Distinct',  label: 'Brand Identities' },
  { value: 'Amplified', label: 'Digital Reach'    },
  { value: 'Seamless',  label: 'Code & Design'    },
];

/* ── Sparkle positions per card ── */
const SPARKS = [
  { top: '14%', left: '18%', s: 3, d: 0.00 },
  { top: '28%', left: '78%', s: 4, d: 0.08 },
  { top: '68%', left: '12%', s: 3, d: 0.14 },
  { top: '78%', left: '62%', s: 5, d: 0.05 },
  { top: '42%', left: '90%', s: 3, d: 0.11 },
  { top:  '8%', left: '52%', s: 4, d: 0.18 },
];

/* ── StatCard ── */
function StatCard({ value, label, index, scrollYProgress }: {
  value: string; label: string; index: number; scrollYProgress: any;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(cardRef, { once: true, margin: '-40px' });
  const [coords, setCoords]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setCoords({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  /* 3D scroll fan-out */
  const xOff  = ['-20px', '-6px', '6px',  '20px'][index];
  const ryOff = [-8,      -2.5,    2.5,     8    ][index];
  const cardX  = useTransform(scrollYProgress, [0, 0.55], ['0px', xOff]);
  const cardRY = useTransform(scrollYProgress, [0, 0.55], [0, ryOff]);
  const cardOp = useTransform(scrollYProgress, [0.3, 0.65], [1, 0]);

  return (
    /* Outer — handles scroll 3D + entry fade */
    <motion.div
      style={{ x: cardX, rotateY: cardRY, opacity: cardOp, transformStyle: 'preserve-3d', perspective: '800px' }}
      initial={{ opacity: 0, y: 30, scale: 0.90 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Inner — hover interactions */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          y: hovered ? -9 : 0,
          boxShadow: hovered
            ? '0 22px 55px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.13)'
            : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="dn-hero-stat-card"
        style={{
          position: 'relative',
          padding: '1.6rem 0.875rem 1.4rem',
          textAlign: 'center',
          cursor: 'default',
          overflow: 'hidden',
          height: '100%',
          background: hovered ? 'rgba(255,255,255,0.075)' : 'rgba(255,255,255,0.03)',
          transition: 'background 320ms ease',
        }}
      >
        {/* Radial cursor spotlight */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: hovered ? 1 : 0, transition: 'opacity 350ms ease',
          background: `radial-gradient(130px circle at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 55%, transparent 100%)`,
        }} />

        {/* Skewed glitter shimmer sweep */}
        <motion.div
          aria-hidden
          initial={{ x: '-130%' }}
          animate={hovered ? { x: '240%' } : { x: '-130%' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute', top: '-25%', left: 0,
            width: '48%', height: '150%', pointerEvents: 'none',
            background: 'linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.26) 50%, rgba(255,255,255,0.06) 68%, transparent 85%)',
            transform: 'skewX(-16deg)',
          }}
        />

        {/* Sparkle particles */}
        {SPARKS.map((sp, si) => (
          <motion.div
            key={si} aria-hidden
            animate={hovered ? { opacity: [0, 1, 0], scale: [0, 1.3, 0] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.55, delay: sp.d, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: sp.top, left: sp.left,
              width: `${sp.s}px`, height: `${sp.s}px`,
              borderRadius: '50%', pointerEvents: 'none',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: `0 0 ${sp.s * 2}px rgba(255,255,255,0.7)`,
            }}
          />
        ))}

        {/* Glowing top edge on hover */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{
              fontFamily: 'var(--font-heading)', fontWeight: 800,
              fontSize: 'clamp(1rem, 1.8vw, 1.75rem)',
              letterSpacing: '-0.04em', color: '#ffffff',
              lineHeight: 1.1, marginBottom: '5px',
            }}
          >
            {value}
          </motion.div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)',
            transition: 'color 300ms ease',
          }}>
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Mouse tilt hook ── */
function useMouseTilt(strength = 12) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setTilt({
      x: ((e.clientY / window.innerHeight) - 0.5) * -strength,
      y: ((e.clientX / window.innerWidth)  - 0.5) *  strength,
    });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [strength]);
  return tilt;
}

/* ═══════════════════════════════
   HERO
═══════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const tilt = useMouseTilt(8);

  const toggleMuted = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const videoY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.6],  [1, 0.3]);
  const videoYSpring = useSpring(videoY, { stiffness: 55, damping: 22 });

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const line: any = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b' }}
    >
      {/* LAYER 1 — video */}
      <motion.div aria-hidden style={{ position: 'absolute', inset: '-10% -5%', y: videoYSpring, rotateX: tilt.x, rotateY: tilt.y, willChange: 'transform', transformStyle: 'preserve-3d' }}>
        <video ref={videoRef} autoPlay loop muted={isMuted} playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}>
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* LAYER 2 — cinematic overlay */}
      <motion.div aria-hidden style={{ position: 'absolute', inset: 0, opacity: overlayOp, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(9,9,11,0.38) 0%, rgba(9,9,11,0.18) 40%, rgba(9,9,11,0.55) 80%, rgba(9,9,11,0.88) 100%)' }} />

      {/* LAYER 3 — noise grain */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '200px', opacity: 0.04, mixBlendMode: 'overlay', pointerEvents: 'none' }} />

      {/* LAYER 4 — content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '960px', width: '100%', padding: '0 1.5rem', paddingTop: '80px', y: contentY, opacity: contentOp }}
      >
        {/* Eyebrow */}
        <motion.div variants={line} style={{ marginBottom: '1.75rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', animation: 'pulse-soft 2s ease-in-out infinite' }} />
            Join 10k+ satisfied customers
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={line} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7.5vw, 7rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '1.5rem' }}>
          Humanizing the{' '}
          <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Digital</span>
          {' '}World.
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={line} style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', height: '2.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TypingText />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={line} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
          <button
            id="hero-cta-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: '#ffffff', color: '#09090b', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.01em', border: 'none', cursor: 'pointer', transition: 'transform 150ms ease, box-shadow 250ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
          >
            Let's Build Together
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            id="hero-cta-demo"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.01em', cursor: 'pointer', transition: 'transform 150ms ease, background 200ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" /></svg>
            View Our Services
          </button>
        </motion.div>

        {/* ── Stats row — premium cards ── */}
        <motion.div
          variants={line}
          style={{
            position: 'relative',
            maxWidth: '680px',
            margin: '0 auto',
            perspective: '1200px',
          }}
        >
          {/* Glass frame (sits behind cards so hover lift isn't clipped) */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
            background: 'rgba(255,255,255,0.04)', pointerEvents: 'none', zIndex: 0,
          }} />

           {/* Grid — overflow visible so hover lifts aren't clipped */}
          <div
            className="dn-hero-stats-grid"
            style={{
              position: 'relative', zIndex: 1,
              borderRadius: '20px', overflow: 'visible',
            }}
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.6, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
        />
      </motion.div>

      {/* Sound Toggle Button */}
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 30 }}>
        <button
          onClick={toggleMuted}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'rgba(255, 255, 255, 0.85)',
            cursor: 'pointer',
            transition: 'transform 150ms ease, background 200ms ease',
            outline: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
          aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

        .dn-hero-stats-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
        }
        .dn-hero-stat-card {
          border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .dn-hero-stat-card:nth-child(4) {
          border-right: none !important;
        }

        @media (max-width: 640px) {
          .dn-hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dn-hero-stat-card {
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .dn-hero-stat-card:nth-child(2), .dn-hero-stat-card:nth-child(4) {
            border-right: none !important;
          }
          .dn-hero-stat-card:nth-child(3), .dn-hero-stat-card:nth-child(4) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
