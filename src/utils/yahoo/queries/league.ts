import {
  League,
  LeagueEndpointResource,
  TeamEndpointResource,
} from '@/utils/yahoo/types/common'

export type LeagueQueryParams = {
  leagueKey?: League['leagueKey']
  resources?: LeagueEndpointResource[]
  subresources?: TeamEndpointResource[]
}

export type LeagueDto = {
  league: League
}

/**
 * Gets a single league.
 *
 * `"/league/${leagueKey};out=${...resources}"`
 *
 * or
 *
 * `"/league/${leagueKey}/${resources}/${subresource}"`
 */
export const leagueQuery = (params?: LeagueQueryParams) => {
  const { leagueKey } = params || {}
  const base = `/league/${leagueKey}`

  const resources =
    (params?.resources || [])?.length > 1
      ? `;out=${params?.resources?.join(',')}`
      : ''

  const resource =
    params?.resources?.length === 1 ? `/${params?.resources?.[0]}` : ''

  const subresources =
    resource && (params?.subresources || [])?.length > 1
      ? `;out=${params?.subresources?.join(',')}`
      : ''

  const subresource =
    resource && params?.subresources?.length === 1
      ? `/${params?.subresources}`
      : ''

  if (resources) {
    return `${base}${resources}`
  }
  if (subresources) {
    return `${base}${resource}${subresources}`
  }
  if (subresource) {
    return `${base}${resource}${subresource}`
  }
  if (resource) {
    return `${base}${resource}`
  }
  return base
}

// /**
//  * Gets a single league. Accepts an array of league resources.
//  *
//  * `"/league/${leagueKey};out=${resources}"`
//  */
// export const leagueQuery = (params?: LeagueQueryParams) => {
//   const { leagueKey } = params || {}

//   const resources = params?.resources?.length
//     ? `;out=${params?.resources?.join(',')}`
//     : ''
//   // const resources = params?.resources?.length
//   //   ? `;out=${params?.resources?.join(',')}`
//   //   : ''

//   return `/league/${leagueKey}${resources}`
// }
