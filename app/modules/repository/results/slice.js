import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

const initialState = deepFreeze({
  error: false,
  isLoading: false,
  repositories: []
})

const name = 'repositoryResults'
const {actions, reducer} = createSlice({
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
    }
  }
})

export {
  actions,
  initialState,
  name,
  reducer
}

export default {
  key: name,
  reducer
}
