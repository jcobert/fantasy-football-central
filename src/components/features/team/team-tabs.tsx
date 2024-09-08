import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSwap, AiOutlineTeam } from 'react-icons/ai'
import { MdPlayDisabled } from 'react-icons/md'
import { TbClipboardList, TbScoreboard } from 'react-icons/tb'

import { getPreviousMatchup } from '@/utils/yahoo/matchup'
import { Team } from '@/utils/yahoo/types/common'

import Tabs from '@/components/common/tabs'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { useLeagueStore } from '@/components/features/league/store/league-store'
import TeamInfo from '@/components/features/team/tabs/info/team-info'
import MatchupCard from '@/components/features/team/tabs/matchups/matchup-card'
import TeamRoster from '@/components/features/team/tabs/roster/team-roster'
import TeamTransactions from '@/components/features/team/tabs/transactions/team-transactions'
import NoResults from '@/components/no-results'

type Props = {
  team?: Team
}

const TeamTabs: FC<Props> = ({ team }) => {
  const leagueKey = useLeagueStore.use.leagueKey() || ''

  const { response } = useGetLeague({
    leagueKey,
    resources: ['settings', 'teams', 'standings', 'transactions'],
    queryOptions: { enabled: true },
  })

  const league = response?.data?.league

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
            <span className='flex max-sm:flex-col items-center gap-1'>
              <AiOutlineTeam className='text-xl' />
              <span className='text-sm'>Info</span>
            </span>
          ),
          content: (
            <div className='flex flex-col'>
              {/* <span className="text-lg font-semibold">Overview</span> */}
              <TeamInfo team={team} />
            </div>
          ),
        },
        // ROSTER
        {
          trigger: (
            <span className='flex max-sm:flex-col items-center gap-1'>
              <TbClipboardList className='text-xl' />
              <span className='text-sm'>Roster</span>
            </span>
          ),
          content: (
            <div className='flex flex-col'>
              <span className='text-lg font-semibold'>Current Roster</span>
              <TeamRoster roster={team?.roster} />
            </div>
          ),
        },
        // MATCHUPS
        {
          trigger: (
            <span className='flex max-sm:flex-col items-center gap-1'>
              <TbScoreboard className='text-xl' />
              <span className='text-sm'>Matchups</span>
            </span>
          ),
          content: (
            <div className='flex flex-col gap-8'>
              {/* Current Matchup */}
              <div>
                <span className='text-lg font-semibold'>Current Matchup</span>
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
                  <span className='text-lg font-semibold'>
                    Previous Matchup
                  </span>
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
                  // className='w-fit mx-auto max-sm:w-full text-center justify-center flex items-center border gap-1 px-8 py-3 border-zinc-300 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sky-700 dark:text-sky-700 dark:hover:text-sky-800 hover:text-sky-800 transition font-medium'
                  className='btn-outline sm:w-fit mx-auto'
                >
                  {/* <MdHistory /> */}
                  View all matchups
                </Link>
              </div>
            </div>
          ),
        },
        // ACTIVITY
        {
          trigger: (
            <span className='flex max-sm:flex-col items-center gap-1'>
              <AiOutlineSwap className='text-xl' />
              <span className='text-sm'>Activity</span>
            </span>
          ),
          content: <TeamTransactions transactions={transactions} />,
        },
      ]}
    />
  )
}

export default TeamTabs
