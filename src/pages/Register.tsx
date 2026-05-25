import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaClock,
  FaLock,
  FaShieldAlt,
  FaUserTie,
} from 'react-icons/fa';

const darkBlue = '#003061';

const accountTypes = [
  {
    type: 'company',
    icon: FaBuilding,
    title: 'Company',
    description:
      'For businesses, corporations, startups, OTC partners, import/export companies, and registered organizations.',
    button: 'Continue as Company',
    route: '/register/company',
    points: ['Corporate KYC verification', 'Business & ownership details', 'Enhanced due diligence'],
  },
  {
    type: 'individual',
    icon: FaUserTie,
    title: 'Individual',
    description:
      'For freelancers, personal clients, independent traders, consultants, and individuals.',
    button: 'Continue as Individual',
    route: '/register/individual',
    points: ['Personal identity verification', 'Simplified KYC process', 'Quick and secure onboarding'],
  },
];

export default function Register() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950 relative overflow-hidden">
      <header className="relative z-20 bg-[#030b21] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ENAKO Logo" className="h-28 w-auto object-contain" />
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-white whitespace-nowrap">
            <FaShieldAlt className="text-blue-300" />
            Secure. Compliant. Trusted.
          </div>
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-28 top-40 h-80 w-80 rounded-full border border-[#003061]/10" />
        <div className="absolute left-10 top-56 h-52 w-52 rounded-full bg-[#003061]/5 blur-3xl" />
        <div className="absolute right-[-160px] top-10 h-[560px] w-[560px] rounded-full border border-[#003061]/10" />
        <div className="absolute right-[-30px] top-36 h-3 w-3 rounded-full bg-[#003061]/25" />
        <div className="absolute left-[22%] top-[18%] h-2 w-2 rounded-full bg-[#003061]/25" />
        <div className="absolute inset-0 opacity-[0.22]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(0,48,97,0.28) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
      </div>

      <section className="relative z-10 px-5 sm:px-8 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-[#003061] mb-2">
            <FaArrowLeft className="text-[#003061]" />
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-center mb-9">
            <div className="inline-flex items-center rounded-full bg-[#003061]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[#003061] mb-5">
              Get Started
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#07112b] mb-5">
              Who are you registering as?
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-8 max-w-2xl mx-auto">
              Select the option that best describes you so we can personalize your KYC onboarding experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {accountTypes.map((item, index) => (
              <motion.button
                key={item.type}
                type="button"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate(item.route)}
                className="group bg-white rounded-[2rem] border border-[#d9e5f5] p-8 sm:p-10 text-center shadow-[0_22px_70px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_90px_rgba(0,48,97,0.16)] transition-all"
              >
                <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-[#003061]/8 flex items-center justify-center text-[#003061] group-hover:scale-105 transition-transform">
                  <item.icon className="text-5xl" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-[#07112b] mb-4">{item.title}</h2>
                <div className="mx-auto h-0.5 w-12 rounded-full bg-[#003061] mb-6" />
                <p className="text-sm sm:text-base text-slate-600 leading-7 max-w-sm mx-auto mb-6">{item.description}</p>

                <div className="rounded-2xl bg-[#003061]/5 border border-[#003061]/8 p-5 text-left mb-6 space-y-3">
                  {item.points.map(point => (
                    <div key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span className="h-5 w-5 rounded-full bg-[#003061] text-white flex items-center justify-center text-[9px]">
                        <FaCheck />
                      </span>
                      {point}
                    </div>
                  ))}
                </div>

                <span className="flex items-center justify-center gap-8 rounded-xl bg-[#003061] px-6 py-4 text-base font-extrabold text-white shadow-[0_16px_35px_rgba(0,48,97,0.22)] group-hover:bg-[#002347]">
                  {item.button}
                  <FaArrowRight />
                </span>
              </motion.button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto rounded-2xl bg-white/90 border border-[#d9e5f5] shadow-[0_18px_60px_rgba(15,23,42,0.06)] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FaShieldAlt, title: 'Bank-Level Security', text: 'Your data is encrypted and protected' },
              { icon: FaCheck, title: '100% Compliant', text: 'We follow global KYC and AML standards' },
              { icon: FaLock, title: 'Privacy First', text: 'Your privacy is our top priority' },
              { icon: FaClock, title: 'Fast & Easy', text: 'Simple process, quick verification' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-4 lg:border-r lg:last:border-r-0 border-[#d9e5f5]">
                <div className="h-12 w-12 rounded-full bg-[#003061]/8 text-[#003061] flex items-center justify-center shrink-0">
                  <item.icon />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#07112b]">{item.title}</div>
                  <div className="text-xs text-slate-500 leading-5">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex items-center justify-center gap-2 text-sm text-slate-500">
            <FaShieldAlt style={{ color: darkBlue }} />
            ENAKO KYC Onboarding © 2026. All rights reserved.
          </div>
        </div>
      </section>
    </main>
  );
}
