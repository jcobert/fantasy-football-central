import { Game } from './types/dto/__unused__/user/user-leagues-dto'
import { sortBy } from 'lodash'

import { League } from '@/utils/yahoo/types/common'

export const compileUserTeams = (userGames: Game[] | null) => {
  if (!userGames) return []
  const allLeagues =
    userGames?.flatMap((game) => {
      const leagues = game.leagues?.league
      return Array.isArray(leagues) ? leagues : [leagues]
    }) || []

  const ncflLeagues = allLeagues?.filter(
    (league) => league?.name?.toUpperCase() === 'NCFL',
  )

  return sortBy(
    ncflLeagues?.map((league) => ({
      ...league?.teams?.team,
      leagueInfo: league,
    })),
    (team) => team?.leagueInfo?.season,
  ).reverse()
}

export const getAllLeagueKeys = (userGames: Game[] | null) => {
  const allTeams = compileUserTeams(userGames)
  const allLeagueKeys = allTeams?.map((team) => ({
    leagueKey: team?.leagueInfo?.leagueKey,
    season: team?.leagueInfo?.season,
  }))
  return allLeagueKeys
}

export const getUserOwnedTeams = (league?: League) => {
  if (!league?.teams) return []
  const teams = league?.teams?.team
  return teams
    ?.filter((team) => team?.isOwnedByCurrentLogin)
    ?.map((t) => t?.teamKey)
    ?.sort()
}
