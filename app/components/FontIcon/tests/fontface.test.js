import loadFonts from '../fontFace'

describe('fontFace', () => {
  it('should match the snapshot', () => {
    loadFonts()
    const [head] = document.getElementsByTagName('head')
    const [style] = head.children
    expect(style.innerHTML).toMatchSnapshot()
  })
})
