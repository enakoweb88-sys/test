import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-[#003061] mb-3 pb-3 border-b border-slate-100">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function TermsOfService() {
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
            <Link to="/compliance-policy" className="hover:text-slate-800 transition-colors">Compliance Policy</Link>
            <Link to="/terms" className="text-[#003061] font-semibold">Terms of Service</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Legal</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: 11 May 2026</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the ENAKO Financial client portal and submitting any onboarding documentation,
              you ("the Client") agree to be bound by these Terms of Service ("Terms"). If you do not agree to these
              Terms, you must not use the portal or submit any forms.
            </p>
          </Section>

          <Section title="2. Use of the Portal">
            <p>
              The ENAKO client portal is made available exclusively for the purpose of facilitating the Know Your Customer
              (KYC) and compliance onboarding process. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Provide accurate, complete, and up-to-date information at all times.</li>
              <li>Not use the portal for any unlawful or fraudulent purpose.</li>
              <li>Not attempt to gain unauthorised access to any system, network, or data.</li>
              <li>Notify ENAKO immediately if any information you have provided changes.</li>
            </ul>
          </Section>

          <Section title="3. Accuracy of Information">
            <p>
              You represent and warrant that all information and documents submitted through the ENAKO portal are true,
              accurate, current, and complete. ENAKO reserves the right to reject, suspend, or terminate any application
              where it reasonably suspects that false or misleading information has been provided.
            </p>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content, design, logos, and materials displayed on the ENAKO portal are the exclusive intellectual
              property of ENAKO Financial. You may not reproduce, copy, or distribute any material without express
              written consent from ENAKO.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              ENAKO Financial shall not be liable for any indirect, incidental, special, or consequential damages arising
              from your use of or inability to use the portal. ENAKO's total liability to you for any claim arising out
              of or relating to these Terms or the portal shall not exceed the fees paid by you to ENAKO in the
              twelve (12) months preceding the claim.
            </p>
          </Section>

          <Section title="6. Suspension & Termination">
            <p>
              ENAKO reserves the right, at its sole discretion, to suspend or terminate your access to the portal at any
              time without prior notice if you violate these Terms, engage in fraudulent activity, or if we are required
              to do so by law or regulatory directive.
            </p>
          </Section>

          <Section title="7. Amendments">
            <p>
              ENAKO may update these Terms at any time. Continued use of the portal after any such changes constitutes
              your acceptance of the revised Terms. We encourage you to review this page regularly.
            </p>
          </Section>

          <Section title="8. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with applicable financial services law. Any dispute
              arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the
              relevant regulatory and judicial authority.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              For questions about these Terms, please contact us at{' '}
              <span className="font-semibold text-[#003061]">legal@enako.com</span> or visit our{' '}
              <Link to="/contact" className="text-[#003061] font-semibold underline">Contact page</Link>.
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
