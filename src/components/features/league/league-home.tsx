'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'
import { IoTrophy } from 'react-icons/io5'

import { League } from '@/utils/yahoo/types/common'
import { getUserOwnedTeams } from '@/utils/yahoo/user'

import Standings from '@/components/features/league/standings'
import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import {
  setLeagueKey,
  setUserTeams,
} from '@/components/features/league/store/league-store'

type Props = {
  leagueKey: League['leagueKey']
}

const LeagueHome: FC<Props> = ({ leagueKey }) => {
  useEffect(() => {
    setLeagueKey(leagueKey)
  }, [])

  const { response } = useGetLeague({
    leagueKey,
    resources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })

  const league = response?.data?.league

  useEffect(() => {
    const userTeams = getUserOwnedTeams(league)
    setUserTeams(userTeams)
  }, [response])

  return (
    <div>
      {/* League Heading */}
      <div className='flex gap-3 items-center justify-center py-4 sm:py-6'>
        {league?.logoUrl ? (
          <Image
            src={league?.logoUrl}
            alt={`${league?.name} league logo`}
            width={150}
            height={150}
            className='rounded-full border flex-none size-10'
          />
        ) : (
          <div className='rounded-full border bg-gray-50 flex-none size-10 flex items-center justify-center'>
            <IoTrophy className='size-6 text-brand' />
          </div>
        )}
        <h1 className='text-2xl text-brand text-center text-balance font-semibold max-w-prose'>
          {league?.name}
        </h1>
      </div>

      <div className='pb-4'>
        <Standings leagueKey={leagueKey} />
      </div>
    </div>
  )
}

export default LeagueHome
