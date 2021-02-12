import {call, put, select, takeLatest} from 'redux-saga/effects'
import {serializeError} from 'serialize-error'

import requestRepositories from 'services/github-api/repositories/getByUser'
import {actions as entitiesActions} from 'modules/entities'
import {selectors as homePageSelectors} from 'modules/ui/username-form'

import {actions, name} from './slice'

const DEFAULT_QUERY = {
  sort: 'updated',
  type: 'all'
}

function* watchLoadRepositories() {
  try {
    const username = yield select(homePageSelectors.selectUsername)
    const repositories = yield call(
      requestRepositories,
      username,
      DEFAULT_QUERY
    )

    const entities = {
      repositories: repositories.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr
        }),
        {}
      )
    }

    const result = {
      repositories: Object.keys(entities.repositories)
    }

    yield put(entitiesActions.entitiesLoaded({entities}))
    yield put(actions.repositoriesLoaded(result))
  } catch (error) {
    yield put(actions.repositoriesLoadingError({error: serializeError(error)}))
  }
}

function* saga() {
  yield takeLatest(actions.loadRepositories.type, watchLoadRepositories)
}

export {DEFAULT_QUERY}

export default {
  key: `${name}Saga`,
  saga
}
