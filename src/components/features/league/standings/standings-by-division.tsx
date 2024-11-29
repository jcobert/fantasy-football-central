import { FC } from 'react'

import { TeamsByDivision } from '@/utils/yahoo/team'
import { League } from '@/utils/yahoo/types/common'

import TeamCard from '@/components/features/team/team-card'

type Props = {
  teamsByDivision: TeamsByDivision[]
  league: League | undefined
}

const StandingsByDivision: FC<Props> = ({ league, teamsByDivision }) => {
  return (
    <div className='flex w-full flex-col gap-6 py-2__ sm:px-8_ md:px-24_'>
      {teamsByDivision?.map((division) => (
        <div
          key={division?.division?.divisionId}
          className='flex flex-col gap-2 dark:bg-zinc-700 p-2 rounded-md border dark:border-zinc-400 shadow'
        >
          {/* Division Name */}
          <h2 className='font-semibold text-lg border-b- border-zinc-300'>
            {division?.division?.name}
          </h2>
          {/* Teams */}
          <div className='flex flex-col gap-2'>
            {division?.teams?.map((team) => (
              <div key={team?.teamId} className='flex items-center gap-2'>
                <TeamCard
                  team={team}
                  indicateWildcard
                  pastTeam={!!league?.isFinished}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StandingsByDivision
