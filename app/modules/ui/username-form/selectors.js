/* eslint-disable import/prefer-default-export */

import {
  createSliceFieldSelector,
  createSliceSelector
} from 'modules/utils/common-selectors'

import {initialState, name} from './slice'

const selectSlice = createSliceSelector(name, initialState)
const selectUsername = createSliceFieldSelector(selectSlice, 'username')

export {selectUsername}
