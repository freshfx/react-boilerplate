/* eslint-disable sort-keys, camelcase, no-magic-numbers */

// Important modules this config uses
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {HashedModuleIdsPlugin} = require('webpack')

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: true
      })
    ],
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

    /*
     * Put it in the end to capture all the HtmlWebpackPlugin's
     * assets manipulations and do leak its manipulations to HtmlWebpackPlugin
     */
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

      /*
       * No need to cache .htaccess. See http://mxs.is/googmp,
       * this is applied before any match in `caches` section
       */
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        /*
         * All chunks marked as `additional`, loaded after main section
         * and do not prevent SW to install. Change to `optional` if
         * do not want them to be preloaded at all (cached only when first loaded)
         */
        additional: ['*.chunk.js']
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      ServiceWorker: {
        events: true
      }
    }),

    new WebpackPwaManifest({
      name: 'Red Bull Music',
      short_name: 'Red Bull Music',
      description: 'A Focused and Intuitive B2B Music Licensing Platform for ' +
        'Film, Television and Advertising. Full songs, compositions and ' +
        'hooks from the production music catalog “Sounds of Red Bull”, ' +
        'pre-cleared and ready for instant use in a matter of clicks, are ' +
        'easily searchable alongside artist driven repertoire from Red Bull ' +
        'Records and Red Bull Music Publishing.',
      background_color: '#fafafa',
      theme_color: '#b1624d',
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
          ]
        }
      ]
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    })
  ],

  performance: {
    assetFilter: assetFilename =>
      !(/(\.map$)|(^(main\.|favicon\.))/u).test(assetFilename) // eslint-disable-line prefer-named-capture-group
  }
})
