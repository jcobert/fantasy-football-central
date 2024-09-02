import { round } from 'lodash'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'
import { MatchupGrade, Team } from '@/utils/yahoo/types/common'

import Managers from '@/components/features/team/managers'
import Record from '@/components/features/team/record'

type Props = {
  team: Team
  grade?: MatchupGrade['grade']
  focusedTeam?: string
  linkTo?: 'matchups' | 'team'
  winningTeam?: string
}

const MatchupTeam: FC<Props> = ({
  team,
  grade,
  focusedTeam,
  linkTo = 'matchups',
  winningTeam,
}) => {
  const currentPoints = team?.teamPoints?.total
  const projectedPoints = team?.teamProjectedPoints?.total
  const winProbability = !!team?.winProbability
    ? round(team?.winProbability * 100, 2)
    : 0
  const winner = winningTeam === team?.teamKey || winProbability === 100
  const loser = !!winningTeam
    ? winningTeam !== team?.teamKey
    : winProbability === 0

  const isFocusedTeam = team?.teamKey === focusedTeam

  return (
    <Link
      href={
        linkTo === 'matchups'
          ? `/matchups/history?team=${team?.teamKey}`
          : `/league/${team?.teamId}`
      }
      className={cn(
        'border group first-of-type:border-b-0 first-of-type:rounded-t-md last-of-type:rounded-b-md last-of-type:border-t-0 p-2 transition bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600',
        {
          '!bg-emerald-100 dark:!bg-emerald-700 border-emerald-500 dark:border-emerald-300 !border':
            winner && (isFocusedTeam || !focusedTeam),
          '!bg-red-100 dark:!bg-red-700 border-red-500 dark:border-red-300 !border':
            loser && isFocusedTeam,
        },
      )}
    >
      <div className='flex items-center'>
        <div className='flex items-center flex-auto gap-3'>
          {/* Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={team?.teamLogos?.teamLogo?.url}
            alt='team logo'
            className='rounded-full border border-zinc-300 dark:border-zinc-400'
            width={42}
            height={42}
          />
          {/* Team Info */}
          <div className='flex flex-col truncate w-fit'>
            {/* Team Name */}
            <span className='font-medium text-sm whitespace-pre-wrap_ truncate group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition'>
              {team?.name}
            </span>
            {/* Managers */}
            <Managers managers={team?.managers} />
            <Record teamKey={team?.teamKey} size='xs' />
          </div>
        </div>

        <div className='flex items-center'>
          {/* Score */}
          <div className='flex flex-col items-end'>
            <span className='font-bold'>{currentPoints}</span>
            <span className='text-xs text-zinc-600 dark:text-zinc-300'>
              {projectedPoints}
            </span>
          </div>
          {/* Win % or Grade */}
          <div className='text-right min-w-[4ch]'>
            {!!grade ? (
              <span className='text-xs'>{grade}</span>
            ) : (
              <span className='text-2xs'>{winProbability}%</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MatchupTeam
