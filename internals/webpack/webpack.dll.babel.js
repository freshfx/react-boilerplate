/* eslint-disable sort-keys, no-magic-numbers */

/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const {join} = require('path')
const webpack = require('webpack')
const {dllPlugin} = require('../config')

if (!dllPlugin) {
  /* eslint-disable-next-line no-process-exit */
  process.exit(0)
}

const {path: outputPath} = dllPlugin

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  context: process.cwd(),
  entry: dllPlugin.entry(),
  optimization: {
    minimize: false
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json')
    })
  ],
  performance: {
    hints: false
  }
})
