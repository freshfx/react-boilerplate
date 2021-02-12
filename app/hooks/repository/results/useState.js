import {shallowEqual, useSelector} from 'react-redux'

import {selectors} from 'modules/repository/results'

const useRepositoryResultsState = () => ({
  error: useSelector(selectors.selectError),
  repositories: useSelector(selectors.selectRepositories, shallowEqual),
  status: useSelector(selectors.selectStatus)
})

export default useRepositoryResultsState
