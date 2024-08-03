export const siteConfig = {
  title: '',
  description: '',
  url: process.env.SITE_BASE_URL || '',
}

/** Appends the provided pathname to the site's base URL. */
export const canonicalUrl = (path: string) => `${siteConfig?.url}${path}`