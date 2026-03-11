import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CookiePreferencesManager } from "@/components/cookie-preferences-manager"

export const metadata: Metadata = {
  title: "Cookie Preferences | Uless",
  description: "Manage your cookie preferences for the Uless platform",
}

export default function CookiePreferencesPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#333]">Cookie Preferences</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage how Uless uses cookies to improve your experience. You can change these settings at any time.
          </p>
        </div>

        <div className="bg-[#f8faff] p-8 rounded-xl mb-10">
          <CookiePreferencesManager />
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">About Our Cookies</h2>
            <p className="text-xl mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used
              to make websites work more efficiently and provide information to the website owners.
            </p>
            <p className="text-xl">
              For more detailed information about the cookies we use, please visit our{" "}
              <Link href="/cookies" className="text-[#5B48D9] hover:underline">
                Cookies Policy
              </Link>
              .
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white text-lg px-8 py-6">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
