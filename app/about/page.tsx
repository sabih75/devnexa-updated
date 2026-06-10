'use client';
import PageLayout from '@/components/layout/PageLayout';
import { FadeUp, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';

const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const VALUES = [
  { num: '01', title: 'Human-first design', body: 'Technology should feel invisible. We obsess over the experience your users actually have — not just the code behind it.' },
  { num: '02', title: 'Radical ownership',   body: 'We treat your product like our own. No handoffs, no finger-pointing. If something breaks, we fix it.' },
  { num: '03', title: 'Speed without chaos', body: 'Fast delivery and high quality are not trade-offs. We move quickly because our process is tight.' },
  { num: '04', title: 'Transparent pricing', body: 'Clear scope, fair price, no surprises. You approve the estimate before a single line of code is written.' },
];

const TEAM = [
  { name: 'Hamza Tariq', role: 'Founder & CEO',           bio: 'Full-stack engineer and product strategist with 6+ years shipping SaaS and marketing platforms globally.' },
  { name: 'Sara Ahmed',   role: 'Head of Design',          bio: 'UI/UX lead obsessed with systems thinking. Designed for 30+ brands across FinTech, E-commerce, and SaaS.' },
  { name: 'Bilal Raza',   role: 'Lead Engineer',           bio: 'Backend architect specializing in multi-tenant SaaS, real-time systems, and cloud infrastructure.' },
  { name: 'Amna Sheikh',  role: 'Growth & Marketing Lead', bio: 'Performance marketer running $500K+ in paid media across Google and Meta for B2B and D2C brands.' },
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
      title="We build digital"
      titleMuted="products that matter."
      subtitle="A full-service digital team based in Lahore, Pakistan — shipping software, brand identities, and growth campaigns for businesses worldwide."
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
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Our mission</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: D, marginBottom: '1.25rem' }}>
                Humanizing the<br /><span style={{ color: 'rgba(9,9,11,0.28)' }}>digital world.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(9,9,11,0.6)', lineHeight: 1.78 }}>Most agencies pick one lane — design, dev, or marketing. We cover the entire digital lifecycle so your business never has to stitch five vendors together to launch one product.</p>
            </FadeUp>
            <FadeUp delay={0.12} margin="-80px">
              <div style={{ border: B, borderRadius: '20px', padding: '2.5rem', background: '#fff' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.03em', color: D, lineHeight: 1.3, marginBottom: '1.5rem' }}>"We don't just build software. We engineer growth."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: D, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem' }}>H</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', color: D }}>Hamza Tariq</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)' }}>Founder & CEO</div>
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D }}>Our values</h2>
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.04em', color: D }}>People behind the work</h2>
          </FadeUp>
          <StaggerList stagger={0.07} margin="-80px" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="team-grid">
            {TEAM.map(p => (
              <StaggerItem key={p.name}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} style={{ border: B, borderRadius: '16px', padding: '2rem', background: '#fff' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: D, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.25rem' }}>{p.name[0]}</div>
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
        @media (max-width: 900px) { .about-mission-grid, .team-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </PageLayout>
  );
}
