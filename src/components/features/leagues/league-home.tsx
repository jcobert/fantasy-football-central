'use client'

import { FC } from 'react'

import { League } from '@/utils/yahoo/types/common'

import { useGetLeague } from '@/components/features/leagues/store/hooks/use-get-league'

type Props = {
  leagueKey: League['leagueKey']
}

const LeagueHome: FC<Props> = ({ leagueKey }) => {
  const { response } = useGetLeague({
    leagueKey,
    queryOptions: { enabled: true },
  })

  const league = response?.data?.league

  return (
    <div>
      <h1 className='text-3xl py-6 text-brand text-center text-balance font-medium max-w-prose'>
        {league?.name}
      </h1>
      <div className='flex flex-col gap-12'></div>
    </div>
  )
}

export default LeagueHome
