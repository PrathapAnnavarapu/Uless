"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API_BASE } from "@/lib/backend"
import type { Brand } from "@/types/types"


interface BrandsContextType {
  brands: Brand[]
  loading: boolean
  refreshBrands: () => Promise<void>
}

const defaultValue: BrandsContextType = {
  brands: [],
  loading: false,
  refreshBrands: async () => {},
}

export const BrandsContext = createContext<BrandsContextType>(defaultValue)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  

  const fetchBrands = async () => {
  setLoading(true)
  try {
    const res = await fetch(`${API_BASE}/api/brands/all`)
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    setBrands(data)  
  } catch (err) {
    console.error("Error fetching brands:", err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchBrands()
  }, [])

  const value: BrandsContextType = {
    brands,
    loading,
    refreshBrands: fetchBrands,
  }

  return <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
}

export function useBrandsContext() {
  const context = useContext(BrandsContext)
  if (!context) {
    throw new Error("useBrandsContext must be used within a BrandsProvider")
  }
  return context
}