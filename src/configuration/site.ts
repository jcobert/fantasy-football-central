export const siteConfig = {
  title: 'Fantasy Football Central',
  description: 'A custom Yahoo fantasy football app.',
  url: process.env.NEXT_PUBLIC_SITE_BASE_URL || '',
}

/** Appends the provided pathname to the site's base URL. */
export const canonicalUrl = (path: string) => `${siteConfig?.url}${path}`
