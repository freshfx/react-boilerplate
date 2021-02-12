import {selectUsername} from '../selectors'
import {name} from '../slice'

const mockState = (data = {}) => ({[name]: data})

describe('pages modules', () => {
  describe('home page selectors', () => {
    describe('selectUsername', () => {
      it('should select the username state', () => {
        const username = 'mxstbr'
        const mockedState = mockState({username})
        expect(selectUsername(mockedState)).toEqual(username)
      })
    })
  })
})
