import { UseQueryOptions } from '@tanstack/react-query'

import { filteredQueryKey } from '@/utils/query'
import { FetchResponse } from '@/utils/yahoo/fetch'
import { TeamDto, TeamQueryParams, teamQuery } from '@/utils/yahoo/queries/team'

import { useYahooQuery } from '@/hooks/use-yahoo-query'

type Params = {
  queryOptions?: Partial<UseQueryOptions<FetchResponse<TeamDto>>>
} & TeamQueryParams

export const teamQueryKey = {
  all: ['team'] as const,
  filtered: (params: TeamQueryParams) =>
    filteredQueryKey(params, teamQueryKey.all),
}

export const useGetTeam = ({
  teamKey,
  teamResources,
  subresource,
  queryOptions,
}: Params) => {
  const { enabled = false, ...options } = queryOptions || {}

  const url = teamQuery({ teamKey, teamResources, subresource })

  const queryEnabled = enabled && !!teamKey

  return useYahooQuery({
    url,
    queryOptions: {
      queryKey: teamQueryKey.filtered({
        teamKey,
        teamResources,
        subresource,
      }),
      enabled: queryEnabled,
      ...options,
    },
  })
}
