'use client'

import { NextUIProvider, ProviderContextProps } from '@nextui-org/react'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ProviderContextProps

const NextUiProvider: FC<Props> = ({ children, ...props }) => {
  return <NextUIProvider {...props}>{children}</NextUIProvider>
}

export default NextUiProvider
