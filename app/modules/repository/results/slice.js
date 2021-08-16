import {createSlice} from '@reduxjs/toolkit'

import STATUS from 'modules/status'
import {createNetworkSelectors} from 'modules/utils/common-selectors'
import {createNetworkAction, resetState} from 'modules/utils/common-actions'
import {createNetworkReducers} from 'modules/utils/common-reducers'

const scope = 'repositoryResults'
const initialState = {
  data: [],
  error: null,
  status: STATUS.IDLE
}
const selectors = createNetworkSelectors({initialState, scope})

const fetchRepositories = createNetworkAction({
  name: 'fetchRepositories',
  scope
})

const slice = createSlice({
  extraReducers: createNetworkReducers({
    networkAction: fetchRepositories,
    reducers: {
      [fetchRepositories.type]: state => {
        state.data = []
      },
      [fetchRepositories.resolved.type]: (state, action) => {
        state.data = action.payload?.data
      }
    }
  }),
  initialState,
  name: scope,
  reducers: {
    resetState: resetState(initialState)
  }
})

const actions = {
  fetchRepositories,
  resetState: slice.actions.resetState
}

export {actions, scope, selectors}

export default {
  key: scope,
  reducer: slice.reducer
}
