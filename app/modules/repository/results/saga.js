import {call, put, select, takeLatest} from 'redux-saga/effects'

import {actions as entities} from 'modules/entities'
import {selectors as homePageSelectors} from 'modules/ui/username-form'
import getByUser from 'services/github-api/repositories/get-by-user'

import {actions, scope} from './slice'

const query = {sort: 'updated', type: 'all'}
function* watchFetchRepositories() {
  try {
    const term = yield select(homePageSelectors.selectUsername)
    const response = yield call(getByUser, term, query)
    yield put(entities.loaded({entities: response.entities}))
    yield put(
      actions.fetchRepositories.resolved({data: response.result.repositories})
    )
  } catch (error) {
    yield put(actions.fetchRepositories.rejected({error}))
  }
}

function* saga() {
  yield takeLatest(actions.fetchRepositories.type, watchFetchRepositories)
}

export default {
  key: `${scope}Saga`,
  saga
}
