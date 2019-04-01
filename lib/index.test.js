const test = require('ava')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const decache = require('decache')

const modifyPkgUp = {}
modifyPkgUp.resolved = Symbol('modifyPkgUp.resolved')
modifyPkgUp.returnVal = Promise.resolve(modifyPkgUp.returnVal)

test.beforeEach((t) => {
  const subjectPath = '.'

  t.context.modifyPkgUpSpy = spy(modifierFn => modifyPkgUp.returnVal)
  mock('modify-pkg-up', t.context.modifyPkgUpSpy)

  decache(subjectPath)
  t.context.subject = require(subjectPath)
})

test('exports a function of arity 2', t => {
  const subject = t.context.subject
  t.is(typeof subject, 'function')
  t.is(subject.length, 2)
})

const args = ['foo', 'faa']

test('calls `modifyPkgUp` once', async t => {
  await t.context.subject(...args)
  t.is(t.context.modifyPkgUpSpy.args.length, 1)
})

test('`modifyPkgUp` call arg is a function', async t => {
  await t.context.subject(...args)
  t.is(typeof t.context.modifyPkgUpSpy.args[0][0], 'function')
})

test('throws when 1st argument is not a string', t => {
  const subject = t.context.subject
  t.throws(() => subject(1, 'foo'))
})

test('throws when 2nd argument is not a string', t => {
  const subject = t.context.subject
  t.throws(() => subject('foo', []))
})
