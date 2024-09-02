import { FC } from 'react'

import { cn } from '@/utils/style'
import { getLeagueKeyFromTeamKey } from '@/utils/yahoo/league'
import { OutcomeTotals, Team } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'

type Props = {
  // teamId?: Team['teamId']
  teamKey?: string
  teamRecord?: Partial<OutcomeTotals>
  division?: boolean
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const Record: FC<Props> = ({
  teamKey,
  teamRecord,
  division = false,
  className = '',
  size = 'md',
}) => {
  const leagueKey = getLeagueKeyFromTeamKey(teamKey)

  const { response } = useGetLeague({
    leagueKey,
    leagueResources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })

  const leagueStandings = response?.data?.league?.standings

  const team = leagueStandings?.teams?.team?.find((t) => t?.teamKey === teamKey)

  // If teamRecord was provided we'll use that.
  // Otherwise we'll fetch it.
  let record = teamRecord
  if (!teamRecord)
    record = division
      ? team?.teamStandings?.divisionalOutcomeTotals
      : team?.teamStandings?.outcomeTotals

  return (
    <div
      className={cn('flex items-center gap-1', {
        // "animate-pulse invisible_": isFetching,
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
        [className]: !!className,
      })}
    >
      <>
        <span>{record?.wins}</span>
        <span>-</span>
        <span>{record?.losses}</span>
        {!!Number(record?.ties) && (
          <>
            <span>-</span>
            <span>{record?.ties}</span>
          </>
        )}
      </>
    </div>
  )
}

export default Record
