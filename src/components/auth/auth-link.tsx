'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import { cn } from '@/utils/style'

import { useCallbackUrl } from '@/hooks/use-callback-url'

type Props = {
  className?: string
  type?: 'login' | 'logout' | 'dynamic'
}

const AuthLink: FC<Props> = ({ className, type = 'dynamic' }) => {
  const session = useSession()
  const callbackUrl = useCallbackUrl()

  const isAuthenticated = session?.status === 'authenticated'

  const Login = (
    <Link
      href={`/api/auth/signin?callbackUrl=${callbackUrl}`}
      className={cn('btn sm:w-fit', className)}
    >
      <span>Sign in</span>
    </Link>
  )

  const Logout = (
    <Link
      href='/api/auth/signout'
      className={cn(
        'btn-text text-rose-700 hover:text-rose-800 transition sm:w-fit',
        className,
      )}
    >
      <TbLogout2 />
      <span>Sign out</span>
    </Link>
  )

  if (type === 'login') return !isAuthenticated ? Login : null
  if (type === 'logout') return isAuthenticated ? Logout : null

  return isAuthenticated ? Logout : Login
}

export default AuthLink
