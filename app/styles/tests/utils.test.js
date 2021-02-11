import {divide, addAlpha, createOpacityAnimation} from '../utils'

const two = 2

describe('styles utils', () => {
  it('should divide value with unit', () => {
    const fixture = '12px'
    const expectedResult = '6px'
    expect(divide(fixture, two)).toEqual(expectedResult)
  })

  it('should divide value without unit', () => {
    const fixture = '12'
    const expectedResult = '6'
    expect(divide(fixture, two)).toEqual(expectedResult)
  })

  it('should add alpha', () => {
    const white = '#fff'
    const alpha = 0.5
    expect(addAlpha(white, alpha)).toEqual('rgba(255,255,255,0.5)')
  })

  describe('createOpacityAnimation', () => {
    it('should create an animation with default params', () => {
      expect(createOpacityAnimation()).toMatchSnapshot()
    })

    it('should create an animation with the passed params', () => {
      expect(createOpacityAnimation(1, 0)).toMatchSnapshot()
    })
  })
})
