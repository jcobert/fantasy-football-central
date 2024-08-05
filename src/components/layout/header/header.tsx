import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FC } from 'react'

import DesktopNav from '@/components/layout/header/desktop-nav'
import MobileNav from '@/components/layout/header/mobile-nav'
import Logo from '@/components/logo'

const Header: FC = async () => {
  // const session = await getServerSession()
  return (
    <>
      <MobileNav />

      <div className='hidden print:hidden z-50 sm:block w-full border-b-2 py-2 sticky top-0 background-saturate-150 backdrop-blur-lg bg-background/80'>
        <div className='sm:flex items-center gap-6 w-11/12 max-w-[68.75rem] px-2 sm:px-0 mx-auto'>
          {/* Logo */}
          <Link href='/'>
            <Logo />
          </Link>
          <DesktopNav />
        </div>
      </div>
    </>
  )
}

export default Header
