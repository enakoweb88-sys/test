import React from 'react';
import { MarketingFooter, MarketingHeader } from './MarketingPages';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-extrabold text-[#07112b] mb-3 pb-3 border-b border-[#d9e5f5]">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function CompliancePolicy() {
  return (
    <div className="min-h-screen bg-[#f7faff] flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="bg-[#030b21] text-white px-5 sm:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-200 mb-3">Legal</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] mb-3">Compliance Policy</h1>
            <p className="text-slate-300 text-sm">Effective Date: 1 January 2026 | Last Updated: 11 May 2026</p>
          </div>
        </section>
        <section className="max-w-4xl mx-auto w-full px-5 sm:px-8 py-14">
          <div className="bg-white border border-[#d9e5f5] rounded-[2rem] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <Section title="1. Introduction">
              <p>ENAKO Financial is committed to upholding the highest standards of regulatory compliance, anti-money laundering, counter-terrorism financing, and data protection.</p>
            </Section>
            <Section title="2. Anti-Money Laundering Framework">
              <p>ENAKO implements a risk-based approach to AML. All clients are subject to Know Your Customer verification before onboarding, including beneficial ownership, source of funds, and business activity assessment.</p>
            </Section>
            <Section title="3. Know Your Customer">
              <p>Prospective clients must complete the ENAKO KYC onboarding form and provide all required identity, business, and supporting documents.</p>
            </Section>
            <Section title="4. Data Protection & Confidentiality">
              <p>Personal and corporate data submitted through the portal is handled carefully, encrypted where applicable, and restricted to authorized compliance and legal personnel.</p>
            </Section>
            <Section title="5. Sanctions Screening">
              <p>Clients and associated parties may be screened against international sanctions lists. Confirmed matches may result in onboarding suspension and regulatory reporting where required.</p>
            </Section>
            <Section title="6. Contact">
              <p>For compliance-related inquiries, contact <span className="font-semibold text-[#003061]">enakocompanyltd@gmail.com</span>.</p>
            </Section>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
