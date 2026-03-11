import { type NextRequest, NextResponse } from "next/server"
import { generateApiKey, hashApiKey } from "@/lib/api-keys"
import { isSupabaseConfigured } from "@/lib/supabase"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated (you should implement proper auth checks)
    // This is just a placeholder - replace with your actual auth logic
    const isAuthenticated = true

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate a new API key
    const newApiKey = generateApiKey()
    const hashedKey = hashApiKey(newApiKey)

    // Get request body
    const body = await request.json()
    const { name, permissions } = body

    if (!name) {
      return NextResponse.json({ error: "API key name is required" }, { status: 400 })
    }

    // Store the hashed key in your database
    if (isSupabaseConfigured()) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin operations
      )

      const { error } = await supabase.from("api_keys").insert({
        name,
        key_hash: hashedKey,
        permissions: permissions || ["read"],
        created_at: new Date().toISOString(),
        user_id: "user-id-here", // Replace with actual user ID
      })

      if (error) {
        console.error("Error storing API key:", error)
        return NextResponse.json({ error: "Failed to create API key" }, { status: 500 })
      }
    } else {
      // For demo purposes, just log the key
      console.log("API key created (demo mode):", { name, keyHash: hashedKey })
    }

    // Return the raw API key to the user (this is the only time it will be visible)
    return NextResponse.json({
      success: true,
      apiKey: newApiKey,
      message: "Store this API key securely. It will not be shown again.",
    })
  } catch (error) {
    console.error("API key generation error:", error)
    return NextResponse.json({ error: "Failed to generate API key" }, { status: 500 })
  }
}
