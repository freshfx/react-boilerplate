import {
  BLACK,
  mediaSize,
  WHITE
} from '../variables'

describe('styles variables', () => {
  it('should return black', () => {
    expect(BLACK).toEqual('#000')
  })

  it('should return white', () => {
    expect(WHITE).toEqual('#fff')
  })

  describe('mediaSize', () => {
    it('should match snapshot', () => {
      expect(() => mediaSize`
        font-size: 13px;
        letter-spacing: 0.5px;
        margin: 0;
      `).toMatchSnapshot()
    })

    it('should not throw if called without any arguments', () => {
      expect(() => mediaSize()).not.toThrow()
    })
  })
})
