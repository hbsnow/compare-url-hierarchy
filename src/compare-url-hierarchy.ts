import url from 'url'
import isAbsoluteUrl from 'is-absolute-url'

/**
 * Return true if the path is relative path
 * @param path
 */
const isRelative = (path: string): boolean =>
  !(isAbsoluteUrl(path) || path.startsWith('/'))

/**
 * Calculate hierarchy
 * @param path
 */
const calcHierarchy = (path: string): number =>
  (path.match(/\//gm) || []).length

/**
 * Compare url hierarchy
 * @param from based path
 * @param to compared path
 */
export default (from: string, to: string): number => {
  if (isRelative(from)) {
    throw new Error('`from` must be absolute URL')
  }

  const currentUrl = url.parse(from)
  const nextUrl = url.parse(url.resolve(from, to))

  if (currentUrl.host && nextUrl.host && currentUrl.host !== nextUrl.host) {
    throw new Error('obviously, `to` is external link')
  }

  return (
    calcHierarchy(nextUrl.path || '') - calcHierarchy(currentUrl.path || '')
  )
}
