"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API_BASE } from "@/lib/backend"
import type { Deal } from "@/types/types"

interface SavedDealsContextType {
  savedDeals: Deal[]
  savedIds: string[]
  loading: boolean
  refreshSavedDeals: () => Promise<void>
  toggleSaved: (deal: Deal) => Promise<void>
  isSaved: (id: string) => boolean
}

const defaultValue: SavedDealsContextType = {
  savedDeals: [],
  savedIds: [],
  loading: false,
  refreshSavedDeals: async () => {},
  toggleSaved: async () => {},
  isSaved: () => false,
}

export const SavedDealsContext = createContext<SavedDealsContextType>(defaultValue)

export function SavedDealsProvider({ children }: { children: ReactNode }) {
  const [savedDeals, setSavedDeals] = useState<Deal[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // ✅ Fetch saved deals (same pattern as brands)
  const fetchSavedDeals = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/saved-deals`)
      if (!res.ok) throw new Error("Failed to fetch saved deals")

      const data: Deal[] = await res.json()
      setSavedDeals(data)
      setSavedIds(data.map((deal) => deal.id))
    } catch (err) {
      console.error("Error fetching saved deals:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSavedDeals()
  }, [])

  // ✅ Toggle save / unsave
  const toggleSaved = async (deal: Deal) => {
    const exists = savedIds.includes(deal.id)

    try {
      if (exists) {
        // DELETE
        const res = await fetch(`${API_BASE}/api/saved-deals/${deal.id}`, {
          method: "DELETE",
        })

        if (!res.ok) throw new Error("Failed to remove deal")

        // update state
        setSavedDeals((prev) => prev.filter((d) => d.id !== deal.id))
        setSavedIds((prev) => prev.filter((id) => id !== deal.id))
      } else {
        // POST
        const res = await fetch(`${API_BASE}/api/saved-deals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deal),
        })

        if (!res.ok) throw new Error("Failed to save deal")

        // update state
        setSavedDeals((prev) => [...prev, deal])
        setSavedIds((prev) => [...prev, deal.id])
      }
    } catch (err) {
      console.error("Error toggling saved deal:", err)
    }
  }
  

  const isSaved = (id: string) => savedIds.includes(id)

  const value: SavedDealsContextType = {
    savedDeals,
    savedIds,
    loading,
    refreshSavedDeals: fetchSavedDeals,
    toggleSaved,
    isSaved,
  }

  return (
    <SavedDealsContext.Provider value={value}>
      {children}
    </SavedDealsContext.Provider>
  )
}

export function useSavedDeals() {
  const context = useContext(SavedDealsContext)
  if (!context) {
    throw new Error("useSavedDeals must be used within a SavedDealsProvider")
  }
  return context
}