import { SessionToken, YahooAuthTokenSet } from './types'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export const isAccessTokenExpired = (token: SessionToken) => {
  return !!token?.expiresAt && Date.now() > token?.expiresAt * 1000
}

export const refreshAccessToken = async (token: SessionToken) => {
  try {
    const response = await fetch(
      'https://api.login.yahoo.com/oauth2/get_token',
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.YAHOO_CLIENT_ID as string,
          client_secret: process.env.YAHOO_CLIENT_SECRET as string,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken as string,
          redirect_uri: process.env.YAHOO_REDIRECT_URI as string,
        }),
        method: 'POST',
      },
    )

    const tokens = (await response.json()) as YahooAuthTokenSet

    if (!response.ok) throw tokens

    return {
      ...token,
      accessToken: tokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refreshToken: tokens.refresh_token ?? token.refreshToken,
    } as SessionToken
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing access token', error)
    return { ...token, error: 'RefreshAccessTokenError' as const }
  }
}

/**
 * Returns current access token if valid, or refreshes and returns new token if expired.
 * Use in API routes.
 */
export const getAccessToken = async (req: NextRequest) => {
  const token = (await getToken({ req })) as SessionToken
  const session = await getServerSession()

  let newToken: SessionToken | null = null
  if (!token || isAccessTokenExpired(token) || !session?.user) {
    newToken = await refreshAccessToken(token)
  }

  return newToken?.accessToken || token?.accessToken
}
