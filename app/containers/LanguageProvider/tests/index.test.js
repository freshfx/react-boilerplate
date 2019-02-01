import React from 'react'
import {mount, shallow} from 'enzyme'
import {FormattedMessage, defineMessages} from 'react-intl'
import {Provider} from 'react-redux'
import createHistory from 'history/createMemoryHistory'

import ConnectedLanguageProvider, {LanguageProvider} from '../index'
import configureStore from '../../../configure-store'

import {translationMessages} from '../../../i18n'

const history = createHistory()

const messages = defineMessages({
  someMessage: {
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
    id: 'some.id'
  }
})

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>
    const renderedComponent = shallow(<LanguageProvider messages={messages} locale="en">
      {children}
    </LanguageProvider>)
    expect(renderedComponent.contains(children)).toBe(true)
  })
})

describe('<ConnectedLanguageProvider />', () => {
  let store = {}

  beforeAll(() => {
    store = configureStore({}, history)
  })

  it('should render the default language messages', () => {
    const renderedComponent = mount(<Provider store={store}>
      <ConnectedLanguageProvider messages={translationMessages}>
        <FormattedMessage {...messages.someMessage} />
      </ConnectedLanguageProvider>
    </Provider>)
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(true)
  })
})
