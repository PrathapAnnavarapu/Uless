"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, CreditCard, UserPlus, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { ExpandableContent } from "@/components/expandable-content"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up with your .edu email address to get started.",
      icon: <UserPlus className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Student creating account on laptop with modern UI",
    },
    {
      id: 2,
      title: "Verify Student Status",
      description: "Confirm you're a student to unlock all deals.",
      icon: <BadgeCheck className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Student verification with ID card and laptop",
    },
    {
      id: 3,
      title: "Browse Exclusive Deals",
      description: "Explore discounts from top brands across categories.",
      icon: <Search className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Students browsing deals on modern devices",
    },
    {
      id: 4,
      title: "Redeem & Save",
      description: "Use discount codes or direct links to save money.",
      icon: <CreditCard className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Student saving money with discount code on smartphone",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#333]">How Uless Works</h2>
          <p className="mb-12 text-lg text-[#666]">
            Get started in minutes and start saving with exclusive student discounts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative p-6 bg-white rounded-2xl shadow-sm">
            <div className="flex flex-col space-y-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex cursor-pointer p-4 rounded-xl transition-all ${
                    activeStep === step.id ? "bg-[#5B48D9]/10" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 mr-4 rounded-full shrink-0 ${
                      activeStep === step.id ? "bg-[#5B48D9] text-white" : "bg-[#f8faff] text-[#5B48D9]"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium text-[#333]">{step.title}</h3>
                    <p className="text-[#666]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <ExpandableContent title="Tips for Maximizing Your Savings" variant="premium" className="mt-6" icon="plus">
              <div className="space-y-4">
                <p className="text-sm text-[#666]">Follow these tips to get the most out of your Uless membership:</p>
                <ol className="space-y-3 pl-5 list-decimal text-sm text-[#666]">
                  <li>
                    <span className="font-medium text-[#333]">Check expiration dates</span> - Some deals are
                    time-limited, so use them before they expire
                  </li>
                  <li>
                    <span className="font-medium text-[#333]">Verify eligibility requirements</span> - Make sure you
                    meet all the criteria for each discount
                  </li>
                  <li>
                    <span className="font-medium text-[#333]">Compare offers</span> - Some brands may have multiple
                    discount options available
                  </li>
                  <li>
                    <span className="font-medium text-[#333]">Read the terms</span> - Understand any limitations or
                    restrictions that may apply
                  </li>
                </ol>
              </div>
            </ExpandableContent>
          </div>

          <div className="relative overflow-hidden bg-[#f8faff] rounded-2xl shadow-md">
            <div className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#333]">
                Step {activeStep}: {steps[activeStep - 1].title}
              </h3>

              {activeStep === 1 && (
                <div className="space-y-4">
                  <p className="text-[#666]">
                    Creating an account is quick and easy. Use your .edu email address to sign up and get immediate
                    access to basic features.
                  </p>
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={steps[activeStep - 1].image || "/placeholder.svg"}
                      alt={steps[activeStep - 1].alt}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#5B48D9]/10 border border-[#5B48D9]/20">
                    <p className="text-sm text-[#666]">
                      <strong>Pro Tip:</strong> Make sure to use your school email address ending in .edu to streamline
                      the verification process.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <p className="text-[#666]">
                    Verify your student status by confirming your .edu email or uploading your student ID. This unlocks
                    all premium student deals.
                  </p>
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={steps[activeStep - 1].image || "/placeholder.svg"}
                      alt={steps[activeStep - 1].alt}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#5B48D9]/10 border border-[#5B48D9]/20">
                    <p className="text-sm text-[#666]">
                      <strong>Pro Tip:</strong> Verification typically takes just a few minutes when using your .edu
                      email. Have your student ID ready as a backup.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <p className="text-[#666]">
                    Browse exclusive student discounts across categories like software, clothing, food, entertainment,
                    and more.
                  </p>
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={steps[activeStep - 1].image || "/placeholder.svg"}
                      alt={steps[activeStep - 1].alt}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#5B48D9]/10 border border-[#5B48D9]/20">
                    <p className="text-sm text-[#666]">
                      <strong>Pro Tip:</strong> Use filters to narrow down deals by category, discount percentage, or
                      brand to find exactly what you need.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-4">
                  <p className="text-[#666]">
                    Redeem deals with just a click. Get discount codes to use at checkout or access direct links with
                    discounts automatically applied.
                  </p>
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={steps[activeStep - 1].image || "/placeholder.svg"}
                      alt={steps[activeStep - 1].alt}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#5B48D9]/10 border border-[#5B48D9]/20">
                    <p className="text-sm text-[#666]">
                      <strong>Pro Tip:</strong> Check the deal details for any restrictions or minimum purchase
                      requirements before redeeming.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Link href="/auth">
                  <Button className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0] text-white shadow-lg shadow-[#5B48D9]/20 transition-all hover:shadow-[#5B48D9]/30">
                    Get Started Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
