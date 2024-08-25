// __________________________________________________________________
// __________________________________________________________________
// **********************
// *        GAME        *
// **********************

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

  // Potential resources
  leagues?: Leagues
  teams?: Teams
}

export type Games = {
  game: Game[]
}

// __________________________________________________________________
// __________________________________________________________________
// **********************
// *       LEAGUE       *
// **********************

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
  isFinished?: boolean

  // Potential resources
  teams?: Teams
  standings?: Standings
  scoreboard?: Scoreboard
  settings?: Settings
  draftResults?: DraftResults
  players?: Players
}

export type Leagues = {
  league: League | League[]
}

/** League standings resource. */
export type Standings = {
  teams: Teams
}

/** League scoreboard resource. */
export type Scoreboard = {
  week: number
  matchups: Matchups
}

/** League DraftResults resource */
export type DraftResults = {
  draftResult: DraftPick[]
}

export type Players = {
  player: Player[] | Player
}

// -----------------------
// *   LEAGUE SETTINGS   *
// -----------------------

/** League settings resource. */
export type Settings = {
  draftType: string
  isAuctionDraft: boolean
  scoringType: string
  persistentUrl: string
  usesPlayoff: number
  hasPlayoffConsolationGames: boolean
  playoffStartWeek: number
  usesPlayoffReseeding: number
  usesLockEliminatedTeams: number
  numPlayoffTeams: number
  numPlayoffConsolationTeams: number
  hasMultiweekChampionship: boolean
  waiverType: string
  waiverRule: string
  usesFaab: number
  draftTime: number
  draftPickTime: number
  postDraftPlayers: string
  maxTeams: number
  waiverTime: number
  tradeEndDate: string
  tradeRatifyType: string
  tradeRejectTime: number
  playerPool: string
  cantCutList: string
  draftTogether: number
  sendbirdChannelUrl: string
  rosterPositions: RosterSettings
  statCategories: StatCategories
  statModifiers: StatModifiers
  divisions?: Divisions
  usesMedianScore: string
  leaguePremiumFeatures: string
  pickemEnabled: string
  usesFractionalPoints: number
  usesNegativePoints: number
}

export type PlayoffSettings = Pick<
  Settings,
  | 'playoffStartWeek'
  | 'hasPlayoffConsolationGames'
  | 'numPlayoffConsolationTeams'
  | 'numPlayoffTeams'
  | 'usesPlayoff'
  | 'usesPlayoffReseeding'
  | 'hasMultiweekChampionship'
> &
  Pick<League, 'endWeek' | 'numTeams'>

export type Divisions = {
  division: Division[]
}

export type Division = {
  divisionId: number
  name: string
}

export type RosterSettings = {
  rosterPosition: RosterPositionSettings[]
}

export type RosterPositionSettings = {
  position: RosterPosition
  positionType?: PositionType
  count: number
  isStartingPosition: boolean
}

export type StatCategories = {
  stats: StatCategoriesStats
  groups: StatGroups
}

export type StatGroups = {
  group: StatGroup[]
}

export type StatGroup = {
  groupName: string
  groupDisplayName: string
  groupAbbr: string
}

export type StatCategoriesStats = {
  stat: CategoriesStat[]
}

export type CategoriesStat = {
  statId: number
  enabled: number
  name: string
  displayName: string
  group: string
  abbr: string
  sortOrder: number
  positionType: PositionType
  statPositionTypes: StatPositionTypes
  isOnlyDisplayStat?: boolean
  isExcludedFromDisplay?: boolean
}

export type StatPositionTypes = {
  statPositionType: StatPositionType[] | StatPositionType
}

export type StatPositionType = {
  positionType: PositionType
  isOnlyDisplayStat?: boolean
}

export type StatModifiers = {
  stats: StatModifiersStats
}

export type StatModifiersStats = {
  stat: StatModifier[]
}

export type StatModifier = {
  statId: number
  value: number
}

// ------------------------
// *     TRANSACTIONS     *
// ------------------------

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

export type TransactionPlayer = Required<
  Pick<
    Player,
    | 'playerKey'
    | 'playerId'
    | 'name'
    | 'editorialTeamAbbr'
    | 'displayPosition'
    | 'positionType'
    | 'transactionData'
  >
>

export type TransactionData = {
  type: TransactionType
  sourceType: TransactionSourceDestination
  destinationType: TransactionSourceDestination
  destinationTeamKey?: string
  destinationTeamName?: string
  sourceTeamKey?: string
  sourceTeamName?: string
}

// __________________________________________________________________
// __________________________________________________________________
// ********************
// *       TEAM       *
// ********************

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
  divisionRank?: number
  managers: Managers
  roster?: Roster
  transactions?: Transactions
  teamStandings?: TeamStandings
  matchups?: Matchups
  draftResults?: DraftResults
  isOwnedByCurrentLogin?: boolean
  /** Applies to `team` within `matchup`. */
  winProbability?: number
  /** Applies to `team` within `matchup`. */
  teamPoints?: TeamPoints
  /** Applies to `team` within `matchup`. */
  teamProjectedPoints?: TeamPoints
}

export type Teams = {
  team: Team[]
}

export type Matchup = {
  week: number
  weekStart: string
  weekEnd: string
  status: MatchupStatus
  isPlayoffs: boolean
  isConsolation: boolean
  isMatchupRecapAvailable: boolean
  teams: Teams
  matchupRecapUrl?: string
  matchupRecapTitle?: string
  matchupGrades?: MatchupGrades
  isTied?: boolean
  winnerTeamKey?: string
}

export type Matchups = {
  matchup: Matchup[]
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

export type RosterAdds = {
  coverageType: CoverageType
  coverageValue: number
  value: number
}

export type TeamLogos = {
  teamLogo: ImageAsset
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

export type DraftPick = {
  pick: number
  round: number
  cost: number
  teamKey: string
  playerKey: string
}

// __________________________________________________________________
// __________________________________________________________________
// ********************
// *      PLAYER      *
// ********************

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
  headshot: ImageAsset
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
  /** Applies to `player` within `transaction`. */
  transactionData?: TransactionData
  /** Applies to `player` fetched with `stats` resource requested. */
  playerStats?: PlayerStats
  /** Applies to `player` fetched within `league` context, and with `stats` resource requested. */
  playerPoints?: PlayerPoints
}

export type ByeWeeks = {
  week: number
}

export type EligiblePositions = {
  position: RosterPosition[] | RosterPosition
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

export type PlayerStats = {
  coverageType: string
  week?: number
  stats: Stats
}

export type PlayerPoints = {
  coverageType: string
  week?: number
  total: number
}

export type Stats = {
  stat: PlayerStat[]
}

export type PlayerStat = {
  statId: number
  value: number
}

// __________________________________________________________________
// __________________________________________________________________
// ********************
// *      COMMON      *
// ********************
export type ImageAsset = {
  size: Size
  url: string
}

export type UserEndpointResource = 'leagues' | 'teams'

export type LeagueEndpointResource =
  | 'metadata'
  | 'roster'
  | 'matchups'
  | 'standings'
  | 'draftresults'
  | 'transactions'
  | 'settings'
  | 'scoreboard'
  | 'teams'

export type TeamEndpointResource =
  | 'metadata'
  | 'stats'
  | 'roster'
  | 'matchups'
  | 'standings'
  | 'draftresults'
  | 'transactions'

export type PlayerEndpointResource = 'metadata' | 'draft_analysis' | 'stats'

// __________________________________________________________________
// __________________________________________________________________
// *********************
// *       ENUMS       *
// *********************

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
