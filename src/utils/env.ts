export const isProd = process.env.NODE_ENV === 'production'
export const isLocal = process.env.NODE_ENV === 'development'

export const PUBLIC_ASSET_URL_BASE = isLocal
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_BASE_URL
