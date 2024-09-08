import { Player, PlayerEndpointResource } from '@/utils/yahoo/types/common'

export type PlayerQueryParams = {
  playerKey?: Player['playerKey']
  /**
   * Multiple player resources
   *
   * `"/player;out=${...playerResources}"`
   */
  resources?: PlayerEndpointResource[]
  /**
   * A subresource of a single player resource.
   * Only applies when one player resource is provided.
   *
   * `"/player/${playerResources}/${subresource}"`
   */
  subresources?: string[]
  filter?: 'season' | 'week' | 'lastweek' | 'lastmonth'
  week?: number | 'current'
}

export type PlayerDto = {
  player: Player
}

/**
 * Gets a single player.
 *
 * `"/player/${playerKey};out=${...playerResources}"`
 *
 * or
 *
 * `"/player/${playerKey}/${playerResources}/${subresource}"`
 */
export const playerQuery = (params?: PlayerQueryParams) => {
  const { playerKey } = params || {}
  const base = `/player/${playerKey}`

  const resources =
    (params?.resources || [])?.length > 1
      ? `;out=${params?.resources?.join(',')}`
      : ''

  const resource =
    params?.resources?.length === 1 ? `/${params?.resources?.[0]}` : ''

  const subresource =
    resource && params?.subresources ? `/${params?.subresources}` : ''

  if (resources) {
    return `${base}${resources}`
  }
  if (subresource) {
    return `${base}${resource}${subresource}`
  }
  if (resource) {
    return `${base}${resource}`
  }
  return base
}
