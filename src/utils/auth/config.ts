import { CallbacksOptions, type NextAuthOptions } from 'next-auth'

import { isAccessTokenExpired, refreshAccessToken } from '@/utils/auth/helpers'
import { SessionToken } from '@/utils/auth/types'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  session: { strategy: 'jwt' },
  providers: [
    {
      id: 'yahoo',
      name: 'Yahoo',
      type: 'oauth',
      clientId: process.env.YAHOO_CLIENT_ID,
      clientSecret: process.env.YAHOO_CLIENT_SECRET,
      wellKnown: 'https://api.login.yahoo.com/.well-known/openid-configuration',
      authorization: {
        params: {
          client_id: process.env.YAHOO_CLIENT_ID,
          redirect_uri: process.env.YAHOO_REDIRECT_URI,
          response_type: 'code',
          // prompt: "login",
          scope: 'openid',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      idToken: true,
      client: {
        authorization_signed_response_alg: 'ES256',
        id_token_signed_response_alg: 'ES256',
        redirect_uris: [process.env.YAHOO_REDIRECT_URI as string],
      },
    },
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({
      token,
      account,
    }: Omit<Parameters<CallbacksOptions['jwt']>['0'], 'token'> & {
      token: SessionToken
    }) {
      // Initial sign-in
      if (account) {
        return {
          ...token,
          accessToken: account?.access_token,
          refreshToken: account?.refresh_token,
          expiresAt: account?.expires_at,
        } as SessionToken
      }
      // Token exists and hasn't expired yet.
      else if (token?.expiresAt && !isAccessTokenExpired(token)) {
        return token
      }
      // Token expired. Refresh token.
      else {
        return await refreshAccessToken(token)
      }
    },
    async session({ session }) {
      return session
    },
  },
}
