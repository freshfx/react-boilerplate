const argv = require('./argv')

/* eslint-disable-next-line no-process-env */
module.exports = parseInt(argv.port || process.env.PORT || '3000', 10)
