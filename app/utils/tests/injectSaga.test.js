/**
 * Test injectors
 */

import {createMemoryHistory as createHistory} from 'history'
import {put} from 'redux-saga/effects'
import {shallow} from 'enzyme'
import React from 'react'

import configureStore from '../../configure-store'
import injectSaga from '../injectSaga'

const mockInjectSaga = jest.fn()
const mockEjectSaga = jest.fn()

jest.mock('../sagaInjectors', () => () => ({
  ejectSaga: mockEjectSaga,
  injectSaga: mockInjectSaga
}))

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
  let ComponentWithSaga = () => {}

  beforeEach(() => {
    store = configureStore({}, history)
    ComponentWithSaga = injectSaga({
      key: 'test',
      mode: 'testMode',
      saga: testSaga
    })(Component)
  })

  afterEach(() => {
    mockInjectSaga.mockRestore()
    mockEjectSaga.mockRestore()
  })

  it('should inject given saga, mode, and props', () => {
    const props = {test: 'test'}
    shallow(<ComponentWithSaga {...props} />, {context: {store}})

    /* eslint-disable-next-line no-magic-numbers */
    expect(mockInjectSaga).toHaveBeenCalledTimes(1)
    expect(mockInjectSaga).toHaveBeenCalledWith(
      'test',
      {
        mode: 'testMode',
        saga: testSaga
      },
      props
    )
  })

  it('should eject on unmount with a correct saga key', () => {
    const props = {test: 'test'}
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, {
      context: {store}
    })
    renderedComponent.unmount()

    /* eslint-disable-next-line no-magic-numbers */
    expect(mockEjectSaga).toHaveBeenCalledTimes(1)
    expect(mockEjectSaga).toHaveBeenCalledWith('test')
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
