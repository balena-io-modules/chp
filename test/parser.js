var fs = require('fs')
var path = require('path')
var CHP = require('..')

describe('CHP.Parser', function () {
  specify('constructor', function () {
    var parser = new CHP.Parser()
  })

  specify('transform', function (done) {
    var filename = path.join(__dirname, 'data', 'spl_no_ecc.chp')
    var parser = new CHP.Parser()

    fs.createReadStream(filename)
      .on('error', done)
      .pipe(parser)
      .on('end', done)
      .on('error', done)
      .resume()
  })
})
