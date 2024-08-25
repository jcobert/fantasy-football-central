import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { leagueQuery } from '@/utils/yahoo/queries/league'

import LeagueHome from '@/components/features/leagues/league-home'
import { leagueQueryKey } from '@/components/features/leagues/store/hooks/use-get-league'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

/** @todo generate. */
export const metadata: Metadata = {
  title: buildPageTitle('League'),
}

const Page: FC<{ params: { id: string } }> = async ({ params }) => {
  await authRedirect()

  const leagueKey = params?.id

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: leagueQueryKey.filtered({
      leagueKey,
      leagueResources: ['settings', 'teams', 'standings'],
    }),
    queryFn: () =>
      yahooFetch({
        url: leagueQuery({
          leagueKey,
          leagueResources: ['settings', 'teams', 'standings'],
        }),
        token: accessToken,
      }),
  })

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeagueHome leagueKey={leagueKey} />
      </HydrationBoundary>
    </section>
  )
}

export default Page
