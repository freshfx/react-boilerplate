import {selectLocale} from '../selectors'
import {name} from '../slice'

const mockState = (data = {}) => ({[name]: data})

describe('modules', () => {
  describe('language selectors', () => {
    describe('selectLocale', () => {
      it('should select the locale state', () => {
        const locale = 'de'
        const mockedState = mockState({locale})
        expect(selectLocale(mockedState)).toEqual(locale)
      })
    })
  })
})
