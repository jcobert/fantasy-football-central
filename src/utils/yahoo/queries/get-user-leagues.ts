import { stringify } from 'querystring'

import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

export const getUserLeagues = async (): Promise<UserLeaguesDto> => {
  const res = await fetch(
    `/api/yahoo/fantasy/user?${stringify({
      resource: 'leagues',
      subresource: 'teams',
    })}`,
  )
  const response = (await res.json()) as UserLeaguesDto
  return response
}
