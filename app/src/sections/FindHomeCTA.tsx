import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function FindHomeCTA() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/cta-find-home.jpg"
          alt="Encuentra tu hogar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        <h2 className="font-display text-4xl md:text-5xl text-white">
          Encuentra tu H<span className="text-[#C9A962]">o</span>gar Ideal
        </h2>
        <p className="mt-4 text-lg text-[#B0B0B0] max-w-xl mx-auto">
          Descubre propiedades excepcionales en las mejores ubicaciones
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#proyectos"
            onClick={() => {
              const el = document.getElementById('proyectos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
          >
            Ver Propiedades
          </Link>
          <Link
            to="/#nosotros"
            onClick={() => {
              const el = document.getElementById('nosotros');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Saber Más →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
