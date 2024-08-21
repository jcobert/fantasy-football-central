import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { userLeaguesQuery } from '@/utils/yahoo/queries/user-leagues'

import MyLeagues from '@/components/features/leagues/my-leagues'
import { userLeaguesQueryKey } from '@/components/features/leagues/hooks/use-get-user-leagues'
import PageLayout from '@/components/layout/page-layout'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('My Leagues'),
}

const Page: FC = async () => {
  await authRedirect()

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: userLeaguesQueryKey.all,
    queryFn: () =>
      yahooFetch({
        url: userLeaguesQuery(),
        token: accessToken,
      }),
  })

  return (
    <PageLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyLeagues />
      </HydrationBoundary>
    </PageLayout>
  )
}

export default Page
