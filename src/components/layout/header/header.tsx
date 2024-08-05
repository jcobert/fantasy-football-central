import Link from 'next/link'
import { FC } from 'react'

import DesktopNav from '@/components/layout/header/desktop-nav'

const Header: FC = () => {
  return (
    <div className='hidden print:hidden z-50 sm:block w-full border-b-2 py-2 sticky top-0 background-saturate-150 backdrop-blur-lg bg-background/80'>
      <div className='sm:flex items-center gap-6 w-11/12 max-w-[68.75rem] px-2 sm:px-0 mx-auto'>
        {/* Logo */}
        <Link
          href='/'
          className='text-zinc-50 flex items-center gap-[2px] text-lg bg-brand hover:bg-brand-dark transition-all px-2 py-1 border font-bold rounded'
        >
          <span>FF</span>
          <span className='text-sm mt-[2px] text-brand-alt'>Central</span>
        </Link>
        <DesktopNav />
      </div>
    </div>
  )
}

export default Header
