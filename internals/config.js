/* eslint-disable sort-keys */

const {join} = require('path')
const pullAll = require('lodash/pullAll')
const uniq = require('lodash/uniq')

const pkg = require(join(process.cwd(), 'package.json')) // eslint-disable-line import/no-dynamic-require

const ReactBoilerplate = {
  // This refers to the react-boilerplate version this project is based on.
  version: pkg.version,

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {

    /**
     * We need to exclude dependencies which are not intended for the browser
     * by listing them here.
     */
    exclude: [
      'chalk',
      'compression',
      'cross-env',
      'express',
      'ip',
      'minimist',
      'sanitize.css'
    ],

    /**
     * Specify any additional dependencies here. We include core-js and lodash
     * since a lot of our dependencies depend on them and they get picked up by webpack.
     */
    include: [
      'core-js',
      'lodash',
      'eventsource-polyfill',
      '@babel/polyfill'
    ],

    // The path where the DLL manifest and bundle will get built
    path: join(process.cwd(), 'node_modules/react-boilerplate-dlls'),

    fileName: 'reactBoilerplateDeps',

    entry() {
      const dependencyNames = Object.keys(pkg.dependencies)
      const {
        dllPlugin: {
          exclude,
          include,
          fileName
        }
      } = ReactBoilerplate
      const includeDependencies = uniq(dependencyNames.concat(include))

      return {
        [fileName]: pullAll(includeDependencies, exclude)
      }
    }
  }
}

module.exports = ReactBoilerplate
