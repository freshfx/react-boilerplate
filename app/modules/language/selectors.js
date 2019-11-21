import {createSelector} from '@reduxjs/toolkit'
import get from 'lodash/get'

import {initialState, name} from './slice'

const selectSlice = state => get(state, name, initialState)

const selectLocale = createSelector(
  selectSlice,
  slice => slice.locale
)

export {
  selectLocale,
  selectSlice
}
