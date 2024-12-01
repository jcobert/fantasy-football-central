import { Team, TeamEndpointResource } from '@/utils/yahoo/types/common'

export type TeamQueryParams = {
  teamKey?: Team['teamKey']
  /**
   * Multiple team resources
   *
   * `"/team;out=${...teamResources}"`
   */
  teamResources?: TeamEndpointResource[]
  /**
   * A subresource of a single team resource.
   * Only applies when one team resource is provided.
   *
   * `"/team/${teamResources}/${subresource}"`
   */
  subresource?: 'players'
  filter?: 'season' | 'week' | 'lastweek' | 'lastmonth'
  week?: number | 'current'
}

export type TeamDto = {
  team: Team
}

/**
 * Gets a single team.
 *
 * `"/team/${teamKey};out=${...teamResources}"`
 *
 * or
 *
 * `"/team/${teamKey}/${teamResources}/${subresource}"`
 */
export const teamQuery = (params?: TeamQueryParams) => {
  const { teamKey } = params || {}
  const base = `/team/${teamKey}`

  const teamResources =
    (params?.teamResources || [])?.length > 1
      ? `;out=${params?.teamResources?.join(',')}`
      : ''

  const resource =
    params?.teamResources?.length === 1 ? `/${params?.teamResources?.[0]}` : ''

  const subresource =
    resource && params?.subresource ? `/${params?.subresource}` : ''

  if (teamResources) {
    return `${base}${teamResources}`
  }
  if (subresource) {
    return `${base}${resource}${subresource}`
  }
  if (resource) {
    return `${base}${resource}`
  }
  return base
}
