'use client'

import { range } from 'lodash'
import { FC } from 'react'

import { formatPositionType } from '@/utils/yahoo/player'
import { getAllRosterSpots } from '@/utils/yahoo/team'
import { PositionType, Roster } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { useLeagueStore } from '@/components/features/league/store/league-store'
import PlayerCard from '@/components/features/team/tabs/roster/player-card'

type Props = {
  roster?: Roster
}

const TeamRoster: FC<Props> = ({ roster }) => {
  const leagueKey = useLeagueStore.use.leagueKey()

  const leagueQuery = useGetLeague({
    leagueKey,
    resources: ['settings'],
    queryOptions: { enabled: true },
  })

  const leagueSettings = leagueQuery?.response?.data?.league?.settings

  const rosterPositions = leagueSettings?.rosterPositions?.rosterPosition

  const players = roster?.players?.player || []
  const allRosterSpots = getAllRosterSpots({ players, rosterPositions })

  if (!players?.length)
    return (
      <div className='flex flex-col gap-1 p-4 px-2 border rounded-md border-zinc-400 bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600'>
        <div className='flex flex-col gap-3 p-2 overflow-hidden'>
          {range(1, 9)?.map((i) => (
            <div
              key={i}
              className='flex items-center w-full h-16 gap-2 p-3 rounded-full animate-pulse sm:gap-6 bg-zinc-200 dark:bg-zinc-500'
            >
              <div className='flex-none w-10 h-10 rounded-full bg-zinc-400/30 dark:bg-gray-700/30'></div>
              <div className='flex flex-col gap-1'>
                <div className='h-3 rounded-full w-28 bg-gray-400/30 dark:bg-gray-700/30'></div>
                <div className='w-40 h-3 rounded-full bg-gray-400/30 dark:bg-gray-700/30'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className='flex flex-col gap-8 p-4 px-2 border rounded-md border-zinc-400 bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600'>
      {Object.keys(allRosterSpots)?.map((group) => (
        <div key={group} className='flex flex-col w-full gap-1'>
          <span className='font-medium'>{formatPositionType(group)}</span>
          <div className='flex flex-col gap-2'>
            {allRosterSpots[group as PositionType]?.map((player, i) => (
              <div key={player?.playerId || i}>
                <PlayerCard player={player} empty={!player?.playerId} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamRoster
