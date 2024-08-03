import { Metadata } from 'next'
import { ReactNode } from 'react'

import QueryProvider from '@/providers/query-provider'

import { siteConfig } from '@/configuration/site'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-icon.png',
  // },
  // manifest: '/manifest.webmanifest',
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    type: 'website',
    locale: 'en_US',
    // images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <div className='flex flex-col min-h-[100dvh]'>
            {/** @todo Header here */}
            <div className='grow'>{children}</div>
            {/** @todo Footer here */}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
