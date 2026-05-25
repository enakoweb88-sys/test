import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaApple,
  FaGooglePlay,
  FaBars,
  FaShieldAlt,
  FaCheck,
  FaLock,
  FaPlay,
  FaGlobe,
  FaChevronDown,
  FaFileAlt,
  FaIdCard,
  FaRegUser,
  FaTimes,
  FaUserCheck,
} from 'react-icons/fa';
import Contact from './pages/Contact';
import CompliancePolicy from './pages/CompliancePolicy';
import TermsOfService from './pages/TermsOfService';
import Register from './pages/Register';
import ClientKycForm from './pages/ClientKycForm';
import { InfoPage } from './pages/MarketingPages';

// ─── Config ──────────────────────────────────────────────────────────────────
const CONTACT_PHONE = '+237 6 70 67 12 49';
const WHATSAPP_NUMBER = '237670671249';
const WEBSITE_URL = 'https://www.enako.cm';
const WEBSITE_LABEL = 'www.enako.cm';

// ─── WhatsApp Widget ──────────────────────────────────────────────────────────
function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setMessage('');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 sm:w-80 overflow-hidden"
          >
            <div className="bg-[#003061] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">ENAKO Support</div>
                  <div className="text-blue-100 text-xs">Typically replies within minutes</div>
                </div>
              </div>
            </div>
            <div className="bg-[#f0f4f8] p-4">
              <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                <p className="text-sm text-slate-700 leading-relaxed">Hello! Welcome to ENAKO Financial. How can we assist you with your compliance onboarding today?</p>
                <div className="text-[10px] text-slate-400 text-right mt-1">Support</div>
              </div>
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-end">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows={2}
                style={{ resize: 'none' }}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#003061] transition-colors min-w-0"
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} className="bg-[#003061] text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-[#002347] transition-colors flex-shrink-0">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-[#003061] hover:bg-[#002347] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
}

// ─── Upload Box ───────────────────────────────────────────────────────────────
function UploadBox({ label, hint }: { label: string; hint: string }) {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all group ${fileName ? 'border-[#003061] bg-blue-50/50' : 'border-slate-200 bg-white hover:border-[#003061] hover:bg-slate-50'
        }`}
    >
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
      <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1 leading-tight">{label}</div>
      <div className="text-[11px] sm:text-xs text-slate-400 mb-3">{hint}</div>
      {fileName ? (
        <div className="inline-block bg-[#003061] text-white text-xs font-semibold px-3 py-1 rounded-full break-all max-w-full">{fileName}</div>
      ) : (
        <div className="inline-block border border-slate-200 text-[#003061] text-xs font-semibold px-4 py-1.5 rounded-lg bg-white group-hover:border-[#003061] transition-colors">Browse File</div>
      )}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <div className="mb-4 sm:mb-5">
      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 sm:mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all bg-white text-slate-800"
      />
    </div>
  );
}

// ─── Yes/No Toggle ────────────────────────────────────────────────────────────
function YesNoToggle({ label, hint, value, onChange }: { label: string; hint?: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-slate-100 last:border-0">
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-800">{label}</div>
        {hint && <div className="text-xs text-slate-400 mt-0.5">{hint}</div>}
      </div>
      <div className="flex bg-slate-100 rounded-xl p-1 gap-1 self-start sm:self-auto">
        <button type="button" onClick={() => onChange(true)}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${value === true ? 'bg-[#003061] text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-slate-800'}`}>Yes</button>
        <button type="button" onClick={() => onChange(false)}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${value === false ? 'bg-[#003061] text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-slate-800'}`}>No</button>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 mb-5 scroll-mt-28 md:scroll-mt-6 transition-colors shadow-sm hover:shadow-md hover:border-slate-300">
      <h2 className="text-base sm:text-lg font-bold text-[#003061] mb-5 pb-4 border-b border-slate-100 tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────
function TableRow({ onRemove, showRemove }: { onRemove: () => void; showRemove: boolean }) {
  return (
    <tr className="border-b border-slate-50">
      {['Full name', 'Position', 'Nationality', '%'].map((ph, i) => (
        <td key={i} className="px-2 py-2 min-w-[100px]">
          <input className="w-full border border-slate-200 rounded-lg px-2 sm:px-3 py-2 text-sm outline-none focus:border-[#003061] transition-colors" placeholder={ph} />
        </td>
      ))}
      <td className="px-2 py-2 text-center">
        {showRemove && (
          <button onClick={onRemove} className="text-red-400 hover:text-red-600 font-bold text-lg w-7 h-7 rounded transition-colors">×</button>
        )}
      </td>
    </tr>
  );
}

// ─── Sidebar Steps ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'company-info', label: 'Company Info', num: '1' },
  { id: 'ownership', label: 'Ownership', num: '2' },
  { id: 'compliance', label: 'Compliance', num: '3' },
  { id: 'banking', label: 'Banking', num: '4' },
  { id: 'documents', label: 'Documents', num: '5' },
  { id: 'declaration', label: 'Declaration', num: '6' },
];

function Sidebar({ active }: { active: string }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <aside className="hidden md:flex w-56 lg:w-64 shrink-0 fixed top-0 left-0 h-screen bg-white border-r border-slate-200 flex-col px-4 py-8 z-20 overflow-y-auto">
      <Link to="/" className="flex items-center gap-2 mb-8 no-underline">
        <img src="/logo.png" alt="ENAKO Logo" className="h-24 w-auto object-contain" />
      </Link>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">KYC Progress</div>
      <nav className="flex flex-col gap-0.5">
        {STEPS.map(step => {
          const isActive = active === step.id;
          return (
            <button key={step.id} onClick={() => scrollTo(step.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${isActive ? 'bg-slate-50 text-[#003061] font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${isActive ? 'bg-[#003061] text-white' : 'bg-slate-100 text-slate-400'}`}>
                {step.num}
              </span>
              <span className="text-xs lg:text-sm">{step.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-5 border-t border-slate-100">
        <p className="text-[11px] text-slate-400">Need help?</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
          className="text-[11px] text-[#003061] font-semibold underline">Chat on WhatsApp</a>
      </div>
    </aside>
  );
}

