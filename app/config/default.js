import deepFreeze from 'deep-freeze'

import features from 'config/_features'

const config = {
  app: {
    baseURL: 'http://localhost'
  },

  features: {
    ...features
  }
}

if (process.env.PORT) {
  config.app.baseURL += `:${process.env.PORT}`
}

export default deepFreeze(config)
