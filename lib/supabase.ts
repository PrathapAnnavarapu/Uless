export function getEnvVarStatus() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      value: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
  }
}

export function isSupabaseConfigured(): boolean {
  const env = getEnvVarStatus()
  return env.NEXT_PUBLIC_SUPABASE_URL.exists && env.NEXT_PUBLIC_SUPABASE_ANON_KEY.exists
}
