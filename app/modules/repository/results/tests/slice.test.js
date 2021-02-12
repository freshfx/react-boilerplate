import STATUS from 'modules/status'

import {actions, initialState, reducer} from '../slice'

describe('repository modules', () => {
  describe('results slice', () => {
    const error = new Error('Something went wrong')

    describe('loadRepositories', () => {
      it('should set the error state to false', () => {
        const mockedState = {...initialState, error}
        const nextState = reducer(mockedState, actions.loadRepositories())
        expect(nextState.error).toBeFalsy()
      })

      it('should set the status state to loading', () => {
        const nextState = reducer(initialState, actions.loadRepositories())
        expect(nextState.status).toEqual(STATUS.LOADING)
      })

      it('should set the repositories to an empty array', () => {
        const mockedState = {...initialState, repositories: [1, 2, 3]}
        const nextState = reducer(mockedState, actions.loadRepositories())
        expect(nextState.repositories).toEqual([])
      })
    })

    describe('repositoriesLoaded', () => {
      it('should set the status state to success', () => {
        const nextState = reducer(initialState, actions.repositoriesLoaded())
        expect(nextState.status).toEqual(STATUS.SUCCESS)
      })

      it('should set the repositories state', () => {
        const repositories = [1, 2, 3]
        const nextState = reducer(
          initialState,
          actions.repositoriesLoaded({repositories})
        )
        expect(nextState.repositories).toEqual(repositories)
      })
    })

    describe('repositoriesLoadingError', () => {
      it('should set the error state', () => {
        const nextState = reducer(
          initialState,
          actions.repositoriesLoadingError({error})
        )
        expect(nextState.error).toEqual(error)
      })

      it('should set the status state to error', () => {
        const nextState = reducer(
          initialState,
          actions.repositoriesLoadingError()
        )
        expect(nextState.status).toEqual(STATUS.ERROR)
      })
    })
  })
})
