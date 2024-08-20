'use client'

import { partition, sortBy } from 'lodash'
import { FC } from 'react'

import { useGetUserLeagues } from '@/components/features/dashboard/hooks/use-get-user-leagues'
import LeagueGroup from '@/components/features/dashboard/league-group'

const Dashboard: FC = () => {
  const { response } = useGetUserLeagues({
    queryOptions: { enabled: true },
  })

  const data = response?.data

  const games = sortBy(
    data?.users?.user?.games?.game?.filter((game) => game?.code === 'nfl'),
    (game) => game?.season,
  )?.reverse()

  const [past, active] = partition(games, (game) => game?.isGameOver)

  // const activeSeason = games?.filter((game) => !game?.isGameOver)?.[0]

  // const activeLeagues = forceArray(activeSeason?.leagues?.league)

  return (
    <div>
      <h1 className='text-3xl font-medium border-b pb-2 mb-8 lg:w-1/2'>
        My Leagues
      </h1>
      <div className='flex flex-col gap-12'>
        {/* Active */}
        <div className='flex flex-col gap-12'>
          {active?.map((game) => (
            <LeagueGroup key={game?.gameId} game={game} />
          ))}
        </div>

        <div className='h-px w-1/2 border-b mx-auto' />

        {/* Past */}
        <div className='flex flex-col gap-4'>
          <h2 className='font-medium text-lg'>Past Seasons</h2>
          <div className='flex flex-col gap-12'>
            {past?.map((game) => (
              <LeagueGroup key={game?.gameId} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
