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
    splitChunks: {chunks: 'all'},
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
    })
  ],

  performance: {
    assetFilter: assetFilename =>
      !(/(\.map$)|(^(main\.|favicon\.))/u).test(assetFilename) // eslint-disable-line prefer-named-capture-group
  }
})
