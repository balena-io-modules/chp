var CHP = require('./chp')

class Command {
  constructor () {
    this.name = 'unknown'
    this.value = 0
    this.type = -1
    this.compression = 0
    this.version = 2
    this.length = 0
    this.data = null
  }

  static parse (buffer, offset) {
    return new Command().parse(buffer, offset)
  }

  get size () {
    return Command.size + this.length
  }

  parse (buffer, offset) {
    offset = offset || 0

    this.value = buffer.readUInt32LE(offset + 0)
    this.type = buffer.readUInt8(offset + 4)
    this.compression = buffer.readUInt8(offset + 5)
    this.version = buffer.readUInt8(offset + 6)
    this.length = buffer.readUInt32LE(offset + 8)

    this.name = CHP.getCommandName(this.type)

    return this
  }

  write (buffer, offset) {
    buffer = buffer || Buffer.alloc(this.length)
    offset = offset || 0

    buffer.writeUInt32LE(this.value, offset + 0)
    buffer.writeUInt8(this.type, offset + 4)
    buffer.writeUInt8(this.compression, offset + 5)
    buffer.writeUInt8(this.version, offset + 6)
    buffer.writeUInt32LE(this.length, offset + 8)

    return buffer
  }
}

/**
 * Command structure size in bytes
 * NOTE: Without data length
 * @type {Number}
 * @constant
 */
Command.size = 12

module.exports = Command
