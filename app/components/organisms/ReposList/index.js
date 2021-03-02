import React from 'react'
import {useSelector} from 'react-redux'

import List from 'components/molecules/List'
import LoadingIndicator from 'components/atoms/LoadingIndicator'
import RepositoryListItem from 'components/organisms/RepositoryListItem'
import STATUS from 'modules/status'
import {selectors} from 'modules/repository/results'

import ErrorListItem from './ErrorListItem'

const ReposList = () => {
  const state = {
    repositories: useSelector(selectors.selectRepositories),
    status: useSelector(selectors.selectStatus)
  }

  switch (state.status) {
    case STATUS.PENDING: {
      return <List component={LoadingIndicator} />
    }
    case STATUS.FAILURE: {
      return <List component={ErrorListItem} />
    }
    case STATUS.SUCCESS: {
      return (
        Boolean(state.repositories.length) && (
          <List items={state.repositories} component={RepositoryListItem} />
        )
      )
    }
    default:
      return null
  }
}

export default ReposList
