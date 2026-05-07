import { motion } from 'framer-motion';

export default function ContactBanner() {
  return (
    <section id="contacto" className="relative h-[50vh] min-h-[400px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/contact-agent.jpg"
          alt="Asesoría inmobiliaria"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <h2 className="font-display text-3xl md:text-4xl text-white">
              ¿Buscas comprar <span className="text-[#C9A962]">o</span> alquilar?
            </h2>
            <p className="mt-3 text-xl font-semibold text-white">
              ¡Obtén asesoría experta hoy!
            </p>
            <p className="mt-4 text-[#B0B0B0] leading-relaxed">
              Contáctanos ahora para una consulta gratuita y deja que nuestro equipo de expertos te guíe durante el proceso.
            </p>
            <div className="mt-6">
              <a
                href="mailto:contacto@placeselect.cl"
                className="inline-block px-8 py-3.5 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
              >
                CONTÁCTANOS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
