var stream = require('stream')
var CHP = require('./chp')

class Parser extends stream.Transform {
  constructor (options) {
    super({ readableObjectMode: true })
    this._chunks = []
  }

  _parseCommand (buffer, offset) {
    var command = null
    try {
      command = CHP.Command.parse(buffer, offset)
    } catch (error) {
      this.emit('error', error)
    }
    return command
  }

  _transform (buffer, _, next) {
    var offset = 0
    var command = null

    if (this._chunks.length) {
      this._chunks.push(buffer)
      buffer = Buffer.concat(this._chunks)
      this._chunks = []
    }

    while ((offset + CHP.Command.size) < buffer.length) {
      if (!(command = this._parseCommand(buffer, offset))) {
        break
      }

      // The first MAGIC command contains the filesize,
      // all latter MAGIC commands should have a length of zero
      if (command.type === CHP.COMMAND.MAGIC) {
        this.push(command)
        offset += CHP.Command.size
        continue
      }

      if (offset + command.size > buffer.length) {
        this._chunks.push(buffer.slice(offset))
        break
      }

      command.data = Buffer.alloc(command.length)
      buffer.copy(command.data, 0, offset + CHP.Command.size)

      this.push(command)

      offset += command.size
    }

    next()
  }
}

module.exports = Parser
