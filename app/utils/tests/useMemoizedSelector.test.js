import React from 'react'
import {useSelector} from 'react-redux'

import useMemoizedSelector from '../useMemoizedSelector'

jest.mock('react-redux')

const memoizedSelector = jest.fn()
const selector = () => {}

describe('useMemoizedSelector', () => {
  beforeAll(() => {
    React.useMemo = jest.fn(() => memoizedSelector)
  })

  beforeEach(() => {
    memoizedSelector.mockClear()
    useSelector.mockClear()
  })

  it('should memoize the passed selector factory', () => {
    useMemoizedSelector(selector, {})
    expect(React.useMemo).toHaveBeenCalledWith(selector, [])
  })

  it('should call the useSelector hook with the correct args', () => {
    useMemoizedSelector(selector, {}, null)
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function), null)
  })

  it('should call the memoized selector with the state and the ownProps', () => {
    const state = {foo: 'bar'}
    const ownProps = {bar: 'foo'}

    useSelector.mockImplementationOnce(fn => fn(state, ownProps))
    useMemoizedSelector(selector, ownProps)
    expect(memoizedSelector).toHaveBeenCalledWith(state, ownProps)
  })

  it('should return the result of the useSelector hook', () => {
    const result = 'result'
    useSelector.mockImplementationOnce(() => 'result')
    expect(useMemoizedSelector(selector, {})).toEqual(result)
  })

  it('should not throw if called without dependencies and ownProps', () => {
    const testFn = () => useMemoizedSelector(selector)
    expect(testFn).not.toThrow()
  })
})
