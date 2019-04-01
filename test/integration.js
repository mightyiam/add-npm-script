const test = require('ava')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const mkdir = require('mkdir-promise')
const del = require('del')

const fixturesDir = 'test/fixtures'

test.before(async () => {
  await mkdir(fixturesDir)
  process.chdir(fixturesDir)
})

test.after(async () => {
  process.chdir('../..')
  await del([fixturesDir])
})

let testCounter = 0

test.beforeEach(async (t) => {
  t.context.n = String(testCounter++)
  await mkdir(t.context.n)
  process.chdir(t.context.n)
})

test.afterEach(() => {
  process.chdir('..')
})

const subject = require('..')
const name = 'added'
const script = 'echo I exist, as well'

const read = async () => {
  const pkg = await readPkgUp({ normalize: false })
  return pkg.pkg
}

test.serial('adds a script', async t => {
  const existing = { scripts: { existing: 'echo I exist' } }
  await writePkg(existing)
  await subject(name, script)
  const modified = await read()
  const expected = Object.assign({}, existing)
  expected.scripts[name] = script
  t.deepEqual(modified, expected)
})

test.serial('adds script when no scripts object', async (t) => {
  await writePkg({})
  await subject(name, script)
  const modified = await read()
  const expected = { scripts: { [name]: script } }
  t.deepEqual(modified, expected)
})
