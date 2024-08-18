import axios, { AxiosError } from 'axios'

import { SessionToken } from '@/utils/auth/types'
import { parser } from '@/utils/xml'

export type FetchResponse<TData = unknown> = {
  data: TData | null
  status?: number
  success: boolean
  message?: string
}

export type FantasyApiResponse<TData = Record<string, unknown>> = {
  fantasyContent?: TData
}

export const isSuccess = (status?: number) => {
  if (!status) return false
  return status >= 200 && status < 300
}

export const parseFantasyData = <TData = Record<string, unknown>>(
  data: string,
) => {
  if (!data) return null
  let parsedData: FantasyApiResponse<TData> = {}
  parser().parseString(data, (_err, result) => (parsedData = result))
  return parsedData?.fantasyContent ?? null
}

export const yahooFetch = async <TData = Record<string, unknown>>({
  url,
  token,
}: {
  url: string
  token: SessionToken['accessToken']
}): Promise<FetchResponse<TData>> => {
  try {
    const response = await axios.get(
      `${process.env.YAHOO_FANTASY_API_BASE_URL}${url}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    const data = parseFantasyData<TData>(response?.data)

    return {
      data,
      status: response?.status,
      success: isSuccess(response?.status),
      message: response?.statusText,
    }
  } catch (error) {
    const { response } = error as AxiosError
    return {
      data: null,
      status: response?.status ?? 500,
      success: isSuccess(response?.status),
      message: response?.statusText,
    }
  }
}
