'use client'

import { orderBy } from 'lodash'
import { FC, useEffect, useMemo, useState } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'

import { SortButtonMeta, sortIconMap } from '@/utils/common'
import { cn } from '@/utils/style'
import { getPlayoffTeams, rankTeamsByDivision } from '@/utils/yahoo/team'
import { League, Team } from '@/utils/yahoo/types/common'

import Button from '@/components/common/button'
import Collapsible from '@/components/common/collapsible'
import Tabs from '@/components/common/tabs'
import StandingsByDivision from '@/components/features/league/standings/standings-by-division'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import TeamCard, { TeamSortMetric } from '@/components/features/team/team-card'

type Props = {
  leagueKey: League['leagueKey']
}

const Standings: FC<Props> = ({ leagueKey }) => {
  const { response, isFetched } = useGetLeague({
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

  // const [divisionView, setDivisionView] = useState(
  //   leagueSettings?.divisions ? true : false,
  // )

  const [sortType, setSortType] = useState<TeamSortMetric>(
    leagueSettings?.divisions ? 'division' : 'record',
  )

  useEffect(() => {
    if (leagueSettings?.divisions) {
      setSortType('division')
      // setDivisionView(true)
    }
  }, [isFetched])

  // const sortTypeOptions = useMemo(() => {
  //   const opts = [
  //     { value: 'division', label: 'Division' },
  //     { value: 'record', label: 'Record' },
  //     { value: 'pointsFor', label: 'Points For' },
  //     { value: 'pointsAgainst', label: 'Points Against' },
  //     {
  //       value: 'pointDifferential',
  //       label: 'Point Differential',
  //     },
  //   ] satisfies SelectOption<typeof sortType>[]
  //   return !leagueSettings?.divisions ? opts?.slice(1) : opts
  // }, [leagueSettings?.divisions])

  const sortButtons = useMemo(() => {
    const opts = [
      {
        sortType: 'division',
        label: 'Division Rank',
        iconType: 'numeric',
      },
      {
        sortType: 'record',
        label: 'Overall Record',
        iconType: 'numeric',
      },
      {
        sortType: 'pointsFor',
        label: 'Points For',
        iconType: 'numeric',
      },
      {
        sortType: 'pointsAgainst',
        label: 'Points Against',
        iconType: 'numeric',
      },
      {
        sortType: 'pointDifferential',
        label: 'Point Differential',
        iconType: 'numeric',
      },
    ] satisfies SortButtonMeta<typeof sortType>[]
    return !leagueSettings?.divisions ? opts?.slice(1) : opts
  }, [leagueSettings?.divisions])

  const sortedTeams = useMemo(() => {
    let sortedTeams = teams || []
    switch (sortType) {
      case 'pointsFor':
        sortedTeams = orderBy(
          teams,
          [(team) => team?.teamStandings?.pointsFor],
          'desc',
        )
        break
      case 'pointsAgainst':
        sortedTeams = orderBy(
          teams,
          [(team) => team?.teamStandings?.pointsAgainst],
          'desc',
        )
        break
      case 'pointDifferential':
        sortedTeams = orderBy(
          teams,
          [
            (team) =>
              (team?.teamStandings?.pointsFor ?? 0) -
              (team?.teamStandings?.pointsAgainst ?? 0),
          ],
          'desc',
        )
        break
      case 'record':
      default:
        break
    }
    return sortedTeams
  }, [sortType])

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

  return (
    <div>
      <Tabs
        tabs={[
          // Standings
          {
            trigger: <span className='py-2 font-medium'>Standings</span>,
            content: (
              <div className='flex flex-col gap-4'>
                {/* <div className='flex items-end justify-between gap-6 pr-2'>
                  <SelectInput
                    id='sortType'
                    label='Sort by'
                    className='w-full sm:w-fit sm:min-w-48'
                    options={sortTypeOptions}
                    value={sortTypeOptions?.find(
                      (opt) => opt?.value === sortType,
                    )}
                    onChange={(opt: SelectOption<typeof sortType>) => {
                      setSortType(opt?.value)
                    }}
                    isSearchable={false}
                    menuPortalTarget={null}
                  />
                </div> */}
                <Collapsible
                  header='Sort'
                  triggerIcon={
                    <MdOutlineExpandMore className='text-xl text-sky-600 dark:text-sky-400 transition-transform' />
                  }
                  className='self-end w-full'
                  triggerClassName='border rounded-md px-4 py-1 ml-auto'
                >
                  <div className='border rounded-md p-2 mt-2 flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold'>Sort by</span>
                      <div className='flex max-sm:flex-col sm:items-center gap-1'>
                        {sortButtons?.map((button) => (
                          <Button
                            key={button?.sortType}
                            unstyled
                            className={cn(
                              'border rounded-md py-2 px-4 flex items-center justify-center gap-1 min-w-[6.5rem]',
                              {
                                'text-sky-600 dark:text-sky-400':
                                  button?.sortType === sortType,
                              },
                            )}
                            onClick={() => {
                              setSortType(button?.sortType)
                            }}
                          >
                            <span>{button?.label}</span>
                            {sortType === button?.sortType &&
                              sortIconMap[button?.iconType].descending}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Collapsible>

                {sortType === 'division' ? (
                  <StandingsByDivision
                    teamsByDivision={teamsByDivision}
                    league={league}
                  />
                ) : (
                  <div className='flex flex-col gap-2'>
                    {sortedTeams?.map((team) => (
                      <div
                        key={team?.teamId}
                        className='flex items-center gap-2'
                      >
                        <TeamCard
                          team={team}
                          indicateWildcard
                          pastTeam={!!league?.isFinished}
                          emphasis={sortType}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Footnotes */}
                <div className='flex flex-col gap-1 text-sm my-2'>
                  <span>* First wildcard</span>
                  <span>** Second wildcard</span>
                </div>
              </div>
            ),
          },
          // Playoffs
          {
            trigger: <span className='py-2 font-medium'>Playoffs</span>,
            content: (
              <div className='flex flex-col gap-8'>
                {buildPlayoffBracket()?.map(([team1, team2]) => {
                  return (
                    <div
                      key={`${team1?.teamId}-${team2?.teamId}`}
                      className='flex max-sm:flex-col sm:items-center border rounded-md shadow p-2 gap-x-2 gap-y-4__'
                    >
                      <TeamCard team={team1} pastTeam={!!league?.isFinished} />
                      <span className='shrink-0 flex z-10 self-center justify-center items-center size-6__ w-fit text-center max-sm:rotate-90__ max-sm:shadow-md max-sm:left-1/2 max-sm:absolute__ max-sm:mt-[4.5rem]__ bg-almost-white text-brand-light ring-1 ring-offset-2 ring-brand/70 rounded-full'>
                        <span className='mb-auto text-xl__ leading-none pb-px px-px'>
                          vs
                        </span>
                      </span>
                      <TeamCard team={team2} pastTeam={!!league?.isFinished} />
                    </div>
                  )
                })}
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

export default Standings
