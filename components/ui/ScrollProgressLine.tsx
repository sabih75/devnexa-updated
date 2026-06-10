'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin scroll-progress line pinned to the very top of the viewport */
export default function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="scroll-progress-line"
      style={{ scaleX, width: '100%' }}
      aria-hidden
    />
  );
}
