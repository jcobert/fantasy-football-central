'use client'

import { FC } from 'react'

import { getPlayoffTeams, rankTeamsByDivision } from '@/utils/yahoo/team'
import { League, Team } from '@/utils/yahoo/types/common'

import Tabs from '@/components/common/tabs'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import TeamCard from '@/components/features/team/team-card'

type Props = {
  leagueKey: League['leagueKey']
}

const Standings: FC<Props> = ({ leagueKey }) => {
  const { response } = useGetLeague({
    leagueKey,
    resources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })
  const league = response?.data?.league

  const leagueSettings = league?.settings
  const teams = league?.standings?.teams?.team
  const divisions = leagueSettings?.divisions?.division || []

  const teamsByDivision = rankTeamsByDivision(divisions, teams)
  const playoffSeeding = getPlayoffTeams(teamsByDivision)

  // const divisionLeaders = playoffSeeding?.divisionLeaders || []
  // const wildcards = playoffSeeding?.wildcards || []

  const playoffTeams = Object.entries(playoffSeeding?.seeding)?.map(
    ([seed, teamId]) => {
      const team = teams?.find((t) => t?.teamId === teamId) || ({} as Team)
      return { ...team, playoffSeed: Number(seed) }
    },
  )

  const buildPlayoffBracket = () => {
    const teamCount = playoffTeams?.length || 0
    const matchupCount = teamCount / 2
    let matchups: [Team, Team][] = []
    for (let i = 0; i < matchupCount; i++) {
      matchups?.push([
        playoffTeams[i],
        playoffTeams?.[teamCount - 1 - i],
      ] as (typeof matchups)[number])
    }
    return matchups
  }

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
            <TeamCard
              team={team}
              indicateWildcard
              pastTeam={!!league?.isFinished}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Tabs
      tabs={[
        {
          trigger: <span className='py-2 font-medium'>Standings</span>,
          content: (
            <div className='flex w-full flex-col gap-6 py-2__ sm:px-8_ md:px-24_'>
              {teamsByDivision?.map((division) => (
                <div
                  key={division?.division?.divisionId}
                  className='flex flex-col gap-2 dark:bg-zinc-700 p-2 rounded-md border dark:border-zinc-400 shadow'
                >
                  {/* Division Name */}
                  <h2 className='font-semibold text-lg border-b- border-zinc-300'>
                    {division?.division?.name}
                  </h2>
                  {/* Teams */}
                  <div className='flex flex-col gap-2'>
                    {division?.teams?.map((team) => (
                      <div
                        key={team?.teamId}
                        className='flex items-center gap-2'
                      >
                        <TeamCard
                          team={team}
                          indicateWildcard
                          pastTeam={!!league?.isFinished}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footnotes */}
              <div className='flex flex-col gap-1 text-sm'>
                <span>* First wildcard</span>
                <span>** Second wildcard</span>
              </div>
            </div>
          ),
        },
        {
          trigger: <span className='py-2 font-medium'>Playoffs</span>,
          content: (
            <div className='flex flex-col gap-8'>
              {buildPlayoffBracket()?.map(([team1, team2]) => {
                return (
                  <div
                    key={`${team1?.teamId}-${team2?.teamId}`}
                    className='flex max-sm:flex-col sm:items-center border rounded-md shadow p-2 gap-x-2 gap-y-4'
                  >
                    <TeamCard team={team1} pastTeam={!!league?.isFinished} />
                    <span className='shrink-0 flex justify-center items-center size-6 text-center max-sm:rotate-90__ max-sm:shadow-md max-sm:left-1/2 max-sm:absolute max-sm:mt-[4.5rem] bg-almost-white text-brand-light ring-1 ring-offset-2 ring-brand/70 rounded-full'>
                      <span className='mb-auto text-xl leading-none'>vs</span>
                    </span>
                    {/* <AiOutlineSwap className='shrink-0 max-sm:rotate-90 max-sm:shadow-md max-sm:left-1/2 max-sm:absolute max-sm:mt-[4.5rem] bg-almost-white text-xl text-medium-gray ring-1 ring-offset-2 ring-brand/70 rounded-full' /> */}
                    <TeamCard team={team2} pastTeam={!!league?.isFinished} />
                  </div>
                )
              })}
            </div>
          ),
        },
      ]}
    />
  )
}

export default Standings
