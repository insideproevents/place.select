import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase'
import {
  LogOut,
  PlusCircle,
  Trash2,
  AlertTriangle,
  Loader2,
  Pencil,
} from 'lucide-react'

type ProjectFeatures = {
  bedrooms: string
  bathrooms: string
  parking: boolean
  storage: boolean
  terrace: string
}

type AdminProjectRow = {
  id?: string | number
  name: string
  slug: string
  developer: string
  city: string
  commune: string
  address: string
  price_from_uf: number
  typologies: string
  status: string
  delivery: string
  image: string
  gallery: string[]
  plans: string[]
  tags: string[]
  surface: string
  features: ProjectFeatures
  availability: Record<string, unknown>
  units: unknown[]
}

export default function AdminPanel() {
  const navigate = useNavigate()

  const [sessionChecked, setSessionChecked] = useState(false)
  const [projects, setProjects] = useState<AdminProjectRow[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [developer, setDeveloper] = useState('')
  const [city, setCity] = useState('')
  const [commune, setCommune] = useState('')
  const [address, setAddress] = useState('')
  const [priceFromUf, setPriceFromUf] = useState('')
  const [typologies, setTypologies] = useState('')
  const [status, setStatus] = useState('')
  const [delivery, setDelivery] = useState('')
  const [image, setImage] = useState('')
  const [galleryText, setGalleryText] = useState('')
  const [plansText, setPlansText] = useState('')
  const [tagsText, setTagsText] = useState('')
  const [surface, setSurface] = useState('')
  const [featuresBedrooms, setFeaturesBedrooms] = useState('')
  const [featuresBathrooms, setFeaturesBathrooms] = useState('')
  const [featuresParking, setFeaturesParking] = useState(false)
  const [featuresStorage, setFeaturesStorage] = useState(false)
  const [featuresTerrace, setFeaturesTerrace] = useState('')

  const [editingSlug, setEditingSlug] = useState<string | null>(null)

  const galleryArray = useMemo(() => {
    return galleryText
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean)
  }, [galleryText])

  const plansArray = useMemo(() => {
    return plansText
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean)
  }, [plansText])

  const tagsArray = useMemo(() => {
    return tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }, [tagsText])

  useEffect(() => {
    const init = async () => {
      setError(null)

      const client = supabase
      if (!client) {
        setSessionChecked(true)
        setError(
          'Supabase no está configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.'
        )
        return
      }

      const { data, error: sessionError } = await client.auth.getSession()
      console.log('session:', data?.session)
      if (sessionError) {
        setError('No se pudo verificar la sesión.')
        setSessionChecked(true)
        navigate('/admin/login', { replace: true })
        return
      }

      if (!data?.session) {
        setSessionChecked(true)
        navigate('/admin/login', { replace: true })
        return
      }

      setSessionChecked(true)
    }

    init()
  }, [navigate])

  useEffect(() => {
    if (!sessionChecked) return
    if (!supabase) return

    const client = supabase

    const load = async () => {
      setError(null)
      setLoadingProjects(true)

      try {
        const { data, error: listError } = await client
          .from('projects')
          .select('*')
          .order('name', { ascending: true })

        if (listError) throw listError
        setProjects((data ?? []) as AdminProjectRow[])
        console.log('proyectos cargados:', (data ?? []) as AdminProjectRow[])
      } catch (e: any) {
        setError(e?.message ?? 'Error cargando proyectos.')
      } finally {
        setLoadingProjects(false)
      }
    }

    load()
  }, [sessionChecked])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return

    setError(null)

    if (!slug.trim()) {
      setError('El campo "slug" es obligatorio.')
      return
    }
    if (!name.trim()) {
      setError('El campo "name" es obligatorio.')
      return
    }

    const priceFromUfNum = parseFloat(priceFromUf)
    if (isNaN(priceFromUfNum) || priceFromUfNum < 0) {
      setError('price_from_uf debe ser un número válido.')
      return
    }

    const features: ProjectFeatures = {
      bedrooms: featuresBedrooms.trim(),
      bathrooms: featuresBathrooms.trim(),
      parking: featuresParking,
      storage: featuresStorage,
      terrace: featuresTerrace.trim(),
    }

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        developer: developer.trim() || null,
        city: city.trim() || null,
        commune: commune.trim() || null,
        address: address.trim() || null,
        price_from_uf: priceFromUfNum,
        typologies: typologies.trim() || null,
        status: status.trim() || null,
        delivery: delivery.trim() || null,
        image: image.trim() || null,
        gallery: galleryArray,
        plans: plansArray,
        tags: tagsArray,
        surface: surface.trim() || null,
        features,
        availability: {},
        units: [],
      }

      if (editingSlug) {
        // Modo edición: actualizar proyecto existente
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('slug', editingSlug)

        if (updateError) throw updateError
      } else {
        // Modo creación: insertar nuevo proyecto
        const { error: insertError } = await supabase
          .from('projects')
          .insert(payload)

        if (insertError) throw insertError
      }

      // Reset form y modo edición
      setEditingSlug(null)
      resetForm()

      // Refresh list
      const { data, error: listError } = await supabase
        .from('projects')
        .select('*')
        .order('name', { ascending: true })

      if (listError) throw listError
      const updatedProjects = (data ?? []) as AdminProjectRow[]
      setProjects(updatedProjects)
      console.log('proyectos cargados (post guardado):', updatedProjects)
    } catch (e: any) {
      setError(e?.message ?? 'Error al guardar el proyecto.')
    }
  }

  const handleDelete = async (row: AdminProjectRow) => {
    if (!supabase) return

    setError(null)

    try {
      if (row.id !== undefined && row.id !== null && row.id !== '') {
        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('id', row.id)

        if (deleteError) throw deleteError
      } else {
        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('name', row.name)

        if (deleteError) throw deleteError
      }

      const { data, error: listError } = await supabase
        .from('projects')
        .select('*')
        .order('name', { ascending: true })

      if (listError) throw listError
      const updatedProjects = (data ?? []) as AdminProjectRow[]
      setProjects(updatedProjects)
      console.log('proyectos cargados (post eliminación):', updatedProjects)
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar el proyecto.')
    }
  }

  const handleCancelEdit = () => {
    setEditingSlug(null)
    resetForm()
  }

  const resetForm = () => {
    setSlug('')
    setName('')
    setDeveloper('')
    setCity('')
    setCommune('')
    setAddress('')
    setPriceFromUf('')
    setTypologies('')
    setStatus('')
    setDelivery('')
    setImage('')
    setGalleryText('')
    setPlansText('')
    setTagsText('')
    setSurface('')
    setFeaturesBedrooms('')
    setFeaturesBathrooms('')
    setFeaturesParking(false)
    setFeaturesStorage(false)
    setFeaturesTerrace('')
  }

  const handleEdit = (project: AdminProjectRow) => {
    setEditingSlug(project.slug)
    setSlug(project.slug)
    setName(project.name)
    setDeveloper(project.developer || '')
    setCity(project.city || '')
    setCommune(project.commune || '')
    setAddress(project.address || '')
    setPriceFromUf(String(project.price_from_uf))
    setTypologies(project.typologies || '')
    setStatus(project.status || '')
    setDelivery(project.delivery || '')
    setImage(project.image || '')
    setGalleryText(project.gallery?.join(', ') || '')
    setPlansText(project.plans?.join(', ') || '')
    setTagsText(project.tags?.join(', ') || '')
    setSurface(project.surface || '')
    setFeaturesBedrooms(project.features?.bedrooms || '')
    setFeaturesBathrooms(project.features?.bathrooms || '')
    setFeaturesParking(project.features?.parking || false)
    setFeaturesStorage(project.features?.storage || false)
    setFeaturesTerrace(project.features?.terrace || '')
   }

  const handleSignOut = async () => {
    setError(null)

    if (!supabase) {
      navigate('/admin/login', { replace: true })
      return
    }

    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError(signOutError.message)
      return
    }

    navigate('/admin/login', { replace: true })
  }

  const formatTags = (t: unknown): string[] => {
    if (!t) return []
    if (Array.isArray(t)) return t as string[]
    if (typeof t === 'string') {
      try {
        const parsed = JSON.parse(t)
        if (Array.isArray(parsed)) return parsed as string[]
      } catch {
        // ignore
      }
      return t.split(',').map((x: string) => x.trim()).filter(Boolean)
    }
    return []
  }

  const formatGallery = (g: unknown): string[] => {
    if (!g) return []
    if (Array.isArray(g)) return g as string[]
    if (typeof g === 'string') {
      try {
        const parsed = JSON.parse(g)
        if (Array.isArray(parsed)) return parsed as string[]
      } catch {
        // ignore
      }
      return g.split(',').map((x: string) => x.trim()).filter(Boolean)
    }
    return []
  }

  const formatPlans = (p: unknown): string[] => {
    if (!p) return []
    if (Array.isArray(p)) return p as string[]
    if (typeof p === 'string') {
      try {
        const parsed = JSON.parse(p)
        if (Array.isArray(parsed)) return parsed as string[]
      } catch {
        // ignore
      }
      return p.split(',').map((x: string) => x.trim()).filter(Boolean)
    }
    return []
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Panel Admin</h1>
            <p className="text-[#B0B0B0] text-sm">Gestiona proyectos en Supabase</p>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>

        {!sessionChecked ? (
          <div className="flex items-center justify-center py-16">
            <div className="inline-flex items-center gap-2 text-[#B0B0B0]">
              <Loader2 size={18} className="animate-spin" />
              Verificando sesión...
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-red-300 flex gap-2 items-start">
                <AlertTriangle className="mt-0.5" size={18} />
                <div className="text-sm">{error}</div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/70 backdrop-blur-xl p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <PlusCircle size={18} />
                  Agregar proyecto
                </h2>
                <p className="text-[#B0B0B0] text-sm mb-5">
                  Los campos "gallery", "plans" y "tags" se ingresan como URLs o etiquetas separadas por comas.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        slug
                      </label>
                      <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: laguna-andina"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Laguna Andina"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        developer
                      </label>
                      <input
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Constructora XYZ"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        city
                      </label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Santiago"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        commune
                      </label>
                      <input
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Providencia"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Av. Principal 123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        price_from_uf
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={priceFromUf}
                        onChange={(e) => setPriceFromUf(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: 1000"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        surface
                      </label>
                      <input
                        value={surface}
                        onChange={(e) => setSurface(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: 120 m²"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        typologies
                      </label>
                      <input
                        value={typologies}
                        onChange={(e) => setTypologies(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: 1, 2, 3 dormitorios"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        status
                      </label>
                      <input
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: En venta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      delivery
                    </label>
                    <input
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="Ej: Inmediata"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      image (URL)
                    </label>
                    <input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      gallery (URLs separadas por coma)
                    </label>
                    <input
                      value={galleryText}
                      onChange={(e) => setGalleryText(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="https://img1.jpg, https://img2.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      plans (URLs separadas por coma)
                    </label>
                    <input
                      value={plansText}
                      onChange={(e) => setPlansText(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="https://plano1.pdf, https://plano2.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      tags (separadas por coma)
                    </label>
                    <input
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h3 className="text-sm font-medium text-[#B0B0B0] mb-3">
                      Características
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                          features_bedrooms
                        </label>
                        <input
                          value={featuresBedrooms}
                          onChange={(e) => setFeaturesBedrooms(e.target.value)}
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                          placeholder="Ej: 1, 2, 3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                          features_bathrooms
                        </label>
                        <input
                          value={featuresBathrooms}
                          onChange={(e) => setFeaturesBathrooms(e.target.value)}
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                          placeholder="Ej: 1, 2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="features_parking"
                          checked={featuresParking}
                          onChange={(e) => setFeaturesParking(e.target.checked)}
                          className="w-4 h-4 rounded border-white/30 bg-white/5 text-[#C9A962] focus:ring-2 focus:ring-[#C9A962]"
                        />
                        <label htmlFor="features_parking" className="text-sm text-[#B0B0B0]">
                          features_parking
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="features_storage"
                          checked={featuresStorage}
                          onChange={(e) => setFeaturesStorage(e.target.checked)}
                          className="w-4 h-4 rounded border-white/30 bg-white/5 text-[#C9A962] focus:ring-2 focus:ring-[#C9A962]"
                        />
                        <label htmlFor="features_storage" className="text-sm text-[#B0B0B0]">
                          features_storage
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        features_terrace
                      </label>
                      <input
                        value={featuresTerrace}
                        onChange={(e) => setFeaturesTerrace(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: 10 m², 20 m²"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {editingSlug && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      type="submit"
                      className={editingSlug ? "flex-1 px-4 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200" : "w-full px-4 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200"}
                    >
                      {editingSlug ? 'Actualizar proyecto' : 'Guardar proyecto'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/70 backdrop-blur-xl p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Proyectos existentes
                </h2>

                {loadingProjects ? (
                  <div className="flex items-center gap-2 text-[#B0B0B0] py-6">
                    <Loader2 size={18} className="animate-spin" />
                    Cargando...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-[#B0B0B0] text-sm py-6">
                    No hay proyectos para mostrar.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((p) => {
                      const safeTags = formatTags(p.tags)
                      const safeGallery = formatGallery(p.gallery)
                      const safePlans = formatPlans(p.plans)
                      return (
                        <div
                          key={String(p.id ?? p.slug)}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold">{p.name}</div>
                              <div className="text-sm text-[#B0B0B0] mt-0.5">
                                {p.developer && <span>{p.developer}</span>}
                                {p.developer && p.city && <span> • </span>}
                                {p.city && <span>{p.city}</span>}
                              </div>
                              <div className="text-sm text-[#B0B0B0] mt-0.5">
                                {p.slug && <span className="text-xs opacity-60">slug: {p.slug}</span>}
                              </div>

                              {p.address && (
                                <div className="text-sm text-[#B0B0B0] mt-1">
                                  {p.address}
                                </div>
                              )}

                              <div className="text-sm text-[#B0B0B0] mt-1">
                                Precio desde: {p.price_from_uf} UF
                                {p.surface && <span> • Superficie: {p.surface}</span>}
                                {p.status && <span> • {p.status}</span>}
                              </div>

                              {safeTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {safeTags.slice(0, 6).map((t: string) => (
                                    <span
                                      key={t}
                                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[#B0B0B0]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {safeGallery.length > 0 && (
                                <div className="mt-2 text-xs text-[#B0B0B0]">
                                  Gallery: {safeGallery.length} imagen(es)
                                </div>
                              )}

                              {safePlans.length > 0 && (
                                <div className="mt-1 text-xs text-[#B0B0B0]">
                                  Plans: {safePlans.length} archivo(s)
                                </div>
                              )}

                              {p.features && (
                                <div className="mt-2 text-xs text-[#B0B0B0]">
                                  Dormitorios: {p.features.bedrooms || 'N/A'} •
                                  Baños: {p.features.bathrooms || 'N/A'}
                                  {p.features.parking && ' • Estacionamiento'}
                                  {p.features.storage && ' • Bodega'}
                                  {p.features.terrace && ` • Terraza: ${p.features.terrace}`}
                                </div>
                              )}
                            </div>

                            <div className="flex items-start gap-2">
                              <button
                                onClick={() => handleEdit(p)}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                title="Editar"
                              >
                                <Pencil size={18} className="text-[#C9A962]" />
                                <span className="text-sm text-[#C9A962]">Editar</span>
                              </button>

                              <button
                                onClick={() => handleDelete(p)}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 size={18} className="text-red-200" />
                                <span className="text-sm text-red-200">Eliminar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
