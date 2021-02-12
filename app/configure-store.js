/**
 * Create the store with dynamic reducers
 */
import {
  configureStore as configureToolkitStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {routerMiddleware} from 'connected-react-router'
import {createInjectorsEnhancer, forceReducerReload} from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import {actionListenerMiddleware} from 'contexts/ActionSubscription'

import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState, history, actionEmitter) => {
  const {run: runSaga} = sagaMiddleware

  /*
   * Create the store with three middlewares
   * 1. sagaMiddleware: Makes redux-sagas work
   * 2. routerMiddleware: Syncs the location/URL path to the state
   * 3. actionListenerMiddleware: Emits action types to subscribers if dispatched.
   */
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    actionListenerMiddleware(actionEmitter)
  ]

  // https://github.com/react-boilerplate/redux-injectors#setting-up-the-redux-store
  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga
    })
  ]

  // https://redux-toolkit.js.org/api/configureStore#full-example
  const store = configureToolkitStore({
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    reducer: createReducer()
  })

  // Reducer registry
  store.injectedReducers = {}
  // Saga registry
  store.injectedSagas = {}

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store)
    })
  }

  return store
}

export default configureStore
