const defaultPort = 8000

export function getApiBaseUrl(port = defaultPort) {
  const codespaceName = process.env.CODESPACE_NAME

  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`
  }

  return `http://localhost:${port}`
}