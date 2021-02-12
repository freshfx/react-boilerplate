import {shallowEqual, useSelector} from 'react-redux'

import {selectors} from 'modules/repository/results'

const useRepositoryResultsState = () => ({
  error: useSelector(selectors.selectError),
  isLoading: useSelector(selectors.selectIsLoading),
  repositories: useSelector(selectors.selectRepositories, shallowEqual)
})

export default useRepositoryResultsState
