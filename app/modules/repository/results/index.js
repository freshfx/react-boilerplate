import {createAsyncThunk} from '@reduxjs/toolkit'

import STATUS from 'modules/status'
import {actions as entitiesActions} from 'modules/entities'
import {selectors as homePageSelectors} from 'modules/ui/username-form'
import {createAsyncResultsSlice} from 'modules/utils/common-slices'
import {createResultSelectors} from 'modules/utils/common-selectors'
import requestRepositories from 'services/github-api/repositories/get-by-user'

const scope = 'repository-results'
const initialState = {
  data: [],
  error: null,
  status: STATUS.IDLE
}

const normalizeReducer = (acc, curr) => ({...acc, [curr.id]: curr})

const query = {sort: 'updated', type: 'all'}
const fetchRepositories = createAsyncThunk(
  `${scope}/fetchRepositories`,
  async (arg, thunkAPI) => {
    const term = homePageSelectors.selectUsername(thunkAPI.getState())
    const response = await requestRepositories(term, query, {
      signal: thunkAPI.signal
    })

    const entities = {repositories: response.reduce(normalizeReducer, {})}
    thunkAPI.dispatch(entitiesActions.entitiesLoaded({entities}))

    return {
      data: Object.keys(entities.repositories)
    }
  }
)

const {reducer, ...slice} = createAsyncResultsSlice({
  asyncThunk: fetchRepositories,
  initialState,
  scope
})

const {selectData, ...resultSelectors} = createResultSelectors({
  initialState,
  scope
})

export const actions = {
  fetchRepositories,
  resetState: slice.actions.resetState
}

export const selectors = {
  selectRepositories: selectData,
  ...resultSelectors
}

export default {
  key: scope,
  reducer
}
