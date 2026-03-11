"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { scrollToTopImmediate } from "@/utils/scroll-utils"

export function NavigationScrollTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Scroll to top on route changes
    scrollToTopImmediate()
  }, [pathname, searchParams])

  return <>{children}</>
}
