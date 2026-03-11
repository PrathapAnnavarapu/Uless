"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { API_BASE } from "@/lib/backend"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type Brand = {
  id: string
  name: string
  slug: string
  logo?: string
  category?: string
  tagline?: string
  parentCompany?: string
  description?: string
  benefits?: string[]
  originalPrice?: string
  studentPrice?: string
  discount?: string
  link?: string
  productImage?: string
  promoCode?: string
  referralLink?: string
  featured?: boolean
}

export default function AdminBrandsPage() {
  const { isAuthenticated, user } = useAuth()
  const [brands, setBrands] = useState<Brand[]>([])
  const [selected, setSelected] = useState<Brand | null>(null)
  const [form, setForm] = useState<Partial<Brand>>({})

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    if (selected) setForm(selected)
    else setForm({})
  }, [selected])

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/brands`)
      const data = await res.json()
      setBrands(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (field: keyof Brand, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = selected
        ? `${API_BASE}/api/brands/${selected.id}`
        : `${API_BASE}/api/brands`
      const method = selected ? "PUT" : "POST"
      const token = localStorage.getItem("uless_auth_token")
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      toast.success(`Brand ${selected ? "updated" : "created"}`)
      setSelected(null)
      fetchBrands()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  if (!isAuthenticated) return <p>Please sign in to manage brands.</p>
  if (!user?.isAdmin) return <p>Forbidden</p>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Brands</h1>

      <div className="mb-6">
        <Button onClick={() => setSelected(null)}>+ New Brand</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {brands.map((b) => (
          <div
            key={b.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => setSelected(b)}
          >
            <p className="font-medium">{b.name}</p>
            <p className="text-xs text-gray-500">{b.category || ""}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <Input
            value={form.slug || ""}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <Input
            value={form.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Logo URL</label>
          <Input
            value={form.logo || ""}
            onChange={(e) => handleChange("logo", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tagline</label>
          <Input
            value={form.tagline || ""}
            onChange={(e) => handleChange("tagline", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Parent Company</label>
          <Input
            value={form.parentCompany || ""}
            onChange={(e) => handleChange("parentCompany", e.target.value)}
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
          <label className="block text-sm font-medium">Benefits (comma‑separated)</label>
          <Textarea
            value={form.benefits ? form.benefits.join(",") : ""}
            onChange={(e) => handleChange("benefits", e.target.value.split(","))}
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
          <label className="block text-sm font-medium">Discount</label>
          <Input
            value={form.discount || ""}
            onChange={(e) => handleChange("discount", e.target.value)}
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
          <label className="block text-sm font-medium">Product Image</label>
          <Input
            value={form.productImage || ""}
            onChange={(e) => handleChange("productImage", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Promo Code</label>
          <Input
            value={form.promoCode || ""}
            onChange={(e) => handleChange("promoCode", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Referral Link</label>
          <Input
            value={form.referralLink || ""}
            onChange={(e) => handleChange("referralLink", e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.featured || false}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          <label className="text-sm">Featured</label>
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Save</Button>
          {selected && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelected(null)}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
