var CHP = module.exports

/**
 * FEL magic
 * (523956200) [E8 EF 3A 1F]
 * @type {Number}
 * @constant
 */
CHP.FEL = 0x1F3AEFE8

/**
 * FASTBOOT magic
 * (523898896) [10 10 3A 1F]
 * @type {Number}
 * @constant
 */
CHP.FASTBOOT = 0x1F3A1010

/**
 * SPARSE image magic
 * (3978755898) [3A FF 26 ED]
 * NOTE: Primarly for detection,
 * to prevent flashing them
 * @type {Number}
 * @constant
 */
CHP.SPARSE = 0xED26FF3A

/**
 * CHP version
 * @type {Number}
 * @constant
 */
CHP.VERSION = 2

/**
 * Command types
 * @enum {Number}
 */
CHP.COMMAND = {
  MAGIC: 0,
  COMMENT: 1,
  READ: 2,
  WRITE: 3,
  USLEEP: 4,
  MANIFEST: 5,
  FEL_READ: 6,
  FEL_WRITE: 7,
  FEL_EXE: 8
}

/**
 * Get a human-readable name for a command type
 * @param {Number} type
 * @returns {String}
 */
CHP.getCommandName = function (type) {
  switch (type) {
    case CHP.COMMAND.MAGIC: return 'magic'
    case CHP.COMMAND.COMMENT: return 'comment'
    case CHP.COMMAND.READ: return 'read'
    case CHP.COMMAND.WRITE: return 'write'
    case CHP.COMMAND.USLEEP: return 'usleep'
    case CHP.COMMAND.MANIFEST: return 'manifest'
    case CHP.COMMAND.FEL_READ: return 'fel_read'
    case CHP.COMMAND.FEL_WRITE: return 'fel_write'
    case CHP.COMMAND.FEL_EXE: return 'fel_exe'
    default: return 'unknown'
  }
}

CHP.Command = require('./command')
CHP.Parser = require('./parser')
