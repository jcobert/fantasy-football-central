import { SessionToken, YahooAuthTokenSet } from './types'
import { getServerSession } from 'next-auth'
import { decode, getToken } from 'next-auth/jwt'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const isAccessTokenExpired = (token: SessionToken) => {
  return !!token?.expiresAt && Date.now() > token?.expiresAt * 1000
}

export const refreshToken = async (token: SessionToken) => {
  try {
    const response = await fetch(
      'https://api.login.yahoo.com/oauth2/get_token',
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.YAHOO_CLIENT_ID as string,
          client_secret: process.env.YAHOO_CLIENT_SECRET as string,
          grant_type: 'refresh_token',
          refresh_token: token?.refreshToken as string,
          redirect_uri: process.env.YAHOO_REDIRECT_URI as string,
        }),
        method: 'POST',
      },
    )

    const tokens = (await response.json()) as YahooAuthTokenSet

    if (!response.ok) throw tokens

    return {
      ...token,
      accessToken: tokens?.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + tokens?.expires_in),
      refreshToken: tokens?.refresh_token ?? token?.refreshToken,
    } as SessionToken
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing access token', error)
    return { ...token, error: 'RefreshAccessTokenError' as const }
  }
}

/**
 * Retrieves session token.
 * Provide `cookies` if using in server component or `req` if using in route.
 */
export const getSessionToken = async ({
  cookies,
  req,
}: {
  cookies?: ReadonlyRequestCookies
  req?: NextRequest
}) => {
  let token: SessionToken | null = null
  if (req) {
    token = (await getToken({ req })) as SessionToken
  } else if (cookies) {
    token = (await decode({
      token: cookies.get('__Secure-next-auth.session-token')?.value,
      secret: process.env.NEXTAUTH_SECRET || '',
    })) as SessionToken
  }

  const session = await getServerSession()

  let newToken: SessionToken | null = null
  if (!token || isAccessTokenExpired(token) || !session?.user) {
    newToken = await refreshToken(token!)
  }

  return newToken?.accessToken || token?.accessToken
}

/** Redirects to specified route based on authentication status. */
export const authRedirect = async (options?: {
  url?: string
  authenticated?: boolean
}) => {
  const { authenticated = false, url = '/' } = options || {}
  const session = await getServerSession()
  const isAuthenticated = !!session?.user
  if (!authenticated ? !isAuthenticated : isAuthenticated) {
    redirect(url)
  }
}
