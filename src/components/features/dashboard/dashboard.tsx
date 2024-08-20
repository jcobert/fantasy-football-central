'use client'

import { sortBy } from 'lodash'
import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'

import { useGetUserLeagues } from '@/components/features/dashboard/hooks/use-get-user-leagues'
import LeagueCard from '@/components/features/dashboard/league-card'

const Dashboard: FC = () => {
  const { response } = useGetUserLeagues({
    queryOptions: { enabled: true },
  })

  const data = response?.data

  const games = sortBy(
    data?.users?.user?.games?.game?.filter((game) => game?.code === 'nfl'),
    (game) => game?.season,
  )?.reverse()

  // const activeSeason = games?.filter((game) => !game?.isGameOver)?.[0]

  // const activeLeagues = forceArray(activeSeason?.leagues?.league)

  return (
    <div>
      <div className='flex flex-col gap-10'>
        {games?.map((game) => {
          const leagues = forceArray(game?.leagues?.league)?.filter(Boolean)
          return (
            <div
              key={game?.gameKey}
              className={cn('flex flex-col gap-2', [
                game?.isGameOver && 'text-gray-400',
              ])}
            >
              <span>{game?.season}</span>
              <div className='flex flex-col gap-3'>
                {leagues?.map((league) => (
                  <LeagueCard key={league?.leagueId} league={league} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
