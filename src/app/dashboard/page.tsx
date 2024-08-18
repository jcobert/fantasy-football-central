import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'

import Dashboard from '@/components/features/dashboard/dashboard'
import { userQueryKey } from '@/components/features/dashboard/hooks/use-get-user'
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
    queryKey: userQueryKey.filtered({
      resource: 'leagues',
      subresource: 'teams',
    }),
    queryFn: () =>
      yahooFetch({
        url: '/users;use_login=1/games;game_codes=nfl/leagues/teams',
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
