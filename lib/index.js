const modifyPkgUp = require('modify-pkg-up')

const addNpmScript = (name, script) => {
  if (typeof name !== 'string' || typeof script !== 'string') {
    throw new TypeError('expected a string')
  }

  const modifierFn = (pkgJson) => {
    if (!pkgJson.scripts) {
      pkgJson.scripts = {}
    }
    pkgJson.scripts[name] = script
    return pkgJson
  }

  return modifyPkgUp(modifierFn)
}

module.exports = addNpmScript
