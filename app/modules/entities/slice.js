import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const name = 'entities'
const {reducer, ...slice} = createSlice({
  initialState,
  name,
  /* eslint-disable sort-keys */
  reducers: {
    loaded: (state, action) => {
      Object.entries(action.payload.entities).forEach(([type, entities]) => {
        if (!state[type]) {
          state[type] = {}
        }
        Object.entries(entities).forEach(([id, entity]) => {
          if (!state[type][id]) {
            state[type][id] = {}
          }
          Object.entries(entity).forEach(([key, value]) => {
            state[type][id][key] = value
          })
        })
      })
    },
    deleted: (state, action) => {
      Object.entries(action.payload.entities).forEach(([type, ids]) => {
        if (state[type]) {
          ids.forEach(id => {
            delete state[type][id]
          })
        }
      })
    }
  }
})

const actions = {
  loaded: slice.actions.loaded,
  deleted: slice.actions.deleted
}
/* eslint-enable */

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
