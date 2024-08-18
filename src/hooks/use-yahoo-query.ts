import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { FetchResponse } from '@/utils/yahoo/fetch'

type QueryFnParams = {
  url: string
}

export const yahooQueryFn = async ({ url }: QueryFnParams) => {
  const res = await fetch(`/api/yahoo/fantasy${url}`)
  const response = (await res.json()) as FetchResponse
  return response
}

type Params<TData> = QueryFnParams & {
  queryOptions: UseQueryOptions<FetchResponse<TData>>
}

export const useYahooQuery = <TData = Record<string, unknown>>(
  params: Params<TData>,
) => {
  const { url, queryOptions } = params

  const { enabled = false, refetchOnMount = false, ...options } = queryOptions

  const { data, ...query } = useQuery({
    enabled,
    refetchOnMount,
    queryFn: () => yahooQueryFn({ url }),
    ...options,
  })

  return { response: data, ...query }
}
