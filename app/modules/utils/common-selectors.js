import {createSelector} from '@reduxjs/toolkit'

import {selectEntitiesGenerator} from 'modules/entities/selectors'

const selectId = (state, props) => props.id

const createSliceSelector = (name, initialState) => state =>
  state[name] || initialState

const createSliceFieldSelector = (sliceSelector, fieldName, fallback) =>
  createSelector(sliceSelector, slice => slice[fieldName] ?? fallback)

const createEntitySelectors = ({type}) => {
  const selectEntities = selectEntitiesGenerator(type)
  const selectEntity = createSelector(
    selectEntities,
    selectId,
    (entities, id) => entities[id] || {}
  )

  const createEntityFieldSelector = callback =>
    createSelector(selectEntity, callback)

  return {
    createEntityFieldSelector,
    selectEntities,
    selectEntity
  }
}

const createNetworkSelectors = ({initialState, scope}) => {
  const selectSlice = createSliceSelector(scope, initialState)
  return {
    selectData: createSliceFieldSelector(selectSlice, 'data'),
    selectError: createSliceFieldSelector(selectSlice, 'error'),
    selectStatus: createSliceFieldSelector(selectSlice, 'status')
  }
}

export {
  createEntitySelectors,
  createNetworkSelectors,
  createSliceFieldSelector,
  createSliceSelector,
  selectId
}
