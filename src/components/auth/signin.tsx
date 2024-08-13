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
    // <div className='flex mt-auto items-center justify-center p-16'>
    //   <div className='border p-8 w-fit__ rounded mt-auto'>
    //     <button
    //       className='mx-auto max-w-72'
    //       onClick={() => signIn(provider?.id, { callbackUrl })}
    //     >
    //       <img src='/images/yahoo-signin.png' alt='Sign in with Yahoo' />
    //     </button>
    //   </div>
    // </div>
  )
}

export default SignIn
