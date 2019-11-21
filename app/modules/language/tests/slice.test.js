import {
  actions,
  initialState,
  reducer
} from '../slice'

describe('modules', () => {
  describe('language slice', () => {
    describe('changeLocale', () => {
      it('should set the locale state', () => {
        const locale = 'de'
        const nextState = reducer(initialState, actions.changeLocale({locale}))
        expect(nextState.locale).toEqual(locale)
      })
    })
  })
})
