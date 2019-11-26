/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet-async'
import {FormattedMessage} from 'react-intl'

import H2 from 'components/H2'
import ReposList from 'components/ReposList'

import AtPrefix from './AtPrefix'
import CenteredSection from './CenteredSection'
import Form from './Form'
import Input from './Input'
import Section from './Section'
import messages from './messages'
import useHomePage from './useHomePage'
import useRepositoryResults from './useRepositoryResults'

const HomePage = () => {
  const [state, events] = useHomePage()
  const [repositoriesState, repositoriesEvents] = useRepositoryResults()

  useEffect(() => {
    if (state.username && state.username.trim().length) {
      repositoriesEvents.onLoad()
    }
  }, [])

  const onSubmitForm = event => {
    event.preventDefault()
    repositoriesEvents.onLoad()
  }

  const onChangeUsername = ({target: {value}}) => {
    events.onChangeUsername(value)
  }

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
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={state.username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList
            error={repositoriesState.error}
            loading={repositoriesState.isLoading}
            repos={repositoriesState.repositories}
          />
        </Section>
      </div>
    </article>
  )
}

export default React.memo(HomePage)
