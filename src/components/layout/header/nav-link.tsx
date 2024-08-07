'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const NavLink: FC<NavigationMenu.NavigationMenuLinkProps> = ({
  href = '',
  ...props
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        className='NavigationMenuLink'
        active={isActive}
        {...props}
      />
    </NextLink>
  )
}

export default NavLink
