import { League, PlayoffSettings } from './types/common'
import { pickBy, sortBy } from 'lodash'

import { LeagueKey } from '@/stores/use-user-store'

export const sortLeagueKeys = (leagueKeys?: LeagueKey[] | null) => {
  if (!leagueKeys?.length) return []
  return leagueKeys
    ? sortBy(leagueKeys, 'season')
        ?.reverse()
        ?.map((key) => key?.leagueKey || '')
    : []
}

export const getLeagueKeyFromTeamKey = (teamKey?: string) => {
  if (!teamKey) return ''
  const end = teamKey?.indexOf('.t')
  const leagueKey = teamKey?.slice(0, end)
  return leagueKey
}

export const getPlayoffSettings = (leagueSettings?: League | null) => {
  if (!leagueSettings) return {} as PlayoffSettings
  return {
    ...pickBy(leagueSettings?.settings, (_, s) => {
      const key = s?.toLowerCase()
      return key?.includes('playoff') || key?.includes('championship')
    }),
    numTeams: leagueSettings?.numTeams,
    endWeek: leagueSettings?.endWeek,
  } as PlayoffSettings
}

export const getLastPlaceTeams = (league: League | null) => {
  const numTeams = league?.numTeams
  const teams = league?.teams?.team
  if (!numTeams || !teams?.length) return undefined
  // Last and second to last ranks.
  const bottomRanks = [numTeams, numTeams - 1]
  // The two teams in those last two places.
  const bottomTwo = teams?.filter(
    (team) =>
      bottomRanks?.includes(team?.teamStandings?.rank || 0) &&
      !team?.teamStandings?.playoffSeed,
  )

  return bottomTwo
}
