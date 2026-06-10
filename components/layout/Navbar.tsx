'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import LogoMark from '@/components/ui/Logo';

const NAV_LINKS = [
  { label: 'Home',     href: '/'          },
  { label: 'Services', href: '/services'  },
  { label: 'Our Work', href: '/our-work'  },
  { label: 'About Us', href: '/about'     },
  { label: 'Career',   href: '/career'    },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { scrollY }               = useScroll();
  const pathname                  = usePathname();

  useMotionValueEvent(scrollY, 'change', y => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Is this link active? */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ── Fixed header shell ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE as any }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '0.875rem 1rem', zIndex: 50, pointerEvents: 'none' }}
      >
        {/* ── Pill nav ── */}
        <motion.nav
          animate={{
            background:     scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
            borderColor:    scrolled ? 'rgba(9,9,11,0.07)'      : 'rgba(9,9,11,0)',
            boxShadow:      scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
            backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
          aria-label="Main navigation"
          style={{
            pointerEvents: 'all',
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid transparent',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="DevNexa home"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
          >
            <LogoMark size={42} />
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700,
              fontSize: '1.125rem', color: '#09090b',
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              DevNexa
            </span>
          </Link>

          {/* Desktop links */}
          <div aria-label="Navigation links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="dn-desktop-links">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? '#09090b' : 'rgba(9,9,11,0.5)',
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#09090b')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(link.href) ? '#09090b' : 'rgba(9,9,11,0.5)')}
              >
                {link.label}
                {/* Active underline */}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '1.5px', background: '#09090b', borderRadius: '9999px' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/contact"
              className="dn-desktop-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 22px', borderRadius: '9999px',
                background: '#09090b', color: '#ffffff',
                fontFamily: 'var(--font-heading)', fontWeight: 600,
                fontSize: '0.8125rem', letterSpacing: '-0.01em',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'transform 150ms ease, box-shadow 250ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(9,9,11,0.22)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '';
              }}
            >
              Contact Us
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="dn-hamburger"
              style={{ background: scrolled ? 'rgba(9,9,11,0.05)' : 'rgba(9,9,11,0.06)', border: '1px solid rgba(9,9,11,0.08)', cursor: 'pointer', padding: '8px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', transition: 'background 200ms ease' }}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 }   : { rotate: 0, y: 0 }}     style={{ display: 'block', width: '16px', height: '1.5px', background: '#09090b', transformOrigin: 'center' }} />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} style={{ display: 'block', width: '16px', height: '1.5px', background: '#09090b' }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}     style={{ display: 'block', width: '16px', height: '1.5px', background: '#09090b', transformOrigin: 'center' }} />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(250,249,246,0.98)', backdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: EASE as any }}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    fontWeight: 700,
                    color: isActive(link.href) ? '#09090b' : 'rgba(9,9,11,0.5)',
                    letterSpacing: '-0.03em',
                    padding: '0.5rem 1rem',
                    textDecoration: 'none',
                    transition: 'color 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.05, duration: 0.35 }}
            >
              <Link
                href="/contact"
                style={{ marginTop: '2rem', padding: '14px 40px', borderRadius: '9999px', background: '#09090b', color: '#ffffff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive */}
      <style>{`
        .dn-desktop-links { display: flex; }
        .dn-desktop-cta   { display: inline-flex; }
        .dn-hamburger     { display: flex; }

        @media (min-width: 768px) {
          .dn-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .dn-desktop-links { display: none !important; }
          .dn-desktop-cta   { display: none !important; }
        }
      `}</style>
    </>
  );
}
