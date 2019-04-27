import test from 'ava'
import compare from '../src/compare-url-hierarchy'

test('同じ階層であれば0を戻す', t => {
  t.is(compare('/', '/foo'), 0)
  t.is(compare('/', '/foo.html'), 0)
  t.is(compare('/foo/', '/foo/bar'), 0)
  t.is(compare('/foo/', '/foo/bar.html'), 0)
  t.is(compare('https://example.org/foo', '/foo.html'), 0)
  t.is(compare('https://example.org', '/foo'), 0)
  t.is(compare('https://example.org', '.'), 0)
  t.is(compare('https://example.org', 'https://example.org/foo'), 0)
})

test('親階層であればfromからの相対的な階層数を負の値で戻す', t => {
  t.is(compare('/foo/', '/'), -1)
  t.is(compare('/foo/bar', '/'), -1)
  t.is(compare('/foo/bar.html', '/'), -1)
  t.is(compare('/foo/bar/baz', '/foo'), -2)
  t.is(compare('https://example.org/foo/', 'https://example.org'), -1)
  t.is(compare('https://example.org/foo/', '../'), -1)
  t.is(compare('/foo/', 'https://example.org'), -1)
})

test('子階層であればfromからの相対的な階層数を正の値で戻す', t => {
  t.is(compare('/', '/foo/'), 1)
  t.is(compare('/', 'https://example.org/foo/bar/baz'), 2)
  t.is(compare('https://example.org', 'foo/bar'), 1)
  t.is(compare('https://example.org/foo/', '../bar/baz/'), 1)
})

test('fromが相対パスならエラー', t => {
  const error = t.throws(() => {
    compare('foo/', '/')
  }, Error)

  t.is(error.message, '`from` must be absolute URL')
})

test('外部へのリンクであることが自明であればエラー', t => {
  const error = t.throws(() => {
    compare('https://example.org/foo/', 'https://example.com/foo/')
  }, Error)

  t.is(error.message, 'obviously, `to` is external link')
})
