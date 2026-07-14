import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { useLang } from '../LangContext';

const TEXTS = {
  en: {
    title: 'Verification for ENAKO',
    warning: "You're about to submit sensitive data to",
    warning2: "If you received this link from a suspicious source, please close this page and notify us immediately.",
    continue: 'Continue',
    poweredBy: 'Powered by',
  },
  fr: {
    title: 'Vérification pour ENAKO',
    warning: "Vous êtes sur le point de soumettre des données sensibles à",
    warning2: "Si vous avez reçu ce lien depuis une source suspecte, veuillez fermer cette page et nous en informer immédiatement.",
    continue: 'Continuer',
    poweredBy: 'Propulsé par',
  },
};

export default function SimpleLanding() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = TEXTS[lang];

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col relative font-sans">
      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setDropdownOpen(o => !o)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50"
        >
          <FaGlobe />
          {lang === 'en' ? 'EN' : 'FR'}
          <FaChevronDown className={`text-[10px] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
            <div className="absolute right-0 mt-1 w-28 rounded-xl border border-slate-100 bg-white shadow-lg overflow-hidden z-20">
              {(['en', 'fr'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${lang === l ? 'bg-[#003061] text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {l === 'en' ? 'English' : 'Français'}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[480px] w-full bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="flex justify-center mb-10">
            <img src="/logo.png" alt="ENAKO" className="h-10 object-contain" />
          </div>
          
          <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 mb-5">{t.title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 px-2">
            {t.warning} <span className="font-semibold text-slate-800">ENAKO</span>. {t.warning2}
          </p>
          
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-[#18181b] hover:bg-black text-white font-semibold py-4 rounded-full transition-colors text-[15px]"
          >
            {t.continue}
          </button>
        </motion.div>
      </div>

      <div className="py-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
        <span>{t.poweredBy}</span>
        <img src="/logo.png" alt="ENAKO" className="h-3 opacity-60 grayscale" />
      </div>
    </main>
  );
}
