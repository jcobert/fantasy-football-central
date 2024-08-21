import { ReactNode } from 'react'

import Back from '@/components/common/back'
import LeagueNavbar from '@/components/features/leagues/navigation/league-navbar'
import PageLayout from '@/components/layout/page-layout'

const LeaguesLayout = ({
  children,
  params,
}: {
  children: ReactNode
  params: { id: string }
}) => {
  return (
    <PageLayout
      defaultLayout={false}
      pageClassName='layout'
      className='flex flex-col max-sm:flex-col-reverse__ px-0'
    >
      <div className='flex items-center gap-4 sticky top-[55px] max-sm:bottom-0__'>
        {/* <Back href='/leagues' text='All leagues' className='max-sm:hidden' /> */}
        <LeagueNavbar leagueId={params?.id} />
      </div>
      {children}
    </PageLayout>
  )
}

export default LeaguesLayout
