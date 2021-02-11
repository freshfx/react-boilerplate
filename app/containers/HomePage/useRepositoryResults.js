import {useDispatch, useSelector} from 'react-redux'

import {actions, selectors} from 'modules/repository/results'

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
  const state = useRepositoriesState()
  const events = useRepositoriesEvents()

  return [state, events]
}

export default useRepositoryResults
