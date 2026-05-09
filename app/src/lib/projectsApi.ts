import type { Project } from '@/data/projects';
import { supabase } from '@/lib/supabaseClient';
import { projects as localProjects } from '@/data/projects';


const TABLE = 'projects';

function normalizeProject(row: any): Project {
  // Suponemos que el schema de la tabla coincide con el interface.
  return {
    slug: row.slug,
    name: row.name,
    developer: row.developer,
    city: row.city,
    commune: row.commune,
    address: row.address,
    priceFromUF: Number(row.price_from_uf),
    typologies: row.typologies,
    status: row.status,
    surface: row.surface,
    delivery: row.delivery,
    image: row.image,
    gallery: (row.gallery ?? []) as string[],
    plans: (row.plans ?? []) as string[],
    features: row.features,
    availability: row.availability,
    tags: (row.tags ?? []) as string[],
    units: row.units,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  if (!supabase) return localProjects;

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(normalizeProject);
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    return localProjects.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .single();



  if (error) {
    // Cuando no existe, Supabase devuelve error. Lo normalizamos a null.
    // P0: no dependemos de códigos exactos para evitar acoplamiento.
    return null;
  }

  return data ? normalizeProject(data) : null;
}

