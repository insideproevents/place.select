import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Gem, Building2, Star, MapPin } from 'lucide-react';

const features = [
  { icon: Gem, label: 'Proyectos Exclusivos' },
  { icon: Building2, label: 'Inmobiliarias Top' },
  { icon: Star, label: 'Calidad Garantizada' },
  { icon: MapPin, label: 'Las Mejores Ubicaciones' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-banner.png"
          alt="Place Select"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/50 to-[#0A0A0A]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] ml-[-50px] px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white uppercase tracking-[0.15em] leading-tight"
          >
            
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-[#B0B0B0] max-w-lg leading-relaxed"
          >
            Seleccionamos los mejores proyectos de las mejores inmobiliarias
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mt-6 sm:mt-8"
          >
            <Link
              to="/#proyectos"
              onClick={() => {
                const el = document.getElementById('proyectos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 border border-[#C9A962] text-[#C9A962] text-sm font-semibold rounded-lg hover:bg-[#C9A962] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Ver Proyectos
            </Link>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="mt-8 sm:mt-12 flex flex-nowrap items-center gap-4 sm:gap-8 overflow-x-auto"
          >
            {features.map((feature, i) => (
              <div key={feature.label} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && (
                  <span className="text-[#C9A962]/60 text-lg">|</span>
                )}
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" strokeWidth={1.5} />
                <span className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.05em] text-[#B0B0B0]">
                  {feature.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
