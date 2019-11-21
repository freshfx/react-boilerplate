import {format} from 'url'

import request from 'utils/request'
import config from 'config'

export const baseUrl = format(config.githubApi)

const githubApiRequest = (path, options = {}) => {
  const url = `${baseUrl}${path}`
  return request(url, options)
}

export default githubApiRequest
