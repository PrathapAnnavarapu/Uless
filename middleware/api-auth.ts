import { type NextRequest, NextResponse } from "next/server"
import { hashApiKey } from "@/lib/api-keys"
import { createClient } from "@supabase/supabase-js"
import { isSupabaseConfigured } from "@/lib/supabase"

export async function apiAuthMiddleware(request: NextRequest) {
  // Check if the request has an API key
  const apiKey = request.headers.get("x-api-key")

  if (!apiKey) {
    return NextResponse.json({ error: "API key required" }, { status: 401 })
  }

  // Hash the provided API key
  const hashedKey = hashApiKey(apiKey)

  // Check if the API key exists in your database
  if (isSupabaseConfigured()) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data, error } = await supabase.from("api_keys").select("*").eq("key_hash", hashedKey).single()

    if (error || !data) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    // API key is valid, continue to the API route
    return NextResponse.next()
  }

  // For demo purposes, allow any key
  console.log("API key validation skipped (demo mode)")
  return NextResponse.next()
}
