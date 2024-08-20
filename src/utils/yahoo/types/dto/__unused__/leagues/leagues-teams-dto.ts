export type LeaguesTeamsDto = {
  leagues: Leagues
}

export type Leagues = {
  league: League | League[]
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
  isFinished: boolean
  isPlusLeague: boolean
  gameCode: string
  season: number
  teams: Teams
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
  matchupRecapUrl?: string
  matchupRecapTitle?: string
  matchupGrades?: MatchupGrades
  isTied: boolean
  winnerTeamKey: string
  teams: Teams
}

export type Matchups = {
  matchup: Matchup[]
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
  clinchedPlayoffs?: number
  leagueScoringType: ScoringType
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  matchups?: Matchups
  isOwnedByCurrentLogin?: boolean
  winProbability?: number
  teamPoints?: TeamPoints
  teamProjectedPoints?: TeamPoints
}

export type Teams = {
  team: Team[]
}

export type MatchupGrades = {
  matchupGrade: MatchupGrade[]
}

export type MatchupGrade = {
  teamKey: string
  grade: string
}

export type Managers = {
  manager: ManagerElement[] | ManagerElement
}

export type ManagerElement = {
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

export type TeamPoints = {
  coverageType: CoverageType
  week: number
  total: number
}
