import { UseQueryOptions, useQuery } from '@tanstack/react-query'

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
  params?: Partial<UseQueryOptions<UserLeaguesDto>>,
) => {
  const { enabled = false, ...queryOptions } = params || {}

  const query = useQuery({
    queryKey: userQueryKey.filtered({
      resource: 'leagues',
      subresource: 'teams',
    }),
    queryFn: getUserLeagues,
    enabled,
    ...queryOptions,
  })

  return query
}
