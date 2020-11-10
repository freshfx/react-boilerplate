/**
 * App.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {HelmetProvider} from 'react-helmet-async'
import {Global} from '@emotion/core'
import FontFaceObserver from 'fontfaceobserver'
import 'sanitize.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/forms.css'

import 'public/robots/robots.txt'

// Import root app
import App from 'containers/App'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

import ActionSubscription from 'containers/ActionSubscription'

import loadFonts from 'components/FontIcon/fontFace'
import history from 'utils/history'

// Load the favicon and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configure-store'

// Import i18n messages
import {translationMessages} from './i18n'

// Import CSS reset and Global Styles
import globalStyles from './global-styles'

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
const store = configureStore(initialState, history, actionEmitter)
const MOUNT_NODE = document.getElementById('app')

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <Global styles={globalStyles} />
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
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
 * Install ServiceWorker in the end since
 * it's not most important operation and if main code fails,
 * we do not want it installed
 */
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        const initialWorker = registration.active
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && initialWorker) {
              window.location.reload()
            }
          })
        })
      })
  })
}
