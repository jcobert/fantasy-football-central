import { NextRequest, NextResponse } from 'next/server'

import { getSessionToken } from '@/utils/auth/helpers'
import { yahooFetch } from '@/utils/yahoo/fetch'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await getSessionToken({ req })

    const url = req.nextUrl.pathname?.split('/api/yahoo/fantasy')?.[1] || ''

    const response = await yahooFetch({
      token: accessToken,
      url,
    })

    const { status, message } = response

    return NextResponse.json(response, { status, statusText: message })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      '\n\nError fetching from Yahoo Fantasy Sports API:\n\n',
      error,
    )
  }
}
