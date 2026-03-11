"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DealCard } from "@/components/deal-card"
import { useAuth } from "@/hooks/use-auth"
import { useDealsContext } from "@/contexts/deals-context"
import { useSavedDeals } from "@/contexts/saved-deals-context"

export default function SavedDealsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [savedDeals, setSavedDeals] = useState<any[]>([]) // Initialize with an empty array
  const { deals } = useDealsContext()
  const { savedIds } = useSavedDeals()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/?auth=required")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // filter full deal list by saved ids
      setSavedDeals(deals.filter((d) => savedIds.includes(d.id)))
    } else {
      setSavedDeals([]) // Reset if no user
    }
  }, [user, deals, savedIds])

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <div className="container px-6 py-4 mx-auto">
        <Button type="button" variant="ghost" className="p-0 mb-4" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <h1 className="mb-6 text-2xl font-bold text-[#333]">Saved Deals</h1>

        {savedDeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {savedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl">
            <p className="mb-4 text-lg text-[#666]">You haven't saved any deals yet</p>
            <Button
              type="button"
              onClick={() => router.push("/")}
              className="text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0]"
            >
              Explore Deals
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
