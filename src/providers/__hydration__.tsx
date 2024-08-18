import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { FC, ReactNode } from 'react'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'

import {
  USER_LEAGUES_QUERY_URL,
  usersQueryKey,
} from '@/components/features/dashboard/hooks/use-get-user-leagues'

import { createQueryClient } from '@/configuration/react-query'

const Hydration: FC<{ children: ReactNode }> = async ({ children }) => {
  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: usersQueryKey.leagues,
      queryFn: () =>
        yahooFetch({
          url: USER_LEAGUES_QUERY_URL,
          token: accessToken,
        }),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export default Hydration
