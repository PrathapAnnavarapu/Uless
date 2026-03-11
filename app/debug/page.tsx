"use client"

import { useState, useEffect } from "react"
import { getEnvVarStatus, isSupabaseConfigured } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [isConfigured, setIsConfigured] = useState<boolean>(false)

  useEffect(() => {
    // Check environment variables on client side
    setEnvStatus(getEnvVarStatus())
    setIsConfigured(isSupabaseConfigured())
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Environment Debug Page</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Supabase Configuration Status</CardTitle>
          <CardDescription>This page helps diagnose environment variable issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Configuration Status:</h2>
              <p className={isConfigured ? "text-green-600" : "text-red-600"}>
                {isConfigured ? "✅ Supabase is properly configured" : "❌ Supabase is NOT properly configured"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
              {envStatus ? (
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span>{" "}
                    <span className={envStatus.NEXT_PUBLIC_SUPABASE_URL.exists ? "text-green-600" : "text-red-600"}>
                      {envStatus.NEXT_PUBLIC_SUPABASE_URL.exists
                        ? `✅ Available (${envStatus.NEXT_PUBLIC_SUPABASE_URL.value})`
                        : "❌ Missing"}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>{" "}
                    <span
                      className={envStatus.NEXT_PUBLIC_SUPABASE_ANON_KEY.exists ? "text-green-600" : "text-red-600"}
                    >
                      {envStatus.NEXT_PUBLIC_SUPABASE_ANON_KEY.exists
                        ? `✅ Available (${envStatus.NEXT_PUBLIC_SUPABASE_ANON_KEY.value})`
                        : "❌ Missing"}
                    </span>
                  </li>
                </ul>
              ) : (
                <p>Loading environment status...</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Refresh Status</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Fix</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Make sure you've added the environment variables to v0 using the "Add Environment Variables" feature
            </li>
            <li>
              The variables should be named exactly <code className="bg-gray-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              and <code className="bg-gray-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            </li>
            <li>After setting the environment variables, try refreshing or restarting your application</li>
            <li>
              If you're still having issues, try deploying your application to Vercel and setting the environment
              variables there
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
