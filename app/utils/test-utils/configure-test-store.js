/* istanbul ignore file */
import configureStore from 'configure-store'

const testMiddleware = addAction => () => next => action => {
  addAction(action)
  return next(action)
}

const configureTestStore = (initialState, history, actionEmitter) => {
  let actions = []

  const addAction = action => {
    actions.push(action)
  }

  const clearActions = () => {
    actions = []
  }

  const getActions = () => actions
  const getActionTypes = () => actions.map(action => action.type)

  const store = configureStore(initialState, history, actionEmitter, [
    testMiddleware(addAction)
  ])

  return {
    ...store,
    addAction,
    clearActions,
    getActionTypes,
    getActions
  }
}

export default configureTestStore
