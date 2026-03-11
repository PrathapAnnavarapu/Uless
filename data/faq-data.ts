export type FAQItem = {
  id: string
  question: string
  answer: string
  category: string
}

export const faqData: FAQItem[] = [
  {
    id: "discount-verification",
    question: "How do I verify my student status?",
    answer:
      "To verify your student status, sign up with your .edu email address. We'll send a verification link to your email. Once verified, you'll have full access to all student discounts.",
    category: "Account",
  },
  {
    id: "discount-eligibility",
    question: "Who is eligible for student discounts?",
    answer:
      "Current college and university students with a valid .edu email address are eligible for our student discounts. Some brands may have additional requirements.",
    category: "Discounts",
  },
  {
    id: "how-to-redeem",
    question: "How do I redeem a student discount?",
    answer:
      "After verifying your student status, simply click on the 'Get Discount' button on any brand page. You'll receive a promo code or be redirected to the brand's website with the discount applied automatically.",
    category: "Discounts",
  },
  {
    id: "discount-duration",
    question: "How long do student discounts last?",
    answer:
      "Most student discounts are valid as long as you maintain an active, verified student account. Some promotional discounts may have specific expiration dates, which will be clearly indicated.",
    category: "Discounts",
  },
  {
    id: "account-issues",
    question: "I can't log in to my account. What should I do?",
    answer:
      "Try resetting your password using the 'Forgot Password' link. If you're still having trouble, make sure your student email is verified. For further assistance, contact our support team.",
    category: "Account",
  },
  {
    id: "missing-discount",
    question: "Why isn't my discount working?",
    answer:
      "Ensure your student status is verified and your account is active. Some discounts have usage limits or expiration dates. If the issue persists, check if the brand has updated their discount terms or contact our support team.",
    category: "Discounts",
  },
  {
    id: "international-students",
    question: "Do you offer discounts for international students?",
    answer:
      "Yes! International students can access our discounts as long as they have a valid university email address. Some brands may have region-specific offers or restrictions.",
    category: "Eligibility",
  },
  {
    id: "combine-discounts",
    question: "Can I combine student discounts with other promotions?",
    answer:
      "This depends on the brand's policy. Some brands allow combining discounts, while others don't. Check the terms and conditions on the brand's page for specific details.",
    category: "Discounts",
  },
  {
    id: "graduation",
    question: "Can I still use discounts after I graduate?",
    answer:
      "Most student discounts require active student verification. Some brands offer alumni discounts or grace periods after graduation. We recommend taking advantage of discounts while you're still a student.",
    category: "Eligibility",
  },
  {
    id: "suggest-brand",
    question: "How can I suggest a brand for student discounts?",
    answer:
      "We love hearing your suggestions! You can submit brand recommendations through our 'Contact Us' page or by emailing partnerships@uless.co.",
    category: "General",
  },
  {
    id: "discount-types",
    question: "What types of discounts do you offer?",
    answer:
      "We offer a wide range of discounts across categories including technology, clothing, food delivery, entertainment, software, travel, and more. Discounts typically range from 10% to 50% off regular prices.",
    category: "Discounts",
  },
  {
    id: "privacy-concerns",
    question: "How is my student information protected?",
    answer:
      "We take privacy seriously. Your information is encrypted and only used to verify your student status. We never sell your data to third parties. For more details, please review our Privacy Policy.",
    category: "Privacy",
  },
  {
    id: "app-availability",
    question: "Is there a mobile app for Uless?",
    answer:
      "We're currently developing our mobile app! In the meantime, our website is fully optimized for mobile browsing, so you can easily access student discounts on your smartphone or tablet.",
    category: "Platform",
  },
  {
    id: "newsletter-benefits",
    question: "What do I get by subscribing to the newsletter?",
    answer:
      "Newsletter subscribers receive exclusive discount alerts, early access to limited-time offers, and tips for maximizing student savings. We send updates weekly, so you'll never miss a great deal!",
    category: "General",
  },
  {
    id: "browse-categories",
    question: "How do I browse deals by category?",
    answer:
      "You can browse deals by category on our Categories page. Each category page features top brands and exclusive student discounts.",
    category: "Navigation",
  },
  {
    id: "find-brands",
    question: "How do I find a specific brand?",
    answer:
      "You can find a specific brand using the search bar on our website or by browsing our Brands page, which lists all available brands.",
    category: "Navigation",
  },
  {
    id: "saved-deals",
    question: "How do I save a deal for later?",
    answer:
      "To save a deal, click the heart icon on the deal card. You can view all your saved deals on your profile page.",
    category: "Features",
  },
  {
    id: "mobile-access",
    question: "Can I access Uless on my mobile device?",
    answer:
      "Yes, our website is fully responsive and optimized for mobile devices. You can access all features and discounts on your smartphone or tablet.",
    category: "Platform",
  },
  {
    id: "best-tech-deals",
    question: "What are the best tech deals?",
    answer:
      "Currently, our top tech deals include 66% off Adobe Creative Cloud, education pricing on Apple products, free GitHub Pro, and up to 30% off Samsung electronics. Check our Technology category for all tech discounts.",
    category: "Deals",
  },
  {
    id: "free-student-offers",
    question: "Any free offers for students?",
    answer:
      "Yes! We have several free offers including GitHub Pro, Amazon Prime (6-month trial), Canva Pro, and GrubHub+ (1-year free). These offers require student verification to redeem.",
    category: "Deals",
  },
  {
    id: "biggest-discounts",
    question: "Which brands offer the biggest discounts?",
    answer:
      "The biggest student discounts currently available are Adobe (66% off), Spotify (50% off), Walmart+ (50% off), and Hulu (75% off). These premium services offer significant savings for verified students.",
    category: "Deals",
  },
  {
    id: "how-uless-works",
    question: "How does Uless work?",
    answer:
      "Uless connects students with exclusive discounts from top brands. We verify your student status once, then give you access to all available discounts. Simply browse deals by category or brand, click to redeem, and enjoy your savings!",
    category: "General",
  },
  {
    id: "food-delivery-discounts",
    question: "Any food delivery discounts?",
    answer:
      "Yes! We offer student discounts for Uber Eats ($0 delivery + 5% off), DoorDash (50% off DashPass), and GrubHub (free GrubHub+ for 1 year). These can save you significant money on food delivery throughout the school year.",
    category: "Deals",
  },
  {
    id: "clothing-discounts",
    question: "What clothing discounts are available?",
    answer:
      "Popular clothing discounts include 30% off Adidas, 15% off Levi's, 15% off Tommy Hilfiger, 10% off Nike, and 15% off Madewell. Check our Clothing & Accessories category for all fashion deals.",
    category: "Deals",
  },
  {
    id: "verification-time",
    question: "How long does verification take?",
    answer:
      "Student verification typically takes just a few minutes if you use your .edu email address. You'll receive a verification link via email that you'll need to click to complete the process.",
    category: "Account",
  },
  {
    id: "discount-updates",
    question: "How often are discounts updated?",
    answer:
      "We update our discount offerings weekly. New brands and special promotions are added regularly, and we refresh existing deals to ensure they're current. Check back often or subscribe to our newsletter for updates!",
    category: "General",
  },
  {
    id: "streaming-discounts",
    question: "What streaming service discounts do you offer?",
    answer:
      "We offer student discounts on Spotify Premium (40% off), YouTube Premium (33% off), Hulu (75% off), and Amazon Prime Video (included with Prime Student). These can save you over $15/month on entertainment!",
    category: "Deals",
  },
  {
    id: "travel-discounts",
    question: "Any travel discounts for students?",
    answer:
      "Yes! We offer travel discounts including 15% off Amtrak tickets, up to 30% off flights with StudentUniverse, and various hotel and car rental discounts. Perfect for planning spring break or trips home!",
    category: "Deals",
  },
]
