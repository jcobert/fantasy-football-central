import { FC } from 'react'
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'

import { Team } from '@/utils/yahoo/types/common'

type Props = {
  team?: Team
}

const Trend: FC<Props> = ({ team }) => {
  const streak = team?.teamStandings?.streak
  const trend = streak?.type
  const count = Number(streak?.value)

  if (!streak) {
    return null
  }

  return (
    <div className='flex items-center gap-[0.2rem] text-xs'>
      {trend === 'win' && (
        <>
          <HiTrendingUp className='text-sm text-emerald-700 dark:text-emerald-500' />
        </>
      )}
      {trend === 'loss' && (
        <>
          <HiTrendingDown className='text-sm text-rose-700 dark:text-red-400' />
        </>
      )}
      <span className='font-medium'>{count}</span>
    </div>
  )
}

export default Trend
