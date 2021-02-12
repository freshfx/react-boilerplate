import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import {resetState} from 'modules/utils/common-actions'

const initialState = deepFreeze({
  error: false,
  isLoading: false,
  repositories: []
})

const name = 'repositoryResults'
const {reducer, ...slice} = createSlice({
  initialState,
  name,
  reducers: {
    loadRepositories: state => {
      state.error = false
      state.isLoading = true
      state.repositories = []
    },
    repositoriesLoaded: (state, action) => {
      const {repositories} = action.payload
      state.isLoading = false
      state.repositories = repositories
    },
    repositoriesLoadingError: (state, action) => {
      const {error} = action.payload
      state.error = error
      state.isLoading = false
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
