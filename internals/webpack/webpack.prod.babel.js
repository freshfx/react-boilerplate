/* eslint-disable sort-keys, camelcase, no-magic-numbers */

// Important modules this config uses
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  stats: {
    assetsSpace: Infinity,
    modulesSpace: 0
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true
      })
    ],
    moduleIds: 'named',
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {chunks: 'async'},
    runtimeChunk: true
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      exclude: ['.htaccess'],
      skipWaiting: true
    }),

    new WebpackPwaManifest({
      name: 'FreshFx React Boilerplate',
      short_name: 'FreshFx React Boilerplate',
      description: 'The Boilerplate for all FreshFx React applications',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      ios: true,
      icons: [
        {
          src: path.resolve('app/public/icon-512x512.png'),
          sizes: [
            72,
            96,
            120,
            128,
            144,
            152,
            167,
            180,
            192,
            384,
            512
          ],
          ios: true
        }
      ]
    })
  ],

  performance: {
    assetFilter: assetFilename =>
      !(/(\.map$)|(^(main\.|favicon\.))/u).test(assetFilename) // eslint-disable-line prefer-named-capture-group
  }
})
