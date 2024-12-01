import { JWT } from 'next-auth/jwt'

export type SessionToken = JWT & {
  /**
   * Yahoo OAuth access token. Expires after 60 minutes.
   */
  accessToken?: string
  refreshToken?: string
  /**
   * Access token expiration date in milliseconds since epoch.
   * Multiply by `1,000` when constructing or comparing to `Date`.
   * @example if ( Date.now() > token.expiresAt * 1000 ) { ... }
   */
  expiresAt?: number
  /**
   * Access token creation date in milliseconds since epoch.
   * Multiply by `1,000` when constructing or comparing to `Date`.
   * @example if ( Date.now() > token.iat * 1000 ) { ... }
   */
  iat?: number
  /**
   * Session expiration date in milliseconds since epoch.
   * Multiply by `1,000` when constructing or comparing to `Date`.
   * @example if ( Date.now() > token.exp * 1000 ) { ... }
   */
  exp?: number
  jti?: string
  error?: string
}

export type YahooAuthTokenSet = {
  access_token: string
  refresh_token: string
  expires_in: number
  error?: string
  error_description?: string
  [key: string]: unknown
}
