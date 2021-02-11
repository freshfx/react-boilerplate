import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'

import configureStore from 'configure-store'
import {actions} from 'modules/language'
import history from 'utils/history'

import LocaleToggle from '../index'

const store = configureStore({}, history)
jest.spyOn(store, 'dispatch')

const renderComponent = (props = {}) =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <LocaleToggle {...props} />
      </IntlProvider>
    </Provider>
  )

describe('LocaleToggle', () => {
  beforeEach(() => {
    store.dispatch.mockClear()
  })

  it('should render the default language messages', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should change the locale on option click', () => {
    const {container} = renderComponent()
    const [select] = container.getElementsByTagName('select')
    const locale = 'de'
    fireEvent.change(select, {target: {value: locale}})
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeLocale({locale}))
  })
})
