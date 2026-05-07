import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export default function ScheduleVisit() {
  return (
    <section className="py-20 lg:py-28 bg-[#111111]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <Calendar className="w-8 h-8 text-[#C9A962] mb-4" strokeWidth={1.5} />
            <h2 className="font-display text-3xl lg:text-4xl text-white">Agenda tu Visita</h2>
            <p className="mt-6 text-[#B0B0B0] leading-relaxed text-base">
              ¿Te gustaría conocer una propiedad? Agenda una visita con nuestros agentes y recibe asesoría personalizada para encontrar tu nuevo hogar. Nuestros expertos te acompañarán en cada paso del proceso.
            </p>
            <div className="mt-8">
              <a
                href="mailto:visitas@placeselect.cl"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
              >
                Agenda tu Visita Hoy
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src="/images/schedule-visit.jpg"
                alt="Agenda tu visita"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
