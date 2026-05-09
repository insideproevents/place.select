import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Limpia la URL eliminando cualquier path extra como /rest/v1/
const supabaseUrl = rawUrl?.replace(/\/(rest\/v1\/?)?$/, '')

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY.')
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null