import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

export default function SimpleLanding() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col relative font-sans">
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
        <FaGlobe /> En
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
          
          <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 mb-5">Verification for ENAKO</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 px-2">
            You're about to submit sensitive data to <span className="font-semibold text-slate-800">ENAKO</span>. If you received this link from a suspicious source, please close this page and notify us immediately.
          </p>
          
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-[#18181b] hover:bg-black text-white font-semibold py-4 rounded-full transition-colors text-[15px]"
          >
            Continue
          </button>
        </motion.div>
      </div>

      <div className="py-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
        <span>Powered by</span>
        <img src="/logo.png" alt="ENAKO" className="h-3 opacity-60 grayscale" />
      </div>
    </main>
  );
}
