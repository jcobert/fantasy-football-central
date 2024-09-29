import { uniq } from 'lodash'
import { create } from 'zustand'

import { League, Team } from '@/utils/yahoo/types/common'
import { createSelectors } from '@/utils/zustand'

export type LeagueStore = {
  leagueKey: League['leagueKey'] | undefined
  userTeams: Team['teamKey'][]
}

const initialState: LeagueStore = {
  leagueKey: undefined,
  userTeams: [],
}

const leagueStore = create<LeagueStore>()(() => ({ ...initialState }))

export const useLeagueStore = createSelectors(leagueStore)

export const setLeagueKey = (leagueKey: LeagueStore['leagueKey']): void =>
  useLeagueStore.setState({ leagueKey })

export const setUserTeams = (
  userTeams: LeagueStore['userTeams'] | LeagueStore['userTeams'][number],
): void =>
  useLeagueStore.setState((prev) => ({
    userTeams: uniq(prev?.userTeams?.concat(userTeams)),
  }))
