import { stringify } from 'querystring'

import { FetchResponse } from '@/utils/yahoo/fetch'
import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

export const getUserLeagues = async () => {
  const res = await fetch(
    `/api/yahoo/fantasy/users?${stringify({
      resource: 'leagues',
      subresource: 'teams',
    })}`,
  )
  const response = (await res.json()) as FetchResponse<UserLeaguesDto>
  return response
}
