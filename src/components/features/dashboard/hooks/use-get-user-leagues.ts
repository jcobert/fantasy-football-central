import { UseQueryOptions } from '@tanstack/react-query'

import { FetchResponse } from '@/utils/yahoo/fetch'
import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

import { useYahooQuery } from '@/hooks/use-yahoo-query'

// type QueryParams = {
//   resource?: UserEndpointResource
//   subresource?: LeagueEndpointResource | TeamEndpointResource
// }

type Params = {
  queryOptions: Partial<UseQueryOptions<FetchResponse<UserLeaguesDto>>>
}

const queryKeyRoot = ['users'] as const

export const usersQueryKey = {
  all: queryKeyRoot,
  leagues: [...queryKeyRoot, 'leagues'] as const,
  // filtered: (params: QueryParams) =>
  //   [...usersQueryKey.all, { ...params }] as const,
}

/**
 * Gets all user NFL leagues.
 * For each league includes: teams, settings
 */
export const USER_LEAGUES_QUERY_URL =
  '/users;use_login=1/games;game_codes=nfl/leagues;out=settings/teams'

export const useGetUserLeagues = ({ queryOptions }: Params) => {
  return useYahooQuery({
    url: USER_LEAGUES_QUERY_URL,
    queryOptions: {
      queryKey: usersQueryKey.leagues,
      ...queryOptions,
    },
  })
}
