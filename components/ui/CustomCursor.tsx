'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Use refs for values read inside event handlers to avoid stale closures
  const isVisibleRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleGlobalMouseOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleGlobalMouseOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Always render the same structure on server & client to prevent hydration mismatch.
  // The cursors start hidden (opacity: 0) and only become visible after mount.
  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .custom-cursor-active,
          .custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer tracking circle */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: isHovered ? 'normal' : 'difference',
          borderStyle: 'solid',
        }}
        animate={{
          width: isHovered ? 48 : 30,
          height: isHovered ? 48 : 30,
          borderColor: isHovered ? '#10b981' : '#ffffff',
          borderWidth: isHovered ? '1.5px' : '1px',
          scale: isClicking ? 0.85 : 1,
          opacity: mounted && isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 25,
        }}
        className="rounded-full"
      />

      {/* Inner dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: isHovered ? 'normal' : 'difference',
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          backgroundColor: isHovered ? '#10b981' : '#ffffff',
          scale: isClicking ? 1.6 : 1,
          opacity: mounted && isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
        className="rounded-full"
      />
    </>
  );
}
