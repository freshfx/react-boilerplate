import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  useInjectReducer,
  useInjectSaga
} from 'redux-injectors'

import reducer, {
  actions,
  saga,
  selectors
} from 'modules/repository/results'

const useRepositoriesEvents = () => {
  const dispatch = useDispatch()

  return {
    onLoad: () => dispatch(actions.loadRepositories())
  }
}

const useRepositoriesState = () => ({
  error: useSelector(selectors.selectError),
  isLoading: useSelector(selectors.selectIsLoading),
  repositories: useSelector(selectors.selectRepositories)
})

const useRepositoryResults = () => {
  useInjectReducer(reducer)
  useInjectSaga(saga)

  const state = useRepositoriesState()
  const events = useRepositoriesEvents()

  return [
    state,
    events
  ]
}

export default useRepositoryResults
