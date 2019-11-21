import {createSelector} from '@reduxjs/toolkit'
import get from 'lodash/get'

import {
  initialState,
  name
} from './slice'

const selectEntities = state => get(state, name, initialState)

const selectEntitiesGenerator = key => createSelector(
  selectEntities,
  entities => get(entities, key, {})
)

const selectRepositoryEntities = selectEntitiesGenerator('repositories')

export {
  selectEntitiesGenerator,
  selectRepositoryEntities
}
