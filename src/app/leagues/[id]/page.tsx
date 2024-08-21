import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { userLeaguesQuery } from '@/utils/yahoo/queries/user-leagues'

import { userLeaguesQueryKey } from '@/components/features/leagues/hooks/use-get-user-leagues'
import PageLayout from '@/components/layout/page-layout'

import { createQueryClient } from '@/configuration/react-query'
import { buildPageTitle } from '@/configuration/seo'

/** @todo generate. */
export const metadata: Metadata = {
  title: buildPageTitle('League'),
}

const Page: FC = async (props) => {
  await authRedirect()
  console.log(props)

  const accessToken = await getSessionToken({ cookies: cookies() })

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: userLeaguesQueryKey.all,
    queryFn: () =>
      yahooFetch({
        url: userLeaguesQuery(),
        token: accessToken,
      }),
  })

  return (
    <PageLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div></div>
      </HydrationBoundary>
    </PageLayout>
  )
}

export default Page
