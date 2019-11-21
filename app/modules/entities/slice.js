import {createSlice} from '@reduxjs/toolkit'
import set from 'lodash/set'

const initialState = {}

const name = 'entities'
const {actions, reducer} = createSlice({
  initialState,
  name,
  reducers: {
    entitiesLoaded: (state, action) => {
      Object.entries(action.payload.entities).forEach(([type, entities]) => {
        Object.entries(entities).forEach(([id, entity]) => {
          Object.entries(entity).forEach(([key, value]) => {
            set(state, [type, id, key], value)
          })
        })
      })
    }
  }
})

export {
  actions,
  initialState,
  name,
  reducer
}

export default {
  key: name,
  reducer
}
