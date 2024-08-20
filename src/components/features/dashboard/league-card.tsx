import { FC } from 'react'

import { cn } from '@/utils/style'
import { League } from '@/utils/yahoo/types/common'

type Props = {
  league: League
}

const LeagueCard: FC<Props> = ({ league }) => {
  return (
    <div
      className={cn('border rounded p-2', [
        league?.isFinished && 'text-gray-400',
      ])}
    >
      <span className='font-medium'>{league?.name}</span>
    </div>
  )
}

export default LeagueCard
