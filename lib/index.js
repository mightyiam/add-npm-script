const read = require('read-pkg-up').sync
const write = require('write-pkg').sync

const addNpmScript = (name, script) => {
  if (typeof name !== 'string' || typeof script !== 'string') {
    throw new TypeError('expected a string')
  }
  const pkg = read({ normalize: false })
  pkg.pkg.scripts[name] = script
  write(pkg.path, pkg.pkg)
}

module.exports = addNpmScript
