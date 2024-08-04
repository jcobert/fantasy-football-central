export type UserLeaguesDto = {
  users: Users
}

export type Users = {
  user: User
}

export type User = {
  guid: string
  games: Games
}

export type Games = {
  game: Game[]
}

export type Game = {
  gameKey: number
  gameId: number
  name: string
  code: string
  type: string
  url: string
  season: number
  isRegistrationOver: boolean
  isGameOver: boolean
  isOffseason: boolean
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
  scoringType: string
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
  isFinished?: boolean
  isPlusLeague: boolean
  gameCode: string
  season: number
  teams: Teams
}

export enum FeloTier {
  Bronze = 'bronze',
  Gold = 'gold',
  Silver = 'silver',
}

export type Teams = {
  team: Team
}

export type Team = {
  teamKey: string
  teamId: number
  name: string
  isOwnedByCurrentLogin: boolean
  url: string
  teamLogos: TeamLogos
  numberOfMoves: number
  numberOfTrades: number
  rosterAdds: RosterAdds
  clinchedPlayoffs?: number
  leagueScoringType: string
  hasDraftGrade: boolean
  draftGrade?: string
  draftRecapUrl?: string
  managers: Managers
  waiverPriority?: number
  faabBalance?: number
  auctionBudgetTotal?: number
  auctionBudgetSpent?: number
  divisionId?: number
}

export type Managers = {
  manager: ManagerElement[] | ManagerElement
}

export type ManagerElement = {
  managerId: number
  nickname: string
  guid: string
  imageUrl: string
  feloScore?: number
  feloTier?: FeloTier
  isComanager?: boolean
  isCurrentLogin?: boolean
}

export type RosterAdds = {
  coverageType: string
  coverageValue: number
  value: number
}

export type TeamLogos = {
  teamLogo: TeamLogo
}

export type TeamLogo = {
  size: string
  url: string
}
