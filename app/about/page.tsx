'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const VALUES = [
  { num: '01', title: 'Prioritizing Client Needs', body: 'We align every solution directly with your unique goals. Your success is our primary metric, and we adapt our process to fit your business vision.' },
  { num: '02', title: 'Open Lifecycle Communication', body: 'No black boxes. We maintain clear, transparent, and open communication throughout the entire development and marketing lifecycle.' },
  { num: '03', title: 'Feedback-Driven Iteration', body: 'We welcome feedback with open arms. Your input is vital in refining the interface and mechanics to exceed expectations.' },
  { num: '04', title: 'Cutting-Edge Technologies', body: 'We build digital platforms utilizing high-performance, modern tech stacks to keep your systems fast, secure, and ready for growth.' },
  { num: '05', title: 'Ongoing Support & Maintenance', body: 'Our partnership doesn\'t end at launch. We provide continuous support, proactive monitoring, and regular updates to ensure long-term success.' },
];

const TEAM = [
  { 
    name: 'Raja Muhammad Taha', 
    role: 'CEO & Founder', 
    bio: 'Leading the company towards success and innovation, shaping corporate strategy and ensuring client-centric execution.',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raja&mouth=smile&eyebrows=defaultNatural'
  },
  { 
    name: 'Muhammad Awais Attari', 
    role: 'CTO', 
    bio: 'Overseeing the technological development and strategy, building robust, scalable architectures for all digital products.',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awais&eyebrows=default&mouth=default'
  },
  { 
    name: 'Sabih ul Hassan', 
    role: 'CMO', 
    bio: 'Driving marketing strategies, search engine optimization, and brand awareness to help businesses scale globally.',
    img: '/assets/sabih.png'
  },
  { 
    name: 'Muhammad Talah', 
    role: 'Graphic Designer', 
    bio: 'Creating visually stunning, brand-aligned interfaces and design assets that shape and enhance digital identity.',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Talah&mouth=smile&top=shortHair'
  },
  { 
    name: 'Saim Iftikhar', 
    role: 'AI Engineer', 
    bio: 'Developing intelligent solutions, LLM workflows, and custom automation pipelines to enhance operational efficiency.',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saim&top=frizzle&mouth=smile'
  },
];

