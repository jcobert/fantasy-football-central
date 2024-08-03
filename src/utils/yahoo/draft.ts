import { SortDirection } from '../common'
import { orderedPlayerPositions, orderedPositionTypes } from './player'
import {
  DraftPick,
  League,
  Player,
  PlayerPosition,
  PositionType,
  Roster,
} from './types/common'
import { groupBy, intersectionBy, maxBy, round, sortBy } from 'lodash'

export type DraftSortType = 'pick' | 'cost' | 'position' | 'name'

export type DraftFilterType = 'leagueTeam' | 'nflTeam' | 'position'

export type DraftPickWithPlayer = DraftPick & { players?: { player?: Player } }

export const sortDraftPicks = (
  picks: DraftPickWithPlayer[] = [],
  type: DraftSortType = 'pick',
  direction: SortDirection = 'ascending',
) => {
  let sortedPicks: DraftPickWithPlayer[] = []
  let sortDirection = direction
  switch (type) {
    case 'cost':
      sortedPicks = sortBy(picks, [
        'cost',
        'round',
        'pick',
      ] as (keyof DraftPickWithPlayer)[])
      // sortDirection = "descending";
      break
    case 'pick':
      sortedPicks = sortBy(picks, [
        'round',
        'pick',
      ] as (keyof DraftPickWithPlayer)[])
      break
    case 'position':
      sortedPicks = sortBy(picks, (pick) => [
        orderedPositionTypes?.indexOf(
          pick?.players?.player?.positionType as PositionType,
        ),
        orderedPlayerPositions?.indexOf(
          pick?.players?.player?.displayPosition as PlayerPosition,
        ),
      ])
      break
    case 'name':
      sortedPicks = sortBy(picks, (pick) => pick?.players?.player?.name?.full)
      break
    default:
      sortedPicks = picks
      break
  }

  if (sortDirection === 'descending') sortedPicks?.reverse()
  return sortedPicks
}

