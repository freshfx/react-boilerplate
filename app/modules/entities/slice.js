import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const name = 'entities'
const {actions, reducer} = createSlice({
  initialState,
  name,
  reducers: {
    entitiesLoaded: (state, action) => {
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
    }
  }
})

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
