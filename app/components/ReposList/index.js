import React from 'react'
import PropTypes from 'prop-types'

import List from 'components/List'
import ListItem from 'components/ListItem'
import LoadingIndicator from 'components/LoadingIndicator'
import RepoListItem from 'containers/RepoListItem'

function ReposList({loading, error, repos}) {
  if (loading) {
    return <List component={LoadingIndicator} />
  }

  if (error !== false) {
    const ErrorComponent = () =>
      <ListItem item="Something went wrong, please try again!" />
    return <List component={ErrorComponent} />
  }

  if (repos !== false) {
    return <List items={repos} component={RepoListItem} />
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
