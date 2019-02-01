/**
 * Create the store with dynamic reducers
 */

import {applyMiddleware, compose, createStore} from 'redux'
import {fromJS} from 'immutable'
import {routerMiddleware} from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'

import {actionListenerMiddleware} from 'containers/ActionSubscription'

import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history, actionEmitter) {
  /*
   * Create the store with two middlewares
   * 1. sagaMiddleware: Makes redux-sagas work
   * 2. routerMiddleware: Syncs the location/URL path to the state
   */
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    actionListenerMiddleware(actionEmitter)
  ]

  const enhancers = [applyMiddleware(...middlewares)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent, no-ternary */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(history),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  // Reducer registry
  store.injectedReducers = {}
  // Saga registry
  store.injectedSagas = {}

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(history, store.injectedReducers))
    })
  }

  return store
}
