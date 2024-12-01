import { FC } from 'react'

import AuthLink from '@/components/auth/auth-link'
import PageLayout from '@/components/layout/page-layout'

import { generatePageMeta } from '@/configuration/seo'

export const metadata = generatePageMeta({ title: 'Home' })

const Page: FC = async () => {
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
