import React from 'react'
import {shallow} from 'enzyme'
import {IntlProvider, defineMessages} from 'react-intl'

import Toggle from '../index'

const zero = 0
const one = 1

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent'
    const defaultDeMessage = 'someOtherContent'
    const messages = defineMessages({
      de: {
        defaultMessage: defaultDeMessage,
        id: 'boilerplate.containers.LocaleToggle.en'
      },
      en: {
        defaultMessage: defaultEnMessage,
        id: 'boilerplate.containers.LocaleToggle.en'
      }
    })
    const renderedComponent = shallow(<IntlProvider locale="en">
      <Toggle
        values={[
          'en',
          'de'
        ]} messages={messages} />
    </IntlProvider>)
    expect(renderedComponent.contains(<Toggle
      values={[
        'en',
        'de'
      ]} messages={messages} />)).toBe(true)
    expect(renderedComponent.find('option').length).toBe(zero)
  })
  it('should not have ToggleOptions if props.values is not defined', () => {
    const renderedComponent = shallow(<Toggle />)
    expect(renderedComponent.contains(<option>--</option>)).toBe(true)
    expect(renderedComponent.find('option').length).toBe(one)
  })
})
