import { Session } from 'next-auth'
import Link, { LinkProps } from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

import Logo from '@/components/logo'

import { homeUrl } from '@/configuration/nav'

type Props = Partial<LinkProps> & {
  session?: Session | null
  className?: string
}

const LogoLink: FC<Props> = ({ session, className, href, ...props }) => {
  const isAuthenticated = !!session?.user
  const url = href || homeUrl(isAuthenticated)
  return (
    <Link href={url} {...props} className={cn('w-fit', className)}>
      <Logo />
    </Link>
  )
}

export default LogoLink
