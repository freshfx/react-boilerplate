import {
  selectError,
  selectIsLoading,
  selectRepositories
} from '../selectors'
import {name} from '../slice'

const mockState = (data = {}) => ({[name]: data})

describe('repository modules', () => {
  describe('results selectors', () => {
    describe('selectIsLoading', () => {
      it('should select the isLoading state', () => {
        const isLoading = true
        const mockedState = mockState({isLoading})
        expect(selectIsLoading(mockedState)).toEqual(isLoading)
      })
    })

    describe('selectError', () => {
      it('should select the error state', () => {
        const error = new Error('Something went wrong')
        const mockedState = mockState({error})
        expect(selectError(mockedState)).toEqual(error)
      })
    })

    describe('selectRepositories', () => {
      it('should select the repositories state', () => {
        const repositories = [1, 2, 3]
        const mockedState = mockState({repositories})
        expect(selectRepositories(mockedState)).toEqual(repositories)
      })
    })
  })
})
