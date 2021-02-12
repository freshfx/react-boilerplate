import {
  createSliceFieldSelector,
  createSliceSelector
} from 'modules/utils/common-selectors'

import {initialState, name} from './slice'

const selectSlice = createSliceSelector(name, initialState)
const selectStatus = createSliceFieldSelector(selectSlice, 'status')
const selectError = createSliceFieldSelector(selectSlice, 'error')
const selectRepositories = createSliceFieldSelector(selectSlice, 'repositories')

export {selectError, selectStatus, selectRepositories}
