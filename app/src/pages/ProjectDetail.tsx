import { useParams, Link } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Car, Warehouse, Maximize, Calendar, CheckCircle2, Play, RotateCcw } from 'lucide-react';
import { getProjectBySlug, projects } from '@/data/projects';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import MortgageCalculator from '@/sections/MortgageCalculator';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-4">Proyecto no encontrado</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#C9A962] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'border-green-500 text-green-500';
      case 'Bloqueado': return 'border-red-500 text-red-500';
      case 'En Negocio': return 'border-amber-500 text-amber-500';
      default: return 'border-[#666] text-[#666]';
    }
  };

  const nextProject = projects[(projects.findIndex(p => p.slug === slug) + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/50 to-[#0A0A0A]/80" />
          </div>
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 w-full pb-12">
              <div className="flex items-center gap-2 text-sm text-[#B0B0B0] mb-3">
                <Link to="/" className="hover:text-[#C9A962] transition-colors">Inicio</Link>
                <span>/</span>
                <span>Proyectos</span>
                <span>/</span>
                <span className="text-white">{project.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">{project.name}</h1>
                <span className="px-4 py-1.5 border border-[rgba(201,169,98,0.3)] text-[#C9A962] text-sm font-medium rounded-full">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-[#B0B0B0] text-lg">{project.address}, {project.commune}</p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 lg:py-20 bg-[#0A0A0A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden group ${
                      i === 0 ? 'col-span-2 md:col-span-2' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.name} - ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-20 bg-[#111111]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Características del Proyecto</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Maximize, label: 'Superficie', value: project.surface },
                  { icon: Bed, label: 'Dormitorios', value: `${project.features.bedrooms} dorm.` },
                  { icon: Bath, label: 'Baños', value: `${project.features.bathrooms} baños` },
                  { icon: Car, label: 'Estacionamiento', value: project.features.parking ? 'Incluido' : 'No incluido' },
                  { icon: Warehouse, label: 'Bodega', value: project.features.storage ? 'Incluida' : 'No incluida' },
                  { icon: Maximize, label: 'Terraza', value: project.features.terrace },
                  { icon: CheckCircle2, label: 'Estado', value: project.status },
                  { icon: Calendar, label: 'Entrega', value: project.delivery },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-[#1A1A1A] rounded-xl p-5 border border-white/[0.08] hover:border-[rgba(201,169,98,0.2)] transition-colors"
                  >
                    <feature.icon className="w-7 h-7 text-[#C9A962] mb-3" strokeWidth={1.5} />
                    <p className="text-xs uppercase tracking-wider text-[#666666] mb-1">{feature.label}</p>
                    <p className="text-base font-semibold text-white">{feature.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Units */}
        <section className="py-16 lg:py-20 bg-[#0A0A0A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Unidades Disponibles</h2>
              <div className="bg-[#111111] rounded-xl border border-white/[0.08] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Unidad</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Tipología</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Superficie</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Precio UF</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Precio CLP</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.units.map((unit) => (
                        <tr
                          key={unit.unit}
                          className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-white font-medium">{unit.unit}</td>
                          <td className="px-4 py-3 text-sm text-[#B0B0B0]">{unit.typology}</td>
                          <td className="px-4 py-3 text-sm text-[#B0B0B0]">{unit.surface}</td>
                          <td className="px-4 py-3 text-sm text-[#C9A962] font-semibold">
                            {unit.priceUF.toLocaleString('es-CL')} UF
                          </td>
                          <td className="px-4 py-3 text-sm text-[#B0B0B0]">
                            ${unit.priceCLP.toLocaleString('es-CL')}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-0.5 border rounded text-xs font-bold ${getStatusColor(unit.status)}`}>
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 lg:py-20 bg-[#111111]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Planos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.plans.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-[#1A1A1A] rounded-xl border border-white/[0.08] hover:border-[rgba(201,169,98,0.3)] transition-colors overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={plan}
                        alt={`Plano ${project.name} - ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-[#B0B0B0]">
                        {i === 0 ? `Tipo ${project.typologies.split(',')[0].trim()}` : `Tipo ${project.typologies.split(',')[1]?.trim() || project.typologies.split(',')[0].trim()}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Promocional */}
        <section className="py-16 lg:py-20 bg-[#0A0A0A]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Video Promocional</h2>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111111] border border-white/[0.08]">
                <img
                  src={project.image}
                  alt={`Video ${project.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-[#C9A962] flex items-center justify-center hover:brightness-110 transition-all shadow-gold-glow">
                    <Play className="w-8 h-8 text-[#0A0A0A] ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recorrido Virtual */}
        <section className="py-16 lg:py-20 bg-[#111111]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl text-white mb-8">Recorrido Virtual</h2>
              <div className="relative h-[50vh] min-h-[300px] rounded-xl overflow-hidden bg-[#1A1A1A] border border-white/[0.08]">
                <img
                  src={project.gallery[1] || project.image}
                  alt={`Recorrido Virtual ${project.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                  <RotateCcw className="w-12 h-12 text-[#C9A962] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-white mb-2">Recorrido Virtual 360°</h3>
                  <p className="text-sm text-[#B0B0B0] mb-6">Explora el proyecto desde cualquier ángulo</p>
                  <button className="px-8 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:brightness-110 transition-all">
                    Iniciar Recorrido
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mortgage Calculator */}
        <MortgageCalculator />

        {/* CTA Final */}
        <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0A0A0A]/70" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              ¿Te interesa este proyecto?
            </h2>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-xl mx-auto">
              Contacta a nuestros asesores para más información
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contacto@placeselect.cl"
                className="px-8 py-3.5 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                Contactar Asesor
              </a>
              <a
                href="mailto:visitas@placeselect.cl"
                className="px-8 py-3.5 border border-[#C9A962] text-[#C9A962] font-semibold rounded-lg hover:bg-[#C9A962] hover:text-[#0A0A0A] transition-all"
              >
                Agendar Visita
              </a>
            </div>
          </motion.div>
        </section>

        {/* Next Project */}
        <section className="py-12 bg-[#111111]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#B0B0B0] hover:text-[#C9A962] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a proyectos
              </Link>
              <Link
                to={`/proyecto/${nextProject.slug}`}
                className="inline-flex items-center gap-2 text-[#C9A962] hover:underline"
              >
                Siguiente proyecto: {nextProject.name}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
