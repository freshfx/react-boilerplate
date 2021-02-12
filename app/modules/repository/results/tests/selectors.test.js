import STATUS from 'modules/status'

import {selectError, selectRepositories, selectStatus} from '../selectors'
import {name} from '../slice'

const mockState = (data = {}) => ({[name]: data})

describe('repository modules', () => {
  describe('results selectors', () => {
    describe('selectStatus', () => {
      it('should select the status state', () => {
        const status = STATUS.LOADING
        const mockedState = mockState({status})
        expect(selectStatus(mockedState)).toEqual(status)
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
