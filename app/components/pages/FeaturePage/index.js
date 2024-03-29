/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react'
import {Helmet} from 'react-helmet-async'
import {FormattedMessage} from 'react-intl'

import H1 from 'components/atoms/H1'
import GenericTemplate from 'components/templates/GenericTemplate'

import messages from './messages'
import List from './List'
import ListItem from './ListItem'
import ListItemTitle from './ListItemTitle'

const FeaturePage = () => (
  <GenericTemplate>
    <Helmet>
      <title>Feature Page</title>
      <meta
        name="description"
        content="Feature page of React.js Boilerplate application"
      />
    </Helmet>
    <H1>
      <FormattedMessage {...messages.header} />
    </H1>
    <List>
      <ListItem>
        <ListItemTitle>
          <FormattedMessage {...messages.scaffoldingHeader} />
        </ListItemTitle>
        <p>
          <FormattedMessage {...messages.scaffoldingMessage} />
        </p>
      </ListItem>

      <ListItem>
        <ListItemTitle>
          <FormattedMessage {...messages.feedbackHeader} />
        </ListItemTitle>
        <p>
          <FormattedMessage {...messages.feedbackMessage} />
        </p>
      </ListItem>

      <ListItem>
        <ListItemTitle>
          <FormattedMessage {...messages.routingHeader} />
        </ListItemTitle>
        <p>
          <FormattedMessage {...messages.routingMessage} />
        </p>
      </ListItem>

      <ListItem>
        <ListItemTitle>
          <FormattedMessage {...messages.networkHeader} />
        </ListItemTitle>
        <p>
          <FormattedMessage {...messages.networkMessage} />
        </p>
      </ListItem>

      <ListItem>
        <ListItemTitle>
          <FormattedMessage {...messages.intlHeader} />
        </ListItemTitle>
        <p>
          <FormattedMessage {...messages.intlMessage} />
        </p>
      </ListItem>
    </List>
  </GenericTemplate>
)

export default React.memo(FeaturePage)
