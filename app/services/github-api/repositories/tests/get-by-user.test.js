import qs from 'qs'

import request from '../../request'
import getByUser from '../get-by-user'

jest.mock('../../request')

const options = {signal: 0}

describe('GithubAPI', () => {
  beforeEach(() => {
    request.mockClear()
  })

  describe('fetch repositories by user', () => {
    it('should call the github api request with a username', () => {
      const username = 'mxstbr'
      getByUser(username, {}, options)
      expect(request).toHaveBeenCalledWith(`/users/${username}/repos?`, options)
    })

    it('should call the github api request with a passed query', () => {
      const username = 'mxstbr'
      const query = {sort: 'name'}
      getByUser(username, query, options)
      expect(request).toHaveBeenCalledWith(
        `/users/${username}/repos?${qs.stringify(query)}`,
        options
      )
    })
  })
})
