export type ResourceQueryParams = {
  resource?: string
  resourceKey?: string
  subresources?: string[]
  nestedSubresources?: string[]
}

export const resourceQuery = (params?: ResourceQueryParams) => {
  const { resource, resourceKey } = params || {}
  const base = `/${resource}/${resourceKey}`

  const subresources =
    (params?.subresources || [])?.length > 1
      ? `;out=${params?.subresources?.join(',')}`
      : ''

  const subresource =
    params?.subresources?.length === 1 ? `/${params?.subresources?.[0]}` : ''

  const nestedSubresources =
    subresource && (params?.nestedSubresources || [])?.length > 1
      ? `;out=${params?.nestedSubresources?.join(',')}`
      : ''

  const nestedSubresource =
    subresource && params?.nestedSubresources?.length === 1
      ? `/${params?.nestedSubresources}`
      : ''

  let url = base

  if (subresources) {
    url = `${base}${subresources}`
  } else if (nestedSubresources) {
    url = `${base}${subresource}${nestedSubresources}`
  } else if (nestedSubresource) {
    url = `${base}${subresource}${nestedSubresources}`
  } else if (subresource) {
    url = `${base}${subresource}`
  }
  return url
}
