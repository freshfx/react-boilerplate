/**
 * Test injectors
 */

import createHistory from 'history/createMemoryHistory'
import {put} from 'redux-saga/effects'
import {shallow} from 'enzyme'
import React from 'react'

import configureStore from '../../configure-store'
import injectSaga from '../injectSaga'
import * as sagaInjectors from '../sagaInjectors'

// Fixtures
const Component = () => null

const history = createHistory()

function *testSaga() {
  yield put({
    payload: 'yup',
    type: 'TEST'
  })
}

describe('injectSaga decorator', () => {
  let store = {}
  let injectors = {}
  let ComponentWithSaga = () => {}

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors)
  })

  beforeEach(() => {
    store = configureStore({}, history)
    injectors = {
      ejectSaga: jest.fn(),
      injectSaga: jest.fn()
    }
    ComponentWithSaga = injectSaga({
      key: 'test',
      mode: 'testMode',
      saga: testSaga
    })(Component)
    sagaInjectors.default.mockClear()
  })

  it('should inject given saga, mode, and props', () => {
    const props = {test: 'test'}
    shallow(<ComponentWithSaga {...props} />, {context: {store}})

    /* eslint-disable-next-line no-magic-numbers */
    expect(injectors.injectSaga).toHaveBeenCalledTimes(1)
    expect(injectors.injectSaga).toHaveBeenCalledWith(
      'test',
      {
        mode: 'testMode',
        saga: testSaga
      },
      props,
    )
  })

  it('should eject on unmount with a correct saga key', () => {
    const props = {test: 'test'}
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, {
      context: {store}
    })
    renderedComponent.unmount()

    /* eslint-disable-next-line no-magic-numbers */
    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1)
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test')
  })

  it('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)')
    expect(injectSaga({key: 'test',
      saga: testSaga})(() => null).displayName).toBe('withSaga(Component)')
  })

  it('should propagate props', () => {
    const props = {testProp: 'test'}
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, {
      context: {store}
    })

    expect(renderedComponent.prop('testProp')).toBe('test')
  })
})
