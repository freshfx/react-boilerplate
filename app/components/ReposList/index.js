import React from 'react'
import PropTypes from 'prop-types'

import List from 'components/List'
import LoadingIndicator from 'components/LoadingIndicator'
import RepoListItem from 'containers/RepoListItem'

import ErrorListItem from './ErrorListItem'
import EmptyListItem from './EmptyListItem'

function ReposList({loading, error, repos}) {
  if (loading) {
    return <List component={LoadingIndicator} />
  }

  if (error !== false) {
    return <List component={ErrorListItem} />
  }

  if (repos !== false) {
    if (repos.length) {
      return <List items={repos} component={RepoListItem} />
    }
    return <List items={repos} component={EmptyListItem} />
  }

  return null
}

ReposList.propTypes = {
  error: PropTypes.any,
  loading: PropTypes.bool,
  repos: PropTypes.any
}

ReposList.defaultProps = {
  error: false,
  loading: false,
  repos: false
}

export default ReposList
