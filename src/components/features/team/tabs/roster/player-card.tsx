'use client'

import { round } from 'lodash'
import { FC } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

import { cn } from '@/utils/style'
import { getPlayerWithDetailedStats } from '@/utils/yahoo/player'
import { Player, RosterPosition } from '@/utils/yahoo/types/common'

import LoadingDots from '@/components/common/loading-dots'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { useLeagueStore } from '@/components/features/league/store/league-store'
import { useGetPlayer } from '@/components/features/player/store/hooks/use-get-player'

type Props = {
  player?: Player
  empty?: boolean
  rosterSpot?: RosterPosition
  week?: number | 'current'
}

const PlayerCard: FC<Props> = ({
  player,
  empty = false,
  rosterSpot,
  // week = 'current',
}) => {
  const leagueKey = useLeagueStore.use.leagueKey()

  const leagueQuery = useGetLeague({
    leagueKey,
    resources: ['settings'],
    queryOptions: { enabled: true },
  })

  const league = leagueQuery?.response?.data?.league

  const playerQuery = useGetPlayer({
    playerKey: player?.playerKey,
    resources: ['stats'],
    queryOptions: {
      enabled: !player?.playerStats,
      refetchOnWindowFocus: true,
    },
  })

  const fetchedPlayer = playerQuery?.response?.data?.player

  // const { data, isFetching } = useGetPlayer({
  //   playerKey: player?.playerKey,
  //   resource: 'stats',
  //   filter: 'week',
  //   week,
  //   refetchOnWindowFocus: true,
  //   enabled: !player?.playerStats,
  // })

  const playerWithStats = getPlayerWithDetailedStats({
    player: fetchedPlayer ?? player,
    settings: league?.settings,
  })

  const playerStats = playerWithStats?.playerStats
  const pointTotal = !!player?.playerPoints
    ? player?.playerPoints?.total
    : round(playerStats?.pointTotal || 0, 2)

  const onBench = player?.selectedPosition?.position === 'BN'
  const onIr = player?.selectedPosition?.position === 'IR'
  const starting = !onBench && !onIr

  const noStatus = !player?.status
  const warningStatus = ['Q', 'P']?.includes(player?.status || '')
  const dangerStatus = ['D', 'O', 'IR', 'IR-R', 'PUP-R', 'NA']?.includes(
    player?.status || '',
  )

  return (
    <div
      className={cn(
        'flex flex-col flex-auto gap-1 p-2 py-1 md:py-2 border rounded-md shadow-sm',
        {
          'bg-zinc-50__ dark:border-zinc-400 dark:bg-zinc-500 border-zinc-300':
            noStatus && !onBench && !empty,
          'bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500':
            onBench && !empty,
          'border-orange-500 dark:bg-zinc-500':
            warningStatus && starting && !empty,
          'border-red-300': (onIr || (dangerStatus && starting)) && !empty,
          'bg-red-100 dark:bg-red-300/80 dark:border-red-600': onIr && !empty,
          'bg-red-400 dark:bg-red-700/80 border-red-600 text-white dark:text-white':
            empty,
        },
      )}
    >
      <div className='flex items-center w-full gap-2'>
        {/* Roster Spot/Position */}
        <div className='border-r min-w-[6ch] text-center pr-2 py-2 text-xs font-semibold border-zinc-300 dark:border-zinc-400'>
          <span
            className={cn({
              'text-red-600 dark:text-red-800':
                onIr || (dangerStatus && starting),
            })}
          >
            {rosterSpot || player?.selectedPosition?.position}
          </span>
        </div>

        {empty ? (
          <div className='h-12 flex justify-between items-center text-sm w-full'>
            <span>Empty</span>
            <FiAlertTriangle className='text-xl' />
          </div>
        ) : (
          <>
            <div className='flex flex-auto items-center gap-1 md:gap-3 overflow-auto'>
              {/* Photo */}
              <div className='w-12 h-12 flex-none rounded-full'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={player?.headshot?.url || ''}
                  alt='player'
                  className='object-scale-down object-center w-full h-full rounded-full'
                  // width={48}
                  // height={48}
                />
              </div>

              {/* Info */}
              <div className='flex flex-col flex-auto'>
                {/* Player Name */}
                <h3 className='font-medium text-sm md:text-base dark:text-zinc-50'>
                  {player?.name?.full}
                </h3>
                {/* Position, team, bye */}
                <div className='flex items-center flex-wrap gap-2 text-zinc-600 dark:text-zinc-100'>
                  <span className='text-xs text-zinc-800 dark:text-zinc-50'>
                    {player?.displayPosition}
                  </span>
                  <span className='text-xs uppercase'>
                    {player?.editorialTeamAbbr}
                  </span>
                  <span className='text-xs'>#{player?.uniformNumber}</span>
                  <span className='text-xs'>
                    (Bye: {player?.byeWeeks?.week})
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            {player?.status && (
              <div className='flex flex-col items-center gap-1'>
                <span
                  className={cn(
                    'text-2xs font-bold rounded-xl w-fit min-w-max bg-zinc-100 dark:bg-zinc-200 px-1 py-[2px]',
                    {
                      'text-zinc-800 dark:text-zinc-400': noStatus,
                      'text-orange-500': warningStatus,
                      'text-red-600': dangerStatus,
                    },
                  )}
                >
                  {player?.status}
                </span>
                <span className='text-2xs text-zinc-600 dark:text-zinc-100'>
                  {player?.injuryNote}
                </span>
              </div>
            )}

            {/* Points */}
            {playerQuery?.isFetching ? (
              <LoadingDots size='sm' />
            ) : (
              <div className='flex flex-col items-center gap-1 text-xs'>
                <span className={cn({ 'text-red-700': pointTotal < 0 })}>
                  {pointTotal}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PlayerCard
