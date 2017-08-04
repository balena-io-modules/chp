# CHP
[![npm](https://img.shields.io/npm/v/chp.svg?style=flat-square)](https://npmjs.com/package/chp)
[![npm license](https://img.shields.io/npm/l/chp.svg?style=flat-square)](https://npmjs.com/package/chp)
[![npm downloads](https://img.shields.io/npm/dm/chp.svg?style=flat-square)](https://npmjs.com/package/chp)
[![build status](https://img.shields.io/travis/resin-io/chp/master.svg?style=flat-square)](https://travis-ci.org/resin-io/chp)

CHIP image format

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save chp
```

## Usage

```js
var CHP = require('chp')
```

### Parsing a .chp image

```js
var fs = require('fs')
var argv = process.argv.slice(2)

var filename = argv.shift()
var parser = new CHP.Parser()

fs.createReadStream(filename)
  .pipe(parser)
  .on('data', function (command) {
    console.log(command)
  })
```
