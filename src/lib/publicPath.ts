/**
 * Produces links that work from both a custom-domain root and a GitHub Pages
 * project subdirectory after each route is rendered to its own HTML file.
 */
export function publicPath(path: string, currentPath = '/') {
  const normalizedPath = path.replace(/^\/+/, '')

  // The Pages artifact adds a per-page <base> tag during prerendering, so
  // every static link resolves from the site root on either host.
  if (import.meta.env.MODE === 'pages') return normalizedPath ? `./${normalizedPath}` : './'

  const depth = currentPath.split('/').filter(Boolean).length
  const prefix = '../'.repeat(depth) || './'
  return normalizedPath ? `${prefix}${normalizedPath}` : prefix
}

export function assetPath(path: string) {
  if (import.meta.env.MODE === 'pages' && path.startsWith('/')) return `.${path}`
  return path
}
