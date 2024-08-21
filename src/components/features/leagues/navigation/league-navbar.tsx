'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { FC } from 'react'

import { cn } from '@/utils/style'

import NavDropdown from '@/components/layout/header/nav-dropdown'
import NavLink from '@/components/layout/header/nav-link'

import { NavItem } from '@/configuration/nav'

type Props = {
  leagueId: string
}

const LeagueNavbar: FC<Props> = ({ leagueId }) => {
  const baseUrl = `/leagues/${leagueId}`

  const navItems: NavItem[] = [
    { id: 'league', name: 'League', url: baseUrl },
    { id: 'team', name: 'My Team', url: `${baseUrl}/team` },
    { id: 'draft', name: 'Draft', url: `${baseUrl}/draft` },
  ]

  return (
    <NavigationMenu.Root className='z-[1]__ flex-1'>
      <NavigationMenu.List className='flex gap-1__ list-none bg-gray-50'>
        {navItems?.map((item) => {
          const hasMenu = !!item?.menu?.links?.length
          return (
            <NavigationMenu.Item key={item?.id} className='flex-1'>
              {!hasMenu ? (
                <NavLink
                  className={cn(
                    'transition hover:bg-brand/10 block select-none px-3 py-6 font-medium text-center leading-none no-underline data-[active]:text-brand border-r',
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
