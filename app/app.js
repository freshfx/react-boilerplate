/**
 * App.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router/immutable'
import FontFaceObserver from 'fontfaceobserver'
import {createBrowserHistory} from 'history'
import 'sanitize.css/sanitize.css'

import 'public/robots/robots.txt'

// Import root app
import App from 'containers/App'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

import ActionSubscription from 'containers/ActionSubscription'

import loadFonts from 'components/FontIcon/fontFace'

// Load the favicon and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configure-store'

// Import i18n messages
import {translationMessages} from './i18n'

// Import CSS reset and Global Styles
import GlobalStyles from './global-styles'

/*
 * Observe loading of Open Sans (to remove open sans, remove the <link> tag in
 * the index.html file and this observer)
 */
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
})

// Create redux store with history
const actionEmitter = new ActionSubscription.ActionEmitter()
const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history, actionEmitter)
const MOUNT_NODE = document.getElementById('app')

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
    loadFonts
  )
}

if (module.hot) {
  /*
   * Hot reloadable React components and translation json files
   * modules.hot.accept does not accept dynamic dependencies,
   * have to be constants at compile-time
   */
  module.hot.accept([
    './i18n',
    'containers/App'
  ], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (window.Intl) {
  render(translationMessages)
} else {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js')
      ]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
}

/*
 * Install ServiceWorker and AppCache in the end since
 * it's not most important operation and if main code fails,
 * we do not want it installed
 */
/* eslint-disable-next-line no-process-env */
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require, no-console, sort-keys */
  const runtime = require('offline-plugin/runtime')

  let runtimeOptions = {
    onUpdateReady: () => {
      // Tells to new SW to take control immediately
      runtime.applyUpdate()
    }
  }

  if (process.env.APP_ENV !== 'production') {
    runtimeOptions = {
      onUpdating: () => {
        console.log('SW Event:', 'onUpdating')
      },
      onUpdateReady: () => {
        console.log('SW Event:', 'onUpdateReady')
        // Tells to new SW to take control immediately
        runtime.applyUpdate()
      },
      onUpdated: () => {
        console.log('SW Event:', 'onUpdated')
        // Reload the webpage to load into the new version
        window.location.reload()
      },
      onUpdateFailed: () => {
        console.log('SW Event:', 'onUpdateFailed')
      }
    }
  }

  runtime.install(runtimeOptions)
}
