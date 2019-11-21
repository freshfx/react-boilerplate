import {selectLocation} from '../selectors'

describe('modules', () => {
  describe('global selectors', () => {
    describe('selectLocation', () => {
      it('should select the location route state', () => {
        const location = '/features'
        const mockedState = {route: {location}}
        expect(selectLocation(mockedState)).toEqual(location)
      })
    })
  })
})
