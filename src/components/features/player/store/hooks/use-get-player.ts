import { UseQueryOptions } from '@tanstack/react-query'

import { filteredQueryKey } from '@/utils/query'
import { FetchResponse } from '@/utils/yahoo/fetch'
import {
  PlayerDto,
  PlayerQueryParams,
  playerQuery,
} from '@/utils/yahoo/queries/player'

import { useYahooQuery } from '@/hooks/use-yahoo-query'

type Params = {
  queryOptions?: Partial<UseQueryOptions<FetchResponse<PlayerDto>>>
} & PlayerQueryParams

export const playerQueryKey = {
  all: ['player'] as const,
  filtered: (params: PlayerQueryParams) =>
    filteredQueryKey(params, playerQueryKey.all),
}

export const useGetPlayer = ({
  playerKey,
  resources,
  subresources,
  filter,
  queryOptions,
}: Params) => {
  const { enabled = false, ...options } = queryOptions || {}

  const url = playerQuery({ playerKey, resources, subresources, filter })

  const queryEnabled = enabled && !!playerKey

  return useYahooQuery({
    url,
    queryOptions: {
      queryKey: playerQueryKey.filtered({
        playerKey,
        resources,
        subresources,
        filter,
      }),
      enabled: queryEnabled,
      ...options,
    },
  })
}
