var fs = require('fs')
var CHP = require('..')
var inspect = require('./inspect')
var argv = process.argv.slice(2)

var filename = argv.shift()
var parser = new CHP.Parser()

fs.createReadStream(filename)
  .pipe(parser)
  .on('error', function (error) {
    console.log(inspect(error))
  })
  .on('data', function (command) {
    console.log(inspect(command))
  })
