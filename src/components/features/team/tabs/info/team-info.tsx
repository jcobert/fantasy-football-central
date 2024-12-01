import { FC } from 'react'

import { Team } from '@/utils/yahoo/types/common'

import Collapsible from '@/components/common/collapsible'
import DraftResults from '@/components/features/team/draft/draft-results'
// import TeamHistory from '@/components/features/team/tabs/info/team-history'
import TeamOverview from '@/components/features/team/tabs/info/team-overview'

type Props = {
  team?: Team
}

const TeamInfo: FC<Props> = ({ team }) => {
  return (
    <div className='flex flex-col gap-6'>
      {/* Overview */}
      <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Overview</h2>}
          defaultOpen
          triggerClassName='w-full border-zinc-300__ shadow-sm data-[state=open]:shadow-none bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <TeamOverview team={team} />
        </Collapsible>
      </div>

      {/* Draft Results */}
      <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Draft Results</h2>}
          triggerClassName='w-full border-zinc-300__ shadow-sm data-[state=open]:shadow-none bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <DraftResults
            teamKey={team?.teamKey}
            className='rounded-t-none border-t-0'
          />
        </Collapsible>
      </div>

      {/* Past Teams */}
      {/* <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Past Seasons</h2>}
          triggerClassName='w-full border-zinc-300__ shadow-sm data-[state=open]:shadow-none bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <TeamHistory team={team} />
        </Collapsible>
      </div> */}
    </div>
  )
}

export default TeamInfo
