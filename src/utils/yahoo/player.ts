import {
  CategoriesStat,
  Player,
  PlayerName,
  PlayerPosition,
  PlayerStat,
  PlayerStatus,
  PositionType,
  RosterPosition,
  Settings,
  StatModifier,
} from './types/common'
import { sumBy } from 'lodash'

export type StatWithModifier = CategoriesStat & {
  pointValue: StatModifier['value']
}

/** A stat with meta, its associated point value, and the calculated point total.  */
export type DetailedPlayerStat = PlayerStat &
  StatWithModifier & { pointsEarned: number }

export type PlayerWithDetailedStats = Omit<Player, 'playerStats'> & {
  playerStats: { stats: DetailedPlayerStat[]; pointTotal: number }
}

export const getDetailedStats = ({
  player,
  settings,
}: {
  player?: Player
  settings?: Settings
}): DetailedPlayerStat[] => {
  const stats = settings?.statCategories?.stats?.stat || []
  const modifiers = settings?.statModifiers?.stats?.stat || []
  const mappedStats = mapStatsToModifiers({ stats, modifiers })

  const playerStats = player?.playerStats?.stats?.stat || []
  const detailedPlayerStats = playerStats?.map((ps) => {
    const associatedStat = mappedStats?.find(
      (ms) => ms?.statId === ps?.statId,
    ) as StatWithModifier
    const pointsEarned = associatedStat?.pointValue * ps?.value || 0
    return {
      ...associatedStat,
      ...ps,
      pointsEarned,
    } satisfies DetailedPlayerStat
  })
  return detailedPlayerStats
}

export const getPlayerWithDetailedStats = ({
  player,
  settings,
}: {
  player?: Player
  settings?: Settings
}): PlayerWithDetailedStats => {
  let playerStats = player?.playerStats?.stats?.stat || []
  const detailedStats = getDetailedStats({ player, settings })
  const newStats = playerStats?.map(
    (stat) =>
      detailedStats?.find(
        (ds) => ds?.statId === stat?.statId,
      ) as DetailedPlayerStat,
  )

  const pointTotal = sumBy(newStats, (stat) => stat?.pointsEarned)

  return {
    ...player,
    playerStats: { stats: newStats, pointTotal },
  } as PlayerWithDetailedStats
}

export const mapStatsToModifiers = ({
  stats = [],
  modifiers = [],
}: {
  stats: CategoriesStat[]
  modifiers: StatModifier[]
}) => {
  const statsWithModifier: StatWithModifier[] = stats?.map((stat) => {
    const pointValue = modifiers?.find((mod) => mod?.statId === stat?.statId)
      ?.value as number
    return { ...stat, pointValue }
  })
  return statsWithModifier
}

export type PlayersByPositionType = {
  [x in keyof typeof PositionType]?: Player[]
}

/**
 * Returns object of players grouped by position type.
 * Each key is a position type and its value is an array of players of that type.
 */
export const groupPlayersByPositionType = (
  players: Player[] = [],
): PlayersByPositionType => {
  // Offense
  const O = players?.filter(
    (player) => player?.positionType === PositionType?.O,
  )
  // Kicker
  const K = players?.filter(
    (player) => player?.positionType === PositionType?.K,
  )
  // Team Defense
  const DT = players?.filter(
    (player) => player?.positionType === PositionType?.DT,
  )
  // IDP
  const DP = players?.filter(
    (player) => player?.positionType === PositionType?.DP,
  )
  return { O, K, DT, DP }
}

export const formatPositionType = (positionType?: PositionType | string) => {
  switch (positionType) {
    case PositionType.O:
      return 'Offense'
    case PositionType.K:
      return 'Kickers'
    case PositionType.DT:
      return 'Defense/Special Teams'
    case PositionType.DP:
      return 'Defensive Players'
    default:
      return positionType || ''
  }
}

export const formatPlayerName = ({
  name,
  format = 'full',
}: {
  name?: PlayerName
  format?: 'full' | 'short'
}) => {
  const { first, last, full } = name ?? {}
  if (format === 'short') return `${first?.[0]}. ${last}`
  return full || ''
}

export const orderedPlayerPositions: PlayerPosition[] = [
  // Offense
  PlayerPosition.QB,
  PlayerPosition.WR,
  PlayerPosition.RB,
  PlayerPosition.TE,
  // Kicker
  PlayerPosition.K,
  // Team Defense
  PlayerPosition.DEF,
  // IDP
  PlayerPosition.D,
  PlayerPosition.LB,
  PlayerPosition.LBDE,
  PlayerPosition.CB,
  PlayerPosition.DBCB,
  PlayerPosition.S,
  PlayerPosition.DBS,
]

export const orderedPositionTypes: PositionType[] = [
  PositionType.O, // Offense
  PositionType.K, // Kicker
  PositionType.DT, // Team Defense
  PositionType.DP, // IDP
]

/**
 * Whether player's selected position is one of an active roster spot.
 */
export const isStarting = (player?: Player) => {
  if (!player?.selectedPosition) return false
  return !([RosterPosition.BN, RosterPosition.IR] as RosterPosition[]).includes(
    player?.selectedPosition?.position,
  )
}

export const isWarningStatus = (status?: PlayerStatus) =>
  [PlayerStatus.Q, PlayerStatus.P]?.includes(status || '')

export const isDangerStatus = (status?: PlayerStatus) =>
  [
    PlayerStatus.D,
    PlayerStatus.O,
    PlayerStatus.IR,
    PlayerStatus.IRR,
    PlayerStatus.PUPR,
    PlayerStatus.NFIR,
    PlayerStatus.NA,
  ]?.includes(status || '')

// export const playerStatusCategory = () => {}
