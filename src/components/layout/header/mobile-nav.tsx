'use client'

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

import { cn } from '@/utils/style'

import Accordion from '@/components/common/accordion'
import LoginLink from '@/components/login-link'
import Logo from '@/components/logo'

import { isActive, navItems } from '@/configuration/nav'

type Props = {
  className?: string
}

const MobileNav: FC<Props> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const session = useSession()

  const { status, data } = session
  const { user } = data || {}

  return (
    <Navbar
      disableAnimation
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className={cn(['sm:hidden', className])}
      classNames={{ wrapper: 'w-11/12 max-w-[68.75rem] px-2 sm:px-0' }}
    >
      <NavbarContent className='sm:hidden w-full grid grid-rows-1 grid-cols-12 items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='col-span-8'
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className='w-fit' />
        </Link>
        {/* Hamburger */}
        <NavbarMenuToggle className='col-start-12' />
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu className='px-8 overflow-y-auto pb-16 bg bg-background/80'>
        {/* User */}
        {user ? (
          <div className='flex items-center gap-2 border-b__ py-4'>
            <FaRegCircleUser className='text-xl' />
            <span className='text-center'>{`Hi, ${user?.name}`}</span>
          </div>
        ) : null}

        {/* Links */}
        <div className='flex flex-col gap-6 mt-6 pb-safe mb-24'>
          {navItems?.map((item) => {
            const hasMenu = !!item?.menu?.links?.length
            return (
              <NavbarMenuItem
                key={item?.id}
                className='text-right text-xl border-b border-brand-gray-medium/15 pb-2 flex justify-end'
                isActive={isActive(item, pathname)}
              >
                {!hasMenu ? (
                  <Link
                    className='w-full font-semibold text-brand-gray-dark py-2'
                    href={item?.url}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item?.name}
                  </Link>
                ) : (
                  <Accordion
                    collapsible
                    className='border-none pr-0 w-full'
                    triggerClassName='!justify-end font-semibold text-brand-gray-dark data-[state=open]:text-brand'
                    itemClassName='!p-0'
                    items={[
                      {
                        header: item?.name,
                        content: (
                          <div className='flex flex-col gap-8 bg-almost-white/40__ py-4 pr-6_ rounded border__ border-brand-gray-light/30'>
                            {!!item?.url && (
                              <Link
                                key={`${item?.id}-menu`}
                                className='w-full font-medium text-brand-gray-dark pr-8'
                                href={item?.url}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {`All ${item?.name}`}
                              </Link>
                            )}
                            {item?.menu?.links?.map((link) => (
                              <Link
                                key={link?.id}
                                className='w-full font-medium text-brand-gray-dark pr-8'
                                href={link?.url}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {link?.name}
                              </Link>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                )}
              </NavbarMenuItem>
            )
          })}
        </div>

        <LoginLink
          authenticated={status === 'authenticated'}
          className='mt-auto'
        />
      </NavbarMenu>
    </Navbar>
  )
}

export default MobileNav
