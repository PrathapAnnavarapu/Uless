import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service | Uless",
  description: "Terms and conditions for using the Uless platform",
}

export default function TermsPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#333]">Terms of Service</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-[#f8faff] p-8 rounded-xl mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[#5B48D9]">Welcome to Uless</h2>
            <p className="text-xl mb-4">
              These Terms of Service govern your use of the Uless platform, website, and services. By accessing or using
              Uless, you agree to be bound by these terms.
            </p>
            <p className="text-xl">
              Please read these terms carefully before using our platform. If you do not agree with any part of these
              terms, you may not use our services.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">1. Acceptance of Terms</h2>
            <p className="text-xl mb-4">
              By creating an account, accessing, or using the Uless platform, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-xl mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
              on the Uless website. Your continued use of Uless after any changes indicates your acceptance of the
              modified terms.
            </p>
            <p className="text-xl">
              It is your responsibility to review these terms periodically for changes. If you do not agree with the
              modified terms, you must stop using our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">2. User Accounts</h2>
            <p className="text-xl mb-4">
              To access certain features of Uless, you must create an account. You agree to provide accurate, current,
              and complete information during registration and to update such information to keep it accurate, current,
              and complete.
            </p>
            <p className="text-xl mb-4">
              You are responsible for safeguarding your account credentials and for all activities that occur under your
              account. You must notify us immediately of any unauthorized use of your account.
            </p>
            <p className="text-xl mb-4">
              Uless reserves the right to disable any user account at any time if, in our opinion, you have failed to
              comply with these terms or if we believe your account is being used fraudulently.
            </p>
            <p className="text-xl">
              You must be at least 16 years old to create an account. If you are under 18, you represent that you have
              your parent or guardian's permission to use Uless.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">3. Student Verification</h2>
            <p className="text-xl mb-4">
              Uless provides exclusive discounts to verified students. To access these discounts, you must verify your
              student status through our verification process.
            </p>
            <p className="text-xl mb-4">
              You agree to provide accurate information during the verification process. Falsifying information to
              obtain student discounts is prohibited and may result in account termination.
            </p>
            <p className="text-xl">
              Student verification is valid for a limited period and may require renewal. You are responsible for
              maintaining your verified status to continue accessing student discounts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">4. Intellectual Property Rights</h2>
            <p className="text-xl mb-4">
              The Uless platform, including its content, features, and functionality, is owned by Uless and is protected
              by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-xl mb-4">
              You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor
              may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit
              these restrictions or you have our written permission.
            </p>
            <p className="text-xl">
              All trademarks, logos, and service marks displayed on Uless are the property of their respective owners,
              whether or not affiliated with us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">5. User Conduct</h2>
            <p className="text-xl mb-4">
              You agree not to use Uless for any unlawful purpose or in any way that could damage, disable, overburden,
              or impair our service.
            </p>
            <p className="text-xl mb-4">Prohibited activities include but are not limited to:</p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">
                Using the service for any illegal purpose or in violation of any local, state, national, or
                international law
              </li>
              <li className="mb-2">
                Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions
                to or from the servers running Uless
              </li>
              <li className="mb-2">
                Using automated means, including spiders, robots, crawlers, data mining tools, or the like to download
                data from Uless
              </li>
              <li className="mb-2">
                Impersonating another person or otherwise misrepresenting your affiliation with a person or entity
              </li>
              <li className="mb-2">
                Engaging in any conduct that restricts or inhibits any other user from using or enjoying Uless
              </li>
              <li>Attempting to access any service or area of Uless that you are not authorized to access</li>
            </ul>
            <p className="text-xl">
              We reserve the right to terminate or suspend your access to Uless immediately, without prior notice or
              liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">6. Third-Party Links and Services</h2>
            <p className="text-xl mb-4">
              Uless may contain links to third-party websites or services that are not owned or controlled by us. We
              have no control over, and assume no responsibility for, the content, privacy policies, or practices of any
              third-party websites or services.
            </p>
            <p className="text-xl mb-4">
              You acknowledge and agree that Uless shall not be responsible or liable, directly or indirectly, for any
              damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such
              content, goods, or services available on or through any such websites or services.
            </p>
            <p className="text-xl">
              We strongly advise you to read the terms and conditions and privacy policies of any third-party websites
              or services that you visit or interact with through Uless.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">7. Disclaimer of Warranties</h2>
            <p className="text-xl mb-4">
              Uless is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied,
              regarding the operation of Uless or the information, content, materials, or products included on the
              platform.
            </p>
            <p className="text-xl mb-4">
              We do not guarantee that Uless will be uninterrupted, secure, or error-free, that defects will be
              corrected, or that the platform is free of viruses or other harmful components.
            </p>
            <p className="text-xl">
              To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied,
              including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">8. Limitation of Liability</h2>
            <p className="text-xl mb-4">
              In no event shall Uless, its officers, directors, employees, or agents, be liable to you for any direct,
              indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:
            </p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">Errors, mistakes, or inaccuracies of content</li>
              <li className="mb-2">
                Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of
                our service
              </li>
              <li className="mb-2">
                Any unauthorized access to or use of our secure servers and/or any and all personal information stored
                therein
              </li>
              <li className="mb-2">Any interruption or cessation of transmission to or from our service</li>
              <li>
                Any bugs, viruses, trojan horses, or the like, which may be transmitted to or through our service by any
                third party
              </li>
            </ul>
            <p className="text-xl">
              This limitation of liability applies whether the alleged liability is based on contract, tort, negligence,
              strict liability, or any other basis, even if we have been advised of the possibility of such damage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">9. Indemnification</h2>
            <p className="text-xl mb-4">
              You agree to defend, indemnify, and hold harmless Uless, its officers, directors, employees, and agents,
              from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
              expenses (including but not limited to attorney's fees) arising from:
            </p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">Your use of and access to Uless</li>
              <li className="mb-2">Your violation of any term of these Terms of Service</li>
              <li className="mb-2">
                Your violation of any third-party right, including without limitation any copyright, property, or
                privacy right
              </li>
              <li>Any claim that your content caused damage to a third party</li>
            </ul>
            <p className="text-xl">
              This defense and indemnification obligation will survive these Terms of Service and your use of Uless.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">10. Governing Law</h2>
            <p className="text-xl mb-4">
              These Terms shall be governed and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>
            <p className="text-xl mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
              rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
              provisions of these Terms will remain in effect.
            </p>
            <p className="text-xl">
              These Terms constitute the entire agreement between us regarding our Service, and supersede and replace
              any prior agreements we might have had between us regarding the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">11. Changes to Terms</h2>
            <p className="text-xl mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
              provide notice of any changes by posting the new Terms on this page.
            </p>
            <p className="text-xl mb-4">
              You are advised to review these Terms periodically for any changes. Changes to these Terms are effective
              when they are posted on this page.
            </p>
            <p className="text-xl">
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">12. Contact Us</h2>
            <p className="text-xl mb-4">If you have any questions about these Terms, please contact us at:</p>
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
