'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'

import { League, Team } from '@/utils/yahoo/types/common'

import {
  setLeagueKey,
  setUserTeams,
} from '@/components/features/league/store/league-store'
import Managers from '@/components/features/team/managers'
import { useGetTeam } from '@/components/features/team/store/hooks/use-get-team'
import TeamTabs from '@/components/features/team/team-tabs'

type Props = {
  teamKey: Team['teamKey']
  leagueKey: League['leagueKey']
}

const TeamPage: FC<Props> = ({ teamKey, leagueKey }) => {
  useEffect(() => {
    setLeagueKey(leagueKey)
  }, [])

  const { response } = useGetTeam({
    teamKey,
    teamResources: [
      'roster',
      'stats',
      'matchups',
      'standings',
      'transactions',
      'draftresults',
    ],
    queryOptions: { enabled: true },
  })

  const team = response?.data?.team

  useEffect(() => {
    if (team?.isOwnedByCurrentLogin) {
      setUserTeams(team?.teamKey)
    }
  }, [team])

  return (
    <div className='flex flex-col gap-8 p-2 pb-8 sm:px-8 md:px-24'>
      <div className='flex flex-col items-center gap-2 mt-2'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            className='object-contain size-14 object-center mx-auto border rounded-full shadow border-zinc-400'
            src={team?.teamLogos?.teamLogo?.url || ''}
            alt='team avatar'
            width={56}
            height={56}
          />
          <h1 className='text-2xl font-bold text-center'>{team?.name}</h1>
        </div>
        <div>
          <Managers team={team} />
        </div>
      </div>
      <TeamTabs team={team} />
    </div>
  )
}

export default TeamPage
