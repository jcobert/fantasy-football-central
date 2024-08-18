import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { FetchResponse } from '@/utils/yahoo/fetch'
import { getUserLeagues } from '@/utils/yahoo/queries/get-user-leagues'
import {
  LeagueEndpointResource,
  TeamEndpointResource,
  UserEndpointResource,
} from '@/utils/yahoo/types/common'
import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

type QueryParams = {
  resource?: UserEndpointResource
  subresource?: LeagueEndpointResource | TeamEndpointResource
}

export const userQueryKey = {
  all: ['user'] as const,
  filtered: (params: QueryParams) =>
    [...userQueryKey.all, { ...params }] as const,
}

export const useGetUser = (
  params?: Partial<UseQueryOptions<FetchResponse<UserLeaguesDto>>>,
) => {
  const {
    enabled = false,
    refetchOnMount = false,
    ...queryOptions
  } = params || {}

  const { data, ...query } = useQuery({
    queryKey: userQueryKey.filtered({
      resource: 'leagues',
      subresource: 'teams',
    }),
    queryFn: getUserLeagues,
    enabled,
    refetchOnMount,
    ...queryOptions,
  })

  return { response: data, ...query }
}
