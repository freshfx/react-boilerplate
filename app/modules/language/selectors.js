import {
  createSliceFieldSelector,
  createSliceSelector
} from 'modules/utils/common-selectors'

import {initialState, name} from './slice'

const selectSlice = createSliceSelector(name, initialState)
const selectLocale = createSliceFieldSelector(selectSlice, 'locale')

export {selectLocale, selectSlice}
