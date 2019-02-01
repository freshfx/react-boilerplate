import {fromJS, Map} from 'immutable'

import {LOAD_RESOURCES_SUCCESS} from './constants'

// The initial state of the App
export const initialState = fromJS({})

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RESOURCES_SUCCESS: {
      let newState = state
      fromJS(action.entities).forEach((values, entityKey) => {
        let newEntities = newState.get(entityKey, new Map())

        values.forEach((value, key) => {
          const oldEntity = newEntities.get(key, new Map())
          newEntities = newEntities.set(key, oldEntity.merge(value))
        })

        newState = newState.set(entityKey, newEntities)
      })
      return newState
    }
    default:
      return state
  }
}

export default serviceReducer
