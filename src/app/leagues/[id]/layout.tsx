import { ReactNode } from 'react'

// import Back from '@/components/common/back'
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
      <div className='flex items-center gap-4 border-b sticky top-[55px] max-sm:hidden'>
        {/* <Back href='/leagues' text='All leagues' className='max-sm:hidden' /> */}
        <LeagueNavbar leagueId={params?.id} />
      </div>
      {children}
      <div className='flex items-center gap-4 border-t absolute pb-safe w-full bottom-0 sm:hidden'>
        {/* <Back href='/leagues' text='All leagues' className='max-sm:hidden' /> */}
        <LeagueNavbar leagueId={params?.id} />
      </div>
    </PageLayout>
  )
}

export default LeaguesLayout
