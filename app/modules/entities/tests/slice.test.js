import {actions, initialState, reducer} from '../slice'

describe('modules', () => {
  describe('entities slice', () => {
    const id = 'repository-id-1'

    describe('loaded', () => {
      it('should update the entities according to the payload', () => {
        const entities = {repositories: {[id]: {id, name: 'react-boilerplate'}}}
        const nextState = reducer(initialState, actions.loaded({entities}))
        expect(nextState).toEqual(entities)
      })

      it('should replace nested fields', () => {
        const mockedState = {
          repositories: {[id]: {id, name: 'react-boilerplate'}}
        }
        const entities = {
          repositories: {[id]: {id, name: 'react-boilerplate-2'}}
        }
        const nextState = reducer(mockedState, actions.loaded({entities}))
        expect(nextState.repositories[id].name).toEqual(
          entities.repositories[id].name
        )
      })
    })

    describe('deleted', () => {
      it('should remove all payload entities', () => {
        const mockedState = {repositories: {[id]: {id}}}
        const nextState = reducer(
          mockedState,
          actions.deleted({entities: {repositories: [id]}})
        )
        expect(Object.keys(nextState.repositories)).toHaveLength(0)
      })

      it('should not throw if the entities type is not in the state', () => {
        const mockedState = {}
        const nextState = reducer(
          mockedState,
          actions.deleted({entities: {repositories: [id]}})
        )
        expect(nextState).toEqual(mockedState)
      })
    })
  })
})
