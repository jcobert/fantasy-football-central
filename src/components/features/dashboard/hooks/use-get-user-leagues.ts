import { UseQueryOptions } from '@tanstack/react-query'

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
  leagueResources?: LeagueEndpointResource[]
  teamResources?: TeamEndpointResource[]
}

type Params = {
  queryOptions: Partial<UseQueryOptions<FetchResponse<UserLeaguesDto>>>
} & QueryParams

export const userLeaguesQueryKey = {
  all: ['user-leagues'],
  filtered: (params: QueryParams) =>
    [...userLeaguesQueryKey.all, { ...params }] as const,
}

export const useGetUserLeagues = ({
  leagueResources,
  teamResources,
  queryOptions,
}: Params) => {
  const url = userLeaguesQuery({ leagueResources, teamResources })

  return useYahooQuery({
    url,
    queryOptions: {
      queryKey: userLeaguesQueryKey.filtered({
        leagueResources,
        teamResources,
      }),
      ...queryOptions,
    },
  })
}
