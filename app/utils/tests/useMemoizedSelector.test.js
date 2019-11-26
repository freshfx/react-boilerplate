import React from 'react'
import {useSelector} from 'react-redux'

import useMemoizedSelector from '../useMemoizedSelector'

jest.mock('react-redux')

const memoizedSelector = jest.fn()
const selector = () => {}
const dependencies = ['input']

describe('useMemoizedSelector', () => {
  beforeAll(() => {
    React.useMemo = jest.fn(() => memoizedSelector)
  })

  beforeEach(() => {
    memoizedSelector.mockClear()
    useSelector.mockClear()
  })

  it('should memoize the passed selector factory', () => {
    useMemoizedSelector(selector, {}, dependencies)
    expect(React.useMemo).toHaveBeenCalledWith(selector, dependencies)
  })

  it('should call the useSelector hook with the correct args', () => {
    useMemoizedSelector(selector, {}, dependencies)
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should call the memoized selector with the state and the ownProps', () => {
    const state = {foo: 'bar'}
    const ownProps = {bar: 'foo'}

    useSelector.mockImplementationOnce(fn => fn(state, ownProps))
    useMemoizedSelector(selector, ownProps, dependencies)
    expect(memoizedSelector).toHaveBeenCalledWith(state, ownProps)
  })

  it('should return the result of the useSelector hook', () => {
    const result = 'result'
    useSelector.mockImplementationOnce(() => 'result')
    expect(useMemoizedSelector(selector, {}, dependencies)).toEqual(result)
  })

  it('should not throw if called without dependencies and ownProps', () => {
    const testFn = () => useMemoizedSelector(selector)
    expect(testFn).not.toThrow()
  })
})
