import { Team, TeamEndpointResource } from '@/utils/yahoo/types/common'

export type TeamQueryParams = {
  teamKey?: Team['teamKey']
  teamResources?: TeamEndpointResource[]
}

export type TeamDto = {
  team: Team
}

/**
 * Gets a single team. Accepts an array of team resources.
 *
 * `"/team/${teamKey};out=${teamResources}"`
 */
export const teamQuery = (params?: TeamQueryParams) => {
  const { teamKey } = params || {}

  const teamResources = params?.teamResources?.length
    ? `;out=${params?.teamResources?.join(',')}`
    : ''

  return `/team/${teamKey}${teamResources}`
}
