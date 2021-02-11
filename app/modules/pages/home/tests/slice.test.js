import {actions, initialState, reducer} from '../slice'

describe('pages modules', () => {
  describe('home page slice', () => {
    describe('changeUsername', () => {
      it('should set the username state', () => {
        const username = 'mxstbr'
        const nextState = reducer(
          initialState,
          actions.changeUsername({username})
        )
        expect(nextState.username).toEqual(username)
      })
    })
  })
})
