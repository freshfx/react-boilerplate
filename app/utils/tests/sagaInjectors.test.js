/* eslint-disable max-lines */
/**
 * Test injectors
 */

import {memoryHistory} from 'react-router-dom'
import {put} from 'redux-saga/effects'

import configureStore from '../../configure-store'
import getInjectors, {
  ejectSagaFactory,
  injectSagaFactory
} from '../sagaInjectors'
import {DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT} from '../constants'

function *testSaga() {
  yield put({
    payload: 'yup',
    type: 'TEST'
  })
}

describe('injectors', () => {
  /* eslint-disable-next-line no-process-env */
  const originalNodeEnv = process.env.NODE_ENV
  let store = {}
  let injectSaga = () => {}
  let ejectSaga = () => {}

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory)
    })

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(expect.objectContaining({
        ejectSaga: expect.any(Function),
        injectSaga: expect.any(Function)
      }))
    })

    it('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch')

      expect(() => getInjectors(store)).toThrow()
    })
  })

  /* eslint-disable-next-line max-lines-per-function */
  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory)
      injectSaga = injectSagaFactory(store, true)
      ejectSaga = ejectSagaFactory(store, true)
    })

    it('should check a store if the second argument is falsy', () => {
      const eject = ejectSagaFactory({})

      expect(() => eject('test')).toThrow()
    })

    it('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch')
      injectSaga('test', {saga: testSaga})

      expect(() => ejectSaga('test')).not.toThrow()
    })

    it('should validate saga\'s key', () => {
      expect(() => ejectSaga('')).toThrow()
      /* eslint-disable-next-line no-magic-numbers */
      expect(() => ejectSaga(1)).toThrow()
    })

    it('should cancel a saga in RESTART_ON_REMOUNT mode', () => {
      const cancel = jest.fn()
      store.injectedSagas.test = {
        mode: RESTART_ON_REMOUNT,
        task: {cancel}
      }
      ejectSaga('test')

      expect(cancel).toHaveBeenCalled()
    })

    it('should not cancel a daemon saga', () => {
      const cancel = jest.fn()
      store.injectedSagas.test = {
        mode: DAEMON,
        task: {cancel}
      }
      ejectSaga('test')

      expect(cancel).not.toHaveBeenCalled()
    })

    it('should ignore saga that was not previously injected', () => {
      expect(() => ejectSaga('test')).not.toThrow()
    })

    it('should remove non daemon saga\'s descriptor in production', () => {
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = 'production'
      injectSaga('test', {
        mode: RESTART_ON_REMOUNT,
        saga: testSaga
      })
      injectSaga('test1', {
        mode: ONCE_TILL_UNMOUNT,
        saga: testSaga
      })

      ejectSaga('test')
      ejectSaga('test1')

      expect(store.injectedSagas.test).toBe('done')
      expect(store.injectedSagas.test1).toBe('done')
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = originalNodeEnv
    })

    it('should not remove daemon saga\'s descriptor in production', () => {
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = 'production'
      injectSaga('test', {
        mode: DAEMON,
        saga: testSaga
      })
      ejectSaga('test')

      expect(store.injectedSagas.test.saga).toBe(testSaga)
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = originalNodeEnv
    })

    it('should not remove daemon saga\'s descriptor in development', () => {
      injectSaga('test', {
        mode: DAEMON,
        saga: testSaga
      })
      ejectSaga('test')

      expect(store.injectedSagas.test.saga).toBe(testSaga)
    })
  })

  /* eslint-disable-next-line max-statements */
  describe('injectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory)
      injectSaga = injectSagaFactory(store, true)
      ejectSaga = ejectSagaFactory(store, true)
    })

    it('should check a store if the second argument is falsy', () => {
      const inject = injectSagaFactory({})

      expect(() => inject('test', testSaga)).toThrow()
    })

    it('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch')

      expect(() => injectSaga('test', {saga: testSaga})).not.toThrow()
    })

    it('should validate saga\'s key', () => {
      expect(() => injectSaga('', {saga: testSaga})).toThrow()
      /* eslint-disable-next-line no-magic-numbers */
      expect(() => injectSaga(1, {saga: testSaga})).toThrow()
    })

    it('should validate saga\'s descriptor', () => {
      expect(() => injectSaga('test')).toThrow()
      expect(() => injectSaga('test', {saga: 1})).toThrow()
      expect(() =>
        injectSaga('test', {
          mode: 'testMode',
          saga: testSaga
        })).toThrow()
      expect(() => injectSaga('test', {
        mode: 1,
        saga: testSaga
      })).toThrow()
      expect(() =>
        injectSaga('test', {
          mode: RESTART_ON_REMOUNT,
          saga: testSaga
        })).not.toThrow()
      expect(() =>
        injectSaga('test', {
          mode: DAEMON,
          saga: testSaga
        })).not.toThrow()
      expect(() =>
        injectSaga('test', {
          mode: ONCE_TILL_UNMOUNT,
          saga: testSaga
        })).not.toThrow()
    })

    it('should pass args to saga.run', () => {
      const args = {}
      store.runSaga = jest.fn()
      injectSaga('test', {saga: testSaga}, args)

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args)
    })

    it('should not start daemon and once-till-unmount sagas if were started before', () => {
      store.runSaga = jest.fn()

      injectSaga('test1', {
        mode: DAEMON,
        saga: testSaga
      })
      injectSaga('test1', {
        mode: DAEMON,
        saga: testSaga
      })
      injectSaga('test2', {
        mode: ONCE_TILL_UNMOUNT,
        saga: testSaga
      })
      injectSaga('test2', {
        mode: ONCE_TILL_UNMOUNT,
        saga: testSaga
      })

      /* eslint-disable-next-line no-magic-numbers */
      expect(store.runSaga).toHaveBeenCalledTimes(2)
    })

    it('should start any saga that was not started before', () => {
      store.runSaga = jest.fn()

      injectSaga('test1', {saga: testSaga})
      injectSaga('test2', {
        mode: DAEMON,
        saga: testSaga
      })
      injectSaga('test3', {
        mode: ONCE_TILL_UNMOUNT,
        saga: testSaga
      })

      /* eslint-disable-next-line no-magic-numbers */
      expect(store.runSaga).toHaveBeenCalledTimes(3)
    })

    it('should restart a saga if different implementation for hot reloading', () => {
      const cancel = jest.fn()
      store.injectedSagas.test = {
        saga: testSaga,
        task: {cancel}
      }
      store.runSaga = jest.fn()

      function *testSaga1() {
        yield put({
          payload: 'yup',
          type: 'TEST'
        })
      }

      injectSaga('test', {saga: testSaga1})

      /* eslint-disable-next-line no-magic-numbers */
      expect(cancel).toHaveBeenCalledTimes(1)
      /* eslint-disable-next-line no-undefined */
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined)
    })

    it('should not cancel saga if different implementation in production', () => {
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = 'production'
      const cancel = jest.fn()
      store.injectedSagas.test = {
        mode: RESTART_ON_REMOUNT,
        saga: testSaga,
        task: {cancel}
      }

      function *testSaga1() {
        yield put({
          payload: 'yup',
          type: 'TEST'
        })
      }

      injectSaga('test', {
        mode: DAEMON,
        saga: testSaga1
      })

      /* eslint-disable-next-line no-magic-numbers */
      expect(cancel).toHaveBeenCalledTimes(0)
      /* eslint-disable-next-line no-process-env */
      process.env.NODE_ENV = originalNodeEnv
    })

    it('should save an entire descriptor in the saga registry', () => {
      injectSaga('test', {
        foo: 'bar',
        saga: testSaga
      })
      expect(store.injectedSagas.test.foo).toBe('bar')
    })
  })
})
