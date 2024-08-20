import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { FC, ReactNode } from 'react'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'

import { createQueryClient } from '@/configuration/react-query'
import { userLeaguesQueryKey } from '@/components/features/dashboard/hooks/use-get-user-leagues'
import { userLeaguesQuery } from '@/utils/yahoo/queries/user-leagues'

const Hydration: FC<{ children: ReactNode }> = async ({ children }) => {
  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: userLeaguesQueryKey.all,
      queryFn: () =>
        yahooFetch({
          url: userLeaguesQuery(),
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
