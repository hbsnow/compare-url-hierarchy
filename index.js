'use strict'

const url = require('url')
const isAbsoluteUrl = require('is-absolute-url')

module.exports = (from, to) => {
  if (!(isAbsoluteUrl(from) || from.startsWith('/'))) {
    throw new Error('`from` must be absolute URL')
  }

  const current = url.parse(from)
  const next = url.parse(url.resolve(from, to))

  if (current.host && next.host && current.host !== next.host) {
    throw new Error('obviously, `to` is external link')
  }

  return next.path.match(/\//gm).length - current.path.match(/\//gm).length
}
