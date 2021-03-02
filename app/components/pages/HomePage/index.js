/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react'
import {Helmet} from 'react-helmet-async'
import {FormattedMessage} from 'react-intl'
import {useSelector} from 'react-redux'

import H2 from 'components/atoms/H2'
import ReposList from 'components/organisms/ReposList'
import UserNameForm from 'components/organisms/UserNameForm'
import GenericTemplate from 'components/templates/GenericTemplate'
import RepositoryResultsInjector from 'hooks/repository/results/Injector'
import UsernameFormInjector from 'hooks/ui/username-form/Injector'
import useLatestDispatcher from 'hooks/useLatestDispatcher'
import useMount from 'hooks/useMount'
import {actions} from 'modules/repository/results'
import {selectors as usernameFormSelectors} from 'modules/ui/username-form'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'

const HomePage = () => {
  const username = useSelector(usernameFormSelectors.selectUsername)
  const fetchRepositories = useLatestDispatcher({
    action: actions.fetchRepositories
  })

  useMount(() => {
    if (username?.length) {
      fetchRepositories()
    }
  })

  return (
    <GenericTemplate>
      <UsernameFormInjector />
      <RepositoryResultsInjector />
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
          <UserNameForm onSubmit={fetchRepositories} />
          <ReposList />
        </Section>
      </div>
    </GenericTemplate>
  )
}

export default React.memo(HomePage)
