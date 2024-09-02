import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSwap, AiOutlineTeam } from 'react-icons/ai'
import { MdPlayDisabled } from 'react-icons/md'
import { TbClipboardList, TbScoreboard } from 'react-icons/tb'

import { cn } from '@/utils/style'
import { getPreviousMatchup } from '@/utils/yahoo/matchup'
import { League, Team } from '@/utils/yahoo/types/common'

import Button from '@/components/common/button'
import Tabs from '@/components/common/tabs'
import TeamInfo from '@/components/features/team/tabs/info/team-info'
import MatchupCard from '@/components/features/team/tabs/matchups/matchup-card'
import TeamRoster from '@/components/features/team/tabs/roster/team-roster'
import NoResults from '@/components/no-results'

type Props = {
  team?: Team
}

const TeamTabs: FC<Props> = ({ team }) => {
  const league = {} as League
  const matchups = team?.matchups?.matchup
  const activeMatchup = matchups?.find(
    (matchup) => matchup?.week === league?.currentWeek,
  )

  const previousMatchup = getPreviousMatchup(matchups)

  const transactions = team?.transactions?.transaction || []

  return (
    <Tabs
      tabs={[
        // INFO
        {
          trigger: (
            <h2 className='flex max-sm:flex-col items-center gap-1'>
              <AiOutlineTeam className='text-xl' />
              <span className='text-sm'>Info</span>
            </h2>
          ),
          content: (
            <div className='flex flex-col'>
              {/* <h2 className="text-lg font-semibold">Overview</h2> */}
              <TeamInfo team={team} />
            </div>
          ),
        },
        // ROSTER
        {
          trigger: (
            <h2 className='flex max-sm:flex-col items-center gap-1'>
              <TbClipboardList className='text-xl' />
              <span className='text-sm'>Roster</span>
            </h2>
          ),
          content: (
            <div className='flex flex-col'>
              <h2 className='text-lg font-semibold'>Current Roster</h2>
              <TeamRoster roster={team?.roster} />
            </div>
          ),
        },
        // MATCHUPS
        {
          trigger: (
            <h2 className='flex max-sm:flex-col items-center gap-1'>
              <TbScoreboard className='text-xl' />
              <span className='text-sm'>Matchups</span>
            </h2>
          ),
          content: (
            <div className='flex flex-col gap-8'>
              {/* Current Matchup */}
              <div>
                <h2 className='text-lg font-semibold'>Current Matchup</h2>
                {!!activeMatchup ? (
                  <MatchupCard
                    matchup={activeMatchup}
                    linkTo='team'
                    focusedTeam={team?.teamKey}
                    heading={
                      <span className='text-sm'>{`Week ${activeMatchup?.week}`}</span>
                    }
                  />
                ) : (
                  <div className='border rounded-md shadow p-2 bg-zinc-100 dark:bg-zinc-600 flex flex-col gap-2'>
                    <NoResults
                      title='Not Playing'
                      subtitle={<MdPlayDisabled />}
                      description={`${team?.name} is watching from the sidelines this week.`}
                    />
                  </div>
                )}
              </div>
              {/* Previous Matchup */}
              {!!previousMatchup && (
                <div>
                  <h2 className='text-lg font-semibold'>Previous Matchup</h2>
                  <MatchupCard
                    matchup={previousMatchup}
                    linkTo='team'
                    focusedTeam={team?.teamKey}
                    heading={
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm'>{`Week ${previousMatchup?.week}`}</span>
                        <span className='text-xs text-zinc-800 dark:text-zinc-300'>
                          {previousMatchup?.matchupRecapTitle}
                        </span>
                      </div>
                    }
                  />
                </div>
              )}
              {/* Link to all matchups */}
              <div className='w-full mt-8'>
                <Link
                  href={`/matchups/history?team=${team?.teamKey}`}
                  className='w-fit mx-auto max-sm:w-full text-center justify-center flex items-center border gap-1 px-8 py-3 border-zinc-300 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sky-700 dark:text-sky-700 dark:hover:text-sky-800 hover:text-sky-800 transition font-medium'
                >
                  {/* <MdHistory /> */}
                  View all matchups
                </Link>
              </div>
            </div>
          ),
        },
        // ACTIVITY
        // {
        //   trigger: (
        //     <h2 className='flex max-sm:flex-col items-center gap-1'>
        //       <AiOutlineSwap className='text-xl' />
        //       <span className='text-sm'>Activity</span>
        //     </h2>
        //   ),
        //   content: (
        //     <div className='flex flex-col gap-8'>
        //       {/* Transactions */}
        //       <div>
        //         <h2 className='text-lg font-semibold'>Recent Transactions</h2>
        //         <Transactions transactions={transactions} limit={5} />
        //       </div>

        //       {/* All Transaction Button */}
        //       <div className='w-full'>
        //         <Button
        //           className='w-fit mx-auto max-sm:w-full text-center justify-center flex items-center border gap-1 !px-8 !py-3 !border-zinc-300 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sky-700 dark:text-sky-700 dark:hover:text-sky-800 hover:text-sky-800 transition font-medium'
        //           onClick={() => setIsTransModalOpen(true)}
        //         >
        //           {/* <AiOutlineSwap /> */}
        //           View all Transactions
        //         </Button>
        //       </div>
        //     </div>
        //   ),
        // },
      ]}
    />
  )
}

export default TeamTabs
