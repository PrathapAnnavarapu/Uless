import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookies Policy | Uless",
  description: "Cookies policy for the Uless platform",
}

export default function CookiesPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#333]">Cookies Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-[#f8faff] p-8 rounded-xl mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[#5B48D9]">About Cookies</h2>
            <p className="text-xl mb-4">
              This Cookies Policy explains what cookies are and how we use them on the Uless platform. Please read this
              policy to understand what cookies are, how we use them, the types of cookies we use, and how you can
              manage your cookie preferences.
            </p>
            <p className="text-xl">
              By using Uless, you agree to our use of cookies in accordance with this Cookies Policy.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">1. What Are Cookies?</h2>
            <p className="text-xl mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used
              to make websites work more efficiently and provide information to the website owners.
            </p>
            <p className="text-xl mb-4">
              Cookies help websites remember information about your visit, such as your preferred language and settings.
              This can make your next visit easier and the site more useful to you.
            </p>
            <p className="text-xl">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close
              your browser until they expire or you delete them. Session cookies are deleted when you close your
              browser.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">2. How We Use Cookies</h2>
            <p className="text-xl mb-4">We use cookies for various purposes, including:</p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">Authenticating users and remembering your login status</li>
              <li className="mb-2">Remembering your preferences and settings</li>
              <li className="mb-2">Analyzing how you use our platform to improve its performance</li>
              <li className="mb-2">Personalizing your experience by showing relevant content</li>
              <li className="mb-2">Providing secure browsing experience</li>
              <li>Measuring the effectiveness of our marketing campaigns</li>
            </ul>
            <p className="text-xl">
              We do not use cookies to collect personally identifiable information about you, although some of the
              cookies we use may be linked to such information that you have provided to us (for example, when creating
              an account).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">3. Types of Cookies We Use</h2>
            <p className="text-xl mb-4">We use the following types of cookies on our platform:</p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Essential Cookies</h3>
            <p className="text-xl mb-6">
              These cookies are necessary for the platform to function properly. They enable core functionality such as
              security, network management, and account access. You cannot opt out of these cookies.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Preference Cookies</h3>
            <p className="text-xl mb-6">
              These cookies enable us to remember information that changes the way the platform behaves or looks, such
              as your preferred language or the region you are in. They help us to remember your settings and
              preferences.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Analytics Cookies</h3>
            <p className="text-xl mb-6">
              These cookies help us understand how visitors interact with our platform by collecting and reporting
              information anonymously. They help us improve our platform and measure the effectiveness of our marketing
              campaigns.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-[#5B48D9]">Marketing Cookies</h3>
            <p className="text-xl mb-4">
              These cookies are used to track visitors across websites. They are used to display ads that are relevant
              and engaging for individual users and thereby more valuable for publishers and third-party advertisers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">4. Third-Party Cookies</h2>
            <p className="text-xl mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
              deliver advertisements, and so on. These cookies may be placed by:
            </p>
            <ul className="list-disc pl-8 mb-4 text-xl">
              <li className="mb-2">Analytics providers (such as Google Analytics)</li>
              <li className="mb-2">Advertising networks</li>
              <li className="mb-2">Social media platforms</li>
              <li>Other third-party service providers</li>
            </ul>
            <p className="text-xl">
              Third-party cookies are governed by the respective privacy policies of these third parties, and not by
              this Cookies Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">5. Managing Your Cookie Preferences</h2>
            <p className="text-xl mb-4">
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies,
              or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and
              from version to version.
            </p>
            <p className="text-xl mb-4">
              You can generally find how to manage cookies in your browser in the "Help," "Tools," or "Edit" menu of
              your browser. You may wish to refer to{" "}
              <a href="http://www.allaboutcookies.org/manage-cookies/" className="text-[#5B48D9] underline">
                http://www.allaboutcookies.org/manage-cookies/
              </a>{" "}
              for information on commonly used browsers.
            </p>
            <p className="text-xl mb-4">
              Please note that if you choose to block cookies, you may not be able to use all the features of our
              platform.
            </p>
            <p className="text-xl">
              In addition to browser controls, we provide cookie preference settings on our platform that allow you to
              manage non-essential cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">6. Cookie Consent</h2>
            <p className="text-xl mb-4">
              When you first visit our platform, you will be shown a cookie banner requesting your consent to
              non-essential cookies. You can choose to accept all cookies, only essential cookies, or customize your
              preferences.
            </p>
            <p className="text-xl mb-4">
              You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer
              of our website.
            </p>
            <p className="text-xl">
              By continuing to use our platform after you have consented to our use of cookies, you are agreeing to our
              use of cookies in accordance with this Cookies Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">7. Changes to This Cookies Policy</h2>
            <p className="text-xl mb-4">
              We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new
              Cookies Policy on this page and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="text-xl mb-4">
              You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy
              are effective when they are posted on this page.
            </p>
            <p className="text-xl">
              Your continued use of our platform following the posting of changes to this Cookies Policy will constitute
              your acknowledgment of the changes and your consent to abide and be bound by the modified Cookies Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#333]">8. Contact Us</h2>
            <p className="text-xl mb-4">
              If you have any questions about our use of cookies or this Cookies Policy, please contact us at:
            </p>
            <p className="text-xl font-medium">Email: support@Uless.co</p>
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
