import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { authOptions } from '@/utils/auth/config'

import { AuthProvider } from '@/providers/auth-provider'
import QueryProvider from '@/providers/query-provider'
import ThemeProvider from '@/providers/theme-provider'

import { siteConfig } from '@/configuration/site'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // title: {
  //   default: siteConfig.title,
  //   template: `%s | ${siteConfig.title}`,
  // },
  title: siteConfig.title,
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

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${nunito.variable} font-nunito`}>
        <AuthProvider session={session}>
          <QueryProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Toaster
                position='top-right'
                toastOptions={{ success: { duration: 4000 } }}
              />
              <div className='flex flex-col min-h-[100dvh]'>
                {/** @todo Header here */}
                <div className='grow'>{children}</div>
                {/** @todo Footer here */}
              </div>
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
