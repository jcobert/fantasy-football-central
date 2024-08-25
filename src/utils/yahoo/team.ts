import { forceArray } from '../array'
import { NUM_WILDCARDS } from './constants'
import { groupPlayersByPositionType } from './player'
import {
  Division,
  League,
  Matchup,
  Player,
  PositionType,
  RosterPosition,
  RosterPositionSettings,
  Team,
  Teams,
} from './types/common'
import { countBy, groupBy, intersection, omit, sortBy, uniqBy } from 'lodash'

export type TeamWithDivisionRank = Team & {
  divisionRank: number
}

export type TeamsByDivision = {
  teams: TeamWithDivisionRank[]
  division: Division
}

export const rankTeamsByDivision = (
  divisions?: Division[],
  teams?: Teams['team'],
): TeamsByDivision[] => {
  const divisionTeams =
    (divisions || [])?.map((division) => {
      return {
        division: division,
        teams:
          (teams || [])?.filter(
            (team) => team?.divisionId === division?.divisionId,
          ) || [],
      }
    }) || []

  const rankedTeams = divisionTeams?.map((division) => {
    const updatedTeams = division?.teams?.map((team, i) => {
      const divisionRank = i + 1
      return { ...team, divisionRank }
    })
    return { ...division, teams: updatedTeams }
  })

  return rankedTeams
}

export type PlayoffSeeding = { [key: number]: number }

export type PlayoffTeams = {
  divisionLeaders: number[]
  wildcards: number[]
  allPlayoffTeams: number[]
  seeding: PlayoffSeeding
}

export const getPlayoffTeams = (
  teamsByDivision: TeamsByDivision[],
): PlayoffTeams => {
  const allTeams = teamsByDivision?.flatMap((division) => division?.teams)

  const divisionLeaders = sortBy(
    teamsByDivision?.map(
      (division) =>
        division?.teams?.find(
          (team) => team?.divisionRank === 1,
        ) as TeamWithDivisionRank,
    ),
    [(team) => team?.teamStandings?.rank],
  )

  const wildcards = sortBy(
    allTeams?.filter(
      (team) =>
        !divisionLeaders?.map((team) => team?.teamId)?.includes(team?.teamId),
    ),
    [(team) => team?.teamStandings?.rank],
  ).slice(0, NUM_WILDCARDS)

  const divisionLeaderIds = divisionLeaders?.map((team) => team?.teamId)
  const wildcardIds = wildcards?.map((team) => team?.teamId)

  const allPlayoffTeamIds = divisionLeaderIds?.concat(wildcardIds)
  const seeding: PlayoffTeams['seeding'] = Object.create(null)
  allPlayoffTeamIds?.forEach((id, i) => {
    seeding[i + 1] = id
  })

  return {
    divisionLeaders: divisionLeaderIds,
    wildcards: wildcardIds,
    allPlayoffTeams: allPlayoffTeamIds,
    seeding,
  }
}

/**
 * Determines whether two teams are associated (i.e. owned by the same manager(s)).
 * Pass in two teams from different leagues (years). The purpose is to track teams across years.
 */
export const teamsAreAssociated = (team1?: Team, team2?: Team) => {
  if (!team1 || !team2) return false
  const team1Mgrs = forceArray(team1?.managers?.manager)?.map(
    (mgr) => mgr?.guid,
  )
  const team2Mgrs = forceArray(team2?.managers?.manager)?.map(
    (mgr) => mgr?.guid,
  )
  const matches = intersection(team1Mgrs, team2Mgrs)
  return !!matches?.length
}

type FindTeamsParams = [team?: Team, leagues?: League[] | null]
export type TeamWithLeagueInfo = Team & {
  leagueInfo: Omit<League, 'teams'>
}
/**
 * Finds all associated teams across different leagues (i.e. same league but from past years).
 * Compares the manager IDs from the teams to determine which teams are associated.
 * Returns an array of those teams plus the respective league info for added context such as season.
 */
