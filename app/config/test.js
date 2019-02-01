import deepFreeze from 'deep-freeze'

import defaultConfig from './default'

const config = {}

export default deepFreeze({
  ...defaultConfig,
  ...config
})
