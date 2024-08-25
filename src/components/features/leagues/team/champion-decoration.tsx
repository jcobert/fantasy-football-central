import { FC } from 'react'
import { BsStars } from 'react-icons/bs'
import { FaFootballBall } from 'react-icons/fa'
import { FaTrophy } from 'react-icons/fa6'
import { WiStars } from 'react-icons/wi'

import { cn } from '@/utils/style'

type Props = {
  className?: string
}

const ChampionDecoration: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 animate-ping text-amber-400/50',
        className,
      )}
    >
      <BsStars className='text-2xl animate-bounce' />
      <FaTrophy className='text-xl' />
      <FaFootballBall className='text-xl animate-spin' />
      <WiStars className='text-2xl animate-bounce' />
    </div>
  )
}

export default ChampionDecoration
