'use client'

import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import SignOut from '@/components/auth/signout'

import { useCallbackUrl } from '@/hooks/use-callback-url'

type Props = {
  className?: string
  type?: 'login' | 'logout' | 'dynamic'
  onClick?: () => void
}

const AuthLink: FC<Props> = ({ className, type = 'dynamic', onClick }) => {
  const session = useSession()
  const callbackUrl = useCallbackUrl()

  const isAuthenticated = session?.status === 'authenticated'

  const { resolvedTheme } = useTheme()

  // const Login = <YahooSignInButton className={className} />
  const Login = (
    <Link
      href={`/api/auth/signin?callbackUrl=${callbackUrl}`}
      className={cn('mx-auto max-w-72', className)}
      onClick={() => onClick?.()}
    >
      <img
        src={
          resolvedTheme === 'dark'
            ? '/images/yahoo-signin-dark.png'
            : '/images/yahoo-signin.png'
        }
        alt='Sign in with Yahoo'
      />
    </Link>
  )
  // const Login = (
  //   <Link
  //     href={`/api/auth/signin?callbackUrl=${callbackUrl}`}
  //     className={cn('btn sm:w-fit', className)}
  //     onClick={() => onClick?.()}
  //   >
  //     <span>Sign in</span>
  //   </Link>
  // )

  const Logout = <SignOut className='mt-auto' />

  if (type === 'login') return !isAuthenticated ? Login : null
  if (type === 'logout') return isAuthenticated ? Logout : null

  return isAuthenticated ? Logout : Login
}

export default AuthLink
