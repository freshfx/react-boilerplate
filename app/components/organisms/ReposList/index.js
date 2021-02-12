import React from 'react'

import List from 'components/molecules/List'
import LoadingIndicator from 'components/atoms/LoadingIndicator'
import RepositoryListItem from 'components/organisms/RepositoryListItem'
import useRepositoryResultsState from 'hooks/repository/results/useState'
import STATUS from 'modules/status'

import ErrorListItem from './ErrorListItem'

const ReposList = () => {
  const state = useRepositoryResultsState()

  switch (state.status) {
    case STATUS.LOADING:
      return <List component={LoadingIndicator} />
    case STATUS.ERROR:
      return <List component={ErrorListItem} />
    case STATUS.SUCCESS:
      return (
        Boolean(state.repositories.length) && (
          <List items={state.repositories} component={RepositoryListItem} />
        )
      )
    default:
      return null
  }
}

export default React.memo(ReposList)
