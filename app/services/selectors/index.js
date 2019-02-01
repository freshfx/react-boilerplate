import {createSelector} from 'reselect'
import {Map} from 'immutable'

import {initialState} from '../reducer'

export const selectEntities = state => state.get('entities', initialState)

const selectResourceGenerator = key => createSelector(selectEntities, state => state.get(key, new Map()))

export const selectUserEntities = selectResourceGenerator('users')
