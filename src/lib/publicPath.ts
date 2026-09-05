export function publicPath(path: string, basePath = import.meta.env.BASE_URL) {
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const normalizedPath = path.replace(/^\/+/, '')
  return `${normalizedBase}${normalizedPath}`
}
