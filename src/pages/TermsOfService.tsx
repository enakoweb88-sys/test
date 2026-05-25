import React from 'react';
import { Link } from 'react-router-dom';
import { MarketingFooter, MarketingHeader } from './MarketingPages';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-extrabold text-[#07112b] mb-3 pb-3 border-b border-[#d9e5f5]">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f7faff] flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="bg-[#030b21] text-white px-5 sm:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-200 mb-3">Legal</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] mb-3">Terms of Service</h1>
            <p className="text-slate-300 text-sm">Effective Date: 1 January 2026 | Last Updated: 11 May 2026</p>
          </div>
        </section>
        <section className="max-w-4xl mx-auto w-full px-5 sm:px-8 py-14">
          <div className="bg-white border border-[#d9e5f5] rounded-[2rem] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <Section title="1. Acceptance of Terms">
              <p>By accessing or using the ENAKO client portal and submitting onboarding documentation, you agree to these Terms of Service.</p>
            </Section>
            <Section title="2. Use of the Portal">
              <p>The portal is provided for Know Your Customer and compliance onboarding. You agree to provide accurate information and not use the portal for unlawful or fraudulent activity.</p>
            </Section>
            <Section title="3. Accuracy of Information">
              <p>You represent that all information and documents submitted are true, accurate, current, and complete.</p>
            </Section>
            <Section title="4. Suspension & Termination">
              <p>ENAKO may suspend or terminate access if information is misleading, incomplete, fraudulent, or if required by law or regulation.</p>
            </Section>
            <Section title="5. Contact">
              <p>For questions about these Terms, contact <span className="font-semibold text-[#003061]">legal@enako.com</span> or visit our <Link to="/contact" className="text-[#003061] font-semibold underline">Contact page</Link>.</p>
            </Section>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
