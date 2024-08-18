'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React, { FC, ReactNode, useState } from 'react'

import { createQueryClient } from '@/configuration/react-query'

// let browserQueryClient: QueryClient | undefined = undefined

// const getQueryClient = () => {
//   if (isServer) {
//     return createQueryClient()
//   } else {
//     if (!browserQueryClient) browserQueryClient = createQueryClient()
//     return browserQueryClient
//   }
// }

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => createQueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
