'use client'

/* eslint-disable @next/next/no-img-element */
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

import { authOptions } from '@/utils/auth/config'

const SignIn: FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const provider = authOptions?.providers.find((p) => p?.id === 'yahoo')

  return (
    <div className='flex mt-auto items-center justify-center p-16'>
      <div className='border p-8 w-fit__ rounded mt-auto'>
        <button
          className='mx-auto max-w-72'
          onClick={() => signIn(provider?.id, { callbackUrl })}
        >
          <img src='/images/yahoo-signin.png' alt='Sign in with Yahoo' />
        </button>
      </div>
    </div>
  )
}

export default SignIn
