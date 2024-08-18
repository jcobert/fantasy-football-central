import { Metadata } from 'next'
import { FC } from 'react'

import { authRedirect } from '@/utils/auth/helpers'

import AuthLink from '@/components/auth/auth-link'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
}

const Page: FC = async () => {
  await authRedirect({ authenticated: true, url: '/dashboard' })

  return (
    <PageLayout>
      <div className='flex flex-col items-center gap-6 sm:px-16__ pb-4__'>
        <h1 className='text-5xl font-bold'>NCFL Hub</h1>
        <p className='max-w-prose text-lg text-pretty'>
          Welcome to NCFL Hub. Your custom home for Yahoo fantasy football.
        </p>

        <AuthLink className='mx-auto mt-8' />
      </div>
    </PageLayout>
  )
}

export default Page
