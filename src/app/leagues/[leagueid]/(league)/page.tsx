import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { getSessionToken } from '@/utils/auth/helpers'
import { PageParams } from '@/utils/types'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { LeagueDto, leagueQuery } from '@/utils/yahoo/queries/league'

import LeagueHome from '@/components/features/league/league-home'
import { leagueQueryKey } from '@/components/features/league/store/hooks/use-get-league'

import { createQueryClient } from '@/configuration/react-query'
import { generatePageMeta } from '@/configuration/seo'

type Props = PageParams<{ leagueid: string }>

export const generateMetadata = async ({ params }: Props) => {
  const accessToken = await getSessionToken({ cookies: cookies() })
  const { leagueid: leagueKey } = params
  const { data } = await yahooFetch<LeagueDto>({
    url: leagueQuery({
      leagueKey,
    }),
    token: accessToken,
  })
  const league = data?.league
  return generatePageMeta({
    title: league?.name,
    images: league?.logoUrl,
  })
}

const Page: FC<PageParams<{ leagueid: string }>> = async ({ params }) => {
  const leagueKey = params?.leagueid

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
