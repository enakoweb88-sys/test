import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-2 bg-[#003061] rounded-sm" />
            <span className="text-xl font-extrabold text-[#003061] tracking-tight">ENAKO</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-500">
            <Link to="/contact" className="text-[#003061] font-semibold">Contact</Link>
            <Link to="/compliance-policy" className="hover:text-slate-800 transition-colors">Compliance Policy</Link>
            <Link to="/terms" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Contact Us</h1>
          <p className="text-slate-500 text-lg">
            For any questions regarding the onboarding process, compliance, or general inquiries, our team is ready to assist you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Email', value: 'compliance@enako.com' },
            { label: 'Phone', value: '+1 (800) 000-0000' },
            { label: 'Office Hours', value: 'Mon – Fri, 9am – 5pm GMT' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {submitted ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-2xl font-bold text-slate-900 mb-2">Message Sent</div>
            <p className="text-slate-500 text-sm mb-6">Thank you. A member of our compliance team will respond within 1 business day.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#003061] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#002347] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Subject</label>
              <input
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. KYC Form Query"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your query in detail..."
                style={{ resize: 'none' }}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#003061] text-white font-semibold py-4 rounded-lg hover:bg-[#002347] transition-colors text-base"
            >
              Send Message
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center">
        <p className="text-xs text-slate-400">© 2026 ENAKO Financial. All rights reserved.</p>
      </footer>
    </div>
  );
}
