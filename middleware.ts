import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname
  const url = req.nextUrl.clone()

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If user authenticated, redirect home page to dashboard.
  if (path === '/') {
    url.pathname = '/dashboard'
    if (session) return NextResponse.redirect(url)
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
