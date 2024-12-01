'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { FC, useEffect } from 'react'
import { FaThList } from 'react-icons/fa'
import { GiAmericanFootballHelmet } from 'react-icons/gi'
import { IoTrophy } from 'react-icons/io5'

import { cn } from '@/utils/style'
import { inferFromTeamKey } from '@/utils/yahoo/team'
import { getUserOwnedTeams } from '@/utils/yahoo/user'

import { useGetLeague } from '@/components/features/league/store/hooks/use-get-league'
import { setUserTeams } from '@/components/features/league/store/league-store'
import NavDropdown from '@/components/layout/header/nav-dropdown'
import NavLink from '@/components/layout/header/nav-link'

import { NavItem } from '@/configuration/nav'

type Props = {
  leagueKey: string
}

const LeagueNavbar: FC<Props> = ({ leagueKey }) => {
  const { response } = useGetLeague({
    leagueKey,
    resources: ['settings', 'teams', 'standings'],
    queryOptions: { enabled: true },
  })

  const league = response?.data?.league

  const userTeams = getUserOwnedTeams(league)

  useEffect(() => {
    setUserTeams(userTeams)
  }, [response])

  const baseUrl = `/leagues/${leagueKey}`

  const myTeamId = inferFromTeamKey(userTeams?.[0])?.teamId

  const navItems: NavItem[] = [
    {
      id: 'league',
      name: (
        <div className='flex flex-col items-center gap-2'>
          <IoTrophy className='size-6' />
          <span>League</span>
        </div>
      ),
      url: baseUrl,
    },
    {
      id: 'team',
      name: (
        <div className='flex flex-col items-center gap-2'>
          <GiAmericanFootballHelmet className='size-6' />
          <span>My Team</span>
        </div>
      ),
      url: myTeamId ? `${baseUrl}/team/${myTeamId}` : '',
    },
    {
      id: 'draft',
      name: (
        <div className='flex flex-col items-center gap-2'>
          <FaThList className='size-6' />
          <span>Draft</span>
        </div>
      ),
      url: `${baseUrl}/draft`,
    },
  ]

  return (
    <NavigationMenu.Root className='flex-1 bg-transparent'>
      <NavigationMenu.List className='flex gap-1__ list-none bg-transparent divide-x'>
        {navItems?.map((item) => {
          const hasMenu = !!item?.menu?.links?.length
          return (
            <NavigationMenu.Item key={item?.id} className='flex-1'>
              {!hasMenu ? (
                <NavLink
                  className={cn(
                    'transition hover:bg-brand/10 hover:text-dark-gray/90 text-dark-gray block select-none px-3 py-3 font-medium text-center leading-none no-underline data-[active]:text-brand',
                  )}
                  href={item?.url}
                >
                  {item?.name}
                </NavLink>
              ) : (
                <NavDropdown item={item} />
              )}
            </NavigationMenu.Item>
          )
        })}

        <NavigationMenu.Indicator className='data-[visible]:animate-fadeIn data-[hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative h-[2px] w-10 rounded bg-brand/20' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default LeagueNavbar
