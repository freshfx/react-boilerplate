import STATUS from '../status'

const createNetworkReducers = ({networkAction, reducers}) => ({
  [networkAction.type]: (state, action) => {
    state.error = null
    state.status = STATUS.PENDING
    reducers?.[networkAction.type]?.(state, action)
  },
  [networkAction.resolved.type]: (state, action) => {
    state.status = STATUS.SUCCESS
    reducers?.[networkAction.resolved.type]?.(state, action)
  },
  [networkAction.rejected.type]: (state, action) => {
    state.error = action.payload?.error
    state.status = STATUS.FAILURE
    reducers?.[networkAction.rejected.type]?.(state, action)
  }
})

// eslint-disable-next-line import/prefer-default-export
export {createNetworkReducers}
