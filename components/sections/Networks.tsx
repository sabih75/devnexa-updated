'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const regions = ['N. Virginia (us-east-1)', 'Frankfurt (eu-central-1)', 'Singapore (ap-southeast-1)', 'Oregon (us-west-2)', 'Tokyo (ap-northeast-1)', 'London (eu-west-2)', 'Sydney (ap-southeast-2)', 'São Paulo (sa-east-1)'];
const technologies = ['Rust Edge Worker', 'Docker Engine', 'Kubernetes Orchestrator', 'V8 JavaScript Runtime', 'WASM Sandbox', 'PostgreSQL Instance', 'Redis Cache Cluster', 'Cloudflare CDN Routing'];

function Ticker({ items, speed = 30, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflowX: 'clip',
      width: '100%',
      maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
    }}>
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-5 py-2.5 rounded-full border text-xs font-mono whitespace-nowrap"
            style={{ borderColor: 'rgba(9,9,11,0.06)', background: 'rgba(255,255,255,0.8)', color: 'rgba(9,9,11,0.6)' }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function NetworkStat({ val, label, delay }: { val: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any }}
      className="text-center p-8 border-r last:border-0 md:border-r"
      style={{ background: 'rgba(255,255,255,0.6)', borderRight: '1px solid rgba(9,9,11,0.06)' }}
    >
      <div className="text-4xl md:text-5xl font-black text-[#09090b] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{val}</div>
      <div className="text-rgba(9,9,11,0.45) text-xs tracking-wide uppercase font-mono" style={{ color: 'rgba(9,9,11,0.45)' }}>{label}</div>
    </motion.div>
  );
}

export default function Networks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <section className="section" style={{ background: '#faf9f6', borderTop: '1px solid rgba(9,9,11,0.06)', overflowX: 'clip' }}>
      {/* Background grid glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(9,9,11,0.02) 0%, transparent 80%)' }} />

      <div className="dn-container" style={{ marginBottom: '4rem' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center"
        >
          <div className="badge badge-outline mb-5">Global Network</div>
          <h2 className="type-display" style={{ color: '#09090b', marginBottom: '1.25rem' }}>
            High-performance edge infrastructure.
          </h2>
          <p style={{ color: 'rgba(9,9,11,0.6)', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Run your serverless functions, databases, and static assets as close to your users as physically possible.
          </p>
        </motion.div>
      </div>

      {/* Ticker rows */}
      <div className="flex flex-col gap-3 mb-14">
        <Ticker items={regions} speed={45} />
        <Ticker items={technologies} speed={40} reverse />
        <Ticker items={regions.slice().reverse()} speed={50} />
      </div>

      {/* Stats */}
      <div className="dn-container">
        <div className="grid grid-cols-2 md:grid-cols-4 border rounded-2xl overflow-hidden"
          style={{ borderColor: 'rgba(9,9,11,0.08)', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)' }}>
          <NetworkStat val="450+" label="Global Regions" delay={0} />
          <NetworkStat val="99.99%" label="Core SLA Uptime" delay={0.1} />
          <NetworkStat val="< 15ms" label="Avg. Edge Latency" delay={0.2} />
          <NetworkStat val="50M+" label="Daily API Calls" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
