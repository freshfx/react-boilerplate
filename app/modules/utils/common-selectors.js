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

const createResultSelectors = ({initialState, scope}) => {
  const selectSlice = createSliceSelector(scope, initialState)
  return {
    selectData: createSliceFieldSelector(selectSlice, 'data'),
    selectError: createSliceFieldSelector(selectSlice, 'error'),
    selectHasNextPage: createSliceFieldSelector(selectSlice, 'hasNextPage'),
    selectStatus: createSliceFieldSelector(selectSlice, 'status'),
    selectTotal: createSliceFieldSelector(selectSlice, 'total')
  }
}

export {
  createEntitySelectors,
  createResultSelectors,
  createSliceFieldSelector,
  createSliceSelector,
  selectId
}
