/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import {Helmet} from 'react-helmet-async'
import {Route, Switch, withRouter} from 'react-router-dom'
import {useInjectReducer} from 'redux-injectors'
import {compose} from 'redux'

import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from 'containers/HomePage/Loadable'
import FeaturePage from 'containers/FeaturePage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import entitiesReducer from 'modules/entities'
import languageReducer from 'modules/language'

import Wrapper from './Wrapper'

export const App = () => {
  useInjectReducer(entitiesReducer)
  useInjectReducer(languageReducer)

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default compose(
  withRouter,
  React.memo
)(App)
