'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'

import { League, Team } from '@/utils/yahoo/types/common'

import { setLeagueKey } from '@/components/features/league/store/league-store'
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
    teamResources: ['roster', 'stats', 'matchups'],
    queryOptions: { enabled: true },
  })

  const team = response?.data?.team

  return (
    <div className='flex flex-col gap-8 p-2 pb-8 sm:px-8 md:px-24'>
      <div className='flex flex-col items-center gap-2'>
        <div className='relative rounded-full size-14'>
          {team ? (
            <Image
              className='object-contain object-center mx-auto border rounded-full shadow border-zinc-400'
              src={team?.teamLogos?.teamLogo?.url || ''}
              alt='team avatar'
              fill
            />
          ) : (
            <div className='w-full h-full rounded-full bg-zinc-400/50 animate-pulse'></div>
          )}
        </div>
        {team ? (
          <h1 className='text-3xl font-bold text-center'>{team?.name}</h1>
        ) : (
          <div className='w-1/2 h-5 my-2 rounded-full bg-zinc-400/50 animate-pulse'></div>
        )}
        <div>
          {team ? (
            <Managers team={team} />
          ) : (
            <div className='w-16 h-4 rounded-full bg-zinc-400/50 animate-pulse'></div>
          )}
        </div>
      </div>
      <TeamTabs team={team} />
    </div>
  )
}

export default TeamPage
