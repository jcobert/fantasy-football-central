'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { ReactNode } from 'react'

export const AuthProvider = ({
  children,
  ...rest
}: SessionProviderProps): ReactNode => {
  return <SessionProvider {...rest}>{children}</SessionProvider>
}
