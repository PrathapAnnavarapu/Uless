import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, BookOpen, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Uless",
  description: "Join our team and help make a difference in students' lives",
}

export default function CareersPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Help us make a difference in students' lives
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Why Join Uless?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                We're on a mission to make student life more affordable and accessible
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Users className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Inclusive Culture</h3>
                <p className="text-gray-500">Join a diverse team where all perspectives are valued and celebrated</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Briefcase className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Work-Life Balance</h3>
                <p className="text-gray-500">
                  Flexible schedules and remote work options that respect your personal time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <BookOpen className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Growth Opportunities</h3>
                <p className="text-gray-500">Continuous learning and professional development for all team members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Heart className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Meaningful Impact</h3>
                <p className="text-gray-500">Make a real difference in students' lives every single day</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-[#f8faff]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">Find your perfect role at Uless</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Marketing Manager</h3>
                  <p className="text-[#5B48D9] font-medium mb-4">Full-time • Remote</p>
                  <p className="text-gray-600 mb-4">
                    Lead our marketing efforts to reach more students and partner brands. Develop and execute marketing
                    strategies to grow our platform.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Digital Marketing</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">SEO</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Social Media</span>
                  </div>
                  <Button className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0]">Apply Now</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Full Stack Developer</h3>
                  <p className="text-[#5B48D9] font-medium mb-4">Full-time • Remote</p>
                  <p className="text-gray-600 mb-4">
                    Build and maintain our platform using modern web technologies. Implement new features and ensure
                    platform stability.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Next.js</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Node.js</span>
                  </div>
                  <Button className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0]">Apply Now</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Partnership Manager</h3>
                  <p className="text-[#5B48D9] font-medium mb-4">Full-time • Remote</p>
                  <p className="text-gray-600 mb-4">
                    Develop and maintain relationships with brand partners. Negotiate deals and ensure mutual success.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Business Development</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Negotiation</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Relationship Management</span>
                  </div>
                  <Button className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0]">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Our Hiring Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#5B48D9] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Application Review</h3>
                    <p className="text-gray-600">
                      We review your application and resume to assess your qualifications and experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#5B48D9] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Initial Interview</h3>
                    <p className="text-gray-600">
                      A video call to discuss your background, skills, and interest in the role.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#5B48D9] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Skills Assessment</h3>
                    <p className="text-gray-600">
                      Depending on the role, you may be asked to complete a skills assessment or case study.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#5B48D9] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Final Interview</h3>
                    <p className="text-gray-600">Meet with team members and leadership to ensure a mutual fit.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#5B48D9] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Offer</h3>
                    <p className="text-gray-600">
                      If selected, you'll receive an offer with details about compensation and benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-[#5B48D9] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Join Us?</h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-lg">
                Apply for one of our open positions or send us your resume for future opportunities
              </p>
            </div>
            <div className="pt-4">
              <Button className="bg-white text-[#5B48D9] hover:bg-white/90">Contact Our Recruiting Team</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
