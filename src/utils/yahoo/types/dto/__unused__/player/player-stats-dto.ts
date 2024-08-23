export type PlayerDto = {
  player: Player
}

export type Player = {
  playerKey: string
  playerId: number
  name: Name
  url: string
  editorialPlayerKey: string
  editorialTeamKey: string
  editorialTeamFullName: string
  editorialTeamAbbr: string
  editorialTeamUrl: string
  byeWeeks: ByeWeeks
  isKeeper: IsKeeper
  uniformNumber: number
  displayPosition: string
  headshot: Headshot
  imageUrl: string
  isUndroppable: boolean
  positionType: string
  eligiblePositions: EligiblePositions
  eligiblePositionsToAdd: string
  hasPlayerNotes: boolean
  hasRecentPlayerNotes: boolean
  playerNotesLastTimestamp: number
  playerStats: PlayerStats
}

export type ByeWeeks = {
  week: number
}

export type EligiblePositions = {
  position: string
}

export type Headshot = {
  url: string
  size: string
}

export type IsKeeper = {
  status: string
  cost: string
}

export type Name = {
  full: string
  first: string
  last: string
  asciiFirst: string
  asciiLast: string
}

export type PlayerStats = {
  coverageType: string
  stats: Stats
}

export type Stats = {
  stat: Stat[]
}

export type Stat = {
  statId: number
  value: number
}
