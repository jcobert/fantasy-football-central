import axios from 'axios'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

import { getAccessToken } from '@/utils/auth/helpers'
import { parser } from '@/utils/xml'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextApiRequest) => {
  try {
    const accessToken = await getAccessToken(req)
    const url = new URL(req?.url || '')
    const params = url?.searchParams
    const collection = params?.get('collection') || ''
    const subresource = params?.get('subresource') || ''

    const response = await axios.get(
      `${process.env.YAHOO_FANTASY_API_BASE_URL}/users;use_login=1/games;game_codes=nfl/${collection}/${subresource}`,
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
    console.log('Error getting users:')
  }
}
