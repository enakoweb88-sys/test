import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-[#003061] mb-3 pb-3 border-b border-slate-100">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function CompliancePolicy() {
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
            <Link to="/contact" className="hover:text-slate-800 transition-colors">Contact</Link>
            <Link to="/compliance-policy" className="text-[#003061] font-semibold">Compliance Policy</Link>
            <Link to="/terms" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Legal</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Compliance Policy</h1>
          <p className="text-slate-500 text-sm">Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: 11 May 2026</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12">
          <Section title="1. Introduction">
            <p>
              ENAKO Financial ("ENAKO", "we", "our") is committed to upholding the highest standards of regulatory compliance,
              anti-money laundering (AML), counter-terrorism financing (CTF), and data protection. This Compliance Policy sets out
              the framework and obligations applicable to all clients, partners, and counterparties who engage with ENAKO.
            </p>
          </Section>

          <Section title="2. Anti-Money Laundering (AML) Framework">
            <p>
              ENAKO implements a risk-based approach to AML in accordance with the Financial Action Task Force (FATF)
              Recommendations and applicable national legislation. All clients are subject to Know Your Customer (KYC)
              verification before onboarding, which includes identification of beneficial owners, source of funds, and
              business activity assessment.
            </p>
            <p>
              Clients identified as Politically Exposed Persons (PEPs) or operating in high-risk jurisdictions are subject
              to Enhanced Due Diligence (EDD) procedures.
            </p>
          </Section>

          <Section title="3. Know Your Customer (KYC)">
            <p>
              All prospective clients must complete the ENAKO Client KYC & Compliance Form. The following documents are required
              without exception:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Certificate of Incorporation</li>
              <li>Articles of Association</li>
              <li>Company Tax Registration Certificate</li>
              <li>Copies of IDs or Passports of all Directors and Shareholders</li>
              <li>Proof of Address (Utility Bill or Lease Agreement)</li>
              <li>AML Policy Document</li>
              <li>Recent Company Bank Statement (last 6 months)</li>
            </ul>
            <p className="mt-3">
              Failure to provide any of the above documents will result in the suspension of the onboarding process until
              full compliance is achieved.
            </p>
          </Section>

          <Section title="4. Data Protection & Confidentiality">
            <p>
              All personal and corporate data submitted through the ENAKO compliance portal is handled in strict accordance
              with applicable data protection regulations. Data is encrypted at rest and in transit, and access is restricted
              on a need-to-know basis within ENAKO's compliance and legal teams.
            </p>
            <p>
              ENAKO does not share client information with third parties except where required to do so by law, court order,
              or relevant regulatory authority.
            </p>
          </Section>

          <Section title="5. Sanctions Screening">
            <p>
              All clients and their associated parties are screened against international sanctions lists, including but not
              limited to OFAC, EU, UN, and HMT consolidated lists. Any match will result in immediate suspension of the
              onboarding process and notification to relevant authorities where required.
            </p>
          </Section>

          <Section title="6. Reporting Obligations">
            <p>
              ENAKO operates a zero-tolerance policy towards financial crime. Suspicious transactions or activities are
              reported promptly to the relevant Financial Intelligence Unit (FIU) in accordance with statutory obligations.
              ENAKO's Compliance Officer holds sole responsibility for Suspicious Activity Report (SAR) submissions.
            </p>
          </Section>

          <Section title="7. Policy Review">
            <p>
              This Compliance Policy is reviewed annually or whenever there is a material change in applicable law or
              regulatory guidance. The latest version of this document is always available on the ENAKO client portal.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              For all compliance-related inquiries, contact our Compliance team at{' '}
              <span className="font-semibold text-[#003061]">compliance@enako.com</span>.
            </p>
          </Section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center">
        <p className="text-xs text-slate-400">© 2026 ENAKO Financial. All rights reserved.</p>
      </footer>
    </div>
  );
}
