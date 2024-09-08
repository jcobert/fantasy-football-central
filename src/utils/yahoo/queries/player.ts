import { Player, PlayerEndpointResource } from '@/utils/yahoo/types/common'

export type PlayerQueryParams = {
  playerKey?: Player['playerKey']
  /**
   * Multiple player resources
   *
   * `"/player;out=${...playerResources}"`
   */
  playerResources?: PlayerEndpointResource[]
  /**
   * A subresource of a single player resource.
   * Only applies when one player resource is provided.
   *
   * `"/player/${playerResources}/${subresource}"`
   */
  subresource?: 'players'
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

  const playerResources =
    (params?.playerResources || [])?.length > 1
      ? `;out=${params?.playerResources?.join(',')}`
      : ''

  const resource =
    params?.playerResources?.length === 1
      ? `/${params?.playerResources?.[0]}`
      : ''

  const subresource =
    resource && params?.subresource ? `/${params?.subresource}` : ''

  if (playerResources) {
    return `${base}${playerResources}`
  }
  if (subresource) {
    return `${base}${resource}${subresource}`
  }
  if (resource) {
    return `${base}${resource}`
  }
  return base
}
