'use client'

import { FC, useEffect } from 'react'

import { League, Team } from '@/utils/yahoo/types/common'

import { setLeagueKey } from '@/components/features/league/store/league-store'
import { useGetTeam } from '@/components/features/team/store/hooks/use-get-team'

type Props = {
  teamKey: Team['teamKey']
  leagueKey: League['leagueKey']
}

const TeamPage: FC<Props> = ({ teamKey, leagueKey }) => {
  useEffect(() => {
    setLeagueKey(leagueKey)
  })

  const { response } = useGetTeam({
    teamKey,
    teamResources: ['roster', 'stats', 'matchups'],
    queryOptions: { enabled: true },
  })

  const team = response?.data?.team

  return <div>{team?.name}</div>
}

export default TeamPage
