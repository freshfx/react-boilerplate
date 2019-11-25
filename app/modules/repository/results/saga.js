import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'

import requestRepositories from 'services/github-api/repositories/getByUser'
import {actions as entitiesActions} from 'modules/entities'
import {selectors as homePageSelectors} from 'modules/pages/home'

import {actions} from './slice'

function *watchLoadRepositories() {
  try {
    const username = yield select(homePageSelectors.selectUsername)
    const repositories = yield call(requestRepositories, username)

    const entities = {
      repositories: repositories.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr
      }), {})
    }

    const result = {
      repositories: Object.keys(entities.repositories)
    }

    yield put(entitiesActions.entitiesLoaded({entities}))
    yield put(actions.repositoriesLoaded(result))
  } catch (error) {
    yield put(actions.repositoriesLoadingError({error}))
  }
}

function *saga() {
  yield takeLatest(actions.loadRepositories.type, watchLoadRepositories)
}

export default {
  key: 'repositoryResultsSaga',
  saga
}
