import {createSelector} from '@reduxjs/toolkit'
import get from 'lodash/get'

import {
  initialState,
  name
} from './slice'

const selectSlice = state => get(state, name, initialState)

const selectIsLoading = createSelector(
  selectSlice,
  slice => slice.isLoading
)

const selectError = createSelector(
  selectSlice,
  slice => slice.error
)

const selectRepositories = createSelector(
  selectSlice,
  slice => slice.repositories
)

export {
  selectError,
  selectIsLoading,
  selectRepositories
}
