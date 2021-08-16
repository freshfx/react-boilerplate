import configureStore from 'configure-store'
import ActionSubscription from 'contexts/ActionSubscription'

const initStore = config => {
  if (config?.withActionSubscription) {
    const actionEmitter = new ActionSubscription.ActionEmitter()
    return {
      actionEmitter,
      store: configureStore({actionEmitter})
    }
  }
  return {store: configureStore()}
}

const setupStore = config => {
  const {actionEmitter, store} = initStore(config)
  jest.spyOn(store, 'dispatch')

  const clearDispatch = () => store.dispatch.mockClear()

  return {
    actionEmitter,
    clearDispatch,
    options: {wrapperProps: {actionEmitter, store}},
    store
  }
}

export default setupStore
