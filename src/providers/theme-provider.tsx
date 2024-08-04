'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ThemeProviderProps

const ThemeProvider: FC<Props> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider
