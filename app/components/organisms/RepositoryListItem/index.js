/**
 * RepositoryListItem
 *
 * Lists the name and the issue count of a repository
 */

import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {FormattedNumber} from 'react-intl'
import {useSelector} from 'react-redux'

import ListItem from 'components/molecules/ListItem'
import useMemoizedSelector from 'hooks/useMemoizedSelector'
import {selectors} from 'modules/repository/entity'
import {selectors as homePageSelectors} from 'modules/ui/username-form'

import IssueIcon from './IssueIcon'
import IssueLink from './IssueLink'
import RepositoryLink from './RepositoryLink'
import Wrapper from './Wrapper'

const useRepository = ({id}) => ({
  fullName: useMemoizedSelector(selectors.makeSelectFullName, {id}),
  name: useMemoizedSelector(selectors.makeSelectName, {id}),
  openIssuesCount: useMemoizedSelector(selectors.makeSelectOpenIssuesCount, {
    id
  }),
  ownerUsername: useMemoizedSelector(selectors.makeSelectOwnerUsername, {id}),
  url: useMemoizedSelector(selectors.makeSelectUrl, {id})
})

const RepositoryListItem = ({id}) => {
  const repository = useRepository({id})
  const username = useSelector(homePageSelectors.selectUsername)

  /*
   * If the repository is owned by a different person than we got the data for
   * it's a fork and we should show the name of the owner
   */
  const namePrefix = useMemo(() => {
    if (repository.ownerUsername !== username) {
      return `${repository.ownerUsername}/`
    }
    return ''
  }, [id, username, repository.ownerUsername])

  const content = (
    <Wrapper>
      <RepositoryLink href={repository.url} target="_blank">
        {namePrefix + repository.name}
      </RepositoryLink>
      <IssueLink href={`${repository.url}/issues`} target="_blank">
        <IssueIcon />
        <FormattedNumber value={repository.openIssuesCount} />
      </IssueLink>
    </Wrapper>
  )

  return (
    <ListItem key={`repo-list-item-${repository.fullName}`} item={content} />
  )
}

RepositoryListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default React.memo(RepositoryListItem)
