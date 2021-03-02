/* eslint-disable sort-keys */
import deepFreeze from 'deep-freeze'

import features from 'config/_features'

const config = {
  app: {
    baseURL: 'http://localhost'
  },

  githubApi: {
    hostname: 'api.github.com',
    protocol: 'https'
  },

  photographyApi: {
    hostname: 'api.photography-staging.redbullcontentpool.com',
    options: {
      credentials: 'include'
    },
    pathname: '/v1',
    protocol: 'https'
  },

  features: {
    ...features
  }
}

if (process.env.PORT) {
  config.app.baseURL += `:${process.env.PORT}`
}

export default deepFreeze(config)
