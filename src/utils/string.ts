export const fullName = (
  first: string | null = '',
  last: string | null = '',
) => {
  return `${first}${last ? ` ${last}` : ''}`?.trim()
}

export const parseKeyFromUrl = (pathname: string, start: string) => {
  return pathname?.split(start)?.[1]?.split('/')?.[0]
}
