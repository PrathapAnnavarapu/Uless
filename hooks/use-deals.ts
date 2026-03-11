"use client"

import { useContext } from "react"
import { DealsContext } from "@/contexts/deals-context"

export function useDeals() {
  const { deals } = useContext(DealsContext)
  return deals
}
