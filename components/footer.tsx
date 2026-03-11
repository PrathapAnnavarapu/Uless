import { LinkWithScroll } from "@/components/link-with-scroll"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold uless-brand">Uless</span>
            </div>
            <p className="mb-6 text-gray-400">
              Exclusive discounts and deals for students. Save on everything from tech to entertainment, fashion to
              travel.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#5B48D9]/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#5B48D9]/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#5B48D9]/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#5B48D9]/20">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <LinkWithScroll href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Home
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/deals"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  All Deals
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Brands
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/categories"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Categories
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/categories/technology-software"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Technology Deals
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/categories/clothing-accessories"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Fashion Deals
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/categories/music-entertainment"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Entertainment Deals
                </LinkWithScroll>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Support</h3>
            <ul className="space-y-3">
              <li>
                <LinkWithScroll
                  href="/help"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Help Center
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/faq"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  FAQ
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/contact"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Contact Us
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/student-verification"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Student Verification
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/terms"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Terms of Service
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/privacy"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Privacy Policy
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/about"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  About Us
                </LinkWithScroll>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Popular Brands</h3>
            <ul className="space-y-3">
              <li>
                <LinkWithScroll
                  href="/brands/amazon-prime"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Amazon Prime
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands/under-armour"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Under Armour
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands/walmart-plus"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Walmart+
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands/github"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  GitHub
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands/apple"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Apple
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands/microsoft"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  Microsoft
                </LinkWithScroll>
              </li>
              <li>
                <LinkWithScroll
                  href="/brands"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#5B48D9]" />
                  View All Brands
                </LinkWithScroll>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-[#333]">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} <span className="uless-brand">Uless</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <LinkWithScroll href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms
              </LinkWithScroll>
              <LinkWithScroll href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy
              </LinkWithScroll>
              <LinkWithScroll href="/cookies" className="text-sm text-gray-400 hover:text-white">
                Cookies
              </LinkWithScroll>
              <LinkWithScroll href="/sitemap" className="text-sm text-gray-400 hover:text-white">
                Sitemap
              </LinkWithScroll>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
