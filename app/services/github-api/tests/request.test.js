import noop from 'lodash/noop'

import request from 'utils/request'

import githubApiRequest, {baseUrl} from '../request'

jest.mock('utils/request')

jest.mock('config', () => ({
  githubApi: {
    host: 'host',
    protocol: 'https'
  }
}))

describe('GithubAPI', () => {
  beforeEach(() => {
    request.mockClear()
    request.mockResolvedValue({})
  })

  describe('request', () => {
    it('should call the request util with the formatted baseUrl', () => {
      const path = '/users'
      githubApiRequest(path).catch(noop)
      expect(request).toHaveBeenCalledWith(`${baseUrl}${path}`, {})
    })

    it('should call the request util with the formatted baseUrl and passed options', () => {
      const path = '/users'
      const options = {
        cors: true
      }
      githubApiRequest(path, options).catch(noop)
      expect(request).toHaveBeenCalledWith(`${baseUrl}${path}`, options)
    })

    it('should normalize a repositories response', async () => {
      const entity = {id: 'repository-id-1', name: 'Repository'}
      const response = [entity]
      request.mockResolvedValue(response)
      const result = await githubApiRequest('')
      expect(result).toEqual({
        entities: {repositories: {[entity.id]: entity}},
        result: {repositories: [entity.id]}
      })
    })
  })
})
