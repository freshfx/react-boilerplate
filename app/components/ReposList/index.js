import React from 'react'
import PropTypes from 'prop-types'

import List from 'components/List'
import LoadingIndicator from 'components/LoadingIndicator'
import RepositoryListItem from 'containers/RepositoryListItem'

import ErrorListItem from './ErrorListItem'

const ReposList = ({loading, error, repos}) => {
  if (loading) {
    return <List component={LoadingIndicator} />
  }

  if (error !== false) {
    return <List component={ErrorListItem} />
  }

  if (repos.length) {
    return <List items={repos} component={RepositoryListItem} />
  }

  return null
}

ReposList.propTypes = {
  error: PropTypes.any,
  loading: PropTypes.bool,
  repos: PropTypes.array
}

ReposList.defaultProps = {
  error: false,
  loading: false,
  repos: []
}

export default ReposList
