import { Metadata } from 'next'
import { FC } from 'react'

import PageLayout from '@/components/layout/page-layout'

export const metadata: Metadata = {
  title: 'Home',
}

const HomePage: FC = () => {
  return (
    <PageLayout heading='Home'>
      <div></div>
    </PageLayout>
  )
}

export default HomePage
