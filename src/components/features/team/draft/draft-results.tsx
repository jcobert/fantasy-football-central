'use client'

import DraftPickCard from './draft-pick-card'
import { range, sortBy, uniq, uniqBy } from 'lodash'
import { FC, useMemo, useState } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'
import { FormatOptionLabelMeta } from 'react-select'

import {
  ActiveFilter,
  FilterOption,
  SortButtonMeta,
  SortDirection,
  sortIconMap,
} from '@/utils/common'
import { cn } from '@/utils/style'
import {
  DraftFilterType,
  DraftSortType,
  getDraftSummary,
  sortDraftPicks,
} from '@/utils/yahoo/draft'
import { getTeamByKey } from '@/utils/yahoo/team'
import { DraftPick, Team } from '@/utils/yahoo/types/common'

import Button from '@/components/common/button'
import Collapsible from '@/components/common/collapsible'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { useLeagueStore } from '@/components/features/league/store/league-store'
import Managers from '@/components/features/team/managers'
import { useGetTeam } from '@/components/features/team/store/hooks/use-get-team'
import SelectInput, { SelectOption } from '@/components/inputs/select-input'

const sortButtons: SortButtonMeta<DraftSortType>[] = [
  {
    sortType: 'pick',
    label: 'Pick',
    iconType: 'numeric',
  },
  {
    sortType: 'cost',
    label: 'Cost',
    iconType: 'numeric',
  },
  {
    sortType: 'position',
    label: 'Position',
    iconType: 'general',
  },
  {
    sortType: 'name',
    label: 'Name',
    iconType: 'alpha',
  },
]

export type DraftResultsProps = {
  teamKey?: Team['teamKey']
  draftPicks?: DraftPick[]
  view?: 'team' | 'league'
  className?: string
}

