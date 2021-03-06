/* eslint-disable no-console */

const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('\n-----------------------------------')

const getProxyLine = tunnelStarted => {
  if (tunnelStarted) {
    return `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
  }
  return ''
}

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`)

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`)
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
      getProxyLine(tunnelStarted)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  },

  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red(err))
  }
}

module.exports = logger
