import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { getSessionToken } from '@/utils/auth/helpers'
import { parser } from '@/utils/xml'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await getSessionToken({ req })
    const params = req.nextUrl?.searchParams
    const playerKey = params?.get('playerKey') || ''
    const resource = params?.get('resource') || ''
    const filter = params?.get('filter') || ''
    const week = params?.get('week') || ''

    const response = await axios.get(
      `${process.env.YAHOO_FANTASY_API_BASE_URL}/player/${playerKey}/${resource};type=${filter};week=${week}`,
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
    console.log('Error getting player:')
  }
}
