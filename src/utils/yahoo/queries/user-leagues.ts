import {
  LeagueEndpointResource,
  TeamEndpointResource,
} from '@/utils/yahoo/types/common'

export type UserLeaguesQueryParams = {
  leagueResources?: LeagueEndpointResource[]
  teamResources?: TeamEndpointResource[]
}

/**
 * Gets all of the user's football leagues. Accepts arrays of league and team resources.
 *
 * `"/users;use_login=1/games;game_codes=nfl/leagues;out={leagueResources}/teams;out={teamResources}"`
 */
export const userLeaguesQuery = (params?: UserLeaguesQueryParams) => {
  const leagueResources = params?.leagueResources?.length
    ? `;out=${params?.leagueResources?.join(',')}`
    : ''
  const teamResources = params?.teamResources?.length
    ? `;out=${params?.teamResources?.join(',')}`
    : ''
  return `/users;use_login=1/games;game_codes=nfl/leagues${leagueResources}/teams${teamResources}`
}
