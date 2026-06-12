'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';

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
  { name: 'Raja Muhammad Taha', initials: 'RT', role: 'CEO', bio: 'Leading the company towards success and innovation, shaping corporate strategy and ensuring client-centric execution.' },
  { name: 'Muhammad Awais Attari', initials: 'MA', role: 'CTO', bio: 'Overseeing the technological development and strategy, building robust, scalable architectures for all digital products.' },
  { name: 'Sabih ul Hassan', initials: 'SH', role: 'CMO', bio: 'Driving marketing strategies, search engine optimization, and brand awareness to help businesses scale globally.' },
  { name: 'Muhammad Talah', initials: 'MT', role: 'Graphic Designer', bio: 'Creating visually stunning, brand-aligned interfaces and design assets that shape and enhance digital identity.' },
  { name: 'Saim Iftikhar', initials: 'SI', role: 'AI Engineer', bio: 'Developing intelligent solutions, LLM workflows, and custom automation pipelines to enhance operational efficiency.' },
];

const STATS = [
  { value: '50+',  label: 'Projects shipped'    },
  { value: '6+',   label: 'Years of experience' },
  { value: '30+',  label: 'Brands designed'     },
  { value: '100%', label: 'In-house team'       },
];

export default function AboutPage() {
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

      {/* Team */}
      <section className="section" style={{ background: '#faf9f6', borderTop: B }}>
        <div className="dn-container">
          <FadeUp margin="-80px" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>The team</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D, marginBottom: '1rem' }}>People behind the work</h2>
            <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72, maxWidth: '640px' }}>
              A collaborative team of problem solvers and creators combining backend development, user experience design, marketing, and technical excellence to exceed client expectations.
            </p>
          </FadeUp>
          <StaggerList stagger={0.07} margin="-80px" style={{ display: 'grid', gap: '1.5rem' }} className="team-grid">
            {TEAM.map(p => (
              <StaggerItem key={p.name}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} style={{ border: B, borderRadius: '16px', padding: '2rem', background: '#fff', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: D, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.25rem' }}>{p.initials}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em', color: D, marginBottom: '2px' }}>{p.name}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '0.875rem' }}>{p.role}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.72 }}>{p.bio}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <style>{`
        .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .team-grid, .about-mission-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </PageLayout>
  );
}