// ─── KYC Form Page ────────────────────────────────────────────────────────────
function KYCForm() {
  const [activeSection, setActiveSection] = useState('company-info');
  const [hasAMLPolicy, setHasAMLPolicy] = useState<boolean | null>(null);
  const [hasTraining, setHasTraining] = useState<boolean | null>(null);
  const [directors, setDirectors] = useState([{ id: 1 }]);
  const [shareholders, setShareholders] = useState([{ id: 1 }]);
  const [declared, setDeclared] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    STEPS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const activeLabel = STEPS.find(s => s.id === activeSection);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-14 text-center max-w-md w-full shadow-lg">
          <div className="w-16 h-16 bg-[#003061]/8 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-[#003061]/15">
            <span className="text-[#003061] text-2xl font-extrabold">✓</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Application Submitted</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">Thank you. Our compliance team will review your documents and respond within 2–5 business days.</p>
          <button onClick={() => setSubmitted(false)}
            className="bg-[#003061] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#002347] transition-colors">
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar active={activeSection} />

      {/* Mobile sticky top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ENAKO Logo" className="h-24 w-auto object-contain" />
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none">Step {activeLabel?.num} of 6</div>
            <div className="text-xs font-bold text-[#003061] mt-0.5">{activeLabel?.label}</div>
          </div>
        </div>
        <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#003061] rounded-full transition-all duration-500"
            style={{ width: `${(Number(activeLabel?.num ?? 1) / 6) * 100}%` }} />
        </div>
      </div>

      {/* Main content - FULL WIDTH minus sidebar */}
      <main className="md:ml-56 lg:ml-64 flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 pt-24 md:pt-10 pb-20">
        <div className="max-w-5xl w-full mx-auto">
          {/* Desktop header */}
          <div className="hidden md:flex justify-end items-center gap-5 mb-8">
            <Link to="/contact" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Support</Link>
            <div className="w-8 h-8 rounded-full bg-[#003061] flex items-center justify-center text-white text-xs font-bold">JD</div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Client KYC & Compliance Form
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">All information is encrypted and securely processed.</p>
          </div>

          {/* ── 1. Company Info ─────────────────────────────── */}
          <SectionCard id="company-info" title="1. Company Information">
            <Input label="Full Legal Entity Name" placeholder="e.g. Acme Corporation Ltd" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input label="Registration Number" placeholder="REG-123456" />
              <Input label="Incorporation Date" type="date" placeholder="" />
            </div>
            <div className="mb-4 sm:mb-5">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Registered Address</label>
              <textarea rows={3} placeholder="Street address, City, Country" style={{ resize: 'none' }}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all bg-white text-slate-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input label="Email Address" placeholder="compliance@company.com" type="email" />
              <Input label="Website" placeholder="https://company.com" />
            </div>
            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Primary Business Activity</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all bg-white text-slate-800">
                <option value="">Select an activity...</option>
                <option>Financial Services</option>
                <option>Technology</option>
                <option>Retail / E-Commerce</option>
                <option>Real Estate</option>
                <option>Legal Services</option>
                <option>Healthcare</option>
                <option>Other</option>
              </select>
            </div>
          </SectionCard>

          {/* ── 2. Ownership ─────────────────────────────────── */}
          <SectionCard id="ownership" title="2. Directors & Shareholders">
            <p className="text-xs text-slate-400 mb-5">List all directors and shareholders holding 10% or more ownership.</p>

            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Directors</div>
              <div className="overflow-x-auto -mx-1 rounded-xl border border-slate-100">
                <table className="w-full text-sm min-w-[460px]">
                  <thead>
                    <tr className="bg-slate-50 text-left border-b border-slate-100">
                      {['Full Name', 'Position', 'Nationality', 'Ownership %', ''].map(h => (
                        <th key={h} className="px-2 sm:px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {directors.map(d => (
                      <TableRow key={d.id} showRemove={directors.length > 1} onRemove={() => setDirectors(p => p.filter(x => x.id !== d.id))} />
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={() => setDirectors(p => [...p, { id: Date.now() }])}
                className="mt-3 text-sm font-semibold text-[#003061] border border-[#003061]/30 rounded-lg px-4 py-2 hover:bg-[#003061]/5 transition-colors">
                + Add Director
              </button>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Shareholders</div>
              <div className="overflow-x-auto -mx-1 rounded-xl border border-slate-100">
                <table className="w-full text-sm min-w-[460px]">
                  <thead>
                    <tr className="bg-slate-50 text-left border-b border-slate-100">
                      {['Full Name', 'Position', 'Nationality', 'Ownership %', ''].map(h => (
                        <th key={h} className="px-2 sm:px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shareholders.map(s => (
                      <TableRow key={s.id} showRemove={shareholders.length > 1} onRemove={() => setShareholders(p => p.filter(x => x.id !== s.id))} />
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={() => setShareholders(p => [...p, { id: Date.now() }])}
                className="mt-3 text-sm font-semibold text-[#003061] border border-[#003061]/30 rounded-lg px-4 py-2 hover:bg-[#003061]/5 transition-colors">
                + Add Shareholder
              </button>
            </div>
          </SectionCard>

          {/* ── 3. Compliance ────────────────────────────────── */}
          <SectionCard id="compliance" title="3. AML & Compliance">
            <YesNoToggle label="Do you have an AML/CTF Policy?" hint="Required for financial institutions" value={hasAMLPolicy} onChange={setHasAMLPolicy} />
            <div className="mt-4">
              <Input label="Compliance Officer Name" placeholder="Full legal name" />
            </div>
            <YesNoToggle label="Has your staff completed AML Training?" hint="Training must be within the last 12 months" value={hasTraining} onChange={setHasTraining} />
          </SectionCard>

          {/* ── 4. Banking ───────────────────────────────────── */}
          <SectionCard id="banking" title="4. Banking Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input label="Bank Name" placeholder="e.g. Global Finance Bank" />
              <Input label="SWIFT / BIC Code" placeholder="GFLBUKKXXXX" />
            </div>
            <Input label="Account Number / IBAN" placeholder="e.g. GB1234567890" />
            <Input label="Country of Bank" placeholder="e.g. United Kingdom" />
          </SectionCard>

          {/* ── 5. Documents ─────────────────────────────────── */}
          <SectionCard id="documents" title="5. Supporting Documents">
            <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">Upload clear copies of all documents below. PDF, JPG, or PNG files up to 10MB each.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <UploadBox label="i. Certificate of Incorporation" hint="PDF or JPG up to 10MB" />
              <UploadBox label="ii. Articles of Association" hint="PDF up to 10MB" />
              <UploadBox label="iii. Company Tax Registration Certificate" hint="Current valid year" />
              <UploadBox label="iv. IDs / Passports of Directors & Shareholders" hint="High-resolution scan required" />
              <UploadBox label="v. Proof of Address" hint="Utility Bill or Lease Agreement" />
              <UploadBox label="vi. AML Policy Document" hint="Current internal AML policy" />
            </div>
            <UploadBox label="vii. Recent Company Bank Statement" hint="Last 6 months of account activity" />
          </SectionCard>

          {/* ── 6. Declaration ───────────────────────────────── */}
          <SectionCard id="declaration" title="6. Declaration">
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 mb-5 border border-slate-100">
              <label className="flex gap-3 sm:gap-4 cursor-pointer items-start">
                <input type="checkbox" checked={declared} onChange={e => setDeclared(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#003061] shrink-0 cursor-pointer" />
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">I hereby declare</strong> that the information provided in this form is true, accurate, and complete to the best of my knowledge.
                  I understand that any false statement may result in the rejection of this application and possible legal action.
                  I authorise ENAKO Financial to verify this information through accredited compliance services.
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input label="Full Name" placeholder="Type your full legal name" />
              <Input label="Position / Title" placeholder="e.g. CEO, Managing Director" />
            </div>
            <Input label="Date" type="date" placeholder="" />
          </SectionCard>

          {/* Submit */}
          <button onClick={() => { if (declared) setSubmitted(true); }} disabled={!declared}
            className={`w-full py-4 sm:py-5 font-bold text-base sm:text-lg transition-all ${declared
                ? 'bg-[#003061] text-white hover:bg-[#002347] shadow-xl shadow-[#003061]/20 hover:shadow-2xl hover:shadow-[#003061]/30 hover:-translate-y-0.5'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}>
            Submit KYC Application
          </button>
          {!declared && <p className="text-center text-xs text-slate-400 mt-2">Please accept the declaration above to submit.</p>}
          <p className="text-center text-xs text-slate-400 mt-3">
            By submitting, you accept our{' '}
            <Link to="/compliance-policy" className="underline text-slate-500">Compliance Policy</Link> and{' '}
            <Link to="/terms" className="underline text-slate-500">Terms of Service</Link>.
          </p>

          {/* Mobile App Promo Banner */}
          <div className="mt-12 overflow-hidden bg-gradient-to-br from-[#003061] via-[#004d99] to-[#011429] p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 group">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 opacity-80">Lifestyle & Finance — ENAKO App</div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight italic">Financial Freedom<br />in One App</h3>
              <p className="text-blue-100/70 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
                The ENAKO mobile app is designed to simplify your life. Save money with varied accounts, play njangi online with ease, and pay all your utility bills (electricity, water, school fees, and rent) — all while earning from managed investments.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2.5 transition-colors cursor-pointer">
                  <FaApple className="text-xl text-white" />
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none opacity-60">Download on</div>
                    <div className="text-xs font-bold text-white leading-none">App Store</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2.5 transition-colors cursor-pointer">
                  <FaGooglePlay className="text-lg text-white" />
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none opacity-60">Get it on</div>
                    <div className="text-xs font-bold text-white leading-none">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-56 sm:w-64 lg:w-72 shrink-0 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] scale-125 rounded-full" />
              <img src="/phone.jpeg" alt="ENAKO Mobile App" className="relative w-full h-auto shadow-2xl transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
            <img src="/logo.png" alt="ENAKO Financial" className="mx-auto mb-4 h-24 w-auto object-contain" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-slate-400 mb-4">
              <Link to="/contact" className="hover:text-slate-600 transition-colors">Contact Support</Link>
              <Link to="/compliance-policy" className="hover:text-slate-600 transition-colors">Compliance Policy</Link>
              <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            </div>
            <div className="text-xs text-slate-300">© 2026 ENAKO Financial. All rights reserved.</div>
          </footer>
        </div>
      </main>
    </div>
  );
}



// ─── Landing Page ─────────────────────────────────────────────────────────────
// ─── Translations Dictionary ──────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navWhyKYC: 'Why KYC',
    navProcess: 'Process',
    navSecurity: 'Security',
    navFAQ: 'FAQ',
    navContact: 'Contact',
    navSupport: 'Support',
    badgeText: 'Secure. Compliant. Trusted.',
    heroTitle: 'Welcome to ENAKO Client Onboarding',
    heroSub: 'A secure and seamless KYC process designed to verify your identity and protect our platform. Your data is safe with us.',
    secure: 'Secure',
    compliant: 'Compliant',
    trusted: 'Trusted',
    bankEnc: 'Bank-level encryption',
    meetsStd: 'Meets global standards',
    privacyMat: 'Your privacy matters',
    getStarted: 'Get Started',
    howItWorks: 'How It Works',
    whyEnako: 'Why ENAKO',
    whyTitle: 'Built for Financial Compliance',
    whySub: 'A professional-grade onboarding platform trusted by financial institutions across the globe.',
    secTitle: 'Bank-Grade Security',
    secDesc: 'All data is AES-256 encrypted at rest and in transit. We implement zero-trust access principles across our infrastructure.',
    regTitle: 'Regulatory Aligned',
    regDesc: 'Our KYC framework is aligned with FATF, OFAC, EU, and HMT standards. We keep compliance current with regulatory changes.',
    fastTitle: 'Fast Review',
    fastDesc: 'Our dedicated compliance team reviews complete applications within 2–5 business days with full transparency on status.',
    docTitle: 'Document Management',
    docDesc: 'Upload, track, and manage all required compliance documents through a single secure hub with clear status indicators.',
    amlTitle: 'AML Screening',
    amlDesc: 'Every client is screened against live global sanctions lists automatically before onboarding is approved.',
    supTitle: 'Dedicated Support',
    supDesc: 'Get answers fast from our compliance specialists via live chat, WhatsApp, and email during business hours.',
    processTag: 'The Process',
    processTitle: 'How Onboarding Works',
    processSub: 'Scroll through each stage. The cards move inward and stack as the application journey progresses.',
    step1Tag: 'Start',
    step1Title: 'Choose Your Registration Type',
    step1Desc: 'Select Company or Individual so ENAKO can personalize the form, document list, and compliance questions for your profile.',
    step2Tag: 'Details',
    step2Title: 'Complete the Guided Form',
    step2Desc: 'Move through focused sections with progress indicators, validation messages, saved draft state, and a clean review path.',
    step3Tag: 'Documents',
    step3Title: 'Upload Secure Documents',
    step3Desc: 'Submit identity, proof of address, corporate documents, bank statements, and AML files through a polished upload experience.',
    step4Tag: 'Approval',
    step4Title: 'Compliance Review & Approval',
    step4Desc: 'ENAKO reviews the application, verifies information, and confirms onboarding status when requirements are satisfied.',
    securityTag: 'Security',
    securityTitle: 'Your trust is our priority.',
    securitySub: 'Every onboarding step is designed to feel clear, controlled, and secure before clients share sensitive identity, business, and banking information.',
    secCard1Title: 'Encrypted Data',
    secCard1Text: 'Sensitive documents are handled through a protected onboarding flow.',
    secCard2Title: 'Privacy First',
    secCard2Text: 'Applicants always know why information is being requested.',
    secCard3Title: 'AML Ready',
    secCard3Text: 'Corporate and individual forms support structured compliance review.',
    secCard4Title: 'Clear Status',
    secCard4Text: 'Progressive steps help users complete applications with confidence.',
    appTag: 'ENAKO Mobile App',
    appTitle: 'Manage your money beyond onboarding.',
    appSub: 'Use the ENAKO app to save, manage njangi contributions, pay bills, track investments, and keep your financial life moving from one secure mobile experience.',
    appPoint1: 'Savings accounts',
    appPoint2: 'Njangi online',
    appPoint3: 'Bills & investments',
    downloadOn: 'Download on',
    getItOn: 'Get it on',
    reqTag: 'Requirements',
    reqTitle: 'Documents You Will Need',
    reqSub: 'Prepare the following before you begin. All 7 documents are mandatory — incomplete applications cannot be processed.',
    tableNum: '#',
    tableDoc: 'Document',
    tableReq: 'Requirement',
    tableFmt: 'Format',
    doc1Name: 'Certificate of Incorporation',
    doc1Req: 'Original company registration issued by registry',
    doc2Name: 'Articles of Association',
    doc2Req: 'Constitutional document of the company',
    doc3Name: 'Company Tax Registration Certificate',
    doc3Req: 'Valid for current financial year',
    doc4Name: 'Director & Shareholder IDs / Passports',
    doc4Req: 'Government-issued ID, high-resolution scan',
    doc5Name: 'Proof of Address',
    doc5Req: 'Utility bill or lease agreement, not older than 3 months',
    doc6Name: 'AML Policy Document',
    doc6Req: 'Internal AML/CTF policy, signed and dated',
    doc7Name: 'Recent Company Bank Statement',
    doc7Req: 'Official statement covering last 6 months',
    reqFooterText: 'All 7 documents must be submitted to proceed.',
    reqFooterSub: 'Applications typically take 10–15 minutes to complete.',
    reqFooterBtn: 'Begin KYC Application',
    ctaTitle: 'Ready to Get Started?',
    ctaSub: 'Join thousands of businesses already onboarded with ENAKO Financial.',
    ctaBtn: 'Begin KYC Application',
    footerSlogan: 'A regulated financial compliance platform. Secure. Professional. Trusted.',
    footerPages: 'Pages',
    footerContact: 'Contact',
    footerHours: 'Mon – Fri, 9am – 5pm GMT',
  },
  fr: {
    navHome: 'Accueil',
    navAbout: 'À propos',
    navWhyKYC: 'Pourquoi KYC',
    navProcess: 'Processus',
    navSecurity: 'Sécurité',
    navFAQ: 'FAQ',
    navContact: 'Contact',
    navSupport: 'Support',
    badgeText: 'Sécurisé. Conforme. Fiable.',
    heroTitle: 'Bienvenue sur ENAKO Intégration Client',
    heroSub: 'Un processus KYC sécurisé et transparent conçu pour vérifier votre identité et protéger notre plateforme. Vos données sont en sécurité avec nous.',
    secure: 'Sécurisé',
    compliant: 'Conforme',
    trusted: 'Fiable',
    bankEnc: 'Chiffrement de niveau bancaire',
    meetsStd: 'Répond aux normes mondiales',
    privacyMat: 'Votre vie privée compte',
    getStarted: 'Commencer',
    howItWorks: 'Comment ça marche',
    whyEnako: 'Pourquoi ENAKO',
    whyTitle: 'Conçu pour la Conformité Financière',
    whySub: 'Une plateforme d\'intégration de niveau professionnel à laquelle font confiance les institutions financières du monde entier.',
    secTitle: 'Sécurité de Niveau Bancaire',
    secDesc: 'Toutes les données sont chiffrées en AES-256 au repos et en transit. Nous appliquons les principes d\'accès zéro-trust à toute notre infrastructure.',
    regTitle: 'Alignement Réglementaire',
    regDesc: 'Notre cadre KYC est aligné sur les normes GAFI, OFAC, UE et HMT. Nous maintenons la conformité à jour avec les changements réglementaires.',
    fastTitle: 'Examen Rapide',
    fastDesc: 'Notre équipe de conformité dédiée examine les dossiers complets sous 2 à 5 jours ouvrables avec une transparence totale sur le statut.',
    docTitle: 'Gestion des Documents',
    docDesc: 'Téléchargez, suivez et gérez tous les documents de conformité requis via un hub unique et sécurisé avec des indicateurs de statut clairs.',
    amlTitle: 'Filtrage LCB-FT',
    amlDesc: 'Chaque client est automatiquement filtré par rapport aux listes de sanctions mondiales en temps réel avant approbation.',
    supTitle: 'Support Dédié',
    supDesc: 'Obtenez des réponses rapides de nos spécialistes de conformité via chat en direct, WhatsApp et e-mail.',
    processTag: 'Le Processus',
    processTitle: 'Comment Fonctionne l\'Intégration',
    processSub: 'Faites défiler chaque étape. Les cartes se déplacent vers l\'intérieur et se superposent au fur et à mesure de l\'intégration.',
    step1Tag: 'Début',
    step1Title: 'Choisissez votre Type d\'Enregistrement',
    step1Desc: 'Sélectionnez Entreprise ou Particulier afin qu\'ENAKO puisse personnaliser le formulaire, la liste des documents et les questions de conformité.',
    step2Tag: 'Détails',
    step2Title: 'Remplissez le Formulaire Guidé',
    step2Desc: 'Parcourez les sections ciblées avec des indicateurs de progression, des messages de validation et un parcours d\'examen propre.',
    step3Tag: 'Documents',
    step3Title: 'Téléchargez des Documents Sécurisés',
    step3Desc: 'Soumettez votre identité, justificatif de domicile, documents d\'entreprise, relevés bancaires et fichiers AML via une interface épurée.',
    step4Tag: 'Approbation',
    step4Title: 'Examen de Conformité & Approbation',
    step4Desc: 'ENAKO examine la demande, vérifie les informations et confirme le statut de l\'intégration lorsque les exigences sont satisfaites.',
    securityTag: 'Sécurité',
    securityTitle: 'Votre confiance est notre priorité.',
    securitySub: 'Chaque étape d\'intégration est conçue pour être claire, contrôlée et sécurisée avant que les clients ne partagent des informations sensibles.',
    secCard1Title: 'Données Chiffrées',
    secCard1Text: 'Les documents sensibles sont gérés via un flux d\'intégration protégé.',
    secCard2Title: 'Confidentialité d\'abord',
    secCard2Text: 'Les candidats savent toujours pourquoi les informations sont demandées.',
    secCard3Title: 'Prêt pour l\'AML',
    secCard3Text: 'Les formulaires d\'entreprise et individuels facilitent l\'examen de conformité structuré.',
    secCard4Title: 'Statut Clair',
    secCard4Text: 'Des étapes progressives aident les utilisateurs à remplir leur dossier en toute confiance.',
    appTag: 'Application Mobile ENAKO',
    appTitle: 'Gérez votre argent au-delà de l\'intégration.',
    appSub: 'Utilisez l\'application ENAKO pour épargner, gérer les cotisations de njangi, payer les factures, suivre les investissements et gérer votre vie financière depuis une expérience mobile unique.',
    appPoint1: 'Comptes d\'épargne',
    appPoint2: 'Njangi en ligne',
    appPoint3: 'Factures & investissements',
    downloadOn: 'Télécharger sur',
    getItOn: 'Disponible sur',
    reqTag: 'Exigences',
    reqTitle: 'Documents dont vous aurez besoin',
    reqSub: 'Préparez les documents suivants avant de commencer. Les 7 documents sont obligatoires — les demandes incomplètes ne peuvent pas être traitées.',
    tableNum: '#',
    tableDoc: 'Document',
    tableReq: 'Exigence',
    tableFmt: 'Format',
    doc1Name: 'Certificat de constitution',
    doc1Req: 'Enregistrement original de l\'entreprise délivré par le registre',
    doc2Name: 'Statuts de l\'entreprise',
    doc2Req: 'Document constitutionnel de l\'entreprise',
    doc3Name: 'Certificat d\'enregistrement fiscal',
    doc3Req: 'Valide pour l\'année financière en cours',
    doc4Name: 'Pièces d\'identité / Passeports des directeurs & actionnaires',
    doc4Req: 'Pièce d\'identité délivrée par le gouvernement, scan haute résolution',
    doc5Name: 'Justificatif de domicile',
    doc5Req: 'Facture de services publics ou contrat de bail, datant de moins de 3 mois',
    doc6Name: 'Document de politique LCB-FT',
    doc6Req: 'Politique LCB-FT interne actuelle, signée et datée',
    doc7Name: 'Relevé bancaire récent de l\'entreprise',
    doc7Req: 'Relevé officiel couvrant les 6 derniers mois',
    reqFooterText: 'Les 7 documents doivent être soumis pour continuer.',
    reqFooterSub: 'Les demandes prennent généralement 10 à 15 minutes.',
    reqFooterBtn: 'Commencer l\'intégration KYC',
    ctaTitle: 'Prêt à commencer ?',
    ctaSub: 'Rejoignez des milliers d\'entreprises déjà intégrées avec ENAKO Financial.',
    ctaBtn: 'Commencer l\'application KYC',
    footerSlogan: 'Une plateforme de conformité financière réglementée. Sécurisée. Professionnelle. Fiable.',
    footerPages: 'Pages',
    footerContact: 'Contact',
    footerHours: 'Lun – Ven, 9h – 17h GMT',
  }
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    return (localStorage.getItem('enako_language') as 'en' | 'fr') || 'en';
  });
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* NAV + HERO */}
      <section className="relative min-h-[720px] bg-[#030b21] overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(49,103,255,0.28),transparent_34%),radial-gradient(circle_at_22%_18%,rgba(44,116,255,0.14),transparent_28%),linear-gradient(180deg,#07142e_0%,#030b21_100%)]" />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(85,132,255,0.55) 1px, transparent 1px)', backgroundSize: '46px 46px' }} />

        <nav className="relative z-30 px-4 sm:px-8 pt-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="ENAKO Logo" className="h-28 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-9 text-sm font-semibold text-white/80">
              {[
                { label: t.navHome, path: '/' },
                { label: t.navAbout, path: '/about' },
                { label: t.navWhyKYC, path: '/why-kyc' },
                { label: t.navProcess, path: '/process' },
                { label: t.navSecurity, path: '/security' },
                { label: t.navFAQ, path: '/faq' },
              ].map((item, index) => (
                <Link key={item.path} to={item.path}
                  className={`relative hover:text-white transition-colors ${index === 0 ? 'text-white' : ''}`}>
                  {item.label}
                  {index === 0 && <span className="absolute -bottom-4 left-0 right-0 h-0.5 rounded-full bg-blue-400" />}
                </Link>
              ))}
              <Link to="/contact" className="hover:text-white transition-colors">{t.navContact}</Link>
            </div>

            <div className="hidden sm:block relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white/90 hover:bg-white/10 transition-all cursor-pointer"
              >
                <FaGlobe className="text-white/80" />
                {lang === 'en' ? 'English' : 'Français'}
                <FaChevronDown className={`text-xs text-white/55 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#0c1630] p-1.5 shadow-2xl z-50"
                    >
                      <button
                        onClick={() => {
                          setLang('en');
                          localStorage.setItem('enako_language', 'en');
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          lang === 'en' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        English
                        {lang === 'en' && <FaCheck className="text-[10px]" />}
                      </button>
                      <button
                        onClick={() => {
                          setLang('fr');
                          localStorage.setItem('enako_language', 'fr');
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          lang === 'fr' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        Français
                        {lang === 'fr' && <FaCheck className="text-[10px]" />}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen(open => !open)}
              className="lg:hidden h-11 w-11 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {mobileNavOpen && (
            <div className="lg:hidden max-w-7xl mx-auto mt-4 rounded-2xl border border-white/10 bg-[#07112c] p-4 grid gap-1 shadow-2xl relative z-40">
              {[
                { label: t.navHome, path: '/' },
                { label: t.navAbout, path: '/about' },
                { label: t.navWhyKYC, path: '/why-kyc' },
                { label: t.navProcess, path: '/process' },
                { label: t.navSecurity, path: '/security' },
                { label: t.navFAQ, path: '/faq' },
                { label: t.navContact, path: '/contact' },
              ].map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMobileNavOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10">
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-white/10 my-2 pt-3 px-4 flex items-center justify-between">
                <span className="text-xs font-bold text-white/60">Language / Langue</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setLang('en');
                      localStorage.setItem('enako_language', 'en');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      lang === 'en' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLang('fr');
                      localStorage.setItem('enako_language', 'fr');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      lang === 'fr' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Français
                  </button>
                </div>
              </div>

              <Link to="/register" onClick={() => setMobileNavOpen(false)} className="rounded-xl bg-white text-[#003061] px-4 py-3 text-sm font-extrabold mt-2 text-center shadow-lg block">
                {t.getStarted}
              </Link>
            </div>
          )}
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-28 grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-200 shadow-[inset_0_0_18px_rgba(96,165,250,0.15)] mb-7">
              <span className="h-6 w-6 rounded-full bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <FaShieldAlt className="text-xs" />
              </span>
              {t.badgeText}
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] text-white mb-7 drop-shadow-[0_8px_28px_rgba(15,23,42,0.35)]">
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-8 max-w-2xl mx-auto lg:mx-0 mb-8">
              {t.heroSub}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9 max-w-2xl mx-auto lg:mx-0">
              {[
                { icon: FaShieldAlt, title: t.secure, text: t.bankEnc },
                { icon: FaCheck, title: t.compliant, text: t.meetsStd },
                { icon: FaLock, title: t.trusted, text: t.privacyMat },
              ].map(item => (
                <div key={item.title} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="h-9 w-9 rounded-xl border border-blue-400/35 bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <item.icon />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button onClick={() => navigate('/register')}
                className="inline-flex items-center justify-center gap-6 rounded-xl bg-gradient-to-r from-[#3b82ff] to-[#a855f7] px-8 py-4 text-base font-extrabold text-white shadow-[0_18px_45px_rgba(59,130,246,0.28)] hover:-translate-y-1 transition-all cursor-pointer">
                {t.getStarted}
                <span className="text-xl leading-none">→</span>
              </button>
              <a href="#process"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/40 bg-white/[0.025] px-8 py-4 text-base font-extrabold text-white hover:bg-white/10 transition-all">
                <span className="h-7 w-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                  <FaPlay className="text-[10px] ml-0.5" />
                </span>
                {t.howItWorks}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12 }}
            className="relative min-h-[440px] hidden lg:block">
            <div className="absolute left-[8%] top-[2%] h-[500px] w-[500px] rounded-full border border-blue-500/20" />
            <div className="absolute left-[14%] top-[10%] h-[390px] w-[390px] rounded-full border border-blue-500/10" />
            {[['18%', '45%'], ['70%', '9%'], ['76%', '92%']].map(([left, top]) => (
              <span key={`${left}-${top}`} className="absolute h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.95)]" style={{ left, top }} />
            ))}

            <div className="absolute left-[15%] bottom-8 h-20 w-[470px] rounded-[2rem] bg-[#0b1737] border border-blue-300/10 shadow-[0_28px_90px_rgba(0,0,0,0.48)] rotate-[-2deg]" />
            <div className="absolute left-[21%] bottom-20 h-40 w-56 rounded-3xl bg-gradient-to-br from-[#1c2b61] to-[#07142f] border border-white/12 shadow-2xl rotate-[1deg]">
              <div className="absolute left-6 top-7 h-24 w-24 rounded-xl bg-gradient-to-br from-white to-blue-200/70 flex items-center justify-center text-[#15265e] shadow-[inset_0_0_28px_rgba(255,255,255,0.65)]">
                <FaRegUser className="text-5xl" />
              </div>
              <div className="absolute left-36 top-9 h-4 w-24 rounded-full bg-blue-300/65" />
              <div className="absolute left-36 top-16 h-3 w-16 rounded-full bg-blue-300/40" />
              <div className="absolute left-7 bottom-12 h-3 w-36 rounded-full bg-blue-200/28" />
              <div className="absolute left-7 bottom-7 h-3 w-28 rounded-full bg-blue-200/20" />
              <div className="absolute right-[-20px] bottom-12 h-14 w-14 rounded-full bg-[#003061] flex items-center justify-center text-white shadow-[0_0_28px_rgba(0,48,97,0.55)]">
                <FaCheck className="text-2xl" />
              </div>
            </div>

            <div className="absolute left-[44%] bottom-16 h-44 w-64 rounded-[1.8rem] bg-gradient-to-br from-[#193777] to-[#07173c] border border-blue-300/15 shadow-2xl" />
            <div className="absolute left-[40%] top-[18%] h-64 w-56">
              <div className="absolute inset-0 bg-blue-500/25 blur-3xl" />
              <div className="relative h-full w-full bg-gradient-to-br from-blue-200 via-[#4b83ff] to-[#0b55d9] border border-blue-100/80 shadow-[0_26px_80px_rgba(59,130,246,0.55)]"
                style={{ clipPath: 'polygon(50% 0%, 94% 18%, 88% 72%, 50% 100%, 12% 72%, 6% 18%)' }}>
                <div className="absolute inset-[12px] bg-gradient-to-br from-white/25 via-blue-400/35 to-blue-900/15"
                  style={{ clipPath: 'polygon(50% 0%, 94% 18%, 88% 72%, 50% 100%, 12% 72%, 6% 18%)' }} />
                <FaCheck className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-blue-50 drop-shadow-[0_8px_18px_rgba(255,255,255,0.25)]" />
              </div>
            </div>

            {[
              { top: '25%', title: 'Identity Verified', text: 'Secure verification', icon: FaCheck },
              { top: '47%', title: 'Documents Secure', text: 'Encrypted & protected', icon: FaLock, color: 'blue' },
              { top: '69%', title: 'KYC Approved', text: 'Ready to onboard', icon: FaCheck },
            ].map(card => (
              <div key={card.title} className="absolute right-0 w-56 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]" style={{ top: card.top }}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white bg-[#003061] shrink-0">
                    <card.icon />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">{card.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{card.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* WHY ENAKO */}
      <section className="relative z-20 -mt-12 mx-4 sm:mx-8 rounded-t-[2rem] py-20 sm:py-28 bg-[#f8f9fc] shadow-[0_-12px_60px_rgba(15,23,42,0.14)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">{t.whyEnako}</div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{t.whyTitle}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">{t.whySub}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { num: '01', title: t.secTitle, desc: t.secDesc },
              { num: '02', title: t.regTitle, desc: t.regDesc },
              { num: '03', title: t.fastTitle, desc: t.fastDesc },
              { num: '04', title: t.docTitle, desc: t.docDesc },
              { num: '05', title: t.amlTitle, desc: t.amlDesc },
              { num: '06', title: t.supTitle, desc: t.supDesc },
            ].map((f, i) => (
              <motion.div key={f.num} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all group">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-100 group-hover:text-[#003061]/10 transition-colors mb-3">{f.num}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28 bg-white overflow-visible" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">{t.processTag}</div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{t.processTitle}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">{t.processSub}</p>
          </motion.div>

          <div className="relative">
            {[
              { step: '01', icon: FaIdCard, title: t.step1Title, tag: t.step1Tag, desc: t.step1Desc },
              { step: '02', icon: FaFileAlt, title: t.step2Title, tag: t.step2Tag, desc: t.step2Desc },
              { step: '03', icon: FaShieldAlt, title: t.step3Title, tag: t.step3Tag, desc: t.step3Desc },
              { step: '04', icon: FaUserCheck, title: t.step4Title, tag: t.step4Tag, desc: t.step4Desc },
            ].map((card, index) => (
              <motion.article
                key={card.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -90 : 90, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ amount: 0.55 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="sticky mb-8 rounded-[2rem] border border-[#d9e5f5] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.12)] overflow-hidden"
                style={{ top: `${80 + index * 22}px`, zIndex: 10 + index }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] min-h-[300px]">
                  <div className="relative bg-[#030b21] text-white p-8 sm:p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,48,97,0.95),transparent_42%)]" />
                    <div className="relative">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-blue-200 mb-6">{card.tag}</div>
                      <div className="h-20 w-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center mb-8 text-blue-100">
                        <card.icon className="text-4xl" />
                      </div>
                      <div className="text-7xl font-extrabold text-white/10 leading-none">{card.step}</div>
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#07112b] mb-5">{card.title}</h3>
                    <p className="text-slate-600 leading-8 text-sm sm:text-base max-w-2xl">{card.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-20 sm:py-28 bg-[#030b21] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,48,97,0.75),transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp} className="text-center lg:text-left">
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-200 mb-4">{t.securityTag}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] leading-tight mb-5">{t.securityTitle}</h2>
            <p className="text-slate-300 leading-8 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">{t.securitySub}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: t.secCard1Title, text: t.secCard1Text },
              { title: t.secCard2Title, text: t.secCard2Text },
              { title: t.secCard3Title, text: t.secCard3Text },
              { title: t.secCard4Title, text: t.secCard4Text },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
                <div className="h-10 w-10 rounded-xl bg-[#003061] flex items-center justify-center mb-5 shrink-0 text-white">
                  <FaShieldAlt />
                </div>
                <h3 className="font-extrabold mb-2 text-base sm:text-lg">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-6">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="bg-[#061229] text-white overflow-hidden border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,48,97,0.4),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex w-fit mx-auto lg:mx-0 items-center rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-100 mb-5">
              {t.appTag}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] leading-tight mb-5">
              {t.appTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-8 max-w-2xl mx-auto lg:mx-0 mb-8">
              {t.appSub}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto lg:mx-0 w-full">
              {[t.appPoint1, t.appPoint2, t.appPoint3].map(item => (
                <div key={item} className="bg-white/[0.07] px-4 py-3 text-sm font-bold text-blue-50 flex items-center justify-center lg:justify-start rounded-xl border border-white/5">
                  <FaCheck className="mr-2 text-blue-300 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left text-[#003061] font-extrabold hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-lg cursor-pointer">
                <FaApple className="text-2xl" />
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-1">{t.downloadOn}</span>
                  <span className="block text-sm leading-none">App Store</span>
                </span>
              </button>
              <button className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 text-left text-white font-extrabold hover:bg-white/15 hover:-translate-y-0.5 transition-all border border-white/10 shadow-lg cursor-pointer">
                <FaGooglePlay className="text-xl" />
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-blue-100/70 leading-none mb-1">{t.getItOn}</span>
                  <span className="block text-sm leading-none">Google Play</span>
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="flex items-center justify-center relative">
            <div className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] bg-blue-500/10 blur-[80px] rounded-full" />
            <div className="relative max-w-[260px] sm:max-w-[300px] w-full shrink-0 group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/40 via-purple-600/30 to-pink-500/40 rounded-[2.8rem] blur-xl opacity-60 group-hover:opacity-85 transition duration-700" />
              <div className="relative bg-[#091226] rounded-[2.6rem] p-3.5 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] hover:border-blue-500/20 transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#091226] rounded-b-2xl border-x border-b border-white/5 z-20 flex items-center justify-center">
                  <div className="w-12 h-1.5 bg-slate-800 rounded-full mb-1" />
                </div>
                <div className="rounded-[2.1rem] overflow-hidden bg-slate-950 aspect-[9/19.5]">
                  <img
                    src="/phone.jpeg"
                    alt="ENAKO mobile app preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOCUMENTS MANIFEST */}
      <section className="py-20 sm:py-28 bg-[#f8f9fc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">{t.reqTag}</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{t.reqTitle}</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto sm:mx-0">{t.reqSub}</p>
          </motion.div>

          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 pb-3 border-b-2 border-slate-900">
            <div className="col-span-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.tableNum}</div>
            <div className="col-span-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.tableDoc}</div>
            <div className="col-span-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.tableReq}</div>
            <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.tableFmt}</div>
          </div>

          {[
            { num: 'i', doc: t.doc1Name, note: t.doc1Req, fmt: 'PDF / JPG' },
            { num: 'ii', doc: t.doc2Name, note: t.doc2Req, fmt: 'PDF' },
            { num: 'iii', doc: t.doc3Name, note: t.doc3Req, fmt: 'PDF / JPG' },
            { num: 'iv', doc: t.doc4Name, note: t.doc4Req, fmt: 'JPG / PNG' },
            { num: 'v', doc: t.doc5Name, note: t.doc5Req, fmt: 'PDF / JPG' },
            { num: 'vi', doc: t.doc6Name, note: t.doc6Req, fmt: 'PDF' },
            { num: 'vii', doc: t.doc7Name, note: t.doc7Req, fmt: 'PDF' },
          ].map((item, i) => (
            <motion.div key={item.num} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group grid grid-cols-12 gap-4 items-start sm:items-center px-5 py-5 border-b border-slate-200 hover:bg-white transition-all cursor-default">
              {/* Number */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-extrabold text-slate-300 uppercase group-hover:text-[#003061] transition-colors">{item.num}</span>
              </div>
              {/* Document name */}
              <div className="col-span-10 sm:col-span-5">
                <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{item.doc}</div>
              </div>
              {/* Note */}
              <div className="col-span-12 sm:col-span-4 pl-0 sm:pl-0">
                <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.note}</div>
              </div>
              {/* Format badge */}
              <div className="hidden sm:flex col-span-2 justify-start">
                <span className="text-[11px] font-bold text-[#003061] bg-[#003061]/8 px-2.5 py-1 rounded-md">{item.fmt}</span>
              </div>
            </motion.div>
          ))}

          {/* Bottom CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-5 pt-6 border-t-2 border-slate-900">
            <div className="text-center sm:text-left">
              <div className="text-sm font-bold text-slate-900">{t.reqFooterText}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.reqFooterSub}</div>
            </div>
            <button onClick={() => navigate('/register')}
              className="w-full sm:w-auto bg-[#003061] text-white font-bold px-8 py-3.5 text-sm hover:bg-[#002347] transition-colors shrink-0 cursor-pointer shadow-md rounded-xl">
              {t.reqFooterBtn}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-[#030b21] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,33,0.96)_0%,rgba(3,11,33,0.82)_50%,rgba(3,11,33,0.62)_100%),url('/download.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(59,130,246,0.42),transparent_34%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{t.ctaTitle}</h2>
            <p className="text-blue-100/85 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">{t.ctaSub}</p>
            <button onClick={() => navigate('/register')}
              className="bg-white text-[#003061] font-bold px-10 py-4 sm:py-5 text-base sm:text-lg hover:bg-blue-50 transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 cursor-pointer rounded-xl">
              {t.ctaBtn}
            </button>
          </motion.div>
        </div>
      </section>

      {/* SITE FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-10 text-center sm:text-left">
            <div>
              <img src="/logo.png" alt="ENAKO Logo" className="mx-auto sm:mx-0 mb-5 h-28 w-auto object-contain" />
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto sm:mx-0">{t.footerSlogan}</p>
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-widest mb-4">{t.footerPages}</div>
              <div className="flex flex-col gap-2 text-xs">
                <Link to="/" className="hover:text-white transition-colors">{t.navHome}</Link>
                <Link to="/register" className="hover:text-white transition-colors">KYC Form</Link>
                <Link to="/contact" className="hover:text-white transition-colors">{t.navContact}</Link>
                <Link to="/compliance-policy" className="hover:text-white transition-colors">Compliance Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-widest mb-4">{t.footerContact}</div>
              <div className="text-xs space-y-1.5">
                <div>enakocompanyltd@gmail.com</div>
                <div>legal@enako.com</div>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="block hover:text-white transition-colors">{CONTACT_PHONE}</a>
                <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="block hover:text-white transition-colors">{WEBSITE_LABEL}</a>
                <div>{t.footerHours}</div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 text-xs text-slate-600 text-center">
            © 2026 ENAKO Financial. All rights reserved. Licensed and regulated entity.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<InfoPage type="about" />} />
        <Route path="/why-kyc" element={<InfoPage type="why" />} />
        <Route path="/process" element={<InfoPage type="process" />} />
        <Route path="/security" element={<InfoPage type="security" />} />
        <Route path="/faq" element={<InfoPage type="faq" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:type" element={<ClientKycForm />} />
        <Route path="/form" element={<Navigate to="/register" replace />} />
        <Route path="/legacy-form" element={<KYCForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/compliance-policy" element={<CompliancePolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <WhatsAppWidget />
    </BrowserRouter>
  );
}
