'use client'

import { signOut } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import Alert from '@/components/common/alert'
import LoadingDots from '@/components/common/loading-dots'

type Props = {
  className?: string
  asAlert?: boolean
}

const SignOut: FC<Props> = ({ className, asAlert = true }) => {
  useEffect(() => {
    if (!asAlert) {
      signOut()
    }
  }, [])

  if (!asAlert)
    return (
      <div className='flex items-end justify-center gap-2'>
        <p className='text-2xl font-medium'>Signing you out</p>
        <LoadingDots className='self-center mt-3' />
      </div>
    )

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
