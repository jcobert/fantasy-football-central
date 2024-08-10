'use client'

import { useSession } from 'next-auth/react'
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

  const Login = (
    <Link
      href={`/api/auth/signin?callbackUrl=${callbackUrl}`}
      className={cn('btn sm:w-fit', className)}
      onClick={() => onClick?.()}
    >
      <span>Sign in</span>
    </Link>
  )

  const Logout = <SignOut className='mt-auto' />

  if (type === 'login') return !isAuthenticated ? Login : null
  if (type === 'logout') return isAuthenticated ? Logout : null

  return isAuthenticated ? Logout : Login
}

export default AuthLink
