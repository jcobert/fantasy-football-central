import { Session } from 'next-auth'
import { FC } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

import SignOut from '@/components/auth/signout'
import Popover from '@/components/common/popover'
import UserGreeting from '@/components/layout/header/user-greeting'

const UserMenu: FC<{ session: Session | null }> = ({ session }) => {
  const { user } = session || {}
  if (!user) return null

  return (
    <Popover
      trigger={<FaRegCircleUser />}
      triggerProps={{
        className: 'text-brand hover:text-brand-dark transition text-2xl',
      }}
    >
      <div className='bg-white rounded border p-2 px-4 shadow flex flex-col gap-4 min-w-56'>
        <UserGreeting user={user} />
        <SignOut />
      </div>
    </Popover>
  )
}

export default UserMenu
