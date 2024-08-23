import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoAmericanFootball } from 'react-icons/io5'

import { cn } from '@/utils/style'
import { League } from '@/utils/yahoo/types/common'

type Props = {
  league: League
}

const LeagueCard: FC<Props> = ({ league }) => {
  // const isActive = !league?.isFinished

  return (
    <Link
      href={`/leagues/${league?.leagueKey}`}
      className={cn('border rounded p-2 transition hover:bg-white', [
        // !isActive && 'text-gray-400',
        // isActive && 'hover:bg-white',
      ])}
    >
      <div className='flex gap-4 items-center'>
        {league?.logoUrl ? (
          <Image
            src={league?.logoUrl}
            alt={`${league?.name} league logo`}
            width={200}
            height={200}
            className='rounded-full border flex-none size-16'
          />
        ) : (
          <div className='rounded-full border bg-gray-50 flex-none size-16 flex items-center justify-center'>
            <IoAmericanFootball className='size-10 text-gray-600' />
          </div>
        )}

        <span className='font-medium flex-auto'>{league?.name}</span>
      </div>
    </Link>
  )
}

export default LeagueCard
