import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, MessageSquare, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Support | Uless - Student Discounts and Deals",
  description: "Get help and support for your Uless account and student discount questions.",
}

export default function SupportPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you with any questions or issues you might have.
          </p>
        </div>

        <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            alt="Uless support team helping students"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B48D9]/80 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Dedicated Support for Students</h2>
              <p className="text-lg">
                Our global team of support specialists is available to help you navigate student discounts and resolve
                any issues.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>24-48 hour response time</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Personalized assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Support</CardTitle>
            <CardDescription>
              Our support team is available to assist you with any questions or concerns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center p-4 mb-4 bg-[#5B48D9]/10 rounded-lg">
              <Mail className="w-6 h-6 mr-3 text-[#5B48D9]" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-gray-600">
                  <a href="mailto:support@uless.co" className="text-[#5B48D9] hover:underline">
                    support@uless.co
                  </a>
                </p>
              </div>
            </div>
            <p className="mb-4">When contacting support, please include:</p>
            <ul className="pl-5 mb-6 space-y-2 list-disc">
              <li>Your full name</li>
              <li>Email address associated with your account</li>
              <li>Detailed description of your issue or question</li>
              <li>Screenshots of any error messages (if applicable)</li>
            </ul>
            <p className="mb-4">Our support team typically responds within 24-48 hours during business days.</p>
            <div className="flex justify-center mt-6">
              <Button asChild className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                <a href="mailto:support@uless.co">Contact Support Now</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="relative rounded-xl overflow-hidden h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
              alt="Student using laptop with Uless website"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Our Impact</h3>
                <p className="text-white/90">Helping over 500,000 students save money every month</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students collaborating"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Global Reach</h3>
                <p className="text-white/90">Supporting students in over 30 countries worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our FAQ section covers a wide range of topics including:</p>
              <ul className="pl-5 mb-4 space-y-2 list-disc">
                <li>Account management</li>
                <li>Student verification process</li>
                <li>Deal redemption issues</li>
                <li>Technical troubleshooting</li>
              </ul>
              <div className="flex justify-center mt-4">
                <Button asChild variant="outline">
                  <Link href="/faq">View FAQ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Help Center</CardTitle>
              <CardDescription>Detailed guides and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our help center provides in-depth guides on:</p>
              <ul className="pl-5 mb-4 space-y-2 list-disc">
                <li>How to redeem student discounts</li>
                <li>Verifying your student status</li>
                <li>Finding the best deals</li>
                <li>Managing your account preferences</li>
              </ul>
              <div className="flex justify-center mt-4">
                <Button asChild variant="outline">
                  <Link href="/help">Browse Help Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">For general inquiries or feedback:</p>
              <ul className="pl-5 mb-4 space-y-2 list-disc">
                <li>Business opportunities</li>
                <li>Media inquiries</li>
                <li>Feedback and suggestions</li>
                <li>General questions</li>
              </ul>
              <div className="flex justify-center mt-4">
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
