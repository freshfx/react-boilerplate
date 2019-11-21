import qs from 'qs'

import request from '../../request'
import getByUser from '../getByUser'

jest.mock('../../request')

describe('GithubAPI', () => {
  beforeEach(() => {
    request.mockClear()
  })

  describe('fetch repositories by user', () => {
    it('should call the github api request with a username', () => {
      const username = 'mxstbr'
      getByUser(username)
      expect(request).toHaveBeenCalledWith(`/users/${username}/repos?`)
    })

    it('should call the github api request with a passed query', () => {
      const username = 'mxstbr'
      const query = {sort: 'name'}
      getByUser(username, query)
      expect(request).toHaveBeenCalledWith(`/users/${username}/repos?${qs.stringify(query)}`)
    })
  })
})
