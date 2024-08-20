export type LeagueTeamsDto = {
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
  teams: Teams
}

export type Matchup = {
  week: number
  weekStart: string
  weekEnd: string
  status: MatchupStatus
  isPlayoffs: boolean
  isConsolation: boolean
  isMatchupRecapAvailable: boolean
  matchupRecapUrl?: string
  matchupRecapTitle?: string
  matchupGrades?: MatchupGrades
  isTied?: boolean
  winnerTeamKey?: string
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
  leagueScoringType: ScoringType
  hasDraftGrade: boolean
  auctionBudgetTotal: number
  auctionBudgetSpent: number
  managers: Managers
  roster?: Roster
  transactions?: Transactions
  teamStandings?: TeamStandings
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
  grade: Grade
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

export type Roster = {
  coverageType: CoverageType
  week: number
  isEditable: boolean
  players: RosterPlayers
  byeWeekSponsor?: ByeWeekSponsor
}

export type ByeWeekSponsor = {
  sponsorName: string
  lightThemeImageUrlMobile: string
  darkThemeImageUrlMobile: string
  lightThemeImageUrlWeb: string
  darkThemeImageUrlWeb: string
}

export type RosterPlayers = {
  player: Player[]
}

export type Player = {
  playerKey: string
  playerId: number
  name: PlayerName
  url: string
  editorialPlayerKey: string
  editorialTeamKey: string
  editorialTeamFullName: string
  editorialTeamAbbr: string
  editorialTeamUrl: string
  byeWeeks: ByeWeeks
  isKeeper: IsKeeper
  uniformNumber: number | string
  displayPosition: PlayerPosition
  headshot: TeamLogo
  imageUrl: string
  isUndroppable: boolean
  positionType: PositionType
  primaryPosition: PlayerPosition
  eligiblePositions: EligiblePositions
  eligiblePositionsToAdd: string
  hasPlayerNotes?: boolean
  playerNotesLastTimestamp?: number
  selectedPosition: SelectedPosition
  hasRecentPlayerNotes?: boolean
  status?: string
  statusFull?: string
  injuryNote?: string
  isEditable?: boolean
}

export type ByeWeeks = {
  week: number
}

export type EligiblePositions = {
  position: RosterPosition[] | RosterPosition
}

export type TeamLogo = {
  size: Size
  url: string
}

export type IsKeeper = {
  status: string
  cost: string
  kept: string
}

export type PlayerName = {
  full: string
  first: string
  last: string
  asciiFirst: string
  asciiLast: string
}

export type SelectedPosition = {
  coverageType: CoverageType
  week: number
  position: RosterPosition
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

export type TeamPoints = {
  coverageType: CoverageType
  week: number
  total: number
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

export type Transactions = {
  transaction: Transaction[]
}

export type Transaction = {
  transactionKey: string
  transactionId: number
  type: TransactionType
  status: TransactionStatus
  timestamp: number
  players: TransactionPlayers
  faabBid?: number
  traderTeamKey?: string
  traderTeamName?: string
  tradeeTeamKey?: string
  tradeeTeamName?: string
}

export type TransactionPlayers = {
  player: TransactionPlayer[] | TransactionPlayer
}

export type TransactionPlayer = {
  playerKey: string
  playerId: number
  name: PlayerName
  editorialTeamAbbr: string
  displayPosition: PlayerPosition
  positionType: PositionType
  transactionData: TransactionData
}

export type TransactionData = {
  type: TransactionType
  sourceType: TransactionSourceDestination
  destinationType: TransactionSourceDestination
  destinationTeamKey?: string
  destinationTeamName?: string
  sourceTeamKey?: string
  sourceTeamName?: string
}

// **********************
// *        ENUMS       *
// **********************

export enum TransactionSourceDestination {
  Freeagents = 'freeagents',
  Team = 'team',
  Waivers = 'waivers',
}

export enum TransactionType {
  Add = 'add',
  AddDrop = 'add/drop',
  Drop = 'drop',
  Trade = 'trade',
}

export enum TransactionStatus {
  Successful = 'successful',
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
export enum Grade {
  APlus = 'A+',
  A = 'A',
  AMinus = 'A-',
  BPlus = 'B+',
  B = 'B',
  BMinus = 'B-',
  CPlus = 'C+',
  C = 'C',
  CMinus = 'C-',
  DPlus = 'D+',
  D = 'D',
  DMinus = 'D-',
  F = 'F',
}
export enum MatchupStatus {
  Midevent = 'midevent',
  Postevent = 'postevent',
  Preevent = 'preevent',
}
export enum CoverageType {
  Week = 'week',
}
export enum PlayerPosition {
  CB = 'CB',
  D = 'D',
  DBCB = 'DB,CB',
  DBS = 'DB,S',
  DEF = 'DEF',
  K = 'K',
  LB = 'LB',
  LBDE = 'LB,DE',
  QB = 'QB',
  RB = 'RB',
  S = 'S',
  TE = 'TE',
  WR = 'WR',
}
export enum RosterPosition {
  BN = 'BN',
  D = 'D',
  DB = 'DB',
  DEF = 'DEF',
  IR = 'IR',
  K = 'K',
  QB = 'QB',
  RB = 'RB',
  TE = 'TE',
  WRT = 'W/R/T',
  WR = 'WR',
}
export enum Size {
  Large = 'large',
  Small = 'small',
}
export enum PositionType {
  DP = 'DP',
  DT = 'DT',
  K = 'K',
  O = 'O',
}
export enum StreakType {
  Loss = 'loss',
  Win = 'win',
}
