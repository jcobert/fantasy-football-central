export type LeagueScoreboardDto = {
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
  scoreboard: Scoreboard
}

export enum FeloTier {
  Bronze = 'bronze',
  Gold = 'gold',
  Platinum = 'platinum',
  Silver = 'silver',
}

export type Scoreboard = {
  week: number
  matchups: Matchups
}

export type Matchups = {
  matchup: Matchup[]
}

export enum Status {
  Midevent = 'midevent',
  Postevent = 'postevent',
  Preevent = 'preevent',
}

export type Matchup = {
  week: number
  weekStart: string
  weekEnd: string
  status: Status
  isPlayoffs: boolean
  isConsolation: boolean
  isMatchupRecapAvailable: boolean
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
  winProbability: number
  teamPoints: TeamPPoints
  teamProjectedPoints: TeamPPoints
  isOwnedByCurrentLogin?: boolean
}

export enum ScoringType {
  Head = 'head',
}

export type Managers = {
  manager: Manager[] | Manager
}

export type Manager = {
  managerId: number
  nickname: string
  guid: string
  isCommissioner?: boolean
  imageUrl: string
  feloScore: number
  feloTier: FeloTier
  isComanager?: boolean
  isCurrentLogin?: boolean
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
