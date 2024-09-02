import { FC } from 'react'

import { Team } from '@/utils/yahoo/types/common'

import Collapsible from '@/components/common/collapsible'
import DraftResults from '@/components/features/team/draft/draft-results'
import { useGetTeam } from '@/components/features/team/store/hooks/use-get-team'
import TeamHistory from '@/components/features/team/tabs/info/team-history'
import TeamOverview from '@/components/features/team/tabs/info/team-overview'

type Props = {
  team?: Team
}

const TeamInfo: FC<Props> = ({ team }) => {
  const { response } = useGetTeam({
    teamKey: team?.teamKey,
    teamResources: ['draftresults'],
    // resource: 'draftresults',
    // subResource: 'players',
  })

  const teamDraft = response?.data?.team

  return (
    <div className='flex flex-col gap-6'>
      {/* Overview */}
      <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Overview</h2>}
          defaultOpen
          triggerClassName='w-full border-zinc-300 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <TeamOverview team={team} />
        </Collapsible>
      </div>

      {/* Draft Results */}
      <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Draft Results</h2>}
          triggerClassName='w-full border-zinc-300 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <DraftResults
            draftPicks={teamDraft?.draftResults?.draftResult}
            className='rounded-t-none border-t-0'
          />
        </Collapsible>
      </div>

      {/* Past Teams */}
      <div>
        <Collapsible
          header={<h2 className='text-lg font-semibold'>Past Seasons</h2>}
          triggerClassName='w-full border-zinc-300 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-600 p-4 border data-[state=open]:border-b-zinc-100 data-[state=open]:rounded-b-none rounded-md'
        >
          <TeamHistory team={team} />
        </Collapsible>
      </div>
    </div>
  )
}

export default TeamInfo
