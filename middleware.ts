import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Since we're using client-side auth with localStorage,
  // we can't check auth status in middleware (server-side)
  // We'll handle auth checks client-side in the protected pages
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/settings/:path*", "/saved-deals/:path*"],
}

export { default } from "next/server"
