import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'text-zinc-50 flex items-center gap-[2px] text-lg bg-brand hover:bg-brand-dark transition-all px-2 py-1 border font-bold rounded',
        className,
      )}
    >
      <span>FF</span>
      <span className='text-sm mt-[2px] text-brand-alt'>Central</span>
    </div>
  )
}

export default Logo
