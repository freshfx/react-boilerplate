import React from 'react'
import {render} from '@testing-library/react'
import {FormattedMessage, defineMessages} from 'react-intl'

import {LanguageProvider} from '../index'

const message = 'This is some default message'

const messages = defineMessages({
  someMessage: {
    defaultMessage: message,
    id: 'some.id'
  }
})

const renderComponent = locale => render(
  <LanguageProvider locale={locale}>
    <FormattedMessage {...messages.someMessage} />
  </LanguageProvider>
)

describe('LanguageProvider', () => {
  it('should use defaultMessage', () => {
    const {getByText} = renderComponent('en')
    expect(getByText(message)).toBeDefined()
  })
})
