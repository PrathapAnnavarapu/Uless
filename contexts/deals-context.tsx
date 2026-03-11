"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Deal } from "@/types/types"
import { API_BASE } from "@/lib/backend"

interface DealsContextType {
  deals: Deal[]
  loading: boolean
  refreshDeals: () => Promise<void>
}

const defaultValue: DealsContextType = {
  deals: [],
  loading: false,
  refreshDeals: async () => {},
}

export const DealsContext = createContext<DealsContextType>(defaultValue)

export function DealsProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/deals/all`)
      const data = await res.json()
      setDeals(data)
    } catch (err) {
      console.error("Error fetching deals", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  const value: DealsContextType = {
    deals,
    loading,
    refreshDeals: fetchDeals,
  }

  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>
}

export function useDealsContext() {
  return useContext(DealsContext)
}
