import { Parser, ParserOptions, processors as defaultProcessors } from 'xml2js'

/**
 * Custom xml2js processor.
 * If key name starts with a boolean-like word (e.g. "is") and value is binary,
 * convert value to boolean.
 */
const parseNumericBoolean = (value: string, name: string) => {
  if (
    (name?.startsWith('is') &&
      (name?.[2] || '')?.toUpperCase() === name?.[2]) ||
    '' ||
    (name?.startsWith('has') &&
      (name?.[3] || '')?.toUpperCase() === name?.[3]) ||
    ''
  ) {
    if (parseInt(value, 10) === 0) return false
    if (parseInt(value, 10) === 1) return true
  }
  return value
}

/**
 * Custom xml2js processor.
 * Converts keys with underscores to camel case.
 */
const keysToCamel = (name: string) => {
  if (!name.includes('_')) return name
  const splits = name.split('_')
  const formattedSplits = splits?.map((split, i) =>
    i > 0 ? `${split.slice(0, 1)?.toUpperCase()}${split.slice(1)}` : split,
  )
  return formattedSplits?.join('')
}

/** All xml2js processors - built-in and custom. */
export const processors = {
  ...defaultProcessors,
  parseNumericBoolean,
  keysToCamel,
}

/** xml2js `Parser` with initialized options. */
export const parser = (options?: ParserOptions) => {
  return new Parser({
    explicitArray: false,
    ignoreAttrs: true,
    valueProcessors: [processors.parseNumbers, parseNumericBoolean],
    tagNameProcessors: [keysToCamel],
    ...options,
  })
}
