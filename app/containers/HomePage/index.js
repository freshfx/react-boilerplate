/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet-async'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import noop from 'lodash/noop'
import {
  injectReducer,
  injectSaga
} from 'redux-injectors'

import H2 from 'components/H2'
import ReposList from 'components/ReposList'
import repositoriesReducer, {
  actions as repositoriesActions,
  saga as repositoriesSaga,
  selectors as repositoriesSelectors
} from 'modules/repository/results'
import reducer, {
  actions,
  selectors
} from 'modules/pages/home'

import AtPrefix from './AtPrefix'
import CenteredSection from './CenteredSection'
import Form from './Form'
import Input from './Input'
import Section from './Section'
import messages from './messages'

class HomePage extends React.PureComponent {
  /*
   * When initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length) {
      this.props.onSubmitForm()
    }
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList
              error={this.props.error}
              loading={this.props.isLoading}
              repos={this.props.repositories}
            />
          </Section>
        </div>
      </article>
    )
  }
}

HomePage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  isLoading: PropTypes.bool,
  onChangeUsername: PropTypes.func,
  onSubmitForm: PropTypes.func,
  repositories: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  username: PropTypes.string
}

HomePage.defaultProps = {
  error: false,
  isLoading: false,
  onChangeUsername: noop,
  onSubmitForm: noop,
  repositories: false,
  username: ''
}

const mapStateToProps = createStructuredSelector({
  error: repositoriesSelectors.selectError,
  isLoading: repositoriesSelectors.selectIsLoading,
  repositories: repositoriesSelectors.selectRepositories,
  username: selectors.selectUsername
})

const mapDispatchToProps = dispatch => ({
  onChangeUsername: event =>
    dispatch(actions.changeUsername({username: event.target.value})),
  onSubmitForm: event => {
    if (typeof event !== 'undefined' && event.preventDefault) {
      event.preventDefault()
    }
    dispatch(repositoriesActions.loadRepositories())
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer(reducer)
const withRepositoriesReducer = injectReducer(repositoriesReducer)
const withRepositoriesSaga = injectSaga(repositoriesSaga)

export {
  HomePage,
  mapDispatchToProps
}

export default compose(
  withConnect,
  withReducer,
  withRepositoriesReducer,
  withRepositoriesSaga
)(HomePage)
