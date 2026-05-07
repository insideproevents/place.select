import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-[#111111] flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Place Select"
                className="w-3/4 h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-8 h-8 text-[#C9A962] mb-4" strokeWidth={1.5} />
            <h2 className="font-display text-3xl lg:text-4xl text-white">Nosotros</h2>
            <p className="mt-6 text-[#B0B0B0] leading-relaxed text-base">
              En Place Select, nos dedicamos a conectar a las personas con los mejores proyectos y oportunidades en el mercado inmobiliario. Nuestro compromiso es brindar un servicio de calidad, facilitando el acceso a propiedades y departamentos con los mejores precios disponibles.
            </p>
            <p className="mt-4 text-[#B0B0B0] leading-relaxed text-base">
              Con años de experiencia en el sector inmobiliario, nos enorgullece ser tu socio confiable en la búsqueda de tu próximo hogar. Seleccionamos cuidadosamente cada proyecto para garantizar que cumpla con los más altos estándares de calidad, ubicación y diseño.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
