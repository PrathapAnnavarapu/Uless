"use client"

import { useContext } from "react"
import { BrandsContext } from "@/contexts/brand-context"

export function useBrands() {
  const { brands } = useContext(BrandsContext)
  return brands
}
