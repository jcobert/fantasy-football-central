import { NextRequest, NextResponse } from 'next/server'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'
import { UserLeaguesDto } from '@/utils/yahoo/types/dto/user/user-leagues-dto'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await getSessionToken({ req })
    const params = req.nextUrl?.searchParams
    const resource = params?.get('resource') || ''
    const subresource = params?.get('subresource') || ''

    const response = await yahooFetch<UserLeaguesDto>({
      token: accessToken,
      url: `/users;use_login=1/games;game_codes=nfl/${resource}/${subresource}`,
    })

    const { status, message } = response

    return NextResponse.json(response, { status, statusText: message })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('\n\nError at /api/users:\n\n', error)
  }
}
