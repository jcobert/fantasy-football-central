import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { FC } from 'react'

import SignIn from '@/components/auth/signin'
import PageLayout from '@/components/layout/page-layout'

const Page: FC = async () => {
  const session = await getServerSession()

  // If user already logged in, redirect home.
  if (session) {
    redirect('/')
  }

  return (
    <PageLayout pageClassName='items-center justify-center'>
      <SignIn />
    </PageLayout>
  )
}

export default Page
