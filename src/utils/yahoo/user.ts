import { Game } from './types/dto/user/user-leagues-dto'
import { sortBy } from 'lodash'

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
