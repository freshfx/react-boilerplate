import {expectSaga} from 'redux-saga-test-plan'
import {throwError} from 'redux-saga-test-plan/providers'

import {
  call,
  select
} from 'redux-saga/effects'

import requestRepositories from 'services/github-api/repositories/getByUser'
import {actions as entitiesActions} from 'modules/entities'
import {selectors as homePageSelectors} from 'modules/pages/home'

import {actions} from '../slice'
import repositoriesSaga, {DEFAULT_QUERY} from '../saga'

describe('repository modules', () => {
  describe('results saga', () => {
    describe('loadRepositories', () => {
      const action = actions.loadRepositories()

      it('should request the repositories for a selected username', () => {
        const username = 'mxstbr'
        return expectSaga(repositoriesSaga.saga)
          .provide([[select(homePageSelectors.selectUsername), username]])
          .call(requestRepositories, username, DEFAULT_QUERY)
          .dispatch(action)
          .silentRun()
      })

      it('should dispatch a entitiesLoaded and a repositoriesLoaded actions with the correct payload', () => {
        const repositories = ['repository-id-1', 'repository-id-2']
        const response = repositories.map(id => ({id, name: `Name for repository ${id}`}))
        const entities = {repositories: {[repositories[0]]: response[0], [repositories[1]]: response[1]}}

        return expectSaga(repositoriesSaga.saga)
          .provide([[call(requestRepositories, '', DEFAULT_QUERY), response]])
          .put(entitiesActions.entitiesLoaded({entities}))
          .put(actions.repositoriesLoaded({repositories}))
          .dispatch(action)
          .silentRun()
      })

      it('should dispatch a repositoriesLoadingError action if the saga errors', () => {
        const error = new Error('Something went wrong')

        return expectSaga(repositoriesSaga.saga)
          .provide([[call(requestRepositories, '', DEFAULT_QUERY), throwError(error)]])
          .put(actions.repositoriesLoadingError({error}))
          .dispatch(action)
          .silentRun()
      })
    })
  })
})
