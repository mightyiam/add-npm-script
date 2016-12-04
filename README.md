[![Build Status](https://travis-ci.org/mightyiam/add-npm-script.svg?branch=master)](https://travis-ci.org/mightyiam/add-npm-script)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# add-npm-script

Adds a provided script to `package.json`.

## Why?

- [Reads closest `package.json`](https://www.npmjs.com/package/read-pkg-up)
  and [writes](https://www.npmjs.com/package/write-pkg) to it.
- Appropriate for set up of development tools
  like linters and test runners.

## How?

### Example

```js
const addNpmScript = require('add-npm-script')
addNpmScript('wow', 'echo such nice. much like.'
```

```console
$ npm run wow
such nice. much like.
```

### API

#### `addNpmScript(name, script)`

- `name`:
  name of the script
- `script`:
  script itself

Is a synchronous function.
