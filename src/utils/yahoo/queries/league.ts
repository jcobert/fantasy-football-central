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
 * Gets a single league. Accepts an array of league resources.
 *
 * `"/league/${leagueKey};out=${leagueResources}"`
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
