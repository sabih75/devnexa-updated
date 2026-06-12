'use client';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { useState, useRef, Suspense } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { FadeUp } from '@/components/ui/ScrollReveal';
import { useSearchParams, useRouter } from 'next/navigation';

const EASE = [0.16, 1, 0.3, 1] as const;
const B = '1px solid rgba(9,9,11,0.08)';
const D = '#09090b';

const METHODS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'contact@devnexa.dev',
    href: 'mailto:contact@devnexa.dev',
    accent: '#3b82f6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.37 2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.61a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+92 300 338 6392',
    href: 'https://wa.me/923003386392',
    accent: '#10b981',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'DHA Phase 2, Islamabad, Pakistan',
    href: 'https://maps.google.com/?q=DHA+Phase+2,Islamabad,Pakistan',
    accent: '#ec4899',
  },
];

function ContactCard({ m }: { m: typeof METHODS[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setCoords({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  function hexToRgb(hex: string) {
    const h = hex.replace('#', '');
    return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
  }

  return (
    <motion.a
      ref={ref}
      href={m.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      animate={{ backgroundColor: hovered ? `rgba(${hexToRgb(m.accent)}, 0.03)` : '#ffffff' }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.25rem',
        padding: '1.75rem', border: B, borderRadius: '16px',
        textDecoration: 'none', color: D, cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hovered ? 1 : 0, transition: 'opacity 350ms', background: `radial-gradient(200px circle at ${coords.x}% ${coords.y}%, rgba(${hexToRgb(m.accent)}, 0.1) 0%, transparent 65%)` }} />
      <motion.div aria-hidden animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${m.accent}cc, transparent)`, pointerEvents: 'none' }} />

      <motion.div
        animate={{ backgroundColor: hovered ? `rgba(${hexToRgb(m.accent)}, 0.12)` : 'rgba(9,9,11,0.04)', borderColor: hovered ? `rgba(${hexToRgb(m.accent)}, 0.4)` : 'rgba(9,9,11,0.08)', color: hovered ? m.accent : D }}
        transition={{ duration: 0.3 }}
        style={{ width: '48px', height: '48px', borderRadius: '14px', border: '1px solid rgba(9,9,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >
        {m.icon}
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.4)', marginBottom: '4px' }}>{m.label}</div>
        <motion.div animate={{ color: hovered ? m.accent : D }} transition={{ duration: 0.25 }} style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>
          {m.value}
        </motion.div>
      </div>

      <motion.svg animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }} transition={{ duration: 0.25 }} style={{ marginLeft: 'auto', flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.a>
  );
}

function ContactFormInner() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMock, setIsMock] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const rawService = searchParams.get('service') || '';
  const rawProject = searchParams.get('project') || '';
  const rawRole = searchParams.get('role') || '';

  // Clean formatting for the context
  const formatVal = (val: string) => val.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const selectedContext = rawService
    ? { type: 'Service', name: formatVal(rawService) }
    : rawProject
    ? { type: 'Project Case Study', name: formatVal(rawProject) }
    : rawRole
    ? { type: 'Career Role', name: formatVal(rawRole) }
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setErrorMessage('');
    setIsMock(false);
    setFeedbackMessage('');

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      budget: formData.get('budget'),
      message: formData.get('message'),
      service: rawService ? formatVal(rawService) : undefined,
      project: rawProject ? formatVal(rawProject) : undefined,
      role: rawRole ? formatVal(rawRole) : undefined,
    };

    try {
      let res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Fallback for Hostinger Static Hosting (where API routes return 404)
      if (res.status === 404) {
        console.warn('[DevNexa] API route not found (Static Hosting). Falling back to direct client-side Web3Forms submission.');
        
        const accessKey = '2ba6cd97-0e71-4358-aa3c-78162aa32215'; // Your Web3Forms key
        const contextLine = data.service
          ? `Service: ${data.service}`
          : data.project
          ? `Project reference: ${data.project}`
          : data.role
          ? `Role: ${data.role}`
          : '';

        const plainBody = [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || '—'}`,
          `Budget: ${data.budget || '—'}`,
          contextLine,
          '',
          'Message:',
          data.message,
        ].filter(Boolean).join('\n');

        const directRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New enquiry from ${data.name} (Direct Static Submission)`,
            from_name: 'DevNexa Contact Form',
            name: data.name,
            email: data.email,
            message: plainBody,
          }),
        });

        const w3fData = await directRes.json();
        if (directRes.ok && w3fData.success) {
          setStatus('sent');
          setIsMock(false);
          form.reset();
          router.push('/?contact-success=true');
          return;
        } else {
          throw new Error(w3fData.message || 'Direct submission to Web3Forms failed.');
        }
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || 'Something went wrong. Please try again.');
        }
        if (result.isMock) {
          setIsMock(true);
          setFeedbackMessage(result.message || 'Logged to server console.');
        }
      } else {
        const text = await res.text();
        throw new Error(text || `Server returned error status: ${res.status}`);
      }
      setStatus('sent');
      form.reset();
      router.push('/?contact-success=true');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Dynamic Context Header */}
      {selectedContext && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'rgba(9,9,11,0.03)',
          border: B,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '0.5rem',
        }}>
          <span style={{
            fontSize: '0.58rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: D,
            color: '#fff',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontWeight: 600,
          }}>
            {selectedContext.type}
          </span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: D }}>
            {selectedContext.name}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
        {[{ id: 'name', label: 'Full name', placeholder: 'Alex Johnson', type: 'text' }, { id: 'email', label: 'Work email', placeholder: 'alex@company.com', type: 'email' }].map(f => (
          <div key={f.id}>
            <label htmlFor={f.id} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.5)', marginBottom: '8px' }}>{f.label}</label>
            <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required suppressHydrationWarning style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: B, background: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: D, outline: 'none', transition: 'border-color 200ms' }} onFocus={e => e.target.style.borderColor = 'rgba(9,9,11,0.3)'} onBlur={e => e.target.style.borderColor = 'rgba(9,9,11,0.08)'} />
          </div>
        ))}
      </div>

      {[{ id: 'company', label: 'Company / project', placeholder: 'Acme Inc.', type: 'text' }, { id: 'budget', label: 'Estimated budget', placeholder: '$5,000 – $15,000', type: 'text' }].map(f => (
        <div key={f.id}>
          <label htmlFor={f.id} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.5)', marginBottom: '8px' }}>{f.label}</label>
          <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} suppressHydrationWarning style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: B, background: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: D, outline: 'none', transition: 'border-color 200ms' }} onFocus={e => e.target.style.borderColor = 'rgba(9,9,11,0.3)'} onBlur={e => e.target.style.borderColor = 'rgba(9,9,11,0.08)'} />
        </div>
      ))}

      <div>
        <label htmlFor="message" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(9,9,11,0.5)', marginBottom: '8px' }}>Message</label>
        <textarea id="message" name="message" rows={6} placeholder="Tell us about your project, timeline, and goals..." required suppressHydrationWarning style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: B, background: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: D, outline: 'none', resize: 'vertical', transition: 'border-color 200ms' }} onFocus={e => e.target.style.borderColor = 'rgba(9,9,11,0.3)'} onBlur={e => e.target.style.borderColor = 'rgba(9,9,11,0.08)'} />
      </div>

      {status === 'error' && (
        <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontSize: '0.875rem', lineHeight: 1.5 }}>
          {errorMessage}
        </div>
      )}

      {status === 'sent' && isMock && (
        <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#d97706', fontSize: '0.875rem', lineHeight: 1.5 }}>
          <strong>Mock Mode Active:</strong> {feedbackMessage}
        </div>
      )}

      <button type="submit" disabled={status === 'sending' || status === 'sent'} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 32px', borderRadius: '9999px', background: status === 'sent' ? '#10b981' : D, color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.01em', border: 'none', cursor: (status === 'sending' || status === 'sent') ? 'default' : 'pointer', transition: 'background 300ms ease, transform 150ms ease' }}>
        {status === 'idle' && <>Send message <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
        {status === 'error' && <>Retry sending <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
        {status === 'sending' && 'Sending…'}
        {status === 'sent' && '✓ Message sent!'}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <PageLayout
      eyebrow="Get in touch"
      title="Let's build"
      titleMuted="something great."
      subtitle="Tell us what you're working on — or what's broken. We'll scope it, price it fairly, and get moving fast."
    >
      <section className="section" style={{ background: '#faf9f6' }}>
        <div className="dn-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">

            {/* Left — form inside Suspense to prevent build-time static generation issues with useSearchParams */}
            <FadeUp margin="-80px">
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactFormInner />
              </Suspense>
            </FadeUp>

            {/* Right — contact methods */}
            <FadeUp delay={0.1} margin="-80px">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {METHODS.map(m => <ContactCard key={m.label} m={m} />)}
              </div>

              <div style={{ padding: '1.75rem', border: B, borderRadius: '16px', background: '#fff' }}>
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Response time</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.03em', color: D, marginBottom: '0.5rem' }}>Within 24 hours</p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(9,9,11,0.55)', lineHeight: 1.7 }}>We review every enquiry and respond with a tailored scope and timeline — no automated responses, no sales scripts.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
