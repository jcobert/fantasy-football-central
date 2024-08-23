import { League, LeagueEndpointResource } from '@/utils/yahoo/types/common'

export type LeagueQueryParams = {
  leagueKey?: League['leagueKey']
  leagueResources?: LeagueEndpointResource[]
  // teamResources?: TeamEndpointResource[]
}

export type LeagueDto = {
  league: League
}

/**
 * Gets all of the user's football leagues. Accepts arrays of league and team resources.
 *
 * `"/users;use_login=1/games;game_codes=nfl/leagues;out={leagueResources}/teams;out={teamResources}"`
 */
export const leagueQuery = (params?: LeagueQueryParams) => {
  const { leagueKey } = params || {}

  const leagueResources = params?.leagueResources?.length
    ? `;out=${params?.leagueResources?.join(',')}`
    : ''
  // const teamResources = params?.teamResources?.length
  //   ? `;out=${params?.teamResources?.join(',')}`
  //   : ''

  return `/league/${leagueKey}${leagueResources}`
}
