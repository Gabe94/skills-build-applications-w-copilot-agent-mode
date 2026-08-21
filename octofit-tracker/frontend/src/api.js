const codespaceName = import.meta.env.VITE_CODESPACE_NAME

function getApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  if (typeof window !== 'undefined') {
    const codespacesHost = window.location.hostname.match(/^(.*)-5173\.app\.github\.dev$/)

    if (codespacesHost?.[1]) {
      return `https://${codespacesHost[1]}-8000.app.github.dev/api`
    }
  }

  return 'http://localhost:8000/api'
}

export const apiBaseUrl = getApiBaseUrl()

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

function resolveEndpointPath(endpointPath) {
  if (endpointPath.startsWith('http')) {
    return endpointPath
  }

  if (endpointPath.startsWith('/api/')) {
    return endpointPath.slice('/api'.length)
  }

  if (endpointPath.startsWith('/')) {
    return endpointPath
  }

  return `/${endpointPath}/`
}

export async function fetchCollection(endpointPath) {
  const resolvedEndpoint = resolveEndpointPath(endpointPath)
  const requestUrl = resolvedEndpoint.startsWith('http')
    ? resolvedEndpoint
    : `${apiBaseUrl}${resolvedEndpoint}`
  const response = await fetch(requestUrl)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollectionResponse(payload)
}