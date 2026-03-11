import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap | Uless",
  description: "Complete sitemap of the Uless platform",
}

export default function SitemapPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#333]">Sitemap</h1>
          <p className="text-xl text-[#666]">A complete guide to all pages on the Uless platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">Main Pages</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">Deals & Categories</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/deals" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  All Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/technology-software"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Technology & Software
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/clothing-accessories"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Clothing & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/music-entertainment"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Music & Entertainment
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/subscriptions-services"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Subscriptions & Services
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/food-dining"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Food & Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/travel-transportation"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Travel & Transportation
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/health-wellness"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Health & Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">Brands</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/brands" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  All Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/spotify"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Spotify
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/amazon-prime"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Amazon Prime
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/adobe"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Adobe
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/apple"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Apple
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/microsoft"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Microsoft
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/github"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/walmart-plus"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Walmart+
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/grubhub"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  GrubHub
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/best-buy"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Best Buy
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/levis"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Levi's
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/youtube-premium"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  YouTube Premium
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">User Account</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/auth" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Login / Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/edit"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-deals"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Saved Deals
                </Link>
              </li>
              <li>
                <Link href="/settings" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/change-password"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  href="/forgot-password"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Forgot Password
                </Link>
              </li>
              <li>
                <Link
                  href="/student-verification"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Student Verification
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">Search & Discover</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/search" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Search
                </Link>
              </li>
              <li>
                <Link href="/deals" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Browse All Deals
                </Link>
              </li>
              <li>
                <Link href="/brands" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Browse All Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Browse All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/featured-deals"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Featured Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/trending-deals"
                  className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Trending Deals
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5B48D9] border-b-2 border-[#5B48D9] pb-2">Legal Pages</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <Link href="/terms" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="flex items-center text-[#333] hover:text-[#5B48D9] transition-colors">
                  <ArrowRight className="w-5 h-5 mr-2 text-[#5B48D9]" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white text-lg px-8 py-6">Return to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
