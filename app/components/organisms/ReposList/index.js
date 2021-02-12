import React from 'react'

import List from 'components/molecules/List'
import LoadingIndicator from 'components/atoms/LoadingIndicator'
import RepositoryListItem from 'components/organisms/RepositoryListItem'
import useRepositoryResultsState from 'hooks/repository/results/useState'

import ErrorListItem from './ErrorListItem'

const ReposList = () => {
  const state = useRepositoryResultsState()

  if (state.isLoading) {
    return <List component={LoadingIndicator} />
  }

  if (state.error) {
    return <List component={ErrorListItem} />
  }

  if (state.repositories.length) {
    return <List items={state.repositories} component={RepositoryListItem} />
  }

  return null
}

export default React.memo(ReposList)
