import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowDown, MapPin, Bed, Bath, Car, Warehouse, Maximize } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="group bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden hover:border-[rgba(201,169,98,0.3)] hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Card Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-white">{project.name}</h3>
        <ArrowDown className="w-5 h-5 text-[#C9A962]" />
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 bg-[#C9A962] text-[#0A0A0A] text-[11px] font-semibold rounded-full uppercase tracking-wide">
            Proyecto Destacado
          </span>
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white text-[11px] font-medium rounded-full">
            Venta
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 space-y-1">
        <p className="text-sm text-[#B0B0B0]">{project.developer}</p>
        <div className="text-sm text-[#B0B0B0]">
          <span className="font-semibold text-white">Ciudad:</span> {project.city}
        </div>
        <div className="text-sm text-[#B0B0B0]">
          <span className="font-semibold text-white">Comuna:</span> {project.commune}
        </div>
        <div className="text-sm text-[#B0B0B0] flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#C9A962]" />
          <span className="font-semibold text-white">Dirección:</span> {project.address}
        </div>
      </div>

      {/* Price & Typology */}
      <div className="px-4 py-3 border-t border-white/[0.08]">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-[#B0B0B0]">Valor Desde (UF):</span>
          <span className="text-xl font-bold text-[#C9A962]">
            {project.priceFromUF.toLocaleString('es-CL')}
          </span>
        </div>
        <p className="text-sm text-[#B0B0B0] mt-1">
          <span className="font-semibold text-white">Tipologías:</span> {project.typologies}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-3 py-1 border border-[rgba(201,169,98,0.3)] text-[#C9A962] text-xs font-medium rounded-full">
            {project.status}
          </span>
        </div>
      </div>

      {/* Quick features */}
      <div className="px-4 py-2 flex flex-wrap gap-3 text-xs text-[#B0B0B0]">
        <span className="flex items-center gap-1">
          <Bed className="w-3.5 h-3.5" /> {project.features.bedrooms} dorm.
        </span>
        <span className="flex items-center gap-1">
          <Bath className="w-3.5 h-3.5" /> {project.features.bathrooms} baños
        </span>
        {project.features.parking && (
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5" /> Estac.
          </span>
        )}
        {project.features.storage && (
          <span className="flex items-center gap-1">
            <Warehouse className="w-3.5 h-3.5" /> Bod.
          </span>
        )}
        <span className="flex items-center gap-1">
          <Maximize className="w-3.5 h-3.5" /> {project.surface}
        </span>
      </div>

      {/* Availability Table */}
      <div className="px-4 py-3 border-t border-white/[0.08]">
        <div className="grid grid-cols-4 text-xs font-semibold text-[#B0B0B0] mb-2">
          <span>Estado</span>
          <span className="text-center">Depto.</span>
          <span className="text-center">Bdga.</span>
          <span className="text-center">Estac.</span>
        </div>
        {(
          [
            ['Bloqueado', project.availability.blocked, 'border-red-500 text-red-500'],
            ['Disponible', project.availability.available, 'border-green-500 text-green-500'],
            ['En Negocio', project.availability.negotiating, 'border-amber-500 text-amber-500'],
          ] as const
        ).map(([label, data, colorClass]) => (
          <div key={label} className="grid grid-cols-4 text-xs py-1.5 border-b border-white/[0.04]">
            <span className={`px-2 py-0.5 border rounded text-center font-bold ${colorClass}`}>
              {label}
            </span>
            <span className="text-center text-white">{data.apartments}</span>
            <span className="text-center text-white">{data.storage}</span>
            <span className="text-center text-white">{data.parking}</span>
          </div>
        ))}
        <div className="grid grid-cols-4 text-xs py-2 font-bold text-white">
          <span>TOTAL</span>
          <span className="text-center">{project.availability.total.apartments}</span>
          <span className="text-center">{project.availability.total.storage}</span>
          <span className="text-center">{project.availability.total.parking}</span>
        </div>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[rgba(201,169,98,0.1)] border border-[rgba(201,169,98,0.3)] text-[#C9A962] text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="px-4 pb-4 pt-2">
        <Link
          to={`/proyecto/${project.slug}`}
          className="block w-full text-center py-3 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
        >
          Ver Proyecto →
        </Link>
      </div>
    </motion.div>
  );
}
