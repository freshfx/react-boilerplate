import {expectSaga} from 'redux-saga-test-plan'
import {call, select} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'

import {selectors as homePageSelectors} from 'modules/ui/username-form'
import {actions as entities} from 'modules/entities'
import getByUser from 'services/github-api/repositories/get-by-user'

import {actions} from '../slice'
import saga from '../saga'

jest.mock(
  'services/github-api/repositories/get-by-user',
  () => () => Promise.resolve({})
)

const term = 'ffx'
const query = {sort: 'updated', type: 'all'}
const userNameProvider = [
  select.selector(homePageSelectors.selectUsername),
  term
]

describe('repository modules', () => {
  describe('results saga', () => {
    const action = actions.fetchRepositories()

    it('should call the getByUser service', () =>
      expectSaga(saga.saga)
        .provide([userNameProvider])
        .call(getByUser, term, query)
        .dispatch(action)
        .silentRun())

    it('should dispatch an entities loaded and a fetchRepositories resolved action on success', () => {
      const id = 'repository-id-1'
      const response = {
        entities: {repositories: {[id]: {id, name: 'ffx'}}},
        result: {repositories: [id]}
      }
      return expectSaga(saga.saga)
        .provide([userNameProvider, [call.fn(getByUser), response]])
        .put(entities.loaded({entities: response.entities}))
        .put(
          actions.fetchRepositories.resolved({
            data: response.result.repositories
          })
        )
        .dispatch(action)
        .silentRun()
    })

    it('should dispatch a fetchRepositories rejected action on failure', () => {
      const error = new Error('Something went wrong')
      return expectSaga(saga.saga)
        .provide([userNameProvider, [call.fn(getByUser), throwError(error)]])
        .put(actions.fetchRepositories.rejected({error}))
        .dispatch(action)
        .silentRun()
    })
  })
})
