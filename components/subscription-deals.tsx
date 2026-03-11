"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DealCard } from "@/components/deal-card"
import { useDeals } from "@/hooks/use-deals"

export function SubscriptionDeals() {
  const router = useRouter()

  const deals = useDeals()
  // Filter deals to only show subscription services
  const subscriptionDeals = deals.filter((deal) => deal.category === "Subscriptions & Services").slice(0, 4)

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#333]">Membership & Subscription Deals</h2>
        <p className="max-w-2xl mb-8 text-[#666]">
          Save on premium memberships and subscriptions with exclusive student discounts. From wholesale clubs to
          streaming services, find the best value for your budget.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {subscriptionDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => router.push("/categories/subscriptions-services")}
          className="border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
        >
          View All Subscription Deals
        </Button>
      </div>
    </div>
  )
}
