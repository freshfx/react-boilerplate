/**
 * Test injectors
 */

import {createMemoryHistory as createHistory} from 'history'
import {shallow} from 'enzyme'
import React from 'react'
import identity from 'lodash/identity'

import configureStore from '../../configure-store'
import injectReducer from '../injectReducer'

const mockInjectReducer = jest.fn()

jest.mock('../reducerInjectors', () => () => ({
  injectReducer: mockInjectReducer
}))

// Fixtures
const Component = () => null

const reducer = identity
const history = createHistory()

describe('injectReducer decorator', () => {
  let store = {}
  let ComponentWithReducer = () => {}

  beforeEach(() => {
    store = configureStore({}, history)
    ComponentWithReducer = injectReducer({key: 'test', reducer})(Component)
  })

  afterEach(() => {
    mockInjectReducer.mockRestore()
  })

  it('should inject a given reducer', () => {
    shallow(<ComponentWithReducer />, {context: {store}})

    /* eslint-disable-next-line no-magic-numbers */
    expect(mockInjectReducer).toHaveBeenCalledTimes(1)
    expect(mockInjectReducer).toHaveBeenCalledWith('test', reducer)
  })

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)')
    expect(injectReducer({key: 'test', reducer})(() => null).displayName).toBe('withReducer(Component)')
  })

  it('should propagate props', () => {
    const props = {testProp: 'test'}
    const renderedComponent = shallow(<ComponentWithReducer {...props} />, {
      context: {store}
    })

    expect(renderedComponent.prop('testProp')).toBe('test')
  })
})
