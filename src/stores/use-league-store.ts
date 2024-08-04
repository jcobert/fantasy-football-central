import { PlayoffTeams } from '../utils/yahoo/team'
import { League } from '../utils/yahoo/types/common'
import { LeagueScoreboardDto } from '../utils/yahoo/types/dto/league/league-scoreboard-dto'
import { League as HistoricalLeague } from '../utils/yahoo/types/dto/leagues/leagues-teams-dto'
import { create } from 'zustand'

import { LeagueStandingsDto } from '@/utils/yahoo/types/dto/league/league-standings-dto'
import { createSelectors } from '@/utils/zustand'

export type LeagueStore = {
  leagueSettings: League | null
  leagueStandings: LeagueStandingsDto['league']['standings'] | null
  playoffSeeding: PlayoffTeams | null
  leagueScoreboard: LeagueScoreboardDto['league'] | null
  historicalLeagues: HistoricalLeague[] | null
  leagueTeams: League | null
}

const initialState: LeagueStore = {
  leagueSettings: null,
  leagueStandings: null,
  playoffSeeding: null,
  leagueScoreboard: null,
  historicalLeagues: null,
  leagueTeams: null,
}

const leagueStore = create<LeagueStore>()(() => ({ ...initialState }))

export const useLeagueStore = createSelectors(leagueStore)

export const setLeagueSettings = (
  leagueSettings: LeagueStore['leagueSettings'],
): void => useLeagueStore.setState(() => ({ leagueSettings }))

export const setLeagueStandings = (
  leagueStandings: LeagueStore['leagueStandings'],
): void => useLeagueStore.setState(() => ({ leagueStandings }))

export const setPlayoffSeeding = (
  playoffSeeding: LeagueStore['playoffSeeding'],
): void => useLeagueStore.setState(() => ({ playoffSeeding }))

export const setLeagueScoreboard = (
  leagueScoreboard: LeagueStore['leagueScoreboard'],
): void => useLeagueStore.setState(() => ({ leagueScoreboard }))

export const setHistoricalLeagues = (
  historicalLeagues: LeagueStore['historicalLeagues'],
): void => useLeagueStore.setState(() => ({ historicalLeagues }))

export const setLeagueTeams = (leagueTeams: LeagueStore['leagueTeams']): void =>
  useLeagueStore.setState(() => ({ leagueTeams }))
