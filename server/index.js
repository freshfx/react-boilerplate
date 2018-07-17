/* eslint-disable no-process-env, global-require */

const express = require('express')
const logger = require('./logger')

const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const {resolve} = require('path')

const getNgrok = () => {
  const isDev = process.env.NODE_ENV !== 'production'
  const envTunnelEnabled = isDev && process.env.ENABLE_TUNNEL
  const isTunnel = envTunnelEnabled || argv.tunnel
  if (isTunnel) {
    return require('ngrok')
  }
  return false
}

const ngrok = getNgrok()
const app = express()

/*
 * If you need a backend, e.g. an API, add your custom backend-specific middleware here
 * app.use('/api', myApi);
 */

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
})

// Get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
// Let http.Server use its default IPv6/4 host
const host = customHost || null
const prettyHost = customHost || 'localhost'

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    logger.error(err.message)
    return
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    try {
      const url = await ngrok.connect(port)
      logger.appStarted(port, prettyHost, url)
    } catch (error) {
      logger.error(error)
    }
    return
  }
  logger.appStarted(port, prettyHost)
})
