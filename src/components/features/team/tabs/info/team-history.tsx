import { sortBy, uniqBy } from 'lodash'
import { FC, useMemo } from 'react'

import { findAllAssociatedTeams } from '@/utils/yahoo/team'
import { Team } from '@/utils/yahoo/types/common'

import { useLeagueStore } from '@/components/features/league/store/league-store'
import TeamCard from '@/components/features/team/team-card'

type Props = {
  team?: Team
}

const TeamHistory: FC<Props> = ({ team }) => {
  // const leagues = useLeagueStore.use.historicalLeagues()
  const leagues = []
  const pastTeams = useMemo(
    () =>
      sortBy(
        uniqBy(findAllAssociatedTeams(team, leagues), 'teamKey')?.filter(
          (tm) => tm?.leagueInfo?.isFinished,
        ),
        (t) => t?.leagueInfo?.season,
      )?.reverse(),
    [leagues, team],
  )

  return (
    <div className='flex flex-col gap-4 text-sm p-4 border rounded-md rounded-t-none border-t-0 border-zinc-300__ bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600'>
      {pastTeams?.map((t) => (
        <div key={t?.teamKey}>
          <div className='flex items-center gap-4'>
            <span className='font-medium'>{t?.leagueInfo?.season}</span>
            <span className='text-xs'>Finished {t?.teamStandings?.rank}</span>
          </div>
          <TeamCard
            team={t as Team}
            record={t?.teamStandings?.outcomeTotals}
            disabled
            pastTeam
            className='bg-zinc-300/50 dark:bg-zinc-400/10'
          />
        </div>
      ))}
    </div>
  )
}

export default TeamHistory
