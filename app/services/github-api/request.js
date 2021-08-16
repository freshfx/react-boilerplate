import {format} from 'url'

import request from 'utils/request'
import config from 'config'

const baseUrl = format(config.githubApi)

const normalizeReducer = (acc, curr) => ({...acc, [curr.id]: curr})

const githubApiRequest = (path, options = {}) => {
  const url = `${baseUrl}${path}`
  return request(url, options).then(json => {
    const reduced = json.reduce(normalizeReducer, {})
    return {
      entities: {repositories: reduced},
      result: {repositories: Object.keys(reduced)}
    }
  })
}

export {baseUrl}

export default githubApiRequest
