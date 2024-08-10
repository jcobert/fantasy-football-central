'use client'

import { signOut } from 'next-auth/react'
import { FC } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import Alert from '@/components/common/alert'

type Props = {
  className?: string
}

const SignOut: FC<Props> = ({ className }) => {
  return (
    <Alert
      title='Are you sure you want to sign out?'
      description=''
      confirm='Sign out'
      trigger={
        <div className='btn-text text-rose-700 hover:text-rose-800 transition sm:w-fit'>
          <TbLogout2 />
          <span>Sign out</span>
        </div>
      }
      triggerClassName='btn-text text-rose-700 hover:text-rose-800 transition sm:w-fit w-full mx-auto'
      triggerWrapperClassName={className}
      onConfirm={() => {
        signOut()
      }}
    />
  )
}

export default SignOut
