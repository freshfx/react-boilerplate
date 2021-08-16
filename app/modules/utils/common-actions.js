import {createAction} from '@reduxjs/toolkit'
import {serializeError} from 'serialize-error'

const resetState = initialState => state => {
  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  })
}

const prepareErrorAction = (payload = {}) => ({
  payload: {
    ...payload,
    ...(payload.error && {error: serializeError(payload.error)})
  }
})

const createNetworkAction = ({name, scope}) => {
  const action = createAction(`${scope}/${name}`)

  action.resolved = createAction(`${action.type}.resolved`)
  action.rejected = createAction(`${action.type}.rejected`, prepareErrorAction)

  return action
}

export {createNetworkAction, resetState}
