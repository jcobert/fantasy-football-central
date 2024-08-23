import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'
import { Game } from '@/utils/yahoo/types/common'

import LeagueCard from '@/components/features/leagues/components/league-card'

type Props = {
  game: Game
}

const LeagueGroup: FC<Props> = ({ game }) => {
  const leagues = forceArray(game?.leagues?.league)?.filter(Boolean)
  return (
    <div className={cn('flex flex-col gap-2')}>
      <span>{game?.season}</span>
      <div className='flex flex-col gap-3'>
        {leagues?.map((league) => (
          <LeagueCard key={league?.leagueId} league={league} />
        ))}
      </div>
    </div>
  )
}

export default LeagueGroup
