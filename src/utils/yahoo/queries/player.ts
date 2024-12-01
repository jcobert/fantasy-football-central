import { Player, PlayerEndpointResource } from '@/utils/yahoo/types/common'

export type PlayerQueryParams = {
  playerKey?: Player['playerKey']
  /**
   * Multiple player resources
   *
   * `"/player;out=${...resources}"`
   */
  resources?: PlayerEndpointResource[]
  /**
   * A subresource of a single player resource.
   * Only applies when one player resource is provided.
   *
   * `"/player/${resources}/${subresources}"`
   */
  subresources?: string[]
  filter?: {
    type?: 'season' | 'week' | 'lastweek' | 'lastmonth'
    week?: number | 'current'
  }
  // filter?: 'season' | 'week' | 'lastweek' | 'lastmonth'
  // week?: number | 'current'
}

export type PlayerDto = {
  player: Player
}

/**
 * Gets a single player.
 *
 * `"/player/${playerKey};out=${...resources}"`
 *
 * or
 *
 * `"/player/${playerKey}/${resources}/${subresources}"`
 */
export const playerQuery = (params?: PlayerQueryParams) => {
  const { playerKey, filter } = params || {}
  const base = `/player/${playerKey}`

  const resources =
    (params?.resources || [])?.length > 1
      ? `;out=${params?.resources?.join(',')}`
      : ''

  const resource =
    params?.resources?.length === 1 ? `/${params?.resources?.[0]}` : ''

  const subresource =
    resource && params?.subresources ? `/${params?.subresources}` : ''

  const filterString = `${filter?.type ? `;type=${filter?.type}` : ''}${
    filter?.type === 'week' && !!filter?.week ? `;week=${filter?.week}` : ''
  }`

  if (resources) {
    return `${base}${resources}${filterString}`
  }
  if (subresource) {
    return `${base}${resource}${subresource}${filterString}`
  }
  if (resource) {
    return `${base}${resource}${filterString}`
  }
  return `${base}${filterString}`
}
