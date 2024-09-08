import { create } from 'zustand'

import { League } from '@/utils/yahoo/types/common'
import { createSelectors } from '@/utils/zustand'

export type LeagueStore = {
  leagueKey: League['leagueKey'] | undefined
}

const initialState: LeagueStore = {
  leagueKey: undefined,
}

const leagueStore = create<LeagueStore>()(() => ({ ...initialState }))

export const useLeagueStore = createSelectors(leagueStore)

export const setLeagueKey = (leagueKey: LeagueStore['leagueKey']): void =>
  useLeagueStore.setState({ leagueKey })
