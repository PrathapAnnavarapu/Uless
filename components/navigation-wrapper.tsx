"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle scroll to top on navigation
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return <>{children}</>
}