export const findAllAssociatedTeams = (
  team?: Team,
  leagues?: League[] | null,
): TeamWithLeagueInfo[] => {
  if (!team || !leagues?.length) return []
  const leagueTeams = leagues?.flatMap(
    (league) =>
      league?.teams?.team?.map((team) => ({
        ...team,
        leagueInfo: omit(league, 'teams'),
      })),
  ) as TeamWithLeagueInfo[]
  return leagueTeams?.filter((t) => teamsAreAssociated(t, team))
}

export type MatchWithLeagueInfo = Matchup & {
  leagueInfo: Omit<League, 'teams'>
}
/**
 * Finds all matchups from a single team across different leagues (years).
 * Compares the manager IDs from the teams to determine which teams are associated.
 * Returns an array of those matchups plus the respective league info for added context such as season.
 */
export const findAllHistoricalMatchups = (
  team?: FindTeamsParams[0],
  leagues?: FindTeamsParams[1],
  season?: number,
): MatchWithLeagueInfo[] => {
  if (!team || !leagues?.length) return []
  const associatedTeams = findAllAssociatedTeams(team, leagues)

  const allMatchups =
    associatedTeams?.flatMap(
      (tm) =>
        tm?.matchups?.matchup?.map((match) => ({
          ...match,
          leagueInfo: tm?.leagueInfo,
        })) || [],
    ) || []

  if (!!season)
    return allMatchups?.filter(
      (matchup) => matchup?.leagueInfo?.season === season,
    )
  return allMatchups
}

export const getCorrespondingCurrentTeam = (
  teamKey?: string,
  leagues?: FindTeamsParams[1],
): TeamWithLeagueInfo | undefined => {
  if (!teamKey || !leagues) return undefined
  const foundTeam = leagues
    ?.find((hl) => hl?.teams?.team?.find((hlt) => hlt?.teamKey === teamKey))
    ?.teams?.team?.find((ft) => ft?.teamKey === teamKey)

  const correspondingCurrentTeam = findAllAssociatedTeams(
    foundTeam,
    leagues,
  )?.[0]

  return correspondingCurrentTeam
}

export const ROSTER_POSITION_TYPE_MAP: {
  [x in PositionType]: RosterPosition[]
} = {
  O: [
    RosterPosition.QB,
    RosterPosition.WR,
    RosterPosition.RB,
    RosterPosition.TE,
    RosterPosition.WRT,
  ],
  K: [RosterPosition.K],
  DT: [RosterPosition.DEF],
  DP: [RosterPosition.D, RosterPosition.DB],
}

export const orderedRosterPositions: RosterPosition[] = [
  // Offense
  RosterPosition.QB,
  RosterPosition.WR,
  RosterPosition.RB,
  RosterPosition.TE,
  RosterPosition.WRT,
  // Kicker
  RosterPosition.K,
  // Team Defense
  RosterPosition.DEF,
  // IDP
  RosterPosition.D,
  RosterPosition.DB,
  RosterPosition.BN,
  RosterPosition.IR,
]

export const sortRosterPositions = (players?: Player[]) => {
  if (!players) return []
  return sortBy(
    [...players],
    (player) =>
      orderedRosterPositions?.indexOf(player?.selectedPosition?.position),
  )
}

export const determinePositionType = (
  rosterPosition?: RosterPosition,
): PositionType | undefined => {
  if (!rosterPosition) return undefined
  Object.keys(ROSTER_POSITION_TYPE_MAP)?.find(
    (key) =>
      ROSTER_POSITION_TYPE_MAP[
        key as keyof typeof ROSTER_POSITION_TYPE_MAP
      ]?.includes(rosterPosition),
  )
}

