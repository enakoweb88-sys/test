import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import Contact from './pages/Contact';
import CompliancePolicy from './pages/CompliancePolicy';
import TermsOfService from './pages/TermsOfService';

// ─── Config ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '1234567890'; // Replace with your actual WhatsApp number

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
            <div className="bg-[#25D366] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">ENAKO Support</div>
                  <div className="text-green-100 text-xs">Typically replies within minutes</div>
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
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#25D366] transition-colors min-w-0"
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} className="bg-[#25D366] text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-[#20b858] transition-colors flex-shrink-0">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-[#25D366] hover:bg-[#20b858] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
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
      className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all group ${
        fileName ? 'border-[#003061] bg-blue-50/50' : 'border-slate-200 bg-white hover:border-[#003061] hover:bg-slate-50'
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
        <div className="w-6 h-1.5 bg-[#003061] rounded-sm" />
        <span className="text-base lg:text-lg font-extrabold text-[#003061] tracking-tight">ENAKO</span>
      </Link>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">KYC Progress</div>
      <nav className="flex flex-col gap-0.5">
        {STEPS.map(step => {
          const isActive = active === step.id;
          return (
            <button key={step.id} onClick={() => scrollTo(step.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${
                isActive ? 'bg-slate-50 text-[#003061] font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
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
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-green-200">
            <span className="text-green-600 text-2xl font-extrabold">✓</span>
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
            <div className="w-5 h-1 bg-[#003061] rounded-sm" />
            <span className="text-sm font-extrabold text-[#003061]">ENAKO</span>
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
            className={`w-full py-4 sm:py-5 font-bold text-base sm:text-lg transition-all ${
              declared
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
          <div className="mt-12 overflow-hidden bg-gradient-to-br from-[#003061] via-[#004d99] to-[#001a3d] p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 group">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 opacity-80">Lifestyle & Finance — ENAKO App</div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">Financial Freedom<br/>in One App</h3>
              <p className="text-blue-100/70 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
                Beyond compliance, the ENAKO mobile app empowers you to save, invest, and manage daily bills effortlessly. From digital njangi to interest-yielding savings, take control of your financial journey.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {['Digital Njangi', 'Bill Payments', 'Interest Savings', 'Business Investment'].map(f => (
                  <div key={f} className="bg-white/5 border border-white/10 px-3 py-1.5 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-56 sm:w-64 lg:w-72 shrink-0 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl scale-125 rounded-full" />
              <img src="/mobile_mockup.png" alt="ENAKO Mobile App" className="relative w-full h-auto shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-800 mb-3">ENAKO FINANCIAL</div>
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
function LandingPage() {
  const navigate = useNavigate();

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-2 bg-[#003061] rounded-sm" />
            <span className="text-lg font-extrabold text-[#003061]">ENAKO</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link to="/contact" className="hover:text-slate-800 transition-colors">Contact</Link>
            <Link to="/compliance-policy" className="hover:text-slate-800 transition-colors">Compliance</Link>
            <Link to="/terms" className="hover:text-slate-800 transition-colors">Terms</Link>
          </div>
          <button onClick={() => navigate('/form')}
            className="bg-[#003061] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#002347] transition-all shadow-md hover:shadow-lg">
            Start KYC
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 bg-gradient-to-br from-[#001a3d] via-[#003061] to-[#004d99] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#004d99]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        {/* Animated grid dots */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-100 text-xs font-semibold">Secure Onboarding Portal — Live</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Compliance<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Onboarding</span>
              <br />Made Simple.
            </h1>
            <p className="text-blue-200 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              Complete your KYC verification, submit required documents, and gain full access to ENAKO Financial's platform — securely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate('/form')}
                className="bg-white text-[#003061] font-bold px-8 py-4 text-base hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5">
                Begin KYC Application
              </button>
              <Link to="/contact"
                className="border border-white/30 text-white font-semibold px-8 py-4 text-base hover:bg-white/10 transition-all no-underline text-center">
                Talk to Us
              </Link>
            </div>
          </motion.div>

          {/* Hero visual card */}
          <motion.div initial={{ opacity: 0, x: 40, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">KYC Progress</div>
                {[
                  { label: 'Company Info', done: true }, { label: 'Ownership', done: true },
                  { label: 'Compliance', done: true }, { label: 'Banking', done: false },
                  { label: 'Documents', done: false }, { label: 'Declaration', done: false }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${s.done ? 'bg-green-400 text-white' : 'bg-white/20 text-white/60'}`}>
                      {s.done ? '✓' : i + 1}
                    </div>
                    <div className={`text-sm font-medium ${s.done ? 'text-white' : 'text-white/50'}`}>{s.label}</div>
                    {s.done && <div className="ml-auto text-green-400 text-xs font-semibold">Done</div>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-lg">3/6</div>
                  <div className="text-white/50 text-[11px]">Steps Done</div>
                </div>
                <div className="flex-1 bg-green-400/20 rounded-xl p-3 text-center border border-green-400/30">
                  <div className="text-green-300 font-bold text-lg">50%</div>
                  <div className="text-white/50 text-[11px]">Complete</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* WHY ENAKO */}
      <section className="py-20 sm:py-28 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">Why ENAKO</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Built for Financial Compliance</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg">A professional-grade onboarding platform trusted by financial institutions across the globe.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { num: '01', title: 'Bank-Grade Security', desc: 'All data is AES-256 encrypted at rest and in transit. We implement zero-trust access principles across our infrastructure.' },
              { num: '02', title: 'Regulatory Aligned', desc: 'Our KYC framework is aligned with FATF, OFAC, EU, and HMT standards. We keep compliance current with regulatory changes.' },
              { num: '03', title: 'Fast Review', desc: 'Our dedicated compliance team reviews complete applications within 2–5 business days with full transparency on status.' },
              { num: '04', title: 'Document Management', desc: 'Upload, track, and manage all required compliance documents through a single secure hub with clear status indicators.' },
              { num: '05', title: 'AML Screening', desc: 'Every client is screened against live global sanctions lists automatically before onboarding is approved.' },
              { num: '06', title: 'Dedicated Support', desc: 'Get answers fast from our compliance specialists via live chat, WhatsApp, and email during business hours.' },
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

      {/* HOW IT WORKS — Vertical staggered timeline */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">The Process</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">How Onboarding Works</h2>
          </motion.div>

          <div className="relative">
            {/* vertical spine line */}
            <div className="hidden md:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-slate-100" />

            {[
              { step: '01', title: 'Submit Your Application', tag: 'Start', desc: 'Click "Begin KYC Application" and fill in your company details — legal name, registration number, directors, banking information, and compliance status. Takes roughly 10 minutes.', side: 'left' },
              { step: '02', title: 'Upload Required Documents', tag: 'Documents', desc: 'Securely upload all 7 compliance documents directly through the portal. Files are encrypted immediately upon upload and are only accessible to authorised compliance staff.', side: 'right' },
              { step: '03', title: 'Compliance Review', tag: 'Review', desc: 'Our dedicated compliance team reviews your application against AML, CTF, and sanctions frameworks. You will be notified by email if any additional information is required.', side: 'left' },
              { step: '04', title: 'Approval & Access', tag: 'Complete', desc: 'Once approved, you receive full onboarded status and access to ENAKO Financial services. The entire process from submission to approval takes 2–5 business days.', side: 'right' },
            ].map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 sm:mb-16 ${
                  s.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}>

                {/* Content block */}
                <div className={`flex-1 ${ s.side === 'right' ? 'md:text-right' : 'md:text-left' }`}>
                  <div className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 bg-slate-100 text-slate-500`}>
                    {s.tag}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-sm ${ s.side === 'right' ? 'md:ml-auto' : '' }">{s.desc}</p>
                </div>

                {/* Centre node */}
                <div className="flex flex-col items-center shrink-0 z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#003061] text-white flex flex-col items-center justify-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-300 leading-none mb-0.5">Step</div>
                    <div className="text-2xl sm:text-3xl font-extrabold leading-none">{s.step}</div>
                  </div>
                </div>

                {/* Empty spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="py-20 sm:py-32 bg-slate-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 lg:gap-24">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-6">Fintech of the Future</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tighter mb-8 italic">
              ENAKO:<br/>Beyond Banking.
            </h2>
            <div className="space-y-10">
              <div>
                <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-500" /> Smart Savings
                </h4>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed pl-11">
                  Choose your way to grow. From **Yield Accounts** with high interest returns to **Locked Savings** for long-term goals and **Normal Savings** for instant anytime access.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-500" /> Digital Njangi & Bills
                </h4>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed pl-11">
                  Participate in online njangi cycles seamlessly. Pay for **electricity, water, school fees, and rent** in seconds with no hidden charges.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-500" /> Managed Investments
                </h4>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed pl-11">
                  Invest in verified businesses managed directly by ENAKO. Earn a steady monthly percentage on your capital without doing the heavy lifting.
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="border border-white/20 text-white font-bold px-8 py-3 text-sm hover:bg-white/5 transition-colors cursor-not-allowed">App Store</div>
              <div className="bg-white text-slate-900 font-bold px-8 py-3 text-sm hover:bg-slate-100 transition-colors cursor-not-allowed">Google Play</div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] scale-125 opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative border-[12px] border-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                <img src="/mobile_mockup.png" alt="ENAKO Mobile App" className="w-[280px] sm:w-[320px] h-auto object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOCUMENTS MANIFEST — Full-width numbered row list */}
      <section className="py-20 sm:py-28 bg-[#f8f9fc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#003061] mb-3">Requirements</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Documents You Will Need</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg">Prepare the following before you begin. All 7 documents are mandatory — incomplete applications cannot be processed.</p>
          </motion.div>

          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 pb-3 border-b-2 border-slate-900">
            <div className="col-span-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">#</div>
            <div className="col-span-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Document</div>
            <div className="col-span-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Requirement</div>
            <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Format</div>
          </div>

          {[
            { num: 'i',   doc: 'Certificate of Incorporation',        note: 'Original company registration issued by registry',    fmt: 'PDF / JPG' },
            { num: 'ii',  doc: 'Articles of Association',             note: 'Constitutional document of the company',              fmt: 'PDF' },
            { num: 'iii', doc: 'Company Tax Registration Certificate', note: 'Valid for current financial year',                    fmt: 'PDF / JPG' },
            { num: 'iv',  doc: 'Director & Shareholder IDs / Passports', note: 'Government-issued ID, high-resolution scan',       fmt: 'JPG / PNG' },
            { num: 'v',   doc: 'Proof of Address',                    note: 'Utility bill or lease agreement, not older than 3 months', fmt: 'PDF / JPG' },
            { num: 'vi',  doc: 'AML Policy Document',                 note: 'Internal AML/CTF policy, signed and dated',          fmt: 'PDF' },
            { num: 'vii', doc: 'Recent Company Bank Statement',        note: 'Official statement covering last 6 months',          fmt: 'PDF' },
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
                <span className="text-[11px] font-bold text-[#003061] bg-[#003061]/8 px-2.5 py-1">{item.fmt}</span>
              </div>
            </motion.div>
          ))}

          {/* Bottom CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 pt-6 border-t-2 border-slate-900">
            <div>
              <div className="text-sm font-bold text-slate-900">All 7 documents must be submitted to proceed.</div>
              <div className="text-xs text-slate-400 mt-0.5">Applications typically take 10–15 minutes to complete.</div>
            </div>
            <button onClick={() => navigate('/form')}
              className="bg-[#003061] text-white font-bold px-8 py-3.5 text-sm hover:bg-[#002347] transition-colors shrink-0">
              Begin KYC Application
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-slate-500 text-base sm:text-lg mb-8">Join thousands of businesses already onboarded with ENAKO Financial.</p>
            <button onClick={() => navigate('/form')}
              className="bg-[#003061] text-white font-bold px-10 py-4 sm:py-5 text-base sm:text-lg hover:bg-[#002347] transition-all shadow-xl shadow-[#003061]/20 hover:shadow-2xl hover:shadow-[#003061]/30 hover:-translate-y-1">
              Begin KYC Application
            </button>
          </motion.div>
        </div>
      </section>

      {/* SITE FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-1.5 bg-blue-400 rounded-sm" />
                <span className="text-white font-extrabold text-base">ENAKO</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">A regulated financial compliance platform. Secure. Professional. Trusted.</p>
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-widest mb-4">Pages</div>
              <div className="flex flex-col gap-2 text-xs">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/form" className="hover:text-white transition-colors">KYC Form</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link to="/compliance-policy" className="hover:text-white transition-colors">Compliance Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact</div>
              <div className="text-xs space-y-1.5">
                <div>compliance@enako.com</div>
                <div>legal@enako.com</div>
                <div>Mon – Fri, 9am – 5pm GMT</div>
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
        <Route path="/form" element={<KYCForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/compliance-policy" element={<CompliancePolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <WhatsAppWidget />
    </BrowserRouter>
  );
}
