import { stringify } from 'querystring'

import { FetchResponse } from '@/utils/yahoo/fetch'
import {
  LeagueEndpointResource,
  TeamEndpointResource,
  UserEndpointResource,
} from '@/utils/yahoo/types/common'
import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

export type UserLeaguesQueryParams = {
  resource?: UserEndpointResource
  subresource?: LeagueEndpointResource | TeamEndpointResource
}

export const getUserLeagues = async (params?: UserLeaguesQueryParams) => {
  const { resource = 'leagues', subresource = 'teams' } = params || {}

  const res = await fetch(
    `/api/yahoo/fantasy/users?${stringify({
      resource,
      subresource,
    })}`,
  )
  const response = (await res.json()) as FetchResponse<UserLeaguesDto>
  return response
}
