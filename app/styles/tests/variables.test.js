import {
  BLACK,
  WHITE
} from '../variables'

describe('styles variables', () => {
  it('should return black', () => {
    expect(BLACK).toEqual('#000')
  })

  it('should return white', () => {
    expect(WHITE).toEqual('#fff')
  })
})
