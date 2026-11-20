/**
 * Produces links that work from both a custom-domain root and a GitHub Pages
 * project subdirectory after each route is rendered to its own HTML file.
 *
 * These links must remain correct after client hydration, when the static
 * document's temporary <base> tag is no longer present in the managed head.
 */
export function publicPath(path: string, currentPath = '/') {
  const normalizedPath = path.replace(/^\/+/, '')
  const depth = currentPath.split('/').filter(Boolean).length
  const prefix = '../'.repeat(depth) || './'
  return normalizedPath ? `${prefix}${normalizedPath}` : prefix
}

export function assetPath(path: string, currentPath = '/') {
  if (import.meta.env.MODE === 'pages') {
    // Vite emits relative asset URLs during SSR and absolute URLs in the
    // browser. Normalize both using the rendered route, never window state.
    const bundledAsset = path.match(/^(?:https?:\/\/[^/]+)?(?:\.\/)?\/?(assets\/[^?#]+)([?#].*)?$/)
    if (bundledAsset) return publicPath(`/${bundledAsset[1]}${bundledAsset[2] ?? ''}`, currentPath)
    if (path.startsWith('/') && !path.startsWith('//')) return publicPath(path, currentPath)
  }
  return path
}
