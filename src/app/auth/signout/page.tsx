import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { FC } from 'react'

import SignOut from '@/components/auth/signout'
import PageLayout from '@/components/layout/page-layout'

const Page: FC = async () => {
  const session = await getServerSession()

  // If user not logged in, redirect home.
  if (!session) {
    redirect('/')
  }

  return (
    <PageLayout pageClassName='items-center'>
      <SignOut asAlert={false} />
    </PageLayout>
  )
}

export default Page