const DraftResults: FC<DraftResultsProps> = ({
  teamKey,
  view = 'team',
  className = '',
}) => {
  const leagueKey = useLeagueStore.use.leagueKey()

  const teamQuery = useGetTeam({
    teamKey,
    teamResources: ['draftresults'],
    subresource: 'players',
    queryOptions: { enabled: true },
  })

  const rosterQuery = useGetTeam({
    teamKey,
    teamResources: ['roster'],
    queryOptions: { enabled: true },
  })

  const leagueQuery = useGetLeague({
    leagueKey,
    resources: ['teams'],
    subresources: ['roster'],
    queryOptions: { enabled: view === 'league' },
  })

  const team = teamQuery?.response?.data?.team

  const draftPicks = team?.draftResults?.draftResult

  const [sortType, setSortType] = useState<DraftSortType>('pick')
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending')

  const [activeFilters, setActiveFilters] = useState<
    ActiveFilter<DraftFilterType>[]
  >([])
  const [filteredPicks, setFilteredPicks] = useState<DraftPick[]>(
    draftPicks || [],
  )

  const league = leagueQuery?.response?.data?.league

  // Draft summary stats
  const {
    draftResultsByNflTeam,
    draftResultsByPosition,
    draftResultsByFantasyTeam,
  } = getDraftSummary(draftPicks, {
    team: rosterQuery?.response?.data?.team,
    league,
  })

  const picks = useMemo(() => {
    return sortDraftPicks(
      !activeFilters?.length ? draftPicks : filteredPicks,
      sortType,
      sortDirection,
    )
  }, [
    sortType,
    sortDirection,
    JSON.stringify(draftPicks),
    JSON.stringify(filteredPicks),
    JSON.stringify(activeFilters),
  ])

  const handleSortClick = (type: DraftSortType) => {
    setSortType(type)
    if (type !== sortType)
      setSortDirection(type === 'cost' ? 'descending' : 'ascending')
    else
      setSortDirection((dir) =>
        dir === 'ascending' ? 'descending' : 'ascending',
      )
  }

  const filterOptions = useMemo(() => {
    return [
      {
        filterType: 'leagueTeam',
        label: 'Fantasy Team',
        inputType: 'select',
        options: sortBy(
          uniq(draftPicks?.map((pick) => pick?.teamKey))?.map((opt) => ({
            value: opt,
            label: getTeamByKey(league, opt)?.name,
          })),
          (t) => t?.label?.toLowerCase(),
        ),
        selectProps: {
          formatOptionLabel: (
            opt: SelectOption,
            meta: FormatOptionLabelMeta<SelectOption>,
          ) => {
            const team = getTeamByKey(league, opt?.value)
            return (
              <div className='flex items-center gap-2'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={team?.teamLogos?.teamLogo?.url}
                  alt='team logo'
                  className='rounded-full border border-zinc-300 dark:border-zinc-400'
                  width={24}
                  height={24}
                />
                <div className='flex flex-col'>
                  <span>{team?.name}</span>
                  <Managers
                    team={team}
                    className={cn({
                      '!text-white':
                        meta?.selectValue[0]?.value === opt?.value &&
                        meta?.context === 'menu',
                      'dark:text-zinc-300': meta?.context === 'value',
                    })}
                  />
                </div>
              </div>
            )
          },
          isClearable: true,
          isSearchable: false,
        },
      },
      {
        filterType: 'nflTeam',
        label: 'NFL Team',
        inputType: 'select',
        options: uniq(
          draftPicks?.map((pick) => pick?.players?.player?.editorialTeamAbbr),
        )
          ?.sort()
          ?.map((opt) => ({ value: opt, label: opt?.toUpperCase() })),
        selectProps: { isClearable: true, isSearchable: false },
      },
      {
        filterType: 'position',
        label: 'Position',
        inputType: 'select',
        options: uniq(
          draftPicks?.map((pick) => pick?.players?.player?.primaryPosition),
        )
          ?.sort()
          ?.map((opt) => ({ value: opt, label: opt?.toUpperCase() })),
        selectProps: { isClearable: true, isSearchable: false },
      },
    ] as FilterOption<DraftFilterType>[]
  }, [draftPicks, league])

  const handleFilterChange = (
    filterType: DraftFilterType,
    value: SelectOption,
  ) => {
    const updatedActiveFilters = uniqBy(
      activeFilters
        ?.filter((af) => af?.filterType !== filterType)
        ?.concat({
          filterType,
          value,
        }),
      (af) => af?.filterType,
    )
    setActiveFilters(
      updatedActiveFilters?.filter((af) => af?.filterType === filterType),
    )

    // if (!activeFilters?.some((af) => !!af?.value) || !value)
    if (!value) {
      setFilteredPicks(draftPicks ?? [])
      setActiveFilters([])
    } else {
      const filteredSet = (draftPicks ?? [])?.filter((pick) => {
        let searchValue = ''
        switch (filterType) {
          case 'leagueTeam':
            searchValue = pick?.teamKey
            break
          case 'nflTeam':
            searchValue = pick?.players?.player?.editorialTeamAbbr ?? ''
            break
          case 'position':
            searchValue = pick?.players?.player?.primaryPosition ?? ''
            break
          default:
            break
        }
        return searchValue === value?.value
      })
      setFilteredPicks(filteredSet)
    }
  }

  if (!draftPicks?.length)
    return (
      <div className='flex flex-col gap-1 p-4 px-2 border border-t-0 rounded-md rounded-t-none border-zinc-300 bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600'>
        <div className='flex flex-col gap-3 p-2 overflow-hidden'>
          {range(1, 9)?.map((i) => (
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
      </div>
    )

  return (
    <div
      className={cn(
        'flex flex-col gap-4 text-sm p-2 border rounded-md border-zinc-300 bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600',
        {
          [className]: !!className,
        },
      )}
    >
      {/* Sorting */}
      <Collapsible
        header={<h3>Filter and Sort</h3>}
        triggerIcon={
          <MdOutlineExpandMore className='text-xl text-sky-600 dark:text-sky-400 transition-transform' />
        }
        className='self-end w-full mt-2'
        triggerClassName='border rounded-md px-4 py-1 ml-auto'
      >
        <div className='border rounded-md p-2 mt-2 flex flex-col gap-4'>
          {/* Sorting */}
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
                    handleSortClick(button?.sortType)
                  }}
                >
                  <span>{button?.label}</span>
                  {sortType === button?.sortType &&
                    (sortDirection === 'ascending'
                      ? sortIconMap[button?.iconType].ascending
                      : sortIconMap[button?.iconType].descending)}
                </Button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Filter</span>
            <div className='flex max-sm:flex-col sm:items-center gap-2 w-full'>
              {filterOptions?.map((filter) => {
                const currentValue = activeFilters?.find(
                  (af) => af?.filterType === filter?.filterType,
                )?.value
                if (view === 'team' && filter?.filterType === 'leagueTeam')
                  return null
                return (
                  <SelectInput
                    key={`${activeFilters?.[0]?.filterType}_${filter?.filterType}`}
                    label={filter?.label}
                    className={cn('w-full sm:w-fit flex-auto', {
                      'flex-none': filter?.filterType !== 'leagueTeam',
                      'sm:!max-w-xs': filter?.filterType === 'leagueTeam',
                    })}
                    options={filter?.options}
                    {...filter?.selectProps}
                    value={currentValue ? currentValue : undefined}
                    onChange={(opt: SelectOption<DraftFilterType>) => {
                      handleFilterChange(filter?.filterType, opt)
                    }}
                    classNames={{
                      container: () =>
                        !!currentValue ? 'border border-sky-500 rounded' : '',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </Collapsible>

      {/* Summary - Fantasy Team */}
      {((activeFilters?.[0]?.filterType === 'leagueTeam' && !!picks?.length) ||
        view === 'team') && (
        <div>
          <div className='text-sm flex flex-col gap-4'>
            {view === 'league' && (
              <h3 className='pb-1 font-medium text-base border-b border-zinc-300 dark:border-zinc-500'>
                <div className='flex items-center gap-2'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      getTeamByKey(league, activeFilters?.[0]?.value?.value)
                        ?.teamLogos?.teamLogo?.url
                    }
                    alt='team logo'
                    className='rounded-full border border-zinc-300 dark:border-zinc-400'
                    width={36}
                    height={36}
                  />
                  <div className='flex flex-col'>
                    <span>
                      {
                        getTeamByKey(league, activeFilters?.[0]?.value?.value)
                          ?.name
                      }
                    </span>
                    <Managers
                      team={getTeamByKey(
                        league,
                        activeFilters?.[0]?.value?.value,
                      )}
                    />
                  </div>
                </div>
              </h3>
            )}
            {/* Position Breakdown */}
            <div className='flex flex-col'>
              <h4>Position Breakdown</h4>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs'>
                {draftResultsByFantasyTeam
                  ?.find((team) => team?.team?.teamKey === picks[0]?.teamKey)
                  ?.positionBreakdown?.map((pos) => {
                    return (
                      <div
                        key={pos?.position}
                        className='flex items-center gap-1 border rounded p-1'
                      >
                        <span className='font-medium w-fit min-w-[2.75rem]'>{`${pos?.position} (${pos?.playerCount})`}</span>
                        <div className='flex flex-col'>
                          <span>Total: ${pos?.totalSpend}</span>
                          <span>Average: ${pos?.averageSpend}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Loyalty */}
            <div className='flex flex-col'>
              <h4>Loyalty</h4>
              <div className='flex flex-col gap-2 text-xs'>
                <span>
                  {`Picks still owned: ${draftResultsByFantasyTeam?.find(
                    (team) => team?.team?.teamKey === picks[0]?.teamKey,
                  )?.loyalty
                    ?.loyalPickCount} (${draftResultsByFantasyTeam?.find(
                    (team) => team?.team?.teamKey === picks[0]?.teamKey,
                  )?.loyalty?.loyaltyPercentage}%)`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary - NFL Team */}
      {activeFilters?.[0]?.filterType === 'nflTeam' && !!picks?.length && (
        <div>
          <div className='text-sm'>
            <h3 className='mb-1 font-medium text-base border-b border-zinc-300 dark:border-zinc-500'>
              {' '}
              {picks[0]?.players?.player?.editorialTeamFullName}
            </h3>
            {/* Total Value */}
            <div className='flex items-center gap-2'>
              <span className=''>Total Spent:</span>
              <span>
                $
                {
                  draftResultsByNflTeam?.find(
                    (team) =>
                      team?.team?.toUpperCase() ===
                      picks[0]?.players?.player?.editorialTeamAbbr?.toUpperCase(),
                  )?.totalSpend
                }
              </span>
            </div>

            {/* Average Value */}
            <div className='flex items-center gap-2'>
              <span className=''>Avg. Player Value:</span>
              <span>
                $
                {
                  draftResultsByNflTeam?.find(
                    (team) =>
                      team?.team?.toUpperCase() ===
                      picks[0]?.players?.player?.editorialTeamAbbr?.toUpperCase(),
                  )?.averageSpend
                }
              </span>
            </div>

            {/* Player Count */}
            <div className='flex items-center gap-2'>
              <span className=''>Players Drafted:</span>
              <span>
                {
                  draftResultsByNflTeam?.find(
                    (team) =>
                      team?.team?.toUpperCase() ===
                      picks[0]?.players?.player?.editorialTeamAbbr?.toUpperCase(),
                  )?.playerCount
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Summary - Position */}
      {activeFilters?.[0]?.filterType === 'position' && !!picks?.length && (
        <div>
          <div className='text-sm'>
            <h3 className='mb-1 font-medium text-base border-b border-zinc-300 dark:border-zinc-500'>
              {' '}
              {activeFilters?.[0]?.value?.value}
            </h3>
            {/* Total Value */}
            <div className='flex items-center gap-2'>
              <span className=''>Total Spent:</span>
              <span>
                $
                {
                  draftResultsByPosition?.find(
                    (position) =>
                      position?.position ===
                      picks[0]?.players?.player?.primaryPosition,
                  )?.totalSpend
                }
              </span>
            </div>

            {/* Average Value */}
            <div className='flex items-center gap-2'>
              <span className=''>Avg. Player Value:</span>
              <span>
                $
                {
                  draftResultsByPosition?.find(
                    (position) =>
                      position?.position ===
                      picks[0]?.players?.player?.primaryPosition,
                  )?.averageSpend
                }
              </span>
            </div>

            {/* Player Count */}
            <div className='flex items-center gap-2'>
              <span className=''>Players Drafted:</span>
              <span>
                {
                  draftResultsByPosition?.find(
                    (position) =>
                      position?.position ===
                      picks[0]?.players?.player?.primaryPosition,
                  )?.playerCount
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Picks */}
      {picks?.map((pick) => {
        const draftingTeamPicks = draftPicks?.filter(
          (dp) => dp?.teamKey === pick?.teamKey,
        )
        return (
          <div key={pick?.pick}>
            <div className='flex items-center gap-1'>
              <div className='flex flex-col gap-1 text-2xs text-right'>
                <span
                  className={cn({
                    'min-w-[3ch]': view === 'league',
                    'font-semibold': view === 'team',
                  })}
                >
                  {view === 'team' ? pick?.round : pick?.pick}
                </span>
                {view === 'team' && (
                  <span className='min-w-[3ch] text-zinc-600 dark:text-zinc-400'>
                    {pick?.pick}
                  </span>
                )}
              </div>
              <DraftPickCard
                pick={pick}
                view={view}
                draftingTeamPicks={draftingTeamPicks}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DraftResults
