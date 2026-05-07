export interface Project {
  slug: string;
  name: string;
  developer: string;
  city: string;
  commune: string;
  address: string;
  priceFromUF: number;
  typologies: string;
  status: string;
  surface: string;
  delivery: string;
  image: string;
  gallery: string[];
  plans: string[];
  features: {
    bedrooms: string;
    bathrooms: string;
    parking: boolean;
    storage: boolean;
    terrace: string;
  };
  availability: {
    blocked: { apartments: number; storage: number; parking: number };
    available: { apartments: number; storage: number; parking: number };
    negotiating: { apartments: number; storage: number; parking: number };
    total: { apartments: number; storage: number; parking: number };
  };
  tags: string[];
  units: {
    unit: string;
    typology: string;
    surface: string;
    priceUF: number;
    priceCLP: number;
    status: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "los-cactus",
    name: "Los Cactus",
    developer: "Inmobiliaria Almagro",
    city: "Santiago",
    commune: "Lo Barnechea",
    address: "Los Catus 1479",
    priceFromUF: 13070,
    typologies: "2D-2B, 3D-3B",
    status: "Venta en Blanco",
    surface: "29-42 m² tot.",
    delivery: "Inmediata",
    image: "/images/project-los-cactus.jpg",
    gallery: [
      "/images/project-los-cactus.jpg",
      "/images/gallery-interior-1.jpg",
      "/images/gallery-interior-2.jpg",
      "/images/gallery-interior-3.jpg",
      "/images/gallery-terrace-1.jpg",
      "/images/gallery-bathroom-1.jpg",
    ],
    plans: ["/images/gallery-interior-1.jpg", "/images/gallery-interior-2.jpg"],
    features: {
      bedrooms: "1-2",
      bathrooms: "1-2",
      parking: true,
      storage: true,
      terrace: "3.5-4.2 m²",
    },
    availability: {
      blocked: { apartments: 13, storage: 0, parking: 0 },
      available: { apartments: 14, storage: 0, parking: 0 },
      negotiating: { apartments: 0, storage: 0, parking: 0 },
      total: { apartments: 27, storage: 0, parking: 0 },
    },
    tags: ["Pie Cuotas"],
    units: [
      { unit: "A-101", typology: "2D-2B", surface: "42 m²", priceUF: 13070, priceCLP: 519161360, status: "Disponible" },
      { unit: "A-102", typology: "2D-2B", surface: "40 m²", priceUF: 12500, priceCLP: 496600000, status: "Disponible" },
      { unit: "A-103", typology: "2D-2B", surface: "38 m²", priceUF: 11800, priceCLP: 468784000, status: "Bloqueado" },
      { unit: "B-201", typology: "3D-3B", surface: "58 m²", priceUF: 15200, priceCLP: 604265600, status: "En Negocio" },
      { unit: "B-202", typology: "3D-3B", surface: "56 m²", priceUF: 14800, priceCLP: 588374400, status: "Bloqueado" },
      { unit: "B-203", typology: "3D-3B", surface: "55 m²", priceUF: 14500, priceCLP: 576060000, status: "Disponible" },
    ],
  },
  {
    slug: "laguna-andina",
    name: "Laguna Andina",
    developer: "Inmobiliaria Fundamenta",
    city: "Santiago",
    commune: "Lo Barnechea",
    address: "Av Paseo Pie Andino",
    priceFromUF: 11303,
    typologies: "2D-2B, 3D-2B, 3D-3B",
    status: "Venta en Blanco",
    surface: "34-53 m² tot.",
    delivery: "Inmediata",
    image: "/images/project-laguna-andina.jpg",
    gallery: [
      "/images/project-laguna-andina.jpg",
      "/images/gallery-interior-1.jpg",
      "/images/gallery-interior-2.jpg",
      "/images/gallery-interior-3.jpg",
      "/images/gallery-terrace-1.jpg",
      "/images/gallery-bathroom-1.jpg",
    ],
    plans: ["/images/gallery-interior-1.jpg", "/images/gallery-interior-2.jpg"],
    features: {
      bedrooms: "1-3",
      bathrooms: "1-3",
      parking: true,
      storage: true,
      terrace: "3.7-4.0 m²",
    },
    availability: {
      blocked: { apartments: 20, storage: 0, parking: 0 },
      available: { apartments: 43, storage: 63, parking: 118 },
      negotiating: { apartments: 0, storage: 0, parking: 0 },
      total: { apartments: 63, storage: 63, parking: 118 },
    },
    tags: ["Arriendo", "TC S/I"],
    units: [
      { unit: "A-101", typology: "2D-2B", surface: "45 m²", priceUF: 11303, priceCLP: 448942892, status: "Disponible" },
      { unit: "A-102", typology: "2D-2B", surface: "42 m²", priceCLP: 423000000, priceUF: 10650, status: "Disponible" },
      { unit: "B-201", typology: "3D-2B", surface: "50 m²", priceUF: 12500, priceCLP: 496600000, status: "Disponible" },
      { unit: "B-202", typology: "3D-3B", surface: "53 m²", priceUF: 13200, priceCLP: 524409600, status: "Bloqueado" },
    ],
  },
  {
    slug: "miguel-comas-1800",
    name: "Miguel Comas 1800",
    developer: "Inmobiliaria Siena",
    city: "Santiago",
    commune: "Vitacura",
    address: "Miguel Comas 1800",
    priceFromUF: 18468,
    typologies: "3D-3B, 3D-4B",
    status: "Entrega Inmediata",
    surface: "36-56 m² tot.",
    delivery: "Inmediata",
    image: "/images/project-miguel-comas.jpg",
    gallery: [
      "/images/project-miguel-comas.jpg",
      "/images/gallery-interior-1.jpg",
      "/images/gallery-interior-2.jpg",
      "/images/gallery-interior-3.jpg",
      "/images/gallery-terrace-1.jpg",
      "/images/gallery-bathroom-1.jpg",
    ],
    plans: ["/images/gallery-interior-1.jpg", "/images/gallery-interior-2.jpg"],
    features: {
      bedrooms: "2-3",
      bathrooms: "2-3",
      parking: true,
      storage: true,
      terrace: "3.3-9.2 m²",
    },
    availability: {
      blocked: { apartments: 2, storage: 0, parking: 0 },
      available: { apartments: 3, storage: 2, parking: 10 },
      negotiating: { apartments: 0, storage: 0, parking: 0 },
      total: { apartments: 5, storage: 2, parking: 10 },
    },
    tags: [],
    units: [
      { unit: "A-101", typology: "3D-3B", surface: "48 m²", priceUF: 18468, priceCLP: 733590976, status: "Disponible" },
      { unit: "A-102", typology: "3D-3B", surface: "46 m²", priceUF: 17800, priceCLP: 707154400, status: "Disponible" },
      { unit: "B-201", typology: "3D-4B", surface: "56 m²", priceUF: 21000, priceCLP: 834288000, status: "Bloqueado" },
    ],
  },
  {
    slug: "candelaria-goyenechea-4500",
    name: "Candelaria Goyenechea 4500",
    developer: "Inmobiliaria Núcleos",
    city: "Santiago",
    commune: "Vitacura",
    address: "Candelaria Goyenechea 4500",
    priceFromUF: 13500,
    typologies: "2D-2B, 2D-3B, 3D-3B, 4D-4B",
    status: "Venta en Verde",
    surface: "40-102 m² tot.",
    delivery: "12 meses",
    image: "/images/project-candelaria.jpg",
    gallery: [
      "/images/project-candelaria.jpg",
      "/images/gallery-interior-1.jpg",
      "/images/gallery-interior-2.jpg",
      "/images/gallery-interior-3.jpg",
      "/images/gallery-terrace-1.jpg",
      "/images/gallery-bathroom-1.jpg",
    ],
    plans: ["/images/gallery-interior-1.jpg", "/images/gallery-interior-2.jpg"],
    features: {
      bedrooms: "2-4",
      bathrooms: "2-4",
      parking: true,
      storage: true,
      terrace: "4.0-12.5 m²",
    },
    availability: {
      blocked: { apartments: 13, storage: 0, parking: 0 },
      available: { apartments: 11, storage: 26, parking: 22 },
      negotiating: { apartments: 0, storage: 0, parking: 0 },
      total: { apartments: 24, storage: 26, parking: 22 },
    },
    tags: ["Pie Cuotas"],
    units: [
      { unit: "A-101", typology: "2D-2B", surface: "45 m²", priceUF: 13500, priceCLP: 536328000, status: "Disponible" },
      { unit: "A-102", typology: "2D-3B", surface: "52 m²", priceUF: 14800, priceCLP: 587974400, status: "Disponible" },
      { unit: "B-201", typology: "3D-3B", surface: "68 m²", priceUF: 18500, priceCLP: 734968000, status: "En Negocio" },
      { unit: "B-202", typology: "4D-4B", surface: "85 m²", priceUF: 22000, priceCLP: 873728000, status: "Bloqueado" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
