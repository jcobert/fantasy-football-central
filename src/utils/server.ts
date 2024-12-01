import { headers } from 'next/headers'

/** Gets the current path in server/page components. */
export const getPathServer = () => {
  const headersList = headers()
  return headersList.get('x-current-path')
}
