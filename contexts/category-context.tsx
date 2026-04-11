"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API_BASE } from "@/lib/backend"
import type { Category } from "@/types/types"

interface CategoryContextType {
  categories: Category[]
  loading: boolean
  refreshCategories: () => Promise<void>
}

const defaultValue: CategoryContextType = {
  categories: [],
  loading: false,
  refreshCategories: async () => {},
}

export const CategoryContext = createContext<CategoryContextType>(defaultValue)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/categories/all`, { cache: "no-store" })
      if (!res.ok) {
        const text = await res.text()
        console.error("Categories fetch failed with status:", res.status, text.substring(0, 100))
        throw new Error(`Failed to fetch categories: ${res.status}`)
      }
      
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json()
        setCategories(data)
      } else {
        const text = await res.text()
        console.error("Categories API returned non-JSON response:", text.substring(0, 100))
        throw new Error("Expected JSON from Categories API")
      }
    } catch (err) {
      console.error("Error fetching categories", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const value: CategoryContextType = {
    categories,
    loading,
    refreshCategories: fetchCategories,
  }

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

export function useCategoryContext() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider")
  }
  return context
}
