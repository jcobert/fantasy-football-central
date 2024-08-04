import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { getAccessToken } from '@/utils/auth/helpers'
import { parser } from '@/utils/xml'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await getAccessToken(req)
    const params = req.nextUrl?.searchParams
    const leagueKeys = params?.get('leagueKeys') || ''
    const collection = params?.get('collection') || ''
    const subresource = params?.get('subresource') || ''

    const response = await axios.get(
      `${process.env.YAHOO_FANTASY_API_BASE_URL}/leagues;league_keys=${leagueKeys}/${collection}/${subresource}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )

    const data = await response?.data

    if (!data || response.status >= 400)
      return NextResponse.json({ success: false })

    let parsedData: { fantasyContent?: unknown } = {}
    parser().parseString(data, (err, result) => (parsedData = result))

    return NextResponse.json(parsedData?.fantasyContent ?? {})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error getting leagues:')
  }
}
