"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Copy, Check, Eye, EyeOff, Info, Gift } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

interface PromoCodeRevealProps {
  promoCode: string
  referralLink?: string
}

export function PromoCodeReveal({ promoCode, referralLink }: PromoCodeRevealProps) {
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const { isAuthenticated, openAuthModal } = useAuth()
  const pathname = usePathname()

  const togglePromoCode = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to view the promo code")
      openAuthModal({ returnUrl: pathname })
      return
    }

    setShowPromoCode(!showPromoCode)
  }

  const copyPromoCode = () => {
    if (!promoCode) return

    navigator.clipboard.writeText(promoCode)
    setCopied(true)
    toast.success("Promo code copied to clipboard!")

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const copyReferralLink = () => {
    if (!referralLink) return

    navigator.clipboard.writeText(referralLink)
    setCopiedLink(true)
    toast.success("Referral link copied to clipboard!")

    setTimeout(() => {
      setCopiedLink(false)
    }, 2000)
  }

  return (
    <div className="mb-8 overflow-hidden border rounded-xl bg-gradient-to-br from-white via-[#f8faff] to-[#f0f4ff] border-[#5B48D9]/20">
      <div className="px-6 py-4 border-b border-[#5B48D9]/10 bg-[#5B48D9]/5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#333] flex items-center">
          <Gift className="w-5 h-5 mr-2 text-[#5B48D9]" />
          Exclusive Student Offer
        </h3>
        <Badge variant="outline" className="bg-white text-[#5B48D9] border-[#5B48D9]/20">
          Student Exclusive
        </Badge>
      </div>

      <div className="p-6">
        <div className="mb-5">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 mr-3 rounded-full bg-[#5B48D9] flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <p className="text-sm font-medium text-[#333]">Use this promo code when signing up</p>
          </div>

          <div className="relative">
            <div className="flex items-center p-5 bg-white border rounded-lg shadow-sm border-[#5B48D9]/20">
              <div className="flex-1">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-xl font-medium tracking-wide text-[#333]">
                      {showPromoCode ? promoCode : "••••••••••••••"}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={togglePromoCode}
                      className="ml-2 text-[#5B48D9] hover:bg-[#5B48D9]/10"
                    >
                      {showPromoCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="ml-1 text-xs">{showPromoCode ? "Hide" : "Show"}</span>
                    </Button>
                  </div>
                ) : (
                  <div className="font-mono text-xl font-medium tracking-wide text-[#333]">••••••••••••••</div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={copyPromoCode}
                disabled={!isAuthenticated || !showPromoCode}
                className={`ml-2 transition-all h-10 px-4 ${
                  copied
                    ? "bg-green-50 text-green-600 border-green-200"
                    : "border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {isAuthenticated && showPromoCode && referralLink && (
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 mr-3 rounded-full bg-[#5B48D9] flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <p className="text-sm font-medium text-[#333]">Or use this referral link</p>
            </div>

            <div className="p-5 text-sm bg-white border rounded-lg shadow-sm border-[#5B48D9]/20">
              <div className="flex items-center justify-between">
                <div className="overflow-hidden font-mono text-sm text-[#333] truncate max-w-[70%]">{referralLink}</div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyReferralLink}
                  className={`ml-2 shrink-0 transition-all h-10 px-4 ${
                    copiedLink
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-5 p-5 bg-gradient-to-r from-[#5B48D9]/10 to-[#5B48D9]/5 rounded-lg border border-[#5B48D9]/20">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5B48D9]/20 flex items-center justify-center mr-4">
                <Info className="w-5 h-5 text-[#5B48D9]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#333] mb-1">Student Verification Required</h4>
                <p className="text-sm text-[#555] mb-3">
                  Sign in with your student account to reveal your exclusive promo code and get special offers.
                </p>
                <Button
                  type="button"
                  className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white shadow-sm"
                  onClick={() => openAuthModal({ returnUrl: pathname })}
                >
                  Sign in to Reveal Code
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-[#5B48D9]/10">
          <p className="text-xs text-[#666] italic">
            *This exclusive promo code gives you additional benefits when used during signup.
          </p>
        </div>
      </div>
    </div>
  )
}
