import { getToken } from 'next-auth/jwt'
import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname
  const url = req.nextUrl.clone()

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const headers = new Headers(req.headers)
  headers.set('x-current-path', path)

  // Routes that can be visited regardless of auth status.
  const unprotectedRoutes = ['/auth/signin']

  // If user not logged in, redirect any protected routes to home page.
  if (!session) {
    if (unprotectedRoutes?.includes(path)) return NextResponse.next({ headers })
    if (path !== '/') {
      url.pathname = '/'
      return NextResponse.redirect(url, { headers })
    }
  }

  // Redirect home to protected landing page.
  else if (path === '/') {
    url.pathname = '/leagues'
    return NextResponse.redirect(url, { headers })
  }

  return NextResponse.next({ headers })
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public/images
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
