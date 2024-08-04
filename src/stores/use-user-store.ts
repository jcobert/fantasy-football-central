import { User } from '../utils/yahoo/types/dto/user/user-leagues-dto'
import { create } from 'zustand'

import { createSelectors } from '@/utils/zustand'

export type LeagueKey = {
  leagueKey?: string
  season?: number
}

export type UserStore = {
  userId: User['guid'] | null
  userGames: User['games']['game'] | null
  leagueKeys: LeagueKey[] | null
}

const initialState: UserStore = {
  userId: null,
  userGames: null,
  leagueKeys: null,
}

const userStore = create<UserStore>()(() => ({ ...initialState }))

export const useUserStore = createSelectors(userStore)

export const setUserId = (userId: UserStore['userId']): void =>
  useUserStore.setState(() => ({ userId }))

export const setUserGames = (userGames: UserStore['userGames']): void =>
  useUserStore.setState(() => ({ userGames }))

export const setLeagueKeys = (leagueKeys: UserStore['leagueKeys']): void =>
  useUserStore.setState(() => ({ leagueKeys }))
