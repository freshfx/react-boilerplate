const actionListenerMiddleware = actionEmitter => () => next => action => {
  if (actionEmitter) {
    actionEmitter.emit(action.type)
  }
  return next(action)
}

export default actionListenerMiddleware
