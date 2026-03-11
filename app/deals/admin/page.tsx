"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useDealsContext } from "@/contexts/deals-context"
import { useAuth } from "@/contexts/auth-context"
import { API_BASE } from "@/lib/backend"
import type { Deal, Brand, Category } from "@/types/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Plus, Edit2, Trash2, Loader2, Tag, ShoppingBag, LayoutGrid, Star, AlertTriangle } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DealCard } from "@/components/deal-card"
import { BrandCard } from "@/components/brand-card"
import { CategoryCard } from "@/components/category-card"
import { ImageUpload } from "@/components/image-upload"
import Image from "next/image"

// ─── helpers ────────────────────────────────────────────────────────────────
function authHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("uless_auth_token") : null
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const ICON_OPTIONS = [
  "laptop", "smartphone", "shirt", "music", "credit-card",
  "utensils", "plane", "heart", "book", "gift", "camera", "shopping-bag",
]

// ─── main component ──────────────────────────────────────────────────────────
export default function AdminDealsPage() {
  const { deals, loading, refreshDeals } = useDealsContext()
  const { isAuthenticated, user } = useAuth()

  // ── selection state ──────────────────────────────────────────────────────
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // ── dialog state ─────────────────────────────────────────────────────────
  const [isDealDialogOpen, setIsDealDialogOpen] = useState(false)
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  // ── delete confirmation ──────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<{ type: "deal" | "brand" | "category"; id: string; label: string } | null>(null)

  // ── form state ───────────────────────────────────────────────────────────
  const [dealForm, setDealForm] = useState<Partial<Deal>>({})
  const [brandForm, setBrandForm] = useState<Partial<Brand>>({})
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({})

  // ── data state ───────────────────────────────────────────────────────────
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("deals")

  // ── sync forms ───────────────────────────────────────────────────────────
  useEffect(() => { setDealForm(selectedDeal ?? {}) }, [selectedDeal])
  useEffect(() => { setBrandForm(selectedBrand ?? { featured: false }) }, [selectedBrand])
  useEffect(() => { setCategoryForm(selectedCategory ?? {}) }, [selectedCategory])

  // ── fetch helpers ─────────────────────────────────────────────────────────
  const fetchBrands = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/brands/all`)
      if (res.ok) setBrands(await res.json())
    } catch { /* silent */ }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories/all`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setCategories(data)
      }
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    fetchBrands()
    fetchCategories()
  }, [fetchBrands, fetchCategories])

  // ── field change handlers ────────────────────────────────────────────────
  const handleDealChange = (field: keyof Deal, value: string) => {
    setDealForm((prev) => {
      const updated = { ...prev, [field]: value }

      // 💉 Auto-prefill if brand is selected
      if (field === "brand") {
        const selectedBrand = brands.find((b) => b.name === value)
        if (selectedBrand) {
          // Fill related data if they are currently empty or if it's a new deal
          return {
            ...updated,
            category: selectedBrand.category || updated.category,
            brandLogo: selectedBrand.logo || updated.brandLogo,
            discount: selectedBrand.discount || updated.discount,
            originalPrice: selectedBrand.originalPrice || updated.originalPrice,
            studentPrice: selectedBrand.studentPrice || updated.studentPrice,
            link: selectedBrand.link || updated.link,
          }
        }
      }
      return updated
    })
  }

  const handleBrandChange = (field: keyof Brand, value: unknown) =>
    setBrandForm((prev) => ({ ...prev, [field]: value }))

  const handleCategoryChange = (field: keyof Category, value: string) =>
    setCategoryForm((prev) => ({ ...prev, [field]: value }))

  // ── open-edit handlers ───────────────────────────────────────────────────
  const openNewDeal = () => { setSelectedDeal(null); setIsDealDialogOpen(true) }
  const openEditDeal = (d: Deal) => { setSelectedDeal(d); setIsDealDialogOpen(true) }
  const openNewBrand = () => { setSelectedBrand(null); setIsBrandDialogOpen(true) }
  const openEditBrand = (b: Brand) => { setSelectedBrand(b); setIsBrandDialogOpen(true) }
  const openNewCategory = () => { setSelectedCategory(null); setIsCategoryDialogOpen(true) }
  const openEditCategory = (c: Category) => { setSelectedCategory(c); setIsCategoryDialogOpen(true) }

  // ── submit handlers ───────────────────────────────────────────────────────
  const handleDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const url = selectedDeal
        ? `${API_BASE}/api/deals/${selectedDeal.id}`
        : `${API_BASE}/api/deals`
      const method = selectedDeal ? "PUT" : "POST"
      const body: Record<string, unknown> = { ...dealForm }

      // auto-fill brandLogo from brands list if missing
      if (body.brand) {
        const brandObj = brands.find((b) => b.name === body.brand)
        if (brandObj) {
          if (!body.brandLogo) body.brandLogo = brandObj.logo
          if (!body.brand_id) body.brand_id = brandObj.id
        }
      }

      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")

      toast.success(`Deal ${selectedDeal ? "updated" : "created"} successfully`)
      setIsDealDialogOpen(false)
      setSelectedDeal(null)
      await refreshDeals()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const url = selectedBrand
        ? `${API_BASE}/api/brands/${selectedBrand.id}`
        : `${API_BASE}/api/brands`
      const method = selectedBrand ? "PUT" : "POST"

      // auto-generate slug if missing
      const body = { ...brandForm }
      if (!body.slug && body.name) {
        body.slug = (body.name as string).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      }

      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")

      toast.success(`Brand ${selectedBrand ? "updated" : "created"} successfully`)
      setIsBrandDialogOpen(false)
      setSelectedBrand(null)
      await fetchBrands()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const url = selectedCategory
        ? `${API_BASE}/api/categories/${selectedCategory.id}`
        : `${API_BASE}/api/categories`
      const method = selectedCategory ? "PUT" : "POST"

      const body = { ...categoryForm }
      if (!body.slug && body.name) {
        body.slug = (body.name as string).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      }

      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")

      toast.success(`Category ${selectedCategory ? "updated" : "created"} successfully`)
      setIsCategoryDialogOpen(false)
      setSelectedCategory(null)
      await fetchCategories()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── delete handler ────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    const { type, id } = deleteTarget
    const urlMap = { deal: "deals", brand: "brands", category: "categories" }
    try {
      const res = await fetch(`${API_BASE}/api/${urlMap[type]}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Delete failed")
      }
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`)
      if (type === "deal") refreshDeals()
      if (type === "brand") fetchBrands()
      if (type === "category") fetchCategories()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeleteTarget(null)
    }
  }

  // ── guard ───────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 text-center py-24">
        <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#333] mb-2">Admin Access Required</h2>
        <p className="text-[#666] mb-6">Please sign in with an admin account to manage your platform.</p>
        <Button asChild className="bg-[#5B48D9] hover:bg-[#4A3AC2]">
          <a href="/auth">Sign In</a>
        </Button>
      </div>
    )
  }

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto p-6 text-center py-24">
        <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#333] mb-2">Access Denied</h2>
        <p className="text-[#666]">You do not have administrator privileges to view this page.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl pt-10">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#333] mb-1">Admin Dashboard</h1>
          <p className="text-[#666]">Manage deals, brands, and categories across the platform.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {activeTab === "deals" && (
            <Button onClick={openNewDeal} className="bg-[#5B48D9] hover:bg-[#4A3AC2] shadow-lg shadow-[#5B48D9]/20">
              <Plus className="w-4 h-4 mr-2" />Add New Deal
            </Button>
          )}
          {activeTab === "brands" && (
            <Button onClick={openNewBrand} className="bg-[#5B48D9] hover:bg-[#4A3AC2] shadow-lg shadow-[#5B48D9]/20">
              <Plus className="w-4 h-4 mr-2" />Add New Brand
            </Button>
          )}
          {activeTab === "categories" && (
            <Button onClick={openNewCategory} className="bg-[#5B48D9] hover:bg-[#4A3AC2] shadow-lg shadow-[#5B48D9]/20">
              <Plus className="w-4 h-4 mr-2" />Add New Category
            </Button>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="deals" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100/60 p-1 rounded-2xl w-full sm:w-auto sm:inline-flex gap-1">
          <TabsTrigger value="deals" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#5B48D9] data-[state=active]:shadow-sm gap-2">
            <Tag className="w-4 h-4" />Deals
            <Badge variant="secondary" className="ml-1 text-xs h-5">{deals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="brands" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#5B48D9] data-[state=active]:shadow-sm gap-2">
            <ShoppingBag className="w-4 h-4" />Brands
            <Badge variant="secondary" className="ml-1 text-xs h-5">{brands.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#5B48D9] data-[state=active]:shadow-sm gap-2">
            <LayoutGrid className="w-4 h-4" />Categories
            <Badge variant="secondary" className="ml-1 text-xs h-5">{categories.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* ═══ DEALS TAB ═══ */}
        <TabsContent value="deals" className="animate-in fade-in slide-in-from-left-4 duration-300">
          <Separator className="mb-10 bg-gray-100" />
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <Loader2 className="h-10 w-10 text-[#5B48D9] animate-spin mb-4" />
              <p className="text-[#666] font-medium">Fetching deals...</p>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-24 bg-[#f8faff] border-2 border-dashed border-gray-200 rounded-3xl">
              <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#333] mb-1">No deals yet</h3>
              <p className="text-[#666] mb-4">Add your first student discount deal to get started.</p>
              <Button onClick={openNewDeal} className="bg-[#5B48D9]">Add First Deal</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {deals.map((deal) => (
                <div key={deal.id} className="relative group">
                  <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 bg-white/95 hover:bg-white text-[#5B48D9] shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); openEditDeal(deal) }}
                      title="Edit Deal"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 bg-white/95 hover:bg-red-50 text-red-500 shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "deal", id: deal.id, label: deal.title }) }}
                      title="Delete Deal"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <DealCard deal={deal} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ═══ BRANDS TAB ═══ */}
        <TabsContent value="brands" className="animate-in fade-in slide-in-from-left-4 duration-300">
          <Separator className="mb-10 bg-gray-100" />
          {brands.length === 0 ? (
            <div className="text-center py-24 bg-[#f8faff] border-2 border-dashed border-gray-200 rounded-3xl">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#333] mb-1">No brands yet</h3>
              <p className="text-[#666] mb-4">Add partner brands to create deals for.</p>
              <Button onClick={openNewBrand} className="bg-[#5B48D9]">Add First Brand</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <div key={brand.id} className="relative group">
                  <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 bg-white/95 hover:bg-white text-[#5B48D9] shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); openEditBrand(brand) }}
                      title="Edit Brand"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 bg-white/95 hover:bg-red-50 text-red-500 shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "brand", id: brand.id, label: brand.name }) }}
                      title="Delete Brand"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <BrandCard brand={brand} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ═══ CATEGORIES TAB ═══ */}
        <TabsContent value="categories" className="animate-in fade-in slide-in-from-left-4 duration-300">
          <Separator className="mb-10 bg-gray-100" />
          {categories.length === 0 ? (
            <div className="text-center py-24 bg-[#f8faff] border-2 border-dashed border-gray-200 rounded-3xl">
              <LayoutGrid className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#333] mb-1">No categories yet</h3>
              <p className="text-[#666] mb-4">Create categories to organise your deals and brands.</p>
              <Button onClick={openNewCategory} className="bg-[#5B48D9]">Add First Category</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="relative group">
                  <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 bg-white/95 hover:bg-white text-[#5B48D9] shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); openEditCategory(cat) }}
                      title="Edit Category"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 bg-white/95 hover:bg-red-50 text-red-500 shadow-xl border border-gray-100"
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "category", id: cat.id, label: cat.name }) }}
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CategoryCard category={cat} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ══════════════════════════════════════════════════════════════════════
          DEAL DIALOG
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog open={isDealDialogOpen} onOpenChange={setIsDealDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <div className="p-8 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#333]">
                {selectedDeal ? "Edit Deal" : "New Deal"}
              </DialogTitle>
              <p className="text-[#666] text-sm mt-1">
                {selectedDeal ? "Update an existing student discount." : "Set up a new student discount offer."}
              </p>
            </DialogHeader>
          </div>

          <form id="deal-form" onSubmit={handleDealSubmit} className="px-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Deal Title *</Label>
                <Input
                  required
                  placeholder="e.g. 50% Off Annual Membership"
                  value={dealForm.title || ""}
                  onChange={(e) => handleDealChange("title", e.target.value)}
                  className="h-11 rounded-xl border-gray-200 focus:border-[#5B48D9]"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Brand Partner *</Label>
                <Select value={dealForm.brand || ""} onValueChange={(v) => handleDealChange("brand", v)}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200">
                    <SelectValue placeholder="Select partner brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
                      <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Offer Details</Label>
              <Textarea
                placeholder="Describe what the deal includes..."
                value={dealForm.description || ""}
                onChange={(e) => handleDealChange("description", e.target.value)}
                className="min-h-[100px] rounded-xl border-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Category</Label>
                <Select value={dealForm.category || ""} onValueChange={(v) => handleDealChange("category", v)}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Discount Label</Label>
                <Input
                  placeholder="e.g. 20% OFF"
                  value={dealForm.discount || ""}
                  onChange={(e) => handleDealChange("discount", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Original Price</Label>
                <Input
                  placeholder="e.g. $99.00"
                  value={dealForm.originalPrice || ""}
                  onChange={(e) => handleDealChange("originalPrice", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Student Price</Label>
                <Input
                  placeholder="e.g. $49.50"
                  value={dealForm.studentPrice || ""}
                  onChange={(e) => handleDealChange("studentPrice", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Expiry Date</Label>
                <Input
                  type="date"
                  value={dealForm.validUntil ? dealForm.validUntil.split("T")[0] : ""}
                  onChange={(e) => handleDealChange("validUntil", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Destination URL</Label>
              <Input
                placeholder="https://..."
                value={dealForm.link || ""}
                onChange={(e) => handleDealChange("link", e.target.value)}
                className="h-11 rounded-xl border-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2">
              <div>
                <ImageUpload
                  label="Cover Image"
                  value={dealForm.image || ""}
                  onChange={(url) => handleDealChange("image", url)}
                />
              </div>
              <div>
                <ImageUpload
                  label="Brand Logo (optional)"
                  value={dealForm.brandLogo || ""}
                  onChange={(url) => handleDealChange("brandLogo", url)}
                  compact
                />
              </div>
            </div>
          </form>

          <div className="p-8 pt-4">
            <DialogFooter className="gap-3 sm:justify-end">
              <Button variant="ghost" onClick={() => setIsDealDialogOpen(false)} disabled={isSubmitting}>Discard</Button>
              <Button
                type="submit"
                form="deal-form"
                className="bg-[#5B48D9] hover:bg-[#4A3AC2] shadow-lg shadow-[#5B48D9]/20 font-bold px-8 h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : selectedDeal ? "Update Deal" : "Publish Deal"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════
          BRAND DIALOG
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog open={isBrandDialogOpen} onOpenChange={setIsBrandDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <div className="p-8 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#333]">
                {selectedBrand ? "Edit Brand" : "Register Brand"}
              </DialogTitle>
              <p className="text-[#666] text-sm mt-1">Configure brand details, pricing, and representative imagery.</p>
            </DialogHeader>
          </div>

          <form id="brand-form" onSubmit={handleBrandSubmit} className="px-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Brand Name *</Label>
                <Input
                  required
                  placeholder="e.g. Spotify"
                  value={brandForm.name || ""}
                  onChange={(e) => handleBrandChange("name", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Slug (URL) *</Label>
                <Input
                  placeholder="e.g. spotify  (auto-filled)"
                  value={brandForm.slug || ""}
                  onChange={(e) => handleBrandChange("slug", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Category</Label>
                <Select value={brandForm.category || ""} onValueChange={(v) => handleBrandChange("category", v)}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Parent Company</Label>
                <Input
                  placeholder="e.g. Spotify AB"
                  value={brandForm.parentCompany || ""}
                  onChange={(e) => handleBrandChange("parentCompany", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Slogan / Tagline</Label>
              <Input
                placeholder="One-line pitch for students"
                value={brandForm.tagline || ""}
                onChange={(e) => handleBrandChange("tagline", e.target.value)}
                className="h-11 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Description</Label>
              <Textarea
                placeholder="Detailed brand description shown on brand page..."
                value={brandForm.description || ""}
                onChange={(e) => handleBrandChange("description", e.target.value)}
                className="min-h-[90px] rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Benefits (comma-separated)</Label>
              <Textarea
                placeholder="Free shipping, Unlimited downloads, Ad-free experience"
                value={Array.isArray(brandForm.benefits) ? brandForm.benefits.join(", ") : brandForm.benefits || ""}
                onChange={(e) => handleBrandChange("benefits", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="min-h-[70px] rounded-xl border-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Discount Label</Label>
                <Input
                  placeholder="e.g. 50% OFF"
                  value={brandForm.discount || ""}
                  onChange={(e) => handleBrandChange("discount", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Original Price</Label>
                <Input
                  placeholder="e.g. $12.99/month"
                  value={brandForm.originalPrice || ""}
                  onChange={(e) => handleBrandChange("originalPrice", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Student Price</Label>
                <Input
                  placeholder="e.g. $5.99/month"
                  value={brandForm.studentPrice || ""}
                  onChange={(e) => handleBrandChange("studentPrice", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <ImageUpload
                  label="Brand Logo"
                  value={brandForm.logo || ""}
                  onChange={(url) => handleBrandChange("logo", url)}
                  compact
                />
              </div>
              <div>
                <ImageUpload
                  label="Product / Cover Image"
                  value={brandForm.productImage || ""}
                  onChange={(url) => handleBrandChange("productImage", url)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Brand Deal Link</Label>
                <Input
                  placeholder="https://brand.com/student"
                  value={brandForm.link || ""}
                  onChange={(e) => handleBrandChange("link", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Promo Code (optional)</Label>
                <Input
                  placeholder="e.g. STUDENT20"
                  value={brandForm.promoCode || ""}
                  onChange={(e) => handleBrandChange("promoCode", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Referral Link (optional)</Label>
              <Input
                placeholder="https://..."
                value={brandForm.referralLink || ""}
                onChange={(e) => handleBrandChange("referralLink", e.target.value)}
                className="h-11 rounded-xl border-gray-200"
              />
            </div>

            <div className="flex items-center gap-3 pb-2 pt-1">
              <Switch
                id="brand-featured"
                checked={!!brandForm.featured}
                onCheckedChange={(v) => handleBrandChange("featured", v)}
              />
              <Label htmlFor="brand-featured" className="font-semibold cursor-pointer">
                Featured Brand <span className="text-[#888] font-normal text-sm ml-1">(shown in highlighted sections)</span>
              </Label>
            </div>
          </form>

          <div className="p-8 pt-4">
            <DialogFooter className="gap-3">
              <Button variant="ghost" onClick={() => setIsBrandDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button
                type="submit"
                form="brand-form"
                className="bg-[#5B48D9] hover:bg-[#4A3AC2] font-bold px-8 h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : selectedBrand ? "Update Brand" : "Register Brand"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════
          CATEGORY DIALOG
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <div className="p-8 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#333]">
                {selectedCategory ? "Edit Category" : "New Category"}
              </DialogTitle>
              <p className="text-[#666] text-sm mt-1">
                Categories help organise your deals and brands for easy browsing.
              </p>
            </DialogHeader>
          </div>

          <form id="category-form" onSubmit={handleCategorySubmit} className="px-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-semibold">Category Name *</Label>
                <Input
                  required
                  placeholder="e.g. Technology & Software"
                  value={categoryForm.name || ""}
                  onChange={(e) => handleCategoryChange("name", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Slug *</Label>
                <Input
                  placeholder="e.g. technology-software  (auto-filled)"
                  value={categoryForm.slug || ""}
                  onChange={(e) => handleCategoryChange("slug", e.target.value)}
                  className="h-11 rounded-xl border-gray-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Icon name</Label>
              <Select value={categoryForm.icon || ""} onValueChange={(v) => handleCategoryChange("icon", v)}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="Select icon (Lucide name)" />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((icon) => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Description</Label>
              <Textarea
                placeholder="Brief category description shown on the categories page..."
                value={categoryForm.description || ""}
                onChange={(e) => handleCategoryChange("description", e.target.value)}
                className="rounded-xl border-gray-200"
              />
            </div>

            <div className="pb-2">
              <ImageUpload
                label="Cover Image"
                value={categoryForm.image || ""}
                onChange={(url) => handleCategoryChange("image", url)}
              />
            </div>
          </form>

          <div className="p-8 pt-4">
            <DialogFooter className="gap-3">
              <Button variant="ghost" onClick={() => setIsCategoryDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button
                type="submit"
                form="category-form"
                className="bg-[#5B48D9] hover:bg-[#4A3AC2] font-bold px-8 h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : selectedCategory ? "Update Category" : "Create Category"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════════════════
          DELETE CONFIRMATION
      ══════════════════════════════════════════════════════════════════════ */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-[#333] flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#666]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#333]">&ldquo;{deleteTarget?.label}&rdquo;</span>?
              {deleteTarget?.type === "brand" && (
                <span className="block mt-2 text-red-500 text-sm font-medium">
                  ⚠️ This will also delete all deals linked to this brand.
                </span>
              )}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold px-6"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
