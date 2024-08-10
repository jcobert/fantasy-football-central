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
  await authRedirect({ authorized: true, url: '/dashboard' })

  return (
    <PageLayout>
      <div className='flex flex-col items-center gap-6 sm:px-16 pb-4'>
        <h1 className='text-5xl font-bold'>NCFL Hub</h1>
        <p className='self-start'>
          Welcome to NCFL Hub. This is essentially a customized version of what
          the Yahoo fantasy app/site offers.
        </p>
        <p className='self-start'>
          The aim is to tailor the experience to our league and provide
          information and features that Yahoo is lacking. It is currently in
          active development.
        </p>

        <p className='font-semibold mt-16'>
          Sign in with the same Yahoo account that you use for fantasy.
        </p>
        <div className='w-full max-w-[16rem]'>
          <AuthLink className='mx-auto' />
        </div>
      </div>
    </PageLayout>
  )
}

export default Page
