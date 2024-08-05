import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FC } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import { cn } from '@/utils/style'

type Props = {
  className?: string
  type?: 'login' | 'logout' | 'dynamic'
}

const AuthLink: FC<Props> = async ({ className, type = 'dynamic' }) => {
  const session = await getServerSession()
  const isAuthenticated = !!session?.user

  const Login = (
    <Link href='/api/auth/signin' className={cn('btn sm:w-fit', className)}>
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
