import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import STATUS from 'modules/status'
import {resetState} from 'modules/utils/common-actions'

const initialState = deepFreeze({
  error: false,
  repositories: [],
  status: STATUS.INITIAL
})

const name = 'repositoryResults'
const {reducer, ...slice} = createSlice({
  initialState,
  name,
  reducers: {
    loadRepositories: state => {
      state.error = false
      state.status = STATUS.LOADING
      state.repositories = []
    },
    repositoriesLoaded: (state, action) => {
      state.status = STATUS.SUCCESS
      state.repositories = action.payload?.repositories
    },
    repositoriesLoadingError: (state, action) => {
      state.error = action.payload?.error
      state.status = STATUS.ERROR
    },
    resetState: resetState(initialState)
  }
})

const actions = {
  loadRepositories: slice.actions.loadRepositories,
  repositoriesLoaded: slice.actions.repositoriesLoaded,
  repositoriesLoadingError: slice.actions.repositoriesLoadingError,
  resetState: slice.actions.resetState
}

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