export const getEmptyRosterSpots = ({
  rosterPositions = [],
  players = [],
}: {
  rosterPositions?: RosterPositionSettings[]
  players?: Player[]
}) => {
  const filledSpots = players?.map(
    (player) => player?.selectedPosition?.position,
  )

  // Object of unique filled roster spots and total count of each.
  const currentSpots = countBy(filledSpots) as {
    [x in RosterPosition]?: number
  }

  // Compares expected roster spot count to actual/current count.
  const discrepancies: RosterPositionSettings[] = []
  rosterPositions?.forEach((pos) => {
    const currentCount = currentSpots?.[pos?.position]
    if (!currentCount) discrepancies?.push(pos)
    else
      discrepancies?.push({
        ...pos,
        count: pos?.count - currentCount,
      })
  })

  // Filter for positions with a count difference to determine empty spots.
  return discrepancies?.filter(
    (pos) => pos?.count > 0 && pos?.position !== 'IR',
  )
}

/**
 * Returns object of all roster spots grouped by position type. The value of each position type
 * is an array of players (or position data, if a player is not currently assigned to roster spot).
 */
export const getAllRosterSpots = ({
  rosterPositions = [],
  players = [],
}: {
  rosterPositions?: RosterPositionSettings[]
  players?: Player[]
}) => {
  const groupedPlayers = groupPlayersByPositionType(players)
  let allRosterSpots = { ...groupedPlayers }
  const emptySpots = getEmptyRosterSpots({ rosterPositions, players })
  Object.keys(groupedPlayers)?.forEach((key) => {
    const positionType = key as keyof typeof groupedPlayers
    const empty = emptySpots?.find(
      (spot) => spot?.positionType === positionType,
    )

    let emptyPlayers: Pick<Player, 'selectedPosition'>[] = []
    if (empty) {
      for (let i = 0; i < empty?.count; i++) {
        emptyPlayers = emptyPlayers?.concat({
          selectedPosition: {
            position: empty?.position,
          } as Player['selectedPosition'],
        })
      }
    }

    allRosterSpots[positionType] = sortRosterPositions(
      groupedPlayers[positionType]?.concat(emptyPlayers as Player[]),
    )
  })
  return allRosterSpots
}

export const getTeamByKey = (league?: League | null, teamKey?: string) =>
  league?.teams?.team?.find((team) => team?.teamKey === teamKey)

/**
 * Player fetched from team (roster) endpoint includes `selectedPosition`, but not `playerStats`.
 * Player fetched from players endpoint includes `playerStats`, but not `selectedPosition`.
 * This function merges the player data to include both properties,
 * and returns the array of players.
 */
export const insertStatsIntoRoster = (
  team?: Team,
  players: (Player | undefined)[] = [],
) => {
  // Week of provided team roster.
  const rosterWeek = team?.roster?.week
  // Array of players in team roster.
  const rosterPlayers = sortBy(
    team?.roster?.players?.player || [],
    (p) => p?.playerKey,
  )
  // Matching players (with stats) from team's roster.
  const matchedPlayers = uniqBy(
    sortBy(
      players?.filter(
        (player) =>
          !!rosterPlayers
            ?.map((p) => p?.playerKey)
            ?.includes(player?.playerKey as string) &&
          player?.playerStats?.week === rosterWeek,
      ),
      (p) => p?.playerKey,
    ),
    (mp) => mp?.playerKey,
  )
  // Array of updated players - includes stats and selected position data.
  const mergedPlayers = matchedPlayers?.map((p) => {
    const selectedPosition = rosterPlayers?.find(
      (r) => r.playerKey === p?.playerKey,
    )?.selectedPosition
    return { ...p, selectedPosition } as Player
  })
  return mergedPlayers
}

export const groupTeamsByWeekThenKey = (teams: Team[] = []) => {
  const rostersByWeek = groupBy(teams, (r) => r?.roster?.week) as {
    [week: string]: Team[]
  }
  let rostersByWeekThenTeam: {
    [week: string]: {
      [teamKey: string]: Team[]
    }
  } = {}
  Object.keys(rostersByWeek)?.forEach((key) => {
    rostersByWeekThenTeam[key] = groupBy(rostersByWeek[key], (t) => t?.teamKey)
  })
  return rostersByWeekThenTeam
}
