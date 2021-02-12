import configureStore from 'configure-store'
import history from 'utils/history'

const setupStore = () => {
  const store = configureStore({}, history)
  jest.spyOn(store, 'dispatch')

  const clearDispatch = () => store.dispatch.mockClear()

  return {
    clearDispatch,
    options: {wrapperProps: {store}},
    store
  }
}

export default setupStore
