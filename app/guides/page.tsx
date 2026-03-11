import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen, CheckCircle, ArrowRight, Play } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Guides | Uless - Step-by-Step Student Discount Tutorials",
  description: "Comprehensive guides to help you get the most out of Uless student discounts and deals",
}

const guides = [
  {
    id: "getting-started",
    title: "Getting Started with Uless",
    description: "Learn the basics of using Uless to find and redeem student discounts",
    duration: "5 min read",
    difficulty: "Beginner",
    steps: 4,
    category: "Basics",
    featured: true,
  },
  {
    id: "student-verification",
    title: "How to Verify Your Student Status",
    description: "Complete guide to verifying your student status for exclusive deals",
    duration: "3 min read",
    difficulty: "Beginner",
    steps: 3,
    category: "Verification",
    featured: true,
  },
  {
    id: "redeeming-deals",
    title: "How to Redeem Student Deals",
    description: "Step-by-step process for redeeming discounts and promo codes",
    duration: "4 min read",
    difficulty: "Beginner",
    steps: 5,
    category: "Deals",
    featured: true,
  },
  {
    id: "saving-deals",
    title: "Saving and Organizing Your Favorite Deals",
    description: "Learn how to save deals for later and organize them by category",
    duration: "3 min read",
    difficulty: "Beginner",
    steps: 3,
    category: "Organization",
    featured: false,
  },
  {
    id: "account-settings",
    title: "Managing Your Account Settings",
    description: "Customize your profile, notifications, and privacy settings",
    duration: "6 min read",
    difficulty: "Intermediate",
    steps: 6,
    category: "Account",
    featured: false,
  },
  {
    id: "finding-deals",
    title: "Advanced Deal Discovery Tips",
    description: "Pro tips for finding the best student discounts and hidden deals",
    duration: "8 min read",
    difficulty: "Intermediate",
    steps: 7,
    category: "Advanced",
    featured: false,
  },
  {
    id: "mobile-app",
    title: "Using Uless on Mobile",
    description: "Get the most out of the Uless mobile experience",
    duration: "4 min read",
    difficulty: "Beginner",
    steps: 4,
    category: "Mobile",
    featured: false,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting Common Issues",
    description: "Solutions for login problems, verification issues, and more",
    duration: "10 min read",
    difficulty: "Intermediate",
    steps: 8,
    category: "Support",
    featured: false,
  },
]

const categories = [
  "All",
  "Basics",
  "Verification",
  "Deals",
  "Organization",
  "Account",
  "Advanced",
  "Mobile",
  "Support",
]

export default function GuidesPage() {
  const featuredGuides = guides.filter((guide) => guide.featured)
  const allGuides = guides

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Guides</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Step-by-step tutorials to help you master Uless and save more on student discounts
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{guides.length} guides</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>For all skill levels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Guides</h2>
            <Badge variant="secondary">Most Popular</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="outline">{guide.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {guide.duration}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-[#5B48D9] transition-colors">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {guide.steps} steps
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <Link href={`/guides/${guide.id}`}>
                      <Button size="sm" className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                        <Play className="mr-1 h-3 w-3" />
                        Start Guide
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="w-full py-12 md:py-16 bg-[#f8faff]">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">All Guides</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-[#5B48D9] hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {allGuides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="mb-2">
                      {guide.category}
                    </Badge>
                    {guide.featured && <Badge className="bg-[#5B48D9] hover:bg-[#4a3ac0]">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#5B48D9] transition-colors">{guide.title}</CardTitle>
                  <CardDescription className="text-sm">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {guide.steps} steps
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <Link href={`/guides/${guide.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#5B48D9] hover:text-[#4a3ac0]">
                        Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">Need More Help?</h2>
            <p className="mt-2 text-gray-500">Can't find what you're looking for? Our support team is here to help.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/help">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">Visit Help Center</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
