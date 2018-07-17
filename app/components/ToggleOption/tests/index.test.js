import React from 'react'
import {mount, shallow} from 'enzyme'
import {IntlProvider, defineMessages} from 'react-intl'

import ToggleOption from '../index'

describe('<ToggleOption />', () => {
  it('should render default language messages', () => {
    const defaultEnMessage = 'someContent'
    const message = defineMessages({
      enMessage: {
        defaultMessage: defaultEnMessage,
        id: 'boilerplate.containers.LocaleToggle.en'
      }
    })
    const renderedComponent = shallow(<IntlProvider locale="en">
      <ToggleOption value="en" message={message.enMessage} />
    </IntlProvider>)
    expect(renderedComponent.contains(<ToggleOption value="en" message={message.enMessage} />)).toBe(true)
  })

  it('should display `value`(two letter language code) when `message` is absent', () => {
    const renderedComponent = mount(<IntlProvider locale="de">
      <ToggleOption value="de" />
    </IntlProvider>)
    expect(renderedComponent.text()).toBe('de')
  })
})
