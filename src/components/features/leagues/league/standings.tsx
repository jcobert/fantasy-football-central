'use client'

import { FC } from 'react'

import { rankTeamsByDivision } from '@/utils/yahoo/team'
import { League } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/leagues/store/hooks/use-get-league'
import TeamCard from '@/components/features/leagues/team/team-card'

type Props = {
  leagueKey: League['leagueKey']
}

const Standings: FC<Props> = ({ leagueKey }) => {
  const { response } = useGetLeague({
    leagueKey,
    leagueResources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })
  const league = response?.data?.league

  const leagueSettings = league?.settings
  const teams = league?.standings?.teams?.team
  const divisions = leagueSettings?.divisions?.division || []

  const teamsByDivision = rankTeamsByDivision(divisions, teams)
  // const playoffTeams = getPlayoffTeams(teamsByDivision)

  if (!teams?.length) {
    return (
      <div className='flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-700 p-2 rounded-md border dark:border-zinc-400 shadow'>
        {Array(5)
          ?.fill(0)
          .map((_, i) => (
            <div
              key={i}
              className='h-20 bg-zinc-200 p-4 flex gap-4 items-center animate-pulse rounded-full dark:bg-zinc-600'
            >
              <div className='w-12 h-12 rounded-full bg-zinc-300'></div>
              <div className='flex flex-col gap-2'>
                <div className='rounded-full bg-zinc-300 h-4 w-32'></div>
                <div className='rounded-full bg-zinc-300 h-4 w-20'></div>
              </div>
            </div>
          ))}
      </div>
    )
  }

  if (!leagueSettings?.divisions) {
    return (
      <div className='flex flex-col gap-2'>
        {teams?.map((team) => (
          <div key={team?.teamId} className='flex items-center gap-2'>
            <TeamCard team={team} pastTeam={!!league?.isFinished} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-6 py-2__ sm:px-8_ md:px-24_'>
      {teamsByDivision?.map((division) => (
        <div
          key={division?.division?.divisionId}
          className='flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-700 p-2 rounded-md border dark:border-zinc-400 shadow'
        >
          {/* Division Name */}
          <h2 className='font-semibold text-lg border-b- border-zinc-300'>
            {division?.division?.name}
          </h2>
          {/* Teams */}
          <div className='flex flex-col gap-2'>
            {division?.teams?.map((team) => (
              <div key={team?.teamId} className='flex items-center gap-2'>
                <TeamCard team={team} pastTeam={!!league?.isFinished} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footnotes */}
      <div className='flex flex-col gap-1 text-sm'>
        <span>* First wildcard (3 seed)</span>
        <span>** Second wildcard (4 seed)</span>
      </div>
    </div>
  )
}

export default Standings
