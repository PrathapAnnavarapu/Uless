import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageSEO } from "@/components/seo/page-seo"
import { FAQSchema } from "@/components/seo/faq-schema"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Uless",
  description: "Find answers to common questions about student discounts, verification, and using the Uless platform.",
}

export default function FAQPage() {
  const faqItems = [
    {
      question: "What is Uless?",
      answer:
        "Uless is a platform that helps students discover and access exclusive discounts and deals from top brands. We verify student status and connect students with savings across various categories including technology, entertainment, food, clothing, and more.",
    },
    {
      question: "How do I verify my student status?",
      answer:
        "You can verify your student status by signing up with your .edu email address or by uploading proof of enrollment such as a student ID card, enrollment letter, or tuition receipt. Our verification process is secure and typically takes less than 24 hours.",
    },
    {
      question: "Is Uless free to use?",
      answer:
        "Yes, Uless is completely free for students. We don't charge any fees to access or redeem student discounts. Our platform is supported by our brand partners who want to connect with student customers.",
    },
    {
      question: "How do I redeem a student discount?",
      answer:
        "After verifying your student status, simply browse our available deals and click on the one you're interested in. You'll be directed to the brand's website with your discount automatically applied, or you'll receive a unique promo code to use during checkout.",
    },
    {
      question: "Which brands offer student discounts through Uless?",
      answer:
        "We partner with hundreds of popular brands across various categories. Some of our top partners include Amazon Prime, Apple, Spotify, Adobe, Microsoft, Nike, Samsung, and many more. We're constantly adding new brands and deals.",
    },
    {
      question: "How long does student verification last?",
      answer:
        "Student verification typically lasts for 12 months. After that period, you'll need to re-verify your student status to continue accessing exclusive student discounts. We'll send you a reminder email when it's time to re-verify.",
    },
    {
      question: "Can international students use Uless?",
      answer:
        "Yes, international students can use Uless. Our verification system accepts international student IDs and proof of enrollment from accredited international educational institutions. Some brand offers may have regional restrictions.",
    },
    {
      question: "What if I have trouble verifying my student status?",
      answer:
        "If you're having trouble with student verification, please contact our support team at support@uless.co. We're here to help and can assist with alternative verification methods if needed.",
    },
    {
      question: "Are there discounts for teachers and faculty?",
      answer:
        "Currently, Uless focuses primarily on student discounts. However, some of our partner brands do offer educator discounts. We're exploring options to expand our services to include verified teacher and faculty discounts in the future.",
    },
    {
      question: "How do I report a problem with a discount?",
      answer:
        "If you encounter any issues with redeeming a discount, please contact our support team at support@uless.co with details about the problem. We'll work with our brand partners to resolve the issue as quickly as possible.",
    },
    {
      question: "How often are new discounts added to Uless?",
      answer:
        "We add new discounts and update existing ones on a daily basis. Our team constantly works with brands to negotiate the best possible deals for students. Check back regularly or subscribe to our newsletter to stay updated on the latest offers.",
    },
    {
      question: "Can I suggest a brand for Uless to partner with?",
      answer:
        "We love hearing from students about which brands they'd like to see on our platform. You can suggest a brand by contacting us at partnerships@uless.co or through the suggestion form in your account dashboard.",
    },
    {
      question: "How does Uless ensure the security of my personal information?",
      answer:
        "We take data security very seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent. You can read our full privacy policy for more details on how we protect your data.",
    },
    {
      question: "Can I use Uless on my mobile device?",
      answer:
        "Yes, Uless is fully optimized for mobile devices. You can access our platform through any mobile browser, and we're currently developing dedicated iOS and Android apps to make the experience even better.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "If you forget your password, simply click on the 'Forgot Password' link on the login page. We'll send you an email with instructions to reset your password. For security reasons, password reset links expire after 24 hours.",
    },
  ]

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <PageSEO pageName="faq" />

      <FAQSchema items={faqItems} />

      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
            <p className="text-[#666]">
              Find answers to common questions about student discounts, verification, and using the Uless platform.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#666]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="p-6 mt-8 text-center bg-white rounded-xl shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Still have questions?</h2>
            <p className="mb-4 text-[#666]">
              Our support team is here to help with any other questions you might have.
            </p>
            <a
              href="mailto:support@uless.co"
              className="inline-flex items-center px-6 py-3 text-white rounded-lg bg-[#5B48D9] hover:bg-[#4a3ac0]"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
