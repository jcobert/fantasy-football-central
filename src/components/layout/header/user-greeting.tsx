import { Session } from 'next-auth'
import { FC } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

export const UserGreeting: FC<{ user: Session['user'] }> = ({ user }) => {
  if (!user) return null
  return (
    <div className='flex items-center justify-center mx-auto w-fit gap-2'>
      <div className='h-auto my-auto transition-all rounded-full w-9'>
        {user?.image ? (
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

export default UserGreeting
