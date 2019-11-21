/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {FormattedNumber} from 'react-intl'

import ListItem from 'components/ListItem'
import {selectors} from 'modules/repository/entity'
import {selectors as homePageSelectors} from 'modules/pages/home'

import IssueIcon from './IssueIcon'
import IssueLink from './IssueLink'
import RepoLink from './RepoLink'
import Wrapper from './Wrapper'

class RepoListItem extends React.PureComponent {
  /*
   * If the repository is owned by a different person than we got the data for
   * it's a fork and we should show the name of the owner
   */
  getNamePrefix = () => {
    if (this.props.ownerUsername !== this.props.username) {
      return `${this.props.ownerUsername}/`
    }
    return ''
  }

  render() {
    const namePrefix = this.getNamePrefix()

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <RepoLink href={this.props.url} target="_blank">
          {namePrefix + this.props.name}
        </RepoLink>
        <IssueLink href={`${this.props.url}/issues`} target="_blank">
          <IssueIcon />
          <FormattedNumber value={this.props.openIssuesCount} />
        </IssueLink>
      </Wrapper>
    )

    // Render the content into a list item
    return <ListItem key={`repo-list-item-${this.props.fullName}`} item={content} />
  }
}

RepoListItem.propTypes = {
  fullName: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  openIssuesCount: PropTypes.number,
  ownerUsername: PropTypes.string,
  url: PropTypes.string,
  username: PropTypes.string
}

RepoListItem.defaultProps = {
  fullName: '',
  name: '',
  openIssuesCount: 0,
  ownerUsername: '',
  url: '',
  username: ''
}

const makeMapStateToProps = () => {
  const selectFullName = selectors.makeSelectFullName()
  const selectName = selectors.makeSelectName()
  const selectOpenIssuesCount = selectors.makeSelectOpenIssuesCount()
  const selectOwnerUsername = selectors.makeSelectOwnerUsername()
  const selectUrl = selectors.makeSelectUrl()

  return (state, {id}) => {
    const props = {id}

    return {
      fullName: selectFullName(state, props),
      name: selectName(state, props),
      openIssuesCount: selectOpenIssuesCount(state, props),
      ownerUsername: selectOwnerUsername(state, props),
      url: selectUrl(state, props),
      username: homePageSelectors.selectUsername(state, props)
    }
  }
}

const withConnect = connect(makeMapStateToProps)

export {
  makeMapStateToProps,
  RepoListItem
}

export default compose(withConnect)(RepoListItem)
