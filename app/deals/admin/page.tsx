"use client"

import { useState, useEffect } from "react"
import { useDealsContext } from "@/contexts/deals-context"
import { useAuth } from "@/contexts/auth-context"
import { API_BASE } from "@/lib/backend"
import { mockCategories } from "@/data/mock-data"
import type { Deal } from "@/types/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function AdminDealsPage() {
  const { deals, loading, refreshDeals } = useDealsContext()
  const { isAuthenticated, user } = useAuth()
  const [selected, setSelected] = useState<Deal | null>(null)
  const [form, setForm] = useState<Partial<Deal>>({})
  const [brands, setBrands] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    if (selected) {
      setForm(selected)
    } else {
      setForm({})
    }
  }, [selected])

  useEffect(() => {
    // load brands from backend for selection
    fetch(`${API_BASE}/api/brands`)
      .then((r) => r.json())
      .then(setBrands)
      .catch(console.error)
  }, [])

  const handleChange = (field: keyof Deal, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = selected ? `${API_BASE}/api/deals/${selected.id}` : `${API_BASE}/api/deals`
      const method = selected ? "PUT" : "POST"
      const token = localStorage.getItem("uless_auth_token")
      const body: any = { ...form }
      // if the brand_id isn't set but we have a brand name, try matching it
      if (!body.brand_id && body.brand) {
        const matched = brands.find((b) => b.name === body.brand)
        if (matched) body.brand_id = matched.id
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      toast.success(`Deal ${selected ? "updated" : "created"}`)
      setSelected(null)
      await refreshDeals()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  if (!isAuthenticated) {
    return <p>Please sign in to manage deals.</p>
  }

  if (!user?.isAdmin) {
    return <p>You do not have permission to view this page.</p>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin: Manage Deals</h1>
        <Button asChild>
          <a href="/brands/admin">Manage Brands</a>
        </Button>
      </div>

      <div className="mb-6">
        <Button onClick={() => setSelected(null)}>+ New Deal</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {deals.map((d) => (
          <div
            key={d.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => setSelected(d)}
          >
            <p className="font-medium">{d.title}</p>
            <p className="text-xs text-gray-500">{d.brand}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input
            value={form.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <Textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Brand</label>
          <Select
            value={form.brand || ""}
            onValueChange={(v) => handleChange("brand", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem key={b.id} value={b.name}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <Select
            value={form.category || ""}
            onValueChange={(v) => handleChange("category", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {mockCategories.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Discount</label>
          <Input
            value={form.discount || ""}
            onChange={(e) => handleChange("discount", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Original Price</label>
            <Input
              value={form.originalPrice || ""}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Student Price</label>
            <Input
              value={form.studentPrice || ""}
              onChange={(e) => handleChange("studentPrice", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Valid Until</label>
          <Input
            type="date"
            value={form.validUntil ? form.validUntil.split("T")[0] : ""}
            onChange={(e) => handleChange("validUntil", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Link</label>
          <Input
            value={form.link || ""}
            onChange={(e) => handleChange("link", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <Input
            value={form.image || ""}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Brand Logo URL</label>
          <Input
            value={form.brandLogo || ""}
            onChange={(e) => handleChange("brandLogo", e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Save</Button>
          {selected && (
            <Button type="button" variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
