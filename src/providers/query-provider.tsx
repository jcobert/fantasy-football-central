'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, ReactNode, useState } from 'react'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [client] = useState(() => queryClient)
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider
