import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { RouteLoading } from "@/components/loading-indicator"
import "./globals.css"
import { ClientProviders } from "@/components/client-providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatAgent } from "@/components/ai-chat-agent"
import { CookieConsent } from "@/components/cookie-consent"
import { NavigationScrollTop } from "@/components/navigation-scroll-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Uless - Exclusive Student Discounts & Premium Deals",
    template: "%s | Uless - Student Discounts & Deals",
  },
  description:
    "Save up to 60% with verified student discounts on premium brands. Get exclusive deals on tech, entertainment, fashion, food delivery, and more.",
  keywords:
    "student discounts, college deals, student offers, student savings, university discounts, education deals, student perks, student benefits, student discount codes, student coupons, verified student discounts",
  authors: [{ name: "Uless" }],
  creator: "Uless",
  publisher: "Uless",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://uless.co"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-us",
      "es-ES": "/es",
    },
  },
  openGraph: {
    title: "Uless - Exclusive Student Discounts & Premium Deals",
    description:
      "Save up to 60% with verified student discounts on premium brands. Get exclusive deals on tech, entertainment, fashion, food delivery, and more.",
    url: "https://uless.co",
    siteName: "Uless",
    images: [
      {
        url: "https://uless.co/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uless - Student Discounts & Deals",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uless - Exclusive Student Discounts & Premium Deals",
    description:
      "Save up to 60% with verified student discounts on premium brands. Get exclusive deals on tech, entertainment, fashion, food delivery, and more.",
    creator: "@ulessdeals",
    images: ["https://uless.co/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
    yahoo: "verification_token",
    bing: "verification_token",
  },
  category: "Student Discounts",
    generator: 'v0.dev'
}

// Loading fallback components
function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse" />
            <span className="hidden font-bold sm:inline-block">Uless</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function FooterFallback() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="h-20 bg-gray-100 rounded animate-pulse" />
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#5B48D9" />
        <meta name="theme-color" content="#5B48D9" />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          <Suspense fallback={<div />}>
            {/* global route-loading bar */}
            <RouteLoading />
            <NavigationScrollTop>
              <div className="flex flex-col min-h-screen">
                <Suspense fallback={<HeaderFallback />}>
                  <Header />
                </Suspense>
                <main className="flex-1">{children}</main>
                <Suspense fallback={<FooterFallback />}>
                  <Footer />
                </Suspense>
              </div>
              <Suspense fallback={<div />}>
                <CookieConsent />
              </Suspense>
            </NavigationScrollTop>
          </Suspense>
        </ClientProviders>
        <Suspense fallback={<div />}>
          <AIChatAgent />
        </Suspense>
      </body>
    </html>
  )
}
