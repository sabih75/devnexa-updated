'use client';
import { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

/* ── Easing ── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT  = [0.4, 0, 0.2, 1] as const;

/* ─────────────────────────────────────────
   FadeUp — classic reveal from below
───────────────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.85,
  distance = 52,
  once = true,
  margin = '-60px',
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO as any }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FadeIn — pure opacity fade
───────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  once = true,
  margin = '-60px',
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: EASE_IN_OUT as any }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SlideIn — horizontal slide
───────────────────────────────────────── */
export function SlideIn({
  children,
  from = 'left',
  delay = 0,
  distance = 60,
  duration = 0.9,
  once = true,
  margin = '-60px',
  style,
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const x = from === 'left' ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO as any }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ScaleUp — zoom-in card reveal
───────────────────────────────────────── */
export function ScaleUp({
  children,
  delay = 0,
  duration = 0.75,
  once = true,
  margin = '-60px',
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 30 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO as any }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   StaggerList — stagger children on reveal
───────────────────────────────────────── */
export function StaggerList({
  children,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  margin = '-60px',
  style,
  className,
  as: Tag = 'div',
  role,
  'aria-label': ariaLabel,
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: string;
  style?: React.CSSProperties;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
  role?: string;
  'aria-label'?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  const MotionTag = motion[Tag] as any;

  return (
    <MotionTag
      ref={ref}
      style={style}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </MotionTag>
  );
}


/* Child item for StaggerList */
export function StaggerItem({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.75, ease: EASE_OUT_EXPO as any },
    },
  };

  return (
    <motion.div variants={itemVariants} style={style} className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SplitText — word-by-word reveal
───────────────────────────────────────── */
export function SplitText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.04,
  once = true,
  margin = '-40px',
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  once?: boolean;
  margin?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: EASE_OUT_EXPO as any,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00a0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────
   CountUp — number counter
───────────────────────────────────────── */
export function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
  delay = 0,
  style,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      style={style}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay }}
    >
      {prefix}
      <motion.span>
        {inView ? (
          <AnimatedNumber to={to} duration={duration} delay={delay} />
        ) : (
          '0'
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function AnimatedNumber({ to, duration, delay }: { to: number; duration: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ innerHTML: '0' } as any}
        animate={inView ? { innerHTML: String(to) } as any : {}}
        transition={{ duration, delay, ease: 'easeOut' }}
        onUpdate={(latest: any) => {
          if (ref.current) {
            const val = latest.innerHTML ?? '0';
            const num = Math.round(parseFloat(val));
            if (!isNaN(num) && ref.current) {
              ref.current.textContent = String(num);
            }
          }
        }}
        style={{ display: 'inline' }}
      />
    </motion.span>
  );
}
