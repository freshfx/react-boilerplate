/* eslint-disable import/prefer-default-export */
import {createSelector} from '@reduxjs/toolkit'
import get from 'lodash/get'

import {initialState, name} from './slice'

const selectSlice = state => get(state, name, initialState)

const selectUsername = createSelector(selectSlice, slice => slice.username)

export {selectUsername}
