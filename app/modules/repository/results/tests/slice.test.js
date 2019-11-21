import {
  actions,
  initialState,
  reducer
} from '../slice'

describe('repository modules', () => {
  describe('results slice', () => {
    const error = new Error('Something went wrong')
    const errorState = {...initialState, error}
    const isLoadingState = {...initialState, isLoading: true}

    describe('loadRepositories', () => {
      it('should set the error state to false', () => {
        const nextState = reducer(errorState, actions.loadRepositories())
        expect(nextState.error).toBeFalsy()
      })

      it('should set the isLoading to true', () => {
        const nextState = reducer(initialState, actions.loadRepositories())
        expect(nextState.isLoading).toBeTruthy()
      })

      it('should set the repositories to false', () => {
        const mockedState = {...initialState, repositories: [1, 2, 3]}
        const nextState = reducer(mockedState, actions.loadRepositories())
        expect(nextState.repositories).toBeFalsy()
      })
    })

    describe('repositoriesLoaded', () => {
      it('should set the isLoading state to false', () => {
        const nextState = reducer(isLoadingState, actions.repositoriesLoaded({}))
        expect(nextState.isLoading).toBeFalsy()
      })

      it('should set the repositories state', () => {
        const repositories = [1, 2, 3]
        const nextState = reducer(initialState, actions.repositoriesLoaded({repositories}))
        expect(nextState.repositories).toEqual(repositories)
      })
    })

    describe('repositoriesLoadingError', () => {
      it('should set the error state', () => {
        const nextState = reducer(initialState, actions.repositoriesLoadingError({error}))
        expect(nextState.error).toEqual(error)
      })

      it('should set the isLoading state to false', () => {
        const nextState = reducer(isLoadingState, actions.repositoriesLoadingError({}))
        expect(nextState.isLoading).toBeFalsy()
      })
    })
  })
})