export const getDraftSummary = (
  draftPicks: DraftPickWithPlayer[] = [],
  leagueTeams: League | null,
) => {
  const picksByNflTeam = groupBy(
    draftPicks,
    (dp) => dp?.players?.player?.editorialTeamAbbr?.toUpperCase(),
  )

  const picksByPosition = groupBy(
    draftPicks,
    (dp) => dp?.players?.player?.primaryPosition,
  )

  const picksByFantasyTeam = groupBy(draftPicks, (dp) => dp?.teamKey)

  const draftResultsByNflTeam = Object.keys(picksByNflTeam)?.map((team) => {
    const teamPicks = picksByNflTeam[team] || []
    const totalSpend = teamPicks
      ?.map((t) => t?.cost)
      ?.reduce((prev, curr) => prev + curr, 0)
    const averageSpend = round(totalSpend / (teamPicks?.length || 1), 0)
    const highestPaid = maxBy(teamPicks, 'cost')
    const positionBreakdown = groupBy(
      teamPicks?.map((pick) => pick),
      (data) => data?.players?.player?.primaryPosition,
    ) as { [x in PlayerPosition]: DraftPickWithPlayer[] }
    return {
      team: team,
      picks: teamPicks,
      totalSpend,
      averageSpend,
      highestPaid,
      playerCount: teamPicks?.length,
      positionBreakdown,
    }
  })

  const draftResultsByPosition = Object.keys(picksByPosition)?.map(
    (position) => {
      const positionPicks = picksByPosition[position] || []
      const totalSpend = positionPicks
        ?.map((t) => t?.cost)
        ?.reduce((prev, curr) => prev + curr, 0)
      const averageSpend = round(totalSpend / (positionPicks?.length || 1), 0)
      const highestPaid = maxBy(positionPicks, 'cost')
      return {
        position,
        picks: positionPicks,
        totalSpend,
        averageSpend,
        highestPaid,
        playerCount: positionPicks?.length,
      }
    },
  )

  const draftResultsByFantasyTeam = Object.keys(picksByFantasyTeam)?.map(
    (team) => {
      const fantasyTeamPicks = picksByFantasyTeam[team] || []
      const totalSpend = fantasyTeamPicks
        ?.map((t) => t?.cost)
        ?.reduce((prev, curr) => prev + curr, 0)
      const averageSpend = round(
        totalSpend / (fantasyTeamPicks?.length || 1),
        0,
      )
      const highestPaid = maxBy(fantasyTeamPicks, 'cost')
      const positionBreakdown = groupBy(
        fantasyTeamPicks?.map((pick) => pick),
        (data) => data?.players?.player?.primaryPosition,
      ) as { [x in PlayerPosition]: DraftPickWithPlayer[] }

      const byPosition = Object.keys(positionBreakdown)?.map((pos) => {
        const position = pos as PlayerPosition
        const totalSpend = positionBreakdown[position]
          ?.map((t) => t?.cost)
          ?.reduce((prev, curr) => prev + curr, 0)
        const averageSpend = round(
          totalSpend / (positionBreakdown[position]?.length || 1),
          0,
        )
        const highestPaid = maxBy(positionBreakdown[position], 'cost')
        return {
          position,
          picks: positionBreakdown[position],
          totalSpend,
          averageSpend,
          highestPaid,
          playerCount: positionBreakdown[position]?.length,
        }
      })

      const playerCount = fantasyTeamPicks?.length

      const currentRoster = leagueTeams?.teams?.team?.find(
        (t) => t?.teamKey === team,
      )?.roster
      const picksOnRoster = getPicksOnRoster(
        picksByFantasyTeam[team],
        currentRoster,
      )
      const loyalPickCount = picksOnRoster?.length
      const loyaltyPercentage = round(
        (loyalPickCount / (playerCount || 1)) * 100,
        0,
      )
      const loyalty = {
        picksOnRoster,
        loyalPickCount,
        loyaltyPercentage,
      }

      return {
        team: team,
        picks: picksByFantasyTeam[team],
        totalSpend,
        averageSpend,
        highestPaid,
        playerCount,
        positionBreakdown: byPosition,
        loyalty,
      }
    },
  )

  // // Highest total spend
  // const highestTotalSpend = sortBy(
  //   draftResultsByNflTeam,
  //   (team) => team?.totalSpend
  // )?.reverse()?.[0]?.totalSpend;

  // // Teams most spent on
  // const highestTotalSpendTeams = draftResultsByNflTeam?.filter(
  //   (team) => team?.totalSpend === highestTotalSpend
  // );

  // // Highest avg. spend
  // const highestAverageSpend = sortBy(
  //   draftResultsByNflTeam,
  //   (team) => team?.averageSpend
  // )?.reverse()?.[0]?.averageSpend;

  // // Teams with highest avg. player value
  // const highestAverageSpendTeams = draftResultsByNflTeam?.filter(
  //   (team) => team?.averageSpend === highestAverageSpend
  // );

  // // Highest player count
  // const highestPlayerCount = sortBy(
  //   draftResultsByNflTeam,
  //   (team) => team?.picks?.length
  // )?.reverse()?.[0]?.playerCount;

  // // Teams with most players drafted
  // const highestPlayerCountTeams = draftResultsByNflTeam?.filter(
  //   (team) => team?.playerCount === highestPlayerCount
  // );

  return {
    draftResultsByNflTeam,
    draftResultsByPosition,
    draftResultsByFantasyTeam,
  }
}

export const getPicksOnRoster = (
  draftPicks: DraftPickWithPlayer[] = [],
  currentRoster?: Roster,
) => {
  if (!currentRoster) return []
  const draftedPlayers = draftPicks?.map((pick) => pick?.players?.player)
  const rosteredPlayers = currentRoster?.players?.player
  const commonPlayers = intersectionBy(
    draftedPlayers,
    rosteredPlayers,
    (player) => player?.playerKey,
  )

  return draftPicks?.filter(
    (dp) => commonPlayers?.includes(dp?.players?.player),
  )
}
