'use client'

import { signIn } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

import { authOptions } from '@/utils/auth/config'
import { cn } from '@/utils/style'

type Props = {
  className?: string
}
const YahooSignInButton: FC<Props> = ({ className }) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const provider = authOptions?.providers.find((p) => p?.id === 'yahoo')

  const { resolvedTheme } = useTheme()

  return (
    <button
      className={cn('mx-auto max-w-72', className)}
      onClick={() => signIn(provider?.id, { callbackUrl })}
    >
      <img
        src={
          resolvedTheme === 'dark'
            ? '/images/yahoo-signin-dark.png'
            : '/images/yahoo-signin.png'
        }
        alt='Sign in with Yahoo'
      />
    </button>
  )
}

export default YahooSignInButton
