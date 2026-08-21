const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

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
  if (endpointPath.startsWith('/api/')) {
    return endpointPath.slice('/api'.length)
  }

  if (endpointPath.startsWith('/')) {
    return endpointPath
  }

  return `/${endpointPath}/`
}

export async function fetchCollection(endpointPath) {
  const response = await fetch(`${apiBaseUrl}${resolveEndpointPath(endpointPath)}`)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollectionResponse(payload)
}