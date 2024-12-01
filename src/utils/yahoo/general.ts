import { getPathServer } from '@/utils/server'

export const getLeagueKeyFromUrl = () => {
  const path = getPathServer()
  const leagueKey = path?.split('/')?.[2]
  return leagueKey
}
