import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider, defineMessages} from 'react-intl'

import ToggleOption from '../index'

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <ToggleOption {...props} />
    </IntlProvider>
  )

describe('ToggleOption', () => {
  it('should render default language messages', () => {
    const defaultMessage = 'someContent'
    const value = 'en'
    const message = defineMessages({
      enMessage: {
        defaultMessage,
        id: 'boilerplate.containers.LocaleToggle.en'
      }
    })
    const {getByText} = renderComponent({message: message.enMessage, value})
    expect(getByText(defaultMessage)).toHaveAttribute('value', value)
  })

  it('should display `value`(two letter language code) when `message` is absent', () => {
    const value = 'en'
    const {getByText} = renderComponent({value})
    expect(getByText(value)).toHaveAttribute('value', value)
  })
})
