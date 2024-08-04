export type TeamRosterDto = {
  team: TeamWithRoster
}

export type TeamWithRoster = {
  teamKey: string
  teamId: number
  name: string
  url: string
  teamLogos: TeamLogos
  divisionId: number
  waiverPriority: number
  faabBalance: number
  numberOfMoves: number
  numberOfTrades: number
  rosterAdds: RosterAdds
  leagueScoringType: string
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  roster: Roster
}

export type Managers = {
  manager: Manager[]
}

export type Manager = {
  managerId: number
  nickname: string
  guid: string
  imageUrl: string
  feloScore: number
  feloTier: string
  isComanager?: boolean
}

export type Roster = {
  coverageType: CoverageType
  week: number
  isEditable: boolean
  players: Players
}

export enum CoverageType {
  Week = 'week',
}

export type Players = {
  player: Player[]
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
  uniformNumber: number | string
  displayPosition: string
  headshot: TeamLogo
  imageUrl: string
  isUndroppable: boolean
  positionType: PositionType
  primaryPosition: string
  eligiblePositions: EligiblePositions
  selectedPosition: SelectedPosition
  hasPlayerNotes?: boolean
  hasRecentPlayerNotes?: boolean
  playerNotesLastTimestamp?: number
  injuryNote?: string
  status?: string
  statusFull?: string
}

export type ByeWeeks = {
  week: number
}

export type EligiblePositions = {
  position: string[] | string
}

export type TeamLogo = {
  url: string
  size: ImageSize
}

export enum ImageSize {
  Large = 'large',
  Small = 'small',
}

export type IsKeeper = {
  status: string
  cost: string
  kept: string
}

export type Name = {
  full: string
  first: string
  last: string
  asciiFirst: string
  asciiLast: string
}

export enum PositionType {
  DP = 'DP',
  Dt = 'DT',
  K = 'K',
  O = 'O',
}

export type SelectedPosition = {
  coverageType: CoverageType
  week: number
  position: string
  isFlex: boolean
}

export type RosterAdds = {
  coverageType: CoverageType
  coverageValue: number
  value: number
}

export type TeamLogos = {
  teamLogo: TeamLogo
}
