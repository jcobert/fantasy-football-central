export type LeagueSettingsDto = {
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
  scoringType: string
  leagueType: string
  renew: string
  renewed: string
  feloTier: string
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
  settings: Settings
}

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
  rosterPositions: RosterPositions
  statCategories: StatCategories
  statModifiers: StatModifiers
  divisions: Divisions
  usesMedianScore: string
  leaguePremiumFeatures: string
  pickemEnabled: string
  usesFractionalPoints: number
  usesNegativePoints: number
}

export type Divisions = {
  division: Division[]
}

export type Division = {
  divisionId: number
  name: string
}

export type RosterPositions = {
  rosterPosition: RosterPosition[]
}

export type RosterPosition = {
  position: string
  positionType?: PositionType
  count: number
  isStartingPosition: boolean
}

export enum PositionType {
  DP = 'DP',
  Dt = 'DT',
  K = 'K',
  O = 'O',
}

export type StatCategories = {
  stats: StatCategoriesStats
  groups: Groups
}

export type Groups = {
  group: Group[]
}

export type Group = {
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
  statPositionType: StatPositionTypeElement[] | StatPositionTypeElement
}

export type StatPositionTypeElement = {
  positionType: PositionType
  isOnlyDisplayStat?: boolean
}

export type StatModifiers = {
  stats: StatModifiersStats
}

export type StatModifiersStats = {
  stat: ModifierStat[]
}

export type ModifierStat = {
  statId: number
  value: number
}
