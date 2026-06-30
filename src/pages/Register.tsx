import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const accountTypes = [
  {
    type: 'company',
    title: 'Company',
    description: 'For businesses, corporations, and registered organizations.',
    image: '/premium_business.png',
    route: '/register/company',
  },
  {
    type: 'individual',
    title: 'Individual',
    description: 'For personal clients, freelancers, and independent traders.',
    image: '/premium_individual.png',
    route: '/register/individual',
  },
];

export default function Register() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col relative font-sans">
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16">
          <Link to="/">
            <img src="/logo.png" alt="ENAKO" className="h-10 sm:h-12 object-contain mx-auto mb-10 opacity-90" />
          </Link>
          <h1 className="text-3xl sm:text-[34px] font-bold text-slate-900 tracking-tight mb-4">
            Select Account Type
          </h1>
          <p className="text-slate-500 text-[15px]">
            Please choose how you would like to register with ENAKO.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full px-4 sm:px-6">
          {accountTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => navigate(item.route)}
              className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#07112b]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b21]/90 via-[#030b21]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{item.title}</h2>
                <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                  {item.description}
                </p>
              </div>
              
              <div className="absolute inset-0 border-[3px] border-white/0 group-hover:border-white/10 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-20 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
          <span>Powered by</span>
          <img src="/logo.png" alt="ENAKO" className="h-3 grayscale opacity-60" />
        </motion.div>
      </div>
    </main>
  );
}
