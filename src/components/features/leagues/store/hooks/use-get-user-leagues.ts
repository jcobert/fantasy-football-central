import { UseQueryOptions } from '@tanstack/react-query'

import { filteredQueryKey } from '@/utils/query'
import { FetchResponse } from '@/utils/yahoo/fetch'
import {
  UserLeaguesDto,
  userLeaguesQuery,
} from '@/utils/yahoo/queries/user-leagues'
import {
  LeagueEndpointResource,
  TeamEndpointResource,
} from '@/utils/yahoo/types/common'

import { useYahooQuery } from '@/hooks/use-yahoo-query'

type QueryParams = {
  resources?: LeagueEndpointResource[]
  teamResources?: TeamEndpointResource[]
}

type Params = {
  queryOptions?: Partial<UseQueryOptions<FetchResponse<UserLeaguesDto>>>
} & QueryParams

export const userLeaguesQueryKey = {
  all: ['user-leagues'] as const,
  filtered: (params: QueryParams) =>
    filteredQueryKey(params, userLeaguesQueryKey.all),
}

export const useGetUserLeagues = ({
  resources,
  teamResources,
  queryOptions,
}: Params) => {
  const url = userLeaguesQuery({ resources, teamResources })

  return useYahooQuery({
    url,
    queryOptions: {
      queryKey: userLeaguesQueryKey.filtered({
        resources,
        teamResources,
      }),
      ...queryOptions,
    },
  })
}
