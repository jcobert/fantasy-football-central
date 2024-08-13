'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'

import { authOptions } from '@/utils/auth/config'

import LoadingDots from '@/components/common/loading-dots'

const SignIn: FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const provider = authOptions?.providers.find((p) => p?.id === 'yahoo')

  useEffect(() => {
    signIn(provider?.id, { callbackUrl })
  }, [])

  return (
    <div className='flex items-end justify-center gap-2'>
      <p className='text-xl font-medium'>Signing you in</p>
      <LoadingDots className='self-center mt-3' />
    </div>
  )
}

export default SignIn
