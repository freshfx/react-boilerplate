import {createSelector} from '@reduxjs/toolkit'

import {initialState, name} from './slice'

const selectEntities = state => state?.[name] ?? initialState

const selectEntitiesGenerator = key =>
  createSelector(selectEntities, entities => entities[key] || {})

// eslint-disable-next-line import/prefer-default-export
export {selectEntitiesGenerator}
