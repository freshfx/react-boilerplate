import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider, defineMessages} from 'react-intl'

import Toggle from '../index'

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <Toggle {...props} />
    </IntlProvider>
  )

describe('Toggle', () => {
  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should contain default text', () => {
    const messageData = {
      de: {
        defaultMessage: 'someOtherContent',
        id: 'boilerplate.containers.LocaleToggle.en'
      },
      en: {
        defaultMessage: 'someContent',
        id: 'boilerplate.containers.LocaleToggle.en'
      }
    }
    const messages = defineMessages(messageData)
    const values = Object.keys(messageData)

    const {container, getByText} = renderComponent({messages, values})
    expect(container.firstChild.children).toHaveLength(2)
    expect(getByText(messageData.de.defaultMessage)).toBeDefined()
    expect(getByText(messageData.en.defaultMessage)).toBeDefined()
  })

  it('should not have ToggleOptions if props.values is not defined', () => {
    const {getByText} = render(<Toggle />)
    expect(getByText('--')).toBeDefined()
  })
})
