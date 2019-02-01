import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme'

configure({adapter: new Adapter()})

// Fixes: matchMedia not present, legacy browsers require a polyfill
const matchMedia = () => ({
  addListener: () => {},
  matches: false,
  removeListener: () => {}
})
window.matchMedia =
  window.matchMedia || matchMedia

const zero = 0
const requestAnimationFrame = callback => setTimeout(callback, zero)
window.requestAnimationFrame =
  window.requestAnimationFrame || requestAnimationFrame
