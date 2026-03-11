import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy | Uless",
  description: "Privacy policy for the Uless platform",
}

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#333]">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-[#f8faff] p-8 rounded-xl mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[#5B48D9]">Your Privacy Matters</h2>
            <p className="text-xl mb-4">
              At Uless, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </p>
            <p className="text-xl">
              Please read this Privacy Policy carefully. By accessing or using Uless, you acknowledge that you have
              read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">1. Information We Collect</h2>
            <p className="text-xl mb-4">
              We collect several types of information from and about users of our platform, including:
            </p>
            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Personal Information</h3>
            <p className="text-xl mb-4">When you create an account, we collect:</p>
            <ul className="list-disc pl-8 mb-6 text-xl">
              <li className="mb-2">Full name</li>
              <li className="mb-2">Email address (including .edu email for student verification)</li>
              <li className="mb-2">Educational institution information</li>
              <li className="mb-2">Password (stored in encrypted form)</li>
              <li>Profile picture (if provided)</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Student Verification Information</h3>
            <p className="text-xl mb-4">To verify your student status, we may collect:</p>
            <ul className="list-disc pl-8 mb-6 text-xl">
              <li className="mb-2">Student ID information</li>
              <li className="mb-2">Enrollment documentation</li>
              <li>Educational institution email verification</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Usage Information</h3>
            <p className="text-xl mb-4">
              We automatically collect certain information about your device and how you interact with our platform,
              including:
            </p>
            <ul className="list-disc pl-8 mb-6 text-xl">
              <li className="mb-2">IP address</li>
              <li className="mb-2">Device information (type, operating system, browser)</li>
              <li className="mb-2">Pages visited and features used</li>
              <li className="mb-2">Time spent on pages</li>
              <li className="mb-2">Referring website or source</li>
              <li>Search terms used to find our platform</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Cookies and Similar Technologies</h3>
            <p className="text-xl mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing activities.
              For more information about our use of cookies, please see our{" "}
              <Link href="/cookies" className="text-[#5B48D9] underline">
                Cookies Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">2. How We Use Your Information</h2>
            <p className="text-xl mb-4">We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-8 mb-6 text-xl">
              <li className="mb-2">Creating and managing your account</li>
              <li className="mb-2">Verifying your student status</li>
              <li className="mb-2">Providing access to student discounts and deals</li>
              <li className="mb-2">Personalizing your experience on our platform</li>
              <li className="mb-2">Communicating with you about your account, deals, and updates</li>
              <li className="mb-2">Analyzing usage patterns to improve our platform</li>
              <li className="mb-2">Ensuring the security of our platform</li>
              <li className="mb-2">Responding to your inquiries and support requests</li>
              <li>Complying with legal obligations</li>
            </ul>
            <p className="text-xl">
              We will only use your personal information for the purposes for which we collected it, unless we
              reasonably consider that we need to use it for another reason compatible with the original purpose.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">3. How We Share Your Information</h2>
            <p className="text-xl mb-4">We may share your information in the following circumstances:</p>
            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">With Service Providers</h3>
            <p className="text-xl mb-6">
              We may share your information with third-party service providers who perform services on our behalf, such
              as hosting, data analysis, payment processing, customer service, and marketing assistance.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">With Brand Partners</h3>
            <p className="text-xl mb-6">
              When you redeem a deal, we may share necessary information with the brand partner to facilitate your
              access to the discount. This sharing is always with your consent and limited to what is necessary to
              provide the service.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">For Legal Reasons</h3>
            <p className="text-xl mb-6">
              We may disclose your information if required to do so by law or in response to valid requests by public
              authorities (e.g., a court or government agency).
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Business Transfers</h3>
            <p className="text-xl mb-6">
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information
              may be transferred as part of that transaction.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">With Your Consent</h3>
            <p className="text-xl mb-4">We may share your information for any other purpose with your consent.</p>
            <p className="text-xl">We do not sell your personal information to third parties.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">4. Data Security</h2>
            <p className="text-xl mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. However, please also remember that we cannot guarantee
              that the internet itself is 100% secure.
            </p>
            <p className="text-xl mb-4">Our security measures include:</p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">Encryption of sensitive data</li>
              <li className="mb-2">Secure storage systems</li>
              <li className="mb-2">Regular security assessments</li>
              <li className="mb-2">Access controls and authentication</li>
              <li>Staff training on data protection</li>
            </ul>
            <p className="text-xl">
              Although we will do our best to protect your personal information, transmission of personal information to
              and from our platform is at your own risk. You should only access our platform within a secure
              environment.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">5. Data Retention</h2>
            <p className="text-xl mb-4">
              We will retain your personal information only for as long as is necessary for the purposes set out in this
              Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our policies.
            </p>
            <p className="text-xl">
              If you request deletion of your account, we will delete your personal information, except where we are
              required to retain it for legal or legitimate business purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">6. Your Privacy Rights</h2>
            <p className="text-xl mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">The right to access the personal information we hold about you</li>
              <li className="mb-2">The right to request correction of inaccurate personal information</li>
              <li className="mb-2">The right to request deletion of your personal information</li>
              <li className="mb-2">The right to restrict or object to processing of your personal information</li>
              <li className="mb-2">The right to data portability</li>
              <li>The right to withdraw consent where processing is based on consent</li>
            </ul>
            <p className="text-xl">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">7. Children's Privacy</h2>
            <p className="text-xl mb-4">
              Our platform is not intended for children under the age of 16. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and you believe your child has
              provided us with personal information, please contact us.
            </p>
            <p className="text-xl">
              If we become aware that we have collected personal information from children without verification of
              parental consent, we will take steps to remove that information from our servers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">8. International Data Transfers</h2>
            <p className="text-xl mb-4">
              Your information may be transferred to, and maintained on, computers located outside of your state,
              province, country, or other governmental jurisdiction where the data protection laws may differ from those
              in your jurisdiction.
            </p>
            <p className="text-xl mb-4">
              If you are located outside the United States and choose to provide information to us, please note that we
              transfer the data to the United States and process it there.
            </p>
            <p className="text-xl">
              Your consent to this Privacy Policy followed by your submission of such information represents your
              agreement to that transfer.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">9. Third-Party Links</h2>
            <p className="text-xl mb-4">
              Our platform may contain links to third-party websites or services that are not owned or controlled by
              Uless. We have no control over, and assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services.
            </p>
            <p className="text-xl">
              We strongly advise you to review the privacy policy of every site you visit. We have no control over and
              assume no responsibility for the content, privacy policies, or practices of any third-party sites or
              services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">10. Changes to This Privacy Policy</h2>
            <p className="text-xl mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="text-xl mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
            <p className="text-xl">
              Your continued use of our platform following the posting of changes to this Privacy Policy will constitute
              your acknowledgment of the changes and your consent to abide and be bound by the modified Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">11. Contact Us</h2>
            <p className="text-xl mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-xl font-medium">Email: support@uless.co</p>
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
