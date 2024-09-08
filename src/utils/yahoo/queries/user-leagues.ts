import {
  Games,
  LeagueEndpointResource,
  TeamEndpointResource,
} from '@/utils/yahoo/types/common'

export type UserLeaguesQueryParams = {
  resources?: LeagueEndpointResource[]
  teamResources?: TeamEndpointResource[]
}

export type UserLeaguesDto = {
  users: {
    user: {
      guid: string
      games: Games
    }
  }
}

/**
 * Gets all of the user's football leagues. Accepts arrays of league and team resources.
 *
 * `"/users;use_login=1/games;game_codes=nfl/leagues;out={resources}/teams;out={teamResources}"`
 */
export const userLeaguesQuery = (params?: UserLeaguesQueryParams) => {
  const resources = params?.resources?.length
    ? `;out=${params?.resources?.join(',')}`
    : ''
  const teamResources = params?.teamResources?.length
    ? `;out=${params?.teamResources?.join(',')}`
    : ''
  return `/users;use_login=1/games;game_codes=nfl/leagues${resources}/teams${teamResources}`
}
