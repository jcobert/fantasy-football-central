import { Metadata } from 'next'
import { FC } from 'react'

import { authRedirect } from '@/utils/auth/helpers'

import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Dashboard'),
}

const Page: FC = async () => {
  await authRedirect()

  return (
    <PageLayout heading='Dashboard'>
      <div></div>
    </PageLayout>
  )
}

export default Page
