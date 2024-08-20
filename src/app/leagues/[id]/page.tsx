import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { userLeaguesQuery } from '@/utils/yahoo/queries/user-leagues'

import Dashboard from '@/components/features/dashboard/dashboard'
import { userLeaguesQueryKey } from '@/components/features/dashboard/hooks/use-get-user-leagues'
import PageLayout from '@/components/layout/page-layout'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('League'),
}

const Page: FC = async () => {
  await authRedirect()

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: userLeaguesQueryKey.filtered({ leagueResources: ['settings'] }),
    queryFn: () =>
      yahooFetch({
        url: userLeaguesQuery({ leagueResources: ['settings'] }),
        token: accessToken,
      }),
  })

  return (
    <PageLayout heading='League'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>
    </PageLayout>
  )
}

export default Page
