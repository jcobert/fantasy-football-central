export type TeamMatchupsDto = {
  team: Team
}

export type Team = {
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
  leagueScoringType: LeagueScoringType
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  matchups: Matchups
  isOwnedByCurrentLogin?: boolean
}

export enum LeagueScoringType {
  Head = 'head',
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
  feloTier: FeloTier
  isComanager?: boolean
  isCommissioner?: boolean
  isCurrentLogin?: boolean
}

export enum FeloTier {
  Bronze = 'bronze',
  Gold = 'gold',
  Platinum = 'platinum',
  Silver = 'silver',
}

export type Matchups = {
  matchup: Matchup[]
}

export type Matchup = {
  week: number
  weekStart: string
  weekEnd: string
  status: Status
  isPlayoffs: boolean
  isConsolation: boolean
  isMatchupRecapAvailable: boolean
  matchupRecapUrl?: string
  matchupRecapTitle?: string
  matchupGrades?: MatchupGrades
  isTied?: boolean
  winnerTeamKey?: string
  teams: MatchupTeams
}

export type MatchupGrades = {
  matchupGrade: MatchupGrade[]
}

export type MatchupGrade = {
  teamKey: string
  grade: string
}

export enum Status {
  Midevent = 'midevent',
  Postevent = 'postevent',
  Preevent = 'preevent',
}

export type MatchupTeams = {
  team: MatchupTeam[]
}

export type MatchupTeam = {
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
  leagueScoringType: LeagueScoringType
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  winProbability: number
  teamPoints: TeamPPoints
  teamProjectedPoints: TeamPPoints
  isOwnedByCurrentLogin?: boolean
}

export type RosterAdds = {
  coverageType: CoverageType
  coverageValue: number
  value: number
}

export enum CoverageType {
  Week = 'week',
}

export type TeamLogos = {
  teamLogo: TeamLogo
}

export type TeamLogo = {
  size: Size
  url: string
}

export enum Size {
  Large = 'large',
}

export type TeamPPoints = {
  coverageType: CoverageType
  week: number
  total: number
}
