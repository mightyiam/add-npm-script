const modifyPkgUp = require('modify-pkg-up')

const addNpmScript = (name, script) => {
  if (typeof name !== 'string' || typeof script !== 'string') {
    throw new TypeError('expected a string')
  }

  const modifierFn = (pkg) => {
    if (!pkg.scripts) {
      pkg.scripts = {}
    }
    pkg.scripts[name] = script
    return pkg
  }

  return modifyPkgUp(modifierFn)
}

module.exports = addNpmScript
