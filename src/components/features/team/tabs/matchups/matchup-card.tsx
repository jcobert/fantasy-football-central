import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { MdHistory } from 'react-icons/md'

import { cn } from '@/utils/style'
import { Matchup, MatchupGrade } from '@/utils/yahoo/types/common'

import MatchupTeam from '@/components/features/team/tabs/matchups/matchup-team'

type Props = {
  matchup?: Matchup
  hideActions?: boolean
  heading?: ReactNode
  focusedTeam?: string
  linkTo?: 'matchups' | 'team'
  className?: string
}

const MatchupCard: FC<Props> = ({
  matchup,
  hideActions = false,
  heading,
  focusedTeam,
  linkTo = 'matchups',
  className = '',
}) => {
  const teams = matchup?.teams?.team || []
  const isInProgress = matchup?.status === 'midevent'
  const winner = matchup?.winnerTeamKey

  const historyLink = `/matchups/history?t1=${teams?.[0]?.teamKey}&t2=${teams?.[1]?.teamKey}`

  const defaultHeading = (
    <div className='flex flex-col gap-1'>
      <span className='text-sm'>{`Week ${matchup?.week}`}</span>
      {!!matchup?.matchupRecapTitle && (
        <span className='text-xs text-zinc-800 dark:text-zinc-300'>
          {matchup?.matchupRecapTitle}
        </span>
      )}
    </div>
  )

  let teamGrades: MatchupGrade[] | undefined = [] as unknown as MatchupGrade[]
  if (!!(matchup as Matchup)?.matchupGrades?.matchupGrade?.length) {
    teamGrades = (matchup as Matchup)?.matchupGrades?.matchupGrade
  }

  return (
    <div
      className={cn(
        'border rounded-md shadow p-2 bg-zinc-50 dark:bg-zinc-600 flex flex-col gap-2',
        {
          'border-sky-500': isInProgress,
          className,
        },
      )}
    >
      {heading ?? defaultHeading}
      <div className='flex flex-col'>
        {teams?.map((team) => {
          const grade = teamGrades?.find((t) => t?.teamKey === team?.teamKey)
            ?.grade

          return (
            <MatchupTeam
              key={team?.teamKey}
              team={team}
              grade={grade}
              focusedTeam={focusedTeam}
              linkTo={linkTo}
              winningTeam={winner}
            />
          )
        })}
      </div>

      {/* Actions */}
      {!hideActions && (
        <div className='self-end max-sm:mt-1'>
          <Link
            href={historyLink}
            className='w-fit text-sm flex items-center gap-1 text-sky-700 dark:text-sky-200 dark:hover:text-sky-300 hover:text-sky-800 transition font-medium'
          >
            <MdHistory />
            Matchup history
          </Link>
        </div>
      )}
    </div>
  )
}

export default MatchupCard
