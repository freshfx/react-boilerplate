/* eslint-disable no-process-env, global-require */

const express = require('express')
const logger = require('./logger')

const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const {resolve} = require('path')

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
app.listen(port, host, err => {
  if (err) {
    logger.error(err.message)
    return
  }
  logger.appStarted(port, prettyHost)
})
