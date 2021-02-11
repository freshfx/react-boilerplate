/**
 * RepositoryListItem
 *
 * Lists the name and the issue count of a repository
 */

import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {FormattedNumber} from 'react-intl'

import ListItem from 'components/ListItem'

import IssueIcon from './IssueIcon'
import IssueLink from './IssueLink'
import RepositoryLink from './RepositoryLink'
import Wrapper from './Wrapper'
import useRepository from './useRepository'

const RepositoryListItem = ({id}) => {
  const [state] = useRepository(id)

  /*
   * If the repository is owned by a different person than we got the data for
   * it's a fork and we should show the name of the owner
   */
  const namePrefix = useMemo(() => {
    if (state.ownerUsername !== state.username) {
      return `${state.ownerUsername}/`
    }
    return ''
  }, [id])

  const content = (
    <Wrapper>
      <RepositoryLink href={state.url} target="_blank">
        {namePrefix + state.name}
      </RepositoryLink>
      <IssueLink href={`${state.url}/issues`} target="_blank">
        <IssueIcon />
        <FormattedNumber value={state.openIssuesCount} />
      </IssueLink>
    </Wrapper>
  )

  return <ListItem key={`repo-list-item-${state.fullName}`} item={content} />
}

RepositoryListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default React.memo(RepositoryListItem)
