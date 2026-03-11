// Update the About Us page to use non-copyrighted content
import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Users, Award, Sparkles, Building2, BarChart, Globe2, Linkedin, Twitter, Mail } from "lucide-react"
import { LinkWithScroll } from "@/components/link-with-scroll"

export const metadata: Metadata = {
  title: "About Us | Uless",
  description: "Learn about Uless and our mission to provide exclusive student discounts",
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Uless</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Connecting students with exclusive discounts from premium brands
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-gray-700 md:text-lg leading-relaxed">
                At Uless, we believe that education should be accessible and affordable for everyone, regardless of
                where they come from. Our mission is to empower students by connecting them with exclusive discounts and
                deals from premium brands across technology, entertainment, fashion, and more.
              </p>
              <p className="text-gray-700 md:text-lg leading-relaxed">
                Born from the personal struggles of our founder as an international student, Uless understands the
                financial challenges that students face. We work directly with brands to negotiate the best possible
                deals, helping students save money while accessing the tools and services they need to succeed in their
                academic journey.
              </p>
              <p className="text-gray-700 md:text-lg leading-relaxed">
                We're committed to making student life more affordable, allowing students to focus on what truly
                matters: their education and personal growth.
              </p>
              <div className="space-y-2 mt-6">
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-[#5B48D9]" />
                  <span className="text-lg">Exclusive student discounts up to 60% off</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-[#5B48D9]" />
                  <span className="text-lg">Verified partnerships with premium brands</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-[#5B48D9]" />
                  <span className="text-lg">Simple verification process</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-[#5B48D9]" />
                  <span className="text-lg">New deals added regularly</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Students using laptops"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-[#f8faff]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                The principles that guide everything we do at Uless
              </p>
            </div>
          </div>
          <div className="grid gap-8 mt-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Users className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Student-First</h3>
                <p className="text-gray-500">
                  We prioritize the needs of students in everything we do, ensuring our platform offers genuine value to
                  the student community.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Award className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Quality</h3>
                <p className="text-gray-500">
                  We partner only with reputable brands that offer high-quality products and services worthy of our
                  students' trust.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-[#5B48D9]/10">
                  <Sparkles className="h-6 w-6 text-[#5B48D9]" />
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-gray-500">
                  We continuously improve our platform and seek innovative ways to connect students with the best deals
                  available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Our Team Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] bg-clip-text text-transparent">
                Our Team
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Meet the passionate individuals behind Uless
              </p>
            </div>
          </div>

          <div className="grid gap-16 lg:gap-24 lg:grid-cols-2 max-w-7xl mx-auto">
            {/* Pavan Kumar Pudhota - CEO */}
            <div className="group">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-[#f8faff]">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex flex-col items-center">
                    {/* Profile Image Container */}
                    <div className="relative mb-6">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#5B48D9] to-[#4a3ac0] p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <span className="text-5xl font-bold bg-gradient-to-br from-[#5B48D9] to-[#4a3ac0] bg-clip-text text-transparent">
                            PP
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="px-4 py-2 bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] text-white text-sm font-semibold rounded-full shadow-lg">
                          Founder & CEO
                        </div>
                      </div>
                    </div>

                    {/* Name and Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-2">Pavan Kumar Pudhota</h3>

                    {/* Decorative Line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] rounded-full mb-6"></div>

                    {/* Bio Text */}
                    <div className="text-gray-700 space-y-4 text-center max-w-lg">
                      <p className="leading-relaxed">
                        Pavan's journey began when he traveled all the way from India to the United States to pursue his
                        Master's degree. During his studies, he experienced firsthand the financial challenges that
                        international students face, particularly when it came to purchasing essential branded products
                        that were prohibitively expensive.
                      </p>
                      <p className="leading-relaxed">
                        Rather than simply accepting this as an unavoidable hardship, Pavan transformed his personal
                        struggle into a mission. He made it his challenge to create a platform that would make student
                        lives easier and more affordable. This determination led to the founding of Uless, a dedicated
                        service that connects students with exclusive discounts on premium brands and essential
                        services.
                      </p>
                      <p className="leading-relaxed">
                        Today, Pavan leads Uless with the same passion that inspired its creation, working tirelessly to
                        ensure that students everywhere can access the tools and products they need without financial
                        sacrifice.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shrirang Patel - COO */}
            <div className="group">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-[#f8faff]">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex flex-col items-center">
                    {/* Profile Image Container */}
                    <div className="relative mb-6">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#5B48D9] to-[#4a3ac0] p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <span className="text-5xl font-bold bg-gradient-to-br from-[#5B48D9] to-[#4a3ac0] bg-clip-text text-transparent">
                            SP
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="px-4 py-2 bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] text-white text-sm font-semibold rounded-full shadow-lg">
                          COO
                        </div>
                      </div>
                    </div>

                    {/* Name and Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-2">Shrirang Patel</h3>

                    {/* Decorative Line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] rounded-full mb-6"></div>

                    {/* Bio Text */}
                    <div className="text-gray-700 space-y-4 text-center max-w-lg">
                      <p className="leading-relaxed">
                        Shrirang, of Indian origin, completed his Bachelor's degree in the technology field in the
                        Washington metropolitan area. His academic background combined with his natural business acumen
                        has made him an invaluable asset to the Uless leadership team.
                      </p>
                      <p className="leading-relaxed">
                        With a keen eye for operational efficiency and strategic growth, Shrirang oversees the
                        day-to-day operations of Uless. His expertise in technology and business processes has been
                        instrumental in scaling the platform and establishing partnerships with premium brands.
                      </p>
                      <p className="leading-relaxed">
                        Shrirang is passionate about creating systems that make education more accessible and affordable
                        for students worldwide. His leadership ensures that Uless continues to innovate and expand its
                        offerings while maintaining the highest standards of service quality.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#5B48D9]/10 hover:text-[#5B48D9]">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Message */}
          <div className="mt-20 text-center max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#5B48D9] to-[#4a3ac0] text-white">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">A Message from Our Leadership</h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/90">
                  "Together, we are committed to revolutionizing the student experience. Our diverse backgrounds and
                  shared vision drive us to create innovative solutions that make quality education and essential
                  products accessible to students worldwide. We believe that financial constraints should never be a
                  barrier to academic success."
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <span className="font-semibold">- Pavan Kumar Pudhota & Shrirang Patel</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Corporate Join Our Team Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-[#4a3ac0] to-[#5B48D9]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-2">
                Careers at Uless
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Ready to Join Us?</h2>
              <p className="text-white/90 md:text-lg leading-relaxed">
                At Uless, we're building a team of exceptional individuals who are passionate about transforming the
                student experience. We offer competitive compensation packages, comprehensive benefits, and a dynamic
                work environment where innovation thrives.
              </p>

              <div className="space-y-4 mt-2">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/20">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Corporate Culture</h4>
                    <p className="text-white/80">
                      Our collaborative environment fosters innovation, professional growth, and work-life balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/20">
                    <BarChart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Career Development</h4>
                    <p className="text-white/80">
                      We invest in our employees with mentorship programs, learning stipends, and advancement
                      opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/20">
                    <Globe2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Global Impact</h4>
                    <p className="text-white/80">
                      Join a mission-driven company making education more accessible for students worldwide.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <LinkWithScroll href="/careers">
                  <Button className="bg-white text-[#5B48D9] hover:bg-white/90 px-6 py-6 text-base font-medium">
                    View Open Positions
                  </Button>
                </LinkWithScroll>
                <LinkWithScroll href="/contact?department=recruiting">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 px-6 py-6 text-base font-medium"
                  >
                    Contact Our Recruiting Team
                  </Button>
                </LinkWithScroll>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Our Hiring Process</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">Application Review</h4>
                      <p className="text-white/80 text-sm">
                        Our talent acquisition team reviews your application and resume
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">Initial Interview</h4>
                      <p className="text-white/80 text-sm">
                        A conversation to understand your background and aspirations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">Skills Assessment</h4>
                      <p className="text-white/80 text-sm">
                        Demonstrate your expertise through role-specific evaluations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">Team Interview</h4>
                      <p className="text-white/80 text-sm">
                        Meet your potential colleagues and learn about our culture
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">Offer & Onboarding</h4>
                      <p className="text-white/80 text-sm">Welcome to the Uless team!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Get in Touch Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-2 max-w-[700px]">
              <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
              <p className="text-gray-500 md:text-lg">Have questions about Uless? We'd love to hear from you.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkWithScroll href="/support">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-8 py-6 text-lg">Support</Button>
              </LinkWithScroll>
              <LinkWithScroll href="/partnerships">
                <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-8 py-6 text-lg">Partnerships</Button>
              </LinkWithScroll>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
