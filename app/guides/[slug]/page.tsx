import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, ArrowLeft, ArrowRight, BookOpen, Star } from "lucide-react"

interface GuideStep {
  title: string
  content: string
  image?: string
  tips?: string[]
}

interface Guide {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  steps: GuideStep[]
  nextGuide?: string
  relatedGuides?: string[]
}

const guides: Record<string, Guide> = {
  "getting-started": {
    id: "getting-started",
    title: "Getting Started with Uless",
    description: "Learn the basics of using Uless to find and redeem student discounts",
    duration: "5 min read",
    difficulty: "Beginner",
    category: "Basics",
    nextGuide: "student-verification",
    relatedGuides: ["student-verification", "redeeming-deals"],
    steps: [
      {
        title: "Create Your Account",
        content:
          "Start by signing up for a free Uless account. You'll need a valid email address and will be prompted to verify your student status.",
        tips: [
          "Use your .edu email address for faster verification",
          "Keep your student ID handy for the verification process",
          "Make sure to use your real name as it appears on your student documents",
        ],
      },
      {
        title: "Complete Your Profile",
        content:
          "Fill out your profile information including your school, graduation year, and areas of interest. This helps us show you the most relevant deals.",
        tips: [
          "Add your school to see school-specific deals",
          "Select your interests to get personalized recommendations",
          "Upload a profile picture to personalize your experience",
        ],
      },
      {
        title: "Verify Your Student Status",
        content:
          "Complete the student verification process to unlock exclusive deals. This typically involves uploading a photo of your student ID or enrollment letter.",
        tips: [
          "Ensure your documents are clear and readable",
          "Verification usually takes 24-48 hours",
          "You'll receive an email confirmation once verified",
        ],
      },
      {
        title: "Start Saving",
        content:
          "Browse through thousands of student deals, save your favorites, and start redeeming discounts on everything from food to software.",
        tips: [
          "Use the search function to find specific brands",
          "Save deals to your favorites for easy access",
          "Check back regularly for new deals and limited-time offers",
        ],
      },
    ],
  },
  "student-verification": {
    id: "student-verification",
    title: "How to Verify Your Student Status",
    description: "Complete guide to verifying your student status for exclusive deals",
    duration: "3 min read",
    difficulty: "Beginner",
    category: "Verification",
    nextGuide: "redeeming-deals",
    relatedGuides: ["getting-started", "account-settings"],
    steps: [
      {
        title: "Prepare Your Documents",
        content:
          "Gather the required documents for verification. You'll need either a current student ID, enrollment letter, or transcript showing your current enrollment status.",
        tips: [
          "Student ID should be current and clearly show your name and school",
          "Enrollment letters should be dated within the last 6 months",
          "Transcripts should show current semester enrollment",
        ],
      },
      {
        title: "Upload Your Verification",
        content:
          "Navigate to your profile settings and click on 'Verify Student Status'. Upload a clear photo or scan of your chosen document.",
        tips: [
          "Ensure the image is well-lit and all text is readable",
          "Accepted formats: JPG, PNG, PDF",
          "File size should be under 10MB",
        ],
      },
      {
        title: "Wait for Approval",
        content:
          "Our verification team will review your submission within 24-48 hours. You'll receive an email notification once your status is approved.",
        tips: [
          "Check your spam folder for verification emails",
          "Verification is typically faster during business hours",
          "Contact support if you don't hear back within 48 hours",
        ],
      },
    ],
  },
  "redeeming-deals": {
    id: "redeeming-deals",
    title: "How to Redeem Student Deals",
    description: "Step-by-step process for redeeming discounts and promo codes",
    duration: "4 min read",
    difficulty: "Beginner",
    category: "Deals",
    nextGuide: "saving-deals",
    relatedGuides: ["student-verification", "finding-deals"],
    steps: [
      {
        title: "Find Your Deal",
        content:
          "Browse through our deals or use the search function to find discounts for specific brands or categories you're interested in.",
        tips: [
          "Use filters to narrow down deals by category",
          "Check the 'Featured' section for the best current offers",
          "Look for limited-time deals marked with countdown timers",
        ],
      },
      {
        title: "Check Requirements",
        content:
          "Make sure you meet all the requirements for the deal, including student verification status and any specific terms and conditions.",
        tips: [
          "Some deals require active student verification",
          "Check expiration dates before proceeding",
          "Read the fine print for any restrictions",
        ],
      },
      {
        title: "Get Your Code",
        content:
          "Click 'Get Deal' or 'Reveal Code' to access your discount. Some deals will redirect you directly to the retailer's website.",
        tips: [
          "Copy promo codes immediately after revealing them",
          "Some codes are single-use only",
          "Codes typically expire within a few hours of being revealed",
        ],
      },
      {
        title: "Apply at Checkout",
        content:
          "Complete your purchase on the retailer's website and apply your promo code at checkout to receive your student discount.",
        tips: [
          "Apply codes before completing payment",
          "Double-check that the discount was applied correctly",
          "Contact the retailer's support if codes don't work",
        ],
      },
      {
        title: "Enjoy Your Savings",
        content:
          "Complete your purchase and enjoy your student discount! Don't forget to rate the deal to help other students.",
        tips: [
          "Save your receipt for warranty purposes",
          "Rate deals to help improve recommendations",
          "Share great deals with friends",
        ],
      },
    ],
  },
  "saving-deals": {
    id: "saving-deals",
    title: "Saving and Organizing Your Favorite Deals",
    description: "Learn how to save deals for later and organize them by category",
    duration: "3 min read",
    difficulty: "Beginner",
    category: "Organization",
    relatedGuides: ["redeeming-deals", "account-settings"],
    steps: [
      {
        title: "Save Deals to Favorites",
        content:
          "Click the heart icon on any deal to save it to your favorites. This creates a personal collection of deals you're interested in.",
        tips: [
          "Saved deals remain in your favorites even after they expire",
          "You'll get notifications when saved deals are about to expire",
          "Use favorites to compare similar deals from different brands",
        ],
      },
      {
        title: "Create Custom Lists",
        content:
          "Organize your saved deals into custom lists like 'Food Delivery', 'Software', or 'Back to School' for easy browsing.",
        tips: [
          "Create lists based on your spending categories",
          "Share lists with friends and roommates",
          "Use seasonal lists for holiday shopping",
        ],
      },
      {
        title: "Set Deal Alerts",
        content: "Enable notifications for your favorite brands and categories to never miss a great deal again.",
        tips: [
          "Customize notification frequency in settings",
          "Set alerts for specific discount percentages",
          "Enable push notifications for time-sensitive deals",
        ],
      },
    ],
  },
  "account-settings": {
    id: "account-settings",
    title: "Managing Your Account Settings",
    description: "Customize your profile, notifications, and privacy settings",
    duration: "6 min read",
    difficulty: "Intermediate",
    category: "Account",
    relatedGuides: ["student-verification", "saving-deals"],
    steps: [
      {
        title: "Update Profile Information",
        content:
          "Keep your profile information current, including your school, graduation date, and contact information.",
        tips: [
          "Update your graduation date to maintain student status",
          "Add multiple schools if you're taking classes at different institutions",
          "Keep your email address current for important notifications",
        ],
      },
      {
        title: "Manage Notification Preferences",
        content:
          "Customize how and when you receive notifications about new deals, account updates, and promotional offers.",
        tips: [
          "Choose between email, push, and SMS notifications",
          "Set quiet hours to avoid late-night notifications",
          "Customize frequency for different types of alerts",
        ],
      },
      {
        title: "Privacy and Security Settings",
        content: "Review and adjust your privacy settings, including profile visibility and data sharing preferences.",
        tips: [
          "Enable two-factor authentication for added security",
          "Review connected social media accounts",
          "Understand what data is shared with partner brands",
        ],
      },
      {
        title: "Manage Connected Accounts",
        content: "Link or unlink social media accounts and manage third-party integrations for a seamless experience.",
        tips: [
          "Linking accounts can speed up the signup process",
          "Review permissions for connected apps regularly",
          "Disconnect unused accounts to improve security",
        ],
      },
      {
        title: "Download Your Data",
        content:
          "Access and download your personal data, including saved deals, purchase history, and account activity.",
        tips: [
          "Data exports are available in multiple formats",
          "Exports may take up to 24 hours to process",
          "Use data exports to track your savings over time",
        ],
      },
      {
        title: "Account Deletion",
        content:
          "If needed, learn how to temporarily deactivate or permanently delete your account while preserving important data.",
        tips: [
          "Consider deactivation instead of deletion if you might return",
          "Download your data before deleting your account",
          "Account deletion is permanent and cannot be undone",
        ],
      },
    ],
  },
  "finding-deals": {
    id: "finding-deals",
    title: "Advanced Deal Discovery Tips",
    description: "Pro tips for finding the best student discounts and hidden deals",
    duration: "8 min read",
    difficulty: "Intermediate",
    category: "Advanced",
    relatedGuides: ["redeeming-deals", "saving-deals"],
    steps: [
      {
        title: "Master the Search Function",
        content:
          "Learn advanced search techniques to find exactly what you're looking for, including filters, keywords, and sorting options.",
        tips: [
          "Use specific brand names for targeted results",
          "Combine multiple filters for precise searches",
          "Sort by discount percentage to find the best savings",
        ],
      },
      {
        title: "Discover Hidden Categories",
        content: "Explore lesser-known deal categories and seasonal promotions that other students might miss.",
        tips: [
          "Check the 'Miscellaneous' category for unique deals",
          "Look for seasonal categories during holidays",
          "Explore local deals if you're in a major city",
        ],
      },
      {
        title: "Time Your Purchases",
        content:
          "Learn when brands typically release their best deals and how to time your purchases for maximum savings.",
        tips: [
          "Back-to-school season offers the best overall deals",
          "Black Friday and Cyber Monday have exclusive student offers",
          "End-of-semester deals are common in May and December",
        ],
      },
      {
        title: "Stack Discounts",
        content:
          "Discover how to combine student discounts with other promotions, cashback offers, and loyalty programs.",
        tips: [
          "Use cashback credit cards with student discounts",
          "Combine with store loyalty programs when possible",
          "Check for additional promo codes before checkout",
        ],
      },
      {
        title: "Follow Deal Patterns",
        content: "Understand how different brands release deals and develop strategies for catching the best offers.",
        tips: [
          "Some brands release deals on specific days of the week",
          "Follow brands on social media for flash sales",
          "Sign up for brand newsletters for exclusive codes",
        ],
      },
      {
        title: "Use Price Tracking",
        content: "Learn about price tracking tools and techniques to ensure you're getting the best possible deal.",
        tips: [
          "Use browser extensions to track price history",
          "Set up price alerts for expensive items",
          "Compare prices across multiple retailers",
        ],
      },
      {
        title: "Community Tips",
        content: "Leverage the Uless community and social features to discover deals shared by other students.",
        tips: [
          "Check deal comments for additional tips",
          "Follow top deal contributors",
          "Share your own discoveries to help others",
        ],
      },
    ],
  },
  "mobile-website": {
    id: "mobile-website",
    title: "Using Uless on Mobile Devices",
    description: "Get the most out of Uless on your mobile device through our mobile-optimized website",
    duration: "4 min read",
    difficulty: "Beginner",
    category: "Mobile",
    relatedGuides: ["getting-started", "saving-deals"],
    steps: [
      {
        title: "Access Through Mobile Browser",
        content:
          "Open your mobile browser (Safari, Chrome, Firefox) and visit uless.co to access the full Uless experience on your mobile device.",
        tips: [
          "Works on all mobile browsers",
          "No app download required",
          "Full functionality available through the website",
        ],
      },
      {
        title: "Add to Home Screen",
        content:
          "Bookmark the site for quick access - tap the share button and select 'Add to Home Screen' for app-like experience.",
        tips: ["Creates an icon on your home screen", "Quick access without typing the URL", "Works like a native app"],
      },
      {
        title: "Mobile-Optimized Features",
        content:
          "Enjoy all Uless features optimized for mobile including touch-friendly navigation and responsive design.",
        tips: [
          "Swipe gestures for easy navigation",
          "Touch-optimized buttons and menus",
          "Responsive design adapts to your screen size",
        ],
      },
      {
        title: "Coming Soon: Native Apps",
        content:
          "📱 Native mobile apps for iOS and Android are in development and will be available soon! For now, enjoy the full Uless experience through our mobile-optimized website.",
        tips: [
          "Native apps will offer additional features",
          "Push notifications for deal alerts",
          "Offline access to saved deals",
        ],
      },
    ],
  },
  troubleshooting: {
    id: "troubleshooting",
    title: "Troubleshooting Common Issues",
    description: "Solutions for login problems, verification issues, and more",
    duration: "10 min read",
    difficulty: "Intermediate",
    category: "Support",
    relatedGuides: ["student-verification", "account-settings"],
    steps: [
      {
        title: "Login and Password Issues",
        content:
          "Resolve common login problems including forgotten passwords, account lockouts, and authentication errors.",
        tips: [
          "Use the 'Forgot Password' link for password resets",
          "Check your spam folder for reset emails",
          "Clear browser cache if experiencing login loops",
        ],
      },
      {
        title: "Verification Problems",
        content: "Troubleshoot student verification issues including rejected documents and delayed approvals.",
        tips: [
          "Ensure documents are current and clearly readable",
          "Try different document types if one is rejected",
          "Contact support if verification takes longer than 48 hours",
        ],
      },
      {
        title: "Deal and Code Issues",
        content: "Fix problems with promo codes not working, deals not loading, or discounts not applying correctly.",
        tips: [
          "Check that codes haven't expired",
          "Ensure you meet all deal requirements",
          "Try copying and pasting codes instead of typing",
        ],
      },
      {
        title: "Website Performance Issues",
        content: "Resolve website loading problems, compatibility issues, and performance problems.",
        tips: [
          "Clear browser cache and cookies",
          "Disable ad blockers that might interfere",
          "Try using a different browser or incognito mode",
        ],
      },
      {
        title: "Account and Profile Issues",
        content: "Fix problems with profile updates, email changes, and account settings not saving.",
        tips: [
          "Refresh the page after making changes",
          "Use a different browser if changes aren't saving",
          "Contact support for email address changes",
        ],
      },
      {
        title: "Mobile Website Issues",
        content: "Resolve mobile-specific problems including display issues and touch navigation problems.",
        tips: [
          "Try refreshing the page",
          "Check your internet connection",
          "Update your mobile browser to the latest version",
        ],
      },
      {
        title: "Getting Additional Help",
        content:
          "Learn how to contact support, submit bug reports, and get personalized assistance when other solutions don't work.",
        tips: [
          "Use the contact form for fastest response",
          "Include screenshots when reporting bugs",
          "Check the FAQ before contacting support",
        ],
      },
    ],
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = guides[params.slug]

  if (!guide) {
    return {
      title: "Guide Not Found | Uless",
      description: "The guide you're looking for doesn't exist.",
    }
  }

  return {
    title: `${guide.title} | Uless Help Guides`,
    description: guide.description,
  }
}

export default function GuidePage({ params }: PageProps) {
  const guide = guides[params.slug]

  if (!guide) {
    notFound()
  }

  const nextGuide = guide.nextGuide ? guides[guide.nextGuide] : null
  const relatedGuides = guide.relatedGuides?.map((id) => guides[id]).filter(Boolean) || []

  return (
    <main className="flex-1">
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/guides" className="inline-flex items-center text-sm text-gray-500 hover:text-[#5B48D9] mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Guides
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{guide.category}</Badge>
                <Badge variant="secondary">{guide.difficulty}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{guide.title}</h1>
              <p className="text-lg text-gray-500">{guide.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {guide.duration}
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {guide.steps.length} steps
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {guide.difficulty} level
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {guide.steps.map((step, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-[#f8faff]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B48D9] text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">{step.content}</p>
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 bg-[#f8faff]">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <Link href="/guides">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Guides
                </Button>
              </Link>
              {nextGuide && (
                <Link href={`/guides/${nextGuide.id}`}>
                  <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
                    Next: {nextGuide.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Related Guides</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedGuides.map((relatedGuide) => (
                  <Card key={relatedGuide.id} className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{relatedGuide.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {relatedGuide.duration}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#5B48D9] transition-colors">
                        {relatedGuide.title}
                      </CardTitle>
                      <CardDescription>{relatedGuide.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Link href={`/guides/${relatedGuide.id}`}>
                        <Button variant="ghost" size="sm" className="text-[#5B48D9] hover:text-[#4a3ac0]">
                          Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({
    slug,
  }))
}
