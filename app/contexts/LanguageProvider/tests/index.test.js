import React from 'react'
import {render} from '@testing-library/react'
import {FormattedMessage, defineMessages} from 'react-intl'
import {Provider} from 'react-redux'

import configureStore from 'configure-store'
import history from 'utils/history'

import LanguageProvider from '../index'

const message = 'This is some default message'

const messages = defineMessages({
  someMessage: {
    defaultMessage: message,
    id: 'some.id'
  }
})

const store = configureStore({}, history)
const renderComponent = locale =>
  render(
    <Provider store={store}>
      <LanguageProvider locale={locale}>
        <FormattedMessage {...messages.someMessage} />
      </LanguageProvider>
    </Provider>
  )

describe('LanguageProvider', () => {
  it('should use defaultMessage', () => {
    const {getByText} = renderComponent('en')
    expect(getByText(message)).toBeDefined()
  })
})
