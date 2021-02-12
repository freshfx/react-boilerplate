import useMemoizedSelector from 'hooks/useMemoizedSelector'
import {selectors} from 'modules/repository/entity'

const useRepositoryState = ({id}) => ({
  fullName: useMemoizedSelector(selectors.makeSelectFullName, {id}),
  name: useMemoizedSelector(selectors.makeSelectName, {id}),
  openIssuesCount: useMemoizedSelector(selectors.makeSelectOpenIssuesCount, {
    id
  }),
  ownerUsername: useMemoizedSelector(selectors.makeSelectOwnerUsername, {id}),
  url: useMemoizedSelector(selectors.makeSelectUrl, {id})
})

export default useRepositoryState
