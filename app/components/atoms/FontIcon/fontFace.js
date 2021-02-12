import FontEOT from './fonts/icons.eot'
import FontSVG from './fonts/icons.svg'
import FontTTF from './fonts/icons.ttf'
import FontWOFF from './fonts/icons.woff'

const fontFace = `
  @font-face {
    font-family: 'icons';
    src:  url('${FontEOT}');
    src:  url('${FontEOT}#iefix') format('embedded-opentype'),
      url('${FontTTF}') format('truetype'),
      url('${FontWOFF}') format('woff'),
      url('${FontSVG}#icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`

const loadFonts = () => {
  const [head] = document.getElementsByTagName('head')
  const style = document.createElement('style')
  style.innerHTML = fontFace
  head.appendChild(style)
}

export default loadFonts
