import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'
import {
  Manager,
  Managers as ManagersType,
  Team,
} from '@/utils/yahoo/types/common'

type Props = {
  team?: Team
  managers?: ManagersType
  className?: string
}

const Managers: FC<Props> = ({ team, managers, className = '' }) => {
  let teamManagers = forceArray(
    managers?.manager || team?.managers?.manager,
  ) as Manager[]

  if (!teamManagers?.length) return null

  return (
    <div className='flex items-center gap-1 flex-wrap'>
      {teamManagers?.map((mgr) => (
        <span
          key={mgr?.managerId}
          className={cn(
            "text-xs capitalize text-zinc-600 dark:text-zinc-300 [&:not(:last-child)]:after:content-['_&']",
            {
              [className]: !!className,
            },
          )}
        >
          {mgr?.nickname}
        </span>
      ))}
    </div>
  )
}

export default Managers
