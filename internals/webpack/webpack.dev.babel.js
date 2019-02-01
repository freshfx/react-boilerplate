/* eslint-disable sort-keys, camelcase, no-magic-numbers, no-sync */

/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path')
const fs = require('fs')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const {UnusedFilesWebpackPlugin} = require('unused-files-webpack-plugin')
const logger = require('../../server/logger')
const {dllPlugin} = require('../config')

const plugins = [
  // Tell webpack we want hot reloading
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    // Inject all files that are generated by webpack, e.g. bundle.js
    inject: true,
    template: 'app/index.html'
  }),
  new CircularDependencyPlugin({
    // Exclude node_modules
    exclude: /a\.js|node_modules/u,
    // Show a warning when there is a circular dependency
    failOnError: false
  })
]

if (dllPlugin) {
  glob.sync(`${dllPlugin.path}/*.dll.js`).forEach(dllPath => {
    plugins.push(new AddAssetHtmlPlugin({
      filepath: dllPath,
      includeSourcemap: false
    }))
  })
}

/*
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.
 *
 */
const dependencyHandlers = () => {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL) {
    return []
  }

  /*
   * Don't do anything if package.json does not have a dllPlugin property
   * Code splitting now included by default in Webpack 4
   */
  if (!dllPlugin) {
    return []
  }

  const dllPath = path.resolve(
    process.cwd(),
    dllPlugin.path || 'node_modules/react-boilerplate-dlls',
  )

  /**
   * If DLLs aren't explicitly defined, we assume all production dependencies listed in package.json
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   */
  const manifestPath = path.resolve(dllPath, `${dllPlugin.fileName}.json`)

  if (!fs.existsSync(manifestPath)) {
    logger.error('The DLL manifest is missing. Please run `npm run build:dll`')
    /* eslint-disable-next-line no-process-exit */
    process.exit(0)
  }

  return [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath) // eslint-disable-line global-require, import/no-dynamic-require
    })
  ]
}

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  // Add hot reloading in development
  entry: [
    // Necessary for hot reloading with IE
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    // Start with js/app.js
    path.join(process.cwd(), 'app/app.js')
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  optimization: {
    minimize: false
  },

  // Add development plugins
  plugins: [
    ...dependencyHandlers(),
    new UnusedFilesWebpackPlugin({
      patterns: ['app/**/*.*'],
      globOptions: {
        ignore: [
          'app/**/*.test.*',
          'app/config/*.js',
          'app/public/robots/*.txt',
          'app/public/icon-512x512.png'
        ]
      }
    }),
    ...plugins
  ],

  /*
   * Emit a source map for easier debugging
   * See https://webpack.js.org/configuration/devtool/#devtool
   */
  devtool: 'eval-source-map',

  performance: {
    hints: false
  }
})
