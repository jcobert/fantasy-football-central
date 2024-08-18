import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

import { getUserLeagues } from '@/utils/yahoo/queries/get-user-leagues'

import { userQueryKey } from '@/components/features/dashboard/hooks/use-get-user'

import { createQueryClient } from '@/configuration/react-query'

const Hydration: FC<{ children: ReactNode }> = async ({ children }) => {
  const queryClient = createQueryClient()
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: userQueryKey.filtered({
        resource: 'leagues',
        subresource: 'teams',
      }),
      queryFn: () => getUserLeagues(),
    }),
  ])
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export default Hydration
