import { Session } from 'next-auth'
import { FC } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

import AuthLink from '@/components/auth-link'
import Popover from '@/components/common/popover'

export const UserGreeting: FC<{ user: Session['user'] }> = ({ user }) => {
  if (!user) return null
  return (
    <div className='flex items-center justify-center mx-auto w-fit gap-2'>
      <div className='h-auto my-auto transition-all rounded-full w-9'>
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user?.image || ''}
            alt='profile avatar'
            className='object-scale-down object-center rounded-full'
          />
        ) : (
          <FaRegCircleUser className='text-xl' />
        )}
      </div>
      <div className='flex flex-col'>
        <div className='font-medium'>Hi, {user?.name}</div>
        <div className='-mt-1 text-xs text-medium-gray'>{user?.email}</div>
      </div>
    </div>
  )
}

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

        <AuthLink className='mx-auto' />
      </div>
    </Popover>
  )
}

export default UserMenu
