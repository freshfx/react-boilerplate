/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {compose} from 'redux'

import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import HomePage from 'components/pages/HomePage/Loadable'
import FeaturePage from 'components/pages/FeaturePage/Loadable'
import NotFoundPage from 'components/pages/NotFoundPage/Loadable'
import AppInjector from 'components/Injector'

import AppHolder from './AppHolder'

const App = () => (
  <AppHolder>
    <AppInjector />
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
  </AppHolder>
)

export default compose(withRouter, React.memo)(App)
