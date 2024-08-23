import { UseQueryOptions } from '@tanstack/react-query'

import { filteredQueryKey } from '@/utils/query'
import { FetchResponse } from '@/utils/yahoo/fetch'
import {
  LeagueDto,
  LeagueQueryParams,
  leagueQuery,
} from '@/utils/yahoo/queries/league'

import { useYahooQuery } from '@/hooks/use-yahoo-query'

type Params = {
  queryOptions: Partial<UseQueryOptions<FetchResponse<LeagueDto>>>
} & LeagueQueryParams

export const leagueQueryKey = {
  all: ['league'] as const,
  filtered: (params: LeagueQueryParams) =>
    filteredQueryKey(params, leagueQueryKey.all),
}

export const useGetLeague = ({
  leagueKey,
  leagueResources,
  queryOptions,
}: Params) => {
  const url = leagueQuery({ leagueKey, leagueResources })

  return useYahooQuery({
    url,
    queryOptions: {
      queryKey: leagueQueryKey.filtered({
        leagueKey,
        leagueResources,
      }),
      ...queryOptions,
    },
  })
}
