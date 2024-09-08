'use client'

import { groupBy, maxBy, round, sortBy } from 'lodash'
import { FC } from 'react'

import { cn } from '@/utils/style'
import { DraftPick } from '@/utils/yahoo/draft'
import { PlayerPosition } from '@/utils/yahoo/types/common'

type Props = {
  draftPicks?: DraftPick[]
  className?: string
}

const DraftSummary: FC<Props> = ({ draftPicks = [], className = '' }) => {
  const picksByNflTeam = groupBy(
    draftPicks,
    (dp) => dp?.players?.player?.editorialTeamAbbr?.toUpperCase(),
  )

  const draftResultsByNflTeam = Object.keys(picksByNflTeam)?.map((team) => {
    const totalSpend = picksByNflTeam[team]
      ?.map((t) => t?.cost)
      ?.reduce((prev, curr) => prev + curr, 0)
    const averageSpend = round(
      (totalSpend ?? 0) / (picksByNflTeam?.[team]?.length ?? 1),
      0,
    )
    const highestPaid = maxBy(picksByNflTeam[team], 'cost')
    const positionBreakdown = groupBy(
      picksByNflTeam[team]?.map((pick) => pick),
      (data) => data?.players?.player?.primaryPosition,
    ) as { [x in PlayerPosition]: DraftPick[] }
    return {
      team: team,
      picks: picksByNflTeam[team],
      totalSpend,
      averageSpend,
      highestPaid,
      playerCount: picksByNflTeam[team]?.length,
      positionBreakdown,
    }
  })

  // Highest total spend
  const highestTotalSpend = sortBy(
    draftResultsByNflTeam,
    (team) => team?.totalSpend,
  )?.reverse()?.[0]?.totalSpend

  // Teams most spent on
  const highestTotalSpendTeams = draftResultsByNflTeam?.filter(
    (team) => team?.totalSpend === highestTotalSpend,
  )

  // Highest avg. spend
  const highestAverageSpend = sortBy(
    draftResultsByNflTeam,
    (team) => team?.averageSpend,
  )?.reverse()?.[0]?.averageSpend

  // Teams with highest avg. player value
  const highestAverageSpendTeams = draftResultsByNflTeam?.filter(
    (team) => team?.averageSpend === highestAverageSpend,
  )

  // Highest player count
  const highestPlayerCount = sortBy(
    draftResultsByNflTeam,
    (team) => team?.picks?.length,
  )?.reverse()?.[0]?.playerCount

  // Teams with most players drafted
  const highestPlayerCountTeams = draftResultsByNflTeam?.filter(
    (team) => team?.playerCount === highestPlayerCount,
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-4 text-sm p-2 border rounded-md border-zinc-300 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-600',
        {
          [className]: !!className,
        },
      )}
    >
      <div className='text-sm'>
        <h3 className='mb-1 font-medium border-b border-zinc-300 dark:border-zinc-500'>
          NFL Team Stats
        </h3>
        {/* Total Value */}
        <div className='flex items-center gap-2'>
          <span className=''>Highest Total Player Value:</span>
          <div className='flex items-center gap-1'>
            <span>${highestTotalSpend}</span>
            {`(${highestTotalSpendTeams
              ?.map((team) => team?.team)
              ?.join(', ')})`}
          </div>
        </div>

        {/* Average Value */}
        {/* <div className="flex items-center gap-2">
          <span className="">Highest Avg. Player Value:</span>
          <div className="flex items-center gap-1">
            <span>${highestAverageSpend}</span>
            {`(${highestAverageSpendTeams
              ?.map((team) => team?.team)
              ?.join(", ")})`}
          </div>
        </div> */}

        {/* Player Count */}
        <div className='flex items-center gap-2'>
          <span className=''>Most Players Drafted:</span>
          <div className='flex items-center gap-1'>
            <span>{highestPlayerCount}</span>
            {`(${highestPlayerCountTeams
              ?.map((team) => team?.team)
              ?.join(', ')})`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftSummary
