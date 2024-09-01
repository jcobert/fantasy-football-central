import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { getSessionToken } from '@/utils/auth/helpers'
import { PageParams } from '@/utils/types'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { TeamDto, teamQuery } from '@/utils/yahoo/queries/team'

import { teamQueryKey } from '@/components/features/leagues/team/store/hooks/use-get-team'
import TeamPage from '@/components/features/leagues/team/team-page'

import { createQueryClient } from '@/configuration/react-query'
import { generatePageMeta } from '@/configuration/seo'

type Props = PageParams<{ leagueid: string; teamid: string }>

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const accessToken = await getSessionToken({ cookies: cookies() })
  const { leagueid, teamid } = params
  const teamKey = `${leagueid}.t.${teamid}`
  const { data } = await yahooFetch<TeamDto>({
    url: teamQuery({
      teamKey,
    }),
    token: accessToken,
  })
  const team = data?.team
  return generatePageMeta({
    title: team?.name,
    images: forceArray(team?.teamLogos?.teamLogo)?.[0]?.url,
  })
}

const Page: FC<Props> = async ({ params }) => {
  const { leagueid, teamid } = params

  const teamKey = `${leagueid}.t.${teamid}`

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
