/* eslint-disable sort-keys, camelcase, no-magic-numbers, no-sync */

/**
 * COMMON WEBPACK CONFIGURATION
 */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const configFiles = fs.readdirSync(path.resolve(process.cwd(), 'app/config'))
const robotFiles = fs.readdirSync(path.resolve(process.cwd(), 'app/public/robots'))

/*
 * Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
 * 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
 * see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
 * in the next major version of loader-utils.'
 */
process.noDeprecation = true

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        // Transform all .js files required somewhere with Babel
        test: /\.js$/u,
        exclude: /node_modules/u,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery
        }
      },
      {

        /*
         * Preprocess our own .css files
         * This is the place to add your own loaders (e.g. sass/less etc.)
         * for a list of loaders, see https://webpack.js.org/loaders/#styling
         */
        test: /\.css$/u,
        exclude: /node_modules/u,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/u,
        include: /node_modules/u,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/u,
        use: 'file-loader'
      },
      {
        test: /\/robots(\.\w+)?\.txt$/u,
        use: {
          loader: 'file-loader',
          options: {
            name: 'robots.txt'
          }
        }
      },
      {
        test: /\.svg$/u,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/u,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false

                /*
                 * NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                 * Try enabling it in your environment by switching the config to:
                 * enabled: true,
                 * progressive: true,
                 */
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.html$/u,
        use: 'html-loader'
      },
      {
        test: /\.(mp4|webm)$/u,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // Make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    }),

    /*
     * Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
     * inside your code for any environment checks; UglifyJS will automatically
     * drop any unreachable code.
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_NUMBER: JSON.stringify(process.env.BUILD_NUMBER),
        BUILD_ID: JSON.stringify(process.env.BUILD_ID),
        BUILD_TAG: JSON.stringify(process.env.BUILD_TAG),
        GIT_COMMIT: JSON.stringify(process.env.GIT_COMMIT),
        GIT_BRANCH: JSON.stringify(process.env.GIT_BRANCH),
        PORT: JSON.stringify(process.env.PORT || 3000),
        APP_ENV: JSON.stringify(process.env.APP_ENV)
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/app\/config\/index.js/u, result => {
      const appEnv = process.env.APP_ENV || 'index'
      const filename = configFiles.find(file => file.indexOf(appEnv) === 0) || 'index.js'
      const request = result.request.replace(/app\/config\/.+$/u, `app/config/${filename}`)
      const resource = result.resource.replace(/app\/config\/.+$/u, `app/config/${filename}`)
      Object.assign(result, {
        request,
        resource
      })
    }),
    new webpack.NormalModuleReplacementPlugin(/^(\.\/)?public\/robots\/robots\.txt/u, result => {
      if (!process.env.APP_ENV) {
        return
      }
      const appEnv = process.env.APP_ENV
      const filename = robotFiles.find(file => file.indexOf(`robots.${appEnv}.txt`) === 0) || 'robots.txt'
      const request = result.request.replace(/public\/robots\/robots\.txt$/u, `public/robots/${filename}`)
      Object.assign(result, {
        request,
        resource: request
      })
    })
  ]),
  resolve: {
    alias: {
      moment$: 'moment/moment.js'
    },
    modules: [
      'node_modules',
      'app'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js'
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ]
  },
  devtool: options.devtool,
  // Make web variables accessible to webpack, e.g. window
  target: 'web',
  performance: options.performance || {}
})
