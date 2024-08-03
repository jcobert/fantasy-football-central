export type LeagueStandingsDto = {
  league: League
}

export type League = {
  leagueKey: string
  leagueId: number
  name: string
  url: string
  logoUrl: string
  draftStatus: string
  numTeams: number
  editKey: number
  weeklyDeadline: string
  leagueUpdateTimestamp: number
  scoringType: ScoringType
  leagueType: string
  renew: string
  renewed: string
  feloTier: FeloTier
  irisGroupChatId: string
  allowAddToDlExtraPos: number
  isProLeague: boolean
  isCashLeague: boolean
  currentWeek: number
  startWeek: number
  startDate: string
  endWeek: number
  endDate: string
  isPlusLeague: boolean
  gameCode: string
  season: number
  standings: Standings
}

export enum FeloTier {
  Bronze = 'bronze',
  Gold = 'gold',
  Platinum = 'platinum',
  Silver = 'silver',
}

export enum ScoringType {
  Head = 'head',
}

export type Standings = {
  teams: Teams
}

export type Teams = {
  team: Team[]
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
  leagueScoringType: ScoringType
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  teamPoints: TeamPoints
  teamStandings: TeamStandings
  isOwnedByCurrentLogin?: boolean
}

export type Managers = {
  manager: Manager[] | Manager
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

export type RosterAdds = {
  coverageType: RosterAddsCoverageType
  coverageValue: number
  value: number
}

export enum RosterAddsCoverageType {
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

export type TeamPoints = {
  coverageType: TeamPointsCoverageType
  season: number
  total: number
}

export enum TeamPointsCoverageType {
  Season = 'season',
}

export type TeamStandings = {
  rank: number
  playoffSeed?: number
  outcomeTotals: OutcomeTotals
  divisionalOutcomeTotals: OutcomeTotals
  streak: Streak
  pointsFor: number
  pointsAgainst: number
}

export type OutcomeTotals = {
  wins: number
  losses: number
  ties: number
  percentage?: number
}

export type Streak = {
  type: StreakType
  value: number
}

export enum StreakType {
  Loss = 'loss',
  Win = 'win',
}
