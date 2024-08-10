import { usePathname, useSearchParams } from 'next/navigation'

export const useCallbackUrl = () => {
  const pathname = usePathname()
  const params = useSearchParams()?.toString()

  const callbackUrl = `${pathname}${params ? '?' : ''}${params}`

  return callbackUrl
}
