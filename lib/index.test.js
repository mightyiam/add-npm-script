const { test } = require('ava')
const { spy } = require('simple-spy')
const mock = require('mock-require')

const readPkgUpSyncReturn = { path: Symbol('readPkgUpSyncReturn.path'), pkg: { scripts: { lint: 'standard' } } }
const readPkgUpSyncStub = options => readPkgUpSyncReturn
const readPkgUpSyncSpy = spy(readPkgUpSyncStub)
mock('read-pkg-up', { sync: readPkgUpSyncSpy })

const writePkgSyncSpy = spy((path, data) => undefined)
mock('write-pkg', { sync: writePkgSyncSpy })

const subject = require('.')

test.beforeEach(() => {
  readPkgUpSyncSpy.reset()
  writePkgSyncSpy.reset()
})

test('exports a function of arity 2', t => {
  t.is(typeof subject, 'function')
  t.is(subject.length, 2)
})

const args = ['foo', 'faa']

test('calls `readPkgUp.sync` once', t => {
  subject(...args)
  t.is(readPkgUpSyncSpy.args.length, 1)
})

test('calls `writePkg.sync` once', t => {
  subject(...args)
  t.is(writePkgSyncSpy.args.length, 1)
})

test('`readPkgUp.sync` call arg is `{ normalize: false }`', t => {
  subject(...args)
  t.deepEqual(readPkgUpSyncSpy.args[0][0], { normalize: false })
})

test('`writePkg.sync` call 1st arg is `path` of what `readPkgUp.sync` returns', t => {
  subject(...args)
  t.is(writePkgSyncSpy.args[0][0], readPkgUpSyncReturn.path)
})

test('`writePkg.sync` call 2nd arg is `pkg` of what `readPkgUp.sync` returns', t => {
  subject(...args)
  t.is(writePkgSyncSpy.args[0][1], readPkgUpSyncReturn.pkg)
})

test('`writePkg.sync` call 2nd arg includes provided script', t => {
  subject(...args)
  t.deepEqual(
    writePkgSyncSpy.args[0][1],
    { scripts: { lint: 'standard', [args[0]]: args[1] } }
  )
})

test('throws when 1st argument is not a string', t => {
  t.throws(() => subject(1, 'foo'))
})

test('throws when 2nd argument is not a string', t => {
  t.throws(() => subject('foo', []))
})
