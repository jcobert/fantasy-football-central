'use client'

import { FC } from 'react'

import { Team } from '@/utils/yahoo/types/common'

import { useGetTeam } from '@/components/features/leagues/team/store/hooks/use-get-team'

type Props = {
  teamKey: Team['teamKey']
}

const TeamPage: FC<Props> = ({ teamKey }) => {
  const { response } = useGetTeam({
    teamKey,
    teamResources: ['roster', 'stats', 'matchups'],
    queryOptions: { enabled: true },
  })

  const team = response?.data?.team

  return <div>{team?.name}</div>
}

export default TeamPage
