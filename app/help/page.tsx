import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, HelpCircle, FileText, MessageSquare, Phone, Mail, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Center | Uless",
  description: "Get help with your student discounts and deals",
}

export default function HelpPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Center</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Find answers to your questions and get the support you need
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search for help..."
                    className="w-full bg-white shadow-sm appearance-none pl-8 h-10 rounded-md border border-gray-200 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5B48D9]"
                  />
                </div>
                <Button type="submit" className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Help Topics</h2>
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-8">
              <TabsContent value="popular" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>How to verify your student status</CardTitle>
                      <CardDescription>
                        Learn how to verify your student status to access exclusive deals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#student-verification">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>How to redeem a deal</CardTitle>
                      <CardDescription>Step-by-step guide to redeeming student deals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#redeeming-deals">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account settings</CardTitle>
                      <CardDescription>Manage your profile, password, and notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#account-settings">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Saving deals for later</CardTitle>
                      <CardDescription>How to save and organize your favorite deals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#saving-deals">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Deal expiration</CardTitle>
                      <CardDescription>Understanding deal validity and expiration dates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#deal-expiration">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Troubleshooting login issues</CardTitle>
                      <CardDescription>Solutions for common login and account access problems</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#login-issues">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="account" className="space-y-4">
                {/* Account related help cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Creating an account</CardTitle>
                      <CardDescription>How to sign up and create your Uless account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#creating-account">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Updating profile information</CardTitle>
                      <CardDescription>How to edit your profile details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#updating-profile">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Password reset</CardTitle>
                      <CardDescription>How to reset your password if you've forgotten it</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#password-reset">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="deals" className="space-y-4">
                {/* Deals related help cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Finding the best deals</CardTitle>
                      <CardDescription>Tips for discovering the most valuable student discounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#finding-deals">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Using promo codes</CardTitle>
                      <CardDescription>How to apply promo codes when shopping online</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#using-promo-codes">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Deal notifications</CardTitle>
                      <CardDescription>Setting up alerts for new deals in your favorite categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#deal-notifications">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="verification" className="space-y-4">
                {/* Verification related help cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification methods</CardTitle>
                      <CardDescription>Different ways to verify your student status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#verification-methods">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification troubleshooting</CardTitle>
                      <CardDescription>Solutions for common verification issues</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#verification-troubleshooting">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification renewal</CardTitle>
                      <CardDescription>How and when to renew your student verification</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/faq#verification-renewal">
                        <Button variant="link" className="p-0 text-[#5B48D9]">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-[#f8faff]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="mb-4 rounded-full bg-[#5B48D9]/10 p-3">
                <FileText className="h-6 w-6 text-[#5B48D9]" />
              </div>
              <h3 className="text-xl font-bold">FAQ</h3>
              <p className="mt-2 text-gray-500">Browse our frequently asked questions</p>
              <Link href="/faq" className="mt-4">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">View FAQ</Button>
              </Link>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="mb-4 rounded-full bg-[#5B48D9]/10 p-3">
                <MessageSquare className="h-6 w-6 text-[#5B48D9]" />
              </div>
              <h3 className="text-xl font-bold">Contact Us</h3>
              <p className="mt-2 text-gray-500">Get in touch with our support team</p>
              <Link href="/contact" className="mt-4">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">Contact Support</Button>
              </Link>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="mb-4 rounded-full bg-[#5B48D9]/10 p-3">
                <HelpCircle className="h-6 w-6 text-[#5B48D9]" />
              </div>
              <h3 className="text-xl font-bold">Help Guides</h3>
              <p className="mt-2 text-gray-500">Step-by-step guides to using Uless</p>
              <Link href="/guides" className="mt-4">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">View Guides</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">Still need help?</h2>
            <p className="mt-2 text-gray-500">
              Our support team is available to assist you with any questions or issues.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </Link>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
