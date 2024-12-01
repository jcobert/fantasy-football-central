import { FC } from 'react'
import { AiFillTrophy } from 'react-icons/ai'
import { SlBadge } from 'react-icons/sl'

import { cn } from '@/utils/style'

type Props = {
  rank?: number
}

const RankBadge: FC<Props> = ({ rank }) => {
  if (!rank || rank > 3) return null
  return (
    <div className='flex items-center gap-[0.2rem] text-2xl'>
      <span
        className={cn('text-xs relative left-[1.175rem] bottom-1', {
          'text-yellow-100': rank === 1,
          'text-slate-400': rank === 2,
          'text-yellow-700': rank === 3,
        })}
      >
        {rank}
      </span>
      {rank === 1 && (
        <AiFillTrophy className='text-yellow-500 dark:text-yellow-500' />
      )}
      {rank === 2 && <SlBadge className='text-slate-500 dark:text-slate-400' />}
      {rank === 3 && (
        <SlBadge className='text-yellow-700 dark:text-yellow-700' />
      )}
    </div>
  )
}

export default RankBadge
