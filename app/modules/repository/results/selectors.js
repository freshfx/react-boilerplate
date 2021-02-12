import {
  createSliceFieldSelector,
  createSliceSelector
} from 'modules/utils/common-selectors'

import {initialState, name} from './slice'

const selectSlice = createSliceSelector(name, initialState)
const selectIsLoading = createSliceFieldSelector(selectSlice, 'isLoading')
const selectError = createSliceFieldSelector(selectSlice, 'error')
const selectRepositories = createSliceFieldSelector(selectSlice, 'repositories')

export {selectError, selectIsLoading, selectRepositories}
