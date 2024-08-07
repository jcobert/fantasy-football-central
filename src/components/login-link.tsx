import Link from 'next/link'
import { FC } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import { cn } from '@/utils/style'

type Props = {
  className?: string
  authenticated?: boolean
}

const LoginLink: FC<Props> = ({ className, authenticated = false }) => {
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

  return authenticated ? Logout : Login
}

export default LoginLink
