/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import {Helmet} from 'react-helmet-async'
import styled from '@emotion/styled'
import {Route, Switch, withRouter} from 'react-router-dom'
import {injectReducer} from 'redux-injectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {compose} from 'redux'

import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage/Loadable'
import FeaturePage from 'containers/FeaturePage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import entitiesReducer from 'modules/entities'
import languageReducer from 'modules/language'

export const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

export class App extends React.PureComponent {
  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </AppWrapper>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

// Use mapDispatchToProps(dispatch)
export function mapDispatchToProps() {
  return {}
}
const mapStateToProps = createStructuredSelector({})
const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withEntitiesReducer = injectReducer(entitiesReducer)
const withLanguageReducer = injectReducer(languageReducer)
// Example for Saga: injectSaga({key: 'appSaga', saga: appSaga})

export default compose(
  withRouter,
  withConnect,
  withEntitiesReducer,
  withLanguageReducer
)(App)
