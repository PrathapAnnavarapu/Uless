"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Simple route-loading indicator that listens for link clicks and resets
 * itself when the pathname changes. This avoids the `useNavigation`
 * helper which may not be exported in all Next versions.
 */
export function RouteLoading() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  // whenever path updates we assume navigation completed
  useEffect(() => {
    setLoading(false)
  }, [pathname])

  // listen for internal link clicks to trigger loading state
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (
        anchor &&
        anchor.href &&
        anchor.target !== "_blank" &&
        anchor.origin === window.location.origin
      ) {
        setLoading(true)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-[#5B48D9] z-50 transition-[width] duration-300 ease-out ${
        loading ? "w-full" : "w-0"
      }`}
    />
  )
}
