import conformsTo from 'lodash/conformsTo'
import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

import {DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT} from './constants'
import checkStore from './checkStore'

const allowedModes = [
  RESTART_ON_REMOUNT,
  DAEMON,
  ONCE_TILL_UNMOUNT
]

const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string',
  )

const checkDescriptor = descriptor => {
  const shape = {
    mode: mode => isString(mode) && allowedModes.includes(mode),
    saga: isFunction
  }
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor',
  )
}

const injectSagaFactory = (store, isValid) => {
  /* eslint-disable-next-line max-statements */
  const injectSaga = (key, descriptor = {}, args) => {
    if (!isValid) {
      checkStore(store)
    }

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON
    }
    const {saga, mode} = newDescriptor

    checkKey(key)
    checkDescriptor(newDescriptor)

    let hasSaga = Reflect.has(store.injectedSagas, key)

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key]
      // Enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel()
        hasSaga = false
      }
    }

    const reassignSaga = hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT

    if (!hasSaga || reassignSaga) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args)
      }
    }
  }
  return injectSaga
}

const ejectSagaFactory = (store, isValid) => {
  const ejectSaga = key => {
    if (!isValid) {
      checkStore(store)
    }

    checkKey(key)

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key]
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel()
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        /* eslint-disable-next-line no-process-env */
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done' // eslint-disable-line no-param-reassign
        }
      }
    }
  }
  return ejectSaga
}

const getInjectors = store => {
  checkStore(store)

  return {
    ejectSaga: ejectSagaFactory(store, true),
    injectSaga: injectSagaFactory(store, true)
  }
}

export {
  injectSagaFactory,
  ejectSagaFactory
}

export default getInjectors
