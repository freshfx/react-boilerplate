import {useSelector} from 'react-redux'

import {selectors} from 'modules/repository/entity'
import {selectors as homePageSelectors} from 'modules/pages/home'
import useMemoizedSelector from 'utils/useMemoizedSelector'

const useRepositoryState = id => ({
  fullName: useMemoizedSelector(selectors.makeSelectFullName, {id}),
  name: useMemoizedSelector(selectors.makeSelectName, {id}),
  openIssuesCount: useMemoizedSelector(selectors.makeSelectOpenIssuesCount, {id}),
  ownerUsername: useMemoizedSelector(selectors.makeSelectOwnerUsername, {id}),
  url: useMemoizedSelector(selectors.makeSelectUrl, {id}),
  username: useSelector(homePageSelectors.selectUsername)
})

const useRepository = id => {
  const state = useRepositoryState(id)
  return [state]
}

export default useRepository
