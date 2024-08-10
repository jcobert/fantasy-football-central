import { getServerSession } from 'next-auth'
import { FC } from 'react'

import DesktopNav from '@/components/layout/header/desktop-nav'
import MobileNav from '@/components/layout/header/mobile-nav'
import UserMenu from '@/components/layout/header/user-menu'

const Header: FC = async () => {
  const session = await getServerSession()
  return (
    <>
      <MobileNav session={session} />

      <DesktopNav>
        <div className='ml-auto flex items-center'>
          <UserMenu session={session} />
        </div>
      </DesktopNav>
    </>
  )
}

export default Header
