const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const createWebpackMiddleware = (compiler, publicPath) =>
  webpackDevMiddleware(compiler, {
    publicPath
  })

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig)
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath
  )

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  /*
   * Since webpackDevMiddleware uses memory-fs internally to store build
   * artifacts, we use it instead
   */
  const fs = middleware.context.outputFileSystem

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        const notFoundStatusCode = 404
        res.sendStatus(notFoundStatusCode)
      } else {
        res.send(file.toString())
      }
    })
  })
}
