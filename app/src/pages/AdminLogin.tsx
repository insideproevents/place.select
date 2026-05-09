import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!supabase) {
      setError('Supabase no está configurado. Revisa las variables de entorno.')
      return
    }

    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError('Email o contraseña incorrectos.')
        return
      }

      navigate('/admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0A0A0A]/70 backdrop-blur-xl p-6">
        <h1 className="text-white text-2xl font-semibold mb-2">Panel Admin</h1>
        <p className="text-[#B0B0B0] text-sm mb-6">Inicia sesión para continuar.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#B0B0B0]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#B0B0B0]">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-[#6F6F6F] outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