const STATS = [
  { value: '50+',  label: 'Projects shipped'    },
  { value: '6+',   label: 'Years of experience' },
  { value: '30+',  label: 'Brands designed'     },
  { value: '100%', label: 'In-house team'       },
];

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate translation range for horizontal scroll
  // We translate x from 0% to a negative percentage to show all cards.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <PageLayout
      eyebrow="About DevNexa"
      title="Transforming ideas into"
      titleMuted="impactful digital experiences."
      subtitle="A collaborative team of creators and problem solvers based in DHA Phase 2, Islamabad, Pakistan — delivering tailored websites, apps, branding, and marketing with niche expertise in veterinary and business digital transformation."
    >
      {/* Stats strip */}
      <section style={{ borderBottom: B, background: '#fff' }}>
        <div className="dn-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="about-stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: '2.5rem 2rem', borderRight: i < 3 ? B : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-mission-grid">
            <FadeUp margin="-80px">
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Our mission & vision</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: D, marginBottom: '1.25rem' }}>
                Tailored solutions.<br /><span style={{ color: 'rgba(9,9,11,0.28)' }}>Empowered success.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.78 }}>
                Our vision is to transform ideas into impactful digital experiences. We drive this by providing tailored web, mobile, SEO, branding, and marketing solutions built specifically to empower businesses and veterinary clinics to thrive in the modern era.
              </p>
            </FadeUp>
            <FadeUp delay={0.12} margin="-80px">
              <div style={{ border: B, borderRadius: '20px', padding: '2.5rem', background: '#fff' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.03em', color: D, lineHeight: 1.3, marginBottom: '1.5rem' }}>"We don't just build websites and apps. We transform your ideas into innovative solutions that drive real success."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: D, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem' }}>RT</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', color: D }}>Raja Muhammad Taha</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)' }}>CEO & Founder</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: '#fff', borderTop: B }}>
        <div className="dn-container">
          <FadeUp margin="-80px" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>What we believe</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D }}>Our core values</h2>
          </FadeUp>
          <div style={{ borderTop: B }}>
            {VALUES.map((v, i) => (
              <FadeUp key={v.num} delay={i * 0.06} margin="-80px">
                <div style={{ display: 'flex', gap: '2rem', padding: '2.25rem 0', borderBottom: B, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(9,9,11,0.3)', paddingTop: '5px', flexShrink: 0 }}>{v.num}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', color: D, marginBottom: '0.5rem' }}>{v.title}</h3>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.75 }}>{v.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {isMobile ? (
        <section className="section" style={{ background: '#faf9f6', borderTop: B }}>
          <div className="dn-container">
            <FadeUp margin="-80px" style={{ marginBottom: '3.5rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>The team</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1rem' }}>People behind the work</h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72, maxWidth: '640px' }}>
                A collaborative team of problem solvers and creators combining backend development, user experience design, marketing, and technical excellence to exceed client expectations.
              </p>
            </FadeUp>
            <StaggerList stagger={0.07} margin="-80px" style={{ display: 'grid', gap: '2rem' }} className="team-grid">
              {TEAM.map(p => (
                <StaggerItem key={p.name}>
                  <motion.div 
                    whileHover={{ y: -6 }} 
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }} 
                    style={{ 
                      border: B, 
                      borderRadius: '24px', 
                      padding: '2.5rem', 
                      background: '#fff', 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(9,9,11,0.02) 0%, rgba(9,9,11,0) 100%)', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                      <img src={p.img} alt={p.name} style={{ width: '180px', height: '180px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', background: 'rgba(9,9,11,0.04)', padding: '4px 10px', borderRadius: '9999px', display: 'inline-block', marginBottom: '8px', alignSelf: 'flex-start' }}>{p.role}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em', color: D, marginBottom: '6px' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72 }}>{p.bio}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </section>
      ) : (
        <section ref={targetRef} style={{ position: 'relative', height: '260vh', background: '#faf9f6', borderTop: B }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <motion.div style={{ x, display: 'flex', gap: '4rem', padding: '0 8vw', alignItems: 'center' }}>
              
              {/* Header column */}
              <div style={{ width: '420px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '2rem' }}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>The team</p>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1.5rem', lineHeight: 1.05 }}>
                  People behind<br />the work
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.75 }}>
                  A collaborative team of problem solvers and creators combining backend development, user experience design, marketing, and technical excellence to exceed client expectations.
                </p>
              </div>

              {/* Members */}
              {TEAM.map((p) => (
                <div
                  key={p.name}
                  style={{
                    width: '380px',
                    height: '520px',
                    flexShrink: 0,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: '#ffffff',
                    border: B,
                    borderRadius: '28px',
                    padding: '2.5rem',
                    overflow: 'visible',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.01)',
                  }}
                >
                  {/* Photo container that overflows nicely */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      top: '-60px', 
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '320px', 
                      height: '320px', 
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      overflow: 'visible',
                      pointerEvents: 'none',
                    }}
                  >
                    <motion.img 
                      src={p.img}
                      alt={p.name}
                      whileHover={{ scale: 1.1, y: -8 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 25px 30px rgba(0,0,0,0.12))',
                        transformOrigin: 'bottom center',
                        pointerEvents: 'auto',
                      }}
                    />
                  </div>

                  {/* Card Info details with best typography */}
                  <div style={{ position: 'relative', zIndex: 10, marginTop: '220px' }}>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.625rem', 
                        letterSpacing: '0.14em', 
                        textTransform: 'uppercase', 
                        color: 'rgba(9,9,11,0.4)',
                        background: 'rgba(9,9,11,0.04)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        display: 'inline-block',
                        marginBottom: '12px'
                      }}
                    >
                      {p.role}
                    </span>
                    
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        fontWeight: 700, 
                        fontSize: '1.45rem', 
                        letterSpacing: '-0.03em', 
                        color: D, 
                        marginBottom: '8px' 
                      }}
                    >
                      {p.name}
                    </h3>
                    
                    <p 
                      style={{ 
                        fontSize: '0.875rem', 
                        color: 'rgba(9,9,11,0.52)', 
                        lineHeight: 1.65,
                        margin: 0
                      }}
                    >
                      {p.bio}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <style>{`
        .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .team-grid, .about-mission-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </PageLayout>
  );
}
