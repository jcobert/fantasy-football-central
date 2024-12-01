import { DraftResultsProps } from './draft-results'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'
import { getPicksOnRoster } from '@/utils/yahoo/draft'
import { DraftPick } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { useLeagueStore } from '@/components/features/league/store/league-store'

type Props = {
  pick?: DraftPick
  draftingTeamPicks?: DraftPick[]
} & Pick<DraftResultsProps, 'view'>

const DraftPickCard: FC<Props> = ({ pick, view, draftingTeamPicks = [] }) => {
  const leagueKey = useLeagueStore.use.leagueKey()

  const leagueQuery = useGetLeague({
    leagueKey,
    resources: ['teams'],
    subresources: ['roster'],
    queryOptions: { enabled: view === 'league' },
  })

  const league = leagueQuery?.response?.data?.league

  const player = pick?.players?.player
  const draftingTeam = league?.teams?.team?.find(
    (t) => t?.teamKey === pick?.teamKey,
  )

  const loyalPicks = getPicksOnRoster(draftingTeamPicks, draftingTeam?.roster)

  const isStillOwned = loyalPicks
    ?.map((p) => p?.playerKey)
    ?.includes(pick?.playerKey || '')

  return (
    <div
      className={cn(
        'flex flex-col flex-auto gap-1 border dark:border-zinc-400 rounded-md shadow-sm',
      )}
    >
      {/* Drafting Team */}
      {(view === 'league' || isStillOwned) && (
        <div
          className={cn('flex items-center justify-between rounded-t-md p-2', {
            'pb-0': view === 'team',
            'bg-zinc-100 dark:bg-zinc-500': view === 'league',
          })}
        >
          <div className='flex flex-col'>
            {view === 'league' && (
              <span className='font-semibold text-xs'>
                {draftingTeam?.name}
              </span>
            )}
            {isStillOwned && (
              <span className='text-xs text-sky-600'>Still owns</span>
            )}
          </div>
          {!!draftingTeam && view === 'league' && (
            <Link href={`/league/${draftingTeam?.teamId}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={draftingTeam?.teamLogos?.teamLogo?.url}
                alt='team logo'
                className='rounded-full border border-zinc-300 dark:border-zinc-400'
                width={24}
                height={24}
              />
            </Link>
          )}
        </div>
      )}

      <div className='flex items-center w-full gap-2 p-2 py-1 md:py-2'>
        {/* Roster Spot/Position */}
        <div className='border-r min-w-[4ch] text-center pr-2 py-2 text-xs font-semibold border-zinc-300 dark:border-zinc-400'>
          <span>{player?.displayPosition}</span>
        </div>

        <div className='flex flex-auto items-center gap-1 md:gap-3 overflow-auto'>
          {/* Photo */}
          <div className='w-12 h-12 flex-none rounded-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={player?.headshot?.url || ''}
              alt='player'
              className='object-scale-down object-center w-full h-full rounded-full'
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
              <span className='text-xs'>(Bye: {player?.byeWeeks?.week})</span>
            </div>
          </div>

          {/* Cost */}
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-xs dark:text-zinc-50 whitespace-nowrap'>
              ${pick?.cost}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftPickCard
