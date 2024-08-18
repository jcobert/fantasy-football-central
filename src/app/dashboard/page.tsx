import { Metadata } from 'next'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { FC } from 'react'

import { authRedirect, getSessionToken } from '@/utils/auth/helpers'

import Dashboard from '@/components/features/dashboard/dashboard'
import PageLayout from '@/components/layout/page-layout'

import { buildPageTitle } from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Dashboard'),
}

const Page: FC = async () => {
  await authRedirect()

  const sessionToken = await getSessionToken({ cookies: cookies() })

  // console.log('TOKEN=========', sessionToken)

  // const queryClient = createQueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: userQueryKey.filtered({
  //     resource: 'leagues',
  //     subresource: 'teams',
  //   }),
  //   queryFn: () => getUserLeagues(),
  // })

  return (
    <PageLayout heading='Dashboard'>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <Dashboard />
      {/* </HydrationBoundary> */}
    </PageLayout>
  )
}

export default Page
