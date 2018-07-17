import {CHANGE_USERNAME} from '../constants'

import {changeUsername} from '../actions'

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max'
      const expectedResult = {
        name: fixture,
        type: CHANGE_USERNAME
      }

      expect(changeUsername(fixture)).toEqual(expectedResult)
    })
  })
})
