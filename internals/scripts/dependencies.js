// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0)
}

require('shelljs/global')

const path = require('path')
const fs = require('fs')

const exists = fs.existsSync
const writeFile = fs.writeFileSync

const pkg = require(path.join(process.cwd(), 'package.json'))
const { dllPlugin } = require('../config')

const { path: outputPath } = dllPlugin
const dllManifestPath = path.join(outputPath, 'package.json')

/**
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      {
        name: 'react-boilerplate-dlls',
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
      },
      null,
      2,
    ),
    'utf8',
  )
}

// The BUILDING_DLL env var is set to avoid confusing the development environment
exec(
  'cross-env BUILDING_DLL=true NODE_ENV=development webpack --stats-chunks --stats-colors --config internals/webpack/webpack.dll.babel.js',
)
