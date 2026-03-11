"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// The unified admin panel (deals, brands, categories) lives at /deals/admin
export default function BrandsAdminRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/deals/admin")
  }, [router])
  return null
}
