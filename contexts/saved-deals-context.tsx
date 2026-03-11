"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Deal } from "@/types/types"

interface SavedDealsContextType {
  savedIds: string[]
  toggleSaved: (deal: Deal) => void
  isSaved: (id: string) => boolean
}

const STORAGE_KEY = "uless_saved_deals"

const defaultValue: SavedDealsContextType = {
  savedIds: [],
  toggleSaved: () => {},
  isSaved: () => false,
}

export const SavedDealsContext = createContext<SavedDealsContextType>(defaultValue)

export function SavedDealsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([])

  // load from localStorage on mount
  useEffect(() => {
    try {
      const json = localStorage.getItem(STORAGE_KEY)
      if (json) {
        setSavedIds(JSON.parse(json))
      }
    } catch (e) {
      console.error("failed to read saved deals from storage", e)
    }
  }, [])

  const sync = (ids: string[]) => {
    setSavedIds(ids)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch (e) {
      console.error("failed to write saved deals to storage", e)
    }
  }

  const toggleSaved = (deal: Deal) => {
    setSavedIds((prev) => {
      const exists = prev.includes(deal.id)
      const updated = exists ? prev.filter((i) => i !== deal.id) : [...prev, deal.id]
      sync(updated)
      return updated
    })
  }

  const isSaved = (id: string) => {
    return savedIds.includes(id)
  }

  return (
    <SavedDealsContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
      {children}
    </SavedDealsContext.Provider>
  )
}

export function useSavedDeals() {
  return useContext(SavedDealsContext)
}
