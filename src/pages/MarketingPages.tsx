import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaBars,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaFileAlt,
  FaGlobe,
  FaIdCard,
  FaLock,
  FaPhoneAlt,
  FaShieldAlt,
  FaTimes,
  FaUserCheck,
} from 'react-icons/fa';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Why KYC', path: '/why-kyc' },
  { label: 'Process', path: '/process' },
  { label: 'Security', path: '/security' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export function MarketingHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 bg-[#030b21] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl bg-[#003061]/70 border border-blue-300/25 flex items-center justify-center text-blue-300">
            <FaShieldAlt className="text-xl" />
            <FaCheck className="absolute text-[9px] text-white" />
          </div>
          <div>
            <div className="text-2xl font-extrabold leading-none text-white tracking-wide">ENAKO</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">KYC Onboarding</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-white/70">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative hover:text-white transition-colors ${location.pathname === item.path ? 'text-white' : ''}`}
            >
              {item.label}
              {location.pathname === item.path && <span className="absolute -bottom-4 left-0 right-0 h-0.5 rounded-full bg-blue-300" />}
            </Link>
          ))}
        </nav>

        <Link to="/register" className="hidden sm:inline-flex rounded-xl bg-white text-[#003061] px-5 py-2.5 text-sm font-extrabold hover:bg-blue-50">
          Get Started
        </Link>

        <button
          type="button"
          onClick={() => setOpen(value => !value)}
          className="lg:hidden h-11 w-11 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden px-5 sm:px-8 pb-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 grid gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${location.pathname === item.path ? 'bg-white text-[#003061]' : 'text-white/80 hover:bg-white/10'}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/register" onClick={() => setOpen(false)} className="rounded-xl bg-white text-[#003061] px-4 py-3 text-sm font-extrabold mt-1">
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="bg-[#030b21] text-slate-400 py-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-xl bg-[#003061] flex items-center justify-center text-blue-200">
              <FaShieldAlt />
            </div>
            <div className="text-white font-extrabold text-xl">ENAKO</div>
          </div>
          <p className="text-sm leading-7 max-w-md">Secure, compliant, and professional KYC onboarding for individuals and companies.</p>
        </div>
        <div>
          <div className="text-white text-xs font-extrabold uppercase tracking-widest mb-4">Pages</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map(item => <Link key={item.path} to={item.path} className="hover:text-white">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <div className="text-white text-xs font-extrabold uppercase tracking-widest mb-4">Legal</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/compliance-policy" className="hover:text-white">Compliance Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <span>© 2026 ENAKO Financial.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PageShell({ eyebrow, title, description, children }: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-950">
      <MarketingHeader />
      <section className="relative overflow-hidden bg-[#030b21] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,33,0.96)_0%,rgba(3,11,33,0.86)_48%,rgba(3,11,33,0.55)_100%),url('/download.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(0,48,97,0.75),transparent_34%),linear-gradient(180deg,rgba(7,20,46,0.78)_0%,rgba(3,11,33,0.95)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle, rgba(110,163,255,0.45) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-300/25 bg-[#003061]/35 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-100 mb-5">{eyebrow}</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-tight mb-5">{title}</h1>
            <p className="text-lg text-slate-300 leading-8">{description}</p>
          </motion.div>
        </div>
      </section>
      <main className="relative z-10 -mt-10 mx-4 sm:mx-8 rounded-t-[2rem] bg-[#f7faff] shadow-[0_-18px_70px_rgba(15,23,42,0.16)]">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}

const pageData = {
  about: {
    eyebrow: 'About ENAKO',
    title: 'A secure client onboarding layer for modern finance.',
    description: 'ENAKO helps clients submit identity, business, compliance, and document information through a polished and trustworthy KYC experience.',
    body: [
      'ENAKO KYC Onboarding is built for clients who need a secure, professional, and understandable way to submit verification information. Instead of forcing applicants through a generic form, the experience separates company and individual registration so every user sees only what is relevant to their profile.',
      'The platform focuses on clarity at every step: users can see progress, understand why documents are needed, and move through the journey without feeling lost. This makes compliance feel less like paperwork and more like a guided financial onboarding experience.',
    ],
    cards: [
      { icon: FaShieldAlt, title: 'Compliance-first', text: 'Designed around identity checks, AML review, and clear audit trails.' },
      { icon: FaUserCheck, title: 'Client-friendly', text: 'Guided steps, plain language, and a smooth registration journey.' },
      { icon: FaFileAlt, title: 'Document-ready', text: 'Structured uploads for company and individual verification requirements.' },
    ],
  },
  why: {
    eyebrow: 'Why KYC',
    title: 'KYC protects clients, partners, and the platform.',
    description: 'Identity verification helps prevent fraud, support regulatory obligations, and build trust before financial services are activated.',
    body: [
      'KYC is the foundation of safe financial relationships. It helps confirm that clients are who they say they are, that companies are properly represented, and that funds or business activity can be reviewed responsibly before services begin.',
      'For ENAKO, KYC also protects genuine users. A strong onboarding process reduces impersonation, document abuse, ownership confusion, and preventable compliance delays.',
    ],
    cards: [
      { icon: FaShieldAlt, title: 'Prevent Fraud', text: 'Detect false identities, suspicious applications, and incomplete ownership data.' },
      { icon: FaFileAlt, title: 'Regulatory Compliance', text: 'Collect the information needed for AML, CTF, sanctions, and risk review.' },
      { icon: FaLock, title: 'Protect Data', text: 'Keep submitted information private, encrypted, and handled responsibly.' },
    ],
  },
  process: {
    eyebrow: 'The Process',
    title: 'A guided path from registration to approval.',
    description: 'The onboarding flow is split into clear steps so every applicant knows what is required and what happens next.',
    body: [
      'The process begins with account type selection. Companies complete corporate information, ownership, AML, banking, documents, and declaration sections. Individuals complete a simplified path for personal identity, employment, banking, uploads, and declaration.',
      'Each step is intentionally focused. Users complete one stage at a time, save draft progress locally, review validation messages, and submit a cleaner application for compliance review.',
    ],
    cards: [
      { icon: FaIdCard, title: '1. Choose Profile', text: 'Select company or individual registration so the right form appears.' },
      { icon: FaFileAlt, title: '2. Submit Details', text: 'Complete the multi-step KYC form and upload supporting documents.' },
      { icon: FaCheck, title: '3. Compliance Review', text: 'The ENAKO team reviews the application and confirms onboarding status.' },
    ],
  },
  security: {
    eyebrow: 'Security',
    title: 'Built to feel safe before users share sensitive information.',
    description: 'The interface emphasizes privacy, clarity, and controlled document collection across the full onboarding journey.',
    body: [
      'Security is not only a technical promise; it is also a design responsibility. ENAKO uses visible trust signals, clear copy, and calm interface patterns so users understand that sensitive data is being handled carefully.',
      'The onboarding journey avoids clutter, highlights secure document handling, and keeps applicants oriented through progress indicators and review states.',
    ],
    cards: [
      { icon: FaLock, title: 'Encrypted Journey', text: 'Every step is presented as a secure compliance workflow.' },
      { icon: FaShieldAlt, title: 'Trust Signals', text: 'Clear messaging helps users understand why information is requested.' },
      { icon: FaGlobe, title: 'Global Standards', text: 'The flow aligns with global KYC and AML onboarding expectations.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Answers before you begin onboarding.',
    description: 'Quick guidance for common questions about documents, review timing, privacy, and account type selection.',
    body: [
      'Before starting, applicants should prepare accurate identity details and any supporting documents that match their registration type. Companies may need corporate and ownership documents, while individuals usually need identity, proof of address, and selfie verification.',
      'If an application is incomplete, the compliance team may request corrections or additional documents. Complete and accurate submissions are reviewed faster.',
    ],
    cards: [
      { icon: FaClock, title: 'How long does review take?', text: 'Complete applications are typically reviewed within 2-5 business days.' },
      { icon: FaFileAlt, title: 'Which documents are needed?', text: 'Requirements depend on whether you register as a company or an individual.' },
      { icon: FaLock, title: 'Is my data private?', text: 'Yes. Submitted information is used for compliance review and protected carefully.' },
    ],
  },
};

export function InfoPage({ type }: { type: keyof typeof pageData }) {
  const page = pageData[type];
  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} description={page.description}>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 mb-10">
          <div className="rounded-[2rem] bg-white border border-[#d9e5f5] p-7 sm:p-9 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#003061] mb-4">Overview</div>
            <div className="space-y-5 text-slate-600 leading-8">
              {page.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#030b21] min-h-72 relative overflow-hidden border border-[#d9e5f5] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,11,33,0.45),rgba(0,48,97,0.85)),url('/download.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 text-white">
              <div className="text-sm font-extrabold mb-1">Secure onboarding workspace</div>
              <div className="text-xs text-blue-100">Built around trust, document clarity, and compliance review.</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {page.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white border border-[#d9e5f5] rounded-3xl p-7 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#003061]/8 text-[#003061] flex items-center justify-center mb-8">
                <card.icon className="text-2xl" />
              </div>
              <h2 className="text-xl font-extrabold text-[#07112b] mb-3">{card.title}</h2>
              <p className="text-sm text-slate-600 leading-7">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#030b21] text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#003061]/50 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="relative">
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-200 mb-2">Start securely</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to complete your KYC?</h3>
          </div>
          <Link to="/register" className="relative inline-flex items-center gap-3 rounded-xl bg-white text-[#003061] px-6 py-4 font-extrabold hover:bg-blue-50">
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function MarketingContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to the ENAKO onboarding team."
      description="For KYC, compliance, document, and account registration questions, send us a message and our team will respond."
    >
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <div className="space-y-5">
          {[
            { icon: FaEnvelope, label: 'Email', value: 'enakocompanyltd@gmail.com' },
            { icon: FaPhoneAlt, label: 'Phone', value: '+1 (800) 000-0000' },
            { icon: FaClock, label: 'Office Hours', value: 'Mon - Fri, 9am - 5pm GMT' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-[#d9e5f5] rounded-3xl p-6 flex items-center gap-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
              <div className="h-12 w-12 rounded-2xl bg-[#003061]/8 text-[#003061] flex items-center justify-center">
                <item.icon />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                <div className="text-sm font-bold text-[#07112b]">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white border border-[#d9e5f5] rounded-[2rem] p-10 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#003061]/8 text-[#003061] flex items-center justify-center mb-5">
              <FaCheck />
            </div>
            <h2 className="text-2xl font-extrabold text-[#07112b] mb-2">Message Sent</h2>
            <p className="text-slate-500 mb-6">Thank you. A member of our compliance team will respond within 1 business day.</p>
            <button onClick={() => setSubmitted(false)} className="rounded-xl bg-[#003061] text-white font-extrabold px-7 py-3">Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="bg-white border border-[#d9e5f5] rounded-[2rem] p-6 sm:p-8 space-y-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextInput label="Full Name" value={form.name} onChange={value => setForm({ ...form, name: value })} placeholder="Your full name" />
              <TextInput label="Email Address" type="email" value={form.email} onChange={value => setForm({ ...form, email: value })} placeholder="you@company.com" />
            </div>
            <TextInput label="Subject" value={form.subject} onChange={value => setForm({ ...form, subject: value })} placeholder="e.g. KYC form query" />
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your query in detail..." className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 text-sm" />
            </div>
            <button className="w-full rounded-xl bg-[#003061] text-white font-extrabold py-4 hover:bg-[#002347]">Send Message</button>
          </form>
        )}
      </section>
    </PageShell>
  );
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">{label}</label>
      <input required type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 text-sm" />
    </div>
  );
}
