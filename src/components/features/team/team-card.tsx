'use client'

import Managers from './managers'
import RankBadge from './rank-badge'
import Record from './record'
import StreakBadge from './streak'
import Trend from './trend'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'
import { getLeagueKeyFromTeamKey } from '@/utils/yahoo/league'
import { getPlayoffTeams, rankTeamsByDivision } from '@/utils/yahoo/team'
import { OutcomeTotals, Team } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import ChampionDecoration from '@/components/features/team/champion-decoration'

type Props = {
  team?: Team
  // rank?: number
  record?: Partial<OutcomeTotals>
  disabled?: boolean
  className?: string
  pastTeam?: boolean
}

const TeamCard: FC<Props> = ({
  team,
  // rank,
  record,
  disabled = false,
  className = '',
  pastTeam = false,
}) => {
  const leagueKey = getLeagueKeyFromTeamKey(team?.teamKey)
  const teamUrl = `/leagues/${leagueKey}/team/${team?.teamId}`

  const { response } = useGetLeague({
    leagueKey,
    leagueResources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })

  const league = response?.data?.league

  const leagueSettings = league?.settings
  const teams = league?.teams?.team
  const divisions = leagueSettings?.divisions?.division || []

  const teamsByDivision = rankTeamsByDivision(divisions, teams)
  const playoffSeeding = getPlayoffTeams(teamsByDivision)

  // const divisionLeaders = playoffSeeding?.divisionLeaders || []
  const wildcards = playoffSeeding?.wildcards || []

  // const isDivisionLeader = divisionLeaders?.includes(team?.teamId);
  const isFirstWildcard = team?.teamId === wildcards?.[0]
  const isSecondWildcard = team?.teamId === wildcards?.[1]

  const leagueRank = team?.teamStandings?.rank
  const divisionRank = team?.divisionRank

  const rank = divisionRank ?? leagueRank

  const isLeagueWinner = pastTeam && leagueRank === 1

  if (!team)
    return (
      <div className='h-20 bg-zinc-200 p-4 flex gap-4 items-center animate-pulse rounded-full dark:bg-zinc-600'>
        <div className='w-12 h-12 rounded-full bg-zinc-300'></div>
        <div className='flex flex-col gap-2'>
          <div className='rounded-full bg-zinc-300 h-4 w-32'></div>
          <div className='rounded-full bg-zinc-300 h-4 w-20'></div>
        </div>
      </div>
    )

  const content = (
    <>
      {/* Rank */}
      {rank ? (
        <span
          className={cn(
            'min-w-[3ch] border-r dark:border-zinc-500 py-3 font-bold text-sm text-center- rounded-full- bg-zinc-200- px-1 bg-zinc-300- text-zinc-800-',
            {
              "after:content-['*'] after:text-sm after:font-normal":
                isFirstWildcard && (league?.currentWeek ?? 0) > 1,
              "after:content-['**'] after:text-sm after:font-normal":
                isSecondWildcard && (league?.currentWeek ?? 0) > 1,
            },
          )}
        >
          {rank}
        </span>
      ) : null}

      <div className='flex items-center flex-auto gap-3 flex-wrap'>
        {/* Avatar */}
        <img
          src={team?.teamLogos?.teamLogo?.url}
          alt='team logo'
          className='rounded-full border border-zinc-300 dark:border-zinc-400'
          width={48}
          height={48}
        />

        <div className='flex-auto'>
          <div className='flex items-center w-full gap-3 flex-wrap'>
            <div className='flex flex-col flex-auto truncate'>
              {/* Team Name */}
              <span className='text-lg- font-semibold whitespace-pre-wrap group-hover:text-zinc-800_ dark:group-hover:text-zinc-200_ transition'>
                {team?.name}
              </span>
              {/* Managers */}
              <Managers team={team} />
            </div>
            {/* Streak */}
            <div className='self-start'>
              {!pastTeam ? <StreakBadge team={team} /> : null}
              {pastTeam ? (
                <div>
                  <RankBadge rank={leagueRank} />
                  {isLeagueWinner ? (
                    <ChampionDecoration className='absolute left-1/2' />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {!!team?.teamStandings && (
            <div className='flex items-center gap-4 divide-x'>
              <div className='flex items-center gap-2 flex-wrap'>
                {/* Record */}
                <Record teamKey={team?.teamKey} teamRecord={record} />
                {/* Trend */}
                <Trend team={team} />
              </div>
              {/* Points For */}
              <span className='text-sm pl-3'>
                {team?.teamStandings?.pointsFor?.toLocaleString()} pts
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return disabled ? (
    <div
      className={cn(
        'flex flex-col- flex-auto items-center flex-wrap gap-2 p-1 sm:p-3 border rounded-md transition border-zinc-400- dark:border-zinc-500 group bg-zinc-50 dark:bg-zinc-600',
        {
          // "border-emerald-500": isDivisionLeader,
          'border-amber-400': isLeagueWinner,
          'bg-amber-50': isLeagueWinner,
          'cursor-default': disabled,
          'hover:bg-zinc-200 dark:hover:bg-zinc-500 hover:shadow': !disabled,
          [className]: !!className,
        },
      )}
    >
      {content}
    </div>
  ) : (
    <Link
      href={teamUrl}
      className={cn(
        'flex flex-col- flex-auto items-center flex-wrap gap-2 p-1 sm:p-3 border rounded-md transition border-zinc-400- dark:border-zinc-500 group bg-zinc-50 dark:bg-zinc-600',
        {
          // "border-emerald-500": isDivisionLeader,
          'border-amber-400': isLeagueWinner,
          'bg-amber-50': isLeagueWinner,
          'cursor-default': disabled,
          'hover:bg-zinc-200 dark:hover:bg-zinc-500 hover:shadow': !disabled,
          [className]: !!className,
        },
      )}
    >
      {content}
    </Link>
  )
}

export default TeamCard
