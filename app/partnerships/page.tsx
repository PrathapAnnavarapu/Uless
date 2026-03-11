import type { Metadata } from "next"
import Image from "next/image"
import { Mail, CheckCircle, TrendingUp, Users, Award, BarChart, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Partnerships | Uless - Student Discounts and Deals",
  description: "Partner with Uless to reach students with your brand's exclusive discounts and offers.",
}

export default function PartnershipsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold">Partner With Uless</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your brand with students through exclusive partnerships
          </p>
        </div>

        <div className="relative h-[500px] rounded-xl overflow-hidden mb-16">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
            alt="Business partnership meeting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B48D9]/90 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Reach the Student Market</h2>
              <p className="text-lg mb-6">
                Partner with Uless to connect with verified students actively looking for discounts and deals in the
                USA.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">3.5K+</div>
                  <div className="text-sm">Users Reached</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">USA</div>
                  <div className="text-sm">Market Focus</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm">Engagement Rate</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">Growing</div>
                  <div className="text-sm">Partner Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Why Partner With Us?</h2>
            <ul className="space-y-6">
              <li className="flex">
                <CheckCircle className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Access to Student Market</h3>
                  <p className="text-gray-600">Reach verified students actively looking for discounts and deals.</p>
                </div>
              </li>
              <li className="flex">
                <TrendingUp className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Increased Brand Visibility</h3>
                  <p className="text-gray-600">
                    Featured placement on our platform with dedicated brand pages and promotions.
                  </p>
                </div>
              </li>
              <li className="flex">
                <Users className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Build Brand Loyalty</h3>
                  <p className="text-gray-600">
                    Create lasting relationships with students who become lifelong customers.
                  </p>
                </div>
              </li>
              <li className="flex">
                <Award className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Premium Partnerships</h3>
                  <p className="text-gray-600">
                    Custom partnership options tailored to your brand's specific goals and needs.
                  </p>
                </div>
              </li>
              <li className="flex">
                <BarChart className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Performance Analytics</h3>
                  <p className="text-gray-600">
                    Detailed insights and analytics on how students engage with your offers.
                  </p>
                </div>
              </li>
              <li className="flex">
                <Globe className="w-6 h-6 mr-3 text-[#5B48D9] flex-shrink-0" />
                <div>
                  <h3 className="font-medium">US Market Focus</h3>
                  <p className="text-gray-600">
                    Connect with students across the United States and expand your domestic presence.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop"
                alt="Students using laptops"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                alt="University campus"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden h-[200px] col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Students collaborating"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Our Partnerships Team</CardTitle>
            <CardDescription>We're excited to explore partnership opportunities with your brand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center p-4 mb-6 bg-[#5B48D9]/10 rounded-lg">
              <Mail className="w-6 h-6 mr-3 text-[#5B48D9]" />
              <div>
                <h3 className="font-medium">Email Partnerships</h3>
                <p className="text-gray-600">
                  <a href="mailto:partnerships@uless.co" className="text-[#5B48D9] hover:underline">
                    partnerships@uless.co
                  </a>
                </p>
              </div>
            </div>
            <p className="mb-4">When reaching out about partnership opportunities, please include:</p>
            <ul className="pl-5 mb-6 space-y-2 list-disc">
              <li>Your company name and website</li>
              <li>Brief description of your brand and products/services</li>
              <li>Type of partnership you're interested in</li>
              <li>Any specific student discount or offer you have in mind</li>
              <li>Your contact information</li>
            </ul>
            <div className="flex justify-center mt-6">
              <Button asChild className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                <a href="mailto:partnerships@uless.co">Contact Partnerships Team</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="p-6 bg-[#5B48D9]/5 rounded-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Partnership Opportunities</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Featured Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Promote your exclusive student offers in our featured deals section for maximum visibility.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Brand Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get a dedicated brand page and promotional content highlighting your student offers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Custom Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create targeted marketing campaigns to reach specific student demographics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
