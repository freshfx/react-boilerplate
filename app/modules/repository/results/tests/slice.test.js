import {serializeError} from 'serialize-error'

import STATUS from 'modules/status'

import slice, {actions} from '../slice'

describe('repository modules', () => {
  describe('results slice', () => {
    describe('fetchRepositories', () => {
      const action = actions.fetchRepositories()

      it('should set the data state to an empty array', () => {
        const mockedState = {data: ['repository-id-1', 'repository-id-2']}
        const nextState = slice.reducer(mockedState, action)
        expect(nextState.data).toEqual([])
      })

      it('should set the status state to pending', () => {
        const nextState = slice.reducer({}, action)
        expect(nextState.status).toEqual(STATUS.PENDING)
      })
    })

    describe('fetchRepositories.resolved', () => {
      const action = actions.fetchRepositories.resolved

      it('should set the data state', () => {
        const data = ['repository-id-1', 'repository-id-2']
        const nextState = slice.reducer({}, action({data}))
        expect(nextState.data).toEqual(data)
      })

      it('should should set the status state to success', () => {
        const nextState = slice.reducer({}, action())
        expect(nextState.status).toEqual(STATUS.SUCCESS)
      })
    })

    describe('fetchRepositories.rejected', () => {
      const action = actions.fetchRepositories.rejected

      it('should set the status state to failure', () => {
        const nextState = slice.reducer({}, action())
        expect(nextState.status).toEqual(STATUS.FAILURE)
      })

      it('should set the error state', () => {
        const error = new Error('Something went wrong')
        const nextState = slice.reducer({}, action({error}))
        expect(nextState.error).toEqual(serializeError(error))
      })
    })
  })
})
