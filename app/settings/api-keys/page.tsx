"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Copy, Key, Plus, Trash } from "lucide-react"

export default function ApiKeysPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [keyName, setKeyName] = useState("")
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; created: string }>>([])

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/auth")
    return null
  }

  const handleCreateKey = async () => {
    if (!keyName.trim()) {
      toast.error("Please enter a name for your API key")
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: keyName }),
      })

      const data = await response.json()

      if (response.ok) {
        setNewApiKey(data.apiKey)
        setApiKeys([
          ...apiKeys,
          {
            id: Math.random().toString(36).substring(2),
            name: keyName,
            created: new Date().toISOString(),
          },
        ])
        setKeyName("")
        toast.success("API key created successfully")
      } else {
        toast.error(data.error || "Failed to create API key")
      }
    } catch (error) {
      toast.error("An error occurred while creating the API key")
    } finally {
      setIsCreating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("API key copied to clipboard")
  }

  const handleDeleteKey = (id: string) => {
    // In a real app, you would call an API to delete the key
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    toast.success("API key revoked")
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">API Keys</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>
            API keys allow external applications to access your data. Keep them secure and never share them publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">API Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g., Development, Production, etc."
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
              />
            </div>

            {newApiKey && (
              <div className="p-4 mt-4 space-y-2 border rounded-md bg-amber-50 border-amber-200">
                <div className="flex items-center justify-between">
                  <Label className="font-medium text-amber-800">Your New API Key</Label>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(newApiKey)}>
                    <Copy className="w-4 h-4 mr-1" /> Copy
                  </Button>
                </div>
                <div className="p-2 font-mono text-sm bg-white border rounded">{newApiKey}</div>
                <p className="text-xs text-amber-700">
                  This key will only be shown once. Store it securely as you won't be able to see it again.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateKey} disabled={isCreating || !keyName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            {isCreating ? "Creating..." : "Create API Key"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage your existing API keys. Revoke any keys that may have been compromised.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Key className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>You haven't created any API keys yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">{key.name}</h3>
                    <p className="text-sm text-gray-500">Created: {new Date(key.created).toLocaleDateString()}</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteKey(key.id)}>
                    <Trash className="w-4 h-4 mr-1" /> Revoke
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
