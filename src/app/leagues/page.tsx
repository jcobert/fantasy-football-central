import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { userLeaguesQuery } from '@/utils/yahoo/queries/user-leagues'

import MyLeagues from '@/components/features/leagues/my-leagues'
import { userLeaguesQueryKey } from '@/components/features/leagues/store/hooks/use-get-user-leagues'
import PageLayout from '@/components/layout/page-layout'

import { createQueryClient } from '@/configuration/react-query'
import { generatePageMeta } from '@/configuration/seo'

export const metadata = generatePageMeta({ title: 'My Leagues' })

const Page: FC = async () => {
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
