import { NextRequest, NextResponse } from 'next/server'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { UserLeaguesDto } from '@/utils/yahoo/queries/user-leagues'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await getSessionToken({ req })
    const params = req.nextUrl?.searchParams
    const resource = params?.get('resource') || ''
    const subresource = params?.get('subresource') || ''
    const query = params?.get('query') || ''

    const endpoint =
      req.nextUrl.pathname?.split('/api/yahoo/fantasy/')?.[1] || ''

    const url = `/${endpoint}${query}`

    const response = await yahooFetch<UserLeaguesDto>({
      token: accessToken,
      url,
    })

    const { status, message } = response

    return NextResponse.json(response, { status, statusText: message })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('\n\nError at /api/users:\n\n', error)
  }
}
