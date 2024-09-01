'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoTrophy } from 'react-icons/io5'

import { cn } from '@/utils/style'
import { League } from '@/utils/yahoo/types/common'

import { setLeagueKey } from '@/components/features/league/store/league-store'

type Props = {
  league: League
}

const LeagueCard: FC<Props> = ({ league }) => {
  // const isActive = !league?.isFinished

  return (
    <Link
      href={`/leagues/${league?.leagueKey}`}
      className={cn(
        'border rounded p-2 transition hover:border-brand-light bg-almost-white hover:bg-white',
        [
          // !isActive && 'text-gray-400',
          // isActive && 'hover:bg-white',
        ],
      )}
      onClick={() => {
        setLeagueKey(league?.leagueKey)
      }}
    >
      <div className='flex gap-4 items-center'>
        {league?.logoUrl ? (
          <Image
            src={league?.logoUrl}
            alt={`${league?.name} league logo`}
            width={200}
            height={200}
            className='rounded-full border flex-none size-14'
          />
        ) : (
          <div className='rounded-full border bg-gray-50 flex-none size-14 flex items-center justify-center'>
            <IoTrophy className='size-10 text-gray-600' />
          </div>
        )}

        <span className='font-semibold text-balance flex-auto'>
          {league?.name}
        </span>
      </div>
    </Link>
  )
}

export default LeagueCard
