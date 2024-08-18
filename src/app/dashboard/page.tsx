import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'

import Dashboard from '@/components/features/dashboard/dashboard'
import {
  USER_LEAGUES_QUERY_URL,
  usersQueryKey,
} from '@/components/features/dashboard/hooks/use-get-user-leagues'
import PageLayout from '@/components/layout/page-layout'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Dashboard'),
}

const Page: FC = async () => {
  await authRedirect()

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: usersQueryKey.leagues,
    queryFn: () =>
      yahooFetch({
        url: USER_LEAGUES_QUERY_URL,
        token: accessToken,
      }),
  })

  return (
    <PageLayout heading='Dashboard'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>
    </PageLayout>
  )
}

export default Page
