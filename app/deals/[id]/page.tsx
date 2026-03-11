"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { ArrowLeft, Heart, Share2, ExternalLink } from "lucide-react"
import { VerificationRequired } from "@/components/verification-required"
import { useAuth } from "@/contexts/auth-context"
import { useDeals } from "@/hooks/use-deals"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const { isAuthenticated, openAuthModal, profile } = useAuth()

  // find the deal from the global context (fetched from backend)
  const allDeals = useDeals()
  const deal = allDeals.find((d) => d.id === params.id) || allDeals[0] || {
    title: "Unknown",
    description: "",
    image: "",
    category: "",
    brand: "",
    discount: "",
    validUntil: "",
    link: "",
  }

  // build minimal product schema
  const productSchema = {
    name: deal.title,
    description: deal.description,
    brand: { "@type": "Brand", name: deal.brand },
    offers: {
      "@type": "Offer",
      price: deal.studentPrice || deal.originalPrice || "",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Uless" },
      discount: deal.discount,
    },
  }

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save deals")
      router.push("/auth")
      return
    }

    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved deals" : "Added to saved deals")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: deal.title,
          text: `Check out this deal: ${deal.title}`,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success("Link copied to clipboard")
        })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleRedeem = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in with your student email to access this deal")
      router.push("/auth")
      return
    }

    if (!profile?.isVerified) {
      toast.error("This deal requires a verified student email (.edu)")
      router.push("/student-verification")
      return
    }

    window.open(deal.link || "https://example.com", "_blank")
    toast.success("Redirecting to deal")
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <SchemaMarkup type="Product" data={productSchema} />
      <div className="container px-6 py-4 mx-auto">
        <Button type="button" variant="ghost" className="p-0 mb-4" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="overflow-hidden bg-white rounded-2xl shadow-sm">
          <div className="relative w-full h-64">
            <Image
              src={deal.image || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(deal.title)}`}
              alt={deal.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-[#f8faff] text-[#5B48D9] border-[#5B48D9]">
                {deal.category}
              </Badge>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className={isSaved ? "text-[#ff4b4b]" : "text-[#666]"}
                >
                  <Heart className="w-5 h-5" fill={isSaved ? "#ff4b4b" : "none"} />
                </Button>

                <Button type="button" variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="w-5 h-5 text-[#666]" />
                </Button>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold text-[#333]">{deal.title}</h1>
            <p className="mb-4 text-[#666]">{deal.description}</p>

            <div className="p-4 mb-6 rounded-xl bg-[#f8faff]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#666]">Discount</span>
                <span className="text-lg font-bold text-[#5B48D9]">{deal.discount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#666]">Valid Until</span>
                <span className="text-sm font-medium text-[#333]">{deal.validUntil}</span>
              </div>
            </div>

            <VerificationRequired>
              <Button
                type="button"
                className="mx-auto px-8 h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0]"
                onClick={handleRedeem}
              >
                Redeem Deal
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </VerificationRequired>
          </div>
        </div>
      </div>
    </main>
  )
}
