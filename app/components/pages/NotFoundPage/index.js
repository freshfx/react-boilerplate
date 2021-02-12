/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react'
import {FormattedMessage} from 'react-intl'

import H1 from 'components/atoms/H1'
import GenericTemplate from 'components/templates/GenericTemplate'

import messages from './messages'

const NotFoundPage = () => (
  <GenericTemplate>
    <H1>
      <FormattedMessage {...messages.header} />
    </H1>
  </GenericTemplate>
)

export default React.memo(NotFoundPage)
