import { ReactNode } from 'react'

// import Back from '@/components/common/back'
import LeagueNavbar from '@/components/features/leagues/navigation/league-navbar'
import PageLayout from '@/components/layout/page-layout'

const LeaguesLayout = ({
  children,
  params,
}: {
  children: ReactNode
  params: { leagueid: string }
}) => {
  return (
    <PageLayout
      defaultLayout={false}
      pageClassName='layout'
      className='flex flex-col max-sm:flex-col-reverse__ px-0'
    >
      <div className='flex items-center backdrop-blur-lg bg-background/70 gap-4 border-b sticky z-10 top-[55px] max-sm:hidden'>
        {/* <Back href='/leagues' text='All leagues' className='max-sm:hidden' /> */}
        <LeagueNavbar leagueId={params?.leagueid} />
      </div>
      <div className='min-h-main-mobile px-1'>{children}</div>
      <div className='flex items-center backdrop-blur-lg bg-background/70 gap-4 border-t z-10 sticky pb-safe w-full bottom-0 sm:hidden'>
        {/* <Back href='/leagues' text='All leagues' className='max-sm:hidden' /> */}
        <LeagueNavbar leagueId={params?.leagueid} />
      </div>
    </PageLayout>
  )
}

export default LeaguesLayout
