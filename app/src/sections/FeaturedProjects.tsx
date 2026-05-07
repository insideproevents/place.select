import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function FeaturedProjects() {
  return (
    <section id="proyectos" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl text-white">
            Proyectos Destacados
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A962] mx-auto mt-4" />
          <p className="mt-4 text-[#B0B0B0] text-base max-w-xl mx-auto">
            Descubre nuestros proyectos seleccionados en las mejores ubicaciones
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
