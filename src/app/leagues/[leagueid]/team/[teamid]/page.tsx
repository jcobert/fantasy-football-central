import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { PageParams } from '@/utils/types'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { teamQuery } from '@/utils/yahoo/queries/team'

import { teamQueryKey } from '@/components/features/leagues/team/store/hooks/use-get-team'
import TeamPage from '@/components/features/leagues/team/team-page'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

/** @todo generate. */
export const metadata: Metadata = {
  title: buildPageTitle('Team'),
}

const Page: FC<PageParams<{ teamid: string }>> = async ({ params }) => {
  await authRedirect()

  const teamKey = params?.teamid

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: teamQueryKey.filtered({
      teamKey,
      teamResources: ['roster', 'stats', 'matchups'],
    }),
    queryFn: () =>
      yahooFetch({
        url: teamQuery({
          teamKey,
          teamResources: ['roster', 'stats', 'matchups'],
        }),
        token: accessToken,
      }),
  })

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeamPage teamKey={teamKey} />
      </HydrationBoundary>
    </section>
  )
}

export default Page
