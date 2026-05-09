import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase'
import {
  LogOut,
  PlusCircle,
  Trash2,
  AlertTriangle,
  Loader2,
} from 'lucide-react'

type AdminProjectRow = {
  id?: string | number
  title: string
  description: string | null
  image_url: string | null
  category: string | null
  location: string | null
  tags: string[] | string | null
}

export default function AdminPanel() {
  const navigate = useNavigate()

  const [sessionChecked, setSessionChecked] = useState(false)
  const [projects, setProjects] = useState<AdminProjectRow[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [tagsText, setTagsText] = useState('')

  const tagsArray = useMemo(() => {
    return tagsText
      .split(',')
      .map((t) => t.trim())
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
        // Esperado por la petición: tabla "projects" con campos tipo:
        // title, description, image_url, category, location, tags
        const { data, error: listError } = await client
          .from('projects')
          .select('*')
          .order('title', { ascending: true })

        if (listError) throw listError
        setProjects((data ?? []) as AdminProjectRow[])
      } catch (e: any) {
        setError(e?.message ?? 'Error cargando proyectos.')
      } finally {
        setLoadingProjects(false)
      }
    }

    load()
  }, [sessionChecked])

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return

    setError(null)

    if (!title.trim()) {
      setError('El campo "title" es obligatorio.')
      return
    }

    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        image_url: imageUrl.trim() || null,
        category: category.trim() || null,
        location: location.trim() || null,
        tags: tagsArray,
      }

      const { error: insertError } = await supabase
        .from('projects')
        .insert(payload)

      if (insertError) throw insertError

      // Reset form
      setTitle('')
      setDescription('')
      setImageUrl('')
      setCategory('')
      setLocation('')
      setTagsText('')

      // Refresh list
      const { data, error: listError } = await supabase
        .from('projects')
        .select('*')
        .order('title', { ascending: true })

      if (listError) throw listError
      setProjects((data ?? []) as AdminProjectRow[])
    } catch (e: any) {
      setError(e?.message ?? 'Error al agregar el proyecto.')
    }
  }

  const handleDelete = async (row: AdminProjectRow) => {
    if (!supabase) return

    setError(null)

    // Supabase typically returns `id`, but we fallback to title if no id exists.
    // For safety, we try to delete by id first, otherwise by title.
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
          .eq('title', row.title)

        if (deleteError) throw deleteError
      }

      const { data, error: listError } = await supabase
        .from('projects')
        .select('*')
        .order('title', { ascending: true })

      if (listError) throw listError
      setProjects((data ?? []) as AdminProjectRow[])
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar el proyecto.')
    }
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

  const formatTags = (t: AdminProjectRow['tags']) => {
    if (!t) return []
    if (Array.isArray(t)) return t
    if (typeof t === 'string') {
      try {
        const parsed = JSON.parse(t)
        if (Array.isArray(parsed)) return parsed
      } catch {
        // ignore
      }
      return t.split(',').map((x) => x.trim()).filter(Boolean)
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
                  Los campos "tags" se ingresan como texto separado por comas.
                </p>

                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="Ej: Laguna Andina"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      description
                    </label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="Descripción corta"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      image_url
                    </label>
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        category
                      </label>
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Departamento"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                        location
                      </label>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                        placeholder="Ej: Santiago"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                      tags (coma separada)
                    </label>
                    <input
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
                  >
                    Guardar proyecto
                  </button>
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
                      return (
                        <div
                          key={String(p.id ?? p.title)}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold">{p.title}</div>
                              {p.category && (
                                <div className="text-sm text-[#B0B0B0] mt-0.5">
                                  {p.category}
                                  {p.location ? ` • ${p.location}` : ''}
                                </div>
                              )}
                              {!p.category && p.location && (
                                <div className="text-sm text-[#B0B0B0] mt-0.5">
                                  {p.location}
                                </div>
                              )}

                              {p.description && (
                                <div className="text-sm text-[#B0B0B0] mt-2">
                                  {p.description}
                                </div>
                              )}

                              {safeTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {safeTags.slice(0, 6).map((t) => (
                                    <span
                                      key={t}
                                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[#B0B0B0]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

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
